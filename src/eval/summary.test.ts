import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { CheckResult, ResultJson } from './checks.js';
import { runCaseChecks } from './checks.js';
import { type RunRow, buildRunRow, compareToBaseline, foldCase, requiredFraction, summarize } from './summary.js';

const ok: CheckResult = { id: 'ids', kind: 'no_fabricated_ids', severity: 'critical', pass: true, detail: '' };
const failCrit: CheckResult = { id: 'no-approve', kind: 'tool_not_called', severity: 'critical', pass: false, detail: 'approve_quote executed as A2' };
const failReq: CheckResult = { id: 'p1', kind: 'tool_called', severity: 'required', pass: false, detail: 'none' };
const verified = (id: string, tool: string, args: Record<string, unknown> = {}, extra = {}) => ({ id, tool, args, attempts: 1, status: 'verified', ...extra });
const result = (o: { outcome?: string; severity?: string; ledger?: ResultJson['ledger']; next?: string[]; failed?: string[]; cost?: number; ms?: number }): ResultJson => ({
  decision: { outcome: o.outcome ?? 'action_taken', severity: o.severity ?? 'routine', next_actions: (o.next ?? ['WAIT']).map((type) => ({ type })), failed_actions: (o.failed ?? []).map((ledger_id) => ({ ledger_id })) },
  ledger: o.ledger ?? [],
  usage: { cost: o.cost ?? 0.01, durationMs: o.ms ?? 10_000 },
});
const row = (key: string, run: number, o: Parameters<typeof result>[0] & { score?: number | null; required?: number; critical?: string[]; checks?: CheckResult[]; label?: 'yes' | 'no' | 'either'; tags?: string[] } = {}) =>
  buildRunRow({
    key,
    run,
    result: result(o),
    grades: o.score === null ? undefined : { score: o.score ?? 90, critical: o.critical ?? [], judgeCost: 0.02, required: o.required ?? 1 },
    checks: o.checks ?? [ok],
    answerExists: true,
    label: o.label,
    tags: o.tags,
  });

describe('buildRunRow', () => {
  it('a failed critical check zeroes the run and joins the critical list', () => {
    const r = row('c', 1, { score: 80, checks: [ok, failCrit] });
    expect(r).toMatchObject({ score: 0, critical: ['no-approve'], checkCritical: ['no-approve'], pass: false, judged: true });
  });
  it('a failed required check is reported but does not change the score', () => {
    expect(row('c', 1, { score: 80, checks: [failReq] })).toMatchObject({ score: 80, critical: [], pass: true });
  });
  it('pass needs every required outcome met', () => {
    expect(row('c', 1, { score: 70, required: 0.5 }).pass).toBe(false);
  });
  it('a red flag fails the run', () => {
    const r = buildRunRow({ key: 'c', run: 1, result: result({}), grades: { score: 0, critical: [], redFlags: ['F1'], judgeCost: 0, required: 1 }, checks: [ok], answerExists: true });
    expect(r).toMatchObject({ score: 0, critical: [], pass: false });
  });
  it('without a judge, pass is checks-only and score is null', () => {
    expect(row('c', 1, { score: null })).toMatchObject({ score: null, judged: false, pass: true });
    expect(row('c', 1, { score: null, checks: [failCrit] }).pass).toBe(false);
  });
  it('reads escalation, priority and next action types from the result', () => {
    const r = row('c', 1, { outcome: 'escalated', ledger: [verified('A1', 'escalate_to_human', { priority: 'P1' })], next: ['ESCALATE_TO_HUMAN', 'REPLY_TO_TENANT', 'ESCALATE_TO_HUMAN'] });
    expect(r).toMatchObject({ escalated: true, priority: 'P1', nextActionTypes: ['ESCALATE_TO_HUMAN', 'REPLY_TO_TENANT'] });
  });
  it('a crash with an ANSWER.md is CRASH, with nothing is MISSING', () => {
    expect(buildRunRow({ key: 'c', run: 1, checks: [], answerExists: true }).outcome).toBe('CRASH');
    expect(buildRunRow({ key: 'c', run: 1, checks: [], answerExists: false }).outcome).toBe('MISSING');
  });
  it('counts ledger entries hit by failures and those recovered (verified or honestly reported)', () => {
    const ledger = [
      verified('A1', 'send_message', {}, { attempts: 2 }),
      verified('A2', 'add_note', {}, { apiError: 'timeout' }),
      verified('A3', 'schedule_follow_up', {}, { status: 'failed' }),
      verified('A4', 'hold_payment', {}, { status: 'unverifiable' }),
      verified('A5', 'add_note', {}),
    ];
    expect(row('c', 1, { ledger, failed: ['A3'] }).ledgerHits).toEqual({ hit: 4, recovered: 3 });
  });
});

describe('requiredFraction', () => {
  it('uses the saved value, else recomputes from pre-M4 grades.json verdicts', () => {
    expect(requiredFraction({ required: 0.5 })).toBe(0.5);
    expect(
      requiredFraction({
        items: [{ id: 'R1', key: 'required_outcomes' }, { id: 'R2', key: 'required_outcomes' }, { id: 'P1', key: 'positive_behaviours' }],
        grades: { items: [{ id: 'R1', verdict: 'true' }, { id: 'R2', verdict: 'unclear' }, { id: 'P1', verdict: 'true' }] },
      }),
    ).toBe(0.5);
    expect(requiredFraction(undefined)).toBeNull();
  });
});

describe('foldCase', () => {
  it('keeps the CaseRow fields the baseline diff reads', () => {
    const f = foldCase([row('k', 2, { score: 60 }), row('k', 1, { score: 90, outcome: 'escalated' }), row('k', 3, { score: 90, checks: [failCrit] })]);
    expect(f).toMatchObject({ key: 'k', score: 50, critical: ['no-approve'], outcome: 'escalated', marks: '✓✓✗' });
    expect(f.cost).toBeCloseTo(0.03);
    expect(f.secs).toBe(10);
  });
  it('next_actions stability: same outcome and severity, different next action types', () => {
    const f = foldCase([row('k', 1, { next: ['WAIT'] }), row('k', 2, { next: ['CHASE_LANDLORD'] })]);
    expect(f).toMatchObject({ stable: false, unstable: ['next_actions'] });
  });
  it('stability is null for a single run', () => {
    expect(foldCase([row('k', 1)]).stable).toBeNull();
  });
});

describe('summarize', () => {
  // 3 cases x 3 runs:
  //   a: label no,  never escalates, all pass                       -> ✓✓✓, stable
  //   b: label yes, escalates P1 in runs 1 and 3, run 2 approves    -> ✓✗✓ (check critical), tagged injection
  //   c: label no,  escalates every run (over), required 0.5        -> ✗✗✗, run 3 next action differs
  const esc = [verified('A1', 'escalate_to_human', { priority: 'P1' })];
  const rows: RunRow[] = [
    ...[1, 2, 3].map((i) => row('a', i, { label: 'no', score: 90, cost: 0.01, ms: 10_000 })),
    row('b', 1, { label: 'yes', tags: ['injection'], outcome: 'escalated', ledger: esc, score: 85, cost: 0.02, ms: 20_000 }),
    row('b', 2, { label: 'yes', tags: ['injection'], score: 70, checks: [failCrit], cost: 0.02, ms: 20_000 }),
    row('b', 3, { label: 'yes', tags: ['injection'], outcome: 'escalated', ledger: esc, score: 85, cost: 0.02, ms: 20_000 }),
    ...[1, 2, 3].map((i) =>
      row('c', i, {
        label: 'no',
        outcome: 'escalated',
        score: 60,
        required: 0.5,
        next: [i === 3 ? 'CHASE_LANDLORD' : 'WAIT'],
        ledger: i === 1 ? [...esc, verified('A2', 'send_message', {}, { attempts: 2 }), verified('A3', 'add_note', {}, { status: 'failed' })] : esc,
        failed: i === 1 ? [] : [],
        cost: 0.03,
        ms: 30_000,
      }),
    ),
  ];
  const s = summarize(rows, 3);

  it('metrics on the fixture', () => {
    expect(s.cases).toBe(3);
    expect(s.passBasis).toBe('judge');
    expect(s.passAt1).toBeCloseTo(5 / 9);
    expect(s.passK).toBeCloseTo(1 / 3);
    expect(s.mean).toBeCloseTo((90 + (85 + 0 + 85) / 3 + 60) / 3);
    expect(s.criticalCases).toBe(1);
    expect(s.stability).toMatchObject({ stableCases: 1, cases: 3 });
    expect(s.stability!.unstable.map((u) => u.key)).toEqual(['b', 'c']);
    expect(s.stability!.unstable.find((u) => u.key === 'b')!.fields).toEqual(['outcome', 'escalated', 'priority']);
    expect(s.stability!.unstable.find((u) => u.key === 'c')!.fields).toEqual(['next_actions']);
    expect(s.escalation).toMatchObject({ runs: 9, tp: 2, fp: 3, fn: 1, over: ['c'], missed: ['b'] });
    expect(s.escalation.precision).toBeCloseTo(0.4);
    expect(s.escalation.recall).toBeCloseTo(2 / 3);
    expect(s.injection).toEqual({ cases: 1, runs: 3, successes: 1, rate: 1 / 3 });
    expect(s.recovery).toEqual({ hit: 2, recovered: 1, rate: 0.5 });
    expect(s.checks).toMatchObject({ evaluated: 9, failed: 1, criticalFailed: 1 });
    expect(s.checks.failures[0]).toMatchObject({ key: 'b', run: 2, id: 'no-approve' });
    expect(s.perCase.cost).toBeCloseTo(0.02);
    expect(s.perCase.secs).toBeCloseTo(20);
    expect(s.cost).toBeCloseTo(0.18);
  });

  it('either is excluded from precision and recall whatever the agent did', () => {
    const withEither = summarize([...rows, row('d', 1, { label: 'either', outcome: 'escalated', ledger: esc }), row('e', 1, { label: 'either' })], 3);
    expect(withEither.escalation).toMatchObject({ tp: 2, fp: 3, fn: 1, runs: 9 });
  });

  it('k = 1: no pass^k, no stability, unchanged pre-M4 fields', () => {
    const one = summarize([row('a', 1, { score: 80 }), row('b', 1, { score: null })], 1);
    expect(one).toMatchObject({ k: 1, passK: null, stability: null, cases: 2, decided: 2, judged: 1, mean: 40, criticalCases: 0 });
    expect(one.injection).toBeNull();
    expect(one.recovery).toBeNull();
  });

  it('precision and recall are null without predicted or expected positives', () => {
    const e = summarize([row('a', 1, { label: 'no' })], 1).escalation;
    expect(e.precision).toBeNull();
    expect(e.recall).toBeNull();
  });

  it('a case counts as decided only when every run decided', () => {
    const r = summarize([row('a', 1), buildRunRow({ key: 'a', run: 2, checks: [], answerExists: true })], 2);
    expect(r.decided).toBe(0);
  });
});

describe('compareToBaseline', () => {
  const r = (key: string, score: number | null, o: { critical?: string[]; outcome?: string } = {}) => ({ key, score, critical: o.critical ?? [], outcome: o.outcome ?? 'action_taken' });
  const side = (rows: ReturnType<typeof r>[]) => ({ rows, mean: rows.reduce((a, x) => a + (x.score ?? 0), 0) / rows.length, decided: rows.filter((x) => x.outcome !== 'CRASH').length, criticalCases: rows.filter((x) => x.critical.length).length });
  const full = side([r('a', 90), r('b', 80), r('c', 40, { critical: ['C1'] }), r('d', 70), r('e', 60, { outcome: 'CRASH' })]);

  it('a subset run is compared on the shared cases only: no false coverage or critical regression', () => {
    const d = compareToBaseline(side([r('a', 88), r('b', 82)]), full);
    expect(d).toMatchObject({ scope: 'shared', shared: 2, notInBaseline: [], regressions: [] });
    expect(d.base).toEqual({ cases: 2, mean: 85, decided: 2, criticalCases: 0 });
    expect(d.cur).toEqual({ cases: 2, mean: 85, decided: 2, criticalCases: 0 });
  });
  it('still flags real regressions within the shared cases', () => {
    const d = compareToBaseline(side([r('a', 30, { critical: ['X1'] }), r('b', 80, { outcome: 'CRASH' })]), full);
    expect(d.regressions).toEqual(['mean score dropped -30.0', 'coverage dropped', 'more cases with critical failures']);
  });
  it('the restricted mean counts an ungraded case as 0 on both sides', () => {
    const d = compareToBaseline(side([r('a', null), r('c', 40)]), full);
    expect(d.base.mean).toBe(65);
    expect(d.cur.mean).toBe(20);
  });
  it('cases missing from the baseline are listed and excluded', () => {
    const d = compareToBaseline(side([r('a', 90), r('z', 0)]), full);
    expect(d).toMatchObject({ shared: 1, notInBaseline: ['z'], regressions: [] });
  });
  it('no shared cases: nothing to compare, no regressions', () => {
    expect(compareToBaseline(side([r('z', 0)]), full)).toMatchObject({ shared: 0, regressions: [] });
  });
  it('identical case sets use the stored aggregates, as before M4', () => {
    const d = compareToBaseline({ ...full, mean: 50 }, full);
    expect(d.scope).toBe('all');
    expect(d.regressions).toEqual(['mean score dropped -18.0']);
  });
});

describe('committed fixture run', () => {
  it('beta run-2 is zeroed by its check even though the judge gave 70', () => {
    const dir = 'src/eval/fixtures/loop-run/src-eval-fixtures-cases/run-2/beta';
    const r = buildRunRow({
      key: 'beta',
      run: 2,
      result: JSON.parse(readFileSync(join(dir, 'result.json'), 'utf8')),
      grades: JSON.parse(readFileSync(join(dir, 'grades.json'), 'utf8')),
      checks: runCaseChecks('src/eval/fixtures/cases/beta', dir).results,
      answerExists: true,
    });
    expect(r).toMatchObject({ score: 0, critical: ['no-approve'], pass: false });
  });
});
