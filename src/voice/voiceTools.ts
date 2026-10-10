import { z } from 'zod';
import type { ToolDef } from '../core/tools.js';
import { READBACK_FIELD } from './toolCall.js';

export type JsonSchema = { type?: string; description?: string; enum?: string[]; properties?: Record<string, JsonSchema>; required?: string[] };

/**
 * The tool surface every voice brain sees: the core tools, plus the read-back flag on writes.
 * Both brains (ElevenLabs-hosted Claude and our pi agent) are built from this, so swapping
 * the brain never changes what the caller can get done.
 */
export function voiceToolSchema(t: ToolDef): JsonSchema & { properties: Record<string, JsonSchema>; required: string[] } {
  const schema = z.toJSONSchema(t.parameters) as JsonSchema;
  const properties: Record<string, JsonSchema> = {};
  for (const [key, p] of Object.entries(schema.properties ?? {})) {
    properties[key] = { type: p.type ?? 'string', description: p.description ?? key, ...(p.enum ? { enum: p.enum } : {}) };
  }
  const required = [...(schema.required ?? [])];
  if (t.kind === 'write') {
    properties[READBACK_FIELD] = { type: 'boolean', description: 'True only after you read the details back and the caller clearly said yes.' };
    required.push(READBACK_FIELD);
  }
  return { type: 'object', properties, required };
}
