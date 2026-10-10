import type { CaseBundle, CompletionCheck, Conflict, ConflictKind, GuardContext, SituationTag } from '../harness/contracts.js';
import type { LedgerEntry } from '../ledger.js';
import { quoteAppears } from '../opsChecks.js';
import { caseToday, parseDay } from './dates.js';

const str = (v: unknown): string => (typeof v === 'string' ? v : Array.isArray(v) ? v.map(str).join(' ') : '');
const has = (v: unknown) => String(v ?? '').trim().length > 0;
const clip = (s: string, n = 120) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const verified = (ctx: GuardContext) => ctx.ledger.filter((e) => e.status === 'verified');
const role = (e: LedgerEntry) => String(e.args.recipient_role ?? e.args.party_role ?? '');

// F1 ------------------------------------------------------------------------------------------

const SAFETY_TAGS: SituationTag[] = ['gas', 'co', 'water', 'electrical', 'fire'];
const SAFETY_ADVICE =
  /\b(999|0800 ?111 ?999|evacuat\w*|leave (the|your) (property|flat|house|home|building|room)|get out|open (all )?(the )?windows|ventilat\w*|fresh air|(turn|switch|shut) (it |the \w+ )?off|isolat\w*|stop ?cock|stop ?tap|do not use|don't use|keep (out|away|clear)|national gas|emergency)\b/i;
const URGENT_CONTACT = /\b(emergency|urgent(ly)?|make (it |the \w+ )?safe|out[- ]of[- ]hours|immediately|asap|attend (today|tonight|now))\b/i;
const SAFETY_REASON = /\b(safe|safety|emergency|risk|danger(ous)?|hazard(ous)?|isolated|capped)\b/i;

function emergencyAction(e: LedgerEntry, ctx: GuardContext): boolean {
  const a = e.args;
  const body = `${str(a.body)} ${str(a.questions)} ${str(a.summary)}`;
  const reached = e.tool !== 'log_call' || a.outcome === 'connected';
  if (e.tool === 'escalate_to_human') return /^(P1|urgent|emergency)$/i.test(String(a.priority ?? ''));
  if (e.tool === 'assign_contractor')
    return ctx.state?.tickets?.find((t) => t.ref === a.ticket_ref)?.severity === 'emergency' || URGENT_CONTACT.test(`${str(a.visit_window)} ${str(a.contractor)}`);
  if (!['send_message', 'request_information', 'log_call'].includes(e.tool) || !reached) return false;
  if (['tenant', 'neighbour'].includes(role(e))) return SAFETY_ADVICE.test(body);
  if (['contractor', 'third_party'].includes(role(e))) return URGENT_CONTACT.test(body);
  return false;
}

export const safetyAddressed: CompletionCheck = {
  id: 'safety_addressed',
  check(d, ctx) {
    const tags = SAFETY_TAGS.filter((t) => ctx.brief?.tags?.includes(t));
    if (!tags.length && d.severity !== 'emergency') return [];
    if (verified(ctx).some((e) => emergencyAction(e, ctx))) return [];
    if ((d.assumptions ?? []).some((a) => SAFETY_REASON.test(str(a)))) return [];
    const why = tags.length ? `The case involves ${tags.join(', ')}` : 'Severity is emergency';
    return [
      {
        check: 'safety_addressed',
        message: `${why} but no verified safety action is in the ledger. Do one of: escalate_to_human with priority P1; get the emergency contractor or service out (assign_contractor on an emergency ticket, or send_message to them saying it is an emergency); or send the occupant safety advice (send_message to the tenant: keep away or leave, ventilate, isolate the supply, call 0800 111 999 or 999). If there is no live risk (already made safe, historic, or not dangerous), add an assumption that says so and why.`,
      },
    ];
  },
};

// F2 ------------------------------------------------------------------------------------------

const REVIEW_TOOLS = ['put_on_hold', 'schedule_follow_up'];
const reviewDate = (e: LedgerEntry) => String((e.tool === 'put_on_hold' ? e.args.review_on : e.args.due_on) ?? '');

export const reviewDatesValid: CompletionCheck = {
  id: 'review_dates_valid',
  check(d, ctx) {
    const today = caseToday(ctx);
    const bad = (v: string) => {
      const day = parseDay(v);
      if (!day) return `"${clip(v, 40)}" is not a date`;
      return today && day < today ? `${day} is before today (${today})` : undefined;
    };
    const fix = `use YYYY-MM-DD, on or after ${today ?? "the case's today"}`;
    const problems: string[] = [];
    const checked = new Set<string>();

    const cited = [...(d.next_actions ?? []).filter((n) => n?.type === 'WAIT').map((n) => n.ledger_id), ...(d.follow_ups ?? []).map((f) => f?.ledger_id)];
    for (const id of cited) {
      const e = ctx.ledger.find((x) => x.id === id);
      if (!e || !REVIEW_TOOLS.includes(e.tool) || checked.has(e.id)) continue;
      checked.add(e.id);
      const why = bad(reviewDate(e));
      if (why) problems.push(`${e.id} (${e.tool}) review date ${why}: call ${e.tool} again (${fix}) and cite the new entry instead of ${e.id}.`);
    }

    (d.follow_ups ?? []).forEach((f, i) => {
      const why = bad(String(f?.review_on ?? ''));
      if (why) problems.push(`follow_ups[${i}] review_on ${why}: ${fix}, the same date as the entry it cites.`);
      const e = f?.ledger_id ? ctx.ledger.find((x) => x.id === f.ledger_id) : undefined;
      if (!e || e.status !== 'verified' || !REVIEW_TOOLS.includes(e.tool))
        problems.push(`follow_ups[${i}] cites "${f?.ledger_id ?? ''}", which is not a verified schedule_follow_up or put_on_hold: schedule it with a tool first and cite that entry.`);
    });

    // An uncited bad date is fixed by a later valid review on the same ticket: a verified entry cannot be edited.
    const reviews = verified(ctx).filter((e) => REVIEW_TOOLS.includes(e.tool));
    reviews.forEach((e, i) => {
      if (checked.has(e.id)) return;
      const why = bad(reviewDate(e));
      if (!why) return;
      const ref = String(e.args.ticket_ref ?? '');
      if (reviews.slice(i + 1).some((x) => String(x.args.ticket_ref ?? '') === ref && !bad(reviewDate(x)))) return;
      problems.push(`${e.id} (${e.tool}${ref ? ` on ${ref}` : ''}) review date ${why}: call ${e.tool} again (${fix}).`);
    });
    return problems.map((message) => ({ check: 'review_dates_valid', message }));
  },
};

// F3 ------------------------------------------------------------------------------------------

const basename = (p: string) => p.split('/').at(-1) ?? p;

/** Whether an evidence entry points at something in the bundle: a file, an event, or words copied from the inputs. */
export function evidenceResolves(evidence: string, b?: CaseBundle): boolean {
  const s = evidence.trim().replace(/^["“'‘]+|["”'’]+$/g, '').trim();
  if (!s) return false;
  if (!b?.documents?.length) return true;
  const low = s.toLowerCase();
  const tokens = new Set(low.split(/[\s,;()[\]]+/));
  const paths = [...b.documents.map((d) => d.path), ...(b.manifest ?? []).filter((m) => m.included).map((m) => m.path)];
  if (paths.some((p) => low.includes(p.toLowerCase()) || (basename(p).length >= 5 && low.includes(basename(p).toLowerCase())))) return true;
  if ([...b.documents.map((d) => d.id), ...(b.events ?? []).map((e) => e.id)].some((id) => tokens.has(id.toLowerCase()))) return true;
  const n = low.match(/\bevent\s*#?0*(\d+)\b/)?.[1];
  if (n && b.documents.some((d) => new RegExp(`\\bevent 0*${n}\\b`, 'i').test(d.text))) return true;
  if (low.startsWith('crm:') && paths.some((p) => /crm/i.test(p))) return true;
  return s.split(/\s+/).length >= 3 && [b.brief, ...b.documents.map((d) => d.text)].some((t) => quoteAppears(s, t ?? ''));
}

export const escalationPacket: CompletionCheck = {
  id: 'escalation_packet',
  check(d, ctx) {
    return (d.escalations ?? []).flatMap((x, i) => {
      const gaps: string[] = [];
      if (!has(x?.to)) gaps.push('to: the team or role who must decide');
      if (!has(x?.decision_needed)) gaps.push('decision_needed: the question they must answer');
      const options = (x?.options ?? []).filter(has);
      if (options.length < 2) gaps.push(`options: at least 2 real choices (has ${options.length})`);
      if (!has(x?.recommendation)) gaps.push('recommendation: the option you advise and why');
      if (!has(x?.deadline)) gaps.push('deadline: by when, as a date or date and time');
      const evidence = (x?.evidence ?? []).map(str).filter(has);
      if (!evidence.length) gaps.push('evidence: at least 1 case file name, event id or quote copied from the inputs');
      else if (!evidence.some((e) => evidenceResolves(e, ctx.bundle)))
        gaps.push(`evidence: none of ${evidence.map((e) => `"${clip(e, 60)}"`).join(', ')} matches a case file, event or the input text; cite the file path (e.g. inputs/email_tenant.eml), the event number, or quote the words exactly`);
      const done = verified(ctx).filter((e) => e.tool !== 'escalate_to_human');
      if (!Array.isArray(x?.already_done)) gaps.push('already_done: what you did before handing over');
      else if (!x.already_done.filter(has).length && done.length)
        gaps.push(`already_done: list what you did before handing over (${done.map((e) => `${e.id} ${e.tool}`).join(', ')})`);
      const e = x?.ledger_id ? ctx.ledger.find((l) => l.id === x.ledger_id) : undefined;
      if (!e || e.tool !== 'escalate_to_human' || e.status !== 'verified')
        gaps.push(
          x?.ledger_id
            ? `ledger_id: ${x.ledger_id} is not a verified escalate_to_human; cite the entry that handed this over`
            : 'ledger_id: the verified escalate_to_human entry that handed this over (call escalate_to_human first if you have not)',
        );
      if (!gaps.length) return [];
      return [{ check: 'escalation_packet', message: `escalations[${i}]${has(x?.to) ? ` (to ${x.to})` : ''} is incomplete. Fix: ${gaps.join('; ')}.` }];
    });
  },
};

// F4 ------------------------------------------------------------------------------------------

const MESSAGE_TOOLS = ['send_message', 'request_information', 'request_landlord_approval', 'log_call'];
type Claim = { tools: string[]; roles?: boolean; also?: (e: LedgerEntry) => boolean };
const stageIs = (stage: string) => (e: LedgerEntry) => e.tool === 'update_ticket' && e.args.stage === stage;
const CLAIMS: [string[], Claim][] = [
  [['sent'], { tools: [...MESSAGE_TOOLS, 'assign_contractor', 'set_visit'], roles: true }],
  [
    ['emailed', 'e-mailed', 'messaged', 'texted', 'whatsapped', 'notified', 'informed', 'told', 'contacted', 'asked', 'chased', 'called', 'phoned', 'rang', 'replied', 'wrote', 'spoken', 'spoke'],
    { tools: MESSAGE_TOOLS, roles: true },
  ],
  [['assigned', 'instructed', 'dispatched'], { tools: ['assign_contractor', 'set_visit'] }],
  [['approved', 'authorised', 'authorized'], { tools: ['approve_quote'] }],
  [['booked', 'scheduled', 'rescheduled'], { tools: ['set_visit', 'assign_contractor', 'schedule_follow_up', 'put_on_hold'] }],
  [['closed'], { tools: ['close_ticket'], also: stageIs('completed') }],
  [['cancelled', 'canceled'], { tools: ['cancel_ticket'], also: stageIs('cancelled') }],
  [['paid'], { tools: ['approve_quote'], also: (e) => e.tool === 'close_ticket' && e.args.mode === 'final_checks' }],
  [['escalated'], { tools: ['escalate_to_human'] }],
];
const CLAIM_BY_VERB = new Map(CLAIMS.flatMap(([verbs, c]) => verbs.map((v) => [v, c] as const)));
const CLAIM_RE = new RegExp(
  `\\b(I|we)(\\s+have|'ve|’ve)?((?:\\s+(?:now|already|just|also|today|then|both|immediately|promptly))*)\\s+(${[...CLAIM_BY_VERB.keys()].join('|')})\\b`,
  'gi',
);
const ROLE_WORDS: [string, RegExp][] = [
  ['landlord', /\blandlord/i],
  ['tenant', /\b(tenant|occupant|resident)/i],
  ['contractor', /\b(contractor|engineer|plumber|electrician|provider|roofer|locksmith|technician)/i],
];
const reachedRole = (e: LedgerEntry, r: string) =>
  r === 'landlord'
    ? e.tool === 'request_landlord_approval' || role(e) === 'landlord'
    : r === 'tenant'
      ? ['tenant', 'neighbour'].includes(role(e))
      : role(e) === 'contractor' || e.tool === 'assign_contractor' || e.tool === 'set_visit';

/** The first sentence-level claim of a completed action that no verified ledger entry backs, if any. */
function overclaim(sentence: string, ledger: LedgerEntry[]): Claim | undefined {
  const text = sentence.replace(/"[^"]*"|“[^”]*”/g, ' ');
  for (const m of text.matchAll(CLAIM_RE)) {
    if (m[1].toLowerCase() === 'we' && !m[2]) continue;
    if (/\b(if|once|when|whenever|unless|until|after|before|soon as)\s+$/i.test(text.slice(Math.max(0, m.index - 25), m.index))) continue;
    const claim = CLAIM_BY_VERB.get(m[4].toLowerCase());
    if (!claim) continue;
    const tail = text.slice(m.index + m[0].length, m.index + m[0].length + 60);
    const roles = claim.roles ? ROLE_WORDS.filter(([, re]) => re.test(tail)).map(([r]) => r) : [];
    const backed = ledger.some((e) => (claim.tools.includes(e.tool) || claim.also?.(e)) && (!roles.length || roles.some((r) => reachedRole(e, r))));
    if (!backed) return claim;
  }
  return undefined;
}

export const noProseOverclaim: CompletionCheck = {
  id: 'no_prose_overclaim',
  check(d, ctx) {
    const ledger = verified(ctx);
    const fields: [string, string][] = [['summary', str(d.summary)], ...(d.answers ?? []).map((a, i) => [`answers[${i}]`, str(a?.answer)] as [string, string])];
    return fields.flatMap(([where, text]) =>
      text
        .split(/(?<=[.!?])\s+|\n+/)
        .filter((s) => overclaim(s, ledger))
        .map((s) => ({
          check: 'no_prose_overclaim',
          message: `${where} says "${clip(s.trim())}" but no verified ${overclaim(s, ledger)!.tools.join(' / ')} entry backs it. Do it with a tool first, or rewrite the sentence to say what was actually done (or that it was not done).`,
        })),
    );
  },
};

// F5 ------------------------------------------------------------------------------------------

const KIND_WORDS: Record<ConflictKind, string[]> = {
  address: ['address', 'property', 'flat', 'street', 'road', 'postcode'],
  name: ['name', 'spell', 'spelt', 'called'],
  company: ['company', 'issuer', 'contractor', 'provider', 'firm', 'business'],
  amount: ['amount', '£', 'total', 'price', 'figure', 'cost', 'invoice', 'quote'],
  spend_limit: ['limit', 'spend', 'cap', 'threshold', 'authority'],
  date_past: ['date', 'past', 'passed', 'expired', 'overdue', 'already'],
  weekday: ['weekday', 'day', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  attachment_missing: ['attach', 'missing', 'not included', 'not provided', 'absent'],
  gate_order: ['before', 'order', 'sequence', 'prior', 'without approval', 'not approved'],
  crm_vs_history: ['crm', 'record', 'on file', 'contact', 'number', 'email', 'phone'],
  other: [],
};
const STOP = new Set(['the', 'this', 'that', 'with', 'from', 'than', 'quote', 'invoice', 'case', 'inputs', 'event']);
const num = (s: string) => String(Number(s.replace(/,/g, '')));

function keyTokens(detail: string): string[] {
  const nums = [...detail.matchAll(/\d[\d,]*(?:\.\d+)?/g)].map((m) => m[0]).filter((n) => n.replace(/\D/g, '').length >= 2).map(num);
  const refs = [...detail.matchAll(/\b[A-Z]{1,5}-?\d{2,}\b/g)].map((m) => m[0].toLowerCase());
  const proper = [...detail.matchAll(/\b[A-Z][a-z]{2,}\b/g)].map((m) => m[0].toLowerCase()).filter((w) => !STOP.has(w));
  const found = [...new Set([...nums, ...refs, ...proper])];
  return found.length ? found : [...new Set(detail.toLowerCase().match(/\b[a-z]{5,}\b/g) ?? [])].filter((w) => !STOP.has(w));
}

function acknowledges(line: string, c: Conflict): boolean {
  const low = line.toLowerCase();
  const nums = new Set([...low.matchAll(/\d[\d,]*(?:\.\d+)?/g)].map((m) => num(m[0])));
  const kindHit = c.kind === 'other' || low.includes(c.kind.replace(/_/g, ' ')) || KIND_WORDS[c.kind]?.some((w) => low.includes(w));
  const tokens = keyTokens(c.detail);
  const tokenHit = !tokens.length || tokens.some((t) => (/^\d/.test(t) ? nums.has(t) : low.includes(t)));
  return Boolean(kindHit && tokenHit);
}

export const conflictsAcknowledged: CompletionCheck = {
  id: 'conflicts_acknowledged',
  check(d, ctx) {
    const lines = [...(d.conflicts ?? []), ...(d.assumptions ?? [])].map(str);
    return (ctx.brief?.conflicts ?? [])
      .filter((c) => (c.severity === 'warn' || c.severity === 'block') && has(c.detail) && !lines.some((l) => acknowledges(l, c)))
      .map((c) => ({
        check: 'conflicts_acknowledged',
        message: `The brief found a ${c.kind.replace(/_/g, ' ')} conflict you have not addressed: "${clip(c.detail)}"${c.sources?.length ? ` (${c.sources.join(', ')})` : ''}. Add a line to conflicts naming it and the source you trusted and why, or to assumptions if it does not affect this decision.`,
      }));
  },
};
