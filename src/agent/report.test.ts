import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import type { Decision } from './caseAgent.js';
import { type LoadedCase, loadCase } from './cases.js';
import type { CriticResult } from './critic/critic.js';
import type { LedgerEntry } from './ledger.js';
import { renderAnswer, renderReasoning, renderTranscript } from './report.js';

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
    expect(received).toMatch(/^- `history\.md` \([\d,]+ bytes, [\d,]+ chars parsed\): built by the loader; events 1–12 of 20 from history\.md$/m);
    expect(received).toContain('- `attachments/quote.txt` (21 bytes, 20 chars parsed): read as text');
    expect(received).not.toContain('**Withheld from the agent:**');
    expect(received).toContain('The exact prompt text is in `TRANSCRIPT.md`.');
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

  it('lists the harness files and later-only attachments it withheld', () => {
    const pdir = mkdtempSync(join(tmpdir(), 'dwelly-practice-'));
    writeFileSync(join(pdir, 'case.md'), '# Case p: Leak');
    writeFileSync(join(pdir, 'email.txt'), 'Water through the ceiling.');
    writeFileSync(join(pdir, 'rubric.json'), '{}');
    const p = loadCase(pdir);
    rmSync(pdir, { recursive: true, force: true });
    expect(p.inputs.map((i) => i.name)).toEqual(['email.txt']);
    expect(renderReasoning(p, undefined, [], [], usage)).toContain('- `rubric.json`: grading or test-harness file, never shown to the agent');

    writeFileSync(join(dir, 'attachments', 'invoice.txt'), 'Invoice £420');
    writeFileSync(join(dir, 'history.md'), `# Case 900 history\n\nTotal events: 20\n\n${Array.from({ length: 20 }, (_, i) => event(i + 1, i === 15 ? 'Invoice: [invoice.txt](attachments/invoice.txt)' : (bodies[i + 1] ?? `Event ${i + 1} note.`))).join('\n')}`);
    const cut = loadCase(dir, '12');
    expect(cut.inputs.map((i) => i.name)).not.toContain('attachments/invoice.txt');
    expect(cut.withheld).toContainEqual({ name: 'attachments/invoice.txt', reason: 'first linked from an event after the decision point' });
    expect(renderReasoning(cut, undefined, [], [], usage)).toContain('- `attachments/invoice.txt`: first linked from an event after the decision point');
  });
});

describe('TRANSCRIPT.md', () => {
  it('shows the system prompt, the exact user prompt, thinking, tool calls and full results', () => {
    const messages = [
      { role: 'user', content: 'CASE PROMPT TEXT', timestamp: 0 },
      {
        role: 'assistant',
        stopReason: 'toolUse',
        usage: { input: 10, output: 5, reasoning: 3, cost: { total: 0.01 } },
        content: [
          { type: 'thinking', thinking: 'The landlord has not answered yet.' },
          { type: 'toolCall', id: 'c1', name: 'add_note', arguments: { body: 'x' } },
        ],
      },
      { role: 'toolResult', toolCallId: 'c1', toolName: 'add_note', content: [{ type: 'text', text: 'R'.repeat(2000) }] },
    ];
    const t = renderTranscript(practice, { model: 'm', thinking: 'medium', systemPrompt: 'SYSTEM PROMPT TEXT', messages, trace: [{ type: 'retry', ts: 't', attempt: 1, delayMs: 5, error: '429' }] });
    for (const s of ['SYSTEM PROMPT TEXT', 'CASE PROMPT TEXT', 'The landlord has not answered yet.', '### 🔧 Tool call `add_note` (c1)', 'R'.repeat(2000), '(thinking 3)', '## Provider retries']) expect(t).toContain(s);
    expect(trace(messages)).toContain('💭 **Thinking (summary):** The landlord has not answered yet.');
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

const entry = (id: string, tool: string, status: LedgerEntry['status'], args: Record<string, unknown>, evidence: string, attempts = 1): LedgerEntry => ({ id, tool, args, key: `${tool}:${id}`, attempts, status, evidence: [evidence] });
const ledger: LedgerEntry[] = [
  entry('A1', 'send_message', 'verified', { recipient_name: 'Ava Kendall', recipient_role: 'landlord', channel: 'email', contact: 'ava@example.com', body: 'Hello Ava,\nThe plumber quoted £180.' }, 'Verified: message MSG-1 found.'),
  entry('A2', 'escalate_to_human', 'verified', { priority: 'urgent', team: 'property manager', reason: 'Quote above the spend limit', known: 'Quote £420', missing: 'Landlord approval', options: ['Approve', 'Decline'], recommendation: 'Approve', deadline: '2026-10-12' }, 'Verified: escalation E-1 found.'),
  entry('A3', 'schedule_follow_up', 'failed', { ticket_ref: 'T1', review_on: '2026-10-14' }, 'Follow-up not found after write.', 2),
  entry('A4', 'request_landlord_approval', 'unverifiable', { landlord: 'Ava Kendall', decision_needed: 'Approve the quote', amount_gbp: 420, options: ['Approve', 'Decline'] }, 'No read-back available.'),
];
const full: Decision = {
  case_state: 'Quote received, landlord approval outstanding.',
  next_actions: [
    { type: 'ESCALATE_TO_HUMAN', action: 'Escalate the over-limit quote', recipient: 'internal', channel: 'internal', ledger_id: 'A2' },
    { type: 'WAIT', action: 'Review on 14 Oct', recipient: 'internal', channel: 'internal', ledger_id: 'A3' },
    { type: 'OTHER', action: 'Nothing else', recipient: 'internal', channel: 'internal' },
    { type: 'REPLY_TO_TENANT', action: 'Tell the tenant | update', recipient: 'Sam, tenant', channel: 'sms', ledger_id: 'A9' },
  ],
  boundaries: ['Escalating does not approve the quote.'],
  remaining_work: ['Landlord decision on the quote (property manager).'],
  missing_info: ['The landlord spend limit for 2026.'],
  outcome: 'escalated',
  severity: 'urgent',
  summary: 'The £420 quote is above the £300 limit, so it went to the property manager.',
  answers: [{ question: 'Can the quote be approved?', answer: 'Not by the agent: it is above the limit.' }],
  actions_claimed: [{ ledger_id: 'A2', description: 'Escalated' }],
  failed_actions: [{ ledger_id: 'A3', handling: 'Recorded in the escalation.' }],
  conflicts: ['CRM limit £300 vs email £500; trusted the CRM.'],
  assumptions: ['The quote includes VAT.'],
};
const fullChecks = {
  screen: { severity: 'urgent', severityProb: 0.81, flags: { gas: 0.02 } },
  gateLog: [{ tool: 'send_message', attempt: 1, block: false, reasons: [], probs: {} }],
  policyLog: [{ tool: 'approve_quote', reason: 'above the spend limit' }],
  chaos: { send_message: { mode: 'error' } },
  critic: results.ok,
};
const fullMessages = [
  { role: 'assistant', content: [{ type: 'text', text: 'Reading the case.' }, call('c1', 'escalate_to_human', { priority: 'urgent' })] },
  result('c1', 'escalate_to_human', '{"ok":true}'),
];

describe('rendering without harness v2 fields (R4 baseline)', () => {
  it('ANSWER.md is unchanged', () => {
    expect(renderAnswer(c, full, ledger)).toMatchInlineSnapshot(`
      "# Case t: Leak: ANSWER

      **Decision:** escalated · **Severity:** urgent

      The £420 quote is above the £300 limit, so it went to the property manager.

      ## Where the case stands
      Quote received, landlord approval outstanding.

      ## Next actions
      | # | Type | Action | Recipient | Channel | Performed |
      |---|---|---|---|---|---|
      | 1 | ESCALATE_TO_HUMAN | Escalate the over-limit quote | internal | internal | A2 ✅ |
      | 2 | WAIT | Review on 14 Oct | internal | internal | A3 ❌ |
      | 3 | OTHER | Nothing else | internal | internal | — |
      | 4 | REPLY_TO_TENANT | Tell the tenant \\| update | Sam, tenant | sms | A9 (not in ledger) |

      ## Messages sent (verbatim)
      **A1 · send_message → Ava Kendall (landlord) via email, ava@example.com** (verified)

      > Hello Ava,
      > The plumber quoted £180.

      **A4 · request_landlord_approval → Ava Kendall (landlord)** (unverifiable)

      > Approve the quote (£420)
      > 
      > Options: Approve; Decline

      ## Escalation
      - **urgent → property manager** (verified): Quote above the spend limit
        - Known: Quote £420
        - Missing: Landlord approval
        - Options: Approve; Decline
        - Recommendation: Approve
        - Deadline: 2026-10-12

      ## What this does not establish
      - Escalating does not approve the quote.

      ## Remaining work
      - Landlord decision on the quote (property manager).

      ## Missing or unavailable information
      - The landlord spend limit for 2026.

      ## Conflicts between sources
      - CRM limit £300 vs email £500; trusted the CRM.

      ## Answers to the case questions
      **1. Can the quote be approved?**

      Not by the agent: it is above the limit.

      ## Actions taken (from the verified action ledger)
      | # | Action | Key arguments | Attempts | Status | Evidence |
      |---|---|---|---|---|---|
      | A1 | \`send_message\` | {"recipient_name":"Ava Kendall","recipient_role":"landlord","channel":"email","contact":"ava@example.com","body":"Hello Ava,\\nThe plumber qu… | 1 | ✅ verified | Verified: message MSG-1 found. |
      | A2 | \`escalate_to_human\` | {"priority":"urgent","team":"property manager","reason":"Quote above the spend limit","known":"Quote £420","missing":"Landlord approval","op… | 1 | ✅ verified | Verified: escalation E-1 found. |
      | A3 | \`schedule_follow_up\` | {"ticket_ref":"T1","review_on":"2026-10-14"} | 2 | ❌ failed | Follow-up not found after write. |
      | A4 | \`request_landlord_approval\` | {"landlord":"Ava Kendall","decision_needed":"Approve the quote","amount_gbp":420,"options":["Approve","Decline"]} | 1 | ⚠️ unverified | No read-back available. |

      ## Failed or unverified actions
      - A3: Recorded in the escalation.
      "
    `);
    expect(renderAnswer(c, undefined, ledger, 'boom')).toMatchInlineSnapshot(`
      "# Case t: Leak: ANSWER

      **Decision:** escalated (system fallback)

      The agent did not produce a decision (error: boom). The case is handed to a human with everything below.

      ## Actions taken
      | # | Action | Key arguments | Attempts | Status | Evidence |
      |---|---|---|---|---|---|
      | A1 | \`send_message\` | {"recipient_name":"Ava Kendall","recipient_role":"landlord","channel":"email","contact":"ava@example.com","body":"Hello Ava,\\nThe plumber qu… | 1 | ✅ verified | Verified: message MSG-1 found. |
      | A2 | \`escalate_to_human\` | {"priority":"urgent","team":"property manager","reason":"Quote above the spend limit","known":"Quote £420","missing":"Landlord approval","op… | 1 | ✅ verified | Verified: escalation E-1 found. |
      | A3 | \`schedule_follow_up\` | {"ticket_ref":"T1","review_on":"2026-10-14"} | 2 | ❌ failed | Follow-up not found after write. |
      | A4 | \`request_landlord_approval\` | {"landlord":"Ava Kendall","decision_needed":"Approve the quote","amount_gbp":420,"options":["Approve","Decline"]} | 1 | ⚠️ unverified | No read-back available. |
      "
    `);
  });

  it('REASONING.md is unchanged', () => {
    expect(renderReasoning(c, full, ledger, fullMessages, usage, 'late', fullChecks as any)).toMatchInlineSnapshot(`
      "# Case t: REASONING

      ## What the system received
      - Case brief (14 chars)

      The exact prompt text is in \`TRANSCRIPT.md\`.

      ## Pre-screen (Jev classifier)
      - Severity: urgent (p=0.81)
      - gas: 0.02

      ## Pre-send message checks (Jev classifier)
      - send_message attempt 1: passed

      ## Actions blocked by hard policy rules
      - \`approve_quote\`: above the spend limit

      ## Injected tool failures (robustness test, --chaos)
      \`\`\`json
      {"send_message":{"mode":"error"}}
      \`\`\`

      ## Checks performed
      - Pre-submit critic (claude-opus-5-5, 21 s): 16 items checked, 2 findings with evidence (2 addressed in revision), 1 dropped without evidence.

      ## Conflicts between sources
      - CRM limit £300 vs email £500; trusted the CRM.

      ## Assumptions
      - The quote includes VAT.

      ## Action ledger (every state change, read back after execution)
      | # | Action | Key arguments | Attempts | Status | Evidence |
      |---|---|---|---|---|---|
      | A1 | \`send_message\` | {"recipient_name":"Ava Kendall","recipient_role":"landlord","channel":"email","contact":"ava@example.com","body":"Hello Ava,\\nThe plumber qu… | 1 | ✅ verified | Verified: message MSG-1 found. |
      | A2 | \`escalate_to_human\` | {"priority":"urgent","team":"property manager","reason":"Quote above the spend limit","known":"Quote £420","missing":"Landlord approval","op… | 1 | ✅ verified | Verified: escalation E-1 found. |
      | A3 | \`schedule_follow_up\` | {"ticket_ref":"T1","review_on":"2026-10-14"} | 2 | ❌ failed | Follow-up not found after write. |
      | A4 | \`request_landlord_approval\` | {"landlord":"Ava Kendall","decision_needed":"Approve the quote","amount_gbp":420,"options":["Approve","Decline"]} | 1 | ⚠️ unverified | No read-back available. |

      ## Trace
      1. **Agent:** Reading the case.
      2. **Tool call** \`escalate_to_human\` {"priority":"urgent"}
         - \`escalate_to_human\` result: {"ok":true}

      **Run error:** late

      ## Run
      - Model turns: 1 · Tokens in/out: 0/0 · Cost: $0.0000 · Duration: 1.0s
      - Full untruncated transcript (prompts, model thinking, every tool call and result): \`TRANSCRIPT.md\` · Raw timestamped events: \`trace.jsonl\` · Machine-readable result: \`result.json\`
      "
    `);
  });
});

const offHarness = { flags: 'none', tags: [], skills: [], errors: [], log: { guardBlocks: [], completion: [], skillsLoaded: [] } };
const between = (s: string, from: string, to: string) => s.slice(s.indexOf(from), s.indexOf(to, s.indexOf(from)));

describe('harness extras with every flag off (R4)', () => {
  it('REASONING.md is byte-identical to the run without extras', () => {
    const before = renderReasoning(c, full, ledger, fullMessages, usage, 'late', fullChecks as any);
    expect(renderReasoning(c, full, ledger, fullMessages, usage, 'late', { ...(fullChecks as any), harness: offHarness, brief: { conflicts: [], deadlines: [], tags: [] } })).toBe(before);
  });
});

const v2Ledger: LedgerEntry[] = [
  ...ledger,
  entry('A5', 'put_on_hold', 'unverifiable', { ticket_ref: 'T1', review_on: '2026-10-20' }, 'Hold store has no read endpoint.'),
  { ...entry('A6', 'schedule_follow_up', 'verified', { ticket_ref: 'T1', review_on: '2026-10-13' }, 'Verified: FUP-7 found.', 2), failureClass: 'retry' } as LedgerEntry,
  { ...entry('A7', 'escalate_to_human', 'failed', { priority: 'routine', team: 'accounts', reason: 'Invoice mismatch' }, 'Escalation not found.'), apiError: 'timeout', failureClass: 'record_and_escalate' } as LedgerEntry,
  entry('A8', 'escalate_to_human', 'verified', { priority: 'routine', team: 'compliance', reason: 'Gas certificate expiring' }, 'Verified: escalation E-2 found.'),
];
const v2: Decision = {
  ...full,
  escalations: [
    { to: 'property manager', decision_needed: 'Approve the £420 quote', options: ['Approve', 'Decline'], recommendation: 'Approve', deadline: '2026-10-12', evidence: ['doc:inputs/quote.md', 'crm:property.spend_limit'], already_done: ['Told the landlord about the quote (A1)', 'Scheduled a review (A3)', 'Checked the CRM'], ledger_id: 'A2' },
    { to: 'accounts', decision_needed: 'Pay the invoice?', options: ['Pay', 'Hold'], recommendation: 'Hold', deadline: '2026-10-15', evidence: [], already_done: [], ledger_id: 'A7' },
    { to: 'property manager', decision_needed: 'Tenant compensation request', options: [], recommendation: 'Decline', deadline: '2026-10-16', evidence: ['ev:4'], already_done: [] },
  ],
  follow_ups: [
    { party: 'Ava Kendall, landlord', purpose: 'Chase | quote decision', review_on: '2026-10-13', ledger_id: 'A6' },
    { party: 'Plumber', purpose: 'Visit date', review_on: '2026-10-14', ledger_id: 'A3' },
    { party: 'Sam, tenant', purpose: 'Access', review_on: '2026-10-20', ledger_id: 'A5' },
    { party: 'Sam, tenant', purpose: 'Photos', review_on: '2026-10-21', ledger_id: 'A9' },
    { party: 'Ava Kendall, landlord', purpose: 'Reply', review_on: '2026-10-22', ledger_id: 'A1' },
  ],
  unknowns: ['Whether the leak predates the tenancy; the previous agent may know.'],
};

describe('ANSWER.md harness v2 sections (R1, R2)', () => {
  const a = renderAnswer(c, v2, v2Ledger);

  it('renders escalation packets joined to the ledger, follow-ups and unknowns', () => {
    expect(between(a, '## Escalations', '## What this does not establish')).toMatchInlineSnapshot(`
      "## Escalations
      ### 1. Approve the £420 quote → property manager
      - Escalation: A2 ✅ verified · urgent → property manager: Quote above the spend limit
      - Options: Approve; Decline
      - Recommendation: Approve
      - Deadline: 2026-10-12
      - Evidence: doc:inputs/quote.md; crm:property.spend_limit
      - Done before handover:
        - Told the landlord about the quote (A1 ✅)
        - not done (A3 failed): Scheduled a review (A3)
        - Checked the CRM _(no ledger entry cited)_

      ### 2. Pay the invoice? → accounts
      - Escalation: not done (A7 failed, record_and_escalate: timeout) · routine → accounts: Invoice mismatch
      - Options: Pay; Hold
      - Recommendation: Hold
      - Deadline: 2026-10-15
      - Evidence: _none given_
      - Done before handover: _nothing stated_

      ### 3. Tenant compensation request → property manager
      - Escalation: not done (no ledger entry cited)
      - Options: _none given_
      - Recommendation: Decline
      - Deadline: 2026-10-16
      - Evidence: ev:4
      - Done before handover: _nothing stated_

      **Logged without a packet:**
      - A8 routine → compliance (verified): Gas certificate expiring

      ## Follow-ups
      | Party | Purpose | Review date | Performed |
      |---|---|---|---|
      | Ava Kendall, landlord | Chase \\| quote decision | 2026-10-13 | A6 ✅ verified |
      | Plumber | Visit date | 2026-10-14 | not done (A3 failed: Follow-up not found after write.) |
      | Sam, tenant | Access | 2026-10-20 | not done (A5 could not be read back: Hold store has no read endpoint.) |
      | Sam, tenant | Photos | 2026-10-21 | not done (A9 is not in the ledger) |
      | Ava Kendall, landlord | Reply | 2026-10-22 | not done (A1 is \`send_message\`, not \`schedule_follow_up\` or \`put_on_hold\`) |

      "
    `);
    expect(between(a, '## Missing or unavailable information', '## Conflicts between sources')).toMatchInlineSnapshot(`
      "## Missing or unavailable information
      - The landlord spend limit for 2026.

      ## Unknowns
      - Whether the leak predates the tenancy; the previous agent may know.

      "
    `);
  });

  it('never shows a failed, unverifiable, missing or wrong-tool entry as done', () => {
    const rows = between(a, '## Follow-ups', '## What this').split('\n').filter((l) => l.startsWith('| ') && !l.startsWith('| Party'));
    expect(rows.map((r) => r.split(' | ').at(-1))).toEqual([
      'A6 ✅ verified |',
      'not done (A3 failed: Follow-up not found after write.) |',
      'not done (A5 could not be read back: Hold store has no read endpoint.) |',
      'not done (A9 is not in the ledger) |',
      'not done (A1 is `send_message`, not `schedule_follow_up` or `put_on_hold`) |',
    ]);
    expect(a).toContain('- Escalation: not done (A7 failed, record_and_escalate: timeout) · routine → accounts: Invoice mismatch');
    expect(a).toContain('- Escalation: not done (no ledger entry cited)');
    expect(a).toContain('  - not done (A3 failed): Scheduled a review (A3)');
    expect(a).not.toMatch(/A[3579] ✅/);
  });

  it('lists ledger escalations no packet cites, and says when there are none', () => {
    expect(a).toContain('**Logged without a packet:**\n- A8 routine → compliance (verified): Gas certificate expiring');
    const none = renderAnswer(c, { ...full, escalations: [], follow_ups: [], unknowns: [] }, []);
    expect(none).toContain('## Escalations\n_None: no decision here needs a human._\n\n## Follow-ups\n_None._\n\n## What this');
    expect(none).toContain('## Unknowns\n_None._\n\n## Conflicts');
  });
});

const harness = {
  flags: 'brief,skills,guardsV2,completionV2',
  tags: ['gas', 'identity_privacy'],
  skills: ['gas-emergency'],
  errors: ['skills: front matter missing in closure.md'],
  log: {
    guardBlocks: [
      { tool: 'send_message', rule: 'message.unknown_person', reason: 'Names "Bob", who is not a party.' },
      { tool: 'send_message', rule: 'message.unknown_person', reason: 'Names "Bob", who is not a party.' },
      { tool: 'approve_quote', rule: 'tier3.justification', reason: 'No justification citing a source.' },
    ],
    completion: [
      { check: 'escalation_packet', message: 'Packet 3 has no ledger_id.', capped: false },
      ...Array.from({ length: 12 }, (_, i) => ({ check: 'review_dates_valid', message: `Review date ${i + 1} is in the past.`, capped: true })),
    ],
    skillsLoaded: ['gas-emergency', 'closure', 'gas-emergency'],
  },
};
const brief = {
  conflicts: [{ kind: 'spend_limit' as const, detail: 'Quote £420 is above the £300 limit', sources: ['doc:inputs/quote.md', 'crm:property.spend_limit'], severity: 'block' as const }],
  deadlines: [{ what: 'Landlord to answer', due: '2026-10-12', basis: 'promised' as const, sources: ['ev:3'] }],
  tags: [],
};
const dynamicCritic: CriticResult = { ...base, status: 'ok', kept: [finding, { ...finding, id: 'R1', finding: 'Message names a person not in the case.', evidence_quote: 'Hi Bob, the plumber', source: 'ledger A1' }], dropped: [], unaddressed: [] };

describe('REASONING.md harness v2 sections (R3)', () => {
  const r = renderReasoning(c, v2, v2Ledger, [], usage, undefined, { harness, brief, critic: dynamicCritic });

  it('renders brief, skills, guard blocks, completion, critic hits, failure classes and layer errors', () => {
    expect(between(r, '## Case brief', '## Conflicts between sources')).toMatchInlineSnapshot(`
      "## Case brief: conflicts and deadlines
      **Conflicts found in the inputs:**
      - block · spend_limit: Quote £420 is above the £300 limit (doc:inputs/quote.md, crm:property.spend_limit)

      **Deadlines:**
      - 2026-10-12 · Landlord to answer (promised; ev:3)

      ## Situation tags and skills
      - Situation tags: gas, identity_privacy
      - Skills given up front: gas-emergency
      - Loaded by the agent with \`load_skill\`: gas-emergency ×2, closure

      ## Actions blocked by harness guards
      - \`message.unknown_person\` ×2
        - \`send_message\`: Names "Bob", who is not a party. ×2
      - \`tier3.justification\`
        - \`approve_quote\`: No justification citing a source.

      ## Pre-submit completion checks
      - Returned to the agent to fix:
        - \`escalation_packet\`: Packet 3 has no ledger_id.
      - Unresolved when the decision was filed (bounce limit reached):
        - \`review_dates_valid\`: Review date 1 is in the past.
        - \`review_dates_valid\`: Review date 2 is in the past.
        - \`review_dates_valid\`: Review date 3 is in the past.
        - \`review_dates_valid\`: Review date 4 is in the past.
        - \`review_dates_valid\`: Review date 5 is in the past.
        - \`review_dates_valid\`: Review date 6 is in the past.
        - \`review_dates_valid\`: Review date 7 is in the past.
        - \`review_dates_valid\`: Review date 8 is in the past.
        - \`review_dates_valid\`: Review date 9 is in the past.
        - \`review_dates_valid\`: Review date 10 is in the past.
        - … and 2 more

      ## Critic case-specific checklist hits
      - [R1] Message names a person not in the case. (evidence: "Hi Bob, the plumber", ledger A1)

      ## Tool failures by class
      - retry: A6 \`schedule_follow_up\` (verified after 2 attempts)
      - record_and_escalate: A7 \`escalate_to_human\` (failed)
      - unclassified: A3 \`schedule_follow_up\` (failed after 2 attempts); A4 \`request_landlord_approval\` (unverifiable); A5 \`put_on_hold\` (unverifiable)

      ## Harness layer errors
      - skills: front matter missing in closure.md

      "
    `);
  });

  it('takes the tags from the brief when the harness object has none', () => {
    expect(renderReasoning(c, d, [], [], usage, undefined, { brief: { tags: ['water'] } })).toContain('- Situation tags: water\n- Skills given up front: none\n- Loaded by the agent with `load_skill`: none');
  });

  it('shows no failure-class section until the ledger carries classes', () => {
    expect(renderReasoning(c, d, ledger, [], usage)).not.toContain('Tool failures by class');
  });
});
