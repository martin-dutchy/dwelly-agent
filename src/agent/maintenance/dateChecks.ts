/**
 * Weekday names that contradict the calendar date they sit next to ("Monday 30/08/2025" when 30/08/2025 is a
 * Saturday), and one date called by two different weekdays across the history. UK day-first order only.
 * Pure and conservative: a weekday is paired with a date only on the same line, in the same sentence, with
 * at most a couple of words between them; anything unclear yields nothing.
 */

/** One event's visible text and its own date (YYYY-MM-DD), used to infer a missing year. */
export type DatedText = { event: number; date: string; text: string };

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTH = 'jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sept?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?';

const R_WEEKDAY = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tues?|wed|thu(?:rs?)?|fri|sat|sun)\b/gi;
const R_DMY = /(?<![\d/])(\d{1,2})\/(\d{1,2})(?:\/(\d{4}|\d{2}))?(?![\d/])/g;
const R_ISO = /\b(20\d{2})-(\d{2})-(\d{2})\b/g;
const R_D_MONTH = new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?(${MONTH})\\b\\.?(?:,?\\s+(20\\d{2})\\b)?`, 'gi');
const R_MONTH_D = new RegExp(`\\b(${MONTH})\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?\\b(?![:.]\\d|\\s*[ap]\\.?m\\b)(?:,?\\s+(20\\d{2})\\b)?`, 'gi');

/** Joins two weekdays into a range or list ("Mon-Fri", "Monday to Friday", "Monday or Tuesday"). */
const R_JOIN = /^\s*(?:-|–|—|\/|&|,|to|till|until|through|thru|and|or)\s*$/i;
/** Words between a weekday and its date that do not weaken the link: times of day and fillers. */
const FILLER = /^(?:\d{1,2}(?:[:.]\d{2})?(?:am|pm)?|[ap]\.?m\.?|morning|afternoon|evening|noon|midday|between|from|at|on|the|of|this|next|coming|slot|time|appointment|visit)$/i;
/** Words that mean the date is about something else ("Monday, not 30/08", "Monday instead of 8 September"). */
const BREAKER = /\b(?:and|but|then|after|before|since|while|instead|rather|not|until|till|than|because|or|to|by)\b/i;
const MAX_CONTENT_WORDS = 2;
const MAX_WORDS = 8;
const MAX_INFER_DAYS = 274;
const AMBIGUOUS_DAYS = 60;

type Span = { start: number; end: number };
type Weekday = Span & { day: number };
type DateHit = Span & { iso: string; inferred: boolean };
type Pair = { event: number; iso: string; inferred: boolean; said: number; snippet: string };

const pad = (n: number) => String(n).padStart(2, '0');
const DAY_MS = 86_400_000;
const eventId = (n: number) => `event ${String(n).padStart(3, '0')}`;
const events = (ns: number[]) => (ns.length > 1 ? `events ${ns.map((n) => String(n).padStart(3, '0')).join(', ')}` : eventId(ns[0]));
const dmy = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;
const dayOf = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDay();

/** A real calendar date as YYYY-MM-DD, or undefined (31/02, month 13). */
function valid(y: number, m: number, d: number): string | undefined {
  if (m < 1 || m > 12 || d < 1 || d > 31) return undefined;
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCMonth() === m - 1 ? `${y}-${pad(m)}-${pad(d)}` : undefined;
}

/** The year nearest the event that keeps the date within ~9 months of it; undefined when two years are about as near. */
export function inferYear(m: number, d: number, eventDate: string): string | undefined {
  const at = Date.parse(`${eventDate}T00:00:00Z`);
  const y = Number(eventDate.slice(0, 4));
  if (!Number.isFinite(at)) return undefined;
  const near = [y - 1, y, y + 1]
    .map((yy) => valid(yy, m, d))
    .filter((v): v is string => !!v)
    .map((iso) => ({ iso, gap: Math.abs(Date.parse(`${iso}T00:00:00Z`) - at) / DAY_MS }))
    .filter((c) => c.gap <= MAX_INFER_DAYS)
    .sort((a, b) => a.gap - b.gap);
  if (!near.length || (near.length > 1 && near[1].gap - near[0].gap < AMBIGUOUS_DAYS)) return undefined;
  return near[0].iso;
}

const monthIdx = (s: string) => MONTHS.indexOf(s.slice(0, 3).toLowerCase()) + 1;

function datesIn(line: string, eventDate: string): DateHit[] {
  const out: DateHit[] = [];
  const push = (m: RegExpMatchArray, y: string | undefined, mo: number, d: number) => {
    const start = m.index!;
    const end = start + m[0].replace(/[\s,.]+$/, '').length;
    if (out.some((o) => start < o.end && end > o.start)) return;
    const iso = y ? valid(y.length === 2 ? 2000 + Number(y) : Number(y), mo, d) : inferYear(mo, d, eventDate);
    if (iso) out.push({ start, end, iso, inferred: !y });
  };
  for (const m of line.matchAll(R_ISO)) push(m, m[1], Number(m[2]), Number(m[3]));
  for (const m of line.matchAll(R_DMY)) if (!(m[1] === '24' && m[2] === '7' && !m[3])) push(m, m[3], Number(m[2]), Number(m[1]));
  for (const m of line.matchAll(R_D_MONTH)) push(m, m[3], monthIdx(m[2]), Number(m[1]));
  for (const m of line.matchAll(R_MONTH_D)) if (/^[A-Z]/.test(m[1])) push(m, m[3], monthIdx(m[1]), Number(m[2]));
  return out.sort((a, b) => a.start - b.start);
}

function weekdaysIn(line: string): Weekday[] {
  const out: Weekday[] = [];
  for (const m of line.matchAll(R_WEEKDAY)) {
    const word = m[1];
    const abbr = word.length <= 5;
    if (abbr && !/^[A-Z][a-z]+$/.test(word)) continue;
    const day = DAYS.findIndex((d) => d.toLowerCase().startsWith(word.slice(0, 3).toLowerCase()));
    const end = m.index! + word.length + (abbr && line[m.index! + word.length] === '.' ? 1 : 0);
    out.push({ start: m.index!, end, day });
  }
  return out.filter((w, i) => !out.some((o, j) => j !== i && R_JOIN.test(line.slice(Math.min(w.end, o.end), Math.max(w.start, o.start)))));
}

/** The words between a weekday and a date keep them together: same sentence, close, nothing contrastive. */
function linked(gap: string, forward: boolean): boolean {
  if (/\n/.test(gap)) return false;
  const plain = gap.replace(/\b[ap]\.m\./gi, 'am').replace(/\bbetween\s+\S+\s+and\s+\S+/gi, ' ').replace(/\b\d{1,2}(?:[:.]\d{2})?\s*(?:-|–|to)\s*\d{1,2}(?:[:.]\d{2})?(?:\s*[ap]m)?\b/gi, ' ');
  if (/[.!?;](\s|$)/.test(plain)) return false;
  if (!forward) return /^[\s,(–—-]*$/.test(plain);
  if (BREAKER.test(plain)) return false;
  const words = plain.split(/[\s,()–—-]+/).filter(Boolean);
  return words.length <= MAX_WORDS && words.filter((w) => !FILLER.test(w)).length <= MAX_CONTENT_WORDS;
}

/** Weekday + date pairs in one line: each weekday takes the nearest following date, else a date just before it. */
function pairsIn(line: string, item: DatedText): Pair[] {
  const days = weekdaysIn(line);
  if (!days.length) return [];
  const dates = datesIn(line, item.date);
  const between = (a: number, b: number) => [...days, ...dates].some((s) => s.start >= a && s.end <= b);
  const taken = new Set<DateHit>();
  const pairs: Pair[] = [];
  const pair = (w: Weekday, d: DateHit) => {
    taken.add(d);
    let snippet = line.slice(Math.min(w.start, d.start), Math.max(w.end, d.end)).trim();
    if (line[Math.max(w.end, d.end)] === ')' && snippet.split('(').length > snippet.split(')').length) snippet += ')';
    pairs.push({ event: item.event, iso: d.iso, inferred: d.inferred, said: w.day, snippet });
  };
  const unpaired: Weekday[] = [];
  for (const w of days) {
    const d = dates.find((x) => x.start >= w.end && !taken.has(x));
    if (d && !between(w.end, d.start) && linked(line.slice(w.end, d.start), true)) pair(w, d);
    else unpaired.push(w);
  }
  for (const w of unpaired) {
    const d = [...dates].reverse().find((x) => x.end <= w.start);
    if (d && !taken.has(d) && !between(d.end, w.start) && linked(line.slice(d.end, w.start), false)) pair(w, d);
  }
  return pairs;
}

/** Hint lines, oldest first. Never throws: any failure yields no lines. */
export function weekdayDateConflicts(items: DatedText[]): string[] {
  try {
    const pairs = items.flatMap((item) => item.text.split('\n').flatMap((line) => pairsIn(line, item)));
    const lines: { first: number; text: string }[] = [];

    const wrong = new Map<string, Pair[]>();
    for (const p of pairs) if (p.said !== dayOf(p.iso)) wrong.set(`${p.iso}|${p.said}`, [...(wrong.get(`${p.iso}|${p.said}`) ?? []), p]);
    for (const ps of wrong.values()) {
      const ns = [...new Set(ps.map((p) => p.event))];
      const [p] = ps;
      const year = p.inferred ? ' (year inferred from the event date)' : '';
      lines.push({ first: ns[0], text: `${events(ns)} ${ns.length > 1 ? 'say' : 'says'} "${p.snippet}" but ${dmy(p.iso)}${year} is a ${DAYS[dayOf(p.iso)]}` });
    }

    const named = new Map<string, Map<number, number[]>>();
    for (const p of pairs) {
      const byDay = named.get(p.iso) ?? new Map<number, number[]>();
      byDay.set(p.said, [...new Set([...(byDay.get(p.said) ?? []), p.event])]);
      named.set(p.iso, byDay);
    }
    for (const [iso, byDay] of named) {
      if (byDay.size < 2) continue;
      const parts = [...byDay].map(([day, ns]) => `${DAYS[day]} (${events(ns)})`);
      lines.push({ first: Math.min(...[...byDay.values()].flat()), text: `${dmy(iso)} is called ${parts.slice(0, -1).join(', ')} and ${parts.at(-1)}` });
    }
    return lines.sort((a, b) => a.first - b.first).map((l) => l.text);
  } catch {
    return [];
  }
}
