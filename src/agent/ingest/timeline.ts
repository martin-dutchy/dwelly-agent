// Timeline events from the message-like files of a practice or generic case.
import { basename } from 'node:path';
import type { Channel, TimelineEvent } from '../harness/contracts.js';
import { dayOf, toIso } from './dates.js';
import type { Email } from './eml.js';

export type RawEvent = Omit<TimelineEvent, 'id' | 'doc'>;
/** `day` (YYYY-MM-DD) dates a time-only stamp; `now` keeps such guesses out of the future. */
export type Ctx = { day?: string; now?: string };

const MAX_TEXT = 1500;
const cap = (s: string) => (s.length > MAX_TEXT ? `${s.slice(0, MAX_TEXT)}…` : s);
const p2 = (n: number) => String(n).padStart(2, '0');

export function channelOf(s: string | undefined, fallback: Channel = 'other'): Channel {
  const t = (s ?? '').toLowerCase();
  if (/whats/.test(t)) return 'whatsapp';
  if (/\bsms\b|\btext message/.test(t)) return 'sms';
  if (/e-?mail/.test(t)) return 'email';
  if (/\bcall|phone|voice/.test(t)) return 'call';
  if (/\bhold\b/.test(t)) return 'hold';
  if (/update|status|system/.test(t)) return 'update';
  if (/note/.test(t)) return 'note';
  return fallback;
}

/** A local time on `day`, moved to the day before when that would be after `now`. */
function onDay(ctx: Ctx, h: number, m: number, s?: number): string | undefined {
  if (!ctx.day) return undefined;
  const iso = `${ctx.day}T${p2(h)}:${p2(m)}${s === undefined ? '' : `:${p2(s)}`}`;
  if (ctx.now && ctx.now.length > 10 && iso.slice(0, 16) > ctx.now.slice(0, 16)) {
    const d = new Date(`${ctx.day}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - 1);
    return `${d.toISOString().slice(0, 10)}${iso.slice(10)}`;
  }
  return iso;
}

// ---- email -----------------------------------------------------------------------------------------

const QUOTE_HEADER = /^>?\s*On (.+?)\s+wrote:\s*$|^-{2,}\s*Original Message\s*-{2,}\s*$|^_{5,}\s*$/im;

export function emailEvents(e: Email): RawEvent[] {
  const body = e.text.replace(/\r\n/g, '\n');
  const q = body.match(QUOTE_HEADER);
  const fresh = q ? body.slice(0, q.index).trim() : body.trim();
  const out: RawEvent[] = [{ at: toIso(e.date), channel: 'email', from: e.from, to: e.to, text: cap(`${e.subject ? `Subject: ${e.subject}\n\n` : ''}${fresh}`) }];
  if (!q) return out;
  const rest = body
    .slice(q.index! + q[0].length)
    .split('\n')
    .map((l) => l.replace(/^>\s?/, ''))
    .join('\n')
    .trim();
  if (q[1]) {
    // "9 Oct 2026, at 16:10, lettings@x.example" — the sender is the last comma-separated part.
    const who = q[1].split(',').at(-1)!.trim();
    out.push({ at: toIso(q[1]), channel: 'email', from: who, to: e.from, text: cap(rest) });
  } else {
    const f = (k: string) => rest.match(new RegExp(`^${k}:\\s*(.+)$`, 'im'))?.[1]?.trim();
    const text = rest.replace(/^(From|Sent|Date|To|Cc|Subject):.*$/gim, '').trim();
    out.push({ at: toIso(f('Sent') ?? f('Date')), channel: 'email', from: f('From'), to: f('To'), text: cap(`${f('Subject') ? `Subject: ${f('Subject')}\n\n` : ''}${text}`) });
  }
  return out.filter((ev) => ev.text);
}

// ---- call transcripts --------------------------------------------------------------------------------

const STAMP = /^\[(\d{1,2}):(\d{2})(?::(\d{2}))?\]\s*(.*)$/;

export function transcriptEvents(text: string, ctx: Ctx): RawEvent[] {
  const lines = text.split(/\r?\n/);
  const first = lines.findIndex((l) => STAMP.test(l));
  const header = lines.slice(0, Math.max(0, first)).join(' ');
  const day = dayOf(toIso(header)) ?? ctx.day;
  const start = header.match(/start(?:ed)?(?: at)?:?\s*(\d{1,2}):(\d{2})(?::(\d{2}))?/i);
  const firstStamp = lines[first]?.match(STAMP);
  // [00:00] … is elapsed time; [16:02:00] or [16:02] without a call start is the clock.
  const elapsed = !!start || (firstStamp && Number(firstStamp[1]) === 0) || (firstStamp && !firstStamp[3] && Number(firstStamp[1]) >= 24);
  const out: RawEvent[] = [];
  for (const line of lines.slice(Math.max(0, first))) {
    const m = line.match(STAMP);
    if (!m) {
      if (line.trim() && out.length) out.at(-1)!.text = cap(`${out.at(-1)!.text}\n${line.trim()}`);
      continue;
    }
    const [a, b, c] = [Number(m[1]), Number(m[2]), m[3] === undefined ? undefined : Number(m[3])];
    let at: string | undefined;
    if (elapsed && start) {
      const secs = Number(start[1]) * 3600 + Number(start[2]) * 60 + Number(start[3] ?? 0) + (c === undefined ? a * 60 + b : a * 3600 + b * 60 + c);
      at = onDay({ day, now: ctx.now }, Math.floor(secs / 3600) % 24, Math.floor(secs / 60) % 60, secs % 60);
    } else if (!elapsed) at = onDay({ day, now: ctx.now }, a, b, c);
    const rest = m[4];
    const note = rest.match(/^\[(.*)\]$/);
    const said = rest.match(/^([^:\[\]]{1,60}):\s*(.*)$/);
    out.push(note ? { at, channel: 'call', from: 'system', text: note[1] } : said ? { at, channel: 'call', from: said[1].trim(), text: said[2] } : { at, channel: 'call', text: rest });
  }
  return out;
}

// ---- chat exports (WhatsApp style) -------------------------------------------------------------------

const CHAT = /^\[?(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*(?:-\s*)?([^:\]]{1,60}):\s?(.*)$/;

export function chatEvents(text: string, channel: Channel): RawEvent[] {
  const out: RawEvent[] = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(CHAT);
    if (m) out.push({ at: toIso(`${m[1]}, ${m[2]}`), channel, from: m[3].trim(), text: m[4] });
    else if (line.trim() && out.length) out.at(-1)!.text = cap(`${out.at(-1)!.text}\n${line}`);
  }
  return out;
}

// ---- dated log lines ---------------------------------------------------------------------------------

const DATED = /^\s*\[?(\d{4}-\d{2}-\d{2}(?:[ T]\d{1,2}:\d{2}(?::\d{2})?)?)\]?\s+(.+)$/;
const NAME = "[A-Z][\\w'.&-]*(?: (?:&|[A-Z][\\w'.&-]*)){0,3}";

export function datedLineEvents(text: string): RawEvent[] {
  const out: RawEvent[] = [];
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(DATED);
    if (!m) {
      if (line.trim() && out.length) out.at(-1)!.text = cap(`${out.at(-1)!.text}\n${line.trim()}`);
      continue;
    }
    const body = m[2].trim();
    const from = body.match(new RegExp(`\\b(?:from|From|FROM):? (${NAME})`))?.[1];
    const to = body.match(new RegExp(`\\b(?:to|To|TO):? ([\\w.+-]+@[\\w.-]+|\\+?\\d[\\d ]{6,}\\d|${NAME})`))?.[1];
    out.push({ at: toIso(m[1]), channel: /\bSubject:/i.test(body) ? 'email' : channelOf(body.slice(0, 40), 'note'), from, to, text: body });
  }
  return out;
}

// ---- JSON logs ---------------------------------------------------------------------------------------

const TIME_KEYS = ['ts', 'time', 'timestamp', 'at', 'datetime', 'date_time', 'sent_at', 'started_at', 'received_at', 'created_at', 'logged_at', 'occurred_at', 'date', 'created', 'when'];
const TEXT_KEYS = ['text', 'body', 'message', 'content', 'preview', 'summary', 'note', 'notes', 'description', 'transcript', 'event'];
const FROM_KEYS = ['from', 'sender', 'author', 'speaker', 'caller', 'by', 'agent', 'user'];
const TO_KEYS = ['to', 'recipient', 'contact', 'callee'];
// Records rather than logs: CRM, tickets and policies are read elsewhere or by the model.
const NOT_A_LOG = /crm|ticket|compliance|polic|metadata|contractor|tenan|landlord|propert|record|config|schema/i;

const str = (v: unknown) => (v === undefined || v === null ? undefined : typeof v === 'object' ? JSON.stringify(v) : String(v));
const pick = (o: Record<string, unknown>, keys: string[]) => keys.find((k) => o[k] !== undefined && o[k] !== null && o[k] !== '');

function objectEvent(o: Record<string, unknown>, ctx: Ctx, channel: Channel): RawEvent {
  const tk = pick(o, TIME_KEYS);
  const raw = tk ? str(o[tk]) : undefined;
  const hm = raw?.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  const at = hm ? onDay(ctx, Number(hm[1]), Number(hm[2]), hm[3] === undefined ? undefined : Number(hm[3])) : toIso(raw);
  const fk = pick(o, FROM_KEYS);
  const tok = pick(o, TO_KEYS);
  const xk = pick(o, TEXT_KEYS);
  const used = new Set([tk, fk, tok, xk, 'channel']);
  const tool = typeof o.tool === 'string' ? `${o.tool}(${o.args === undefined ? '' : str(o.args)})${o.result === undefined ? '' : ` → ${str(o.result)}`}` : undefined;
  if (tool) ['tool', 'args', 'result'].forEach((k) => used.add(k));
  const rest = Object.entries(o)
    .filter(([k, v]) => !used.has(k) && v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `${k}: ${str(v)}`)
    .join('; ');
  const text = [tool, xk ? str(o[xk]) : undefined, rest].filter(Boolean).join(' · ');
  return { at, channel: channelOf(str(o.channel) ?? str(o.type), channel), from: fk ? str(o[fk]) : undefined, to: tok ? str(o[tok]) : undefined, text: cap(text) };
}

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

export function jsonEvents(path: string, json: unknown, ctx: Ctx): RawEvent[] {
  const name = basename(path);
  if (NOT_A_LOG.test(name)) return [];
  const lists = Array.isArray(json) ? [json] : isObj(json) ? Object.values(json).filter(Array.isArray) : [];
  const channel = /action|tool/i.test(name) ? 'note' : channelOf(name, 'other');
  return lists.flatMap((list) => {
    const objs = list.filter(isObj);
    // A log is a list where most entries carry a timestamp.
    if (objs.length === 0 || objs.filter((o) => pick(o, TIME_KEYS)).length * 2 < objs.length) return [];
    return objs.map((o) => objectEvent(o, ctx, channel));
  });
}

// ---- CSV exports -------------------------------------------------------------------------------------

function csvRow(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted && ch === '"' && line[i + 1] === '"') {
      cur += '"';
      i++;
    } else if (ch === '"') quoted = !quoted;
    else if (ch === ',' && !quoted) {
      out.push(cur);
      cur = '';
    } else cur += ch;
  }
  return [...out, cur];
}

/** Rows of a CSV with a date column, one event each. */
export function csvEvents(text: string): RawEvent[] {
  const [head, ...rows] = text.split(/\r?\n/).filter((l) => l.trim());
  if (!head) return [];
  const cols = csvRow(head).map((c) => c.trim().toLowerCase());
  const dateCol = cols.findIndex((c) => TIME_KEYS.includes(c) || /date|time/.test(c));
  if (dateCol < 0) return [];
  const fromCol = cols.findIndex((c) => FROM_KEYS.includes(c));
  const toCol = cols.findIndex((c) => TO_KEYS.includes(c));
  const chCol = cols.indexOf('channel');
  return rows.flatMap((line) => {
    const r = csvRow(line);
    const at = toIso(r[dateCol]);
    if (!at) return [];
    const text = cols
      .map((c, i) => (i === dateCol || !r[i]?.trim() ? '' : `${c}: ${r[i].trim()}`))
      .filter(Boolean)
      .join('; ');
    return [{ at, channel: channelOf(r[chCol], 'note'), from: fromCol >= 0 ? r[fromCol] : undefined, to: toCol >= 0 ? r[toCol] : undefined, text: cap(text) }];
  });
}

// ---- dispatch ----------------------------------------------------------------------------------------

const count = (text: string, re: RegExp) => text.split(/\r?\n/).filter((l) => re.test(l)).length;

export type Shape = 'chat' | 'transcript' | 'log';
export function textShape(text: string): Shape | undefined {
  if (count(text, CHAT) >= 2) return 'chat';
  if (count(text, STAMP) >= 2) return 'transcript';
  if (count(text, DATED) >= 2) return 'log';
  return undefined;
}

/** Events in a text file, by its shape: chat export, call transcript or dated log. */
export function textEvents(path: string, text: string, ctx: Ctx): RawEvent[] {
  if (/\.csv$/i.test(path)) return csvEvents(text);
  const shape = textShape(text);
  if (shape === 'chat') return chatEvents(text, channelOf(basename(path), 'whatsapp'));
  if (shape === 'transcript') return transcriptEvents(text, ctx);
  if (shape === 'log') return datedLineEvents(text);
  return [];
}
