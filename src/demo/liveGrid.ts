// Live grid: run the real case agent on many cases at once and watch every tool call in a browser.
// Usage: pnpm grid [--in "HackatonPublicCases/Property Management"] [--out runs/grid] [--concurrency 50] [--port 4747] [--only 001,047]
// Same agent, prompt, hints, toolset and guards as `pnpm cases`; the toolset is wrapped only to report events.
// Holdout cases are run but their tiles hide reasons and summaries, so nobody reads holdout output while tuning.
import 'dotenv/config';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer, type ServerResponse } from 'node:http';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { withOrganiserApi } from '../agent/adapters/organiserApi.js';
import { readOrganiserEnv } from '../agent/adapters/toolMap.js';
import { runCase } from '../agent/caseAgent.js';
import { casePrompt, listCases, loadCase } from '../agent/cases.js';
import { prescreen, screenNote } from '../agent/jev.js';
import { hintsFor } from '../agent/maintenance/stateReconstruct.js';
import { claude, streamFn } from '../agent/models.js';
import { seedFromCase } from '../agent/opsSeed.js';
import { type Toolset, createOpsToolset } from '../agent/opsTools.js';
import { renderAnswer } from '../agent/report.js';
import { CASE_SYSTEM_PROMPT } from '../agent/systemPrompt.js';

const { values } = parseArgs({
  options: {
    in: { type: 'string', default: 'HackatonPublicCases/Property Management' },
    out: { type: 'string', default: 'runs/grid' },
    only: { type: 'string' },
    concurrency: { type: 'string', default: '50' },
    port: { type: 'string', default: '4747' },
    model: { type: 'string', default: process.env.CASE_MODEL ?? 'claude-sonnet-5-5' },
    timeout: { type: 'string', default: '300' },
    at: { type: 'string' },
    'start-delay': { type: 'string', default: '0' },
  },
});

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..', '..');
const only = values.only?.split(',').map((s) => s.trim());
const dirs = listCases(values.in!).filter((d) => !only || only.some((o) => d.endsWith(`/${o}`)));
const model = claude(values.model!);
const organiser = readOrganiserEnv(process.env);
mkdirSync(values.out!, { recursive: true });

/** Case ids in the frozen holdout split for this input folder. */
function holdoutIds(): Set<string> {
  try {
    const splits = JSON.parse(readFileSync(join(REPO, 'cases/splits.json'), 'utf8'));
    const inAbs = resolve(values.in!);
    return new Set(
      (splits.holdout as { dir: string; only: string[] }[]).filter((h) => resolve(REPO, h.dir) === inAbs).flatMap((h) => h.only),
    );
  } catch {
    return new Set();
  }
}
const holdout = holdoutIds();

function titleOf(dir: string): string {
  const index = join(dir, 'index.md');
  if (!existsSync(index)) return basename(dir);
  const first = readFileSync(index, 'utf8').split('\n')[0] ?? '';
  return first.replace(/^#\s*/, '').replace(/^Case \d+:\s*/, '').trim() || basename(dir);
}

// Events go to every open page; late joiners get the full replay.
type GridEvent = Record<string, unknown> & { t: number; id: string; kind: string };
const events: GridEvent[] = [];
const clients = new Set<ServerResponse>();
function emit(e: Omit<GridEvent, 't'>) {
  const ev = { t: Date.now(), ...e } as GridEvent;
  events.push(ev);
  const line = `data: ${JSON.stringify(ev)}\n\n`;
  for (const c of clients) c.write(line);
}

const short = (s: unknown, n = 140) => {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
};

/** A few words on who or what a call is about, for the tile. */
function target(args: Record<string, unknown>): string {
  for (const k of ['recipient', 'to', 'party', 'contractor', 'channel', 'ticket_ref', 'mode', 'team']) {
    if (typeof args[k] === 'string' && args[k]) return short(args[k], 40);
  }
  return '';
}

/** Wrap a toolset so every call, guard block and read-back is reported. Behaviour is unchanged. */
function observed(ts: Toolset, id: string, hidden: boolean): Toolset {
  return {
    ...ts,
    execute: async (name, args, ctx) => {
      const a = (args ?? {}) as Record<string, unknown>;
      const who = name === 'escalate_to_human' ? `${a.priority ?? ''} ${a.team ?? ''}`.trim() : target(a);
      emit({ id, kind: 'tool', tool: name, target: who, detail: hidden ? '' : name === 'escalate_to_human' ? short(a.reason) : '' });
      const r = await ts.execute(name, args, ctx);
      if (r && (r as { ok?: boolean }).ok === false) emit({ id, kind: 'tool_failed', tool: name });
      return r;
    },
    guard: ts.guard
      ? (name, args, ledger) => {
          const reason = ts.guard!(name, args, ledger);
          if (reason) emit({ id, kind: 'blocked', tool: name, reason: hidden ? '' : short(reason, 160) });
          return reason;
        }
      : undefined,
    verify: (name, args, result, ctx) => {
      const v = ts.verify(name, args, result, ctx);
      emit({ id, kind: 'verified', tool: name, status: v.status });
      return v;
    },
  };
}

async function runOne(dir: string) {
  const id = basename(dir);
  const hidden = holdout.has(id);
  const started = Date.now();
  emit({ id, kind: 'start' });
  try {
    const c = loadCase(dir, values.at);
    const hints = hintsFor(c);
    const prompt = casePrompt(c) + (hints.text ? `\n\n${hints.text}` : '');
    const screen = await prescreen(prompt);
    const toolset = observed(withOrganiserApi(createOpsToolset(seedFromCase(c)), organiser, c.id).toolset, id, hidden);
    const run = await runCase({
      caseId: c.id,
      prompt: prompt + screenNote(screen),
      systemPrompt: CASE_SYSTEM_PROMPT,
      model,
      streamFn,
      failures: c.failures,
      media: c.media,
      toolset,
      thinkingLevel: 'medium',
      timeoutMs: Number(values.timeout) * 1000,
    });
    const outDir = join(values.out!, id);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'ANSWER.md'), renderAnswer(c, run.decision, run.ledger, run.error));
    const d = run.decision;
    emit({
      id,
      kind: 'done',
      outcome: d?.outcome ?? 'NO DECISION',
      severity: d?.severity ?? '',
      summary: hidden ? '' : short(d?.summary, 280),
      actions: run.ledger.length,
      verified: run.ledger.filter((e) => e.status === 'verified').length,
      secs: Math.round((Date.now() - started) / 1000),
      error: run.error ? short(run.error, 120) : '',
    });
  } catch (e) {
    emit({ id, kind: 'done', outcome: 'CRASH', error: short(e instanceof Error ? e.message : e, 160), secs: Math.round((Date.now() - started) / 1000) });
  }
}

const cases = dirs.map((d) => ({ id: basename(d), title: titleOf(d), holdout: holdout.has(basename(d)) }));
const page = readFileSync(join(HERE, 'grid.html'), 'utf8');
let startedAt = 0;

createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(`data: ${JSON.stringify({ t: Date.now(), id: '', kind: 'init', cases, startedAt, model: values.model })}\n\n`);
    for (const e of events) res.write(`data: ${JSON.stringify(e)}\n\n`);
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(page);
}).listen(Number(values.port), () => {
  console.log(`Live grid: http://localhost:${values.port}  (${dirs.length} cases, concurrency ${values.concurrency}, ${values.model})`);
});

// Give the page a moment to open before the first case starts, so the recording catches the start.
await new Promise((r) => setTimeout(r, Number(values['start-delay']) * 1000));
startedAt = Date.now();
emit({ id: '', kind: 'run_start', startedAt });
let next = 0;
await Promise.all(
  Array.from({ length: Math.min(Number(values.concurrency), dirs.length) }, async () => {
    while (next < dirs.length) await runOne(dirs[next++]);
  }),
);
emit({ id: '', kind: 'run_done', secs: Math.round((Date.now() - startedAt) / 1000) });
console.log(`All ${dirs.length} cases finished. Answers in ${values.out}. The page stays up; Ctrl-C to stop.`);
