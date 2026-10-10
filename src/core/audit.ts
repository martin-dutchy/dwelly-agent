import { mkdirSync } from 'node:fs';
import { appendFile } from 'node:fs/promises';
import { join } from 'node:path';

export const CALLS_DIR = process.env.CALLS_DIR ?? join(process.cwd(), 'calls');

export const callDir = (conversationId: string) => {
  const dir = join(CALLS_DIR, conversationId.replace(/[^\w.-]/g, '_'));
  mkdirSync(dir, { recursive: true });
  return dir;
};

// Append-only evidence trail: every tool call, result and error, per conversation.
export function audit(conversationId: string, entry: Record<string, unknown>) {
  const line = JSON.stringify({ ts: new Date().toISOString(), ...entry });
  // Async so audit writes never block the voice agent's audio loop.
  void appendFile(join(callDir(conversationId), 'audit.jsonl'), line + '\n').catch((e) => console.error('[audit]', e));
}
