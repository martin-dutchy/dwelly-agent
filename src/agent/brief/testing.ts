// Test helpers: fixture bundles and hand-built bundles for the brief tests.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { CaseBrief, CaseBundle, DocKind } from '../harness/contracts.js';

const KINDS: Record<string, DocKind> = { eml: 'email', json: 'json', md: 'markdown', txt: 'text', csv: 'text', pdf: 'pdf', png: 'image' };
const kindOf = (path: string): DocKind => KINDS[path.split('.').pop()?.toLowerCase() ?? ''] ?? 'unknown';

const DIR = 'src/agent/fixtures/bundles';
export const FIXTURES = readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')).sort();
export const fixture = (name: string): CaseBundle => JSON.parse(readFileSync(join(DIR, `${name}.json`), 'utf8'));

/** A practice-format bundle from file texts keyed by path; `brief` may carry a "**Today:**" line. */
export function bundleOf(files: Record<string, string>, extra: Partial<CaseBundle> = {}): CaseBundle {
  const documents = Object.entries(files).map(([path, text]) => ({ id: `doc:${path}`, path, kind: kindOf(path), text }));
  return {
    id: 'test',
    dir: 'nowhere/test',
    format: 'practice',
    brief: '# Case\n\n- **Today:** Saturday 2026-10-10 11:30\n',
    documents,
    events: [],
    parties: [],
    questions: [],
    seedTickets: [],
    failures: {},
    media: [],
    manifest: documents.map((d) => ({ path: d.path, kind: d.kind, parse: 'text', included: true })),
    withheld: [],
    ...extra,
  };
}

/** Every SourceId a brief cites. */
export const citedSources = (b: CaseBrief) => [
  ...b.parties.flatMap((p) => p.sources),
  ...b.facts.flatMap((f) => f.sources),
  ...b.conflicts.flatMap((c) => c.sources),
  ...b.deadlines.flatMap((d) => d.sources),
  ...[...b.money.quotes, ...b.money.approvals, ...b.money.invoices, ...(b.money.spendLimit ? [b.money.spendLimit] : [])].flatMap((f) => f.sources),
];

export const crmJson = (o: Record<string, unknown> = {}) =>
  JSON.stringify({
    tenant: { tenant_id: 'T-1', full_name: 'Priya Shah', phone: '+447700900103', email: 'priya.shah@mailbox.example', date_of_birth: '1998-07-21', property_id: 'P-1' },
    property: { property_id: 'P-1', address: 'Flat 9, 3 Amhurst Road, London E8 2AU', landlord_id: 'L-1' },
    landlord: { landlord_id: 'L-1', name: 'Benjamin Hartley', preferred_name: 'Ben', email: 'ben.hartley@hartleyhomes.co.uk', phone: '+447700900201', spend_limit_gbp: 300 },
    contractors: [
      { contractor_id: 'C-19', name: 'Capital Boiler Fix', phone: '+447700900319' },
      { contractor_id: 'C-21', name: 'QuickFix Handyman Services' },
    ],
    ...o,
  });
