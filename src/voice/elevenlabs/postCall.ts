import { createHmac, timingSafeEqual } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { audit, callDir } from '../../core/audit.js';
import { ledgerFor } from '../toolCall.js';

const TOLERANCE_S = 30 * 60;

/** `ElevenLabs-Signature: t=<unix>,v0=<hex hmac-sha256 of "<t>.<raw body>">`. Needs the raw body, not parsed JSON. */
export function verifySignature(rawBody: string, header: string | undefined, secret: string, nowS = Date.now() / 1000): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(',').map((p) => p.trim().split('=') as [string, string]));
  const t = Number(parts.t);
  if (!parts.v0 || !Number.isFinite(t) || Math.abs(nowS - t) > TOLERANCE_S) return false;
  const expected = createHmac('sha256', secret).update(`${t}.${rawBody}`).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(parts.v0);
  return a.length === b.length && timingSafeEqual(a, b);
}

type Turn = { role: 'user' | 'agent'; message: string | null; time_in_call_secs?: number; interrupted?: boolean; ignored_as_backchannel?: boolean };
type PostCallEvent = {
  type: string;
  data: {
    conversation_id: string;
    transcript?: Turn[];
    metadata?: Record<string, unknown>;
    analysis?: {
      call_successful?: string;
      transcript_summary?: string;
      data_collection_results?: Record<string, { value: unknown; rationale?: string }>;
      evaluation_criteria_results?: Record<string, { result: string; rationale?: string }>;
    };
  };
};

/**
 * Turn a finished call into case evidence: the transcript, what ElevenLabs extracted, and what our
 * ledger says actually happened. The ledger wins; disagreements are flagged for a human.
 */
export function recordCall(event: PostCallEvent) {
  const { conversation_id: id, transcript = [], analysis = {} } = event.data;
  const dir = callDir(id);
  writeFileSync(join(dir, 'post_call.json'), JSON.stringify(event, null, 2));

  const ledger = ledgerFor(id).entries;
  const dc = analysis.data_collection_results ?? {};
  const failedCriteria = Object.entries(analysis.evaluation_criteria_results ?? {}).filter(([, r]) => r.result === 'failure');
  const flags = [
    ...ledger.filter((e) => e.status !== 'verified').map((e) => `${e.id} ${e.tool} did not verify: ${e.evidence.at(-1)}`),
    ...failedCriteria.map(([k, r]) => `evaluation "${k}" failed: ${r.rationale ?? ''}`),
    ...(dc.needs_human?.value === true && !ledger.some((e) => e.tool === 'escalate_to_human' && e.status === 'verified')
      ? ['call says a human is needed but no escalation is in the ledger']
      : []),
    ...(dc.safety_issue?.value === true && !ledger.some((e) => e.tool === 'escalate_to_human' && e.status === 'verified' && e.args.priority === 'P1')
      ? ['safety issue described but no verified P1 escalation']
      : []),
    ...(dc.unclear_audio?.value === true ? ['caller audio was unclear: check names, dates and amounts against the recording'] : []),
  ];

  const lines = transcript
    .filter((t) => t.message && !t.ignored_as_backchannel)
    .map((t) => `- **${t.role}**${t.interrupted ? ' (interrupted)' : ''}: ${t.message}`);
  const report = [
    `# Call ${id}`,
    '',
    `**Summary:** ${analysis.transcript_summary ?? '(none)'}`,
    `**Call successful (ElevenLabs):** ${analysis.call_successful ?? 'unknown'}`,
    '',
    '## Actions (from the verified ledger)',
    ...(ledger.length ? ledger.map((e) => `- ${e.id} ${e.tool}: ${e.status}${e.ref ? ` (${e.ref})` : ''}`) : ['- none']),
    '',
    '## Needs a human look',
    ...(flags.length ? flags.map((f) => `- ${f}`) : ['- nothing flagged']),
    '',
    '## Extracted',
    ...Object.entries(dc).map(([k, v]) => `- ${k}: ${JSON.stringify(v.value)}`),
    '',
    '## Transcript',
    ...lines,
    '',
  ].join('\n');
  writeFileSync(join(dir, 'CALL.md'), report);
  audit(id, { type: 'post_call', flags });
  return { dir, flags };
}
