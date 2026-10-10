import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import type { CaseInput } from './cases.js';

/**
 * Loader for the organisers' case format (HackatonPublicCases/<Track>/<n>/):
 *   index.md    case details, initial request, and (in public examples) overview/outcome
 *   history.md  dated events, each anchored as <a id="event-NNN">
 *   attachments/
 * For replay we cut the history at a decision point and hide everything that reveals the
 * ending (later events, Overview, Outcome, Next action). The hidden part becomes `reference`,
 * which only the judge sees.
 */

export type HistoryEvent = { n: number; header: string; body: string };

// index.md sections that give the answer away.
const SPOILER_SECTIONS = ['Overview', 'Outcome', 'Next action at escalation', 'Boundaries and remaining work', 'History', 'Attachments'];
const MAX_FILE_CHARS = 60_000;

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

/** Events visible at the decision point: the recorded "next action" marker if the case has one, else `at`. */
function resolveCutoff(index: string, total: number, at?: string): number {
  if (at && at !== 'auto') {
    const n = at.endsWith('%') ? Math.round((total * Number(at.slice(0, -1))) / 100) : Number(at);
    return Math.max(1, Math.min(total, n));
  }
  const recorded = index.match(/Recorded action:\*\* \[History event (\d+)\]/)?.[1];
  if (recorded) return Number(recorded) - 1;
  // No marker (e.g. Property Management): stop halfway so there is a real next step to take.
  return Math.max(1, Math.floor(total / 2));
}

function readAttachment(path: string): string {
  const ext = extname(path).toLowerCase();
  if (ext === '.pdf') {
    try {
      return execFileSync('pdftotext', ['-layout', path, '-'], { encoding: 'utf8', maxBuffer: 10_000_000 });
    } catch {
      return '[PDF: text extraction failed (is poppler installed?)]';
    }
  }
  if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) return '[Image attachment: not available as text]';
  return readFileSync(path, 'utf8');
}

const clip = (s: string) => (s.length > MAX_FILE_CHARS ? `${s.slice(0, MAX_FILE_CHARS)}\n…[truncated ${s.length - MAX_FILE_CHARS} chars]` : s);

export function loadPublicCase(dir: string, at?: string) {
  const index = readFileSync(join(dir, 'index.md'), 'utf8');
  const { preamble, events } = parseHistory(readFileSync(join(dir, 'history.md'), 'utf8'));
  const cutoff = resolveCutoff(index, events.length, at);
  const visible = events.slice(0, cutoff);
  const hidden = events.slice(cutoff);
  const render = (e: HistoryEvent) => `### ${e.header}\n\n${e.body}`;

  const { title, parts } = sections(index);
  const kept = parts.filter((p) => !SPOILER_SECTIONS.includes(p.name)).map((p) => p.text);
  const today = visible.at(-1)?.header.split(' — ')[0] ?? 'unknown';
  // The completion date and final status give the ending away too.
  const details = kept.map((t) => t.replace(/^- \*\*(Status|Updated|Completed):\*\*.*\n?/gm, ''));

  // Attachments: those linked from visible events, plus any the history never links (they came with the request).
  const attDir = join(dir, 'attachments');
  const allAtt = existsSync(attDir) ? readdirSync(attDir).sort() : [];
  const linkedLater = new Set(allAtt.filter((f) => hidden.some((e) => e.body.includes(f)) && !visible.some((e) => e.body.includes(f))));
  const attachments: CaseInput[] = allAtt
    .filter((f) => !linkedLater.has(f))
    .map((f) => ({ name: `attachments/${f}`, content: clip(readAttachment(join(attDir, f))) }));

  const brief = `${title}

- **Today:** ${today} (time of the latest event you can see)
- **Decision point:** after event ${String(cutoff).padStart(3, '0')} of the history

${details.join('\n\n')}

## Task

You are the agency's operations agent at this point in the case. Read the history and attachments, work out where the case stands and what is still outstanding, then take the next action(s) the agency should take now with the tools available. Escalate only what genuinely needs a human decision.

## Questions / decision points

1. Where does this case stand right now, and what is outstanding?
2. What is the next action, who is it for, and through which channel?
3. Does anything need a human decision, and why?`;

  const reference = `## Recorded next events (what the agency actually did)
${hidden.slice(0, 3).map(render).join('\n\n') || '_None: the decision point is the end of the recorded history._'}

## Case summary sections (hidden from the agent)
${parts.filter((p) => ['Overview', 'Next action at escalation', 'Outcome', 'Boundaries and remaining work'].includes(p.name)).map((p) => p.text).join('\n\n')}`;

  return {
    id: basename(dir),
    brief,
    inputs: [{ name: 'history.md', content: clip(`${preamble.replace(/Total events: \d+\.?/, `Events shown: ${cutoff}.`)}\n\n${visible.map(render).join('\n\n')}`) }, ...attachments],
    reference,
    cutoff,
    totalEvents: events.length,
  };
}
