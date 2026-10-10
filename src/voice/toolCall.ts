import { ActionLedger } from '../agent/ledger.js';
import { verify } from '../agent/verify.js';
import { audit } from '../core/audit.js';
import { type Channel, type ToolResult, executeTool, getTool } from '../core/tools.js';
import { normaliseDate, normalisePostcode } from './spoken.js';

/**
 * Voice adapter field, added to every write tool's schema. ASR gives us no confidence scores,
 * so a write only goes ahead after the agent read the details back and the caller said yes.
 */
export const READBACK_FIELD = 'caller_confirmed_readback';

// One ledger per call: the same read-back discipline as batch cases, keyed by conversation.
const ledgers = new Map<string, ActionLedger>();
export const ledgerFor = (conversationId: string) =>
  ledgers.get(conversationId) ?? (ledgers.set(conversationId, new ActionLedger()), ledgers.get(conversationId)!);

/** Handle one webhook tool call from a voice platform. Never throws: the caller always hears something. */
export async function handleVoiceToolCall(name: string, body: Record<string, unknown>, channel: Channel = 'voice:elevenlabs'): Promise<ToolResult> {
  const { conversation_id, [READBACK_FIELD]: confirmed, ...args } = body;
  const conversationId = typeof conversation_id === 'string' && conversation_id ? conversation_id : 'voice-unknown';
  const tool = getTool(name);
  const started = Date.now();

  if (tool?.kind === 'write' && confirmed !== true) {
    const result = { ok: false, error: 'readback_required', say: 'Read the details back to the caller and get a clear yes before doing this.' };
    audit(conversationId, { type: 'tool_refused', channel, name, args: body, result });
    return result;
  }
  if (typeof args.date_of_birth === 'string') args.date_of_birth = normaliseDate(args.date_of_birth);
  if (typeof args.postcode === 'string') args.postcode = normalisePostcode(args.postcode);

  const result = await executeTool(name, args, { conversationId, channel });
  if (tool?.kind !== 'write') return { ...result, latency_ms: Date.now() - started };

  // Read back every write independently, like the case agent, and only report what verified.
  const v = verify(name, args, result.ok ? result : undefined, { conversationId, channel });
  const entry = ledgerFor(conversationId).record(name, args, result.ok ? undefined : String(result.details ?? result.error), v);
  audit(conversationId, { type: 'ledger', channel, entry, latency_ms: Date.now() - started });
  if (v.status === 'verified') return { ...result, verified: true, ref: v.ref };
  return {
    ok: false,
    verified: false,
    error: 'not_confirmed',
    say:
      name === 'escalate_to_human'
        ? 'The handover did not reach the team. Do not promise a callback; tell the caller our system is having trouble and give them the emergency numbers if this is urgent.'
        : 'That did not go through on our system. Do not tell the caller it is done; apologise and escalate to a colleague.',
  };
}
