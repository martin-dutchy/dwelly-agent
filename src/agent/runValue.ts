// Operational value of a batch run and the RUN_SUMMARY.md written next to the answers. Pure: no I/O.
import { NO_DECISION, type Row } from '../runner/types.js';

// Dwelly's published figures (research/dwelly-company.md, https://www.dwelly.group/blog/ai-operations): 30 actions × 6–7 min, ~3 min per escalation.
export const MIN_PER_ACTION = 6.5;
export const MIN_PER_ESCALATION = 3;

export type OperationalValue = {
  cases: number;
  /** Decided without escalating; crashes, budget skips and missing decisions are excluded. */
  autonomous: number;
  escalated: number;
  /** Rows with no decision (crash, budget skip, no decision). */
  undecided: number;
  verifiedActions: number;
  /** Means over cases the agent ran in this invocation and that returned (not resumed, skipped or crashed). */
  meanCost?: number;
  meanSecs?: number;
  /** Estimate: verified actions × MIN_PER_ACTION − escalations × MIN_PER_ESCALATION, never below 0. */
  humanMinutesSaved: number;
};

export function operationalValue(rows: Row[]): OperationalValue {
  const decided = rows.filter((r) => !NO_DECISION.has(r.outcome));
  const escalated = decided.filter((r) => r.outcome === 'escalated').length;
  const verifiedActions = rows.reduce((a, r) => a + Math.max(0, r.actions - r.failed), 0);
  const measured = rows.filter((r) => !r.note && r.outcome !== 'CRASH');
  const mean = (f: (r: Row) => number) => (measured.length ? measured.reduce((a, r) => a + f(r), 0) / measured.length : undefined);
  return {
    cases: rows.length,
    autonomous: decided.length - escalated,
    escalated,
    undecided: rows.length - decided.length,
    verifiedActions,
    meanCost: mean((r) => r.cost),
    meanSecs: mean((r) => r.secs),
    humanMinutesSaved: Math.max(0, verifiedActions * MIN_PER_ACTION - escalated * MIN_PER_ESCALATION),
  };
}

function humanTime(minutes: number): string {
  const m = Math.round(minutes);
  return m >= 60 ? `~${(m / 60).toFixed(1)} human hours` : `~${m} human minutes`;
}

/** `environment` names where the actions ran (e.g. "local mock environment"), so the figure is never read as live work. */
export function valueLine(v: OperationalValue, environment: string): string {
  const perCase = v.meanCost === undefined || v.meanSecs === undefined ? 'no measured cost per case' : `$${v.meanCost.toFixed(3)} and ${Math.round(v.meanSecs)} s per case`;
  return [
    `Value (estimate): ${v.autonomous} autonomous`,
    `${v.escalated} escalated`,
    ...(v.undecided ? [`${v.undecided} without a decision`] : []),
    `${v.verifiedActions} verified write actions (${environment})`,
    perCase,
    `${humanTime(v.humanMinutesSaved)} if a person did the same actions (${MIN_PER_ACTION} min per verified write action, less ${MIN_PER_ESCALATION} min of human review per escalation, Dwelly's published figures)`,
  ].join(' · ');
}

const cell = (s: string) => s.replace(/\|/g, '\\|').replace(/`/g, "'").replace(/</g, '&lt;').replace(/\s*\n\s*/g, ' ');

export function runSummaryMarkdown(p: { command: string; startLines: string[]; rows: Row[]; doneLine: string; retryLine: string; valueLine: string }): string {
  const table = [
    '| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |',
    '|---|---|---|---|---|---|---|',
    ...p.rows.map((r) => `| ${cell(r.id)} | ${cell(r.outcome)} | ${r.actions} | ${r.failed} | ${r.cost.toFixed(3)} | ${Math.round(r.secs)} | ${cell([r.error, r.note].filter(Boolean).join('; '))} |`),
  ];
  return [
    '# Run summary',
    '',
    `Command: \`${p.command.replace(/`/g, "'")}\``,
    '',
    ...p.startLines.map((l) => `- ${l}`),
    '',
    ...table,
    '',
    `- ${p.doneLine}`,
    `- ${p.retryLine}`,
    `- ${p.valueLine}`,
    '',
  ].join('\n');
}
