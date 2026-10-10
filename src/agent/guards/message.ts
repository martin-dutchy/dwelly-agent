// Outgoing messages checked against what the case establishes: names, job refs, amounts, dates, tenant contact details.
import type { Guard, GuardContext, ToolCall } from '../harness/contracts.js';
import { parseWhen } from '../opsChecks.js';
import { MESSAGE_TOOLS, caseText, messageText, parties, sentences, today } from './text.js';

const NOT_NAMES = new Set(
  (
    'mr mrs ms miss mx dr sir madam team all there everyone both the and of hi hello dear good morning afternoon evening tenant tenants landlord landlords ' +
    'contractor contractors engineer engineers agency office lettings ltd limited co company services service gas safe emergency national plumbing plumber ' +
    'heating electrical electrician electrics maintenance repairs works property management manager accounts line desk duty call out hours uk group homes ' +
    'customer resident residents occupier occupiers neighbour neighbours owner owners on'
  ).split(' '),
);

/** Capitalised words of a name that could identify a person, without titles, roles or company words. */
const nameWords = (s: string) =>
  s
    .replace(/\([^)]*\)/g, ' ')
    .split(/[^A-Za-z'’-]+/)
    .map((w) => w.replace(/['’]s$/, ''))
    .filter((w) => w.length >= 2 && /^[A-Z]/.test(w) && !NOT_NAMES.has(w.toLowerCase()));

const wordSet = (s: string) => new Set(s.toLowerCase().match(/[a-z'’-]+/g) ?? []);

export const unknownPerson: Guard = {
  id: 'message.unknown_person',
  tools: MESSAGE_TOOLS,
  check(call, ctx) {
    const named = parties(ctx).filter((p) => p.name);
    if (!named.length || !ctx.bundle) return undefined;
    const known = wordSet(
      [caseText(ctx), ...named.map((p) => p.name), ...ctx.state.tickets.map((t) => String(t.contractor ?? '')), ...ctx.state.properties.map((p) => p.landlord?.name ?? '')].join(' '),
    );
    const a = call.args;
    const recipient = call.tool === 'request_landlord_approval' ? String(a.landlord ?? '') : ['tenant', 'landlord', 'contractor'].includes(String(a.recipient_role)) ? String(a.recipient_name ?? '') : '';
    const greeting = messageText(call).match(/^\s*(?:[Hh]i|[Hh]ello|[Dd]ear|[Gg]ood (?:morning|afternoon|evening))[ ,]+((?:(?:Mr|Mrs|Ms|Miss|Dr)\.?\s+)?[A-Z][a-z][A-Za-z'’-]*(?:\s+[A-Z][a-z][A-Za-z'’-]*)?)/)?.[1] ?? '';
    const unknown = [...new Set([...nameWords(recipient), ...nameWords(greeting)])].filter((w) => !known.has(w.toLowerCase()));
    if (!unknown.length) return undefined;
    const list = named.map((p) => `${p.name} (${p.role})`).join(', ');
    return {
      rule: 'message.unknown_person',
      reason: `The message names ${unknown.join(', ')}, who is not a party in this case or anywhere in its records (parties: ${list}). Use the name exactly as the records give it, or a neutral greeting if you are unsure.`,
    };
  },
};

const REF = /\b[A-Z]{1,5}(?:-[A-Z0-9]+)*-\d{2,}\b/g;

export const unknownJobRef: Guard = {
  id: 'message.unknown_job_ref',
  tools: MESSAGE_TOOLS,
  check(call, ctx) {
    const refs = ctx.state.tickets.map((t) => t.ref);
    if (!refs.length || !ctx.bundle) return undefined;
    const all = caseText(ctx);
    const prefixes = new Set(refs.map((r) => r.split('-')[0]));
    const cited = [...messageText(call).matchAll(REF)].map((m) => m[0]).filter((r) => prefixes.has(r.split('-')[0]));
    const unknown = [...new Set(cited)].filter((r) => !refs.some((k) => k.startsWith(r) || r.startsWith(k)) && !all.includes(r));
    if (!unknown.length) return undefined;
    return {
      rule: 'message.unknown_job_ref',
      reason: `The message cites ${unknown.join(', ')}, which is not a job on file (jobs: ${refs.join(', ')}). Use the job reference from list_tickets.`,
    };
  },
};

const numbers = (s: string) => [...s.matchAll(/\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?/g)].map((m) => Number(m[0].replace(/,/g, '')));
const POUNDS = /£\s?(\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?|\d+(?:\.\d{1,2})?)/g;

/** Every amount the case, the brief or the job records know, with and without VAT. */
function knownAmounts(ctx: GuardContext): number[] {
  const m = ctx.brief?.money;
  const facts = m ? [...m.quotes, ...m.approvals, ...m.invoices, ...(m.spendLimit ? [m.spendLimit] : [])] : [];
  const records = ctx.state.tickets.flatMap((t) => [
    t.approved_gbp,
    (t.invoice as { amount_gbp?: number } | undefined)?.amount_gbp,
    ...((t.quotes as { amount_gbp?: number; total_gbp?: number }[] | undefined) ?? []).flatMap((q) => [q.amount_gbp, q.total_gbp]),
  ]);
  const base = [
    ...facts.flatMap((f) => numbers(f.value)),
    ...numbers(caseText(ctx)),
    ...records.filter((v): v is number => typeof v === 'number'),
    ...ctx.state.properties.map((p) => p.landlord?.spend_limit_gbp).filter((v): v is number => typeof v === 'number'),
    ...ctx.ledger.filter((e) => e.status === 'verified').map((e) => Number(e.args.amount_gbp)).filter((v) => Number.isFinite(v)),
  ];
  return base.flatMap((v) => [v, v * 1.2, v / 1.2]);
}

export const unknownAmount: Guard = {
  id: 'message.unknown_amount',
  tools: MESSAGE_TOOLS,
  check(call, ctx) {
    const m = ctx.brief?.money;
    if (!m || !(m.quotes.length || m.approvals.length || m.invoices.length || m.spendLimit)) return undefined;
    const stated = [...messageText(call).matchAll(POUNDS)].map((x) => Number(x[1].replace(/,/g, '')));
    if (typeof call.args.amount_gbp === 'number') stated.push(call.args.amount_gbp);
    const known = knownAmounts(ctx);
    const unknown = [...new Set(stated)].filter((v) => !known.some((k) => Math.abs(k - v) <= 0.51));
    if (!unknown.length) return undefined;
    const money = [...m.quotes, ...m.approvals, ...m.invoices, ...(m.spendLimit ? [m.spendLimit] : [])].map((f) => `${f.kind} ${f.value}`).join('; ');
    return {
      rule: 'message.unknown_amount',
      reason: `The message states ${unknown.map((v) => `£${v.toFixed(2)}`).join(', ')}, which matches no quote, approval, invoice or limit in the case (${money}). Use the figure exactly as the source gives it (say whether VAT is included), or leave the amount out.`,
    };
  },
};

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const DAY = '(mon|tue|tues|wed|weds|thu|thur|thurs|fri|sat|sun)(?:day|nesday|sday|rsday|urday)?';
const MON = '(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)';
const DATE_PATTERNS: { re: RegExp; parts: (m: RegExpMatchArray) => [string | undefined, number, number, number | undefined] }[] = [
  { re: new RegExp(`(?:\\b${DAY}\\b,?\\s+)?(?:the\\s+)?\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?${MON}\\b\\.?(?:,?\\s+(\\d{4}))?`, 'gi'), parts: (m) => [m[1], Number(m[2]), monthOf(m[3]), year(m[4])] },
  { re: new RegExp(`(?:\\b${DAY}\\b,?\\s+)?\\b${MON}\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b(?:,?\\s+(\\d{4}))?`, 'gi'), parts: (m) => [m[1], Number(m[3]), monthOf(m[2]), year(m[4])] },
  { re: new RegExp(`(?:\\b${DAY}\\b,?\\s+)?\\b(\\d{4})-(\\d{2})-(\\d{2})\\b`, 'gi'), parts: (m) => [m[1], Number(m[4]), Number(m[3]) - 1, Number(m[2])] },
  { re: new RegExp(`(?:\\b${DAY}\\b,?\\s+)?\\b(\\d{1,2})/(\\d{1,2})/(\\d{2}|\\d{4})\\b`, 'gi'), parts: (m) => [m[1], Number(m[2]), Number(m[3]) - 1, year(m[4])] },
  { re: new RegExp(`\\b${DAY}\\b,?\\s+(\\d{1,2})/(\\d{1,2})\\b(?!/)`, 'gi'), parts: (m) => [m[1], Number(m[2]), Number(m[3]) - 1, undefined] },
];
function monthOf(s: string) {
  return MONTHS.indexOf(s.slice(0, 3).toLowerCase());
}
function year(s?: string) {
  return s ? (s.length === 2 ? 2000 + Number(s) : Number(s)) : undefined;
}
const dayName = (s: string) => DAYS.find((d) => d.startsWith(s.slice(0, 3).toLowerCase()))!;

/** Dates named in `text`, each with the weekday written next to it (if any). A date without a year takes the year that keeps it within six months of `now`. */
export function datesIn(text: string, now?: Date): { written: string; date: Date; weekday?: string }[] {
  const found: { written: string; date: Date; weekday?: string; at: number }[] = [];
  for (const { re, parts } of DATE_PATTERNS) {
    for (const m of text.matchAll(re)) {
      const at = m.index ?? 0;
      if (found.some((f) => at < f.at + f.written.length && f.at < at + m[0].length)) continue;
      const [wd, d, mo, y] = parts(m);
      if (mo < 0 || mo > 11 || d < 1 || d > 31) continue;
      let yy = y;
      if (yy === undefined) {
        if (!now) continue;
        yy = now.getUTCFullYear();
        if (Date.UTC(yy, mo, d) < now.getTime() - 183 * 86_400_000) yy++;
      }
      const date = new Date(Date.UTC(yy, mo, d));
      if (date.getUTCMonth() !== mo) continue;
      found.push({ written: m[0], date, weekday: wd ? dayName(wd) : undefined, at });
    }
  }
  return found.sort((a, b) => a.at - b.at).map(({ at: _, ...d }) => d);
}

const FUTURE_VISIT =
  /\b(?:will (?:attend|visit|come|call round|be (?:there|with you|attending|round))|(?:is|are|has been|have been) (?:booked|scheduled|arranged|confirmed) (?:in )?(?:for|on)|booked (?:in )?for|scheduled for|(?:appointment|visit) is (?:on|for)|attend(?:ing)? on|coming (?:on|round)|due to attend)/gi;

export const weekdayMismatch: Guard = {
  id: 'message.weekday_mismatch',
  tools: MESSAGE_TOOLS,
  check(call, ctx) {
    const now = today(ctx) ? parseWhen(String(today(ctx))) : undefined;
    // A sentence that also names the real weekday is pointing the mismatch out, not making it.
    const wrong = sentences(messageText(call))
      .flatMap((s) => datesIn(s, now).map((d) => ({ ...d, s })))
      .find((d) => d.weekday && d.weekday !== DAYS[d.date.getUTCDay()] && !new RegExp(`\\b${DAYS[d.date.getUTCDay()]}\\b`, 'i').test(d.s));
    if (!wrong) return undefined;
    return {
      rule: 'message.weekday_mismatch',
      reason: `The message says "${wrong.written.trim()}", but ${wrong.date.toISOString().slice(0, 10)} is a ${DAYS[wrong.date.getUTCDay()]}. Check the date against its source and correct the weekday or the date.`,
    };
  },
};

export const pastVisitDate: Guard = {
  id: 'message.visit_date_past',
  tools: MESSAGE_TOOLS,
  check(call, ctx) {
    const now = today(ctx) ? parseWhen(String(today(ctx))) : undefined;
    if (!now) return undefined;
    const startOfToday = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    // Only a date right after the booking words is the visit date: "booked for Monday 5 October", not "after your email of 5 October".
    for (const s of sentences(messageText(call))) {
      for (const m of s.matchAll(FUTURE_VISIT)) {
        const at = m.index ?? 0;
        const past = datesIn(s.slice(at, at + m[0].length + 50), now)[0];
        if (past && past.date.getTime() < startOfToday)
          return {
            rule: 'message.visit_date_past',
            reason: `The message presents "${past.written.trim()}" as an upcoming visit, but that is before today (${String(today(ctx))}). A visit that already happened is a result to record; for a new visit, use the date the provider confirmed.`,
          };
      }
    }
    return undefined;
  },
};

const digits = (s: string) => s.replace(/\D/g, '');

/** Tenant phone numbers and email addresses that appear in `text`. */
function tenantContactsIn(text: string, ctx: GuardContext): string[] {
  const contacts = parties(ctx)
    .filter((p) => p.role === 'tenant')
    .flatMap((p) => p.contacts);
  const lower = text.toLowerCase();
  const phones = [...text.matchAll(/\+?\d[\d\s().-]{7,}\d/g)].map((m) => digits(m[0]).slice(-10));
  return contacts.filter((c) => (c.includes('@') ? lower.includes(c.trim().toLowerCase()) : digits(c).length >= 9 && phones.includes(digits(c).slice(-10))));
}

const SAFETY_TAGS = ['gas', 'co', 'water', 'electrical', 'fire'];
const EMERGENCY = /\b(?:emergency|gas (?:leak|escape)|smell(?:s|ing)? (?:of )?gas|gas smell|rotten[- ]eggs?|carbon monoxide|CO alarm|flood(?:ing)?|fire|sparking|burning)\b/i;

/** In an emergency the engineer may need to reach the occupant directly, so contact details can go without recorded consent. */
const emergency = (call: ToolCall, ctx: GuardContext) =>
  (ctx.brief?.tags ?? []).some((t) => SAFETY_TAGS.includes(t)) ||
  ctx.state.tickets.some((t) => [t.severity, t.priority, t.urgency].some((v) => /^(?:emergency|p1)$/i.test(String(v ?? '')))) ||
  EMERGENCY.test(messageText(call));

/** Passing the tenant's details to the assigned contractor is normal practice; only a record saying not to share stops it. */
const DO_NOT_SHARE =
  /\bno consent\b[^.\n]{0,40}\bshar(e|ing)\b|\b(do not|don't|not to) (share|pass on|give out|disclose)\b[^.\n]{0,40}\b(number|contact|details|phone|mobile|email)|\b(withhold|keep) (his|her|their|the tenant'?s) (number|contact details)\b/i;

export const tenantContactToProvider: Guard = {
  id: 'message.tenant_contact_to_provider',
  tools: ['send_message', 'request_information'],
  check(call: ToolCall, ctx) {
    if (call.args.recipient_role !== 'contractor' || emergency(call, ctx)) return undefined;
    const shared = tenantContactsIn(messageText(call), ctx);
    if (!shared.length || !DO_NOT_SHARE.test(caseText(ctx))) return undefined;
    if (ctx.ledger.some((e) => e.tool === 'share_tenant_contact' && e.status === 'verified')) return undefined;
    return {
      rule: 'message.tenant_contact_to_provider',
      reason: `The message gives the tenant's contact details (${shared.join(', ')}) to a contractor, but the case records say not to share them. Record the tenant's agreement with share_tenant_contact first, or remove the details and let the contractor arrange access through the agency.`,
    };
  },
};

export const MESSAGE_GUARDS: Guard[] = [unknownPerson, unknownJobRef, unknownAmount, weekdayMismatch, pastVisitDate, tenantContactToProvider];
