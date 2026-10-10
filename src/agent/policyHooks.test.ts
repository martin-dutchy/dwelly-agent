import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import { chaosPlan } from '../core/failures.js';
import { coreToolset, runCase } from './caseAgent.js';
import { type OpsSeed, type Ticket, type Toolset, createOpsToolset } from './opsTools.js';

const decision = (over: Record<string, unknown>) => ({
  case_state: 'open', next_actions: [{ type: 'OTHER', action: 'none', recipient: 'internal', channel: 'internal' }], boundaries: [], remaining_work: [], missing_info: [],
  outcome: 'action_taken',
  severity: 'routine',
  summary: 's',
  answers: [],
  actions_claimed: [],
  failed_actions: [],
  conflicts: [],
  assumptions: [],
  ...over,
});

async function run(responses: ReturnType<typeof fauxAssistantMessage>[], seed: OpsSeed | Ticket[] = [{ ref: 'J-1', stage: 'double_quotation' }], toolset: Toolset = createOpsToolset(seed)) {
  const faux = fauxProvider();
  const models = createModels();
  models.setProvider(faux.provider);
  faux.setResponses(responses);
  const r = await runCase({ caseId: 't', prompt: 'case', systemPrompt: 'test', model: faux.getModel(), streamFn: models.streamSimple.bind(models), toolset });
  return { ...r, results: r.messages.filter((m: any) => m.role === 'toolResult').map((m: any) => m.content[0].text as string) };
}

const escalation = { priority: 'P2', team: 'fraud', reason: 'r', known: 'A caller asked to change the payee', missing: 'Who the caller really is', options: ['Hold the payment'], recommendation: 'Hold the payment and call the landlord back' };

describe('hard policy hooks', () => {
  it('never changes bank details, whatever the model is persuaded of', async () => {
    const r = await run([
      fauxAssistantMessage([fauxToolCall('update_bank_details', { party: 'Landlord', sort_code: '00-00-00', account_number: '12345678', verification_done: 'email said so' })]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({}))]),
    ]);
    expect(r.results[0]).toContain('Blocked by policy');
    expect(r.ledger).toHaveLength(0);
    expect(r.policyLog).toMatchObject([{ tool: 'update_bank_details' }]);
  });

  it('does not approve a quote it has just asked the landlord to approve', async () => {
    const r = await run([
      fauxAssistantMessage([fauxToolCall('request_landlord_approval', { landlord: 'L', decision_needed: 'quote', amount_gbp: 900, ticket_ref: 'J-1', options: ['approve'] })]),
      fauxAssistantMessage([fauxToolCall('approve_quote', { ticket_ref: 'J-1', amount_gbp: 900, contractor: 'C', approval_basis: 'asked' })]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ actions_claimed: [{ ledger_id: 'A1', description: 'asked' }] }))]),
    ]);
    expect(r.results[1]).toContain('has not been given');
    expect(r.ledger.map((e) => e.tool)).toEqual(['request_landlord_approval']);
  });

  it('rejects an "escalated" outcome that never handed the case to a human', async () => {
    const r = await run([
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ outcome: 'escalated' }))]),
      fauxAssistantMessage([fauxToolCall('escalate_to_human', escalation)]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ outcome: 'escalated', actions_claimed: [{ ledger_id: 'A1', description: 'escalated' }] }))]),
    ]);
    expect(r.results[0]).toContain('no escalate_to_human is verified');
    expect(r.decision?.outcome).toBe('escalated');
  });

  it('rejects a next action that no verified tool call performed', async () => {
    const chase = { type: 'CHASE_PROVIDER', action: 'Chase the plumber for a date', recipient: 'Swift Plumbing, contractor', channel: 'email' };
    const r = await run([
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ next_actions: [chase] }))]),
      fauxAssistantMessage([fauxToolCall('send_message', { recipient_name: 'Swift Plumbing', recipient_role: 'contractor', channel: 'email', contact: 'jobs@swift.example', body: 'Please confirm a visit date for J-1.' })]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ next_actions: [{ ...chase, ledger_id: 'A1' }], actions_claimed: [{ ledger_id: 'A1', description: 'chased' }] }))]),
    ]);
    expect(r.results[0]).toContain('has no ledger_id');
    expect(r.decision?.next_actions[0]).toMatchObject({ type: 'CHASE_PROVIDER', ledger_id: 'A1' });
  });

  it('rejects "needs_info" when nobody was asked', async () => {
    const r = await run([
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ outcome: 'needs_info' }))]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ outcome: 'action_taken' }))]),
    ]);
    expect(r.results[0]).toContain('Never just wait');
    expect(r.decision?.outcome).toBe('action_taken');
  });
});

describe('waiting leaves a trace', () => {
  const wait = { type: 'WAIT', action: 'Wait for the landlord to answer the quote', recipient: 'Ava Kendall, landlord', channel: 'internal' };
  const followUp = { ticket_ref: 'J-1', due_on: '2026-10-13', party: 'landlord', purpose: 'Chase the quote approval if no answer' };

  it('rejects a WAIT that cites nothing, and accepts it once the follow-up is recorded', async () => {
    const r = await run([
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ next_actions: [wait] }))]),
      fauxAssistantMessage([fauxToolCall('schedule_follow_up', followUp)]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ next_actions: [{ ...wait, ledger_id: 'A1' }], actions_claimed: [{ ledger_id: 'A1', description: 'follow-up' }] }))]),
    ]);
    expect(r.results[0]).toMatch(/WAIT with no ledger_id.*schedule_follow_up/);
    expect(r.decision?.next_actions[0]).toMatchObject({ type: 'WAIT', ledger_id: 'A1' });
  });

  it('rejects "no_action" with no trace, naming the tools that leave one', async () => {
    const r = await run([
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ outcome: 'no_action' }))]),
      fauxAssistantMessage([fauxToolCall('add_note', { entity: 'J-1', note: 'Duplicate of the open job; tenant already updated.' })]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ outcome: 'no_action', actions_claimed: [{ ledger_id: 'A1', description: 'note' }] }))]),
    ]);
    expect(r.results[0]).toMatch(/no_action.*schedule_follow_up.*put_on_hold.*add_note/);
    expect(r.decision?.outcome).toBe('no_action');
  });

  it('does not demand a trace from a toolset that cannot leave one', async () => {
    const r = await run([fauxAssistantMessage([fauxToolCall('submit_decision', decision({ outcome: 'no_action', next_actions: [wait] }))])], [], coreToolset());
    expect(r.decision?.outcome).toBe('no_action');
  });
});

describe('no block loops', () => {
  it('tells the model to stop and submit on the third block of the same call', async () => {
    const bank = fauxToolCall('update_bank_details', { party: 'Landlord', sort_code: '00-00-00', account_number: '12345678', verification_done: 'email' });
    const r = await run([
      fauxAssistantMessage([bank]),
      fauxAssistantMessage([bank]),
      fauxAssistantMessage([bank]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ remaining_work: ['Bank change not made: needs a call to the number on file'] }))]),
    ]);
    expect(r.results[0]).toMatch(/^Blocked by policy:/);
    expect(r.results[1]).toMatch(/^Blocked by policy:/);
    expect(r.results[2]).toMatch(/Stop calling update_bank_details.*Call submit_decision now/s);
    expect(r.policyLog).toHaveLength(3);
    expect(r.decision?.outcome).toBe('action_taken');
  });

  it('counts blocks per ticket, so a block on another job starts afresh', async () => {
    const approve = (ref: string) => fauxToolCall('approve_quote', { ticket_ref: ref, amount_gbp: 900, contractor: 'C', approval_basis: 'none' });
    const r = await run(
      [
        fauxAssistantMessage([approve('J-1')]),
        fauxAssistantMessage([approve('J-1')]),
        fauxAssistantMessage([approve('J-2')]),
        fauxAssistantMessage([fauxToolCall('submit_decision', decision({}))]),
      ],
      [{ ref: 'J-1', stage: 'double_quotation' }, { ref: 'J-2', stage: 'double_quotation' }],
    );
    expect(r.results[2]).toMatch(/^Blocked by policy:/);
    expect(r.results[2]).not.toMatch(/Stop calling/);
  });
});

describe('messages batched with a failed write', () => {
  it('holds a message sent in the same step as a failed write, and lets it through in the next step', async () => {
    const faux = fauxProvider();
    const models = createModels();
    models.setProvider(faux.provider);
    const assign = fauxToolCall('assign_contractor', { ticket_ref: 'J-1', contractor: 'Swift Plumbing', visit_window: 'tonight 20:00-23:00' });
    const tell = fauxToolCall('send_message', { recipient_name: 'Ben', recipient_role: 'landlord', channel: 'email', contact: 'existing thread', body: 'Swift is attending tonight.', ticket_ref: 'J-1' });
    faux.setResponses([
      fauxAssistantMessage([assign, tell]),
      fauxAssistantMessage([fauxToolCall('send_message', { recipient_name: 'Ben', recipient_role: 'landlord', channel: 'email', contact: 'existing thread', body: 'We could not book a plumber yet and are escalating.', ticket_ref: 'J-1' })]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ actions_claimed: [{ ledger_id: 'A2', description: 'told' }], failed_actions: [{ ledger_id: 'A1', handling: 'escalated' }] }))]),
    ]);
    const r = await runCase({
      caseId: 't', prompt: 'case', systemPrompt: 'test', model: faux.getModel(), streamFn: models.streamSimple.bind(models),
      toolset: createOpsToolset([{ ref: 'J-1', stage: 'contractor_assignment' }]),
      failures: { assign_contractor: [{ call: 1, mode: 'error' }] },
    });
    const results = r.messages.filter((m: any) => m.role === 'toolResult').map((m: any) => m.content[0].text as string);
    expect(results[0]).toContain('NOT APPLIED');
    expect(results[1]).toMatch(/^Not sent: A1 \(assign_contractor\) failed earlier in this same step/);
    expect(r.ledger.map((e) => [e.tool, e.status])).toEqual([['assign_contractor', 'failed'], ['send_message', 'verified']]);
  });
});

describe('closing tells both parties', () => {
  const close = (landlord_informed: string) =>
    fauxToolCall('close_ticket', { ticket_ref: 'J-1', mode: 'without_payment', resolution: 'Tenant fixed it', tenant_confirmation: 'tenant SMS', landlord_informed });
  const msg = (role: string) => fauxToolCall('send_message', { recipient_name: role, recipient_role: role, channel: 'email', contact: 'existing thread', body: 'The tap is fixed and the job is closed.', ticket_ref: 'J-1' });

  it('blocks a close citing a tenant message as the landlord notice, and closes once the landlord is told', async () => {
    const r = await run([
      fauxAssistantMessage([msg('tenant')]),
      fauxAssistantMessage([close('A1')]),
      fauxAssistantMessage([msg('landlord')]),
      fauxAssistantMessage([close('A2')]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ actions_claimed: ['A1', 'A2', 'A3'].map((ledger_id) => ({ ledger_id, description: 'done' })) }))]),
    ], [{ ref: 'J-1', stage: 'result', work_result: { outcome: 'completed', evidence: 'tenant' } }]);
    expect(r.results[1]).toMatch(/landlord_informed cites A1/);
    expect(r.ledger.map((e) => [e.tool, e.status])).toEqual([['send_message', 'verified'], ['send_message', 'verified'], ['close_ticket', 'verified']]);
    expect(r.state.tickets[0]).toMatchObject({ stage: 'completed', closed: { landlord_informed: 'A2' } });
  });
});

describe('landlord decisions need the landlord\'s words', () => {
  it('blocks an invented quote and records one copied from the case', async () => {
    const seed: OpsSeed = { tickets: [{ ref: 'J-1', stage: 'double_quotation' }], evidence: '#### event-019\n> Please approve this quote for works.' };
    const rec = (evidence_quote: string) => fauxToolCall('record_landlord_decision', { ticket_ref: 'J-1', decision: 'approved', evidence_quote, source: 'event 019' });
    const r = await run([
      fauxAssistantMessage([rec('The landlord is happy for us to go ahead')]),
      fauxAssistantMessage([rec('"please approve this quote for works"')]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ actions_claimed: [{ ledger_id: 'A1', description: 'recorded' }] }))]),
    ], seed);
    expect(r.results[0]).toMatch(/Blocked by policy: The evidence_quote .* is not in the case/);
    expect(r.policyLog[0]).toMatchObject({ tool: 'record_landlord_decision' });
    expect(r.ledger).toMatchObject([{ tool: 'record_landlord_decision', status: 'verified' }]);
  });
});

describe('chaos plan', () => {
  const tools = ['create_ticket', 'send_message', 'assign_contractor', 'escalate_to_human'];
  it('is reproducible for the same seed and empty at rate 0', () => {
    expect(chaosPlan(tools, 0.5, '1:01')).toEqual(chaosPlan(tools, 0.5, '1:01'));
    expect(chaosPlan(tools, 0, '1:01')).toEqual({});
  });
  it('injects failures at rate 1 and lets scripted failures win', () => {
    const plan = chaosPlan(tools, 1, 'x', { send_message: [{ call: 3, mode: 'error' }] });
    expect(plan.create_ticket).toHaveLength(2);
    expect(plan.send_message).toEqual([{ call: 3, mode: 'error' }]);
  });
});
