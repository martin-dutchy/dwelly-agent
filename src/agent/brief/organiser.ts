// Organiser-format cases (index.md + history.md): reconstructState's findings as typed facts and conflicts that
// cite events, plus the remaining hint lines as notes.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { CaseBundle, Conflict, Deadline, Fact, Party, PartyRole, SourceId } from '../harness/contracts.js';
import { weekdayConflictItems } from '../maintenance/dateChecks.js';
import { type CaseState, type StateInput, dateOf, field, hintLines, reconstructState, roleOf, stageLabel, stateInputFromDir, text } from '../maintenance/stateReconstruct.js';
import { type HistoryEvent, parseHistory } from '../publicCases.js';
import { type Amount, amountsIn, normPhone, phonesIn, sameName, short, uniq } from './model.js';

export type OrganiserPart = {
  stage?: string;
  notes: string[];
  conflicts: Conflict[];
  facts: Fact[];
  approvals: Fact[];
  parties: Party[];
  amounts: Amount[];
  deadlines: Deadline[];
  /** What parties other than the agency wrote, per event, for the deadline triggers. */
  texts: { text: string; date?: string; sources: SourceId[] }[];
};

const HISTORY = /(^|\/)history\.md$/i;
const pad3 = (n: number) => String(n).padStart(3, '0');
const evName = (n: number) => `event ${pad3(n)}`;

/** Events from a raw history.md (anchors) or from the prompt copy ("### <date> — event 001" headings). */
export function historyEvents(md: string): HistoryEvent[] {
  const raw = parseHistory(md).events;
  if (raw.length) return raw;
  return md
    .split(/^(?=#{2,3} .*\bevent \d+\s*$)/m)
    .filter((p) => /^#{2,3} .*\bevent \d+/.test(p))
    .map((chunk) => {
      const [header, ...rest] = chunk.trim().split('\n');
      return { n: Number(header.match(/event (\d+)/)?.[1] ?? 0), header: header.replace(/^#+\s*/, ''), body: rest.join('\n').trim() };
    });
}

function stateInput(b: CaseBundle): StateInput | undefined {
  try {
    if (b.dir && existsSync(join(b.dir, 'history.md')) && existsSync(join(b.dir, 'index.md'))) return stateInputFromDir(b.dir, b.cutoff);
  } catch {
    // fall through to the bundle's own copy of the history
  }
  const doc = b.documents.find((d) => HISTORY.test(d.path));
  if (!doc) return undefined;
  const events = historyEvents(doc.text);
  if (!events.length) return undefined;
  return {
    events,
    property: b.brief.match(/^- \*\*Property:\*\* (.+)$/m)?.[1],
    title: b.brief.match(/^# (.+)$/m)?.[1],
    initialRequest: b.brief.match(/^## Initial request\s*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m)?.[1]?.trim(),
    attachmentFiles: b.documents.filter((d) => d.path.startsWith('attachments/')).map((d) => d.path.slice('attachments/'.length)),
  };
}

/** The bundle's id for history event n: a timeline event when ingest made one, else the history document. */
function sourcer(b: CaseBundle, visible: number) {
  const doc = b.documents.find((d) => HISTORY.test(d.path))?.id;
  const ids = new Set(b.events.map((e) => e.id));
  const fromDoc = b.events.filter((e) => e.doc === doc);
  return (n: number): SourceId[] => {
    const direct = [`ev:${n}`, `ev:${pad3(n)}`].find((id) => ids.has(id));
    if (direct) return [direct];
    if (fromDoc.length === visible && fromDoc[n - 1]) return [fromDoc[n - 1].id];
    return doc ? [doc] : [];
  };
}

const GENERIC_DEAR = /^(sir|madam|sir\s*\/\s*madam|tenants?|landlords?|all|team|customer|residents?|homeowner|owner|occupier|colleagues?|provider)\b/i;
const PERSON = /^[A-Z][a-zA-Z'’-]+(?:\s+[A-Z][a-zA-Z'’-]+){0,3}$/;

type Seen = { role: PartyRole; name?: string; phone?: string; n: number };

function namesIn(e: HistoryEvent): Seen[] {
  const out: Seen[] = [];
  const to = roleOf(field(e.body, 'To'));
  const from = roleOf(field(e.body, 'From'));
  const body = text(e);
  const add = (role: PartyRole | undefined, raw: string | undefined, phone?: string) => {
    const name = raw?.trim().replace(/[,.:;!]+$/, '');
    if (role && role !== 'agency' && name && PERSON.test(name) && !GENERIC_DEAR.test(name)) out.push({ role, name, phone, n: e.n });
  };
  add(to === 'provider' || to === 'tenant' || to === 'landlord' ? to : undefined, body.match(/^Dear\s+([^,\n]+)/m)?.[1]);
  const tenantPhone = body.match(/Contact Details:\s*([+\d][\d ()-]{8,})/)?.[1];
  add('tenant', body.match(/^Tenant Name:\s*(.+)$/m)?.[1], tenantPhone ? normPhone(tenantPhone) : undefined);
  add('landlord', body.match(/^Landlord Name:\s*(.+)$/m)?.[1]);
  add('provider', body.match(/^(?:Maintenance )?Provider Name:\s*(.+)$/m)?.[1]);
  add('provider', body.match(/\bOur maintenance provider ([A-Z][\w&'.-]*(?:\s+[A-Z][\w&'.-]*){0,4}) will\b/)?.[1]);
  if (from === 'tenant' || from === 'landlord') {
    const last = body.split('\n').map((l) => l.trim()).filter(Boolean).at(-1);
    if (last && last.split(/\s+/).length >= 2) add(from, last);
  }
  return out;
}

export function organiserBrief(b: CaseBundle): OrganiserPart | undefined {
  const input = stateInput(b);
  if (!input) return undefined;
  const state: CaseState = reconstructState(input);
  const ev = sourcer(b, input.events.length);
  const evs = (ns: number[]) => uniq(ns.flatMap(ev));
  const conflicts: Conflict[] = [];
  const facts: Fact[] = [];
  const approvals: Fact[] = [];
  const amounts: Amount[] = [];
  const deadlines: Deadline[] = [];
  const add = (kind: Conflict['kind'], severity: Conflict['severity'], detail: string, ns: number[]) => conflicts.push({ kind, severity, detail, sources: evs(ns) });

  const byEvent = new Map<number, typeof state.addressMismatches>();
  for (const a of state.addressMismatches) byEvent.set(a.event, [...(byEvent.get(a.event) ?? []), a]);
  for (const [n, ms] of byEvent) add('address', 'warn', `${evName(n)} mentions ${ms.map((x) => x.postcode).join(', ')}, not the case property's ${ms[0].expected}: "${ms[0].found}".`, [n]);

  const items = input.events.map((e) => ({ event: e.n, date: dateOf(e), text: text(e) }));
  for (const w of weekdayConflictItems(items)) add('weekday', 'warn', w.text, w.events);
  for (const a of state.appointmentConflicts) {
    const ns = [...a.matchAll(/event (\d{3})/g)].map((x) => Number(x[1]));
    add(/already past/.test(a) ? 'date_past' : 'other', 'warn', a, ns);
  }
  const appts = state.dates.filter((d) => d.appointment);
  const lastAppt = appts.at(-1);
  if (lastAppt && state.stage?.name === 'visit_booked' && !appts.some((d) => d.iso >= state.today))
    add('date_past', 'warn', `The latest appointment date mentioned (${lastAppt.iso}, ${evName(lastAppt.event)}) is before today (${state.today}) and no later visit is recorded.`, [lastAppt.event]);
  const missing = state.attachments.referenced.filter((a) => !a.available);
  for (const n of uniq(missing.map((a) => a.event)))
    add('attachment_missing', 'warn', `${evName(n)} refers to ${missing.filter((a) => a.event === n).map((a) => `"${a.name}"`).join(', ')}, not available in the case files; do not state its contents.`, [n]);

  // Gates: a provider assigned while the landlord had not answered.
  let openHold: HistoryEvent | undefined;
  let completedAt: HistoryEvent | undefined;
  for (const e of input.events) {
    const ch = (field(e.body, 'Channel') ?? '').toLowerCase();
    const from = roleOf(field(e.body, 'From'));
    const body = text(e);
    if (ch === 'hold') openHold = /landlord|\bLL\b/i.test(body.match(/Reason:\s*([^.\n]+)/)?.[1] ?? body) ? e : openHold;
    if (from === 'landlord') openHold = undefined;
    if (ch === 'update' && /Maintenance provider assigned|New provider has been assigned/i.test(body)) {
      const unanswered = state.approvals.filter((a) => !a.reply && a.event < e.n && a.topic !== 'quote');
      if (openHold) add('gate_order', 'warn', `Provider assigned at ${evName(e.n)} while the case was on hold waiting for the landlord (${evName(openHold.n)}: "${short(text(openHold).split('\n')[0] ?? '', 60)}") and no landlord message since.`, [openHold.n, e.n]);
      else if (unanswered.length) add('gate_order', 'warn', `Provider assigned at ${evName(e.n)} although the landlord had not answered the agency's question at ${evName(unanswered.at(-1)!.event)}.`, [unanswered.at(-1)!.event, e.n]);
    }
    if (ch === 'update' && /Request marked as completed|Task has been completed/i.test(body)) completedAt ??= e;
    if (ch === 'update' && /Quote was approved by landlord/i.test(body) && completedAt)
      add('gate_order', 'warn', `Quote approval recorded at ${evName(e.n)}, after the work was marked completed at ${evName(completedAt.n)}.`, [completedAt.n, e.n]);
  }

  // People named in the history, and names that disagree for the same role.
  const seen = input.events.flatMap(namesIn);
  const parties: Party[] = [];
  for (const s of seen) {
    const p = parties.find((x) => x.role === s.role && sameName(x.name, s.name));
    if (p) {
      if ((s.name?.length ?? 0) > (p.name?.length ?? 0)) p.name = s.name;
      if (s.phone && !p.contacts.includes(s.phone)) p.contacts.push(s.phone);
      p.sources = uniq([...p.sources, ...ev(s.n)]);
    } else parties.push({ role: s.role, name: s.name, contacts: s.phone ? [s.phone] : [], sources: ev(s.n) });
  }
  for (const role of ['tenant', 'landlord'] as const) {
    const ps = parties.filter((p) => p.role === role);
    if (ps.length > 1) {
      const where = ps.map((p) => `"${p.name}" (${uniq(seen.filter((s) => s.role === role && sameName(s.name, p.name)).map((s) => evName(s.n))).join(', ')})`);
      add('name', 'warn', `The ${role} is named differently across the history: ${where.join(' vs ')}. Confirm who the ${role} is (joint ${role}s are possible) before addressing anyone.`, seen.filter((s) => s.role === role).map((s) => s.n));
    }
    const phones = uniq(seen.filter((s) => s.role === role && s.phone).map((s) => s.phone!));
    if (phones.length > 1) add('crm_vs_history', 'warn', `Different ${role} phone numbers across the history: ${phones.join(', ')}.`, seen.filter((s) => s.role === role && s.phone).map((s) => s.n));
  }

  // Money.
  for (const a of state.amounts) {
    const value = amountsIn(a.amount)[0];
    if (value === undefined || a.kind === 'other') continue;
    amounts.push({ kind: a.kind, amount: value, label: `${a.amount} ${a.kind} at ${evName(a.event)}`, sources: ev(a.event) });
  }
  for (const e of input.events) {
    if (!/Quote was approved by landlord|Landlord approval confirmed/i.test(e.body)) continue;
    const quote = state.amounts.filter((a) => a.kind === 'quote' && a.event < e.n).at(-1);
    const value = quote && /Quote was approved/i.test(e.body) ? amountsIn(quote.amount)[0] : undefined;
    if (value !== undefined) {
      amounts.push({ kind: 'approval', amount: value, label: `quote ${quote!.amount} (${evName(quote!.event)}) approved by the landlord at ${evName(e.n)}`, sources: evs([e.n, quote!.event]) });
      continue;
    }
    approvals.push({ id: '', kind: 'approval', value: `${short(text(e).split('\n')[0] ?? '', 60)} (${evName(e.n)})${quote ? `; latest quote before it ${quote.amount} (${evName(quote.event)})` : ''}`, sources: evs([e.n, ...(quote ? [quote.event] : [])]) });
  }
  for (const a of state.approvals.filter((x) => x.reply))
    approvals.push({ id: '', kind: 'landlord_reply', value: `Asked the landlord (${a.topic}) at ${evName(a.event)}; reply at ${evName(a.reply!.event)}: "${a.reply!.text}". Read what it actually authorises.`, sources: evs([a.event, a.reply!.event]) });

  // Facts.
  if (state.property) {
    const first = input.events.find((e) => state.property!.postcode && e.body.toUpperCase().replace(/\s+/g, ' ').includes(state.property!.postcode));
    if (first) facts.push({ id: '', kind: 'property', value: state.property.line, sources: ev(first.n) });
  }
  if (state.latestPrompt) facts.push({ id: '', kind: 'system_prompt', value: `${state.latestPrompt.text} (${evName(state.latestPrompt.event)}, ${state.latestPrompt.date})`, sources: ev(state.latestPrompt.event) });
  const lastHold = state.holds.at(-1);
  if (lastHold) facts.push({ id: '', kind: 'hold', value: `${lastHold.reason} (${evName(lastHold.event)}, ${lastHold.date})${lastHold.resumedBy ? `; the ${lastHold.party} has written since (${evName(lastHold.resumedBy.event)})` : lastHold.party ? `; no message from the ${lastHold.party} since` : ''}`, sources: evs([lastHold.event, ...(lastHold.resumedBy ? [lastHold.resumedBy.event] : [])]) });
  for (const a of state.approvals.filter((x) => !x.reply).slice(-2)) facts.push({ id: '', kind: 'open_approval', value: `Asked the landlord (${a.topic}) at ${evName(a.event)}: "${a.ask}"; no landlord reply since.`, sources: ev(a.event) });
  for (const u of state.unrelatedIssues.slice(0, 4)) facts.push({ id: '', kind: 'possible_separate_issue', value: `${u.noun}, raised by the ${u.from} at ${evName(u.event)}, not in the original request: "${u.text}"`, sources: ev(u.event) });
  for (const e of input.events.slice(-40)) {
    const from = roleOf(field(e.body, 'From'));
    if (from && from !== 'agency') for (const p of phonesIn(text(e))) if (!parties.some((x) => x.contacts.includes(p))) parties.push({ role: from, contacts: [p], sources: ev(e.n) });
  }

  // Appointments still ahead.
  for (const d of [...new Map(appts.filter((x) => x.iso >= state.today).map((x) => [x.iso, x])).values()].slice(-3))
    deadlines.push({ what: `Appointment mentioned at ${evName(d.event)}: "${d.text}"`, due: d.iso, basis: 'promised', sources: ev(d.event) });

  const converted = /^- (Stage:|Date conflict:|Date check:|Address check:|Attachments referenced but not|Possible separate issue|Holds:|Open approval:|Approval asked at|Latest system prompt:|Amounts:)/;
  return {
    stage: state.stage ? `${stageLabel(state.stage.name)}; last stage signal "${state.stage.trigger}" (${evName(state.stage.event)}, ${state.stage.date})` : undefined,
    notes: hintLines(state).filter((l) => !converted.test(l)),
    conflicts,
    facts,
    approvals,
    parties,
    amounts,
    deadlines,
    texts: input.events.filter((e) => !['agency', undefined].includes(roleOf(field(e.body, 'From')))).map((e) => ({ text: text(e), date: dateOf(e), sources: ev(e.n) })),
  };
}
