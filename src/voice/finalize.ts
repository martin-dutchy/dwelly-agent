import { callFlags } from './elevenlabs/postCall.js';
import { buildCallLog, grade } from './scenarios.js';
import type { CallRow, VoiceStore } from './store.js';

/**
 * After a call: wait for ElevenLabs to finish its analysis, then store the transcript, the grade from
 * our own event log, and the flags. Triggered by the tester page hanging up, the post-call webhook,
 * or the admin pressing "regrade"; it is idempotent, so double triggers are harmless.
 */

const API = process.env.ELEVENLABS_API_BASE ?? 'https://api.elevenlabs.io';
const apiKey = () => process.env.ELEVENLABS_API_KEY || process.env.ELEVEN_API_KEY || '';

type Conversation = {
  status: string;
  transcript?: CallRow['transcript'];
  analysis?: Record<string, unknown>;
  metadata?: { call_duration_secs?: number };
};

export async function fetchConversation(id: string): Promise<Conversation | undefined> {
  const r = await fetch(`${API}/v1/convai/conversations/${encodeURIComponent(id)}`, { headers: { 'xi-api-key': apiKey() } });
  return r.ok ? ((await r.json()) as Conversation) : undefined;
}

export async function fetchAudio(id: string) {
  return fetch(`${API}/v1/convai/conversations/${encodeURIComponent(id)}/audio`, { headers: { 'xi-api-key': apiKey() } });
}

const inFlight = new Set<string>();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function finalizeCall(store: VoiceStore, id: string, { attempts = 12, delayMs = 10_000 } = {}) {
  if (inFlight.has(id)) return;
  inFlight.add(id);
  try {
    const call = await store.getCall(id);
    if (!call) return;
    await store.markEnded(id);
    let conv: Conversation | undefined;
    for (let i = 0; i < attempts; i++) {
      conv = await fetchConversation(id).catch(() => undefined);
      // "done" means ElevenLabs has finished transcript, evaluation and data collection.
      if (conv && ['done', 'failed'].includes(conv.status)) break;
      await sleep(delayMs);
    }
    const log = buildCallLog(await store.events(id), conv?.transcript ?? undefined);
    const g = grade(call.scenario_id, log);
    await store.saveResult(id, {
      status: conv ? 'graded' : 'failed',
      duration_secs: conv?.metadata?.call_duration_secs ?? null,
      passed: g.passed,
      grade: g.results,
      flags: [
        ...(g.twistPlayed === false ? ["twist not played: the caller never raised the case's twist, so this call doesn't test the case (rerun it)"] : []),
        ...callFlags(log.ledger, conv?.analysis),
        ...(conv ? [] : ['ElevenLabs conversation not available yet: regrade later']),
      ],
      transcript: conv?.transcript ?? null,
      analysis: conv?.analysis ?? null,
    });
    console.log(`[voice] graded ${id}: ${g.passed ? 'PASS' : 'FAIL'}`);
  } catch (e) {
    console.error(`[voice] finalize ${id}`, e);
  } finally {
    inFlight.delete(id);
  }
}
