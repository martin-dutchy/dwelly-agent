// Spawns the real batch runner on temporary folders with no API keys, so no billable model call is ever made.
import { spawnSync } from 'node:child_process';
import { chmodSync, cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

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

  it('rejects a deadline that has already passed', () => {
    const d = tmp();
    const past = new Date(Date.now() - 2 * 60_000);
    const hhmm = `${String(past.getHours()).padStart(2, '0')}:${String(past.getMinutes()).padStart(2, '0')}`;
    const { code, out } = run(['--in', 'cases/practice', '--only', '01', '--out', join(d, 'out'), '--deadline', hhmm]);
    expect(code).toBe(1);
    expect(out).toMatch(/already passed|3 hours/);
  }, 60_000);
});
