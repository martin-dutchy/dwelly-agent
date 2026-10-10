import { ActionLedger } from '../agent/ledger.js';
import { verify } from '../agent/verify.js';
import { audit } from '../core/audit.js';
import { executeWith } from '../core/executor.js';
import { newWorld } from '../core/store.js';
import { type Channel, type ToolDef, type ToolResult, isVerified, restoreVerified, tools as coreTools } from '../core/tools.js';
import { type VoiceWorld, caseTools, verifyCaseTool } from './caseTools.js';
import { normaliseDate, normalisePostcode } from './spoken.js';

/**
 * Voice adapter field, added to every write tool's schema. ASR gives us no confidence scores,
 * so a write only goes ahead after the agent read the details back and the caller said yes.
 */
export const READBACK_FIELD = 'caller_confirmed_readback';

/** Everything a voice call can do: the tenant-line tools plus the maintenance-case tools. */
export const voiceTools: ToolDef[] = [...coreTools, ...caseTools];
const getVoiceTool = (name: string) => voiceTools.find((t) => t.name === name);

// Which scenario each conversation plays, so its world can be seeded from that case.
// Set on registration (server) or from the scenario_id dynamic variable on the first tool call.
type Seeder = (scenarioId: string | undefined) => VoiceWorld;
let seedWorld: Seeder = () => ({ ...newWorld(), case_log: [] });
export const setWorldSeeder = (s: Seeder) => (seedWorld = s);
const scenarioOf = new Map<string, string>();
export const registerScenario = (conversationId: string, scenarioId: string) => scenarioOf.set(conversationId, scenarioId);

// Per call: its own world (concurrent testers never see each other's tickets) and its own ledger
// (the same read-back discipline as batch cases). Dropped after CALL_TTL_MS.
const CALL_TTL_MS = 3 * 60 * 60_000;
const calls = new Map<string, { world: VoiceWorld; ledger: ActionLedger; seen: number; found: Set<string> }>();
function callState(conversationId: string) {
  const now = Date.now();
  for (const [id, c] of calls) if (now - c.seen > CALL_TTL_MS) (calls.delete(id), scenarioOf.delete(id));
  const c = calls.get(conversationId) ?? { world: seedWorld(scenarioOf.get(conversationId)), ledger: new ActionLedger(), seen: now, found: new Set<string>() };
  c.seen = now;
  calls.set(conversationId, c);
  return c;
}
export const ledgerFor = (conversationId: string) => callState(conversationId).ledger;

// Per-call state lives in memory, so a deploy mid-call used to forget a caller's verified identity
// (seen 10 Oct: a verified tenant's ticket refused as "not verified"). On first sight of a call after a
// restart, replay the identity facts from the durable event log.
type PastEvent = { type: string; name?: string; args?: Record<string, unknown>; result?: Record<string, unknown> };
let loadEvents: ((conversationId: string) => Promise<PastEvent[]>) | undefined;
export const setEventLoader = (f: typeof loadEvents) => (loadEvents = f);
async function hydrate(conversationId: string) {
  if (calls.has(conversationId) || !loadEvents) return;
  const past = await loadEvents(conversationId).catch(() => []);
  const state = callState(conversationId);
  for (const e of past) {
    if (e.type !== 'tool') continue;
    if (e.name === 'find_tenant' && Array.isArray(e.result?.matches)) for (const m of e.result.matches as { tenant_id: string }[]) state.found.add(m.tenant_id);
    if (e.name === 'verify_identity' && e.result?.verified === true) restoreVerified(conversationId, String(e.args?.tenant_id));
  }
}

/** Handle one webhook tool call from a voice platform. Never throws: the caller always hears something. */
export async function handleVoiceToolCall(name: string, body: Record<string, unknown>, channel: Channel = 'voice:elevenlabs'): Promise<ToolResult> {
  const { conversation_id, scenario_id, [READBACK_FIELD]: confirmed, ...args } = body;
  const conversationId = typeof conversation_id === 'string' && conversation_id ? conversation_id : 'voice-unknown';
  if (typeof scenario_id === 'string' && scenario_id && !scenarioOf.has(conversationId)) registerScenario(conversationId, scenario_id);
  const tool = getVoiceTool(name);
  const started = Date.now();

  if (tool?.kind === 'write' && confirmed !== true) {
    const result = { ok: false, error: 'readback_required', say: 'Read the details back to the caller and get a clear yes before doing this.' };
    audit(conversationId, { type: 'tool_refused', channel, name, args: body, result });
    return result;
  }
  if (typeof args.date_of_birth === 'string') args.date_of_birth = normaliseDate(args.date_of_birth);
  if (typeof args.postcode === 'string') args.postcode = normalisePostcode(args.postcode);
  if (typeof args.date === 'string') args.date = normaliseDate(args.date);
  if (typeof args.next_date === 'string') args.next_date = normaliseDate(args.next_date);

  await hydrate(conversationId);
  const state = callState(conversationId);
  const { world } = state;
  const ctx = { conversationId, channel, world };

  // Never book chargeable work on a contractor's quote without the landlord's approval in this call
  // (seen 10 Oct: a £150 element repair booked for "tomorrow" straight off the contractor's quote).
  if (name === 'record_appointment' && args.confirmed_by === 'contractor') {
    const quoted = state.ledger.entries.some((e) => e.tool === 'record_contractor_update' && e.status === 'verified' && (e.args.status === 'quote_given' || e.args.status === 'needs_quote' || typeof e.args.quote_amount_gbp === 'number'));
    const approved = state.ledger.entries.some((e) => e.tool === 'record_landlord_decision' && e.status === 'verified' && e.args.decision === 'approve');
    if (quoted && !approved) {
      const result = { ok: false, error: 'needs_landlord_approval', say: "This work has a quote but no landlord approval, so don't book it. Tell the contractor we'll take the quote to the landlord and come back to them; record anything else as a note." };
      audit(conversationId, { type: 'tool_refused', channel, name, args: body, result });
      return result;
    }
  }

  // A tenant id must come from find_tenant in this call: a guessed id checks the caller against
  // someone else's record and fails a genuine caller (seen 10 Oct: T-1001 used for Jonah Okafor).
  if (name === 'verify_identity' && !state.found.has(String(args.tenant_id))) {
    const result = { ok: false, error: 'unknown_tenant_id', say: 'Look the caller up with find_tenant first (name and postcode or phone), then verify with the tenant_id it returns. Never guess a tenant_id.' };
    audit(conversationId, { type: 'tool_refused', channel, name, args: body, result });
    return result;
  }
  const result = await executeWith(
    {
      tools: voiceTools,
      state: world,
      guard: (t, a, c) =>
        t.requiresVerification && !isVerified(c.conversationId, a.tenant_id as string | undefined)
          ? { ok: false, error: 'not_verified', say: 'Identity must be verified with verify_identity first.' }
          : undefined,
    },
    name,
    args,
    ctx,
  );
  if (name === 'find_tenant' && Array.isArray(result.matches)) for (const m of result.matches as { tenant_id: string }[]) state.found.add(m.tenant_id);
  if (tool?.kind !== 'write') return { ...result, latency_ms: Date.now() - started };

  // Read back every write independently, like the case agent, and only report what verified.
  const v = verifyCaseTool(name, result.ok ? result : undefined, ctx) ?? verify(name, args, result.ok ? result : undefined, ctx);
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
