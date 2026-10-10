import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import type { ImageContent } from '@earendil-works/pi-ai';
import { basename, join, relative } from 'node:path';
import { isBinaryAttachment, readAttachment } from './attachments.js';
import { type FailurePlan, normaliseFailurePlan } from '../core/failures.js';
import type { Ticket } from './opsTools.js';
import { isPublicCase, loadPublicCase } from './publicCases.js';

export type CaseInput = { name: string; content: string };
/** Images and scanned PDFs, sent to the model as native content blocks. */
export type CaseMedia = { name: string; media: ImageContent };
export type LoadedCase = {
  id: string;
  dir: string;
  brief: string;
  inputs: CaseInput[];
  media: CaseMedia[];
  failures: FailurePlan;
  seedTickets: Ticket[];
  /** Public-format cases only: the hidden ending, shown to the judge and never to the agent. */
  reference?: string;
  cutoff?: number;
  totalEvents?: number;
};

// Never shown to the agent.
const HIDDEN = new Set(['rubric.json', 'tool_failures.json', 'checks.json']);
const MAX_FILE_CHARS = 60_000;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

/** Pull ticket-like records out of whatever JSON shape the environment uses. */
function extractTickets(json: unknown): Ticket[] {
  const list = Array.isArray(json) ? json : ((json as any)?.tickets ?? (json && typeof json === 'object' ? [json] : []));
  return list
    .filter((t: any) => t && typeof t === 'object')
    .map((t: any) => ({ ...t, ref: String(t.ref ?? t.ticket_ref ?? t.id ?? t.job_id ?? ''), stage: String(t.stage ?? t.status ?? 'init') }))
    .filter((t: Ticket) => t.ref);
}

/** `at` (public-format cases): events to show, as a number, a percentage like "50%", or "auto". */
export function loadCase(dir: string, at?: string): LoadedCase {
  if (isPublicCase(dir)) return { ...loadPublicCase(dir, at), dir, failures: {}, seedTickets: [] };
  const files = walk(dir).filter((p) => !HIDDEN.has(basename(p)));
  const briefPath = ['case.md', 'CASE.md', 'README.md', 'task.md'].map((f) => join(dir, f)).find(existsSync);
  const media: CaseMedia[] = [];
  const inputs = files
    .filter((p) => p !== briefPath)
    .sort()
    .map((p) => {
      const name = relative(dir, p);
      const a = isBinaryAttachment(p) ? readAttachment(p, name) : { content: readFileSync(p, 'utf8') };
      if (a.media) media.push({ name, media: a.media });
      let content = a.content;
      if (content.length > MAX_FILE_CHARS) content = `${content.slice(0, MAX_FILE_CHARS)}\n…[truncated ${content.length - MAX_FILE_CHARS} chars]`;
      return { name, content };
    });
  const seedTickets = inputs
    .filter((i) => /ticket/i.test(i.name) && i.name.endsWith('.json'))
    .flatMap((i) => {
      try {
        return extractTickets(JSON.parse(i.content));
      } catch {
        return [];
      }
    });
  const failuresPath = join(dir, 'tool_failures.json');
  return {
    id: basename(dir),
    dir,
    brief: briefPath ? readFileSync(briefPath, 'utf8') : '(no case brief provided)',
    inputs,
    media,
    failures: existsSync(failuresPath) ? normaliseFailurePlan(JSON.parse(readFileSync(failuresPath, 'utf8'))) : {},
    seedTickets,
  };
}

export function listCases(root: string): string[] {
  return readdirSync(root)
    .map((f) => join(root, f))
    .filter((p) => statSync(p).isDirectory())
    .sort();
}

export function casePrompt(c: LoadedCase) {
  const files = c.inputs.map((i) => `<file name="${i.name}">\n${i.content}\n</file>`).join('\n\n');
  return `<case id="${c.id}">\n${c.brief}\n</case>\n\n<inputs>\n${files}\n</inputs>\n\nYour submit_decision output is turned into ANSWER.md and REASONING.md automatically. Work the case now.`;
}
