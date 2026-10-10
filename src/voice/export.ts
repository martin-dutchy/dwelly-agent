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
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { parseHistory } from '../agent/publicCases.js';
import { scenarioById } from './scenarios.js';
import { type CallRow, createStore } from './store.js';

const PUBLIC = join(process.cwd(), 'HackatonPublicCases', 'Property Management');
const pad = (n: number) => String(n).padStart(3, '0');
const party = { tenant: 'Tenant', landlord: 'Landlord', contractor: 'Contractor' } as const;

type Ledger = { tool: string; status: string; ref?: string; args: Record<string, unknown> }[];

/** Stable case numbers per conversation, starting at 101, kept in <out>/cases.json. */
function caseNumber(outRoot: string, conversationId: string) {
  const file = join(outRoot, 'cases.json');
  const map: Record<string, string> = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
  if (!map[conversationId]) {
    const next = Math.max(100, ...Object.values(map).map(Number)) + 1;
    map[conversationId] = String(next);
    mkdirSync(outRoot, { recursive: true });
    writeFileSync(file, JSON.stringify(map, null, 2) + '\n');
  }
  return map[conversationId];
}

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

  // Numbered like the organisers' cases (101, 102, ...); the mapping keeps a call's number stable on re-export.
  const id = caseNumber(outRoot, call.conversation_id);
  const dir = join(outRoot, id);
  mkdirSync(dir, { recursive: true });

  // Keep a hand-written rubric if one exists; otherwise start from the scenario's follow-up rubric.
  const rubricPath = join(dir, 'rubric.json');
  if (!existsSync(rubricPath) && s.followUp) writeFileSync(rubricPath, JSON.stringify(s.followUp, null, 2));
  const rubric = existsSync(rubricPath) ? (JSON.parse(readFileSync(rubricPath, 'utf8')) as { required_outcomes?: string[] }) : undefined;

  // index.md in the organisers' layout. Overview and Outcome are hidden from the agent by the loader
  // (exactly as for the public cases); the judge sees them.
  const title = index.match(/^# Case \d+: (.*)$/m)?.[1] ?? s.title;
  const detail = (k: string) => index.match(new RegExp(`^- \\*\\*${k}:\\*\\* (.*)$`, 'm'))?.[1] ?? '';
  const request = index.split(/^## Initial request\s*$/m)[1]?.split(/^## /m)[0]?.trim() ?? '';
  const did = ledger.filter((e) => e.status === 'verified').map(describe);
  const overview = [
    `This case continues public Property Management case ${s.source.case} (events ${s.source.events}), cut after event ${pad(s.source.cutAfterEvent)}.`,
    `Northbridge Lettings' AI phone line then ${inbound ? `took a call from` : `called`} the ${s.role} (${s.counterparty.split(',')[0]}), played by a volunteer from a role card. ${summary}`,
    did.length ? `The phone line recorded: ${did.join(' ')}` : 'The phone line recorded nothing on the case during the call.',
  ].join('\n\n');
  const outcome = rubric?.required_outcomes?.length
    ? `What should happen next:\n\n${rubric.required_outcomes.map((o) => `- ${o}`).join('\n')}`
    : 'No expected outcome recorded.';
  writeFileSync(
    join(dir, 'index.md'),
    `# Case ${id}: ${title}

## Case details

- **Source role:** ${party[s.role]}
- **Status:** In progress
- **Created:** ${detail('Created')}
- **Updated:** ${at(60)}
- **Property:** ${detail('Property')}

## Initial request

${request}

## Overview

${overview}

## Outcome

${outcome}

## History

[Read the complete event history](history.md).

## Attachments

No attachments are required or available for this case.
`,
  );
  writeFileSync(
    join(dir, 'history.md'),
    `# Case ${id} history\n\nTotal events: ${all.length}\n\n${all.map((e, i) => `<a id="event-${pad(i + 1)}"></a>\n## ${e.header.replace(/event \d+$/, `event ${pad(i + 1)}`)}\n\n${e.body}`).join('\n\n')}\n`,
  );
  writeFileSync(
    join(dir, 'call.json'),
    JSON.stringify({ case: id, conversation_id: call.conversation_id, scenario: s.id, source: s.source, brain: call.brain, duration_secs: call.duration_secs, voice_grade: call.grade, voice_passed: call.passed, flags: call.flags, tester_feedback: call.feedback ?? null }, null, 2),
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
  console.log(`[export] ${n} case(s) in ${values.out}. Next: pnpm cases --in ${values.out} --out runs/voice --at none`);
  process.exit(0);
}
