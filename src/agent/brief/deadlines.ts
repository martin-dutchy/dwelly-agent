// Deadlines: promised dates and review dates from the records, plus statutory and SLA clocks from a fixed table.
// Every table entry cites the section of research/uk-lettings-rules.md it comes from; add nothing without one.
import type { Deadline, SourceId } from '../harness/contracts.js';
import { type Model, addDays, addMonths, addWorkingDays, firstDate, parseJson, short, uniq } from './model.js';

export type DeadlineRule = {
  id: string;
  basis: 'statutory' | 'sla';
  /** Section of research/uk-lettings-rules.md, e.g. "§3.2". */
  cite: string;
  what: string;
  /** Matched against what the tenant, landlord or other parties wrote (never against policy extracts). */
  trigger: RegExp;
  due: (from: string) => string;
  /** Count from a start date stated on the matching line instead of the message date. */
  fromStatedStart?: boolean;
};

const keepTime = (from: string, day: string) => (from.length > 10 ? `${day}${from.slice(10)}` : day);

export const DEADLINE_RULES: DeadlineRule[] = [
  {
    id: 'emergency_make_safe',
    basis: 'sla',
    cite: '§3.2',
    what: 'Emergency repair (risk to life or major damage): attend and make safe within 24 hours of the report (industry norm; there is no statutory response time in private lettings)',
    trigger: /smell(s|ing)? (of )?gas|gas (smell|leak)|rotten eggs?|eggy smell|carbon monoxide (alarm )?(is )?(going off|sounding)|co alarm (is )?(going off|sounding)|water (is )?(coming|pouring|leaking|dripping|gushing) (through|from|into|down)|\bflood(ing|ed)?\b|burst pipe|sparking|burning smell|electric(al)? shock|no (power|electricity) at all|\bsewage\b|break-?in|broken into/i,
    due: (from) => keepTime(from, addDays(from, 1)),
  },
  {
    id: 'urgent_repair',
    basis: 'sla',
    cite: '§3.2',
    what: 'Urgent repair (no heating or hot water, alarm fault, single toilet blocked, lock-out): 24 to 72 hours (industry norm)',
    trigger: /no (heating|hot water)|hot water (is )?off|heating (is )?(off|not working)|boiler (is )?(not working|broken|failed|down)|(smoke|co|carbon monoxide) alarm[^.]{0,40}(chirp|beep|fault|not working)|toilet (is )?(blocked|not flushing)|locked out|key (has )?snapped|lock (is )?broken/i,
    due: (from) => keepTime(from, addDays(from, 3)),
  },
  {
    id: 'entry_notice',
    basis: 'statutory',
    cite: '§3.3',
    what: "Non-emergency entry needs at least 24 hours' written notice to the tenant (s11(6) Landlord and Tenant Act 1985); earliest entry if notice is given now",
    trigger: /let (yourself|yourselves|ourselves|themselves) in|use the (spare )?key|go round (today|now)|enter the (flat|property|house)|inspect the (flat|property)/i,
    due: (from) => keepTime(from, addDays(from, 1)),
  },
  {
    id: 'damp_mould_inspection',
    basis: 'sla',
    cite: '§2',
    what: "Damp or mould: inspect within about 10 working days (good practice; Awaab's Law is not yet in force for private lettings)",
    trigger: /\bdamp\b|\bmou?ld(y)?\b|black spots on the (wall|ceiling)/i,
    due: (from) => addWorkingDays(from, 10),
  },
  {
    id: 'breathing_space_end',
    basis: 'statutory',
    cite: '§6.1',
    what: 'Breathing Space (standard, Debt Respite Scheme) ends: until then no contact about the arrears and no s8 notice on arrears grounds (8, 10, 11)',
    trigger: /breathing space|debt respite/i,
    due: (from) => addDays(from, 60),
    fromStatedStart: true,
  },
  {
    id: 'subject_access_request',
    basis: 'statutory',
    cite: '§7',
    what: 'Subject access request: respond within 1 calendar month (UK GDPR)',
    trigger: /subject access|\bSAR\b|(copy of|all) (the |my )?(personal )?(data|information) (you hold|held|you have)/i,
    due: (from) => addMonths(from, 1),
  },
  {
    id: 'data_breach_ico',
    basis: 'statutory',
    cite: '§7',
    what: 'Personal data breach: report to the ICO within 72 hours where there is a risk to people',
    trigger: /data breach|sent (my|our|the) [^.]{0,30} to the wrong|(details|data) (were |was )?(sent|shared|disclosed) [^.]{0,30}by mistake/i,
    due: (from) => keepTime(from, addDays(from, 3)),
  },
  {
    id: 'pet_request',
    basis: 'statutory',
    cite: '§1.1',
    what: "Pet request: the landlord must answer within 28 days and cannot unreasonably refuse (Renters' Rights Act 2025)",
    trigger: /\b(pet|dog|cat|puppy|kitten)\b[^.?!]{0,60}\b(request|permission|allowed|consent)\b|\b(request|permission|allowed|consent|can (i|we) (have|keep|get))\b[^.?!]{0,60}\b(pet|dog|cat|puppy|kitten)\b/i,
    due: (from) => addDays(from, 28),
  },
  {
    id: 'tenant_notice_to_quit',
    basis: 'statutory',
    cite: '§1.1',
    what: "Tenant's notice to quit: 2 months' written notice under the Renters' Rights Act 2025, so this is the earliest end of the tenancy on a notice given on the message date",
    trigger: /\b(my|our|giving|give|this as)\b[^.]{0,30}\bnotice\b(?! (period )?of (entry|access|visit))|\bnotice to (quit|leave|end)\b/i,
    due: (from) => addMonths(from, 2),
  },
];

/** Compliance records whose expiry is a legal deadline. */
export const EXPIRY_RULES: { id: string; cite: string; match: RegExp; what: string }[] = [
  { id: 'gas_safety_record', cite: '§4', match: /gas|cp12/i, what: 'Gas safety record (CP12) expires: the annual Gas Safe check must be done by then (Gas Safety (Installation and Use) Regs 1998 reg 36)' },
  { id: 'eicr', cite: '§4', match: /eicr|electrical/i, what: 'EICR expires: a new electrical inspection is due by then (Electrical Safety Standards Regs 2020)' },
];

const REFERENCE_DOC = /policy|guidance|procedure|handbook|extract|terms|notes?\.md$/i;
const AGENCY_SPEAKER = /^(agent|agency|ai phone line|operator|lettings|.*lettings|.*\b(co|and co|& co)\b)/i;

export type PartyText = { text: string; date?: string; sources: SourceId[] };

/** Text a party wrote, by document, with the date it was written when known. */
export function partyText(m: Model): { text: string; date?: string; sources: SourceId[] }[] {
  const out: { text: string; date?: string; sources: SourceId[] }[] = [];
  const agencyAddrs = new Set(m.emails.flatMap((e) => (e.to ?? '').toLowerCase().match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g) ?? []));
  for (const d of m.docs) {
    if (REFERENCE_DOC.test(d.path) || /crm/i.test(d.path) || /(^|\/)history\.md$/i.test(d.path)) continue;
    const email = m.emails.find((e) => e.doc === d);
    if (email) {
      if (!agencyAddrs.has(email.fromAddr ?? '') || !email.fromAddr) out.push({ text: email.body.split('\n').filter((l) => !/^\s*>/.test(l)).join('\n'), date: email.date, sources: [d.id] });
      continue;
    }
    const data = parseJson(d);
    if (data !== undefined) {
      const said: string[] = [];
      const visit = (v: unknown, key = '') => {
        if (typeof v === 'string' && /^(description|text|message|note|reason|summary|handover_summary|body|comment)$/i.test(key)) said.push(v.replace(/\n/g, ' '));
        else if (Array.isArray(v)) v.forEach((x) => visit(x, key));
        else if (v && typeof v === 'object') {
          const from = (v as Record<string, unknown>).from;
          if (typeof from === 'string' && AGENCY_SPEAKER.test(from)) return;
          for (const [k, x] of Object.entries(v)) visit(x, k);
        }
      };
      visit(data);
      if (said.length) out.push({ text: said.join('\n'), sources: [d.id] });
      continue;
    }
    const lines = d.text.split('\n').filter((l) => {
      const speaker = l.match(/^\s*\[[^\]]*\]\s*([^:]{1,40}):/)?.[1]?.trim() ?? l.match(/^\s*([A-Z][A-Z ()-]{2,30}):/)?.[1]?.trim();
      return !speaker || !AGENCY_SPEAKER.test(speaker);
    });
    out.push({ text: lines.join('\n'), sources: [d.id] });
  }
  return out;
}

export function computeDeadlines(m: Model, extraText: { text: string; date?: string; sources: SourceId[] }[] = []): Deadline[] {
  const out: Deadline[] = [];
  const push = (d: Deadline) => {
    if (d.sources.length && !out.some((o) => o.what === d.what && o.due === d.due)) out.push(d);
  };
  const base = m.now ?? m.today;
  for (const rule of DEADLINE_RULES) {
    for (const t of [...partyText(m), ...extraText]) {
      const line = t.text.split('\n').find((l) => rule.trigger.test(l));
      if (!line) continue;
      const stated = rule.fromStatedStart ? t.text.split('\n').map((l) => (/\bstart(ed|s)?\b|\bfrom\b|\bbegan\b/i.test(l) ? firstDate(l) : undefined)).find(Boolean) : undefined;
      const from = stated ?? t.date ?? base;
      if (!from) continue;
      push({ what: `${rule.what}. Trigger: "${short(line, 80)}"`, due: rule.due(from), basis: rule.basis, sources: t.sources });
      break;
    }
  }
  for (const x of m.dated) {
    if (/expir/i.test(x.key)) {
      const rule = EXPIRY_RULES.find((r) => r.match.test(x.what));
      if (rule) push({ what: rule.what, due: x.date, basis: 'statutory', sources: x.sources });
    } else if (/review|follow_?up|hold/i.test(x.key)) push({ what: `Review date on ${x.what}`, due: x.date, basis: 'hold_review', sources: x.sources });
  }
  for (const j of m.jobs) if (j.visitDate && (!m.today || j.visitDate >= m.today)) push({ what: `Visit booked on job ${j.ref}${j.assigned ? ` (${j.assigned})` : ''}`, due: j.visitDate, basis: 'promised', sources: j.sources });
  return out.sort((a, b) => a.due.localeCompare(b.due));
}

export const ruleSections = () => uniq([...DEADLINE_RULES, ...EXPIRY_RULES].map((r) => r.cite));
