import { type StopReason, STOP_ORDER, stopReason } from './status.js';
import type { HumanTask, OpsCase, OpsEvent, OpsRun } from './store.js';

/**
 * What an eval run looks like to a person: not totals for their own sake, but where the agents stopped,
 * what they were not allowed to do and why, and what they chose to do next. Pure, so it is easy to test.
 */

export type CaseRow = {
  c: OpsCase;
  state: 'queued' | 'running' | 'done' | 'failed';
  outcome: string | null;
  next: { type: string; action: string; recipient: string; channel: string } | null;
  confirmed: number;
  notThrough: number;
  denied: number;
  task: HumanTask | null;
  cost: number;
  error: string | null;
  reason: StopReason;
};
export type Group = { key: string; tool: string; reason: string; cases: OpsCase[] };
export type ToolStat = { tool: string; requested: number; confirmed: number; notThrough: number; denied: number };

export type BatchView = {
  rows: CaseRow[];
  done: number;
  running: number;
  queued: number;
  outcomes: [string, number][];
  needed: { c: OpsCase; t: HumanTask }[];
  denials: Group[];
  notThrough: Group[];
  noDecision: CaseRow[];
  tools: ToolStat[];
  nextSteps: [string, number][];
  cost: number;
  byReason: [StopReason, number][];
  graded: number;
  meanScore: number | null;
  critical: number;
};

const ACTION_KINDS = new Set(['action', 'message', 'follow_up', 'escalation']);
/** Policy reasons carry amounts and refs; strip them so the same rule groups together. */
const ruleKey = (tool: string, reason: string) =>
  `${tool}|${reason
    .replace(/^Ticket .+? not found/, 'Ticket # not found')
    .split(/(?<=\.)\s/)[0]
    .replace(/£\s?[\d,.]+|\b[A-Z]{1,4}-?\d[\w-]*|\d[\d,.:/-]*/g, '#')
    .toLowerCase()
    .slice(0, 120)}`;

function group(items: { tool: string; reason: string; c: OpsCase }[]): Group[] {
  const m = new Map<string, Group>();
  for (const it of items) {
    const key = ruleKey(it.tool, it.reason);
    const g = m.get(key) ?? { key, tool: it.tool, reason: it.reason, cases: [] };
    if (!g.cases.includes(it.c)) g.cases.push(it.c);
    m.set(key, g);
  }
  return [...m.values()].sort((a, b) => b.cases.length - a.cases.length);
}

export function batchView(cases: OpsCase[], events: Record<string, OpsEvent[]>, tasks: HumanTask[], runs: Record<string, OpsRun[]>): BatchView {
  const tools = new Map<string, ToolStat>();
  const tool = (name: string) => tools.get(name) ?? (tools.set(name, { tool: name, requested: 0, confirmed: 0, notThrough: 0, denied: 0 }), tools.get(name)!);
  const denials: { tool: string; reason: string; c: OpsCase }[] = [];
  const failures: { tool: string; reason: string; c: OpsCase }[] = [];
  const outcomes = new Map<string, number>();
  const steps = new Map<string, number>();

  const rows: CaseRow[] = cases.map((c) => {
    const es = events[c.id] ?? [];
    const decision = [...es].reverse().find((e) => e.kind === 'decision');
    const failed = [...es].reverse().find((e) => e.kind === 'run_failed');
    let confirmed = 0;
    let notThrough = 0;
    let denied = 0;
    for (const e of es) {
      const name = String((e.data as { tool?: string } | null)?.tool ?? '');
      if (ACTION_KINDS.has(e.kind) && e.actor === 'agent' && name) {
        const t = tool(name);
        t.requested++;
        if (e.status === 'verified') (t.confirmed++, confirmed++);
        else {
          t.notThrough++;
          notThrough++;
          failures.push({ tool: name, reason: e.detail || (e.status === 'failed' ? 'Did not go through' : 'Could not be confirmed by read-back'), c });
        }
      }
      if (e.kind === 'blocked' && name) {
        const t = tool(name);
        t.requested++;
        t.denied++;
        denied++;
        denials.push({ tool: name, reason: e.detail ?? '', c });
      }
    }
    const next = ((decision?.data?.next_actions as CaseRow['next'][] | undefined) ?? []).find((n) => n && n.type !== 'WAIT') ?? (decision?.data?.next_actions as CaseRow['next'][] | undefined)?.[0] ?? null;
    for (const n of (decision?.data?.next_actions as { type: string }[] | undefined) ?? []) steps.set(n.type, (steps.get(n.type) ?? 0) + 1);
    const state: CaseRow['state'] = c.status === 'queued' ? 'queued' : c.status === 'agent_working' ? 'running' : c.status === 'failed' ? 'failed' : 'done';
    const outcome = state === 'done' ? (decision ? String(decision.status) : null) : state === 'failed' ? 'no decision' : null;
    if (outcome) outcomes.set(outcome, (outcomes.get(outcome) ?? 0) + 1);
    return {
      c,
      state,
      outcome,
      next,
      confirmed,
      notThrough,
      denied,
      task: tasks.find((t) => t.case_id === c.id) ?? null,
      cost: (runs[c.id] ?? []).reduce((a, r) => a + (r.cost ?? 0), 0),
      error: failed?.detail ?? null,
      reason: stopReason(c, es, tasks),
    };
  });

  const graded = rows.filter((r) => r.c.grade);
  return {
    rows,
    done: rows.filter((r) => r.state === 'done' || r.state === 'failed').length,
    running: rows.filter((r) => r.state === 'running').length,
    queued: rows.filter((r) => r.state === 'queued').length,
    outcomes: [...outcomes].sort((a, b) => b[1] - a[1]),
    needed: rows.filter((r) => r.task).map((r) => ({ c: r.c, t: r.task! })),
    denials: group(denials),
    notThrough: group(failures),
    noDecision: rows.filter((r) => r.state === 'failed'),
    tools: [...tools.values()].sort((a, b) => b.requested - a.requested),
    nextSteps: [...steps].sort((a, b) => b[1] - a[1]),
    cost: rows.reduce((a, r) => a + r.cost, 0),
    byReason: STOP_ORDER.map((r) => [r, rows.filter((x) => x.reason === r).length] as [StopReason, number]).filter(([, n]) => n),
    graded: graded.length,
    meanScore: graded.length ? Math.round(graded.reduce((a, r) => a + r.c.grade!.score, 0) / graded.length) : null,
    critical: graded.filter((r) => r.c.grade!.critical.length).length,
  };
}
