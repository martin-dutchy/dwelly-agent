// Optional judge backend on the Cursor SDK, billed to the caller's Cursor plan instead of the Anthropic key.
// Select it with a "cursor:" model id, e.g. pnpm eval --model cursor:composer-2.5. Offline grading only:
// the case agent and the Reality Test run never use it.
import { Agent } from '@cursor/sdk';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { z } from 'zod';

const PREFIX = 'cursor:';
export const isCursorModel = (id: string) => id.startsWith(PREFIX);

/** First JSON object in a reply, with or without a ```json fence around it. */
export function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1];
  const body = fenced ?? text;
  const start = body.indexOf('{');
  const end = body.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('no JSON object in the reply');
  return JSON.parse(body.slice(start, end + 1));
}

/**
 * One text-only Cursor agent run whose reply must be JSON matching `schema`. Runs in an empty temp folder with no
 * tools, so the model sees the prompt and nothing from this repo.
 */
export async function cursorJson<T>(modelId: string, systemPrompt: string, message: string, schema: z.ZodType<T>): Promise<T> {
  const apiKey = process.env.CURSOR_API_KEY;
  if (!apiKey) throw new Error('CURSOR_API_KEY is not set (create one under Cursor Dashboard → Integrations)');
  const cwd = mkdtempSync(join(tmpdir(), 'cursor-judge-'));
  try {
    // The local runtime rejects the systemPrompt option, so the instructions lead the message.
    const instructions = `${systemPrompt}\nReply with a single JSON object and nothing else. It must match this JSON Schema:\n${JSON.stringify(z.toJSONSchema(schema))}`;
    const result = await Agent.prompt(`<instructions>\n${instructions}\n</instructions>\n\n${message}`, {
      apiKey,
      model: { id: modelId.slice(PREFIX.length) },
      tools: [],
      local: { cwd },
    });
    if (result.status !== 'finished') throw new Error(`cursor run ${result.id} ${result.status}: ${result.error?.message ?? 'no detail'}`);
    return schema.parse(extractJson(result.result ?? ''));
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
}
