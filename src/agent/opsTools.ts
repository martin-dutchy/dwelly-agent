import { z } from 'zod';
import { executeWith } from '../core/executor.js';
import type { ToolContext, ToolDef, ToolResult } from '../core/tools.js';
import { canonical } from './ledger.js';
import type { Verification } from './verify.js';

/**
 * Generic property-management operations for batch cases. Every case gets its own OpsEnv,
 * so parallel cases never share state or reference counters. On the day, swap the bodies
 * for calls to the organisers' API and the verifiers for their read endpoints.
 */

export const STAGES = ['init', 'mp_time', 'mp_time_force', 'visit', 'result', 'double_quotation', 'quote_approved', 'documents', 'completed', 'cancelled'] as const;

type Rec = { id: string; tool: string; args: Record<string, unknown>; at: number };
export type Ticket = { ref: string; stage: string; contractor?: string; visit_window?: string; [k: string]: unknown };
export type OpsState = { tickets: Ticket[]; records: Rec[] };

export type Toolset = {
  tools: ToolDef[];
  execute: (name: string, args: unknown, ctx: ToolContext) => Promise<ToolResult>;
  verify: (name: string, args: Record<string, unknown>, result: ToolResult | undefined, ctx: ToolContext) => Verification;
  state: OpsState;
};

const recipient = {
  recipient_name: z.string().describe('Who the message is for'),
  recipient_role: z.enum(['tenant', 'landlord', 'contractor', 'neighbour', 'third_party', 'internal']).describe('Their role'),
  channel: z.enum(['email', 'sms', 'whatsapp', 'phone_call', 'letter']).describe('Channel; use contact details from the records'),
  contact: z.string().describe('Email address or phone number taken from the CRM record on file'),
};

export function createOpsToolset(seedTickets: Ticket[] = []): Toolset {
  const state: OpsState = { tickets: structuredClone(seedTickets), records: [] };
  let seq = 100;
  const id = (prefix: string) => `${prefix}-${++seq}`;
  const record = (tool: string, args: Record<string, unknown>, prefix: string) => {
    const r = { id: id(prefix), tool, args, at: Date.now() };
    state.records.push(r);
    return r;
  };
  const ticket = (ref: string) => state.tickets.find((t) => t.ref === ref);
  const def = <S extends z.ZodObject>(t: Omit<ToolDef<S>, 'requiresVerification'>) => ({ requiresVerification: false, ...t }) as unknown as ToolDef;

  const tools: ToolDef[] = [
    def({
      name: 'list_tickets',
      description: 'List all maintenance tickets with their current stage.',
      kind: 'read',
      parameters: z.object({}),
      run: () => ({ ok: true, tickets: state.tickets }),
    }),
    def({
      name: 'get_ticket',
      description: 'Fetch one ticket by reference.',
      kind: 'read',
      parameters: z.object({ ref: z.string().describe('Ticket reference') }),
      run: ({ ref }) => (ticket(ref) ? { ok: true, ticket: ticket(ref) } : { ok: false, error: 'not_found' }),
    }),
    def({
      name: 'create_ticket',
      description: 'Open a new maintenance job. Check list_tickets first: never duplicate an open job for the same issue.',
      kind: 'write',
      parameters: z.object({
        property: z.string().describe('Property id or address'),
        tenant: z.string().optional().describe('Tenant id or name'),
        category: z.string().describe('e.g. gas, heating, plumbing, electrical, damp_mould, locks, roof, appliance'),
        severity: z.enum(['emergency', 'urgent', 'routine']),
        description: z.string(),
        related_ticket_ref: z.string().optional(),
      }),
      run: (a) => {
        const ref = id('JOB');
        state.tickets.push({ ref, stage: 'init', ...a });
        return { ok: true, ref, stage: 'init' };
      },
    }),
    def({
      name: 'update_ticket',
      description: 'Move a ticket to another stage and/or add a note (e.g. a tenant changed the access window).',
      kind: 'write',
      parameters: z.object({ ref: z.string(), stage: z.enum(STAGES).optional(), note: z.string().optional() }),
      run: ({ ref, stage, note }) => {
        const t = ticket(ref);
        if (!t) return { ok: false, error: 'not_found' };
        if (stage) t.stage = stage;
        if (note) t.notes = [...((t.notes as string[]) ?? []), note];
        return { ok: true, ref, stage: t.stage };
      },
    }),
    def({
      name: 'cancel_ticket',
      description: 'Cancel a ticket, e.g. a duplicate or a request the customer withdrew.',
      kind: 'write',
      parameters: z.object({ ref: z.string(), reason: z.string() }),
      run: ({ ref, reason }) => {
        const t = ticket(ref);
        if (!t) return { ok: false, error: 'not_found' };
        Object.assign(t, { stage: 'cancelled', cancel_reason: reason });
        return { ok: true, ref, stage: 'cancelled' };
      },
    }),
    def({
      name: 'assign_contractor',
      description: 'Assign a contractor and visit window to a ticket. Respect landlord preferences and spend limits.',
      kind: 'write',
      parameters: z.object({ ticket_ref: z.string(), contractor: z.string(), visit_window: z.string().describe('e.g. 2026-10-11 08:00-12:00') }),
      run: ({ ticket_ref, contractor, visit_window }) => {
        const t = ticket(ticket_ref);
        if (!t) return { ok: false, error: 'not_found' };
        Object.assign(t, { contractor, visit_window, stage: 'visit' });
        return { ok: true, ticket_ref, stage: 'visit', contractor, visit_window };
      },
    }),
    def({
      name: 'send_message',
      description: 'Send a message to a tenant, landlord, contractor or other party. Never disclose personal data to unverified parties.',
      kind: 'write',
      parameters: z.object({ ...recipient, body: z.string().describe('The exact message text') }),
      run: (a) => ({ ok: true, message_id: record('send_message', a, 'MSG').id, status: 'sent' }),
    }),
    def({
      name: 'request_information',
      description: 'Ask someone for specific missing information you need before acting. Use instead of guessing.',
      kind: 'write',
      parameters: z.object({ ...recipient, questions: z.array(z.string()).describe('Specific questions'), why: z.string() }),
      run: (a) => ({ ok: true, request_id: record('request_information', a, 'REQ').id, status: 'sent' }),
    }),
    def({
      name: 'request_landlord_approval',
      description: "Ask the landlord to approve spend or a decision that is theirs to make (above their limit, pets, early termination…).",
      kind: 'write',
      parameters: z.object({
        landlord: z.string(),
        decision_needed: z.string(),
        amount_gbp: z.number().optional(),
        ticket_ref: z.string().optional(),
        options: z.array(z.string()).describe('Options you are offering, with your recommendation first'),
        deadline: z.string().optional(),
      }),
      run: (a) => ({ ok: true, approval_id: record('request_landlord_approval', a, 'APR').id, status: 'requested' }),
    }),
    def({
      name: 'approve_quote',
      description: 'Commit spend by approving a contractor quote. Only within the landlord spend limit or with recorded landlord approval.',
      kind: 'write',
      parameters: z.object({ ticket_ref: z.string(), amount_gbp: z.number(), contractor: z.string(), approval_basis: z.string() }),
      run: (a) => {
        const t = ticket(a.ticket_ref);
        if (t) t.stage = 'quote_approved';
        return { ok: true, approval_id: record('approve_quote', a, 'QAP').id };
      },
    }),
    def({
      name: 'hold_payment',
      description: 'Place a hold on an outgoing payment (landlord payout or contractor invoice) pending verification.',
      kind: 'write',
      parameters: z.object({ payee: z.string(), reason: z.string() }),
      run: (a) => ({ ok: true, hold_id: record('hold_payment', a, 'HOLD').id }),
    }),
    def({
      name: 'update_bank_details',
      description: 'Change the bank account on file for a landlord, contractor or tenant.',
      kind: 'write',
      parameters: z.object({ party: z.string(), sort_code: z.string(), account_number: z.string(), verification_done: z.string() }),
      run: (a) => ({ ok: true, change_id: record('update_bank_details', a, 'BANK').id }),
    }),
    def({
      name: 'add_note',
      description: 'Add an internal note to a tenant, landlord, property or ticket record (e.g. a record conflict to clean up).',
      kind: 'write',
      parameters: z.object({ entity: z.string(), note: z.string() }),
      run: (a) => ({ ok: true, note_id: record('add_note', a, 'NOTE').id }),
    }),
    def({
      name: 'escalate_to_human',
      description:
        'Hand a decision to a human with a packet they can act on in about 3 minutes. Use for emergencies, legal/financial/safeguarding decisions, suspected fraud, unresolvable conflicts or failed actions.',
      kind: 'write',
      parameters: z.object({
        priority: z.enum(['P1', 'P2', 'P3']).describe('P1 = safety/now, P2 = same day, P3 = next working day'),
        team: z.enum(['maintenance', 'compliance', 'accounts', 'legal', 'safeguarding', 'fraud', 'management']),
        reason: z.string(),
        known: z.string().describe('What is established, with sources'),
        missing: z.string().describe('What is unknown or conflicting'),
        options: z.array(z.string()),
        recommendation: z.string(),
        deadline: z.string().optional(),
      }),
      run: (a) => ({ ok: true, escalation_id: record('escalate_to_human', a, 'ESC').id }),
    }),
  ];

  const toolset: Toolset = {
    tools,
    state,
    execute: (name, args, ctx) => executeWith({ tools, state }, name, args, ctx),
    verify: (name, args, result) => {
      // Read back independently of what the write returned.
      if (['create_ticket', 'update_ticket', 'cancel_ticket', 'assign_contractor'].includes(name)) {
        const ref = (result?.ref ?? result?.ticket_ref ?? args.ref ?? args.ticket_ref) as string | undefined;
        const t = ref
          ? ticket(ref)
          : state.tickets.find((x) => x.description === args.description && x.property === args.property);
        if (!t) return { status: 'not_applied', evidence: ref ? `Ticket ${ref} not found on read-back` : 'No matching ticket on read-back' };
        const expected = name === 'cancel_ticket' ? 'cancelled' : name === 'assign_contractor' ? 'visit' : (args.stage as string | undefined);
        if (expected && t.stage !== expected) return { status: 'not_applied', ref: t.ref, evidence: `Ticket ${t.ref} is at stage ${t.stage}, expected ${expected}` };
        if (name === 'assign_contractor' && t.contractor !== args.contractor)
          return { status: 'not_applied', ref: t.ref, evidence: `Ticket ${t.ref} contractor is ${t.contractor ?? 'none'}` };
        return { status: 'verified', ref: t.ref, evidence: `Ticket ${t.ref} read back at stage ${t.stage}` };
      }
      const rid = Object.entries(result ?? {}).find(([k]) => k.endsWith('_id'))?.[1] as string | undefined;
      const rec = rid
        ? state.records.find((r) => r.id === rid)
        : state.records.find((r) => r.tool === name && canonical(r.args) === canonical(args));
      return rec
        ? { status: 'verified', ref: rec.id, evidence: `${rec.id} found in the ${name} log` }
        : { status: 'not_applied', evidence: rid ? `${rid} was returned but is not in the ${name} log` : `No ${name} record on read-back` };
    },
  };
  return toolset;
}
