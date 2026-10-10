import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { type HistoryEvent, isPublicCase, parseHistory, routineKind } from '../publicCases.js';
import { weekdayDateConflicts } from './dateChecks.js';

/**
 * Deterministic case-state hints for organiser-format cases (index.md + history.md).
 * Everything here is a regex over the visible events, grounded in the workflow engine's own system strings
 * (research/agent-tools.md §1). It is a reading aid for the agent, never a source of truth: every item
 * carries the event it came from so the agent can check it.
 */

export type Role = 'tenant' | 'landlord' | 'provider' | 'agency' | 'other';
export type Stage =
  | 'intake'
  | 'landlord_gate'
  | 'provider_selection'
  | 'provider_assigned'
  | 'visit_booked'
  | 'result'
  | 'quote_awaiting_landlord'
  | 'quote_reply_received'
  | 'quote_approved'
  | 'completion_checks'
  | 'closed'
  | 'paused';

/** Where a fact came from: event number and its date (YYYY-MM-DD). */
export type Ref = { event: number; date: string };

export type StateInput = {
  /** The events the agent can see, in order (after the cut). */
  events: HistoryEvent[];
  /** The case header's property line, e.g. "Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ". */
  property?: string;
  /** The case title and initial request, used to spot issues the thread adds later. */
  title?: string;
  initialRequest?: string;
  /** File names in the case's attachments/ folder. */
  attachmentFiles?: string[];
};

export type CaseState = {
  eventsSeen: number;
  today: string;
  property?: { line: string; postcode?: string };
  stage?: Ref & { name: Stage; trigger: string };
  /** The latest system prompt asking a human to look at something, if it is still the newest Update. */
  latestPrompt?: Ref & { text: string };
  parties: Partial<Record<Role, { lastFrom?: Ref; lastTo?: Ref }>>;
  approvals: (Ref & { topic: 'quote' | 'contractor' | 'other'; ask: string; reply?: Ref & { text: string } })[];
  holds: (Ref & { party?: Role; reason: string; resumedBy?: Ref })[];
  /** Agency messages to a party since that party last wrote (or since the start). */
  chases: Partial<Record<Role, { count: number; since?: Ref; reminders: number }>>;
  dates: (Ref & { iso: string; appointment: boolean; text: string })[];
  appointmentConflicts: string[];
  /** Weekday names that contradict the date beside them, or one date called by two weekdays. */
  weekdayConflicts: string[];
  amounts: (Ref & { amount: string; kind: 'quote' | 'invoice' | 'other' })[];
  attachments: { referenced: (Ref & { name: string; available: boolean })[]; present: string[] };
  addressMismatches: (Ref & { postcode: string; found: string; expected: string })[];
  unrelatedIssues: (Ref & { noun: string; from: Role; text: string })[];
};

// ---- primitives -------------------------------------------------------------------------------------

export const field = (body: string, name: string) => body.match(new RegExp(`^- \\*\\*${name}:\\*\\* (.*)$`, 'm'))?.[1]?.trim();
export const dateOf = (e: HistoryEvent) => e.header.split(' — ')[0].slice(0, 10);
const ref = (e: HistoryEvent): Ref => ({ event: e.n, date: dateOf(e) });
export const eventId = (n: number) => `event ${String(n).padStart(3, '0')}`;
/** Body text without the Channel / From / To bullet lines. */
export const text = (e: HistoryEvent) =>
  e.body
    .split('\n')
    .filter((l) => !/^- \*\*(Channel|From|To):\*\*/.test(l))
    .join('\n')
    .trim();
const short = (s: string, n = 100) => {
  const one = s.replace(/\s+/g, ' ').trim();
  return one.length > n ? `${one.slice(0, n)}…` : one;
};

export function roleOf(who: string | undefined): Role | undefined {
  if (!who || /^(not specified|unspecified|internal|staff)$/i.test(who)) return undefined;
  if (/agency|lettings|system/i.test(who)) return 'agency';
  if (/tenant/i.test(who)) return 'tenant';
  if (/landlord/i.test(who)) return 'landlord';
  if (/contractor|provider|engineer|plumber|electrician/i.test(who)) return 'provider';
  return 'other';
}

const isMessage = (e: HistoryEvent) => /^(email|sms|call|note)$/i.test(field(e.body, 'Channel') ?? '');
const channel = (e: HistoryEvent) => (field(e.body, 'Channel') ?? '').toLowerCase();

// ---- stage: the workflow engine's own system strings ------------------------------------------------

const STAGE_TRIGGERS: [RegExp, Stage][] = [
  [/All checks have been completed|Task has been completed (without payment|by supervisor)|request is now closed/i, 'closed'],
  [/NOT TENANTED|Paused automatically/i, 'paused'],
  [/Request marked as completed|check the key return|Keys return confirmed|Skipped uploading/i, 'completion_checks'],
  [/Quote was approved by landlord/i, 'quote_approved'],
  [/moved to Result|Work results isset|Please add results of inspection|Inspection document uploaded/i, 'result'],
  [/Visit date selected|Visit date confirmed|Visit time approved|Rescheduled visit time/i, 'visit_booked'],
  [/Maintenance provider assigned|New provider has been assigned|updated to (the )?start stage/i, 'provider_assigned'],
  [/Landlord approval confirmed|Please approve selection of provider/i, 'provider_selection'],
  [/complete landlord approval step|response before provider selection|No landlord\/tenant response after/i, 'landlord_gate'],
];

/** System prompts that ask a human to act (agent-tools.md §1 "System triggers are the decision points"). */
const PROMPT =
  /Please check if we need to provide a response|No work results|reminders have been sent|Please review (and proceed )?manually|expected data could not be extracted|Need confirmation from landlord|we have received an email from the tenant|Please complete landlord approval step|Please solve this manually|Paused automatically|Validation:/i;

const STAGE_LABEL: Record<Stage, string> = {
  intake: 'intake (request received, nothing decided yet)',
  landlord_gate: 'landlord approval gate (landlord has not yet authorised a route)',
  provider_selection: 'provider selection (no provider assigned yet)',
  provider_assigned: 'provider assigned, visit not yet booked',
  visit_booked: 'visit booked or rescheduled',
  result: 'visit result received (next: complete, or quote loop)',
  quote_awaiting_landlord: 'quote sent to the landlord, awaiting approval',
  quote_reply_received: 'quote sent to the landlord and the landlord has replied (approval not yet recorded by the system)',
  quote_approved: 'quote approved by landlord (provider to be instructed)',
  completion_checks: 'completion / final checks',
  closed: 'closed',
  paused: 'paused',
};

// ---- dates ------------------------------------------------------------------------------------------

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTH = 'jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?';
const R_DMY = /\b(\d{1,2})\/(\d{1,2})\/(\d{4}|\d{2})\b/g;
const R_ISO = /\b(20\d{2})-(\d{2})-(\d{2})\b/g;
const R_D_MONTH = new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?(${MONTH})\\b(?:,?\\s+(20\\d{2}))?`, 'gi');
const R_MONTH_D = new RegExp(`\\b(${MONTH})\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b(?!\\d)(?:,?\\s+(20\\d{2}))?`, 'gi');
const R_RELATIVE = /\b(today|tomorrow|next day)\b/i;
const APPOINTMENT = /\b(visit|appointment|attend(ing)?|time slot|scheduled?|booked|booking|reschedul\w*|come (round|out|over|by)|access)\b/i;
const SET_DATE = /\b(selected|confirmed|scheduled|booked|time slot|approved|rescheduled)\b/i;

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (y: number, m: number, d: number) => (m >= 1 && m <= 12 && d >= 1 && d <= 31 ? `${y}-${pad(m)}-${pad(d)}` : undefined);
const monthIdx = (s: string) => MONTHS.indexOf(s.slice(0, 3).toLowerCase()) + 1;
const addDays = (isoDate: string, n: number) => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const dmy = (isoDate: string) => `${isoDate.slice(8, 10)}/${isoDate.slice(5, 7)}/${isoDate.slice(0, 4)}`;

/** A day and month without a year: the event's year, or the next one if that would be > 6 months back. */
function withYear(m: number, d: number, eventDate: string): string | undefined {
  const y = Number(eventDate.slice(0, 4));
  const same = iso(y, m, d);
  if (!same) return undefined;
  const monthsBack = (Number(eventDate.slice(5, 7)) - m + 12) % 12;
  return monthsBack > 6 && same < eventDate ? iso(y + 1, m, d) : same;
}

export function explicitDates(line: string, eventDate: string): string[] {
  const out = new Set<string>();
  for (const m of line.matchAll(R_DMY)) {
    const y = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
    const v = iso(y, Number(m[2]), Number(m[1]));
    if (v) out.add(v);
  }
  for (const m of line.matchAll(R_ISO)) {
    const v = iso(Number(m[1]), Number(m[2]), Number(m[3]));
    if (v) out.add(v);
  }
  for (const m of line.matchAll(R_D_MONTH)) {
    const v = m[3] ? iso(Number(m[3]), monthIdx(m[2]), Number(m[1])) : withYear(monthIdx(m[2]), Number(m[1]), eventDate);
    if (v) out.add(v);
  }
  for (const m of line.matchAll(R_MONTH_D)) {
    const v = m[3] ? iso(Number(m[3]), monthIdx(m[1]), Number(m[2])) : withYear(monthIdx(m[1]), Number(m[2]), eventDate);
    if (v) out.add(v);
  }
  return [...out];
}

// ---- other extractors -------------------------------------------------------------------------------

const POSTCODE = /\b([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})\b/g;
const normPostcode = (outward: string, inward: string) => `${outward} ${inward}`;
const AMOUNT = /£\s?(\d{1,3}(?:,\d{3})+|\d+)(\.\d{2})?(\s*(?:\+\s*|plus\s+|inc(?:l(?:uding)?)?\.?\s+|ex(?:cl(?:uding)?)?\.?\s+)VAT)?/gi;
const ATTACHMENT_NAME = /\battachment-\d+-[\w.-]+/gi;
const UNNAMED_ATTACHMENT = /(attachment #?\d+|referenced (pdf|photo|image|report|quote|invoice)s?)[^.;\]\n]{0,60}unavailable|\[[^\]]*attachment[^\]]*unavailable\]/gi;

/** Maintenance nouns, grouped by synonym. A group absent from the title and initial request is a candidate extra issue. */
const ISSUE_NOUNS: [string, RegExp][] = [
  ['toilet', /\b(toilet|wc|cistern|loo)\b/i],
  ['window', /\bwindows?\b/i],
  ['door', /\bdoors?\b/i],
  ['lock / keys', /\b(locks?|keys?)\b/i],
  ['boiler / heating', /\b(boiler|heating|radiators?|hot water)\b/i],
  ['shower / bath', /\b(shower|bath|bathtub)\b/i],
  ['tap / sink', /\b(taps?|sink|basin)\b/i],
  ['leak / damp / mould', /\b(leak\w*|damp|mou?ld)\b/i],
  ['roof / gutter', /\b(roof|gutters?)\b/i],
  ['fence / garden', /\b(fence|garden|hedge|lawn)\b/i],
  ['oven / hob', /\b(oven|hob|cooker|grill)\b/i],
  ['fridge / freezer', /\b(fridge|freezer)\b/i],
  ['dishwasher', /\bdish ?washer\b/i],
  ['washing machine / dryer', /\b(washing machine|washer|dryer)\b/i],
  ['electrics', /\b(sockets?|fuse|electrics|electrical|tripping)\b/i],
  ['smoke / CO alarm', /\b(smoke alarm|carbon monoxide|co alarm|fire alarm)\b/i],
  ['pests', /\b(mice|mouse|rats?|pests?|cockroach\w*|bed ?bugs)\b/i],
  ['bins', /\bbins?\b/i],
  ['parking', /\bparking\b/i],
  ['intercom / doorbell', /\b(intercom|doorbell|buzzer)\b/i],
  ['drain / pipe', /\b(drains?|pipes?|plumbing|blocked)\b/i],
  ['extractor fan', /\bextractor\b/i],
  ['ceiling / wall', /\b(ceiling|walls?|plaster)\b/i],
  ['flooring / carpet', /\b(carpets?|floor(ing|boards?)?)\b/i],
];
const FAULT = /\b(broken|not working|doesn'?t work|stopped|leak\w*|stuck|blocked|fix|repair|damaged?|issue|problem|faulty|also)\b/i;

// ---- reconstruction ---------------------------------------------------------------------------------

export function reconstructState(input: StateInput): CaseState {
  const events = input.events;
  const last = events.at(-1);
  const property = input.property?.trim();
  const caseCode = property ? [...property.toUpperCase().matchAll(POSTCODE)].at(-1) : undefined;
  const casePostcode = caseCode ? normPostcode(caseCode[1], caseCode[2]) : undefined;

  const state: CaseState = {
    eventsSeen: events.length,
    today: last ? dateOf(last) : '',
    property: property ? { line: property, postcode: casePostcode } : undefined,
    parties: {},
    approvals: [],
    holds: [],
    chases: {},
    dates: [],
    appointmentConflicts: [],
    weekdayConflicts: weekdayDateConflicts(events.map((e) => ({ event: e.n, date: dateOf(e), text: text(e) }))),
    amounts: [],
    attachments: { referenced: [], present: [...(input.attachmentFiles ?? [])] },
    addressMismatches: [],
    unrelatedIssues: [],
  };

  const baseline = `${input.title ?? ''}\n${input.initialRequest ?? ''}`;
  const seenIssue = new Set<string>();
  const seenAttachment = new Set<string>();
  let latestUpdate: HistoryEvent | undefined;
  /** Same date finding across several events (e.g. the tenant and provider confirmations) becomes one line. */
  const dateNotes = new Map<string, number[]>();
  const note = (what: string, n: number) => dateNotes.set(what, [...new Set([...(dateNotes.get(what) ?? []), n])]);

  for (const e of events) {
    const r = ref(e);
    const ch = channel(e);
    const from = roleOf(field(e.body, 'From'));
    const to = roleOf(field(e.body, 'To'));
    const body = text(e);

    if (ch === 'update') {
      latestUpdate = e;
      const firstLine = body.split('\n')[0] ?? '';
      const hit = STAGE_TRIGGERS.find(([re]) => re.test(firstLine));
      if (hit) state.stage = { ...r, name: hit[1], trigger: short(firstLine, 120) };
    } else if (!state.stage && e === events[0] && /request description/i.test(body)) {
      state.stage = { ...r, name: 'intake', trigger: short(body.split('\n')[0], 80) };
    }

    // Parties and chases.
    if (isMessage(e)) {
      if (from && from !== 'agency') {
        const p = (state.parties[from] ??= {});
        p.lastFrom = r;
        state.chases[from] = { count: 0, since: r, reminders: 0 };
        for (const a of state.approvals) if (!a.reply && from === 'landlord') a.reply = { ...r, text: short(body.split('\n').filter((l) => l.trim() && !/^(hi|hello|dear|good (morning|afternoon|evening))\b/i.test(l.trim()))[0] ?? body, 120) };
        for (const h of state.holds) if (!h.resumedBy && h.party === from) h.resumedBy = r;
      }
      if (from === 'agency' && to && to !== 'agency') {
        const p = (state.parties[to] ??= {});
        p.lastTo = r;
        const c = (state.chases[to] ??= { count: 0, reminders: 0 });
        c.count++;
        if (routineKind(e)) c.reminders++;
      }
    }

    // Approvals asked of the landlord.
    if (from === 'agency' && to === 'landlord' && /^(email|sms|call)$/.test(ch) && /\b(approv\w*|advise|authori[sz]\w*|go ahead|permission|do you wish|would you like|prefer|confirm)\b/i.test(body)) {
      const topic = /quot\w*|estimate|£\s?\d/i.test(body) ? 'quote' : /contractor|provider|tradesperson|engineer/i.test(body) ? 'contractor' : 'other';
      const ask = body.split('\n').find((l) => /approv|advise|authori|go ahead|permission|wish|would you like|prefer|confirm/i.test(l)) ?? body;
      state.approvals.push({ ...r, topic, ask: short(ask, 110) });
    }
    if (ch === 'update' && /Landlord approval confirmed|Quote was approved by landlord/i.test(body)) {
      for (const a of state.approvals) if (!a.reply) a.reply = { ...r, text: short(body.split('\n')[0], 80) };
    }

    // Holds.
    if (ch === 'hold') {
      const reason = body.match(/Reason:\s*([^.\n]+)/)?.[1]?.trim();
      const comment = body.match(/Comment:\s*(.+)/)?.[1]?.trim();
      const said = [reason, comment].filter(Boolean).join(': ') || body.split('\n')[0] || '';
      const party: Role | undefined = /landlord|\bLL\b/i.test(said) ? 'landlord' : /tenant|\bT\b/i.test(said) ? 'tenant' : /provider|contractor|invoice|quote/i.test(said) ? 'provider' : undefined;
      state.holds.push({ ...r, party, reason: short(said, 100) });
    }

    // Dates, line by line.
    for (const line of body.split('\n')) {
      const appt = APPOINTMENT.test(line) || /Visit date|Visit time/i.test(line);
      const found = explicitDates(line, r.date);
      for (const d of found) state.dates.push({ ...r, iso: d, appointment: appt, text: short(line, 90) });
      const rel = line.match(R_RELATIVE)?.[1]?.toLowerCase();
      if (appt && rel) {
        const meant = addDays(r.date, rel === 'today' ? 0 : 1);
        if (found.length === 0) state.dates.push({ ...r, iso: meant, appointment: true, text: short(line, 90) });
        else if (!found.includes(meant)) note(`"${rel}" (${dmy(meant)} counted from the event's own date) but name${found.length > 1 ? '' : 's'} ${found.map(dmy).join(', ')}`, e.n);
      }
      if (appt && SET_DATE.test(line)) for (const d of found) if (d < r.date) note(`set an appointment for ${dmy(d)}, already past on the event's own date`, e.n);
    }

    // Amounts.
    for (const line of body.split('\n')) {
      for (const m of line.matchAll(AMOUNT)) {
        const kind = /invoice|bill|paid|payment/i.test(line) ? 'invoice' : /quot|estimate|cost|price|charge/i.test(line) ? 'quote' : 'other';
        state.amounts.push({ ...r, amount: `£${m[1]}${m[2] ?? ''}${m[3] ? ` ${m[3].trim()}` : ''}`, kind });
      }
    }

    // Attachments referenced.
    for (const m of body.matchAll(ATTACHMENT_NAME)) {
      const name = m[0].replace(/[).,\]]+$/, '');
      const key = `${e.n}:${name}`;
      if (seenAttachment.has(key)) continue;
      seenAttachment.add(key);
      const present = state.attachments.present.some((f) => f === name || f.startsWith(name));
      state.attachments.referenced.push({ ...r, name, available: present });
    }
    for (const m of body.matchAll(UNNAMED_ATTACHMENT)) state.attachments.referenced.push({ ...r, name: short(m[0], 60), available: false });

    // Postcodes that are not the property's.
    if (casePostcode) {
      for (const m of body.toUpperCase().matchAll(POSTCODE)) {
        const pc = normPostcode(m[1], m[2]);
        if (pc !== casePostcode && !state.addressMismatches.some((a) => a.event === e.n && a.postcode === pc)) {
          const line = body.split('\n').find((l) => l.toUpperCase().replace(/\s+/g, ' ').includes(pc)) ?? pc;
          state.addressMismatches.push({ ...r, postcode: pc, found: short(line, 110), expected: casePostcode });
        }
      }
    }

    // Issues the tenant or landlord adds that the original request did not mention.
    if ((from === 'tenant' || from === 'landlord') && isMessage(e) && baseline.trim()) {
      for (const sentence of body.split(/(?<=[.!?])\s+|\n/)) {
        if (!FAULT.test(sentence)) continue;
        for (const [noun, re] of ISSUE_NOUNS) {
          if (seenIssue.has(noun) || !re.test(sentence) || re.test(baseline)) continue;
          seenIssue.add(noun);
          state.unrelatedIssues.push({ ...r, noun, from, text: short(sentence, 110) });
        }
      }
    }
  }

  // The engine has no stage string for "quote sent" or for the landlord-route question; the agency's own
  // email to the landlord after the last stage signal is the better indicator.
  const lastAsk = state.approvals.at(-1);
  const settled = ['closed', 'completion_checks', 'quote_approved', 'paused'];
  if (lastAsk && (!state.stage || (lastAsk.event > state.stage.event && !settled.includes(state.stage.name)))) {
    const name: Stage | undefined =
      lastAsk.topic === 'quote' ? (lastAsk.reply ? 'quote_reply_received' : 'quote_awaiting_landlord') : lastAsk.topic === 'contractor' && !lastAsk.reply ? 'landlord_gate' : undefined;
    if (name) state.stage = { event: lastAsk.event, date: lastAsk.date, name, trigger: `agency to landlord: ${lastAsk.ask}` };
  }

  if (latestUpdate && PROMPT.test(text(latestUpdate))) state.latestPrompt = { ...ref(latestUpdate), text: short(text(latestUpdate).split('\n')[0], 140) };

  // Appointment dates since the latest provider assignment that disagree with each other.
  const sinceAssign = [...events].reverse().find((e) => channel(e) === 'update' && /provider assigned|New provider has been assigned/i.test(e.body))?.n ?? 0;
  const appts = state.dates.filter((d) => d.appointment && d.event >= sinceAssign);
  const byDate = new Map<string, number[]>();
  for (const d of appts) byDate.set(d.iso, [...new Set([...(byDate.get(d.iso) ?? []), d.event])]);
  if (byDate.size > 1) {
    const list = [...byDate].map(([d, ns]) => `${dmy(d)} (${ns.map(eventId).join(', ')})`).join('; ');
    state.appointmentConflicts.push(`appointment dates disagree since the provider was assigned: ${list}. A later one may be a genuine reschedule`);
  }
  for (const [what, ns] of dateNotes) state.appointmentConflicts.push(`${ns.length > 1 ? `${ns.map(eventId).join(', ')} say` : `${eventId(ns[0])} says`} ${what}`);
  return state;
}

// ---- rendering --------------------------------------------------------------------------------------

const at = (r: Ref) => `${eventId(r.event)}, ${r.date}`;
const MAX_LIST = 5;
const capList = <T>(xs: T[], fmt: (x: T) => string) => {
  const shown = xs.slice(-MAX_LIST).map(fmt);
  return xs.length > MAX_LIST ? [`(${xs.length - MAX_LIST} earlier omitted)`, ...shown] : shown;
};

export const stageLabel = (s: Stage) => STAGE_LABEL[s];

/** The hint bullets, one item per top-level bullet (an item may carry indented sub-bullets). */
export function hintLines(state: CaseState | undefined): string[] {
  if (!state || state.eventsSeen === 0) return [];
  const lines: string[] = [];
  const add = (s: string) => lines.push(`- ${s}`);

  if (state.stage) add(`Stage: ${STAGE_LABEL[state.stage.name]}; last stage signal "${state.stage.trigger}" (${at(state.stage)}).`);
  if (state.latestPrompt) add(`Latest system prompt: "${state.latestPrompt.text}" (${at(state.latestPrompt)}).`);

  const open = state.approvals.filter((a) => !a.reply);
  const answered = state.approvals.filter((a) => a.reply);
  for (const a of open.slice(-2)) add(`Open approval: asked the landlord (${a.topic}) at ${at(a)}: "${a.ask}"; no landlord reply since.`);
  for (const a of answered.slice(-2)) add(`Approval asked at ${eventId(a.event)} (${a.topic}); landlord replied at ${at(a.reply!)}: "${a.reply!.text}". Read the reply for what it actually authorises.`);

  const parties = (Object.entries(state.parties) as [Role, { lastFrom?: Ref; lastTo?: Ref }][]).filter(([r]) => r !== 'agency');
  if (parties.length) {
    const sub = parties.map(([role, p]) => {
      const c = state.chases[role];
      const chase = c && c.count > 0 ? `; ${c.count} agency message${c.count === 1 ? '' : 's'} to them since ${c.since ? `their last message` : 'the start'}${c.reminders ? ` (${c.reminders} reminder${c.reminders === 1 ? '' : 's'})` : ''}` : '';
      return `  - ${role}: last from them ${p.lastFrom ? at(p.lastFrom) : 'never'}; last to them ${p.lastTo ? at(p.lastTo) : 'never'}${chase}.`;
    });
    lines.push(['- Last contact per party:', ...sub].join('\n'));
  }

  const lastHold = state.holds.at(-1);
  if (lastHold) {
    const status = lastHold.resumedBy ? `${lastHold.party} has written since (${eventId(lastHold.resumedBy.event)})` : lastHold.party ? `no message from the ${lastHold.party} since` : 'party not stated';
    add(`Holds: ${state.holds.length} in total; latest "${lastHold.reason}" (${at(lastHold)}); ${status}.`);
  }

  for (const c of state.weekdayConflicts.slice(-4)) add(`Date conflict: ${c}.`);
  for (const c of state.appointmentConflicts.slice(0, 4)) add(`Date check: ${c}.`);
  const appts = [...new Map(state.dates.filter((d) => d.appointment).map((d) => [d.iso, d])).values()];
  const upcoming = appts.filter((d) => d.iso >= state.today);
  if (appts.length && !state.appointmentConflicts.length) add(`Appointment dates mentioned: ${capList(appts, (d) => `${dmy(d.iso)} (${eventId(d.event)})`).join(', ')}.`);
  const lastAppt = appts.at(-1);
  if (lastAppt && !upcoming.length && state.stage?.name === 'visit_booked') add(`The latest appointment date mentioned (${dmy(lastAppt.iso)}) is before today (${state.today}).`);

  const amounts = [...new Map(state.amounts.map((a) => [`${a.amount}|${a.kind}`, a])).values()];
  if (amounts.length) add(`Amounts: ${capList(amounts, (a) => `${a.amount} ${a.kind} (${eventId(a.event)})`).join('; ')}.`);

  const missing = state.attachments.referenced.filter((a) => !a.available);
  const usable = state.attachments.referenced.filter((a) => a.available);
  if (missing.length) {
    const byEvent = new Map<number, number>();
    for (const a of missing) byEvent.set(a.event, (byEvent.get(a.event) ?? 0) + 1);
    add(`Attachments referenced but not in the case files: ${capList([...byEvent], ([n, c]) => `${c} at ${eventId(n)}`).join(', ')}.`);
  }
  if (usable.length || state.attachments.present.length) add(`Attachment files present: ${state.attachments.present.length ? state.attachments.present.join(', ') : 'none'}.`);

  const byEvent = new Map<number, (typeof state.addressMismatches)[number][]>();
  for (const m of state.addressMismatches) byEvent.set(m.event, [...(byEvent.get(m.event) ?? []), m]);
  for (const ms of [...byEvent.values()].slice(-4))
    add(`Address check: ${eventId(ms[0].event)} mentions ${ms.map((m) => m.postcode).join(', ')}, not the case property's ${ms[0].expected}: "${ms[0].found}".`);
  for (const u of state.unrelatedIssues.slice(0, 4)) add(`Possible separate issue (${u.noun}) raised by the ${u.from} at ${eventId(u.event)}, not in the original request: "${u.text}".`);
  return lines;
}

export function renderHints(state: CaseState | undefined): string {
  if (!state || state.eventsSeen === 0) return '';
  const lines = hintLines(state);
  if (!lines.length) return '';
  return [
    '<case_state_hints>',
    `## Derived case-state hints (${state.eventsSeen} events, latest ${state.today})`,
    'Derived from the visible history by code, not read by a person; verify each line against the events before relying on it.',
    ...lines,
    '</case_state_hints>',
  ].join('\n');
}

// ---- loading and the safe wrapper ------------------------------------------------------------------

/** Reads an organiser-format case folder and keeps the first `cutoff` events (all when undefined). */
export function stateInputFromDir(dir: string, cutoff?: number): StateInput | undefined {
  if (!isPublicCase(dir)) return undefined;
  const index = readFileSync(join(dir, 'index.md'), 'utf8');
  const { events } = parseHistory(readFileSync(join(dir, 'history.md'), 'utf8'));
  if (events.length === 0) throw new Error('history.md has no event anchors');
  const visible = cutoff === undefined ? events : events.slice(0, cutoff);
  const attDir = join(dir, 'attachments');
  return {
    events: visible,
    property: index.match(/^- \*\*Property:\*\* (.+)$/m)?.[1],
    title: index.match(/^# (.+)$/m)?.[1],
    initialRequest: index.match(/^## Initial request\s*\n([\s\S]*?)(?=^## |$(?![\s\S]))/m)?.[1]?.trim(),
    attachmentFiles: existsSync(attDir) ? readdirSync(attDir).sort() : [],
  };
}

/**
 * Hints for a loaded case (`LoadedCase` fits). Never throws: practice-format cases give `''`; anything
 * unparseable gives `''` plus `hintsError`.
 */
export function hintsFor(c: { dir: string; cutoff?: number }): { text: string; hintsError?: string } {
  try {
    const input = stateInputFromDir(c.dir, c.cutoff);
    return { text: input ? renderHints(reconstructState(input)) : '' };
  } catch (err) {
    return { text: '', hintsError: err instanceof Error ? err.message : String(err) };
  }
}
