#!/usr/bin/env tsx
// Reality Test format fallback (master plan M5, gate "Format fallback at 16:30").
//
// Converts a folder of loose files per case into the organisers' case format that
// src/agent/publicCases.ts parses:
//   <out>/<case>/index.md      "# Case <id>: <title>" + "## Case details" + "## Initial request" (+ "## Brief")
//   <out>/<case>/history.md    "# Case <id> history", "Total events: N", then per event
//                              <a id="event-NNN"></a>\n## <YYYY-MM-DD HH:MM:SS UTC> — event NNN
//                              - **Channel:** … / - **From:** … / - **To:** …  and the body
//   <out>/<case>/attachments/  every non-text file, copied verbatim
//
// Usage (from the repo root):
//   pnpm tsx .claude/skills/reality-test-run/scripts/convert-to-organiser.ts --in <dir> --out <dir> [--dry-run] [--check] [--flat]
//   pnpm tsx .claude/skills/reality-test-run/scripts/convert-to-organiser.ts --probe <dir>
//
//   --in       root with one sub-folder per case (or a single case folder, or with --flat one file per case)
//   --out      where the organiser-format cases are written (existing case folders are overwritten)
//   --dry-run  print the event list per case and write nothing
//   --check    after writing, load every output case through src/agent/cases.ts and prove every event is visible
//   --probe    load every case folder under <dir> with the real loader and report; no conversion. Works on any
//              format the loader knows (organiser, practice, generic fallback). Exit 1 if any case fails.
//
// Heuristics, deliberately simple (10-minute human cap at 16:30):
//   * .md .txt .eml .html .log .csv .json are text and become events; anything else is an attachment.
//     Files under a folder called attachments/ are always attachments.
//   * A text file is split into several events when it holds several "From:" header blocks (an email
//     thread dump), several "## " headings, or "---" separator lines. Otherwise it is one event.
//   * A .json file that is an array of message-like objects (date/from/to/body…) becomes one event per
//     object; any other JSON becomes one Note event holding the pretty-printed JSON.
//   * The event date is the first "Date:" header, ISO date, or UK dd/mm/yyyy date found in the segment or
//     its file name. Undated events keep their file order and inherit the previous event's sort key, so an
//     undated context file that sorts first by name (crm.json) becomes event 001 and the dated messages follow.
//   * The brief file (case.md, CASE.md, README.md, task.md, brief.md) is not an event: it becomes the
//     "## Brief" section of index.md so the agent sees the task text.
// Nothing here guesses content it cannot see: no dates, parties or attachments are invented.

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

export type Event = { date?: string; sortKey: number; channel: string; from: string; to: string; body: string; source: string };
export type ConvertedCase = { id: string; title: string; events: Event[]; attachments: { src: string; name: string }[]; brief?: string; sources: string[] };

const TEXT_EXT = new Set(['.md', '.txt', '.eml', '.html', '.htm', '.log', '.csv', '.json']);
const BRIEF_NAMES = ['case.md', 'CASE.md', 'README.md', 'task.md', 'brief.md'];
const EM_DASH = ' — ';

// ---------- small helpers ----------

function walk(dir: string): string[] {
  return readdirSync(dir)
    .sort()
    .flatMap((f) => {
      const p = join(dir, f);
      return statSync(p).isDirectory() ? walk(p) : [p];
    });
}

const pad3 = (n: number) => String(n).padStart(3, '0');

export function formatUtc(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`;
}

/** First date we can find in the text (or file name). Returns undefined rather than guessing. */
export function findDate(text: string): Date | undefined {
  const header = text.match(/^(?:Date|Sent|Received|Timestamp|When):\s*(.+)$/im)?.[1];
  if (header) {
    const d = new Date(header.trim());
    if (!Number.isNaN(d.getTime())) return d;
  }
  const iso = text.match(/(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}(?::\d{2})?))?(?:\s*(?:UTC|Z|\+00:00))?/);
  if (iso) {
    const d = new Date(`${iso[1]}T${iso[2] ?? '00:00:00'}${iso[2] && iso[2].length === 5 ? ':00' : ''}Z`);
    if (!Number.isNaN(d.getTime())) return d;
  }
  const uk = text.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b(?:[ ,T]+(\d{2}:\d{2}))?/);
  if (uk) {
    const d = new Date(`${uk[3]}-${uk[2].padStart(2, '0')}-${uk[1].padStart(2, '0')}T${uk[4] ?? '00:00'}:00Z`);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return undefined;
}

function headerField(text: string, names: string[]): string | undefined {
  for (const n of names) {
    const m = text.match(new RegExp(`^${n}:\\s*(.+)$`, 'im'));
    if (m) return m[1].trim();
  }
  return undefined;
}

export function guessChannel(fileName: string, text: string): string {
  const f = fileName.toLowerCase();
  if (/\.eml$/.test(f) || /\bemail\b/.test(f)) return 'Email';
  if (/sms|whatsapp|text-message|imessage/.test(f)) return 'SMS';
  if (/call|phone|voicemail|transcript/.test(f)) return 'Call';
  if (/note|memo/.test(f)) return 'Note';
  if (/^(from|to|subject):/im.test(text)) return 'Email';
  return 'Note';
}

const stripHtml = (s: string) =>
  s
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|li|h\d)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

/** Split one text file into message-sized segments. */
export function segment(text: string): string[] {
  const fromBlocks = text.split(/\n(?=From:\s)/);
  if (fromBlocks.length > 1 && /^From:\s/m.test(text)) return fromBlocks.map((s) => s.trim()).filter(Boolean);
  if ((text.match(/^## /gm) ?? []).length >= 2) {
    const parts = text.split(/\n(?=## )/).map((s) => s.trim()).filter(Boolean);
    // A leading "# Title" line on its own is not an event.
    return parts.filter((p, i) => !(i === 0 && /^#\s+[^\n]*$/.test(p)));
  }
  const rules = text.split(/\n-{3,}\s*\n/);
  if (rules.length > 1) return rules.map((s) => s.trim()).filter(Boolean);
  return [text.trim()].filter(Boolean);
}

/** Email-ish segment: keep Subject, drop the other header lines, return the body. */
function emailBody(seg: string): string {
  if (!/^(From|To|Subject|Date|Cc):/im.test(seg)) return seg;
  const [head, ...rest] = seg.split(/\n\s*\n/);
  const subject = head.match(/^Subject:\s*(.+)$/im)?.[1];
  const body = rest.join('\n\n').trim();
  const bodyOrHead = body || head.split('\n').filter((l) => !/^(From|To|Subject|Date|Cc|Sent|Received):/i.test(l)).join('\n').trim();
  return subject ? `Subject: ${subject}\n\n${bodyOrHead}`.trim() : bodyOrHead;
}

type MsgLike = Record<string, unknown>;
const pick = (o: MsgLike, keys: string[]) => keys.map((k) => o[k]).find((v) => typeof v === 'string' && v.trim()) as string | undefined;

function jsonEvents(json: unknown, source: string): Event[] | undefined {
  const list = Array.isArray(json) ? json : Array.isArray((json as MsgLike)?.messages) ? ((json as MsgLike).messages as unknown[]) : Array.isArray((json as MsgLike)?.events) ? ((json as MsgLike).events as unknown[]) : undefined;
  if (!list || !list.length || !list.every((m) => m && typeof m === 'object')) return undefined;
  const msgs = list as MsgLike[];
  const bodyKeys = ['body', 'text', 'content', 'message', 'description', 'note'];
  if (!msgs.some((m) => pick(m, bodyKeys))) return undefined;
  return msgs.map((m, i) => {
    const dateStr = pick(m, ['date', 'timestamp', 'time', 'sent_at', 'created_at', 'at']);
    const d = dateStr ? findDate(dateStr) ?? (Number.isNaN(new Date(dateStr).getTime()) ? undefined : new Date(dateStr)) : undefined;
    const body = pick(m, bodyKeys) ?? JSON.stringify(m, null, 2);
    const subject = pick(m, ['subject']);
    return {
      date: d && formatUtc(d),
      sortKey: d?.getTime() ?? Number.NaN,
      channel: pick(m, ['channel', 'type', 'kind']) ?? guessChannel(source, body),
      from: pick(m, ['from', 'sender', 'author']) ?? 'Not specified',
      to: pick(m, ['to', 'recipient']) ?? 'Not specified',
      body: subject ? `Subject: ${subject}\n\n${body}` : body,
      source: `${source}#${i + 1}`,
    };
  });
}

function fileEvents(path: string, name: string): Event[] {
  const ext = extname(path).toLowerCase();
  const raw = readFileSync(path, 'utf8');
  if (ext === '.json') {
    try {
      const json = JSON.parse(raw);
      const evs = jsonEvents(json, name);
      if (evs) return evs;
      const d = findDate(raw);
      return [{ date: d && formatUtc(d), sortKey: d?.getTime() ?? Number.NaN, channel: 'Note', from: 'Not specified', to: 'Not specified', body: `Data file ${name}:\n\n\`\`\`json\n${JSON.stringify(json, null, 2)}\n\`\`\``, source: name }];
    } catch {
      /* fall through: treat as text */
    }
  }
  const text = ext === '.html' || ext === '.htm' ? stripHtml(raw) : raw;
  return segment(text).map((seg, i, all) => {
    const d = findDate(seg) ?? (all.length === 1 ? findDate(name) : undefined);
    return {
      date: d && formatUtc(d),
      sortKey: d?.getTime() ?? Number.NaN,
      channel: guessChannel(name, seg),
      from: headerField(seg, ['From', 'Sender']) ?? 'Not specified',
      to: headerField(seg, ['To', 'Recipient']) ?? 'Not specified',
      body: emailBody(seg),
      source: all.length === 1 ? name : `${name}#${i + 1}`,
    };
  });
}

/** Undated events inherit the previous dated key (file order), then a stable sort by key. */
function order(events: Event[]): Event[] {
  let last = Number.NEGATIVE_INFINITY;
  const keyed = events.map((e, i) => {
    if (Number.isNaN(e.sortKey)) e.sortKey = last;
    else last = e.sortKey;
    return { e, i };
  });
  return keyed.sort((a, b) => a.e.sortKey - b.e.sortKey || a.i - b.i).map((k) => k.e);
}

// ---------- conversion ----------

export function convertCase(dir: string, id = basename(dir)): ConvertedCase {
  const files = walk(dir);
  const briefPath = BRIEF_NAMES.map((f) => join(dir, f)).find(existsSync);
  const events: Event[] = [];
  const attachments: { src: string; name: string }[] = [];
  const sources: string[] = [];
  for (const p of files) {
    if (p === briefPath) continue;
    const rel = relative(dir, p);
    sources.push(rel);
    const ext = extname(p).toLowerCase();
    const inAttachments = rel.split('/').slice(0, -1).some((d) => d.toLowerCase() === 'attachments');
    if (inAttachments || !TEXT_EXT.has(ext)) {
      const flat = rel.replace(/^attachments\//i, '').replace(/[\/\\]/g, '__');
      attachments.push({ src: p, name: attachments.some((a) => a.name === flat) ? `${attachments.length + 1}-${flat}` : flat });
    } else {
      events.push(...fileEvents(p, rel));
    }
  }
  const brief = briefPath ? readFileSync(briefPath, 'utf8').trim() : undefined;
  const titleFromBrief = brief?.match(/^#\s+(.+)$/m)?.[1]?.replace(/^Case\s+\S+:\s*/i, '');
  const firstSubject = events.map((e) => e.body.match(/^Subject:\s*(.+)$/m)?.[1]).find(Boolean);
  const title = titleFromBrief ?? firstSubject ?? `Converted case ${id}`;
  return { id, title, events: order(events), attachments, brief, sources };
}

/** Single-file case (--flat): the file is the whole case. */
export function convertFile(path: string): ConvertedCase {
  const id = basename(path).replace(/\.[^.]+$/, '');
  const name = basename(path);
  const ext = extname(path).toLowerCase();
  if (!TEXT_EXT.has(ext)) return { id, title: `Converted case ${id}`, events: [], attachments: [{ src: path, name }], sources: [name] };
  const events = order(fileEvents(path, name));
  const firstSubject = events.map((e) => e.body.match(/^Subject:\s*(.+)$/m)?.[1]).find(Boolean);
  return { id, title: firstSubject ?? `Converted case ${id}`, events, attachments: [], sources: [name] };
}

export function renderHistory(c: ConvertedCase): string {
  const blocks = c.events.map((e, i) => {
    const n = pad3(i + 1);
    return `<a id="event-${n}"></a>\n## ${e.date ?? 'date unknown'}${EM_DASH}event ${n}\n\n- **Channel:** ${e.channel}\n- **From:** ${e.from}\n- **To:** ${e.to}\n- **Source file:** ${e.source}\n\n${e.body.trim()}\n`;
  });
  return `# Case ${c.id} history\n\nTotal events: ${c.events.length}\n\n${blocks.join('\n')}`;
}

export function renderIndex(c: ConvertedCase): string {
  // The first message, not a data-file snapshot, is the initial request.
  const first = c.events.find((e) => !e.body.startsWith('Data file ')) ?? c.events[0];
  const dates = c.events.map((e) => e.date).filter(Boolean);
  const details = [
    `- **Source role:** Agency (converted from ${c.sources.length} file${c.sources.length === 1 ? '' : 's'} by convert-to-organiser.ts)`,
    `- **Created:** ${dates[0] ?? 'date unknown'}`,
    `- **Source files:** ${c.sources.map((s) => `\`${s}\``).join(', ') || 'none'}`,
  ];
  const briefSection = c.brief ? `\n## Brief\n\n${c.brief.replace(/^#\s+.+\n?/, '').trim()}\n` : '';
  const initial = first ? first.body.trim() : '_No text events were found in the source files; see the attachments._';
  const att = c.attachments.length ? `\n## Attachments\n\n${c.attachments.map((a) => `- [${a.name}](attachments/${a.name})`).join('\n')}\n` : '';
  return `# Case ${c.id}: ${c.title}\n\n## Case details\n\n${details.join('\n')}\n${briefSection}\n## Initial request\n\n${initial}\n\n## History\n\n[Read the complete event history](history.md).\n${att}`;
}

export function writeCase(c: ConvertedCase, outRoot: string): string {
  const dir = join(outRoot, c.id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(join(dir, 'attachments'), { recursive: true });
  writeFileSync(join(dir, 'index.md'), renderIndex(c));
  writeFileSync(join(dir, 'history.md'), renderHistory(c));
  for (const a of c.attachments) copyFileSync(a.src, join(dir, 'attachments', a.name));
  if (!c.attachments.length) rmSync(join(dir, 'attachments'), { recursive: true, force: true });
  return dir;
}

/** Which case folders live under `root`: its sub-folders, or `root` itself when it has files but no sub-folders. */
export function caseDirs(root: string): string[] {
  const subs = readdirSync(root)
    .map((f) => join(root, f))
    .filter((p) => statSync(p).isDirectory() && !basename(p).startsWith('.'))
    .sort();
  return subs.length ? subs : [root];
}

// ---------- probe: prove the real loader sees everything ----------

export type ProbeRow = { id: string; format: string; events: number; visibleAuto: number; inputs: number; media: number; brief: boolean; recordedAction: boolean; ok: boolean; problem?: string };

export async function probe(root: string): Promise<ProbeRow[]> {
  const { loadCase } = await import('../../../../src/agent/cases.js');
  const rows: ProbeRow[] = [];
  for (const dir of caseDirs(root)) {
    const id = basename(dir);
    try {
      const organiser = existsSync(join(dir, 'index.md')) && existsSync(join(dir, 'history.md'));
      const full = loadCase(dir, organiser ? '100%' : undefined);
      const auto = organiser ? loadCase(dir, 'auto') : full;
      const text = [full.brief, ...full.inputs.map((i) => i.content)].join('\n');
      const total = full.totalEvents ?? 0;
      let problem: string | undefined;
      if (organiser) {
        const missing = Array.from({ length: total }, (_, i) => `event ${pad3(i + 1)}`).filter((h) => !text.includes(h));
        if (total === 0) problem = 'history.md has no <a id="event-NNN"></a> markers';
        else if (missing.length) problem = `events not visible at --at 100%: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '…' : ''}`;
      } else if (!full.inputs.length) problem = 'no input files';
      const brief = organiser || !full.brief.startsWith('(no case brief');
      rows.push({
        id,
        format: organiser ? 'organiser' : existsSync(join(dir, 'case.md')) ? 'practice' : 'generic-fallback',
        events: total,
        visibleAuto: auto.cutoff ?? total,
        inputs: full.inputs.length,
        media: full.media.length,
        brief,
        recordedAction: organiser && /Recorded action:\*\* \[History event \d+\]/.test(readFileSync(join(dir, 'index.md'), 'utf8')),
        ok: !problem,
        problem,
      });
    } catch (e) {
      rows.push({ id, format: '?', events: 0, visibleAuto: 0, inputs: 0, media: 0, brief: false, recordedAction: false, ok: false, problem: e instanceof Error ? e.message : String(e) });
    }
  }
  return rows;
}

function reportProbe(root: string, rows: ProbeRow[]): boolean {
  console.table(rows.map(({ problem, ...r }) => r));
  for (const r of rows.filter((r) => r.problem)) console.log(`  ✗ ${r.id}: ${r.problem}`);
  const ok = rows.filter((r) => r.ok).length;
  const organiser = rows.filter((r) => r.format === 'organiser');
  const noBrief = rows.filter((r) => !r.brief).length;
  const withMarker = organiser.filter((r) => r.recordedAction).length;
  const hiddenByAuto = organiser.filter((r) => !r.recordedAction && r.visibleAuto < r.events).length;
  console.log(`\nPROBE ${ok === rows.length && rows.length > 0 ? 'OK' : 'FAIL'}: ${ok}/${rows.length} cases load from ${root}`);
  if (noBrief) console.log(`  ${noBrief} case(s) have no brief file (agent gets files only): convert them so index.md carries a task section.`);
  if (organiser.length) {
    if (withMarker === organiser.length) console.log(`  --at auto  (every index.md has a "Recorded action" marker; the loader cuts just before it and hides the ending)`);
    else if (withMarker === 0) console.log(`  --at 100%  (no "Recorded action" marker; "auto" would hide the second half of the history in ${hiddenByAuto} case(s))`);
    else console.log(`  MIXED: ${withMarker} case(s) carry a "Recorded action" marker and ${organiser.length - withMarker} do not. Run the two groups separately with --only: auto for the marked ones, 100% for the rest.`);
  }
  return ok === rows.length && rows.length > 0;
}

// ---------- CLI ----------

async function main() {
  const { values } = parseArgs({
    options: {
      in: { type: 'string' },
      out: { type: 'string' },
      probe: { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      check: { type: 'boolean', default: false },
      flat: { type: 'boolean', default: false },
    },
  });

  if (values.probe) {
    process.exit(reportProbe(values.probe, await probe(values.probe)) ? 0 : 1);
  }
  if (!values.in || (!values.out && !values['dry-run'])) {
    console.error('usage: convert-to-organiser.ts --in <dir> --out <dir> [--dry-run] [--check] [--flat]\n       convert-to-organiser.ts --probe <dir>');
    process.exit(2);
  }
  const inRoot = resolve(values.in);
  const cases = values.flat
    ? readdirSync(inRoot)
        .sort()
        .map((f) => join(inRoot, f))
        .filter((p) => statSync(p).isFile() && !basename(p).startsWith('.'))
        .map(convertFile)
    : caseDirs(inRoot).map((d) => convertCase(d));

  for (const c of cases) {
    const undated = c.events.filter((e) => !e.date).length;
    console.log(`${c.id}: "${c.title}" · ${c.events.length} events (${undated} undated) · ${c.attachments.length} attachments · brief ${c.brief ? 'yes' : 'no'}`);
    if (values['dry-run']) for (const [i, e] of c.events.entries()) console.log(`  ${pad3(i + 1)} ${e.date ?? 'date unknown'} · ${e.channel} · ${e.from} → ${e.to} · ${e.source}`);
  }
  if (values['dry-run']) return;
  mkdirSync(values.out!, { recursive: true });
  for (const c of cases) writeCase(c, values.out!);
  console.log(`\nWrote ${cases.length} case(s) to ${values.out}`);
  if (values.check) process.exit(reportProbe(values.out!, await probe(values.out!)) ? 0 : 1);
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
