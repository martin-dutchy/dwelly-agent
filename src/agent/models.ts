import type { StreamFn } from '@earendil-works/pi-agent-core';
import { type Api, type Model, createModels } from '@earendil-works/pi-ai';
import { anthropicProvider } from '@earendil-works/pi-ai/providers/anthropic';

const models = createModels();
models.setProvider(anthropicProvider());

export function claude(id: string): Model<Api> {
  const model = models.getModel('anthropic', id);
  if (!model) throw new Error(`Unknown Claude model ${id}`);
  return model;
}

/**
 * pi only sends ANTHROPIC_WORKSPACE_ID for federated auth; keys that aren't scoped to a
 * workspace need the anthropic-workspace-id header on every request.
 */
// Our API key allows only 2 concurrent connections PER MODEL (measured 2026-10-09).
// Cap in-flight requests per model across all cases in this process; extra calls queue here.
const MAX_IN_FLIGHT = Number(process.env.LLM_CONCURRENCY ?? 2);
const slots = new Map<string, { inFlight: number; waiting: (() => void)[] }>();
const slot = (id: string) => slots.get(id) ?? (slots.set(id, { inFlight: 0, waiting: [] }), slots.get(id)!);
const acquire = (id: string) => {
  const s = slot(id);
  return s.inFlight < MAX_IN_FLIGHT ? (s.inFlight++, Promise.resolve()) : new Promise<void>((r) => s.waiting.push(() => (s.inFlight++, r())));
};
const release = (id: string) => {
  const s = slot(id);
  s.inFlight--;
  s.waiting.shift()?.();
};

export const streamFn: StreamFn = async (model, context, options) => {
  const workspace = process.env.ANTHROPIC_WORKSPACE_ID;
  const headers = workspace ? { ...options?.headers, 'anthropic-workspace-id': workspace } : options?.headers;
  await acquire(model.id);
  try {
    const stream = models.streamSimple(model, context, { ...options, headers });
    void stream.result().finally(() => release(model.id));
    return stream;
  } catch (e) {
    release(model.id);
    throw e;
  }
};
