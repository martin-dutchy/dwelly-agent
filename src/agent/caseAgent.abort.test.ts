import { createModels, fauxAssistantMessage, fauxProvider } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import { runCase } from './caseAgent.js';

describe('runCase timeout', () => {
  it('abort is bounded: a model that never finishes returns soon after timeoutMs, with no decision and no nudge', async () => {
    // ~20 000 tokens at 50 tokens/s: minutes of streaming unless the abort lands.
    const faux = fauxProvider({ tokensPerSecond: 50 });
    const models = createModels();
    models.setProvider(faux.provider);
    faux.setResponses([fauxAssistantMessage('thinking about it '.repeat(5000))]);
    const started = Date.now();
    const run = await runCase({
      caseId: 'abort',
      prompt: 'A case that takes forever',
      systemPrompt: 'test',
      model: faux.getModel(),
      streamFn: models.streamSimple.bind(models),
      timeoutMs: 200,
    });
    expect(Date.now() - started).toBeLessThan(2000);
    expect(run.decision).toBeUndefined();
    const userPrompts = run.messages.filter((m: any) => m.role === 'user');
    expect(userPrompts).toHaveLength(1);
  });
});
