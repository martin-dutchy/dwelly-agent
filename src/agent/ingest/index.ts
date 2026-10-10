// Ingest: any case folder in, one CaseBundle out. Practice folders (case.md), organiser folders
// (index.md + history.md) and anything else (generic) all produce the same shape.
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, extname, join, relative } from 'node:path';
import { normaliseFailurePlan } from '../../core/failures.js';
import { type ParseMethod, isBinaryAttachment, readAttachment } from '../attachments.js';
import { BRIEF_FILES, type CaseMedia, HIDDEN, type LoadedCase, type ParseInfo, extractTickets, harnessFiles, loadCase, walk } from '../cases.js';
import { parseQuestions } from '../decisionPoints.js';
import type { CaseBundle, CaseDocument, DocKind, ManifestEntry, TimelineEvent } from '../harness/contracts.js';
import { clip, isPublicCase, parseHistory, parseInfo } from '../publicCases.js';
import { dayOf, toIso, todayOf } from './dates.js';
import { type Email, htmlToText, parseEml } from './eml.js';
import { PartyBook, addCrmParties, addEventParties, addLabelledParties, isPrimaryCrm } from './parties.js';
import { asText, placeholder, unreadable } from './sniff.js';
import { type Ctx, type RawEvent, channelOf, emailEvents, jsonEvents, textEvents, textShape } from './timeline.js';

const KIND_BY_EXT: Record<string, DocKind> = {
  '.eml': 'email',
  '.txt': 'text',
  '.json': 'json',
  '.md': 'markdown',
  '.pdf': 'pdf',
  '.png': 'image',
  '.jpg': 'image',
  '.jpeg': 'image',
  '.gif': 'image',
  '.webp': 'image',
};
export const kindOf = (path: string): DocKind => KIND_BY_EXT[extname(path).toLowerCase()] ?? 'unknown';

export type IngestOptions = { at?: string };

/** Grading files that may sit next to a case and are never shown. */
const GRADING = /^(expected|rubric|checks|answer|answers|reference|solution|grades?)\.(json|md|txt)$/i;
const isHiddenPath = (rel: string) => rel.split('/').some((s) => s.startsWith('.'));
const MAX_EMAIL_DEPTH = 2;
// Manifest `included` means "shown as an input document"; the brief reaches the agent as the case text instead.
const BRIEF_NOTE = 'shown to the agent as the case brief, not as an input file';

/** A file read for the agent, plus what ingest needs from it (unclipped text, parsed email). */
type Read = { doc: CaseDocument; entry: ManifestEntry; full: string; email?: Email; media?: CaseMedia };

const ATTACHMENT_EXT: Record<string, string> = { 'application/pdf': '.pdf', 'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif', 'image/webp': '.webp', 'text/plain': '.txt', 'text/html': '.html', 'text/csv': '.csv', 'application/json': '.json', 'message/rfc822': '.eml' };

function doc(path: string, kind: DocKind, full: string, method: ParseMethod | 'derived', bytes: number, note?: string): Read {
  const text = clip(full);
  const parse: ParseInfo = parseInfo(method, bytes, full, note);
  return { doc: { id: `doc:${path}`, path, kind, text, parse }, entry: { path, kind, parse: method, included: true, ...(note ? { note } : {}) }, full };
}

function flagged(path: string, bytes: number, why: string): Read {
  const text = placeholder(path, bytes, why);
  return {
    doc: { id: `doc:${path}`, path, kind: 'unknown', text, parse: parseInfo('unparsed', bytes, text, why), flagged: why },
    entry: { path, kind: 'unknown', parse: 'unparsed', included: false, note: why },
    full: '',
  };
}

function renderEmail(e: Email, path: string): string {
  const head = (['From', 'To', 'Cc', 'Date', 'Subject'] as const)
    .map((k) => [k, e[k.toLowerCase() as 'from']] as const)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`);
  const atts = e.attachments.map((a) => `- ${a.filename} (${a.contentType}, ${a.data.length.toLocaleString('en-GB')} bytes): shown as "${path}#${a.filename}"`);
  return [...head, ...(atts.length ? ['Attachments:', ...atts] : []), '', e.text].join('\n');
}

/** One file (or email attachment) to documents: the file itself, then anything attached to it. */
function readOne(path: string, buf: Buffer, onDisk: string | undefined, depth = 0): Read[] {
  const ext = extname(path).toLowerCase();
  const bytes = buf.length;
  try {
    if (isBinaryAttachment(path)) {
      let file = onDisk;
      let tmp: string | undefined;
      if (!file) {
        tmp = mkdtempSync(join(tmpdir(), 'ingest-'));
        file = join(tmp, `attachment${ext}`);
        writeFileSync(file, buf);
      }
      try {
        const a = readAttachment(file, path);
        const r = doc(path, kindOf(path), a.content, a.method, a.bytes);
        return [{ ...r, ...(a.media ? { media: { name: path, media: a.media } } : {}) }];
      } finally {
        if (tmp) rmSync(tmp, { recursive: true, force: true });
      }
    }
    const why = unreadable(path, buf);
    if (why) return [flagged(path, bytes, why)];
    const text = asText(buf)!;
    if (ext === '.eml' && depth <= MAX_EMAIL_DEPTH) {
      const email = parseEml(buf);
      if (!email.encoded) return [{ ...doc(path, 'email', text, 'text', bytes), email }];
      const atts = email.attachments.flatMap((a) => {
        const name = `${path}#${a.filename}`;
        const aext = extname(a.filename) ? '' : (ATTACHMENT_EXT[a.contentType] ?? '');
        return readOne(`${name}${aext}`, a.data, undefined, depth + 1).map((r) => ({ ...r, entry: { ...r.entry, note: [r.entry.note, `attachment of ${path}`].filter(Boolean).join('; ') } }));
      });
      const note = `MIME decoded${email.attachments.length ? `, ${email.attachments.length} attachment${email.attachments.length === 1 ? '' : 's'}` : ''}`;
      return [{ ...doc(path, 'email', renderEmail(email, path), 'mime', bytes, note), email }, ...atts];
    }
    if (ext === '.html' || ext === '.htm') return [doc(path, 'text', onDisk ? text : htmlToText(text), 'text', bytes)];
    const shape = ext === '.json' ? undefined : textShape(text);
    const kind: DocKind = shape === 'chat' ? 'chat' : shape === 'transcript' ? 'transcript' : kindOf(path) === 'unknown' ? 'text' : kindOf(path);
    return [doc(path, kind, text, 'text', bytes)];
  } catch (e) {
    return [flagged(path, bytes, `could not be read (${e instanceof Error ? e.message : String(e)})`)];
  }
}

function eventsOf(r: Read, ctx: Ctx): RawEvent[] {
  try {
    if (r.email) return emailEvents(r.email);
    if (r.doc.kind === 'unknown' || r.doc.kind === 'pdf' || r.doc.kind === 'image') return [];
    if (r.doc.kind === 'json') return jsonEvents(r.doc.path, JSON.parse(r.full), ctx);
    return textEvents(r.doc.path, r.full, ctx);
  } catch {
    return [];
  }
}

/** Chronological where timestamps exist; an undated event stays after the event before it in its file. */
function ordered(events: TimelineEvent[]): TimelineEvent[] {
  let last = '';
  let lastDoc = '';
  const keyed = events.map((e, i) => {
    if (e.doc !== lastDoc) last = '';
    lastDoc = e.doc;
    last = e.at ?? last;
    return { e, k: last, i };
  });
  return keyed.sort((a, b) => (a.k && b.k && a.k !== b.k ? (a.k < b.k ? -1 : 1) : a.i - b.i)).map((x) => x.e);
}

function timeline(reads: Read[], ctx: Ctx): TimelineEvent[] {
  return ordered(reads.flatMap((r) => eventsOf(r, ctx).map((e, n) => ({ id: `ev:${r.doc.path}#${n + 1}`, ...e, doc: r.doc.id }))));
}

function parties(reads: Read[], events: TimelineEvent[]) {
  const book = new PartyBook();
  for (const r of reads.filter((r) => r.doc.kind === 'json')) {
    try {
      addCrmParties(book, JSON.parse(r.full), r.doc.id, isPrimaryCrm(r.doc.path));
    } catch {
      // Not JSON we understand; the model still reads the file.
    }
  }
  for (const r of reads.filter((r) => r.doc.kind === 'text' || r.doc.kind === 'markdown')) addLabelledParties(book, r.full, r.doc.id);
  addEventParties(book, events);
  return book.parties;
}

const latest = (events: TimelineEvent[]) => events.map((e) => e.at).filter((a): a is string => !!a).sort().at(-1);

export function ingest(dir: string, opts: IngestOptions = {}): CaseBundle {
  return isPublicCase(dir) ? organiser(dir, opts.at) : folder(dir);
}

// ---- practice and generic folders --------------------------------------------------------------------

function folder(dir: string): CaseBundle {
  const all = walk(dir)
    .map((p) => relative(dir, p))
    .sort();
  const briefFile = BRIEF_FILES.find((f) => existsSync(join(dir, f)));
  const manifest: ManifestEntry[] = [];
  const reads: Read[] = [];
  for (const rel of all) {
    if (HIDDEN.has(basename(rel)) || rel === briefFile) continue;
    if (isHiddenPath(rel)) {
      manifest.push({ path: rel, kind: kindOf(rel), parse: 'skipped', included: false, note: 'hidden file' });
      continue;
    }
    const p = join(dir, rel);
    reads.push(...readOne(rel, readFileSync(p), p));
  }
  const withheld = harnessFiles(dir);
  let failures = {};
  const failuresPath = join(dir, 'tool_failures.json');
  let failuresNote: string | undefined;
  if (existsSync(failuresPath)) {
    try {
      failures = normaliseFailurePlan(JSON.parse(readFileSync(failuresPath, 'utf8')));
    } catch (e) {
      failuresNote = `malformed, ignored: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
  const seedTickets = reads
    .filter((r) => /ticket/i.test(r.doc.path) && r.doc.path.endsWith('.json'))
    .flatMap((r) => {
      try {
        return extractTickets(JSON.parse(r.doc.text));
      } catch {
        return [];
      }
    });

  const given = briefFile ? readFileSync(join(dir, briefFile), 'utf8') : undefined;
  const briefNow = given ? todayOf(given) : undefined;
  const events = timeline(reads, { day: dayOf(briefNow), now: briefNow });
  const now = briefNow ?? latest(events);
  const brief = given ?? genericBrief(basename(dir), reads, manifest, now);
  return {
    id: basename(dir),
    dir,
    format: given ? 'practice' : 'generic',
    ...(now ? { now } : {}),
    brief,
    documents: reads.map((r) => r.doc),
    events,
    parties: parties(reads, events),
    questions: parseQuestions(brief),
    seedTickets,
    failures,
    media: reads.flatMap((r) => (r.media ? [r.media] : [])),
    manifest: [
      { path: briefFile ?? '(synthesised brief)', kind: 'markdown', parse: briefFile ? 'brief' : 'derived', included: false, note: briefFile ? BRIEF_NOTE : 'no case brief in the folder; one was built from the file list' },
      ...reads.map((r) => r.entry),
      ...manifest,
      ...withheld.map((w) => ({ path: w.name, kind: kindOf(w.name), parse: 'withheld', included: false, note: w.name === 'tool_failures.json' && failuresNote ? `${w.reason}; ${failuresNote}` : w.reason })),
    ],
    withheld,
  };
}

const FIRST_DOC = /readme|brief|summary|overview|index|notes?|request|task/i;
const EXCERPT = 1500;

function genericBrief(id: string, reads: Read[], skipped: ManifestEntry[], now?: string): string {
  const readable = reads.filter((r) => !r.doc.flagged && ['email', 'chat', 'transcript', 'markdown', 'text'].includes(r.doc.kind));
  const first = readable.find((r) => FIRST_DOC.test(basename(r.doc.path))) ?? readable[0];
  const files = [
    ...reads.map((r) => `- \`${r.doc.path}\` (${r.doc.kind}${r.doc.flagged ? `; ${r.doc.flagged}` : ''})`),
    ...skipped.map((m) => `- \`${m.path}\` (not shown: ${m.note})`),
  ];
  const excerpt = first ? (first.full.length > EXCERPT ? `${first.full.slice(0, EXCERPT)}\n…[continues in the file]` : first.full) : '';
  return `# Case ${id}

This case arrived as a folder of files without a case brief.

${now ? `- **Today:** ${now} (time of the latest dated message in the files; the real current time is not stated)\n` : ''}
## Files

${files.join('\n') || '(none)'}
${first ? `\n## Opening of \`${first.doc.path}\`\n\n${excerpt}\n` : ''}
## Task

You are the agency's operations agent. Read every file, work out where the case stands and what is still outstanding, then take the next action(s) the agency should take now with the tools available. Escalate only what genuinely needs a human decision.

## Questions / decision points

1. Where does this case stand right now, and what is outstanding?
2. What is the next action, who is it for, and through which channel?
3. Does anything need a human decision, and why?
`;
}

// ---- organiser folders (index.md + history.md) -------------------------------------------------------

const field = (body: string, name: string) => body.match(new RegExp(`^- \\*\\*${name}:\\*\\* (.*)$`, 'm'))?.[1]?.trim();
const UNSET = /^(not specified|unspecified|n\/a|none)$/i;

function organiser(dir: string, at?: string): CaseBundle {
  const lc = loadCase(dir, at);
  const base = fromLoadedCase(lc);
  const manifest: ManifestEntry[] = [];
  const reads: Read[] = [];
  for (const d of base.documents) {
    const p = join(dir, d.path);
    const raw = d.path.startsWith('attachments/') && existsSync(p) ? readFileSync(p) : undefined;
    // Only attachments that loadCase read as plain text can need decoding or flagging.
    if (raw && d.parse?.method === 'text' && (extname(p).toLowerCase() === '.eml' || unreadable(p, raw))) reads.push(...readOne(d.path, raw, p));
    else reads.push({ doc: d, entry: base.manifest.find((m) => m.path === d.path && m.included)!, full: d.text });
  }
  // Files next to index.md that the organiser loader does not read.
  const known = new Set(['index.md', 'history.md']);
  const withheld = [...base.withheld];
  for (const rel of walk(dir).map((p) => relative(dir, p)).sort()) {
    if (known.has(rel) || rel.startsWith('attachments/') || HIDDEN.has(basename(rel))) continue;
    if (isHiddenPath(rel)) manifest.push({ path: rel, kind: kindOf(rel), parse: 'skipped', included: false, note: 'hidden file' });
    else if (GRADING.test(basename(rel))) {
      withheld.push({ name: rel, reason: 'grading or test-harness file, never shown to the agent' });
      manifest.push({ path: rel, kind: kindOf(rel), parse: 'withheld', included: false, note: 'grading or test-harness file, never shown to the agent' });
    } else reads.push(...readOne(rel, readFileSync(join(dir, rel)), join(dir, rel)));
  }

  const { events: all } = parseHistory(readFileSync(join(dir, 'history.md'), 'utf8'));
  const visible = all.slice(0, lc.cutoff ?? all.length);
  const seen = new Set<number>();
  const history: TimelineEvent[] = visible.map((e, i) => {
    const n = e.n > 0 && !seen.has(e.n) ? e.n : i + 1;
    seen.add(n);
    const from = field(e.body, 'From');
    const to = field(e.body, 'To');
    return {
      id: `ev:${n}`,
      at: toIso(e.header.split(' — ')[0]),
      channel: channelOf(field(e.body, 'Channel'), 'other'),
      ...(from && !UNSET.test(from) ? { from } : {}),
      ...(to && !UNSET.test(to) ? { to } : {}),
      text: e.body
        .split('\n')
        .filter((l) => !/^- \*\*(Channel|From|To):\*\*/.test(l))
        .join('\n')
        .trim(),
      doc: 'doc:history.md',
    };
  });
  const now = todayOf(lc.brief);
  const extra = timeline(
    reads.filter((r) => r.doc.path !== 'history.md'),
    { day: dayOf(now), now },
  );
  const events = [...history, ...extra];
  return {
    ...base,
    format: 'organiser',
    ...(now ? { now } : {}),
    documents: reads.map((r) => r.doc),
    events,
    parties: parties(reads, events),
    // Images and PDFs are never re-read above, so loadCase's media stay; email attachments add theirs.
    media: [...base.media, ...reads.flatMap((r) => (r.media ? [r.media] : []))],
    manifest: [
      { path: 'index.md', kind: 'markdown', parse: 'brief', included: false, note: `${BRIEF_NOTE} (case details, rewritten)` },
      ...reads.map((r) => r.entry),
      ...base.manifest.filter((m) => !m.included),
      ...manifest,
    ],
    withheld,
  };
}

// ---- legacy shape ------------------------------------------------------------------------------------

/** The flags-off bundle: today's loadCase output, unchanged, in the CaseBundle shape. */
export function fromLoadedCase(c: LoadedCase): CaseBundle {
  const format = isPublicCase(c.dir) ? 'organiser' : BRIEF_FILES.some((f) => existsSync(join(c.dir, f))) ? 'practice' : 'generic';
  return {
    id: c.id,
    dir: c.dir,
    format,
    brief: c.brief,
    documents: c.inputs.map((i) => ({ id: `doc:${i.name}`, path: i.name, kind: kindOf(i.name), text: i.content, parse: i.parse })),
    events: [],
    parties: [],
    questions: parseQuestions(c.brief),
    seedTickets: c.seedTickets,
    failures: c.failures,
    media: c.media,
    manifest: [
      ...c.inputs.map((i) => ({ path: i.name, kind: kindOf(i.name), parse: i.parse?.method ?? 'text', included: true, note: i.parse?.note })),
      ...(c.withheld ?? []).map((w) => ({ path: w.name, kind: kindOf(w.name), parse: 'withheld', included: false, note: w.reason })),
    ],
    withheld: c.withheld ?? [],
    reference: c.reference,
    cutoff: c.cutoff,
    totalEvents: c.totalEvents,
    missingAttachments: c.missingAttachments,
  };
}

/** The legacy shape every existing consumer (prompt, report, eval) reads. */
export function toLoadedCase(b: CaseBundle): LoadedCase {
  return {
    id: b.id,
    dir: b.dir,
    brief: b.brief,
    inputs: b.documents.map((d) => ({ name: d.path, content: d.text, parse: d.parse })),
    media: b.media,
    failures: b.failures,
    seedTickets: b.seedTickets,
    ...(b.reference !== undefined && { reference: b.reference }),
    ...(b.cutoff !== undefined && { cutoff: b.cutoff }),
    ...(b.totalEvents !== undefined && { totalEvents: b.totalEvents }),
    ...(b.missingAttachments !== undefined && { missingAttachments: b.missingAttachments }),
    withheld: b.withheld,
  };
}
