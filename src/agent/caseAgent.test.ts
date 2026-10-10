import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import { db } from '../core/store.js';
import { runCase } from './caseAgent.js';

const verifyCall = fauxToolCall('verify_identity', { tenant_id: 'T-1003', full_name: 'Priya Shah', date_of_birth: '1998-07-21' });
const ticketArgs = { tenant_id: 'T-1003', category: 'appliance', urgency: 'routine', description: 'Oven door hinge broken' };
const decision = (over: Record<string, unknown>) => ({
  outcome: 'action_taken',
  severity: 'routine',
  summary: 'Logged the repair.',
  answers: [],
  actions_claimed: [],
  failed_actions: [],
  conflicts: [],
  assumptions: [],
  ...over,
});

function setup() {
  const faux = fauxProvider();
  const models = createModels();
  models.setProvider(faux.provider);
  return { faux, model: faux.getModel(), streamFn: models.streamSimple.bind(models) };
}

const toolResults = (messages: any[]) => messages.filter((m) => m.role === 'toolResult').map((m) => m.content[0].text as string);
// Each test resets the in-memory store so ticket dedupe doesn't leak between tests.
const resetTickets = () => (db.tickets = db.tickets.filter((t) => t.tenant_id !== 'T-1003'));

describe('verified actions with pi hooks', () => {
  it('catches a silent drop, retries, and only then accepts the claim', async () => {
    resetTickets();
    const { faux, model, streamFn } = setup();
    faux.setResponses([
      fauxAssistantMessage([verifyCall]),
      fauxAssistantMessage([fauxToolCall('create_repair_ticket', ticketArgs)]), // silently dropped
      // Model ignores the warning and claims success: must be rejected.
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ actions_claimed: [{ ledger_id: 'A1', description: 'ticket' }] }))]),
      fauxAssistantMessage([fauxToolCall('create_repair_ticket', ticketArgs)]), // retry works
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ actions_claimed: [{ ledger_id: 'A1', description: 'ticket' }] }))]),
    ]);
    const run = await runCase({
      caseId: 'silent-drop',
      prompt: 'Oven hinge broken',
      systemPrompt: 'test',
      model,
      streamFn,
      failures: { create_repair_ticket: [{ call: 1, mode: 'silent_drop' }] },
    });
    const results = toolResults(run.messages);
    expect(results[1]).toContain('NOT APPLIED');
    expect(results[2]).toContain('Decision rejected');
    expect(results[3]).toContain('Verified');
    expect(run.ledger).toMatchObject([{ id: 'A1', status: 'verified', attempts: 2 }]);
    expect(run.decision?.actions_claimed).toHaveLength(1);
  });

  it('recognises a timeout that actually succeeded and blocks the duplicate retry', async () => {
    resetTickets();
    const { faux, model, streamFn } = setup();
    faux.setResponses([
      fauxAssistantMessage([verifyCall]),
      fauxAssistantMessage([fauxToolCall('create_repair_ticket', ticketArgs)]), // times out, but lands
      fauxAssistantMessage([fauxToolCall('create_repair_ticket', ticketArgs)]), // blind retry
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ actions_claimed: [{ ledger_id: 'A1', description: 'ticket' }] }))]),
    ]);
    const run = await runCase({
      caseId: 'timeout',
      prompt: 'Oven hinge broken',
      systemPrompt: 'test',
      model,
      streamFn,
      failures: { create_repair_ticket: [{ call: 1, mode: 'timeout' }] },
    });
    const results = toolResults(run.messages);
    expect(results[1]).toContain('IS in place');
    expect(results[2]).toContain('Already done');
    expect(db.tickets.filter((t) => t.tenant_id === 'T-1003')).toHaveLength(1);
    expect(run.decision).toBeDefined();
  });

  it('forces failed actions to be accounted for in the decision', async () => {
    resetTickets();
    const { faux, model, streamFn } = setup();
    faux.setResponses([
      fauxAssistantMessage([verifyCall]),
      fauxAssistantMessage([fauxToolCall('create_repair_ticket', ticketArgs)]), // hard 500
      fauxAssistantMessage([fauxToolCall('submit_decision', decision({ outcome: 'resolved' }))]), // hides the failure
      fauxAssistantMessage([fauxToolCall('escalate_to_human', { tenant_id: 'T-1003', priority: 'P3', reason: 'Repair system down', handover_summary: 'Oven hinge; ticket failed' })]),
      fauxAssistantMessage([
        fauxToolCall(
          'submit_decision',
          decision({ outcome: 'escalated', failed_actions: [{ ledger_id: 'A1', handling: 'Repair system down; escalated to human as A2' }] }),
        ),
      ]),
    ]);
    const run = await runCase({
      caseId: 'hard-fail',
      prompt: 'Oven hinge broken',
      systemPrompt: 'test',
      model,
      streamFn,
      failures: { create_repair_ticket: [{ call: 1, mode: 'error' }] },
    });
    expect(toolResults(run.messages)[2]).toContain('A1 (create_repair_ticket) is failed');
    expect(run.decision?.outcome).toBe('escalated');
  });
});
