// Failure taxonomy: which harness layer should fix a miss. Deterministic rules over a run's result.json
// (ledger, policyLog, harness log, skills, decision) plus the missed item's text; the first rule that fires wins.
// Routing table: docs/plans/harness-v2-implementation-plan.md, "Where each kind of rule goes".
//   commission (a bad thing happened):  ingest → completion (over-claim) → guard (a tool did it) → skill → critic
//   omission (a needed thing is missing): ingest → guard (blocked / failed unrecovered) → completion (claimed, not in
//                                          the ledger) → brief (conflict not surfaced) → skill → model_judgement
// A judge verdict of "unclear" that no rule explains stays unclassified.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join, relative } from 'node:path';
import type { ConflictKind, Layer, SituationTag } from '../agent/harness/contracts.js';
import { listSkills } from '../agent/skills/index.js';
import { type CheckResult, type ResultJson, TOOL_NAMES } from './checks.js';
import type { GradesJson } from './summary.js';

export const LAYERS: Layer[] = ['ingest', 'brief', 'skill', 'guard', 'completion', 'critic', 'render', 'model_judgement', 'unclassified'];

export type Section = 'required_outcomes' | 'positive_behaviours' | 'red_flags' | 'prohibited_actions' | 'critical_failures';
const BAD: Section[] = ['red_flags', 'prohibited_actions', 'critical_failures'];

export type Miss = {
  caseId: string;
  itemId: string;
  kind: 'rubric' | 'check';
  text: string;
  /** Rubric items: the rubric section. */
  section?: Section;
  /** Rubric items: the judge's verdict. */
  verdict?: string;
  /** Checks: the check kind and its failure detail. */
  checkKind?: CheckResult['kind'];
  detail?: string;
};

/** result.json as written by run.ts with the harness fields; older files lack them. */
export type RunResult = Omit<ResultJson, 'decision'> & {
  decision?: Omit<NonNullable<ResultJson['decision']>, 'next_actions'> & {
    summary?: string;
    case_state?: string;
    next_actions?: { type: string; action?: string; ledger_id?: string }[];
    actions_claimed?: { ledger_id: string; description?: string }[];
    conflicts?: string[];
    assumptions?: string[];
  };
  inputs?: { name: string; method?: string; chars?: number; note?: string }[];
  harness?: {
    flags?: string | Record<string, boolean>;
    tags?: string[];
    skills?: string[];
    errors?: string[];
    log?: { guardBlocks?: { tool: string; rule: string; reason: string }[]; completion?: { check: string; message: string; capped?: boolean }[]; skillsLoaded?: string[] };
    /** Not written yet (requested from the integrator): the brief's conflicts and the ingest manifest. */
    conflicts?: { kind: string }[];
    manifest?: { path: string; included?: boolean; parse?: string }[];
  };
};

export type MissContext = {
  result?: RunResult;
  /** Files in the case folder the agent should see (relative paths, grading files excluded). */
  caseFiles?: string[];
  /** Attachments declared inside the case's emails (MIME filename=…). */
  embeddedFiles?: string[];
};

export type Classification = { layer: Layer; rule: string; reason: string };

// ── Text features ────────────────────────────────────────────────────────────────────────────────

/** Tool families, so "dispatches a plumber" and assign_contractor/set_visit mean the same thing. */
const FAMILIES: Record<string, string[]> = {
  bank: ['update_bank_details'],
  approve: ['approve_quote'],
  close: ['close_ticket'],
  cancel: ['cancel_ticket'],
  ticket: ['create_ticket', 'update_ticket'],
  assign: ['assign_contractor', 'set_visit'],
  escalate: ['escalate_to_human'],
  hold: ['hold_payment', 'put_on_hold'],
  followup: ['schedule_follow_up'],
  message: ['send_message', 'request_information', 'request_landlord_approval'],
};
const FAMILY_TEXT: [string, RegExp][] = [
  ['bank', /\bbank (?:details|account)/i],
  ['approve', /\bapprov(?:e|es|ed|ing)\b|\bpay(?:s|ing)?\b|\bcommit\w* (?:the )?spend|\border\w* (?:the )?parts/i],
  ['close', /\bclos(?:e|es|ed|ing)\b/i],
  ['cancel', /\bcancel/i],
  ['ticket', /\bpriorit|\bdowngrad|\breopen|\b(?:new|separate) (?:ticket|job)|\bto completed\b|\bcreat\w* (?:a |an )?(?:new )?(?:ticket|job)/i],
  ['assign', /\b(?:dispatch|assign|book|send|sends|sending|arrang|instruct)\w*\b[^.;]*\b(?:contractor|engineer|plumber|electrician|handyman|surveyor|specialist|inspection|visit|locksmith|repair)/i],
  ['escalate', /\bescalat/i],
  ['hold', /\bhold\b|\bfreez/i],
  ['followup', /\bfollow[- ]up|\bchase|\breview date|\bschedul/i],
  [
    'message',
    /\b(?:tell|tells|told|telling|inform\w*|notif\w*|repl(?:y|ies|ying)|messag\w*|email\w*|text\w*|asks?|asking|request\w*|advis\w*|explain\w*|contact\w*|acknowledg\w*|promis\w*|admit\w*|disclos\w*|giv(?:e|es|ing)|shar(?:e|es|ing)|offer\w*|threat\w*|address(?:es|ing)? (?:him|her|them|the))\b|\bupdat\w* the (?:tenant|landlord|contractor)/i,
  ],
];
export const familiesIn = (text: string) => FAMILY_TEXT.filter(([, re]) => re.test(text)).map(([f]) => f);
/** For bad behaviour, a message only counts when the item is about what was said ("waits for the tenant to reply" is not). */
const SAID = /\b(?:tell|tells|told|telling|promis\w*|admit\w*|disclos\w*|giv(?:e|es|ing)|shar(?:e|es|ing)|offer\w*|threat\w*|address(?:es|ing)? (?:him|her|them|the)|mention\w*|serv(?:e|es|ing))\b/i;
const commissionFamilies = (text: string) => [...(SAID.test(text) ? ['message'] : []), ...familiesIn(text).filter((f) => f !== 'message' && f !== 'followup' && f !== 'escalate')];

/** Required items phrased as a prohibition ("Does not approve…") are missed by doing the bad thing. */
const NEGATED = /^\s*(?:does not|doesn't|do not|never|avoids?|refuses?|declines?|ignores?|resists?)\b/i;
const OVERCLAIM = /not verified|without (?:a )?(?:matching )?(?:verified )?ledger|claims? (?:to have|that|an? action|it)|tells? (?:someone|the \w+) (?:that )?an? action (?:happened|was done)|(?:states|says|reports) (?:that )?\w+ (?:was|were|has been|have been) (?:done|sent|booked|approved|paid|completed)/i;

/** Item text → the brief conflict it is about. */
const CONFLICT_TEXT: [ConflictKind, RegExp][] = [
  ['company', /different (?:company|firm|business|trading name)|(?:issuer|company|firm)\b[^.]*\b(?:does not match|doesn't match|differs|mismatch|not the (?:one )?(?:assigned|instructed))|not the (?:assigned|instructed) (?:contractor|company|provider)/i],
  ['spend_limit', /spend(?:ing)? limit|approval (?:threshold|limit)|(?:above|exceeds?|over) (?:the |his |her |their )?(?:landlord'?s? )?(?:£\d+ )?(?:limit|threshold)/i],
  ['amount', /(?:above|exceeds?|more than|higher than) the (?:approved|quoted|agreed) (?:amount|quote|figure)|amounts? (?:mismatch|differ)/i],
  ['address', /(?:wrong|different) address|address(?:es)? (?:mismatch|differ|do not match)/i],
  ['name', /(?:wrong|different) (?:name|person|tenant record)|names? (?:mismatch|differ|do not match)/i],
  ['date_past', /in the past|already passed|date has passed/i],
  ['weekday', /weekday|day of the week/i],
  ['gate_order', /before (?:the )?(?:landlord'?s? )?approval|before the visit|invoice dated before/i],
  ['crm_vs_history', /records? (?:disagree|conflict)|crm\b[^.]*\b(?:out of date|differs|conflicts?)|contact details (?:differ|changed)/i],
  ['attachment_missing', /attachment\b[^.]*\b(?:missing|not attached|absent)|referenced but not (?:attached|provided|given)/i],
  ['other', /bank details? (?:mismatch|differ)|different bank|(?:invoice|quote) and (?:the )?(?:record|ticket) disagree/i],
];
export const conflictIn = (text: string) => CONFLICT_TEXT.find(([, re]) => re.test(text))?.[0];
const CONFLICT_TOKENS: Record<ConflictKind, RegExp> = {
  company: /compan|issuer|subcontract|trading/i,
  spend_limit: /limit|threshold/i,
  amount: /amount|£/i,
  address: /address/i,
  name: /name/i,
  date_past: /past|passed/i,
  weekday: /weekday|day/i,
  gate_order: /before|order/i,
  crm_vs_history: /crm|record/i,
  attachment_missing: /attach/i,
  other: /bank|mismatch/i,
};

/** Item text → the situations it is about (the classifier's vocabulary). */
const TAG_TEXT: [SituationTag, RegExp][] = [
  ['gas', /\bgas\b|0800 111 999|gas safe/i],
  ['co', /carbon monoxide|\bCO alarm|\bCO\b/],
  ['water', /\bleak|\bwater\b|flood|stopcock|escape of water/i],
  ['electrical', /electric|sparking|socket|consumer unit|\bEICR\b/i],
  ['fire', /\bfire\b|smoke alarm/i],
  ['damp_mould', /\bdamp|\bmould|\bmold\b|condensation|awaab/i],
  ['out_of_hours', /out[- ]of[- ]hours/i],
  ['landlord_approval', /landlord'?s? approval|approval (?:from|of) the landlord|request\w* (?:landlord )?approval|spend limit|approval threshold/i],
  ['quote_invoice', /\bquote|\binvoice/i],
  ['contractor_chase', /\bchase|no[- ]show|not (?:attended|turned up)/i],
  ['closure', /\bclos(?:e|es|ing|ure)\b/i],
  ['legal_claim', /letter of claim|solicitor|liabilit|disrepair claim|compensation/i],
  ['deposit', /\bdeposit/i],
  ['arrears', /arrears|breathing space/i],
  ['identity_privacy', /\bconsent|personal (?:data|details)|phone number|contact details|\bidentity|\bverif(?:y|ied|ication) (?:the )?(?:caller|identity)|gdpr|data protection/i],
  ['vulnerable', /vulnerab|elderly|\bchild|\bbaby|toddler|infant|pregnan|disabl|wheelchair|asthma|respiratory|mobility/i],
  ['void_keys', /\bvoid\b|\bkeys?\b|caretaker|key ?safe|unoccupied|vacant/i],
  ['unrelated_issue', /unrelated|separate (?:ticket|job|issue)|new (?:ticket|job)|bundled|reopen/i],
  ['fraud_injection', /inject|embedded instruction|hidden instruction|fraud|bank details/i],
  ['access_entry', /24 ?h(?:ours?)?'? notice|\bentry\b|\benter\b|access/i],
  ['compliance', /certificate|\bCP12\b|gas safety record|smoke and co alarm/i],
  ['tenancy_lifecycle', /notice to quit|end of tenancy|tenancy end|section 8|section 21|move[- ]out/i],
];
export const tagsIn = (text: string) => TAG_TEXT.filter(([, re]) => re.test(text)).map(([t]) => t);

/** Fallback when the skills module lists none: the playbooks the plan names, by the situations they cover. */
const SKILL_TAGS_FALLBACK: Record<string, SituationTag[]> = {
  'landlord-approval': ['landlord_approval'],
  'quote-invoice': ['quote_invoice'],
  'contractor-chase': ['contractor_chase'],
  closure: ['closure'],
  'gas-emergency': ['gas'],
  'co-alarm': ['co'],
  'water-electrical-fire': ['water', 'electrical', 'fire'],
  'out-of-hours': ['out_of_hours'],
  'damp-mould-awaab': ['damp_mould'],
  'legal-claim': ['legal_claim'],
  'deposit-tenancy-end': ['deposit', 'tenancy_lifecycle'],
  'arrears-breathing-space': ['arrears'],
  'identity-privacy': ['identity_privacy'],
  'vulnerable-occupant': ['vulnerable'],
  'void-keys-access': ['void_keys', 'access_entry'],
  'unrelated-issue-split': ['unrelated_issue'],
  'fraud-injection': ['fraud_injection'],
  compliance: ['compliance'],
};
function skillTags(): Record<string, SituationTag[]> {
  let listed: { id: string; tags: SituationTag[] }[] = [];
  try {
    listed = listSkills();
  } catch {
    // A broken skills module must not stop the eval: fall back to the plan's names.
  }
  return listed.length ? Object.fromEntries(listed.map((s) => [s.id, s.tags])) : SKILL_TAGS_FALLBACK;
}
const skillsFor = (tags: SituationTag[], table: Record<string, SituationTag[]>) => Object.keys(table).filter((id) => table[id].some((t) => tags.includes(t)));

const FILE_REF = /[\w./-]+\.(?:eml|pdf|json|txt|md|csv|png|jpe?g|gif|webp|docx?|xlsx?|zip|html?)\b/gi;

/** "I have sent…", "has been booked…": the done-claims in the decision's prose, by tool family. */
const CLAIM_VERBS: Record<string, string> = {
  sent: 'message', emailed: 'message', texted: 'message', messaged: 'message', told: 'message', informed: 'message', notified: 'message', replied: 'message', contacted: 'message', asked: 'message', requested: 'message',
  assigned: 'assign', booked: 'assign', dispatched: 'assign', instructed: 'assign', arranged: 'assign',
  approved: 'approve', paid: 'approve',
  closed: 'close',
  cancelled: 'cancel',
  escalated: 'escalate',
  created: 'ticket', opened: 'ticket', raised: 'ticket', logged: 'ticket',
  held: 'hold', frozen: 'hold',
  scheduled: 'followup',
};
const CLAIM = /\b(?:I|we)\s+(?:have\s+|'ve\s+)?(\w+)\b|\b(?:has|have)\s+(?:now\s+)?been\s+(\w+)\b/gi;
const ACTION_TYPE_FAMILY: [RegExp, string][] = [
  [/ESCALATE/, 'escalate'],
  [/APPROV/, 'approve'],
  [/CLOSE/, 'close'],
  [/ASSIGN|DISPATCH|BOOK|VISIT/, 'assign'],
  [/REPLY|MESSAGE|NOTIFY|INFORM|REQUEST|ASK/, 'message'],
];

// ── Run facts ────────────────────────────────────────────────────────────────────────────────────

function runFacts(r: RunResult) {
  const ledger = r.ledger ?? [];
  const verifiedIds = new Set(ledger.filter((e) => e.status === 'verified').map((e) => e.id));
  const toolsIn = (family: string[]) => (e: { tool: string }) => family.includes(e.tool);
  const verified = (tools: string[]) => ledger.some((e) => toolsIn(tools)(e) && e.status === 'verified');
  const unverified = (tools: string[]) => ledger.filter((e) => toolsIn(tools)(e) && e.status !== 'verified');
  const blocks = [...(r.policyLog ?? []).map((p) => ({ tool: p.tool, rule: 'policy', reason: p.reason })), ...(r.harness?.log?.guardBlocks ?? [])];
  const blocked = (tools: string[]) => blocks.filter(toolsIn(tools));
  const d = r.decision ?? {};
  const prose = [d.summary, d.case_state, ...(d.answers ?? []).map((a) => a.answer), ...(d.next_actions ?? []).map((n) => n.action), ...(d.actions_claimed ?? []).map((a) => a.description)].filter(Boolean).join('\n');
  const claimed = new Set<string>();
  for (const m of prose.matchAll(CLAIM)) {
    const f = CLAIM_VERBS[(m[1] ?? m[2] ?? '').toLowerCase()];
    if (f) claimed.add(f);
  }
  for (const n of d.next_actions ?? []) {
    if (!n.ledger_id || verifiedIds.has(n.ledger_id)) continue;
    const entry = ledger.find((e) => e.id === n.ledger_id);
    const f = entry ? Object.keys(FAMILIES).find((k) => FAMILIES[k].includes(entry.tool)) : ACTION_TYPE_FAMILY.find(([re]) => re.test(n.type))?.[1];
    if (f) claimed.add(f);
  }
  for (const a of d.actions_claimed ?? []) {
    if (verifiedIds.has(a.ledger_id)) continue;
    const entry = ledger.find((e) => e.id === a.ledger_id);
    const f = entry && Object.keys(FAMILIES).find((k) => FAMILIES[k].includes(entry.tool));
    if (f) claimed.add(f);
  }
  const loaded = [...new Set([...(r.harness?.skills ?? []), ...(r.harness?.log?.skillsLoaded ?? [])])];
  const acknowledged = [...(d.conflicts ?? []), ...(d.assumptions ?? [])].join('\n');
  return { verified, unverified, blocked, claimed, loaded, acknowledged };
}

function manifestNames(r: RunResult): string[] {
  const m = r.harness?.manifest?.filter((e) => e.included !== false).map((e) => e.path);
  return m?.length ? m : (r.inputs ?? []).map((i) => i.name);
}

const sameFile = (a: string, b: string) => basename(a).toLowerCase() === basename(b).toLowerCase();

// ── The rules ────────────────────────────────────────────────────────────────────────────────────

function ingestRule(text: string, ctx: MissContext): Classification | undefined {
  const r = ctx.result!;
  const refs = [...new Set([...text.matchAll(FILE_REF)].map((m) => m[0]))];
  if (!refs.length) return undefined;
  const manifest = manifestNames(r);
  for (const ref of refs) {
    const inManifest = manifest.find((n) => sameFile(n, ref) || n.toLowerCase().endsWith(`#${basename(ref).toLowerCase()}`));
    const inFolder = ctx.caseFiles?.find((f) => sameFile(f, ref));
    if (inFolder && !inManifest) return { layer: 'ingest', rule: 'file_not_in_manifest', reason: `${inFolder} is in the case folder but not among the inputs the agent saw` };
    const parsed = inManifest && r.inputs?.find((i) => sameFile(i.name, inManifest));
    if (parsed && (parsed.method === 'too-large' || parsed.chars === 0)) return { layer: 'ingest', rule: 'file_unreadable', reason: `${parsed.name} was parsed as ${parsed.method} with ${parsed.chars ?? '?'} chars` };
    const embedded = ctx.embeddedFiles?.find((f) => sameFile(f, ref));
    if (embedded && !inManifest) return { layer: 'ingest', rule: 'attachment_not_extracted', reason: `${embedded} is attached inside a case email but was never extracted as an input` };
  }
  return undefined;
}

const notUnclear = (miss: Miss, c: Classification): Classification =>
  miss.verdict === 'unclear' && (c.layer === 'model_judgement' || c.layer === 'critic') ? { layer: 'unclassified', rule: 'judge_unclear', reason: `judge verdict unclear; otherwise ${c.layer} (${c.rule})` } : c;

function commission(miss: Miss, ctx: MissContext, text: string): Classification {
  const r = ctx.result!;
  const f = runFacts(r);
  if (OVERCLAIM.test(text)) return { layer: 'completion', rule: 'overclaim', reason: 'the item is a claim of an action the ledger does not verify' };
  for (const fam of commissionFamilies(text)) {
    if (f.verified(FAMILIES[fam])) return { layer: 'guard', rule: 'prohibited_action_executed', reason: `a verified ${FAMILIES[fam].join('/')} call carried out the prohibited behaviour` };
  }
  const table = skillTags();
  const tags = tagsIn(text);
  const covered = tags.filter((t) => f.loaded.some((id) => table[id]?.includes(t)));
  if (tags.length && !covered.length) return { layer: 'skill', rule: 'skill_not_loaded', reason: `situation ${tags.join(', ')}: no loaded skill covers it (expected ${skillsFor(tags, table).join(', ') || 'none named'})` };
  return notUnclear(miss, { layer: 'critic', rule: 'prose_red_flag', reason: tags.length ? `skill ${covered.join(', ')} context was loaded and the bad behaviour still reached the answer` : 'a bad behaviour in the answer that no tool call carried out' });
}

function omission(miss: Miss, ctx: MissContext, text: string, families: string[]): Classification {
  const r = ctx.result!;
  const f = runFacts(r);
  // Families named by the item with no verified call: was the call blocked, did it fail, or was it only claimed?
  const missing = families.filter((fam) => !f.verified(FAMILIES[fam] ?? [fam]));
  const tools = missing.flatMap((fam) => FAMILIES[fam] ?? [fam]);
  const blocks = f.blocked(tools);
  if (blocks.length) return { layer: 'guard', rule: 'blocked_needed_action', reason: `${blocks.length} block(s) on ${[...new Set(blocks.map((b) => b.tool))].join('/')} (${[...new Set(blocks.map((b) => b.rule))].join(', ')}) and no verified call` };
  const failed = f.unverified(tools);
  if (failed.length) return { layer: 'guard', rule: 'tool_failure_unrecovered', reason: `${failed.map((e) => `${e.id} ${e.tool} ${e.status}`).join(', ')} never verified` };
  const claimed = missing.filter((fam) => f.claimed.has(FAMILIES[fam] ? fam : (Object.keys(FAMILIES).find((k) => FAMILIES[k].includes(fam)) ?? fam)));
  if (claimed.length) return { layer: 'completion', rule: 'claim_not_in_ledger', reason: `the decision claims ${claimed.join(', ')} with no verified ledger entry` };
  const conflict = conflictIn(text);
  if (conflict) {
    const recorded = r.harness?.conflicts;
    const inBrief = recorded?.some((c) => c.kind === conflict);
    const seen = CONFLICT_TOKENS[conflict].test(f.acknowledged);
    if (!inBrief && !seen) return { layer: 'brief', rule: 'conflict_not_in_brief', reason: `${conflict} conflict ${recorded ? 'absent from the brief' : 'not surfaced (no brief conflicts recorded)'} and not acknowledged in the decision` };
  }
  const table = skillTags();
  const tags = tagsIn(text);
  const covered = tags.filter((t) => f.loaded.some((id) => table[id]?.includes(t)));
  if (tags.length && !covered.length) return { layer: 'skill', rule: 'skill_not_loaded', reason: `situation ${tags.join(', ')}: no loaded skill covers it (expected ${skillsFor(tags, table).join(', ') || 'none named'})` };
  return notUnclear(miss, { layer: 'model_judgement', rule: 'model_missed', reason: covered.length ? `skill context for ${covered.join(', ')} was loaded` : 'no harness rule explains the miss' });
}

/** Which layer should fix this miss, with the rule that fired and why. */
export function explainMiss(miss: Miss, ctx: MissContext): Classification {
  const r = ctx.result;
  if (!r?.decision) return { layer: 'unclassified', rule: 'no_decision', reason: r?.error ? `no decision: ${r.error}` : 'no result.json or no decision' };
  const text = [miss.text, miss.detail].filter(Boolean).join(' ');
  const ingest = ingestRule(text, ctx);
  if (ingest) return ingest;
  if (miss.kind === 'check') {
    switch (miss.checkKind) {
      case 'tool_not_called':
        return { layer: 'guard', rule: 'prohibited_tool_ran', reason: `check ${miss.itemId}: ${miss.detail ?? 'a prohibited tool ran'}` };
      case 'no_fabricated_ids':
        return { layer: 'completion', rule: 'fabricated_id', reason: `check ${miss.itemId}: ${miss.detail ?? 'unknown id cited'}` };
      case 'decision_points_answered':
        return { layer: 'completion', rule: 'questions_unanswered', reason: `check ${miss.itemId}: ${miss.detail ?? 'questions unanswered'}` };
      case 'party_informed':
        return omission(miss, ctx, text, ['message']);
      default: {
        const tool = TOOL_NAMES.filter((t) => (miss.detail ?? '').includes(t)).sort((a, b) => b.length - a.length)[0];
        return omission(miss, ctx, text, tool ? [tool] : familiesIn(text));
      }
    }
  }
  const bad = (miss.section && BAD.includes(miss.section)) || NEGATED.test(miss.text);
  return bad ? commission(miss, ctx, text) : omission(miss, ctx, text, familiesIn(miss.text));
}

/** The contract's entry point: the layer only. */
export function classifyMiss(miss: Miss, ctx: MissContext | unknown): Layer {
  return explainMiss(miss, (ctx ?? {}) as MissContext).layer;
}

// ── Collecting and summarising ───────────────────────────────────────────────────────────────────

type GradeItems = Omit<GradesJson, 'items'> & { items?: { id: string; key: string; text?: string }[] };

/** Every missed rubric item (required/positive not met; red flag/prohibited/critical not cleared) and failed check. */
export function collectMisses(caseId: string, grades: GradeItems | undefined, checks: CheckResult[]): Miss[] {
  const verdicts = new Map((grades?.grades?.items ?? []).map((g) => [g.id, g.verdict]));
  const rubric: Miss[] = (grades?.items ?? []).flatMap((it) => {
    const section = it.key as Section;
    const v = verdicts.get(it.id);
    if (!v) return [];
    const missed = BAD.includes(section) ? v !== 'false' : section === 'required_outcomes' || section === 'positive_behaviours' ? v !== 'true' : false;
    return missed ? [{ caseId, itemId: it.id, kind: 'rubric' as const, text: it.text ?? '', section, verdict: v }] : [];
  });
  const failed: Miss[] = checks.filter((c) => !c.pass).map((c) => ({ caseId, itemId: c.id, kind: 'check' as const, text: c.id, checkKind: c.kind, detail: c.detail }));
  return [...rubric, ...failed];
}

const HIDDEN = new Set(['rubric.json', 'tool_failures.json', 'checks.json', 'expected.json']);

/** The case files the agent should see, and the attachments named inside its emails. Missing folders give empty lists. */
export function caseFileIndex(caseDir: string): { caseFiles: string[]; embeddedFiles: string[] } {
  if (!existsSync(caseDir)) return { caseFiles: [], embeddedFiles: [] };
  const walk = (d: string): string[] => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
  const files = walk(caseDir).filter((p) => !HIDDEN.has(basename(p)));
  const brief = new Set(['case.md', 'CASE.md', 'README.md', 'task.md', 'index.md']);
  const caseFiles = files.map((p) => relative(caseDir, p)).filter((p) => !brief.has(p));
  const embeddedFiles = files
    .filter((p) => p.toLowerCase().endsWith('.eml'))
    .flatMap((p) => [...readFileSync(p, 'utf8').matchAll(/\b(?:file)?name\*?="?([^";\r\n]+\.[A-Za-z0-9]{2,5})"?/gi)].map((m) => m[1].trim()));
  return { caseFiles, embeddedFiles: [...new Set(embeddedFiles)] };
}

export type ClassifiedMiss = Miss & Classification & { key: string; run: number };

export function classifyRun(o: { key: string; run: number; caseDir: string; result?: RunResult; grades?: GradeItems; checks: CheckResult[] }): ClassifiedMiss[] {
  const ctx: MissContext = { result: o.result, ...caseFileIndex(o.caseDir) };
  return collectMisses(o.key, o.grades, o.checks).map((m) => ({ key: o.key, run: o.run, ...m, ...explainMiss(m, ctx) }));
}

export type Taxonomy = {
  runs: number;
  misses: number;
  byLayer: Record<Layer, number>;
  /** Per layer: how many distinct cases have at least one miss there, and the rules that fired. */
  layers: { layer: Layer; misses: number; cases: number; rules: Record<string, number> }[];
  items: ClassifiedMiss[];
};

export function summarizeTaxonomy(items: ClassifiedMiss[], runs: number): Taxonomy {
  const byLayer = Object.fromEntries(LAYERS.map((l) => [l, items.filter((i) => i.layer === l).length])) as Record<Layer, number>;
  const layers = LAYERS.map((layer) => {
    const mine = items.filter((i) => i.layer === layer);
    const rules: Record<string, number> = {};
    for (const i of mine) rules[i.rule] = (rules[i.rule] ?? 0) + 1;
    return { layer, misses: mine.length, cases: new Set(mine.map((i) => i.key)).size, rules };
  }).filter((l) => l.misses);
  return { runs, misses: items.length, byLayer, layers, items };
}

/** One row per layer with misses, for console.table. */
export const layerTable = (t: Taxonomy) =>
  t.layers.map((l) => ({
    layer: l.layer,
    misses: l.misses,
    cases: l.cases,
    rules: Object.entries(l.rules)
      .sort((a, b) => b[1] - a[1])
      .map(([r, n]) => `${r} ${n}`)
      .join(', '),
  }));
