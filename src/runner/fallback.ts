// Every answer the runner writes itself when the agent could not produce one. Honest escalations, never decisions.
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parseQuestions } from '../agent/decisionPoints.js';
import type { CaseBundle, ManifestEntry } from '../agent/harness/contracts.js';
import { kindOf } from '../agent/ingest/index.js';
import type { ToolCallRecord } from './supervise.js';

export type FallbackFiles = { answer: string; reasoning: string; result: Record<string, unknown> };

export type CrashContext = {
  /** What ingest produced before the failure, when it got that far. */
  bundle?: CaseBundle;
  /** The case folder, listed raw when there is no bundle. */
  dir?: string;
  /** Tool calls the runner saw before the failure. */
  toolCalls?: ToolCallRecord[];
};

const HARNESS = new Set(['rubric.json', 'tool_failures.json', 'checks.json']);
const BRIEFS = ['case.md', 'CASE.md', 'README.md', 'task.md', 'index.md'];

function walk(dir: string): string[] {
  return readdirSync(dir)
    .sort()
    .flatMap((f) => {
      const p = join(dir, f);
      try {
        return statSync(p).isDirectory() ? walk(p) : [p];
      } catch {
        return [p];
      }
    });
}

/** The folder as it lies on disk, for when ingest itself failed. */
export function rawManifest(dir: string): ManifestEntry[] {
  try {
    return walk(dir).map((p): ManifestEntry => {
      const path = relative(dir, p);
      let bytes: number | undefined;
      try {
        bytes = statSync(p).size;
      } catch {}
      const hidden = HARNESS.has(path.split('/').pop()!);
      return { path, kind: kindOf(path), parse: 'not read', included: false, note: [bytes !== undefined ? `${bytes} bytes` : 'unreadable', hidden && 'grading or test-harness file'].filter(Boolean).join(', ') };
    });
  } catch (e) {
    return [{ path: '.', kind: 'unknown', parse: 'not read', included: false, note: `folder not listable: ${e instanceof Error ? e.message : String(e)}` }];
  }
}

function rawQuestions(dir: string): string[] {
  for (const f of BRIEFS) {
    try {
      if (existsSync(join(dir, f))) return parseQuestions(readFileSync(join(dir, f), 'utf8'));
    } catch {}
  }
  return [];
}

const cell = (s: unknown) => String(s ?? '').replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');
const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

/** The agent crashed, or did not return in time. Same inputs, same ANSWER.md. */
export function crashFiles(id: string, msg: string, ctx: CrashContext = {}, extra: Record<string, unknown> = {}): FallbackFiles {
  const b = ctx.bundle;
  const manifest = b?.manifest ?? (ctx.dir ? rawManifest(ctx.dir) : []);
  const questions = b?.questions ?? (ctx.dir ? rawQuestions(ctx.dir) : []);
  const parties = b?.parties ?? [];
  const events = (b?.events ?? []).slice(-5);
  const calls = ctx.toolCalls ?? [];
  const source = b ? 'the ingested case' : 'a raw listing of the case folder (ingest did not finish)';

  const answer = [
    `# Case ${id}: ANSWER`,
    '',
    '**Outcome:** escalated (system failure)',
    '',
    `The system failed while processing this case, so no decision was made and a human must handle it. Failure: ${msg}`,
    '',
    '## Actions taken before the failure',
    '',
    ...(calls.length ? calls.map((c) => `- \`${c.tool}\`: ${c.status === 'ok' ? 'completed, not verified' : c.status === 'refused' ? 'refused, the case had been stopped' : c.status === 'running' ? 'still running when the case was stopped' : 'failed'}`) : ['None.']),
    '',
    '## Case questions',
    '',
    ...(questions.length ? questions.map((q, i) => `${i + 1}. ${q}\n   - not processed`) : ['The case brief lists no questions.']),
    '',
    '## Input manifest',
    '',
    `From ${source}.`,
    '',
    ...(manifest.length ? ['| File | Kind | Read as | Shown to the agent | Note |', '|---|---|---|---|---|', ...manifest.map((m) => `| ${cell(m.path)} | ${m.kind} | ${cell(m.parse)} | ${m.included ? 'yes' : 'no'} | ${cell(m.note)} |`)] : ['No files found.']),
    '',
    '## Parties',
    '',
    ...(parties.length ? parties.map((p) => `- ${p.role}: ${p.name ?? '(name unknown)'}${p.contacts.length ? ` (${p.contacts.join(', ')})` : ''}`) : ['None identified before the failure.']),
    '',
    '## Last 5 timeline events',
    '',
    ...(events.length ? events.map((e) => `- ${[e.at, e.channel, e.from && `from ${e.from}`, e.to && `to ${e.to}`].filter(Boolean).join(' · ')}: ${clip(e.text.replace(/\s+/g, ' ').trim(), 240)}`) : ['None extracted before the failure.']),
    '',
  ].join('\n');

  const reasoning = [
    `# Case ${id}: REASONING`,
    '',
    `Run crashed: ${msg}`,
    '',
    `The runner wrote this answer itself from ${source}. ${calls.length ? `${calls.length} tool call(s) were seen before the failure; none is reported as verified.` : 'No tool was called.'}`,
    '',
  ].join('\n');

  return { answer, reasoning, result: { id, ...extra, crashed: true, decision: null, error: msg, manifest, toolCalls: calls } };
}

export type SkipInfo = {
  deadline: Date;
  skippedAt: Date;
  /** `budget`: too little time left to start the case. `interrupt`: the operator stopped the run. */
  reason: 'budget' | 'interrupt';
  flags: string;
};

/** The case was never started. */
export function budgetSkipFiles(id: string, s: SkipInfo): FallbackFiles {
  const why =
    s.reason === 'interrupt'
      ? 'the run was stopped by the operator before this case started'
      : `less than a minute remained before the run's deadline (${s.deadline.toISOString()}) when this case was due to start`;
  const error = `not processed within the run's time budget: ${why}`;
  return {
    answer: `# Case ${id}: ANSWER\n\n**Outcome:** escalated (system failure)\n\nThis case was not processed within the run's time budget, so no action was taken on it. A human must handle it.\n`,
    reasoning: `# Case ${id}: REASONING\n\nThe agent did not run on this case: ${why}.\nNo tools were called and no messages were sent.\n\n- Deadline: ${s.deadline.toISOString()}\n- Skipped at: ${s.skippedAt.toISOString()}\n- Run flags: \`${s.flags}\`\n`,
    result: { id, skipped: s.reason === 'interrupt' ? 'interrupt' : 'budget', decision: null, deadline: s.deadline.toISOString(), skippedAt: s.skippedAt.toISOString(), error },
  };
}

/** result.json last, so a folder never looks complete before its answer files exist. */
export function writeFallback(outDir: string, f: FallbackFiles) {
  writeFileSync(join(outDir, 'ANSWER.md'), f.answer);
  writeFileSync(join(outDir, 'REASONING.md'), f.reasoning);
  writeFileSync(join(outDir, 'result.json'), JSON.stringify(f.result, null, 2));
}
