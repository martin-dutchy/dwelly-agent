import type { Api, Model } from '@earendil-works/pi-ai';
import { describe, expect, it } from 'vitest';
import { TEMPERATURE, claude, streamFn, temperatureFor } from './models.js';

const sonnet = claude('claude-sonnet-5-5');
const older = { ...sonnet, id: 'claude-test-older', compat: {} } as Model<Api>;

/** The request body streamFn would send, captured before any network call. */
async function payloadFor(model: Model<Api>, reasoning?: string): Promise<Record<string, unknown>> {
  let payload: Record<string, unknown> = {};
  const ac = new AbortController();
  const options = { apiKey: 'sk-test', reasoning, signal: ac.signal, onPayload: (p: unknown) => ((payload = p as Record<string, unknown>), ac.abort(), p) };
  const s = await streamFn(model, { systemPrompt: 's', messages: [{ role: 'user', content: 'hi', timestamp: 0 }] } as never, options as never);
  await s.result();
  return payload;
}

describe('temperature', () => {
  it('is pinned to 0', () => expect(TEMPERATURE).toBe(0));

  it('is the provider default on models that reject it (the 5.5 family)', () => {
    expect(temperatureFor(sonnet, 'off')).toBe('provider default');
    expect(temperatureFor(claude('claude-opus-5-5'), 'low')).toBe('provider default');
  });

  it('is 0 on an Anthropic model that accepts it with thinking off, and the provider default with thinking on', () => {
    expect(temperatureFor(older, 'off')).toBe(0);
    expect(temperatureFor(older)).toBe(0);
    expect(temperatureFor(older, 'medium')).toBe('provider default');
  });

  it('streamFn sends temperature 0 exactly when temperatureFor says so', async () => {
    expect((await payloadFor(older)).temperature).toBe(0);
    expect(await payloadFor(older, 'medium')).not.toHaveProperty('temperature');
    expect(await payloadFor(sonnet)).not.toHaveProperty('temperature');
  });
});
