// Writes CaseBundle fixtures for layer tests: tsx src/agent/harness/dumpBundles.ts
// Dev-split cases only (cases/splits.json); never add a holdout case here.
import { mkdirSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { ingest } from '../ingest/index.js';

export const FIXTURE_CASES = [
  'cases/practice/03',
  'cases/practice/05',
  'cases/practice/12',
  'cases/practice/17',
  'cases/practice/20',
  'cases/practice/23',
  'HackatonPublicCases/Property Management/002',
  'HackatonPublicCases/Property Management/025',
  'HackatonPublicCases/Property Management/047',
];

const out = 'src/agent/fixtures/bundles';
mkdirSync(out, { recursive: true });
for (const dir of FIXTURE_CASES) {
  const b = ingest(dir, { at: 'auto' });
  const id = dir.includes('HackatonPublicCases') ? `public-${basename(dir)}` : `practice-${basename(dir)}`;
  // Media blocks are base64 images: keep the names, drop the bytes.
  const slim = { ...b, media: b.media.map((m) => ({ name: m.name, media: { type: 'image', data: '', mimeType: m.media.mimeType } })) };
  writeFileSync(join(out, `${id}.json`), JSON.stringify(slim, null, 2) + '\n');
  console.log(`${id}: ${b.documents.length} documents, ${b.manifest.length} manifest entries`);
}
