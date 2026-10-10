// Ingest: any case folder in, one CaseBundle out. Wave 0 stub: wraps loadCase so behaviour is unchanged.
import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import { type LoadedCase, loadCase } from '../cases.js';
import { parseQuestions } from '../decisionPoints.js';
import type { CaseBundle, DocKind } from '../harness/contracts.js';
import { isPublicCase } from '../publicCases.js';

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

export function ingest(dir: string, opts: IngestOptions = {}): CaseBundle {
  return fromLoadedCase(loadCase(dir, opts.at));
}

export function fromLoadedCase(c: LoadedCase): CaseBundle {
  const format = isPublicCase(c.dir) ? 'organiser' : ['case.md', 'CASE.md', 'README.md', 'task.md'].some((f) => existsSync(join(c.dir, f))) ? 'practice' : 'generic';
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
