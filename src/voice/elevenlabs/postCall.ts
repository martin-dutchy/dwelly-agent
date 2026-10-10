import { createHmac, timingSafeEqual } from 'node:crypto';

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

type Ledger = { tool: string; status: string; ref?: string; args: Record<string, unknown>; evidence?: string[] }[];
type Analysis = {
  call_successful?: string;
  transcript_summary?: string;
  data_collection_results?: Record<string, { value: unknown; rationale?: string }>;
  evaluation_criteria_results?: Record<string, { result: string; rationale?: string }>;
};

/**
 * What a human should look at after a call. The ledger is the truth about actions; ElevenLabs'
 * extraction and evaluation are a second opinion, and disagreements between them are flagged.
 */
export function callFlags(ledger: Ledger, analysis: Analysis = {}): string[] {
  const dc = analysis.data_collection_results ?? {};
  const escalated = (p?: string) => ledger.some((e) => e.tool === 'escalate_to_human' && e.status === 'verified' && (!p || e.args.priority === p));
  return [
    ...ledger.filter((e) => e.status !== 'verified').map((e) => `${e.tool} did not verify: ${e.evidence?.at(-1) ?? ''}`),
    ...Object.entries(analysis.evaluation_criteria_results ?? {})
      .filter(([, r]) => r.result === 'failure')
      .map(([k, r]) => `evaluation "${k}" failed: ${r.rationale ?? ''}`),
    ...(dc.needs_human?.value === true && !escalated() ? ['call says a human is needed but no escalation is in the ledger'] : []),
    ...(dc.safety_issue?.value === true && !escalated('P1') ? ['safety issue described but no verified P1 escalation'] : []),
    ...(dc.unclear_audio?.value === true ? ['caller audio was unclear: check names, dates and amounts against the recording'] : []),
  ];
}
