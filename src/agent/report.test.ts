import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import type { Decision } from './caseAgent.js';
import { type LoadedCase, loadCase } from './cases.js';
import type { CriticResult } from './critic/critic.js';
import { renderAnswer, renderReasoning } from './report.js';

const usage = { input: 0, output: 0, cost: 0, turns: 1, durationMs: 1000 };
const practice = { id: 't', brief: '# Case t: Leak', inputs: [], media: [], failures: {} } as unknown as LoadedCase;
const call = (id: string, name: string, args: object) => ({ type: 'toolCall', id, name, arguments: args });
const result = (toolCallId: string, toolName: string, text: string, isError = false) => ({ role: 'toolResult', toolCallId, toolName, content: [{ type: 'text', text }], isError });
const trace = (messages: any[]) => renderReasoning(practice, undefined, [], messages, usage).split('## Trace\n')[1].split('\n## Run')[0];

describe('trace pairing (AC1)', () => {
  it('renders each parallel result under its own call, named, whatever the arrival order', () => {
    const t = trace([
      { role: 'assistant', content: [call('c1', 'schedule_follow_up', { ticket_ref: 'T1' }), call('c2', 'record_work_result', { ref: 'T1' })] },
      result('c2', 'record_work_result', 'Validation failed for tool "record_work_result"', true),
      result('c1', 'schedule_follow_up', '{"ok":true,"follow_up_id":"FUP-102"}\n[ledger A3, attempt 1] Verified: FUP-102 found.'),
    ]);
    expect(t).toContain(
      [
        '1. **Tool call** `schedule_follow_up` {"ticket_ref":"T1"}',
        '   - `schedule_follow_up` result: {"ok":true,"follow_up_id":"FUP-102"}\n[ledger A3, attempt 1] Verified: FUP-102 found.',
        '2. **Tool call** `record_work_result` {"ref":"T1"}',
        '   - ⚠️ `record_work_result` result: Validation failed for tool "record_work_result"',
      ].join('\n'),
    );
  });

  it('still renders a result whose call is not in the trace, labelled with its tool name', () => {
    const t = trace([{ role: 'assistant', content: [{ type: 'text', text: 'Checking.' }] }, result('gone', 'get_ticket', '{"ok":false,"error":"not_found"}', true)]);
    expect(t).toContain('1. **Agent:** Checking.');
    expect(t).toContain('`get_ticket` result (no matching call in the trace): {"ok":false,"error":"not_found"}');
  });
});

describe('what the system received (AC2)', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dwelly-report-'));
  afterAll(() => rmSync(dir, { recursive: true, force: true }));
  const event = (n: number, body: string) => `<a id="event-${String(n).padStart(3, '0')}"></a>\n## 2026-08-${String(n).padStart(2, '0')} 09:00:00 UTC — event ${String(n).padStart(3, '0')}\n\n- **Channel:** Note\n- **From:** Agency / system\n- **To:** Not specified\n\n${body}\n`;
  const bodies: Record<number, string> = {
    3: 'Quote received. Attachments: [quote.txt](attachments/quote.txt)',
    5: 'Photos sent by the tenant. Attachment: attachment-07-document (unavailable)',
    15: 'Invoice received. Attachment: attachment-99-document (unavailable)',
  };
  writeFileSync(join(dir, 'index.md'), '# Case 900: Blocked toilet\n\n## Case details\n\n- **Property:** Flat 1, 1 Test Road\n\n## Initial request\n\nThe toilet is blocked.\n');
  writeFileSync(join(dir, 'history.md'), `# Case 900 history\n\nTotal events: 20\n\n${Array.from({ length: 20 }, (_, i) => event(i + 1, bodies[i + 1] ?? `Event ${i + 1} note.`)).join('\n')}`);
  mkdirSync(join(dir, 'attachments'));
  writeFileSync(join(dir, 'attachments', 'quote.txt'), 'Replace toilet: £420');

  it('lists the case details, the cut point, the files and the attachment the history names but the folder lacks', () => {
    const c = loadCase(dir, '12');
    const received = renderReasoning(c, undefined, [], [], usage).split('## What the system received\n')[1].split('\n## ')[0];
    expect(received).toMatch(/^- Case details from `index\.md`, with the task and questions \(\d+ chars\)$/m);
    expect(received).toContain('- Cut point: history events 1–12 of 20 (events 13–20 withheld)');
    expect(received).toMatch(/^- `history\.md` \(\d+ chars\)$/m);
    expect(received).toContain('- `attachments/quote.txt` (20 chars)');
    expect(received).toContain('- Referenced in the history but not provided: `attachment-07-document`');
    // Named only after the cut: not something the agent was told about.
    expect(received).not.toContain('attachment-99-document');
  });

  it('says so when nothing referenced is missing, and shows no cut point for practice cases', () => {
    expect(renderReasoning(loadCase(dir, '4'), undefined, [], [], usage)).toContain('- Referenced in the history but not provided: none');
    const received = renderReasoning(practice, undefined, [], [], usage).split('## What the system received\n')[1].split('\n## ')[0];
    expect(received).toContain('- Case brief (14 chars)');
    expect(received).not.toContain('Cut point');
    expect(received).not.toContain('Referenced in the history');
  });
});


const c = { id: 't', brief: '# Case t: Leak', inputs: [], media: [], failures: {} } as unknown as LoadedCase;
const d: Decision = {
  case_state: 'open', next_actions: [{ type: 'OTHER', action: 'none', recipient: 'internal', channel: 'internal' }], boundaries: [], remaining_work: [], missing_info: [],
  outcome: 'action_taken', severity: 'routine', summary: 's', answers: [], actions_claimed: [], failed_actions: [], conflicts: [], assumptions: ['The quote stays unapproved.'],
};
const base = { model: 'claude-opus-5-5', ms: 21_400, cost: 0.04, items: Array(16).fill({ id: '1', verdict: 'yes', evidence_quote: '', source: '' }), kept: [], dropped: [] };
const finding = { id: 'M2', evidence_quote: 'Invoice attached', source: 'event 019', finding: 'States the invoice total with no invoice present.', fix: 'Ask for the invoice.' };
const results: Record<string, CriticResult> = {
  ok: { ...base, status: 'ok', kept: [finding, { ...finding, id: 'M1' }], dropped: [finding], unaddressed: [] },
  unaddressed: { ...base, status: 'ok', kept: [finding], unaddressed: [`[M2] ${finding.finding}`] },
  error: { ...base, status: 'error', reason: 'timeout after 45 s', ms: 45_000 },
  skipped: { ...base, status: 'skipped', reason: 'low_time', ms: 0 },
};
const reasoning = (r?: CriticResult) => renderReasoning(c, d, [], [], usage, undefined, { critic: r });

describe('Checks performed line', () => {
  it('states each critic status factually, once', () => {
    expect(reasoning(results.ok)).toContain('- Pre-submit critic (claude-opus-5-5, 21 s): 16 items checked, 2 findings with evidence (2 addressed in revision), 1 dropped without evidence.');
    expect(reasoning(results.unaddressed)).toContain('(0 addressed in revision), 0 dropped without evidence.\n  - Not changed after revision: [M2] States the invoice total');
    expect(reasoning(results.error)).toContain('- Pre-submit critic: unavailable (timeout after 45 s); decision submitted without it.');
    expect(reasoning(results.skipped)).toContain('- Pre-submit critic: skipped (less than 60 s of the case time left).');
    for (const r of Object.values(results)) expect(reasoning(r).match(/## Checks performed/g)).toHaveLength(1);
  });

  it('is absent when the critic was off', () => {
    expect(reasoning()).not.toContain('Checks performed');
  });

  it('never reaches ANSWER.md', () => {
    expect(renderAnswer(c, d, [])).not.toMatch(/critic|review|score|checklist/i);
  });
});
