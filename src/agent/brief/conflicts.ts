// Conflict detectors over the document model. Each is pure, cites the documents it compared, and stays quiet
// when the data is unclear. Organiser-history conflicts live in organiser.ts.
import type { Conflict, ConflictKind, SourceId } from '../harness/contracts.js';
import { weekdayConflictItems } from '../maintenance/dateChecks.js';
import { explicitDates } from '../maintenance/stateReconstruct.js';
import { DEADLINE_RULES } from './deadlines.js';
import {
  type Amount,
  type Job,
  type Model,
  type Person,
  addDays,
  firstDate,
  gbp,
  nameOverlap,
  phonesIn,
  postcodesIn,
  sameCompany,
  sameName,
  short,
  uniq,
} from './model.js';

export type Detector = (m: Model) => Conflict[];

const c = (kind: ConflictKind, severity: Conflict['severity'], detail: string, ...sources: SourceId[][]): Conflict => ({ kind, severity, detail, sources: uniq(sources.flat()) });
const path = (id: SourceId) => id.replace(/^doc:/, '');
const paths = (ids: SourceId[]) => uniq(ids).map(path).join(', ');
const approvals = (m: Model) => m.amounts.filter((a) => a.kind === 'approval');
const maxApproval = (m: Model) => Math.max(0, ...approvals(m).map((a) => a.amount));
const jobFor = (m: Model, a: Amount): Job | undefined => (a.job ? m.jobs.find((j) => j.ref === a.job) : undefined) ?? (m.jobs.length === 1 ? m.jobs[0] : undefined);
const assignedName = (j: Job | undefined) => j?.assigned?.replace(/^[A-Z]{1,3}-\d+\s*/, '').trim() || undefined;

export const spendLimit: Detector = (m) => {
  const limit = m.spendLimit;
  if (!limit) return [];
  const approved = maxApproval(m);
  return m.amounts
    .filter((a) => (a.kind === 'quote' || a.kind === 'invoice') && a.amount > limit.amount + 0.005 && a.amount > approved + 0.005)
    .map((a) =>
      c(
        'spend_limit',
        'block',
        `${a.kind === 'quote' ? 'Quote' : 'Invoice'} ${gbp(a.amount)} (${a.label}) is above the landlord's spend limit of ${gbp(limit.amount)}${limit.who ? ` (${limit.who})` : ''}, and no landlord approval for that amount is recorded. Above the limit the landlord approves before the agency commits, except emergency make-safe work.`,
        a.sources,
        limit.sources,
      ),
    );
};

export const amount: Detector = (m) => {
  const invoices = m.amounts.filter((a) => a.kind === 'invoice');
  const quotes = m.amounts.filter((a) => a.kind === 'quote');
  const appr = approvals(m);
  const out: Conflict[] = [];
  for (const inv of invoices) {
    if (appr.length) {
      const top = appr.reduce((x, y) => (y.amount > x.amount ? y : x));
      if (inv.amount > top.amount + 0.005) out.push(c('amount', 'block', `Invoice ${gbp(inv.amount)} (${inv.label}) is above the approved ${gbp(top.amount)} (${top.label}) by ${gbp(inv.amount - top.amount)}.`, inv.sources, top.sources));
    } else if (quotes.length && !quotes.some((q) => Math.abs(q.amount - inv.amount) < 0.005)) {
      const top = quotes.reduce((x, y) => (y.amount > x.amount ? y : x));
      const above = inv.amount > top.amount;
      out.push(c('amount', above ? 'warn' : 'info', `Invoice ${gbp(inv.amount)} (${inv.label}) matches no quote${above ? `; it is above the highest quote ${gbp(top.amount)}` : ''} (${quotes.map((q) => gbp(q.amount)).join(', ')}).`, inv.sources, quotes.flatMap((q) => q.sources)));
    }
  }
  return out;
};

export const company: Detector = (m) => {
  const out: Conflict[] = [];
  const providers = m.people.filter((p) => p.role === 'provider' && p.crm && p.name);
  for (const a of m.amounts.filter((x) => (x.kind === 'invoice' || x.kind === 'quote') && x.issuer)) {
    const job = jobFor(m, a);
    const assigned = assignedName(job);
    const doc = a.kind === 'invoice' ? 'Invoice' : 'Quote';
    if (assigned && !sameCompany(a.issuer!, assigned))
      out.push(c('company', a.kind === 'invoice' ? 'block' : 'warn', `${doc} ${a.ref ?? ''} is issued by "${a.issuer}" but job ${job!.ref} is assigned to ${job!.assigned}.`.replace('  ', ' '), a.sources, job!.sources));
    else if (!assigned && providers.length && !providers.some((p) => sameCompany(a.issuer!, p.name!)))
      out.push(c('company', 'warn', `${doc} issuer "${a.issuer}" is not a contractor on file (${providers.map((p) => p.name).join(', ')}).`, a.sources, providers.flatMap((p) => p.sources)));
  }
  return out;
};

export const gateOrder: Detector = (m) => {
  const out: Conflict[] = [];
  for (const inv of m.amounts.filter((a) => a.kind === 'invoice' && a.date)) {
    const job = jobFor(m, inv);
    if (job?.visitDate && inv.date! < job.visitDate)
      out.push(c('gate_order', 'block', `Invoice ${inv.ref ?? inv.label} is dated ${inv.date}, before the visit on job ${job.ref} (${job.visitDate}): billed for work not yet attended.`, inv.sources, job.sources));
    if (job?.created && inv.date! < job.created) out.push(c('gate_order', 'block', `Invoice ${inv.ref ?? inv.label} is dated ${inv.date}, before job ${job.ref} was created (${job.created}).`, inv.sources, job.sources));
  }
  for (const j of m.jobs)
    if (j.assigned && /landlord|approv|awaiting_ll|gate/i.test(j.stage ?? '')) out.push(c('gate_order', 'warn', `Job ${j.ref} has ${j.assigned} assigned while its stage is "${j.stage}" (landlord approval not yet given).`, j.sources));
  return out;
};

export const name: Detector = (m) => {
  const out: Conflict[] = [];
  const byId = new Map<string, Person[]>();
  for (const p of m.people) if (p.id && p.name) byId.set(p.id, [...(byId.get(p.id) ?? []), p]);
  for (const [id, ps] of byId) {
    const names = uniq(ps.map((p) => p.name!));
    if (names.every((n) => sameName(n, names[0]))) continue;
    const said = names.map((n) => `"${n}" in ${paths(ps.filter((p) => p.name === n).flatMap((p) => p.sources))}`).join(' but ');
    const elsewhere = names
      .map((n) => m.people.find((p) => p.crm && p.id && p.id !== id && p.name && sameName(p.name, n) && nameOverlap(p.name, n)))
      .filter((p): p is Person => !!p)
      .map((p) => `${p.name} is ${p.id} in ${paths(p.sources)}`);
    out.push(c('name', 'warn', `Record ${id} is ${said}.${elsewhere.length ? ` ${uniq(elsewhere).join('; ')}.` : ''} Check which record the person really matches before relying on it.`, ps.flatMap((p) => p.sources), m.people.filter((p) => elsewhere.some((e) => e.startsWith(`${p.name} is ${p.id}`))).flatMap((p) => p.sources)));
  }
  for (const e of m.emails) {
    if (!e.fromName || !e.fromAddr) continue;
    const owner = m.people.find((p) => p.crm && p.name && p.emails.includes(e.fromAddr!));
    if (owner && !sameName(e.fromName, owner.name) && !sameName(e.fromName, owner.preferred))
      out.push(c('name', 'warn', `${path(e.doc.id)} is signed "${e.fromName}" from ${e.fromAddr}, which the records hold for ${owner.role} ${owner.name}.`, [e.doc.id], owner.sources));
  }
  return out;
};

const editDistance = (a: string, b: string) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
const domain = (addr: string) => addr.split('@')[1] ?? '';
const SERVICE_NUMBERS = new Set(['0800111999', '999', '101', '111', '105', '116123', '08088004444', '08082000247', '03001232040']);
const CALL_DOC = /call|transcript|caller|voicemail|phone/i;

export const crmVsHistory: Detector = (m) => {
  const out: Conflict[] = [];
  const crm = m.people.filter((p) => p.crm && p.name);
  for (const r of m.people.filter((p) => !p.crm && p.name)) {
    const match = crm.find((p) => (r.id && p.id === r.id) || (p.role === r.role && nameOverlap(p.name, r.name) && sameName(p.name, r.name)));
    if (!match) continue;
    const diffs: string[] = [];
    if (r.phones.length && match.phones.length && !r.phones.some((x) => match.phones.includes(x))) diffs.push(`phone ${r.phones.join(', ')} (records: ${match.phones.join(', ')})`);
    if (r.emails.length && match.emails.length && !r.emails.some((x) => match.emails.includes(x))) diffs.push(`email ${r.emails.join(', ')} (records: ${match.emails.join(', ')})`);
    if (r.dob && match.dob && r.dob !== match.dob) diffs.push(`date of birth ${r.dob} (records: ${match.dob})`);
    if (diffs.length) out.push(c('crm_vs_history', 'warn', `${path(r.sources[0])} has "${r.name}" with ${diffs.join('; ')} for ${match.role} ${match.name}.`, r.sources, match.sources));
  }
  for (const e of m.emails) {
    if (!e.fromAddr) continue;
    const owner = crm.find((p) => p.emails.length && !p.emails.includes(e.fromAddr!) && e.fromName && nameOverlap(p.name, e.fromName) && sameName(p.name, e.fromName));
    const replyOff = e.replyTo && domain(e.replyTo) !== domain(e.fromAddr);
    if (owner) {
      const lookalike = owner.emails.some((x) => domain(x) !== domain(e.fromAddr!) && editDistance(domain(x), domain(e.fromAddr!)) <= 2);
      out.push(
        c(
          'crm_vs_history',
          lookalike || replyOff ? 'block' : 'warn',
          `${path(e.doc.id)} comes from ${e.fromAddr}${replyOff ? ` with Reply-To ${e.replyTo}` : ''}, but the records hold ${owner.emails.join(', ')} for ${owner.role} ${owner.name}${lookalike ? ' (look-alike domain)' : ''}. Verify on the contact details on file before acting on it.`,
          [e.doc.id],
          owner.sources,
        ),
      );
    } else if (replyOff && crm.some((p) => p.emails.includes(e.fromAddr!)))
      out.push(c('crm_vs_history', 'warn', `${path(e.doc.id)} asks for replies to ${e.replyTo}, not the address on file ${e.fromAddr}.`, [e.doc.id], crm.filter((p) => p.emails.includes(e.fromAddr!)).flatMap((p) => p.sources)));
  }
  const known = new Set(m.people.flatMap((p) => p.phones));
  if (crm.some((p) => p.phones.length)) {
    for (const d of m.docs.filter((x) => CALL_DOC.test(x.path) && !/crm/i.test(x.path))) {
      const unknown = phonesIn(d.text).filter((p) => !known.has(p) && !SERVICE_NUMBERS.has(p));
      const tenants = crm.filter((p) => p.role === 'tenant' && p.phones.length);
      if (unknown.length)
        out.push(c('crm_vs_history', 'warn', `${path(d.id)} shows ${unknown.join(', ')}, a number not on file for any contact${tenants.length ? ` (tenant ${tenants.map((t) => `${t.name}: ${t.phones.join(', ')}`).join('; ')})` : ''}.`, [d.id], tenants.flatMap((t) => t.sources)));
    }
  }
  return out;
};

const BUSINESS_LINE = /\b(ltd|limited|registered|vat|company|www\.|\.co\b|@|hq|head office|adviser|advice|council)\b/i;

export const address: Detector = (m) => {
  const own = new Set(m.properties.map((p) => p.postcode).filter(Boolean));
  if (!own.size) return [];
  const out: Conflict[] = [];
  const crmDocs = new Set(m.properties.flatMap((p) => p.sources));
  for (const d of m.docs.filter((x) => !crmDocs.has(x.id) && !HISTORY_DOC.test(x.path))) {
    for (const line of d.text.split('\n')) {
      if (BUSINESS_LINE.test(line)) continue;
      const other = postcodesIn(line).filter((pc) => !own.has(pc));
      if (other.length) {
        out.push(c('address', 'warn', `${path(d.id)} mentions ${other.join(', ')} ("${short(line, 100)}"), not the case property's ${[...own].join(' / ')}.`, [d.id], [...crmDocs]));
        break;
      }
    }
  }
  return out;
};

export const datePast: Detector = (m) => {
  if (!m.today) return [];
  return m.jobs
    .filter((j) => j.visitDate && j.visitDate < m.today! && /visit|book|schedul|assigned/i.test(j.stage ?? ''))
    .map((j) => c('date_past', 'warn', `Job ${j.ref} is still at stage "${j.stage}" but its visit date ${j.visitDate} is before today (${m.today}): the visit may have been missed or not updated.`, j.sources));
};

const HISTORY_DOC = /(^|\/)history\.md$/i;

export const weekday: Detector = (m) => {
  const items = m.docs.map((d, i) => ({ event: i + 1, date: m.emails.find((e) => e.doc === d)?.date ?? m.today ?? '', text: HISTORY_DOC.test(d.path) ? '' : d.text }));
  return weekdayConflictItems(items.filter((x) => x.date)).map((w) => {
    const ids = w.events.map((n) => m.docs[n - 1].id);
    const text = w.text.replace(/\bevents? (\d{3}(?:, \d{3})*)/g, (_, ns: string) => ns.split(', ').map((n) => path(m.docs[Number(n) - 1].id)).join(', '));
    return c('weekday', 'warn', text, ids);
  });
};

const ATTACH_WORDS = ['quote', 'invoice', 'report', 'photo', 'picture', 'image', 'certificate', 'letter', 'pdf', 'video', 'receipt'];

export const attachmentMissing: Detector = (m) => {
  const out = m.docs.filter((d) => d.flagged).map((d) => c('attachment_missing', 'warn', `${d.path} could not be read reliably (${d.flagged}); do not state its contents.`, [d.id]));
  for (const e of m.emails) {
    const said = e.body.split(/(?<=[.!?])\s+|\n/).find((s) => /\battach(ed|ment)\b/i.test(s));
    if (!said) continue;
    const words = ATTACH_WORDS.filter((w) => new RegExp(`\\b${w}s?\\b`, 'i').test(said));
    const others = m.docs.filter((d) => d !== e.doc);
    if (others.some((d) => /attach/i.test(d.path))) continue;
    const has = (w: string) => others.some((d) => d.path.toLowerCase().includes(w) || (/photo|picture|image|video/.test(w) && d.kind === 'image') || (w === 'pdf' && d.kind === 'pdf') || d.text.slice(0, 200).toLowerCase().includes(w));
    if (words.length && !words.some(has)) out.push(c('attachment_missing', 'warn', `${path(e.doc.id)} says "${short(said, 90)}" but no such attachment is among the case files.`, [e.doc.id]));
  }
  return out;
};

/** Arrears steps scheduled inside a Breathing Space (Debt Respite Scheme) moratorium. */
export const arrearsMoratorium: Detector = (m) => {
  const out: Conflict[] = [];
  for (const d of m.docs.filter((x) => /breathing space|debt respite/i.test(x.text))) {
    const startLine = d.text.split('\n').find((l) => /\bstart(ed|s)?\b|\bfrom\b|\bbegan\b/i.test(l) && firstDate(l));
    const start = (startLine && firstDate(startLine)) ?? m.emails.find((e) => e.doc === d)?.date;
    if (!start) continue;
    const end = addDays(start, 60);
    for (const x of m.dated.filter((x) => /arrears|chaser|section ?8|\bs8\b|possession|ground|rent demand|debt/i.test(x.what) && x.date >= start && x.date <= end))
      out.push(c('other', 'block', `"${x.what}" is scheduled for ${x.date}, inside the Breathing Space that started ${start} (standard 60 days, to ${end}): arrears contact and s8 notices on arrears grounds must stop.`, [d.id], x.sources));
  }
  return out;
};

/** A tenant's notice naming an end date sooner than the 2 months' notice the Renters' Rights Act 2025 requires. */
export const noticePeriod: Detector = (m) => {
  const rule = DEADLINE_RULES.find((r) => r.id === 'tenant_notice_to_quit')!;
  const out: Conflict[] = [];
  for (const e of m.emails) {
    const sent = e.date ?? m.today;
    const line = e.body.split('\n').find((l) => rule.trigger.test(l));
    if (!sent || !line) continue;
    const minimum = rule.due(sent);
    const named = e.body
      .split('\n')
      .filter((l) => /\b(moving out|move out|leav(e|ing)|last day|vacat\w+|end)\b/i.test(l))
      .flatMap((l) => explicitDates(l, sent))
      .find((d) => d > sent && d < minimum);
    if (named) out.push(c('other', 'warn', `${path(e.doc.id)} gives notice on ${sent} and names ${named} as the end, but 2 months' notice runs to ${minimum} at the earliest.`, [e.doc.id]));
  }
  return out;
};

export const DETECTORS: Record<string, Detector> = {
  spend_limit: spendLimit,
  amount,
  company,
  gate_order: gateOrder,
  name,
  crm_vs_history: crmVsHistory,
  address,
  date_past: datePast,
  weekday,
  attachment_missing: attachmentMissing,
  arrears_moratorium: arrearsMoratorium,
  notice_period: noticePeriod,
};

/** Every detector, each isolated: one that throws is reported in `errors` and the rest still run. */
export function detectConflicts(m: Model, errors: string[] = []): Conflict[] {
  const out: Conflict[] = [];
  for (const [id, detect] of Object.entries(DETECTORS)) {
    try {
      for (const x of detect(m)) if (!out.some((o) => o.kind === x.kind && o.detail === x.detail)) out.push(x);
    } catch (e) {
      errors.push(`${id}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  return out;
}
