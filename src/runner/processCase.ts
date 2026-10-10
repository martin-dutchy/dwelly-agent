// One case from folder to ANSWERS/<id>/. Never throws: any failure becomes the crash fallback.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import type { StreamFn } from '@earendil-works/pi-agent-core';
import type { Api, Model, ModelThinkingLevel } from '@earendil-works/pi-ai';
import { chaosPlan } from '../core/failures.js';
import { toolsetLine, withOrganiserApi, withToolsetLine } from '../agent/adapters/organiserApi.js';
import type { OrganiserConfig } from '../agent/adapters/toolMap.js';
import { runCase } from '../agent/caseAgent.js';
import { type LoadedCase, casePrompt, loadCase } from '../agent/cases.js';
import { compileBrief, renderBrief } from '../agent/brief/index.js';
import type { CaseBrief, CaseBundle, HarnessFlags, SituationTag, Skill } from '../agent/harness/contracts.js';
import { flagsLine } from '../agent/harness/flags.js';
import { fromLoadedCase, ingest, toLoadedCase } from '../agent/ingest/index.js';
import { hintsFor } from '../agent/maintenance/stateReconstruct.js';
import { classify, renderSkills, selectSkills } from '../agent/skills/index.js';
import { prescreen, screenNote } from '../agent/jev.js';
import { seedFromCase } from '../agent/opsSeed.js';
import { type Toolset, createOpsToolset } from '../agent/opsTools.js';
import { type Usage, renderAnswer, renderReasoning, renderTranscript } from '../agent/report.js';
import { CASE_SYSTEM_PROMPT } from '../agent/systemPrompt.js';
import { crashFiles, writeFallback } from './fallback.js';
import { loadTolerant } from './load.js';
import { CaseStopped, type ToolCallRecord, bounded, checkpoint, stoppable } from './supervise.js';
import type { Row } from './types.js';

export type CaseEnv = {
  outDir: string;
  modelId: string;
  model: Model<Api>;
  streamFn: StreamFn;
  thinking: ModelThinkingLevel;
  criticModel?: Model<Api>;
  flags: HarnessFlags;
  at?: string;
  chaos: number;
  seed: string;
  organiser?: OrganiserConfig;
  interrupt: AbortSignal;
  /** How long after the agent's own timeout the runner stops the case. */
  graceMs: number;
  log: (line: string) => void;
  /** Called when the runner stops a case that had not returned. */
  onStopped?: () => void;
  makeToolset?: (c: LoadedCase) => Toolset;
};

export async function processCase(dir: string, timeoutMs: number, env: CaseEnv): Promise<Row> {
  const started = Date.now();
  const { flags, outDir } = env;
  const stop = new AbortController();
  const toolCalls: ToolCallRecord[] = [];
  let bundle: CaseBundle | undefined;
  let c: LoadedCase | undefined;
  let stoppedAt: string | undefined;
  let agentDeadline: NodeJS.Timeout | undefined;
  stop.signal.addEventListener('abort', () => (stoppedAt = new Date().toISOString()), { once: true });
  mkdirSync(outDir, { recursive: true });
  try {
    // No tool may run past the agent's own deadline, whatever is still in flight inside it.
    agentDeadline = setTimeout(() => stop.abort(new Error(`the case reached its ${Math.round(timeoutMs / 1000)}s timeout`)), timeoutMs);
    // Everything that can hang runs inside the guard; files are written only after it, so a case the runner
    // stopped can never overwrite its fallback later.
    const work = async () => {
      const load = (d: string) => (flags.ingestV2 ? ingest(d, { at: env.at }) : fromLoadedCase(loadCase(d, env.at)));
      const loaded = loadTolerant(dir, load);
      bundle = loaded.bundle;
      c = toLoadedCase(bundle);
      const harnessErrors: string[] = [];
      // Guards and completion checks read the brief and tags even when neither is shown to the model;
      // only the brief and skills flags change the prompt.
      const needBrief = flags.brief || flags.guardsV2 || flags.completionV2;
      let brief: CaseBrief | undefined;
      let hints: { text: string; hintsError?: string } = { text: '' };
      if (needBrief) {
        try {
          brief = compileBrief(bundle);
          if (flags.brief) hints = { text: renderBrief(brief) };
        } catch (e) {
          if (flags.brief) hints = { text: '', hintsError: e instanceof Error ? e.message : String(e) };
          else harnessErrors.push(`brief: ${e instanceof Error ? e.message : String(e)}`);
        }
      }
      if (!flags.brief) hints = hintsFor(c);
      let skills: Skill[] = [];
      let tags: SituationTag[] = [];
      if (flags.skills || needBrief) {
        try {
          tags = classify(bundle, brief);
          if (brief) brief.tags = tags;
          if (flags.skills) skills = selectSkills(tags);
        } catch (e) {
          harnessErrors.push(`skills: ${e instanceof Error ? e.message : String(e)}`);
        }
      }
      const skillText = renderSkills(skills, tags);
      const systemPrompt = CASE_SYSTEM_PROMPT;
      const prompt = casePrompt(c) + (hints.text ? `\n\n${hints.text}` : '') + (skillText ? `\n\n${skillText}` : '');
      const screen = await prescreen(prompt);
      checkpoint(stop.signal);
      const adapter = withOrganiserApi((env.makeToolset ?? ((lc) => createOpsToolset(seedFromCase(lc), { v2: flags.guardsV2 })))(c), env.organiser, c.id);
      const toolset = stoppable(adapter.toolset, stop.signal, toolCalls);
      const writeTools = toolset.tools.filter((t) => t.kind === 'write').map((t) => t.name);
      const failures = chaosPlan(writeTools, env.chaos, `${env.seed}:${c.id}`, c.failures);
      const chaos = Object.fromEntries(Object.entries(failures).filter(([k]) => !(k in c!.failures)));
      const run = await runCase({
        caseId: c.id,
        prompt: prompt + screenNote(screen),
        systemPrompt,
        model: env.model,
        streamFn: env.streamFn,
        failures,
        media: c.media,
        toolset,
        thinkingLevel: env.thinking,
        timeoutMs: Math.max(1, started + timeoutMs - Date.now()),
        critic: env.criticModel && { model: env.criticModel, streamFn: env.streamFn, attachments: c.inputs.map((i) => i.name) },
        harness: { flags, bundle, brief, skills, briefText: flags.brief ? hints.text : undefined },
      });
      const harness = {
        flags: flagsLine(flags),
        enabled: flags,
        tags,
        skills: skills.map((s) => s.id),
        conflicts: brief?.conflicts.map((x) => ({ kind: x.kind, severity: x.severity })),
        manifest: bundle.manifest.map((m) => ({ path: m.path, included: m.included, parse: m.parse })),
        errors: harnessErrors,
        log: run.harnessLog,
      };
      return { c, hints, screen, chaos, run, harness, brief, systemPrompt, toolsetReport: adapter.report(), inputProblems: loaded.problems };
    };
    const guarded = work();
    guarded.catch(() => {});
    const { c: lc, hints, screen, chaos, run, harness, brief, systemPrompt, toolsetReport, inputProblems } = await bounded(guarded, timeoutMs + env.graceMs, stop, env.interrupt).catch((e) => {
      if (e instanceof CaseStopped) env.onStopped?.();
      throw e;
    });
    const assistants = run.messages.filter((m: any) => m.role === 'assistant') as any[];
    const usage: Usage = {
      input: assistants.reduce((a, m) => a + (m.usage?.input ?? 0), 0),
      output: assistants.reduce((a, m) => a + (m.usage?.output ?? 0), 0),
      cost: assistants.reduce((a, m) => a + (m.usage?.cost?.total ?? 0), 0) + (run.critic?.cost ?? 0),
      turns: assistants.length,
      durationMs: Date.now() - started,
    };
    const retries = run.trace.filter((e: any) => e.type === 'retry').length;
    const thinkingTokens = assistants.reduce((a, m) => a + (m.usage?.reasoning ?? 0), 0);
    const refused = toolCalls.filter((t) => t.status === 'refused').length;
    writeFileSync(join(outDir, 'ANSWER.md'), renderAnswer(lc, run.decision, run.ledger, run.error));
    const reasoning = renderReasoning(lc, run.decision, run.ledger, run.messages, usage, run.error, { screen, gateLog: run.gateLog, policyLog: run.policyLog, chaos, critic: run.critic, harness, brief });
    writeFileSync(join(outDir, 'REASONING.md'), withToolsetLine(reasoning, toolsetLine(toolsetReport)));
    // Debug artefacts: a failure here must not replace a good answer with the crash fallback.
    try {
      writeFileSync(join(outDir, 'TRANSCRIPT.md'), renderTranscript(lc, { model: env.modelId, thinking: env.thinking, systemPrompt, messages: run.messages, trace: run.trace, error: run.error }));
    } catch (e) {
      env.log(`  ! ${lc.id} TRANSCRIPT.md not written: ${e instanceof Error ? e.message : e}`);
    }
    try {
      writeFileSync(join(outDir, 'trace.jsonl'), run.trace.map((e) => JSON.stringify(e)).join('\n') + '\n');
    } catch (e) {
      env.log(`  ! ${lc.id} trace.jsonl not written: ${e instanceof Error ? e.message : e}`);
    }
    writeFileSync(
      join(outDir, 'result.json'),
      JSON.stringify(
        {
          id: lc.id,
          model: env.modelId,
          thinking: env.thinking,
          cutoff: lc.cutoff,
          totalEvents: lc.totalEvents,
          inputs: lc.inputs.map((i) => ({ name: i.name, ...i.parse })),
          withheld: lc.withheld,
          inputProblems,
          timeoutMs,
          stoppedAt,
          refusedToolCalls: refused || undefined,
          toolset: toolsetReport,
          chaos,
          screen,
          hintsError: hints.hintsError,
          harness,
          brief: brief && { stage: brief.stage, now: brief.now, tags: brief.tags, conflicts: brief.conflicts, deadlines: brief.deadlines, money: brief.money, questions: brief.questions },
          gateLog: run.gateLog,
          policyLog: run.policyLog,
          decision: run.decision,
          ledger: run.ledger,
          state: run.state,
          usage: { ...usage, retries, thinkingTokens },
          error: run.error,
          critic: run.critic,
        },
        null,
        2,
      ),
    );
    return { id: lc.id, outcome: run.decision?.outcome ?? 'NO DECISION', actions: run.ledger.length, failed: run.ledger.filter((e) => e.status !== 'verified').length, cost: usage.cost, secs: usage.durationMs / 1000, retries, error: run.error };
  } catch (e) {
    // A crash must never cost us the case: write an honest fallback and move on.
    const msg = e instanceof Error ? e.message : String(e);
    const id = c?.id ?? basename(dir);
    try {
      writeFallback(outDir, crashFiles(id, msg, { bundle, dir, toolCalls }, { model: env.modelId, cutoff: c?.cutoff, timeoutMs, stoppedAt, harness: { flags: flagsLine(flags), enabled: flags } }));
      if (toolCalls.length || stoppedAt) writeFileSync(join(outDir, 'trace.jsonl'), [...toolCalls.map((t) => ({ ts: t.at, type: 'runner_tool_call', tool: t.tool, status: t.status })), ...(stoppedAt ? [{ ts: stoppedAt, type: 'case_stopped', reason: msg }] : [])].map((x) => JSON.stringify(x)).join('\n') + '\n');
    } catch (w) {
      env.log(`  ! ${id} fallback not fully written: ${w instanceof Error ? w.message : w}`);
      try {
        mkdirSync(outDir, { recursive: true });
        if (!existsSync(join(outDir, 'ANSWER.md'))) writeFileSync(join(outDir, 'ANSWER.md'), `# Case ${id}: ANSWER\n\n**Outcome:** escalated (system failure)\n\n${msg}\n`);
      } catch {
        // Nothing more can be written; the batch continues.
      }
    }
    return { id, outcome: 'CRASH', actions: 0, failed: 0, cost: 0, secs: (Date.now() - started) / 1000, retries: 0, error: msg };
  } finally {
    clearTimeout(agentDeadline);
  }
}
