// Spawns the real batch runner on temporary folders with no API keys, so no billable model call is ever made.
import { spawnSync } from 'node:child_process';
import { chmodSync, cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import type { StreamFn } from '@earendil-works/pi-agent-core';
import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { type LoadedCase, loadCase } from '../agent/cases.js';
import { NO_FLAGS } from '../agent/harness/flags.js';
import { seedFromCase } from '../agent/opsSeed.js';
import { type Toolset, createOpsToolset } from '../agent/opsTools.js';
import { type CaseEnv, processCase } from './processCase.js';
import { type ToolCallRecord, stoppable } from './supervise.js';

const ROOT = resolve(import.meta.dirname, '../..');
const TSX = join(ROOT, 'node_modules/.bin/tsx');
const PUBLIC_016 = join(ROOT, 'HackatonPublicCases/Property Management/016');

const tmps: string[] = [];
const tmp = () => {
  const d = mkdtempSync(join(tmpdir(), 'runner-it-'));
  tmps.push(d);
  return d;
};
afterEach(() => {
  for (const d of tmps.splice(0)) {
    for (const f of [join(d, 'in/016/history.md'), join(d, 'in/B/history.md')]) if (existsSync(f)) chmodSync(f, 0o644);
    rmSync(d, { recursive: true, force: true });
  }
});

function run(args: string[]) {
  const r = spawnSync(TSX, ['src/run.ts', ...args], {
    cwd: ROOT,
    env: { ...process.env, ANTHROPIC_API_KEY: '', TYPESAFE_API_KEY: '', USE_JEV: '0', ORGANISER_API_URL: '' },
    encoding: 'utf8',
    timeout: 90_000,
  });
  return { code: r.status, out: `${r.stdout}\n${r.stderr}` };
}

function unreadableCase(inDir: string, name: string) {
  cpSync(PUBLIC_016, join(inDir, name), { recursive: true });
  chmodSync(join(inDir, name, 'history.md'), 0o000);
}

describe('runner (offline)', () => {
  it('crash fallback: an unreadable history.md escalates as a system failure and the run exits 0', () => {
    const d = tmp();
    unreadableCase(join(d, 'in'), '016');
    const { code, out } = run(['--in', join(d, 'in'), '--out', join(d, 'out')]);
    expect(code).toBe(0);
    expect(out).toMatch(/016 CRASH/);
    expect(readFileSync(join(d, 'out/016/ANSWER.md'), 'utf8')).toContain('escalated (system failure)');
    expect(JSON.parse(readFileSync(join(d, 'out/016/result.json'), 'utf8'))).toMatchObject({ crashed: true, decision: null });
  }, 60_000);

  it('budget skip: with under a minute of budget no case starts, each still gets honest files', () => {
    const d = tmp();
    const { code, out } = run(['--in', 'cases/practice', '--only', '01,02', '--out', join(d, 'out'), '--budget-min', '0.5']);
    expect(code).toBe(0);
    expect(out).toMatch(/decisions 0\/2 · resumed 0 · budget-skipped 2/);
    for (const id of ['01', '02']) {
      expect(readFileSync(join(d, 'out', id, 'ANSWER.md'), 'utf8')).toContain('not processed within the run\'s time budget');
      expect(readFileSync(join(d, 'out', id, 'REASONING.md'), 'utf8')).toContain('No tools were called');
      expect(JSON.parse(readFileSync(join(d, 'out', id, 'result.json'), 'utf8')).skipped).toBe('budget');
      expect(existsSync(join(d, 'out', id, 'trace.jsonl'))).toBe(false);
    }
  }, 60_000);

  it('resume: a complete case is kept byte-identical only with --resume', () => {
    const d = tmp();
    const inDir = join(d, 'in');
    mkdirSync(inDir, { recursive: true });
    cpSync(join(ROOT, 'cases/practice/01'), join(inDir, 'A'), { recursive: true });
    unreadableCase(inDir, 'B');
    const seeded = {
      'ANSWER.md': '# Case A: ANSWER\n\nseeded\n',
      'REASONING.md': '# Case A: REASONING\n\nseeded\n',
      'result.json': JSON.stringify({ id: 'A', decision: { outcome: 'escalated' }, ledger: [] }),
    };
    mkdirSync(join(d, 'out/A'), { recursive: true });
    for (const [f, body] of Object.entries(seeded)) writeFileSync(join(d, 'out/A', f), body);

    const resumed = run(['--in', inDir, '--out', join(d, 'out'), '--resume']);
    expect(resumed.code).toBe(0);
    expect(resumed.out).toMatch(/resuming 1 of 2/);
    expect(resumed.out).toMatch(/B CRASH/);
    expect(resumed.out).toMatch(/decisions 1\/2 · resumed 1 · budget-skipped 0/);
    for (const [f, body] of Object.entries(seeded)) expect(readFileSync(join(d, 'out/A', f), 'utf8')).toBe(body);
    expect(resumed.out).toMatch(/Value \(estimate\): 0 autonomous · 1 escalated · 1 without a decision/);
    const summary = readFileSync(join(d, 'out/RUN_SUMMARY.md'), 'utf8');
    expect(summary).toContain('| A | escalated | 0 | 0 | 0.000 | 0 | resumed |');
    expect(summary).toMatch(/\| B \| CRASH \|/);

    const fresh = run(['--in', inDir, '--out', join(d, 'out'), '--only', 'A']);
    expect(fresh.code).toBe(0);
    expect(fresh.out).toMatch(/resumed 0/);
    expect(readFileSync(join(d, 'out/A/ANSWER.md'), 'utf8')).not.toContain('seeded');
  }, 90_000);

  it('malformed tool_failures.json: the case still runs, with the problem in REASONING.md and result.json', () => {
    const d = tmp();
    cpSync(join(ROOT, 'cases/practice/01'), join(d, 'in/A'), { recursive: true });
    writeFileSync(join(d, 'in/A/tool_failures.json'), '{"send_message": [{"call": 1, "error": "500"');
    expect(() => loadCase(join(d, 'in/A'))).toThrow();
    const { code, out } = run(['--in', join(d, 'in'), '--out', join(d, 'out')]);
    expect(code).toBe(0);
    expect(out).not.toMatch(/A CRASH/);
    const result = JSON.parse(readFileSync(join(d, 'out/A/result.json'), 'utf8'));
    expect(result.crashed).toBeUndefined();
    expect(result.inputProblems).toEqual([{ name: 'tool_failures.json', reason: expect.stringMatching(/^malformed .*ignored/) }]);
    expect(result.withheld.filter((w: { name: string }) => w.name === 'tool_failures.json')).toHaveLength(1);
    expect(readFileSync(join(d, 'out/A/REASONING.md'), 'utf8')).toMatch(/`tool_failures\.json`: malformed .*no scripted tool failures/);
  }, 60_000);

  it('records the harness flags in result.json and the temperature and model ids in run.json', () => {
    const d = tmp();
    cpSync(join(ROOT, 'cases/practice/01'), join(d, 'in/A'), { recursive: true });
    unreadableCase(join(d, 'in'), 'B');
    const { code } = run(['--in', join(d, 'in'), '--out', join(d, 'out'), '--harness', 'brief,skills', '--model', 'claude-sonnet-5-5', '--thinking', 'medium']);
    expect(code).toBe(0);
    for (const id of ['A', 'B']) {
      const r = JSON.parse(readFileSync(join(d, 'out', id, 'result.json'), 'utf8'));
      expect(r.harness).toMatchObject({ flags: 'brief,skills', enabled: { ...NO_FLAGS, brief: true, skills: true } });
    }
    const manifest = JSON.parse(readFileSync(join(d, 'out/run.json'), 'utf8'));
    expect(manifest).toMatchObject({ temperature: 'provider default', harness: { brief: true, skills: true }, models: { agent: { id: 'claude-sonnet-5-5', thinking: 'medium', temperature: 'provider default' } } });
  }, 60_000);

  it('rejects a deadline that has already passed', () => {
    const d = tmp();
    const past = new Date(Date.now() - 2 * 60_000);
    const hhmm = `${String(past.getHours()).padStart(2, '0')}:${String(past.getMinutes()).padStart(2, '0')}`;
    const { code, out } = run(['--in', 'cases/practice', '--only', '01', '--out', join(d, 'out'), '--deadline', hhmm]);
    expect(code).toBe(1);
    expect(out).toMatch(/already passed|3 hours/);
  }, 60_000);
});

describe('runner timeouts (in process, fake model)', () => {
  const env0 = process.env.USE_JEV;
  beforeAll(() => void (process.env.USE_JEV = '0'));
  afterAll(() => void (process.env.USE_JEV = env0));

  function fake(tokensPerSecond?: number) {
    const faux = fauxProvider(tokensPerSecond ? { tokensPerSecond } : {});
    const models = createModels();
    models.setProvider(faux.provider);
    return { faux, model: faux.getModel(), streamFn: models.streamSimple.bind(models) as StreamFn };
  }

  /** The ops toolset, with add_note held until `release` is called, ignoring any abort (a hung remote API). */
  function hangingNotes() {
    let release = () => {};
    const gate = new Promise<void>((r) => (release = r));
    let executed = 0;
    const makeToolset = (c: LoadedCase): Toolset => {
      const t = createOpsToolset(seedFromCase(c));
      return { ...t, execute: async (name, args, ctx) => (executed++, name === 'add_note' && (await gate), t.execute(name, args, ctx)) };
    };
    return { makeToolset, release: () => release(), executed: () => executed };
  }

  const envFor = (outDir: string, f: ReturnType<typeof fake>, extra: Partial<CaseEnv> = {}): CaseEnv => ({
    outDir,
    modelId: 'faux',
    model: f.model,
    streamFn: f.streamFn,
    thinking: 'off',
    flags: NO_FLAGS,
    chaos: 0,
    seed: '1',
    interrupt: new AbortController().signal,
    graceMs: 300,
    log: () => {},
    ...extra,
  });

  it('a case that hangs past its guard is stopped: fallback written, no tool runs afterwards, nothing overwritten', async () => {
    const d = tmp();
    const f = fake();
    const notes = hangingNotes();
    f.faux.setResponses([fauxAssistantMessage([fauxToolCall('add_note', { entity: 'T-1', note: 'first' })]), fauxAssistantMessage([fauxToolCall('add_note', { entity: 'T-1', note: 'second' })]), fauxAssistantMessage([fauxToolCall('list_tickets', {})])]);
    let stopped = 0;
    const out = join(d, 'out');
    const started = Date.now();
    const row = await processCase(join(ROOT, 'cases/practice/01'), 300, envFor(out, f, { makeToolset: notes.makeToolset, onStopped: () => stopped++ }));
    expect(Date.now() - started).toBeLessThan(2000);
    expect(row).toMatchObject({ id: '01', outcome: 'CRASH', error: expect.stringMatching(/did not return within 1s; the case was stopped/) });
    expect(stopped).toBe(1);
    const answer = readFileSync(join(out, 'ANSWER.md'), 'utf8');
    expect(answer).toContain('escalated (system failure)');
    expect(answer).toContain('- `add_note`: still running when the case was stopped');
    const result = JSON.parse(readFileSync(join(out, 'result.json'), 'utf8'));
    expect(result).toMatchObject({ crashed: true, decision: null, harness: { enabled: NO_FLAGS } });
    expect(Date.parse(result.stoppedAt) - started).toBeLessThan(500);
    const executedAtStop = notes.executed();

    notes.release();
    await new Promise((r) => setTimeout(r, 400));
    expect(notes.executed()).toBe(executedAtStop);
    expect(readFileSync(join(out, 'ANSWER.md'), 'utf8')).toBe(answer);
    const trace = readFileSync(join(out, 'trace.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
    const stop = trace.find((e) => e.type === 'case_stopped');
    expect(stop).toBeDefined();
    for (const e of trace.filter((e) => e.type === 'runner_tool_call')) expect(Date.parse(e.ts)).toBeLessThanOrEqual(Date.parse(stop.ts));
  }, 10_000);

  it('a case that times out on its own returns its trace, with no tool call started after the timeout', async () => {
    const d = tmp();
    const f = fake(50);
    f.faux.setResponses([fauxAssistantMessage([fauxToolCall('list_tickets', {})]), fauxAssistantMessage('still thinking '.repeat(5000))]);
    let stopped = 0;
    const out = join(d, 'out');
    const started = Date.now();
    const row = await processCase(join(ROOT, 'cases/practice/01'), 400, envFor(out, f, { graceMs: 5000, onStopped: () => stopped++ }));
    expect(Date.now() - started).toBeLessThan(3000);
    expect(row).toMatchObject({ id: '01', outcome: 'NO DECISION', error: expect.stringMatching(/timed out|aborted/) });
    expect(stopped).toBe(0);
    const result = JSON.parse(readFileSync(join(out, 'result.json'), 'utf8'));
    const stoppedAt = Date.parse(result.stoppedAt);
    expect(stoppedAt - started).toBeGreaterThanOrEqual(399);
    const trace = readFileSync(join(out, 'trace.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
    const toolStarts = trace.filter((e) => e.type === 'tool_execution_start');
    expect(toolStarts.map((e) => e.toolName)).toEqual(['list_tickets']);
    for (const e of toolStarts) expect(Date.parse(e.ts)).toBeLessThan(stoppedAt);
  }, 10_000);

  it('a tool called after the case was stopped is refused and never reaches the toolset', async () => {
    let executed = 0;
    const base = createOpsToolset();
    const calls: ToolCallRecord[] = [];
    const stop = new AbortController();
    const t = stoppable({ ...base, execute: async (...a) => (executed++, base.execute(...a)) }, stop.signal, calls);
    const ctx = { conversationId: 'x', channel: 'text' as const };
    expect((await t.execute('list_tickets', {}, ctx)).ok).toBe(true);
    stop.abort(new Error('the case reached its 1s timeout'));
    expect(await t.execute('add_note', { entity: 'T', note: 'n' }, ctx)).toEqual({ ok: false, error: 'not run: the case reached its 1s timeout' });
    expect(executed).toBe(1);
    expect(calls.map((c) => c.status)).toEqual(['ok', 'refused']);
  });
});
