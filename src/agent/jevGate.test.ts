import { createModels, fauxAssistantMessage, fauxProvider, fauxToolCall } from '@earendil-works/pi-ai';
import { describe, expect, it, vi } from 'vitest';

// Jev stub: flags any message that mentions a booking.
vi.mock('./jev.js', () => ({
  checkMessage: async (msg: { body?: string }) =>
    /booked/i.test(msg.body ?? '')
      ? { block: true, reasons: ['claims unverified action (p=0.93)'], probs: {} }
      : { block: false, reasons: [], probs: {} },
}));

const { runCase } = await import('./caseAgent.js');
const { createOpsToolset } = await import('./opsTools.js');

const msg = (body: string) =>
  fauxToolCall('send_message', { recipient_name: 'Amelia', recipient_role: 'tenant', channel: 'email', contact: 'a@example.test', body });

describe('Jev pre-send gate', () => {
  it('holds a message claiming an unverified booking, then lets the rewrite through', async () => {
    const faux = fauxProvider();
    const models = createModels();
    models.setProvider(faux.provider);
    faux.setResponses([
      fauxAssistantMessage([msg('Your plumber is booked for Monday.')]),
      fauxAssistantMessage([msg("We've logged your leak and will confirm a visit time within 24 hours.")]),
      fauxAssistantMessage([
        fauxToolCall('submit_decision', {
          outcome: 'action_taken', severity: 'urgent', summary: 's', answers: [],
          actions_claimed: [{ ledger_id: 'A1', description: 'tenant update' }], failed_actions: [], conflicts: [], assumptions: [],
        }),
      ]),
    ]);
    const run = await runCase({
      caseId: 'jev-gate', prompt: 'leak', systemPrompt: 'test', model: faux.getModel(),
      streamFn: models.streamSimple.bind(models), toolset: createOpsToolset(),
    });
    const results = run.messages.filter((m: any) => m.role === 'toolResult').map((m: any) => m.content[0].text);
    expect(results[0]).toContain('held by the pre-send check');
    expect(run.ledger).toMatchObject([{ id: 'A1', tool: 'send_message', status: 'verified' }]);
    expect(run.gateLog.map((g) => g.block)).toEqual([true, false]);
  });
});
