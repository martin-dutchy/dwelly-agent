import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import { chaosPlan } from '../core/failures.js';
import { runCase } from './caseAgent.js';
import { createOpsToolset } from './opsTools.js';

const decision = (over: Record<string, unknown>) => ({
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

async function run(responses: ReturnType<typeof fauxAssistantMessage>[], seed = [{ ref: 'J-1', stage: 'double_quotation' }]) {
  const faux = fauxProvider();
  const models = createModels();
  models.setProvider(faux.provider);
  faux.setResponses(responses);
  const r = await runCase({ caseId: 't', prompt: 'case', systemPrompt: 'test', model: faux.getModel(), streamFn: models.streamSimple.bind(models), toolset: createOpsToolset(seed) });
  return { ...r, results: r.messages.filter((m: any) => m.role === 'toolResult').map((m: any) => m.content[0].text as string) };
}

const escalation = { priority: 'P2', team: 'fraud', reason: 'r', known: 'k', missing: 'm', options: ['a'], recommendation: 'a' };

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

  it('rejects "needs_info" when nobody was asked', async () => {
    const r = await run([
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ outcome: 'needs_info' }))]),
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ outcome: 'no_action' }))]),
    ]);
    expect(r.results[0]).toContain('Never just wait');
    expect(r.decision?.outcome).toBe('no_action');
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
