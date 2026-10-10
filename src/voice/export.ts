// Turn graded voice calls into cases the case worker can run on: `pnpm voice:export [--out datasets/voice]`.
//
// Each call becomes an organiser-format case folder:
//   index.md     the source case's details and initial request (no Overview/Outcome)
//   history.md   the source case history up to the scenario's cut, then the call as a new Call event
//                (summary + transcript) and the voice agent's verified actions as Update events
//   rubric.json  the scenario's follow-up rubric: what the case worker should do next
//   call.json    call metadata, voice grade and flags (not shown to the case worker: hidden by the loader)
// Then: pnpm cases --in datasets/voice --out runs/voice --at 100%  &&  pnpm eval --cases datasets/voice --answers runs/voice
//
// Output is git-ignored: transcripts are real people's speech. Testers' names are never written.
import 'dotenv/config';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { parseHistory } from '../agent/publicCases.js';
import { scenarioById } from './scenarios.js';
import { type CallRow, createStore } from './store.js';

const PUBLIC = join(process.cwd(), 'HackatonPublicCases', 'Property Management');
const pad = (n: number) => String(n).padStart(3, '0');
const party = { tenant: 'Tenant', landlord: 'Landlord', contractor: 'Contractor' } as const;

type Ledger = { tool: string; status: string; ref?: string; args: Record<string, unknown> }[];

/** Human-readable line for a verified voice action, in the style of the system's Update events. */
function describe(e: Ledger[number]) {
  const a = e.args;
  const money = (v: unknown) => (typeof v === 'number' ? ` £${v.toLocaleString('en-GB')}` : '');
  switch (e.tool) {
    case 'record_landlord_decision':
      return `Landlord decision recorded by phone: ${a.decision}${money(a.amount_gbp)}${a.conditions ? `; conditions: ${a.conditions}` : ''}${a.own_contractor_details ? `; own contractor: ${a.own_contractor_details}` : ''}${a.notes ? `. ${a.notes}` : ''}`;
    case 'record_appointment':
      return `Visit date selected by phone - ${a.date} ${a.time_window} (confirmed by ${a.confirmed_by})${a.access_notes ? `. Access: ${a.access_notes}` : ''}`;
    case 'record_contractor_update':
      return `Contractor update by phone: ${a.status}${money(a.quote_amount_gbp)}${a.next_date ? `; next: ${a.next_date}` : ''}${a.notes ? `. ${a.notes}` : ''}`;
    case 'add_case_note':
      return `Note (${a.kind}): ${a.note}`;
    case 'create_repair_ticket':
      return `New repair request logged by phone: ${a.category}, ${a.urgency}: ${a.description}`;
    case 'escalate_to_human':
      return `Escalated to a human (${a.priority}): ${a.reason}`;
    default:
      return `${e.tool}: ${JSON.stringify(a)}`;
  }
}

export function exportCall(call: CallRow, ledger: Ledger, outRoot: string) {
  const s = scenarioById(call.scenario_id);
  if (!s?.source) return undefined; // baselines have no source case
  const src = join(PUBLIC, s.source.case);
  const index = readFileSync(join(src, 'index.md'), 'utf8');
  const { events } = parseHistory(readFileSync(join(src, 'history.md'), 'utf8'));
  const kept = events.filter((e) => e.n <= s.source!.cutAfterEvent);

  // The call happens an hour after the last visible event, on the case's own timeline.
  const lastTs = Date.parse(kept.at(-1)!.header.split(' — ')[0].replace(' UTC', 'Z').replace(' ', 'T'));
  const at = (minutes: number) => new Date(lastTs + minutes * 60_000).toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  const inbound = s.direction === 'inbound';
  const summary = String((call.analysis as { transcript_summary?: string } | null)?.transcript_summary ?? 'Phone call with the voice agent.');
  const transcript = (call.transcript ?? [])
    .filter((t) => t.message)
    .map((t) => `${t.role === 'agent' ? 'Northbridge Lettings (AI)' : party[s.role]}: ${t.message}`)
    .join('\n');

  const added = [
    {
      header: `${at(60)} — event ${pad(kept.length + 1)}`,
      body: `- **Channel:** Call\n- **From:** ${inbound ? party[s.role] : 'Agency / system'}\n- **To:** ${inbound ? 'Agency / system' : party[s.role]}\n\n${summary}\n\nTranscript:\n${transcript}`,
    },
    ...ledger
      .filter((e) => e.status === 'verified')
      .map((e, i) => ({ header: `${at(61 + i)} — event ${pad(kept.length + 2 + i)}`, body: `- **Channel:** Update\n- **From:** Agency / system\n- **To:** Not specified\n\n${describe(e)}` })),
  ];
  const all = [...kept.map((e) => ({ header: e.header, body: e.body })), ...added];

  const id = `V${s.source.case}-${s.id}-${call.conversation_id.slice(-6)}`;
  const dir = join(outRoot, id);
  mkdirSync(dir, { recursive: true });
  // Keep the case details and request; drop everything that gives the real ending away.
  const head = index.split(/^## Overview/m)[0].replace(/^# Case \d+:/m, `# Case ${id}:`).replace(/^- \*\*(Status|Updated|Completed):\*\*.*\n/gm, '');
  writeFileSync(join(dir, 'index.md'), `${head.trim()}\n\n## History\n\n[Read the complete event history](history.md).\n`);
  writeFileSync(
    join(dir, 'history.md'),
    `# Case ${id} history\n\nTotal events: ${all.length}\n\n${all.map((e, i) => `<a id="event-${pad(i + 1)}"></a>\n## ${e.header.replace(/event \d+$/, `event ${pad(i + 1)}`)}\n\n${e.body}`).join('\n\n')}\n`,
  );
  if (s.followUp) writeFileSync(join(dir, 'rubric.json'), JSON.stringify(s.followUp, null, 2));
  writeFileSync(
    join(dir, 'call.json'),
    JSON.stringify({ conversation_id: call.conversation_id, scenario: s.id, source: s.source, brain: call.brain, duration_secs: call.duration_secs, voice_grade: call.grade, voice_passed: call.passed, flags: call.flags }, null, 2),
  );
  return dir;
}

if (process.argv[1]?.endsWith('export.ts')) {
  const { values } = parseArgs({ options: { out: { type: 'string', default: 'datasets/voice' }, all: { type: 'boolean', default: false }, only: { type: 'string' } } });
  const only = values.only?.split(',').map((s) => s.trim());
  const store = createStore();
  await store.init();
  let n = 0;
  for (const row of await store.listCalls(1000)) {
    if (row.status !== 'graded') continue;
    if (only && !only.some((o) => row.conversation_id.endsWith(o))) continue;
    const call = (await store.getCall(row.conversation_id))!;
    // Skip calls nobody really took part in (no caller speech), unless --all.
    if (!values.all && !(call.transcript ?? []).some((t) => t.role === 'user' && (t.message ?? '').trim().length > 3)) continue;
    const ledger = (await store.events(row.conversation_id)).filter((e) => e.type === 'ledger').map((e) => e.entry) as Ledger;
    const dir = exportCall(call, ledger, values.out!);
    if (dir) (n++, console.log(`[export] ${dir}`));
  }
  console.log(`[export] ${n} case(s) in ${values.out}. Next: pnpm cases --in ${values.out} --out runs/voice --at 100%`);
  process.exit(0);
}
