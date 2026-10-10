// Scaffold a public-cuts case from an organiser case, cut after a given event.
// Usage: pnpm exec tsx src/eval/newCut.ts --src 047 --slug wrong-address --after 10 [--truncate]
//   Copies index.md, history.md and attachments/ into cases/public-cuts/<src>-<slug>/ and adds a
//   "## Next action at escalation" section with the organiser-style "Recorded action" marker, so the
//   existing loader (--at auto) shows events 1..after to the agent and hides the rest for the judge.
//   --truncate drops the events after the cut and the Overview/Outcome sections (for mutations whose
//   recorded ending no longer applies). Then write rubric.json and expected.json by hand.
//   --digest prints one line per event of the source history and exits.
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { parseHistory } from '../agent/publicCases.js';

const PUBLIC_ROOT = 'HackatonPublicCases/Property Management';
const { values } = parseArgs({
  options: {
    src: { type: 'string' },
    slug: { type: 'string' },
    after: { type: 'string' },
    truncate: { type: 'boolean', default: false },
    digest: { type: 'boolean', default: false },
    root: { type: 'string', default: PUBLIC_ROOT },
    out: { type: 'string', default: 'cases/public-cuts' },
  },
});

const HOLDOUT = new Set(['031', '036', '041', '045', '048', '050']);
if (!values.src) throw new Error('--src <id> is required');
if (values.root === PUBLIC_ROOT && HOLDOUT.has(values.src)) throw new Error(`${values.src} is in the holdout split: never cut, read or mutate it`);
const sourceTag = values.root === PUBLIC_ROOT ? 'PM' : values.root!.replace(/\/+$/, '').split('/').pop();
const srcDir = join(values.root!, values.src);
const historyMd = readFileSync(join(srcDir, 'history.md'), 'utf8');
const { preamble, events } = parseHistory(historyMd);

if (values.digest) {
  for (const e of events) {
    const get = (k: string) => e.body.match(new RegExp(`^- \\*\\*${k}:\\*\\* (.*)$`, 'm'))?.[1] ?? '';
    const first = e.body
      .split('\n')
      .filter((l) => l.trim() && !l.startsWith('- **'))
      .slice(0, 2)
      .join(' / ')
      .slice(0, 140);
    console.log(`${e.header} | ${get('Channel')} | ${get('From')} → ${get('To')} | ${first}`);
  }
  process.exit(0);
}

if (!values.slug || !values.after) throw new Error('--slug and --after are required');
const after = Number(values.after);
if (!(after >= 1 && after <= events.length)) throw new Error(`--after must be 1..${events.length}`);
const outDir = join(values.out!, `${values.src}-${values.slug}`);
if (existsSync(outDir)) throw new Error(`${outDir} already exists`);
mkdirSync(outDir, { recursive: true });

let index = readFileSync(join(srcDir, 'index.md'), 'utf8');
const marker = `## Next action at escalation\n\n- **Recorded action:** [History event ${String(after + 1).padStart(3, '0')}](history.md#event-${String(after + 1).padStart(3, '0')})\n\n`;
if (values.truncate) {
  // Drop the ending: the mutation makes it wrong. Keep Case details, Initial request, History, Attachments.
  index = index.replace(/## Overview\n[\s\S]*?(?=\n## )/, '').replace(/## Outcome\n[\s\S]*?(?=\n## )/, '');
}
index = index.replace(/\n## History\n/, `\n${marker}## History\n`);
writeFileSync(join(outDir, 'index.md'), index);

const kept = values.truncate ? events.slice(0, after) : events;
const body = kept.map((e) => `<a id="event-${String(e.n).padStart(3, '0')}"></a>\n## ${e.header}\n\n${e.body}`).join('\n\n');
writeFileSync(join(outDir, 'history.md'), `${preamble.replace(/Total events: \d+/, `Total events: ${kept.length}`)}\n\n${body}\n`);
if (existsSync(join(srcDir, 'attachments'))) cpSync(join(srcDir, 'attachments'), join(outDir, 'attachments'), { recursive: true });

writeFileSync(
  join(outDir, 'expected.json'),
  JSON.stringify({ source: `${sourceTag}/${values.src}`, cut_after: after, truncated: values.truncate, pattern: '', escalate: 'either', outcome_class: [], notes: '' }, null, 2) + '\n',
);
writeFileSync(
  join(outDir, 'rubric.json'),
  JSON.stringify({ required_outcomes: [], acceptable_alternatives: [], positive_behaviours: [], red_flags: [], prohibited_actions: [], critical_failures: [] }, null, 2) + '\n',
);
console.log(`${outDir}: ${kept.length} events kept, agent sees 1..${after}. Now fill rubric.json and expected.json.`);
