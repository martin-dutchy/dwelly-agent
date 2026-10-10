import { describe, expect, it } from 'vitest';
import type { Row } from '../runner/types.js';
import { MIN_PER_ACTION, MIN_PER_ESCALATION, operationalValue, runSummaryMarkdown, valueLine } from './runValue.js';

const row = (over: Partial<Row>): Row => ({ id: 'x', outcome: 'action_taken', actions: 0, failed: 0, cost: 0, secs: 0, retries: 0, ...over });

describe('operationalValue', () => {
  it('counts decided, non-escalated cases as autonomous and excludes crashes, skips and missing decisions', () => {
    const v = operationalValue([
      row({ outcome: 'action_taken' }),
      row({ outcome: 'resolved' }),
      row({ outcome: 'escalated' }),
      row({ outcome: 'CRASH', error: 'boom' }),
      row({ outcome: 'BUDGET SKIP', note: 'budget' }),
      row({ outcome: 'NO DECISION' }),
    ]);
    expect(v).toMatchObject({ cases: 6, autonomous: 2, escalated: 1, undecided: 3 });
  });

  it('counts only verified actions and estimates minutes from them, less review per escalation', () => {
    const v = operationalValue([row({ actions: 5, failed: 1 }), row({ outcome: 'escalated', actions: 3, failed: 0 })]);
    expect(v.verifiedActions).toBe(7);
    expect(v.humanMinutesSaved).toBe(7 * MIN_PER_ACTION - 1 * MIN_PER_ESCALATION);
  });

  it('never estimates below zero minutes', () => {
    expect(operationalValue([row({ outcome: 'escalated' }), row({ outcome: 'escalated' })]).humanMinutesSaved).toBe(0);
  });

  it('averages cost and time over cases run here, not resumed, skipped or crashed ones', () => {
    const v = operationalValue([
      row({ cost: 0.1, secs: 20 }),
      row({ cost: 0.05, secs: 30 }),
      row({ outcome: 'escalated', note: 'resumed' }),
      row({ outcome: 'BUDGET SKIP', note: 'budget' }),
      row({ outcome: 'CRASH', secs: 300 }),
    ]);
    expect(v.meanCost).toBeCloseTo(0.075);
    expect(v.meanSecs).toBe(25);
  });

  it('does not divide by zero on no rows', () => {
    const v = operationalValue([]);
    expect(v).toMatchObject({ cases: 0, autonomous: 0, escalated: 0, verifiedActions: 0, humanMinutesSaved: 0 });
    expect(v.meanCost).toBeUndefined();
    expect(valueLine(v, 'local mock environment')).not.toMatch(/NaN|Infinity/);
  });
});

describe('valueLine', () => {
  it('says it is an estimate and prints both assumptions', () => {
    const line = valueLine(operationalValue([row({ cost: 0.07, secs: 22, actions: 12 }), row({ outcome: 'escalated', cost: 0.07, secs: 22, actions: 2 })]), 'local mock environment');
    expect(line).toBe(
      "Value (estimate): 1 autonomous · 1 escalated · 14 verified write actions (local mock environment) · $0.070 and 22 s per case · ~1.5 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)",
    );
  });

  it('shows minutes under an hour and mentions cases without a decision', () => {
    const line = valueLine(operationalValue([row({ actions: 2 }), row({ outcome: 'CRASH' })]), 'local mock environment');
    expect(line).toContain('1 without a decision');
    expect(line).toContain('~13 human minutes');
  });

  it('rounds before choosing minutes or hours', () => {
    const v = { ...operationalValue([]), humanMinutesSaved: 59.6 };
    expect(valueLine(v, 'local mock environment')).toContain('~1.0 human hours');
  });
});

describe('runSummaryMarkdown', () => {
  it('renders settings, a per-case table with escaped cells and the summary lines', () => {
    const md = runSummaryMarkdown({
      command: 'pnpm cases --in x --out y',
      startLines: ['Running 2 cases with m (concurrency 1, Jev off)…'],
      rows: [row({ id: '01', actions: 3, failed: 1, cost: 0.0712, secs: 21.6 }), row({ id: '02', outcome: 'CRASH', error: 'bad | pipe\nnext line' })],
      doneLine: 'Done in 30s',
      retryLine: 'Rate-limit retries: 0',
      valueLine: 'Value (estimate): …',
    });
    expect(md).toContain('Command: `pnpm cases --in x --out y`');
    expect(md).toContain('- Running 2 cases with m (concurrency 1, Jev off)…');
    expect(md).toContain('| 01 | action_taken | 3 | 1 | 0.071 | 22 |  |');
    expect(md).toContain('| 02 | CRASH | 0 | 0 | 0.000 | 0 | bad \\| pipe next line |');
    expect(md).toContain('- Done in 30s\n- Rate-limit retries: 0\n- Value (estimate): …');
  });
});
