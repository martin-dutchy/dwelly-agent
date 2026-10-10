// Scaffold a case walk: one organiser case cut at every decision point, start to finish.
// Usage: pnpm walk --src 006 [--dry-run]
//   Writes cases/walks/<src>-e<NNN>/ for each step (NNN = last event the agent sees): a copy of index.md (plus the
//   "Next action at escalation" marker), the full history.md and attachments/. The loader cuts at the marker, the
//   judge grades each step against the agency's recorded next events with the generic reference rubric.
//   --dry-run prints the steps (trigger and the agency's next event) without writing anything.
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { parseHistory } from '../agent/publicCases.js';
import { eventLine, nextActionSection, walkSteps } from './walk.js';

const { values } = parseArgs({
  options: {
    src: { type: 'string' },
    'dry-run': { type: 'boolean', default: false },
    root: { type: 'string', default: 'HackatonPublicCases/Property Management' },
    out: { type: 'string', default: 'cases/walks' },
  },
});

const HOLDOUT = new Set(['031', '036', '041', '045', '048', '050']);
if (!values.src) throw new Error('--src <id> is required');
if (HOLDOUT.has(values.src)) throw new Error(`${values.src} is in the holdout split: never cut, read or mutate it`);
const srcDir = join(values.root!, values.src);
const { events } = parseHistory(readFileSync(join(srcDir, 'history.md'), 'utf8'));
const steps = walkSteps(events);
const at = (n: number) => events.find((e) => e.n === n);

console.log(`${values.src}: ${events.length} events, ${steps.length} decision points`);
for (const [i, cut] of steps.entries()) console.log(`  step ${i + 1} after ${eventLine(at(cut), 80)}\n         agency: ${eventLine(at(cut + 1), 80)}`);
if (values['dry-run']) process.exit(0);

const index = readFileSync(join(srcDir, 'index.md'), 'utf8');
for (const [i, cut] of steps.entries()) {
  const outDir = join(values.out!, `${values.src}-e${String(cut).padStart(3, '0')}`);
  if (existsSync(outDir)) throw new Error(`${outDir} already exists`);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.md'), index.replace(/\n## History\n/, `\n${nextActionSection(at(cut + 1)!)}## History\n`));
  cpSync(join(srcDir, 'history.md'), join(outDir, 'history.md'));
  if (existsSync(join(srcDir, 'attachments'))) cpSync(join(srcDir, 'attachments'), join(outDir, 'attachments'), { recursive: true });
  writeFileSync(
    join(outDir, 'expected.json'),
    JSON.stringify({ source: `PM/${values.src}`, walk: values.src, step: i + 1, steps: steps.length, cut_after: cut, escalate: 'either', trigger: eventLine(at(cut)), agency_next: eventLine(at(cut + 1)) }, null, 2) + '\n',
  );
}
console.log(`Wrote ${steps.length} steps to ${values.out}/${values.src}-e*/`);
