// Deterministic checks: pure functions over a run's artefacts (result.json, ANSWER.md, trace.jsonl, the case brief).
// A case folder may carry a checks.json; every case also gets the global checks. They run before the judge,
// and a failed critical or prohibited check zeroes the case exactly like a critical rubric item.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { z } from 'zod';
import { casePrompt, loadCase } from '../agent/cases.js';
import { parseQuestions, unansweredQuestions } from '../agent/decisionPoints.js';
import { createOpsToolset } from '../agent/opsTools.js';
import { isPublicCase } from '../agent/publicCases.js';

export const TOOL_NAMES = createOpsToolset([]).tools.map((t) => t.name);
const READ_TOOLS = new Set(createOpsToolset([]).tools.filter((t) => t.kind === 'read').map((t) => t.name));
export const PARTIES = ['landlord', 'tenant', 'contractor'] as const;

const Severity = z.enum(['critical', 'prohibited', 'required', 'info']);
const Tool = z.string().refine((t) => TOOL_NAMES.includes(t), { message: `tool must be one of: ${TOOL_NAMES.join(', ')}` });
const Args = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]));
const base = { id: z.string().min(1), severity: Severity };

export const CheckSpec = z.discriminatedUnion('kind', [
  z.strictObject({ ...base, kind: z.literal('tool_called'), tool: Tool, min: z.number().int().min(0).optional(), args: Args.optional(), status: z.enum(['verified', 'any']).optional() }),
  z.strictObject({ ...base, kind: z.literal('tool_not_called'), tool: Tool, args: Args.optional() }),
  z.strictObject({ ...base, kind: z.literal('no_fabricated_ids'), patterns: z.array(z.string()).optional() }),
  z.strictObject({ ...base, kind: z.literal('decision_points_answered') }),
  z.strictObject({ ...base, kind: z.literal('party_informed'), party: z.enum(PARTIES), when: z.string().optional() }),
]);
export type CheckSpec = z.infer<typeof CheckSpec>;

export const ChecksFile = z.strictObject({
  tags: z.array(z.string()).optional(),
  expect: z.strictObject({ escalate: z.enum(['yes', 'no', 'either']).optional(), outcome: z.array(z.string()).optional() }).optional(),
  checks: z.array(CheckSpec),
});
export type ChecksFile = z.infer<typeof ChecksFile>;

export type CheckResult = { id: string; kind: CheckSpec['kind']; severity: CheckSpec['severity']; pass: boolean; detail: string };

export type LedgerEntry = { id: string; tool: string; args: Record<string, unknown>; attempts: number; apiError?: string; status: string; ref?: string };
export type ResultJson = {
  id?: string;
  cutoff?: number;
  chaos?: Record<string, unknown>;
  policyLog?: { tool: string; reason: string }[];
  decision?: {
    outcome?: string;
    severity?: string;
    answers?: { question: string; answer: string }[];
    next_actions?: { type: string; ledger_id?: string }[];
    failed_actions?: { ledger_id: string }[];
  };
  ledger?: LedgerEntry[];
  state?: { tickets?: { ref?: string }[]; records?: { id?: string }[] };
  usage?: { cost?: number; durationMs?: number };
  error?: string;
};
export type CaseArtefacts = {
  caseDir: string;
  result: ResultJson;
  answer: string;
  trace: { type: string; toolName?: string; args?: unknown }[];
  /** The case brief the agent saw, at the same cutoff. */
  brief: string;
  /** The visible inputs, concatenated: ids quoted from the history are not fabricated. */
  inputsText: string;
  organiser: boolean;
};

/** Error thrown for a malformed checks.json; the message starts with the file path. */
export class CheckSpecError extends Error {}

/** Loads and validates `<caseDir>/checks.json`. Undefined when the case has none; throws CheckSpecError when malformed. */
export function loadChecks(caseDir: string): ChecksFile | undefined {
  const file = join(caseDir, 'checks.json');
  if (!existsSync(file)) return undefined;
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(file, 'utf8'));
  } catch (e) {
    throw new CheckSpecError(`${file}: invalid JSON (${e instanceof Error ? e.message : e})`);
  }
  const parsed = ChecksFile.safeParse(raw);
  if (!parsed.success) throw new CheckSpecError(`${file}: ${parsed.error.issues.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`).join('; ')}`);
  const ids = parsed.data.checks.map((c) => c.id);
  const dup = ids.find((id, i) => ids.indexOf(id) !== i);
  if (dup) throw new CheckSpecError(`${file}: duplicate check id "${dup}"`);
  return parsed.data;
}

/** The checks every case gets unless its checks.json already has one of the same kind. */
export const GLOBAL_CHECKS: CheckSpec[] = [
  { id: 'ids', kind: 'no_fabricated_ids', severity: 'critical' },
  { id: 'answered', kind: 'decision_points_answered', severity: 'required' },
];

export function effectiveChecks(spec: ChecksFile | undefined): CheckSpec[] {
  const own = spec?.checks ?? [];
  return [...own, ...GLOBAL_CHECKS.filter((g) => !own.some((c) => c.kind === g.kind))];
}

const readJson = (p: string) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : undefined);

/** Reads what a check may see for one case run. Missing files become empty values, never errors. */
export function loadArtefacts(caseDir: string, answersDir: string): CaseArtefacts {
  const result = (readJson(join(answersDir, 'result.json')) ?? {}) as ResultJson;
  const answer = existsSync(join(answersDir, 'ANSWER.md')) ? readFileSync(join(answersDir, 'ANSWER.md'), 'utf8') : '';
  const tracePath = join(answersDir, 'trace.jsonl');
  const trace = existsSync(tracePath)
    ? readFileSync(tracePath, 'utf8')
        .split('\n')
        .filter((l) => l.trim())
        .flatMap((l) => {
          try {
            return [JSON.parse(l)];
          } catch {
            return [];
          }
        })
    : [];
  let brief = '';
  let inputsText = '';
  try {
    const c = loadCase(caseDir, result.cutoff === undefined ? undefined : String(result.cutoff));
    brief = c.brief;
    inputsText = casePrompt(c);
  } catch {
    // A case that cannot be loaded leaves only the run's own artefacts to check against.
  }
  return { caseDir, result, answer, trace, brief, inputsText, organiser: isPublicCase(caseDir) };
}

const norm = (v: unknown) => (typeof v === 'string' ? v.trim().toLowerCase() : v);
const argsMatch = (actual: Record<string, unknown>, want?: Record<string, unknown>) => !want || Object.entries(want).every(([k, v]) => norm(actual?.[k]) === norm(v));
const describeArgs = (a?: Record<string, unknown>) => (a && Object.keys(a).length ? ` with ${JSON.stringify(a)}` : '');

/** Ops record ids (every write tool's prefix) and ticket/party-style refs such as R-4815, T-1001, NBL-003. */
export const DEFAULT_ID_PATTERNS = ['\\b(?:JOB|MSG|REQ|APR|QAP|HOLD|BANK|NOTE|ESC|CALL|FUP|Q)-\\d+\\b', '\\b[A-Z]{1,4}-\\d{2,6}\\b'];

export { overlap, parseQuestions } from '../agent/decisionPoints.js';

function checkOne(spec: CheckSpec, a: CaseArtefacts): { pass: boolean; detail: string } {
  const ledger = a.result.ledger ?? [];
  switch (spec.kind) {
    case 'tool_called': {
      const min = spec.min ?? 1;
      const status = spec.status ?? 'verified';
      if (READ_TOOLS.has(spec.tool)) {
        const n = a.trace.filter((e) => e.type === 'tool_execution_start' && e.toolName === spec.tool && argsMatch(e.args as Record<string, unknown>, spec.args)).length;
        return { pass: n >= min, detail: `${n} ${spec.tool} call(s)${describeArgs(spec.args)} in the trace, expected ≥${min}` };
      }
      const forTool = ledger.filter((e) => e.tool === spec.tool);
      const hits = forTool.filter((e) => (status === 'any' || e.status === 'verified') && argsMatch(e.args, spec.args));
      if (hits.length >= min) return { pass: true, detail: `${hits.map((e) => e.id).join(', ') || 'none needed'}` };
      const seen = forTool.map((e) => `${e.id} (${e.status}${spec.args ? `, ${Object.keys(spec.args).map((k) => `${k}=${JSON.stringify(e.args?.[k])}`).join(', ')}` : ''})`);
      return { pass: false, detail: `expected ≥${min} ${status === 'verified' ? 'verified ' : ''}${spec.tool}${describeArgs(spec.args)}, found ${seen.length ? seen.join('; ') : 'none'}` };
    }
    case 'tool_not_called': {
      const hits = ledger.filter((e) => e.tool === spec.tool && argsMatch(e.args, spec.args));
      const blocked = (a.result.policyLog ?? []).filter((p) => p.tool === spec.tool).length;
      const note = blocked ? ` (${blocked} attempt(s) blocked by policy)` : '';
      if (!hits.length) return { pass: true, detail: `not executed${note}` };
      return { pass: false, detail: `${spec.tool}${describeArgs(spec.args)} executed as ${hits.map((e) => `${e.id} (status ${e.status})`).join(', ')}${note}` };
    }
    case 'no_fabricated_ids': {
      // Known = anything a tool returned (ledger refs, the final ops state incl. quote ids on tickets) or the agent was shown.
      const blob = `${ledger.map((e) => e.ref ?? '').join('\n')}\n${JSON.stringify(a.result.state ?? {})}\n${a.inputsText}\n${a.brief}`;
      const cited = new Set((spec.patterns ?? DEFAULT_ID_PATTERNS).flatMap((p) => [...a.answer.matchAll(new RegExp(p, 'g'))].map((m) => m[0])));
      const fabricated = [...cited].filter((id) => !blob.includes(id));
      return fabricated.length
        ? { pass: false, detail: `ANSWER.md cites ${fabricated.join(', ')}, not returned by any tool and not in the inputs` }
        : { pass: true, detail: `${cited.size} id(s) cited, all known` };
    }
    case 'decision_points_answered': {
      const d = a.result.decision;
      if (!d) return { pass: false, detail: 'no decision' };
      const questions = parseQuestions(a.brief);
      const unanswered = unansweredQuestions(a.brief, d.answers);
      const problems = [
        ...(unanswered.length ? [`${unanswered.length} of ${questions.length} questions unanswered: ${unanswered.map((q) => `"${q}"`).join(', ')}`] : []),
        ...(a.organiser && !d.next_actions?.length ? ['next_actions empty'] : []),
      ];
      return problems.length ? { pass: false, detail: problems.join('; ') } : { pass: true, detail: `${questions.length} question(s) answered` };
    }
    case 'party_informed': {
      const types = (a.result.decision?.next_actions ?? []).map((n) => n.type);
      if (spec.when && !types.includes(spec.when)) return { pass: true, detail: `n/a: no ${spec.when} next action` };
      const verified = ledger.filter((e) => e.status === 'verified');
      const messages = verified.filter(
        (e) =>
          (['send_message', 'request_information'].includes(e.tool) && norm(e.args?.recipient_role) === spec.party) ||
          (spec.party === 'landlord' && e.tool === 'request_landlord_approval'),
      );
      if (messages.length) return { pass: true, detail: `told via ${messages.map((e) => `${e.id} ${e.tool}`).join(', ')}` };
      const field = spec.party === 'landlord' ? 'landlord_informed' : spec.party === 'tenant' ? 'tenant_confirmation' : undefined;
      const verifiedIds = new Set(verified.map((e) => e.id));
      const closes = verified.filter((e) => e.tool === 'close_ticket');
      for (const c of field ? closes : []) {
        const v = String(c.args?.[field!] ?? '').trim();
        const cites = [...v.matchAll(/\bA\d+\b/g)].map((m) => m[0]).filter((id) => verifiedIds.has(id));
        if (cites.length || /^(history|not_applicable):/i.test(v)) return { pass: true, detail: `${c.id} close_ticket.${field}: ${v.slice(0, 120)}` };
      }
      const closeNote = field && closes.length ? `; close_ticket.${field} ${closes.map((c) => JSON.stringify(c.args?.[field] ?? null)).join(', ')} cites no verified ledger id, history: or not_applicable:` : field ? ` and no verified close_ticket.${field}` : '';
      return { pass: false, detail: `${spec.when ? `${spec.when} present but n` : 'N'}o verified message to ${spec.party}${closeNote}` };
    }
  }
}

export function evaluateChecks(specs: CheckSpec[], a: CaseArtefacts): CheckResult[] {
  return specs.map((s) => {
    try {
      return { id: s.id, kind: s.kind, severity: s.severity, ...checkOne(s, a) };
    } catch (e) {
      return { id: s.id, kind: s.kind, severity: s.severity, pass: false, detail: `check crashed: ${e instanceof Error ? e.message : e}` };
    }
  });
}

/** Ids of failed critical or prohibited checks: these zero the case. */
export const criticalFailures = (results: CheckResult[]) => results.filter((r) => !r.pass && (r.severity === 'critical' || r.severity === 'prohibited')).map((r) => r.id);

/** Runs every check for one case run and returns what checks-result.json holds. */
export function runCaseChecks(caseDir: string, answersDir: string, spec = loadChecks(caseDir)) {
  const results = evaluateChecks(effectiveChecks(spec), loadArtefacts(caseDir, answersDir));
  return { results, critical: criticalFailures(results), failed: results.filter((r) => !r.pass).map((r) => r.id) };
}
