import { today } from '../core/store.js';
import { type ToolContext, type ToolResult, worldOf } from '../core/tools.js';

export type Verification = {
  status: 'verified' | 'not_applied' | 'unverifiable';
  evidence: string;
  ref?: string;
};

type Verifier = (args: Record<string, any>, result: ToolResult | undefined, ctx: ToolContext) => Verification;

/**
 * Deterministic read-back checks, one per state-changing tool. They never trust the write's
 * own response: they look the effect up independently. On the day, point these at the
 * organisers' GET endpoints (e.g. GET /tickets/:ref after POST /tickets).
 */
export const verifiers: Record<string, Verifier> = {
  create_repair_ticket: (args, result, ctx) => {
    const db = worldOf(ctx);
    const ref = result?.ticket_ref as string | undefined;
    const ticket = ref
      ? db.tickets.find((t) => t.ref === ref)
      : db.tickets.find(
          (t) => t.tenant_id === args.tenant_id && t.category === args.category && t.created === today() && t.status === 'open',
        );
    if (!ticket) {
      return {
        status: 'not_applied',
        evidence: ref ? `API returned ${ref} but no ticket with that reference exists` : 'No matching open ticket exists',
      };
    }
    const mismatched = (['category', 'urgency'] as const).filter((k) => ticket[k] !== args[k]);
    if (mismatched.length) {
      return { status: 'not_applied', ref: ticket.ref, evidence: `Ticket ${ticket.ref} exists but ${mismatched.join(', ')} differ from the request` };
    }
    return { status: 'verified', ref: ticket.ref, evidence: `Ticket ${ticket.ref} read back: ${ticket.category}/${ticket.urgency}/${ticket.status}` };
  },

  escalate_to_human: (args, result, ctx) => {
    const ref = result?.escalation_ref as string | undefined;
    const esc = worldOf(ctx).escalations.find(
      (e) => (ref ? e.ref === ref : true) && e.conversation_id === ctx.conversationId && e.reason === args.reason,
    );
    return esc
      ? { status: 'verified', ref: esc.ref, evidence: `Escalation ${esc.ref} (${esc.priority}) is in the human queue` }
      : { status: 'not_applied', evidence: 'No escalation found in the human queue for this case' };
  },
};

export function verify(tool: string, args: Record<string, any>, result: ToolResult | undefined, ctx: ToolContext): Verification {
  const v = verifiers[tool];
  return v ? v(args, result, ctx) : { status: 'unverifiable', evidence: `No read-back available for ${tool}` };
}
