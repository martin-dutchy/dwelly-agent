import type { StreamFn } from '@earendil-works/pi-agent-core';
import { type Api, type Model, createModels } from '@earendil-works/pi-ai';
import { anthropicProvider } from '@earendil-works/pi-ai/providers/anthropic';
import { pdfBlocksToDocuments } from './attachments.js';

const models = createModels();
models.setProvider(anthropicProvider());

export function claude(id: string): Model<Api> {
  const model = models.getModel('anthropic', id);
  if (!model) throw new Error(`Unknown Claude model ${id}`);
  return model;
}

/** Sampling temperature for every model call, so reruns of a case differ as little as the provider allows. */
export const TEMPERATURE = 0;
export type Temperature = number | 'provider default';

/**
 * The temperature a request to `model` actually carries. Anthropic drops it when thinking is on, when the model
 * takes mid-conversation effort, or when the model rejects it (`compat.supportsTemperature: false`, e.g. the 5.5 models).
 */
export function temperatureFor(model: Model<Api>, thinking?: string): Temperature {
  const compat = model.compat as { supportsTemperature?: boolean; supportsMidConvoEffort?: boolean } | undefined;
  if (compat?.supportsTemperature === false) return 'provider default';
  if (model.api === 'anthropic-messages' && ((thinking && thinking !== 'off') || compat?.supportsMidConvoEffort === true)) return 'provider default';
  return TEMPERATURE;
}

/**
 * pi only sends ANTHROPIC_WORKSPACE_ID for federated auth; keys that aren't scoped to a
 * workspace need the anthropic-workspace-id header on every request.
 */
// Optional cap on in-flight requests per model (LLM_CONCURRENCY). Unset = no cap.
// Rate-limit errors are retried with backoff by the case agent and the judge, so a cap is only
// needed if a key's connection limit makes those retries pile up.
const MAX_IN_FLIGHT = Number(process.env.LLM_CONCURRENCY) || Infinity;
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
    const onPayload = async (payload: unknown, m: Model<Api>) => pdfBlocksToDocuments((await options?.onPayload?.(payload, m)) ?? payload);
    const temperature = options?.temperature ?? temperatureFor(model, options?.reasoning);
    const stream = models.streamSimple(model, context, { ...options, ...(typeof temperature === 'number' && { temperature }), headers, onPayload });
    void stream.result().finally(() => release(model.id));
    return stream;
  } catch (e) {
    release(model.id);
    throw e;
  }
};
