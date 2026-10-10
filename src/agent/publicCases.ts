import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { readAttachment } from './attachments.js';
import type { CaseInput, CaseMedia } from './cases.js';

/**
 * Loader for the organisers' case format (HackatonPublicCases/<Track>/<n>/):
 *   index.md    case details, initial request, and (in public examples) overview/outcome
 *   history.md  dated events, each anchored as <a id="event-NNN">
 *   attachments/
 * Two modes:
 *   - replay (`at` = auto | N | 50%): the default under HackatonPublicCases/. We cut the history at a
 *     decision point and hide everything that reveals the ending (later events, Overview, Outcome,
 *     Next action). The hidden part becomes `reference`, which only the judge sees.
 *   - as-is (`at` = none): the default anywhere else, i.e. the Reality Test, whose cases arrive already
 *     cut at their decision point. Every event is shown; only Overview / Outcome / Status / Updated /
 *     Completed are hidden if present, because they would spoil the ending of a public-format case.
 */

export type HistoryEvent = { n: number; header: string; body: string };

// index.md sections that give the answer away in a replay.
const SPOILER_SECTIONS = ['Overview', 'Outcome', 'Next action at escalation', 'Boundaries and remaining work', 'History', 'Attachments'];
// Sections hidden even when nothing is cut: they summarise the whole case, ending included.
const SUMMARY_SECTIONS = ['Overview', 'Outcome'];
export const MAX_FILE_CHARS = 60_000;
/** Compaction: events at the end of history.md kept verbatim when the file is over the cap. */
const TAIL_EVENTS = 12;
/** A single event body longer than this is elided in the middle so one giant event cannot eat the cap. */
const MAX_EVENT_CHARS = 20_000;

export const isPublicCase = (dir: string) => existsSync(join(dir, 'index.md')) && existsSync(join(dir, 'history.md'));

export function parseHistory(md: string): { preamble: string; events: HistoryEvent[] } {
  const [preamble, ...chunks] = md.split(/<a id="event-\d+"><\/a>\n/);
  const events = chunks.map((chunk) => {
    const [header, ...rest] = chunk.trim().split('\n');
    const n = Number(header.match(/event (\d+)/)?.[1] ?? 0);
    return { n, header: header.replace(/^##\s*/, ''), body: rest.join('\n').trim() };
  });
  return { preamble: preamble.trim(), events };
}

function sections(md: string) {
  const [title, ...parts] = md.split(/^## /m);
  return { title: title.trim(), parts: parts.map((p) => ({ name: p.split('\n')[0].trim(), text: `## ${p.trim()}` })) };
}

/** Default cut mode: replay public examples, take anything else (the Reality Test) as it comes. */
export const defaultAt = (dir: string) => (dir.includes('HackatonPublicCases') ? 'auto' : 'none');

/**
 * Events visible at the decision point, and how that point was found:
 * all of them for `none`; else N or N%; else (auto) the organisers' own marker (the "Recorded action" link,
 * or the Overview's "escalation snapshot comprises history events 001–00N"); else, for cases without a
 * marker (Property Management), just before an agency message or call in the second half of the history,
 * so the recorded next event is a real decision rather than a system status update.
 */
function resolveCutoff(index: string, events: HistoryEvent[], at: string): { cutoff: number; marked: boolean } {
  const total = events.length;
  if (at === 'none') return { cutoff: total, marked: true };
  if (at !== 'auto') {
    const n = at.endsWith('%') ? Math.round((total * Number(at.slice(0, -1))) / 100) : Number(at);
    return { cutoff: Math.max(1, Math.min(total, n)), marked: false };
  }
  const recorded = index.match(/Recorded action:\*\* \[History event (\d+)\]/)?.[1];
  if (recorded) return { cutoff: Number(recorded) - 1, marked: true };
  const snapshot = index.match(/escalation snapshot comprises history events? \d+\s*[–-]\s*(\d+)/i)?.[1];
  if (snapshot) return { cutoff: Math.max(1, Math.min(total, Number(snapshot))), marked: true };
  const half = Math.max(1, Math.floor(total / 2));
  const next = events.findIndex((e, i) => i >= half && agencyAction(e));
  return { cutoff: next > 0 ? next : half, marked: false };
}

/** An email, SMS or call the agency sent to a tenant, landlord or contractor: a decision someone took. */
export function agencyAction(e: HistoryEvent): boolean {
  const channel = field(e.body, 'Channel') ?? '';
  const from = field(e.body, 'From') ?? '';
  const to = field(e.body, 'To') ?? '';
  return /^(email|sms|call)$/i.test(channel) && /agency|lettings/i.test(from) && /tenant|landlord|contractor|provider/i.test(to);
}

/** Head clip for attachments and practice-case files, whose important part is at the start. */
export const clip = (s: string) => (s.length > MAX_FILE_CHARS ? `${s.slice(0, MAX_FILE_CHARS)}\n…[truncated ${s.length - MAX_FILE_CHARS} chars]` : s);

const renderEvent = (e: HistoryEvent) => `### ${e.header}\n\n${e.body}`;

// ---- Tail-preserving compaction -------------------------------------------------------------------
// The decision point is at the END of the history, so a long file must never lose its tail. When the
// rendered history is over the cap we keep the first event and the last TAIL_EVENTS verbatim and
// shrink the middle in stages: collapse runs of routine events (holds, reminders, SMS nudges) into one
// line each with a count and date range; then reduce the remaining middle events to one-line summaries;
// then drop middle events oldest-first behind an "omitted" line. The last event is always verbatim.

const field = (body: string, name: string) => body.match(new RegExp(`^- \\*\\*${name}:\\*\\* (.*)$`, 'm'))?.[1]?.trim();
const date = (e: HistoryEvent) => e.header.split(' — ')[0].slice(0, 10);
const num = (e: HistoryEvent) => String(e.n).padStart(3, '0');

/**
 * Routine events carry no new information beyond "we are still waiting": a kind label, or undefined.
 * System triggers such as "3+ reminders have been sent to provider. Please check what's happening." are
 * NOT routine: they mark the end of a chase cycle and must stay visible.
 */
export function routineKind(e: HistoryEvent): string | undefined {
  const channel = field(e.body, 'Channel') ?? '';
  const to = field(e.body, 'To');
  const text = e.body.toLowerCase();
  const target = to && to !== 'Not specified' ? ` to ${to}` : '';
  if (/^hold$/i.test(channel) || /^(held awaiting|put on hold|placed on hold)/m.test(text)) return 'hold';
  if (/^(update|note|system)$/i.test(channel)) return undefined;
  if (/(friendly|gentle) reminder|this is a reminder/.test(text)) return `${channel || 'message'} reminder${target}`;
  if (/^sms$/i.test(channel) && /please check your email/.test(text)) return `SMS nudge${target}`;
  return undefined;
}

/** What a hold was waiting on: its stated reason, else its first line of text. */
const holdReason = (e: HistoryEvent) => {
  const reason = e.body.match(/Reason: ([^.\n]+)/)?.[1]?.trim();
  if (reason) return reason;
  const line = e.body.split('\n').find((l) => l.trim() && !l.startsWith('- **'))?.trim() ?? '';
  return line.length > 80 ? `${line.slice(0, 80)}…` : line;
};

function summariseRun(run: HistoryEvent[]): string {
  const counts = new Map<string, number>();
  for (const e of run) {
    const k = routineKind(e)!;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const first = run[0];
  const last = run[run.length - 1];
  const range = date(first) === date(last) ? date(first) : `${date(first)} to ${date(last)}`;
  const what = [...counts].map(([k, c]) => `${c} × ${k}`).join(', ');
  const span = run.length === 1 ? `event ${num(first)}` : `events ${num(first)}–${num(last)}`;
  const reasons = [...new Set(run.filter((e) => routineKind(e) === 'hold').map(holdReason).filter(Boolean))];
  const holds = reasons.length ? ` Hold reasons in order: ${reasons.join(' → ')}.` : '';
  return `- ${span} (${range}): ${what}.${holds} ${run.length} repeated routine event${run.length === 1 ? '' : 's'} collapsed; nothing else happened in between.`;
}

const oneLine = (e: HistoryEvent) => {
  const meta = ['Channel', 'From', 'To'].map((f) => field(e.body, f)).filter(Boolean).join(' · ');
  const text = e.body
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('- **'))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  return `- event ${num(e)} (${date(e)}) ${meta}: ${text.length > 160 ? `${text.slice(0, 160)}…` : text}`;
};

const elideBody = (e: HistoryEvent): HistoryEvent =>
  e.body.length <= MAX_EVENT_CHARS
    ? e
    : { ...e, body: `${e.body.slice(0, MAX_EVENT_CHARS / 2)}\n…[${e.body.length - MAX_EVENT_CHARS} chars elided from the middle of this event]…\n${e.body.slice(-MAX_EVENT_CHARS / 2)}` };

/** Middle events as blocks: either a verbatim event or a collapsed run of routine ones. */
type Block = { kind: 'event'; e: HistoryEvent } | { kind: 'run'; run: HistoryEvent[] };

function blocks(middle: HistoryEvent[]): Block[] {
  const out: Block[] = [];
  for (const e of middle) {
    const last = out.at(-1);
    if (routineKind(e)) {
      if (last?.kind === 'run') last.run.push(e);
      else out.push({ kind: 'run', run: [e] });
    } else out.push({ kind: 'event', e });
  }
  return out;
}

export function compactHistory(preamble: string, events: HistoryEvent[], cap = MAX_FILE_CHARS): string {
  const full = `${preamble}\n\n${events.map(renderEvent).join('\n\n')}`;
  if (full.length <= cap) return full;
  if (events.length === 0) return clip(full);

  // Giant bodies are elided in the middle, except the last event, which is the decision point and stays whole.
  const es = events.map((e, i) => (i === events.length - 1 ? e : elideBody(e)));
  // With a single event there is no head: the event is the tail.
  const head = es.length > 1 ? es.slice(0, 1) : [];
  const tailStart = es.length > 1 ? Math.max(1, es.length - TAIL_EVENTS) : 0;
  const middle = es.slice(head.length, tailStart);
  const tail = es.slice(tailStart);
  const verbatim = `${tail.length === 1 ? `Event ${num(tail[0])}` : `Events ${num(tail[0])}–${num(tail[tail.length - 1])}`}${head.length ? ` and event ${num(head[0])}` : ''}`;
  const note = (what: string) => `_Compacted: the history is longer than the ${cap.toLocaleString('en-GB')}-character limit. ${what} ${verbatim} ${tail.length + head.length === 1 ? 'is' : 'are'} verbatim._`;

  const assemble = (mid: string[], what: string) =>
    [preamble, note(what), ...head.map(renderEvent), ...(mid.length ? [`### Events ${num(middle[0])}–${num(middle[middle.length - 1])} (compacted)\n\n${mid.join('\n')}`] : []), ...tail.map(renderEvent)].join('\n\n');

  // Stage 1: collapse routine runs, keep other middle events verbatim.
  const bs = blocks(middle);
  const stage1 = bs.map((b) => (b.kind === 'run' ? summariseRun(b.run) : renderEvent(b.e)));
  let out = assemble(stage1, 'Runs of repeated holds and reminders in the middle are collapsed into one line each.');
  if (out.length <= cap) return out;

  // Stage 2: every middle event becomes one line.
  const stage2 = bs.map((b) => (b.kind === 'run' ? summariseRun(b.run) : oneLine(b.e)));
  out = assemble(stage2, 'Middle events are reduced to one line each; runs of repeated holds and reminders to one line per run.');
  if (out.length <= cap) return out;

  // Stage 3: drop middle lines oldest-first behind an "omitted" marker.
  for (let keep = stage2.length - 1; keep >= 0; keep--) {
    const dropped = stage2.length - keep;
    const lines = [`- …${dropped} earlier middle line${dropped === 1 ? '' : 's'} omitted (events ${num(middle[0])} onwards)…`, ...stage2.slice(dropped)];
    out = assemble(lines, 'Middle events are reduced to one line each and the oldest of them are omitted.');
    if (out.length <= cap) return out;
  }
  // Stage 4: the tail alone is over the cap. Shrink it from the front; the last event stays verbatim.
  for (let n = tail.length - 1; n >= 1; n--) {
    const kept = tail.slice(tail.length - n);
    out = [preamble, `_Compacted: only the last ${n} event${n === 1 ? '' : 's'} fit within the ${cap.toLocaleString('en-GB')}-character limit; events ${num(es[0])}–${num(tail[tail.length - n - 1])} are omitted._`, ...kept.map(renderEvent)].join('\n\n');
    if (out.length <= cap) return out;
  }
  return out;
}

const AT_FORMAT = /^(auto|none|\d+%?)$/;

export function loadPublicCase(dir: string, at: string = defaultAt(dir)) {
  if (!AT_FORMAT.test(at)) {
    console.warn(`[cases] --at "${at}" is not auto | none | N | N%; using "${defaultAt(dir)}" for ${dir}`);
    at = defaultAt(dir);
  }
  const index = readFileSync(join(dir, 'index.md'), 'utf8');
  const { preamble, events } = parseHistory(readFileSync(join(dir, 'history.md'), 'utf8'));
  const asIs = at === 'none';
  const { cutoff, marked } = resolveCutoff(index, events, at);
  const visible = events.slice(0, cutoff);
  const hidden = events.slice(cutoff);

  const { title, parts } = sections(index);
  const spoilers = asIs ? SUMMARY_SECTIONS : SPOILER_SECTIONS;
  const kept = parts.filter((p) => !spoilers.includes(p.name)).map((p) => p.text);
  // At a marked escalation point the case says when it was escalated; that is "now" for the agent.
  const escalated = index.match(/^- \*\*Escalated:\*\* (.+)$/m)?.[1]?.trim();
  const today = (marked && escalated) || (visible.at(-1)?.header.split(' — ')[0] ?? 'unknown');
  // Use the case's own questions when it has them; ours are only a fallback.
  const ownQuestions = parts.some((p) => !spoilers.includes(p.name) && /question|decision point|to decide/i.test(p.name));
  // The completion date and final status give the ending away too.
  const details = kept.map((t) => t.replace(/^- \*\*(Status|Updated|Completed):\*\*.*\n?/gm, ''));

  // Attachments: those linked from visible events, plus any the history never links (they came with the request).
  const attDir = join(dir, 'attachments');
  const allAtt = existsSync(attDir) ? readdirSync(attDir).sort() : [];
  const linkedLater = new Set(allAtt.filter((f) => hidden.some((e) => e.body.includes(f)) && !visible.some((e) => e.body.includes(f))));
  const attachments: CaseInput[] = [];
  const media: CaseMedia[] = [];
  for (const f of allAtt.filter((f) => !linkedLater.has(f))) {
    const name = `attachments/${f}`;
    const a = readAttachment(join(attDir, f), name);
    attachments.push({ name, content: clip(a.content) });
    if (a.media) media.push({ name, media: a.media });
  }

  const decisionPoint = asIs ? `the end of the recorded history (${cutoff} event${cutoff === 1 ? '' : 's'})` : `after event ${String(cutoff).padStart(3, '0')} of the history`;
  const brief = `${title}

- **Today:** ${today} (${marked && escalated ? 'when the case was escalated to you' : 'time of the latest event you can see'})
- **Decision point:** ${decisionPoint}

${details.join('\n\n')}

## Task

You are the agency's operations agent at this point in the case. Read the history and attachments, work out where the case stands and what is still outstanding, then take the next action(s) the agency should take now with the tools available. Escalate only what genuinely needs a human decision.

${
  ownQuestions
    ? 'Answer every question and decision point listed in the case above, in submit_decision `answers`, using its own wording.'
    : `## Questions / decision points

1. Where does this case stand right now, and what is outstanding?
2. What is the next action, who is it for, and through which channel?
3. Does anything need a human decision, and why?`
}

State the next action(s) with recipient and channel, what they do not establish, and what remains open. Facts that arrive after the decision point are unknown to you.`;

  const reference = asIs
    ? ''
    : `## Recorded next events (what the agency actually did)
${hidden.slice(0, 3).map(renderEvent).join('\n\n') || '_None: the decision point is the end of the recorded history._'}

## Case summary sections (hidden from the agent)
${parts.filter((p) => ['Overview', 'Next action at escalation', 'Outcome', 'Boundaries and remaining work'].includes(p.name)).map((p) => p.text).join('\n\n')}`;

  const historyPreamble = asIs ? preamble : preamble.replace(/Total events: \d+\.?/, `Events shown: ${cutoff}.`);
  return {
    id: basename(dir),
    brief,
    inputs: [{ name: 'history.md', content: compactHistory(historyPreamble, visible) }, ...attachments],
    media,
    reference,
    cutoff,
    totalEvents: events.length,
  };
}
