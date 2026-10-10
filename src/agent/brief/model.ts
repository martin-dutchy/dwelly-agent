// Typed reading of a bundle's documents: people, jobs, emails, amounts, properties. Every item keeps its sources.
// Pure and defensive: a document that does not parse contributes nothing.
import type { CaseBundle, CaseDocument, PartyRole, SourceId } from '../harness/contracts.js';

export type Person = {
  role: PartyRole;
  id?: string;
  name?: string;
  preferred?: string;
  phones: string[];
  emails: string[];
  dob?: string;
  /** Free-text location fields of the record (address, unit, property). */
  place?: string;
  crm: boolean;
  sources: SourceId[];
};
export type Job = {
  ref: string;
  stage?: string;
  status?: string;
  category?: string;
  urgency?: string;
  description?: string;
  assigned?: string;
  quoteApproved?: number;
  visitDate?: string;
  created?: string;
  sources: SourceId[];
};
export type Escalation = { ref: string; priority?: string; reason?: string; status?: string; sources: SourceId[] };
export type Email = { doc: CaseDocument; fromName?: string; fromAddr?: string; replyTo?: string; to?: string; date?: string; subject?: string; body: string };
export type MoneyKind = 'quote' | 'invoice' | 'approval';
export type Amount = { kind: MoneyKind; amount: number; label: string; issuer?: string; ref?: string; job?: string; date?: string; sources: SourceId[] };
export type Property = { id?: string; address: string; postcode?: string; sources: SourceId[] };
export type Dated = { what: string; date: string; key: string; sources: SourceId[] };

export type Model = {
  b: CaseBundle;
  now?: string;
  today?: string;
  docs: CaseDocument[];
  people: Person[];
  jobs: Job[];
  escalations: Escalation[];
  emails: Email[];
  amounts: Amount[];
  properties: Property[];
  spendLimit?: { amount: number; who?: string; sources: SourceId[] };
  /** Dated fields from structured records (expiry, review, scheduled actions). */
  dated: Dated[];
  /** Notes and flags from CRM records (vulnerability, household, landlord notes, arrears). */
  notes: { kind: string; value: string; sources: SourceId[] }[];
};

// ---- primitives -------------------------------------------------------------------------------------

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
export const pad = (n: number) => String(n).padStart(2, '0');
export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
export const short = (s: string, n = 120) => {
  const one = s.replace(/\s+/g, ' ').trim();
  return one.length > n ? `${one.slice(0, n)}…` : one;
};
export const gbp = (n: number) => `£${n.toLocaleString('en-GB', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;
export const uniq = <T>(xs: T[]) => [...new Set(xs)];

const UK_MOBILE = /(?:\+44\s?7\d{3}|\b07\d{3})\s?\d{3}\s?\d{3}\b/g;
const UK_LANDLINE = /(?:\+44\s?[123]\d{1,3}|\b0[123]\d{1,3})\s?\d{3,4}\s?\d{3,4}\b/g;
/** Digits only, UK national form (07700 900102). */
export const normPhone = (s: string) => {
  const d = s.replace(/[^\d+]/g, '');
  return d.startsWith('+44') ? `0${d.slice(3)}` : d.startsWith('44') && d.length === 12 ? `0${d.slice(2)}` : d;
};
export const phonesIn = (s: string) => uniq([...s.matchAll(UK_MOBILE), ...s.matchAll(UK_LANDLINE)].map((m) => normPhone(m[0])));
export const emailsIn = (s: string) => uniq([...s.matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g)].map((m) => m[0].toLowerCase()));

export const POSTCODE = /\b([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})\b/g;
export const postcodesIn = (s: string) => uniq([...s.toUpperCase().matchAll(POSTCODE)].map((m) => `${m[1]} ${m[2]}`));

const TITLE = /^(mr|mrs|ms|miss|mx|dr|prof|sir)$/;
export const nameTokens = (s: string) => norm(s.replace(/-/g, ' ')).split(' ').filter((t) => t && !TITLE.test(t));
const tokenMatch = (a: string, b: string) => a === b || (a.length === 1 && b.startsWith(a)) || (b.length === 1 && a.startsWith(b)) || (Math.min(a.length, b.length) >= 3 && (a.startsWith(b) || b.startsWith(a)));
/** Could these be the same person? Initials and short forms (Ben / Benjamin) count; an unknown side never conflicts. */
export function sameName(a: string | undefined, b: string | undefined): boolean {
  const x = nameTokens(a ?? '');
  const y = nameTokens(b ?? '');
  if (!x.length || !y.length) return true;
  const [s, l] = x.length <= y.length ? [x, y] : [y, x];
  return s.every((t) => l.some((u) => tokenMatch(t, u)));
}
/** At least one full (non-initial) token in common: enough to say a record is about this person. */
export const nameOverlap = (a: string | undefined, b: string | undefined) => {
  const y = nameTokens(b ?? '').filter((t) => t.length > 1);
  return nameTokens(a ?? '').some((t) => t.length > 1 && y.includes(t));
};

const COMPANY_NOISE = /\b(ltd|limited|plc|llp|co|company|services|service|group|uk|the|and|of)\b/g;
export const companyKey = (s: string) => norm(s.replace(/&/g, ' and ')).replace(COMPANY_NOISE, ' ').replace(/\s+/g, ' ').trim();
/** Same trading name, allowing suffixes (Ltd, Services) and one name containing the other. */
export function sameCompany(a: string, b: string): boolean {
  const x = companyKey(a);
  const y = companyKey(b);
  if (!x || !y) return true;
  if (x === y || x.includes(y) || y.includes(x)) return true;
  const xs = x.split(' ');
  const ys = y.split(' ');
  const common = xs.filter((t) => ys.includes(t) && t.length > 2).length;
  return common >= Math.min(2, Math.min(xs.length, ys.length));
}

export const validIso = (y: number, m: number, d: number) => {
  if (m < 1 || m > 12 || d < 1 || d > 31) return undefined;
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCMonth() === m - 1 ? `${y}-${pad(m)}-${pad(d)}` : undefined;
};
/** The first explicit date in a string: ISO, UK d/m/y, or "10 Oct 2026". */
export function firstDate(s: string): string | undefined {
  const iso = s.match(/\b(20\d{2})-(\d{2})-(\d{2})/);
  if (iso) return validIso(+iso[1], +iso[2], +iso[3]);
  const dmy = s.match(/\b(\d{1,2})\/(\d{1,2})\/(20\d{2}|\d{2})\b/);
  if (dmy) return validIso(dmy[3].length === 2 ? 2000 + +dmy[3] : +dmy[3], +dmy[2], +dmy[1]);
  const dm = s.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?,?\s+(20\d{2})\b/i);
  if (dm) return validIso(+dm[3], MONTHS.indexOf(dm[2].toLowerCase()) + 1, +dm[1]);
  return undefined;
}
export const addDays = (isoDate: string, n: number) => {
  const d = new Date(`${isoDate.slice(0, 10)}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
export const addMonths = (isoDate: string, n: number) => {
  const [y, m, d] = isoDate.slice(0, 10).split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1 + n, 1));
  const last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(Math.min(d, last))}`;
};
export const addWorkingDays = (isoDate: string, n: number) => {
  let d = isoDate.slice(0, 10);
  for (let i = 0; i < n; ) {
    d = addDays(d, 1);
    const wd = new Date(`${d}T00:00:00Z`).getUTCDay();
    if (wd !== 0 && wd !== 6) i++;
  }
  return d;
};
export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const weekdayOf = (isoDate: string) => WEEKDAYS[new Date(`${isoDate.slice(0, 10)}T00:00:00Z`).getUTCDay()];

const AMOUNT = /£\s?(\d{1,3}(?:,\d{3})+|\d+)(\.\d{1,2})?/g;
export const amountsIn = (s: string) => [...s.matchAll(AMOUNT)].map((m) => Number(`${m[1].replace(/,/g, '')}${m[2] ?? ''}`)).filter((n) => Number.isFinite(n));

// ---- "now" ------------------------------------------------------------------------------------------

/** "**Today:** Saturday 2026-10-10 11:30" or "**Today:** 2024-03-01 20:49:24 UTC" → "2026-10-10T11:30". */
export function nowFromBrief(brief: string): string | undefined {
  const m = brief.match(/\*\*Today:\*\*\s*(?:[A-Za-z]+,?\s+)?(\d{4}-\d{2}-\d{2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (!m || !validIso(+m[1].slice(0, 4), +m[1].slice(5, 7), +m[1].slice(8, 10))) return undefined;
  return m[2] ? `${m[1]}T${pad(+m[2])}:${m[3]}${m[4] ? `:${m[4]}` : ''}` : m[1];
}

// ---- JSON and CSV records ---------------------------------------------------------------------------

const ROLE_KEYS: [RegExp, PartyRole][] = [
  [/^(tenants?|occupants?|residents?|caller)$/i, 'tenant'],
  [/^(landlords?|owners?|clients?)$/i, 'landlord'],
  [/^(contractors?|providers?|suppliers?|engineers?|trades(people|men)?)$/i, 'provider'],
];
const NAME_KEYS = ['full_name', 'name', 'tenant_name', 'contact_name', 'landlord_name', 'contractor_name', 'caller_name'];
const roleFromKey = (k: string | undefined) => ROLE_KEYS.find(([re]) => re.test(k ?? ''))?.[1];
const roleFromFields = (o: Record<string, unknown>): PartyRole | undefined =>
  'tenant_id' in o || 'tenant_name' in o ? 'tenant' : 'landlord_id' in o || 'landlord_name' in o ? 'landlord' : 'contractor_id' in o || 'provider_id' in o || 'trades' in o ? 'provider' : undefined;
const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : typeof v === 'number' ? String(v) : undefined);
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

export const isCrmDoc = (d: CaseDocument, data?: unknown) =>
  /crm|contacts?\b|tenancy_record/i.test(d.path) || (isObj(data) && ['tenant', 'landlord', 'contractors'].some((k) => k in data));

function personFrom(o: Record<string, unknown>, parentKey: string | undefined, doc: CaseDocument, crm: boolean): Person | undefined {
  const nameKey = NAME_KEYS.find((k) => str(o[k]));
  if (!nameKey) return undefined;
  const role = roleFromKey(parentKey) ?? roleFromFields(o) ?? 'other';
  const idKey = role === 'provider' ? ['contractor_id', 'provider_id', 'id'] : [`${role}_id`, 'id'];
  const phones: string[] = [];
  const emails: string[] = [];
  let dob: string | undefined;
  const place: string[] = [];
  for (const [k, v] of Object.entries(o)) {
    const s = str(v);
    if (!s) continue;
    if (/phone|mobile|tel\b|caller_id/i.test(k)) phones.push(...phonesIn(s).concat(phonesIn(s).length ? [] : [normPhone(s)]));
    else if (/e-?mail/i.test(k)) emails.push(...emailsIn(s));
    else if (/date_of_birth|^dob$/i.test(k)) dob = firstDate(s);
    else if (/^(address|property|unit|flat)$/i.test(k)) place.push(s);
  }
  return {
    role,
    id: idKey.map((k) => str(o[k])).find(Boolean),
    name: str(o[nameKey]),
    preferred: str(o.preferred_name),
    phones: uniq(phones.filter((p) => p.length >= 10)),
    emails: uniq(emails),
    dob,
    place: place.join(', ') || undefined,
    crm,
    sources: [doc.id],
  };
}

function walk(node: unknown, key: string | undefined, visit: (o: Record<string, unknown>, key: string | undefined) => void, depth = 0) {
  if (depth > 8) return;
  if (Array.isArray(node)) for (const x of node) walk(x, key, visit, depth + 1);
  else if (isObj(node)) {
    visit(node, key);
    for (const [k, v] of Object.entries(node)) if (v && typeof v === 'object') walk(v, k, visit, depth + 1);
  }
}

/** Minimal CSV: header row plus rows, quoted fields allowed. */
export function parseCsv(text: string): Record<string, string>[] {
  const rows = text
    .split(/\r?\n/)
    .filter((l) => l.trim())
    .map((l) => [...l.matchAll(/("([^"]|"")*"|[^,]*)(,|$)/g)].map((m) => m[1].replace(/^"|"$/g, '').replace(/""/g, '"').trim()).slice(0, -1));
  const [head, ...body] = rows;
  if (!head || head.length < 2) return [];
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.toLowerCase(), r[i] ?? ''])));
}

/** Every string value in a JSON tree, decoded (so "\u00a3780" reads as "£780"). */
export function jsonStrings(data: unknown, depth = 0): string[] {
  if (depth > 8) return [];
  if (typeof data === 'string') return [data.replace(/\n/g, ' ')];
  if (Array.isArray(data)) return data.flatMap((x) => jsonStrings(x, depth + 1));
  if (isObj(data)) return Object.values(data).flatMap((x) => jsonStrings(x, depth + 1));
  return [];
}

export function parseJson(d: CaseDocument): unknown {
  if (d.kind !== 'json' && !/\.json$/i.test(d.path)) return undefined;
  try {
    return JSON.parse(d.text);
  } catch {
    return undefined;
  }
}

// ---- emails -----------------------------------------------------------------------------------------

export function parseEmail(d: CaseDocument): Email | undefined {
  if (d.kind !== 'email' && !/\.eml$/i.test(d.path)) return undefined;
  const lines = d.text.split(/\r?\n/);
  const h: Record<string, string> = {};
  let i = 0;
  for (; i < lines.length && i < 40; i++) {
    const m = lines[i].match(/^\s*(From|To|Date|Subject|Reply-To|Cc):\s*(.*)$/i);
    if (m) h[m[1].toLowerCase()] = m[2].trim();
    else if (!lines[i].trim() && Object.keys(h).length) break;
    else if (lines[i].trim() && !Object.keys(h).length) return undefined;
  }
  if (!h.from) return undefined;
  const from = h.from.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>/);
  return {
    doc: d,
    fromName: from?.[1]?.trim() || undefined,
    fromAddr: (from?.[2] ?? emailsIn(h.from)[0])?.toLowerCase(),
    replyTo: h['reply-to'] ? emailsIn(h['reply-to'])[0] : undefined,
    to: h.to,
    date: h.date ? firstDate(h.date) : undefined,
    subject: h.subject,
    body: lines.slice(i + 1).join('\n'),
  };
}

// ---- quotes and invoices ----------------------------------------------------------------------------

const MONEY_DOC = /quote|quotation|estimate|invoice|bill\b|receipt/i;
const REF = /\b(?:quote|quotation|invoice|estimate)\s*(?:no\.?|number|ref\.?|#)?\s*:?\s*([A-Z]{1,6}-?[A-Z]?-?\d[\w-]*)/i;
const JOB_REF = /\b(?:job|ticket|works?)\s*(?:ref(?:erence)?|no\.?|#)?\s*:?\s*([A-Z]{1,4}-\d{3,})/i;

/** One quote or invoice document: its total, issuer, reference and date. */
function moneyDoc(d: CaseDocument, kind: 'quote' | 'invoice'): Amount | undefined {
  const lines = d.text.split(/\r?\n/);
  const totalLine = [...lines].reverse().find((l) => /\btotal\b/i.test(l) && !/sub-?\s?total/i.test(l) && amountsIn(l).length);
  const all = amountsIn(d.text);
  const amount = totalLine ? amountsIn(totalLine).at(-1) : all.length ? Math.max(...all) : undefined;
  if (amount === undefined) return undefined;
  const heading = lines.find((l) => l.trim())?.trim() ?? '';
  const issuer =
    heading.match(/\(([^)]+)\)\s*$/)?.[1] ??
    (/^[A-Z0-9&.,' -]{4,}$/.test(heading) && !/\d{3}/.test(heading) ? heading.replace(/\b(INVOICE|QUOTE|QUOTATION)\b/g, '').trim() : undefined) ??
    d.text.match(/\b(?:from|issued by|company|supplier):\s*([^\n]+)/i)?.[1]?.trim();
  const ref = d.text.match(REF)?.[1];
  const date = lines.map((l) => (/\b(date|dated|issued)\b/i.test(l) ? firstDate(l.replace(/.*?\b(date|dated|issued)\b/i, '')) : undefined)).find(Boolean);
  return {
    kind,
    amount,
    label: [`${kind} ${ref ?? d.path}`, issuer && `from ${issuer}`, /inc(l(uding)?)?\.?\s*VAT|VAT\s*20%/i.test(d.text) ? 'inc VAT' : undefined].filter(Boolean).join(', '),
    issuer: issuer || undefined,
    ref,
    job: d.text.match(JOB_REF)?.[1],
    date,
    sources: [d.id],
  };
}

/** Amounts named in running text, classified by the words on the same line. */
function lineAmounts(text: string, source: SourceId, fromLandlord: boolean): Amount[] {
  const out: Amount[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*>/.test(line)) continue;
    for (const amount of amountsIn(line)) {
      const kind: MoneyKind | undefined =
        fromLandlord && /\b(approv\w*|go ahead|authori[sz]\w*|happy (to|for)|proceed|ok(ay)? to)\b/i.test(line) && !/\b(not|don'?t|won'?t|can'?t|decline|refuse)\b/i.test(line)
          ? 'approval'
          : /\binvoice|\bbill(ed)?\b|payment due|amount due/i.test(line)
            ? 'invoice'
            : /\bquot\w*|estimate/i.test(line)
              ? 'quote'
              : undefined;
      if (kind) out.push({ kind, amount, label: short(line, 100), sources: [source] });
    }
  }
  return out;
}

/** Same kind, same amount: one item with every source. A gross figure stated beside its net (x 1.2) is dropped. */
export function mergeAmounts(xs: Amount[]): Amount[] {
  const out: Amount[] = [];
  for (const a of xs) {
    const same = out.find((o) => o.kind === a.kind && Math.abs(o.amount - a.amount) < 0.005);
    if (!same) out.push({ ...a, sources: [...a.sources] });
    else {
      same.sources = uniq([...same.sources, ...a.sources]);
      if (!same.issuer && a.issuer) Object.assign(same, { issuer: a.issuer, label: a.label, ref: a.ref ?? same.ref });
      same.job ??= a.job;
      same.date ??= a.date;
    }
  }
  const gross = (a: Amount, b: Amount) => a.kind === b.kind && Math.abs(a.amount - b.amount * 1.2) < 0.02 && a.sources.some((s) => b.sources.includes(s));
  return out.filter((a) => !out.some((b) => b !== a && gross(a, b)));
}

// ---- the model --------------------------------------------------------------------------------------

/** Fills every field a partial bundle may lack, so readers never meet undefined. */
export function safeBundle(b: Partial<CaseBundle> | undefined): CaseBundle {
  const x = (b ?? {}) as Partial<CaseBundle>;
  const arr = <T>(v: T[] | undefined) => (Array.isArray(v) ? v : []);
  return {
    ...x,
    id: String(x.id ?? ''),
    dir: String(x.dir ?? ''),
    format: x.format ?? 'generic',
    brief: typeof x.brief === 'string' ? x.brief : '',
    documents: arr(x.documents)
      .filter((d) => d && typeof d.id === 'string')
      .map((d) => ({ ...d, path: typeof d.path === 'string' ? d.path : d.id.replace(/^doc:/, ''), text: typeof d.text === 'string' ? d.text : '' })),
    events: arr(x.events).filter((e) => e && typeof e.id === 'string').map((e) => ({ ...e, text: typeof e.text === 'string' ? e.text : '' })),
    parties: arr(x.parties).filter((p) => p && typeof p.role === 'string').map((p) => ({ ...p, contacts: arr(p.contacts), sources: arr(p.sources) })),
    questions: arr(x.questions).filter((q) => typeof q === 'string'),
    seedTickets: arr(x.seedTickets),
    failures: x.failures ?? {},
    media: arr(x.media),
    manifest: arr(x.manifest),
    withheld: arr(x.withheld),
  };
}

export function buildModel(b: CaseBundle): Model {
  const docs = b.documents;
  const m: Model = { b, docs, people: [], jobs: [], escalations: [], emails: [], amounts: [], properties: [], dated: [], notes: [] };
  m.now = (typeof b.now === 'string' && /^\d{4}-\d{2}-\d{2}/.test(b.now) ? b.now : undefined) ?? nowFromBrief(b.brief);
  const amounts: Amount[] = [];
  const contractorNames = new Map<string, string>();

  for (const d of docs) {
    const data = parseJson(d);
    if (data !== undefined) readJson(m, d, data, amounts);
    else if (/\.csv$/i.test(d.path)) {
      for (const row of parseCsv(d.text)) {
        const p = personFrom(row, undefined, d, false);
        if (p) m.people.push({ ...p, place: [row.unit, row.flat, row.property, row.address].filter(Boolean).join(', ') || p.place });
      }
    }
    const email = parseEmail(d);
    if (email) m.emails.push(email);
    const kind = /invoice|bill\b|receipt/i.test(d.path) ? 'invoice' : MONEY_DOC.test(d.path) ? 'quote' : undefined;
    const headKind = !kind && !email && data === undefined ? d.text.split('\n').find((l) => l.trim())?.match(/\b(invoice|quote|quotation|estimate)\b/i)?.[1].toLowerCase() : undefined;
    const docKind = kind ?? (headKind ? (headKind === 'invoice' ? 'invoice' : 'quote') : undefined);
    if (docKind && !email && data === undefined) {
      const a = moneyDoc(d, docKind);
      if (a) amounts.push(a);
    } else if (!isCrmDoc(d, data)) {
      amounts.push(...lineAmounts(email ? email.body : data !== undefined ? jsonStrings(data).join('\n') : d.text, d.id, false));
    }
  }
  for (const p of m.people) if (p.role === 'provider' && p.id && p.name) contractorNames.set(p.id, p.name);
  for (const j of m.jobs) if (j.assigned && contractorNames.has(j.assigned)) j.assigned = `${j.assigned} ${contractorNames.get(j.assigned)}`;
  // Landlords' emails are known only after every CRM doc is read.
  for (const e of m.emails) {
    if (!m.people.some((p) => p.role === 'landlord' && p.emails.includes(e.fromAddr ?? ''))) continue;
    for (const a of lineAmounts(e.body, e.doc.id, true)) if (a.kind === 'approval') amounts.push(a);
  }
  m.amounts = mergeAmounts(amounts);
  m.today = m.now?.slice(0, 10);
  if (!m.now) {
    const latest = m.emails.map((e) => e.date).filter((x): x is string => !!x).sort().at(-1);
    if (latest) m.today = latest;
  }
  return m;
}

function readJson(m: Model, d: CaseDocument, data: unknown, amounts: Amount[]) {
  const crm = isCrmDoc(d, data);
  walk(data, undefined, (o, key) => {
    const p = personFrom(o, key, d, crm);
    if (p) m.people.push(p);
    const address = str(o.address);
    if (address && (crm || /compliance|propert/i.test(d.path) || key === 'property')) m.properties.push({ id: str(o.property_id), address, postcode: postcodesIn(address)[0], sources: [d.id] });
    for (const [k, v] of Object.entries(o)) {
      if (/spend_?limit|approval_?limit|authority_?limit/i.test(k) && typeof v === 'number' && !m.spendLimit) m.spendLimit = { amount: v, who: str(o.name), sources: [d.id] };
    }
    if (/escalation/i.test(key ?? '') && str(o.ref)) {
      m.escalations.push({ ref: str(o.ref)!, priority: str(o.priority), reason: str(o.reason), status: str(o.status), sources: [d.id] });
      return;
    }
    const ref = str(o.ref) ?? str(o.job_ref) ?? str(o.ticket_ref);
    if (ref && /^[A-Z]{1,4}-?\d+/.test(ref) && ['stage', 'status', 'description', 'category'].some((k) => k in o) && !m.jobs.some((j) => j.ref === ref)) {
      const visit = isObj(o.visit) ? o.visit : undefined;
      const approved = o.quote_approved_gbp ?? o.approved_gbp ?? o.approved_amount_gbp;
      m.jobs.push({
        ref,
        stage: str(o.stage),
        status: str(o.status),
        category: str(o.category),
        urgency: str(o.urgency) ?? str(o.priority),
        description: str(o.description),
        assigned: str(o.assigned_contractor) ?? str(o.contractor_id) ?? str(o.provider),
        quoteApproved: typeof approved === 'number' ? approved : undefined,
        visitDate: firstDate(str(visit?.date) ?? str(o.visit_date) ?? str(o.appointment_date) ?? ''),
        created: str(o.created)?.slice(0, 10),
        sources: [d.id],
      });
      if (typeof approved === 'number') amounts.push({ kind: 'approval', amount: approved, label: `approved amount on ${ref}`, job: ref, sources: [d.id] });
    }
    if (crm) {
      if (o.vulnerable === true || str(o.vulnerability_notes)) m.notes.push({ kind: 'vulnerability', value: [str(o.full_name) ?? str(o.name), 'flagged vulnerable', str(o.vulnerability_notes)].filter(Boolean).join(': '), sources: [d.id] });
      for (const k of ['household', 'occupants', 'note', 'insurance', 'stopcock', 'spare_keys', 'key_safe', 'consent_to_share', 'guarantor', 'authorised_contacts']) {
        const v = o[k];
        const s = Array.isArray(v) ? v.map((x) => (isObj(x) ? Object.values(x).filter((y) => typeof y !== 'object').join(' ') : String(x))).join('; ') : isObj(v) ? JSON.stringify(v) : v === undefined || v === null ? undefined : String(v);
        if (s) m.notes.push({ kind: k, value: short(s, 160), sources: [d.id] });
      }
      if (Array.isArray(o.notes)) for (const n of o.notes) if (typeof n === 'string') m.notes.push({ kind: `${key ?? 'record'}_note`, value: n, sources: [d.id] });
      if (key === 'arrears' || 'balance_gbp' in o) m.notes.push({ kind: 'arrears', value: Object.entries(o).filter(([, v]) => typeof v !== 'object').map(([k, v]) => `${k}: ${v}`).join(', '), sources: [d.id] });
    }
    for (const [k, v] of Object.entries(o)) {
      const date = typeof v === 'string' ? firstDate(v) : undefined;
      if (!date || !/expir|review|follow_?up|due|deadline|scheduled|next_/i.test(k)) {
        if (!(date && k === 'date' && /schedul|payout|payment|appointment|booking|action/i.test(key ?? ''))) continue;
      }
      const what = [str(o.type), str(o.event), str(o.ground) && `ground ${str(o.ground)}`, key].filter(Boolean).join(' ') || k;
      m.dated.push({ what, date, key: k, sources: [d.id] });
    }
  });
}
