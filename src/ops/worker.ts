import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { runCase } from '../agent/caseAgent.js';
import { casePrompt, loadCase } from '../agent/cases.js';
import { hintsFor } from '../agent/maintenance/stateReconstruct.js';
import { claude, streamFn } from '../agent/models.js';
import { seedFromCase } from '../agent/opsSeed.js';
import { createOpsToolset } from '../agent/opsTools.js';
import { parseHistory } from '../agent/publicCases.js';
import { renderAnswer, renderReasoning } from '../agent/report.js';
import { CASE_SYSTEM_PROMPT } from '../agent/systemPrompt.js';
import { type RunOutput, recordRun } from './record.js';
import { type OpsStore, type TaskContext, newId } from './store.js';

/**
 * Runs the case worker on a case's current history (the same agent, tools and guards as the batch runner)
 * and records what it did. Runs for one case are queued so they never overlap; a few cases run at once.
 */

const pad = (n: number) => String(n).padStart(3, '0');
const stamp = (d: Date) => `${d.toISOString().replace('T', ' ').slice(0, 19)} UTC`;
const eventTime = (header: string) => Date.parse(header.split(' — ')[0].replace(' UTC', 'Z').replace(' ', 'T'));

/** Append one organiser-format event to history.md, half an hour after the last one, on the case's own clock. */
export function appendHistoryEvent(historyMd: string, e: { channel: string; from: string; to: string; body: string }): string {
  const { events } = parseHistory(historyMd);
  const last = events.at(-1);
  const t = last && !Number.isNaN(eventTime(last.header)) ? new Date(eventTime(last.header) + 30 * 60_000) : new Date();
  const n = events.length + 1;
  const block = `<a id="event-${pad(n)}"></a>\n## ${stamp(t)} — event ${pad(n)}\n\n- **Channel:** ${e.channel}\n- **From:** ${e.from}\n- **To:** ${e.to}\n\n${e.body.trim()}\n`;
  return `${historyMd.replace(/Total events: \d+/, `Total events: ${n}`).trimEnd()}\n\n${block}`;
}

export type WorkerOptions = {
  /** Case-worker runs in parallel across cases (runs on one case never overlap). */
  concurrency?: number;
  model?: string;
  timeoutMs?: number;
  /** Test seam: replace the real case worker. */
  runner?: (o: { prompt: string; dir: string; caseId: string }) => Promise<RunOutput & { messages?: any[]; cost?: number }>;
};

export function createWorker(store: OpsStore, opts: WorkerOptions = {}) {
  const chains = new Map<string, Promise<void>>();
  let active = 0;
  const waiting: (() => void)[] = [];
  const MAX = opts.concurrency ?? Number(process.env.OPS_CONCURRENCY ?? 2);
  const slot = async () => {
    if (active < MAX) return void active++;
    await new Promise<void>((r) => waiting.push(r));
    active++;
  };
  const release = () => {
    active--;
    waiting.shift()?.();
  };

  async function runOnce(caseId: string, trigger: string, call?: TaskContext['call']) {
    const c = await store.getCase(caseId);
    if (!c) return;
    const runId = newId('run');
    await store.startRun({ id: runId, case_id: caseId, trigger });
    await store.setStatus(caseId, 'agent_working');
    await store.addEvents([{ case_id: caseId, ts: new Date().toISOString(), kind: 'run_started', actor: 'agent', title: `Case worker started: ${trigger}`, detail: null, status: null, run_id: runId, data: null }]);
    const dir = mkdtempSync(join(tmpdir(), 'ops-case-'));
    try {
      if (c.files) {
        for (const [name, content] of Object.entries(c.files)) {
          mkdirSync(dirname(join(dir, name)), { recursive: true });
          writeFileSync(join(dir, name), content);
        }
      } else {
        writeFileSync(join(dir, 'index.md'), c.index_md);
        writeFileSync(join(dir, 'history.md'), c.history_md);
      }
      const loaded = loadCase(dir, 'none');
      const hints = hintsFor(loaded);
      const prompt = casePrompt(loaded) + (hints.text ? `\n\n${hints.text}` : '');
      const out = opts.runner
        ? await opts.runner({ prompt, dir, caseId })
        : await (async () => {
            const run = await runCase({
              caseId,
              prompt,
              systemPrompt: CASE_SYSTEM_PROMPT,
              model: claude(opts.model ?? process.env.OPS_CASE_MODEL ?? process.env.CASE_MODEL ?? 'claude-sonnet-5-5'),
              streamFn,
              media: loaded.media,
              toolset: createOpsToolset(seedFromCase(loaded)),
              thinkingLevel: 'medium',
              timeoutMs: opts.timeoutMs ?? 240_000,
            });
            const cost = (run.messages as any[]).filter((m) => m.role === 'assistant').reduce((a, m) => a + (m.usage?.cost?.total ?? 0), 0);
            return { ...run, cost };
          })();
      const latest = c.files ? Object.entries(c.files).filter(([n]) => n.startsWith('inputs/')).slice(-3).map(([n, t]) => `### ${n}\n${t}`).join('\n\n') : undefined;
      const { events, tasks, status } = recordRun({ caseId, runId, run: out, historyMd: c.history_md, call, latest });
      await store.addEvents(events);
      for (const t of tasks) await store.addTask(t);
      await store.setStatus(caseId, status);
      const usage = { input: 0, output: 0, cost: out.cost ?? 0, turns: 0, durationMs: 0 };
      const answer_md = renderAnswer(loaded, out.decision, out.ledger, out.error);
      const reasoning_md = renderReasoning(loaded, out.decision, out.ledger, out.messages ?? [], usage, out.error, { policyLog: out.policyLog });
      await store.finishRun(runId, { outcome: out.decision?.outcome ?? 'no_decision', cost: out.cost ?? null, answer_md, reasoning_md });
      // Eval-run cases also land on disk in the batch runner's layout, so `pnpm eval` can grade them.
      const batch = c.batch_id ? await store.getBatch(c.batch_id) : undefined;
      if (batch && c.source_ref) {
        const [caseNo, cut] = c.source_ref.split('@');
        const outDir = join(batch.answers_dir, caseNo);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(join(outDir, 'ANSWER.md'), answer_md);
        writeFileSync(join(outDir, 'REASONING.md'), reasoning_md);
        // Same fields the batch runner writes: the judge's checks read `state` (ids tools returned, e.g. quote ids).
        const extra = out as { state?: unknown; gateLog?: unknown };
        writeFileSync(join(outDir, 'result.json'), JSON.stringify({ id: caseNo, cutoff: Number(cut), decision: out.decision, ledger: out.ledger, state: extra.state, gateLog: extra.gateLog, policyLog: out.policyLog, error: out.error, cost: out.cost }, null, 2));
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`[ops] run ${runId} on ${caseId}`, e);
      await store.addEvents([{ case_id: caseId, ts: new Date().toISOString(), kind: 'run_failed', actor: 'system', title: 'The case worker failed; a person needs to pick this up', detail: msg, status: 'failed', run_id: runId, data: null }]);
      await store.setStatus(caseId, 'failed');
      await store.finishRun(runId, { outcome: 'error', cost: null, answer_md: null, reasoning_md: null });
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }

  /** Queue a run; resolves when it has finished. Runs on the same case happen one after another. */
  function enqueue(caseId: string, trigger: string, call?: TaskContext['call']): Promise<void> {
    const prev = chains.get(caseId) ?? Promise.resolve();
    const next = prev.then(async () => {
      await slot();
      try {
        await runOnce(caseId, trigger, call);
      } finally {
        release();
      }
    });
    chains.set(caseId, next.catch(() => {}));
    return next;
  }

  return { enqueue };
}
export type Worker = ReturnType<typeof createWorker>;
