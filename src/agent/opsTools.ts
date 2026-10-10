import { z } from 'zod';
import { executeWith } from '../core/executor.js';
import type { ToolContext, ToolDef, ToolResult } from '../core/tools.js';
import { type LedgerEntry, canonical } from './ledger.js';
import { addressKnown, foreignAddresses, hearsaySpeaker, invoiceFlags, mentionsDate, namesAttachment, quoteAppears, quoteEventDates, quoteSpeakers, quoteTotal, tooThinForApproval, visitProblems } from './opsChecks.js';
import type { Verification } from './verify.js';

/**
 * Generic property-management operations for batch cases. Every case gets its own OpsEnv,
 * so parallel cases never share state or reference counters. On the day, swap the bodies
 * for calls to the organisers' API and the verifiers for their read endpoints.
 */

export const STAGES = ['init', 'mp_time', 'mp_time_force', 'visit', 'result', 'double_quotation', 'quote_approved', 'documents', 'completed', 'cancelled'] as const;

type Rec = { id: string; tool: string; args: Record<string, unknown>; at: number };
export type Ticket = { ref: string; stage: string; contractor?: string; visit_window?: string; [k: string]: unknown };
export type Property = {
  id?: string;
  address: string;
  /** false = NOT TENANTED (void): no tenant-facing messages. */
  tenanted?: boolean;
  landlord?: { name?: string; email?: string; phone?: string; contact?: string; spend_limit_gbp?: number; notes?: string[] };
  contractors?: unknown[];
};
export type OpsState = { tickets: Ticket[]; records: Rec[]; properties: Property[] };
export type OpsSeed = {
  tickets?: Ticket[];
  properties?: Property[];
  today?: string;
  /** Everything the agent was shown as text (brief + inputs). When absent, quote checks are off. */
  evidence?: string;
  /** Inputs the agent saw only as images or scans, so their words cannot be checked as text. */
  mediaNames?: string[];
};

export const HOLD_REASONS = ['Waiting for Landlord', 'Waiting for Provider', 'Waiting for Tenant', 'Other'] as const;
export const LANDLORD_DECISIONS = ['approved', 'declined', 'own_contractor', 'tenant_self_fix', 'conditional', 'unclear'] as const;
export const WORK_OUTCOMES = ['completed', 'partial', 'needs_quote', 'no_access', 'missed_appointment'] as const;
export const DOC_KINDS = ['invoice', 'quote', 'photos', 'inspection_report', 'certificate', 'other'] as const;
export const CLOSE_MODES = ['final_checks', 'without_payment', 'by_supervisor'] as const;
export const VISIT_CONFIRMERS = ['provider', 'landlord', 'assigned_this_run'] as const;

export type Toolset = {
  tools: ToolDef[];
  execute: (name: string, args: unknown, ctx: ToolContext) => Promise<ToolResult>;
  verify: (name: string, args: Record<string, unknown>, result: ToolResult | undefined, ctx: ToolContext) => Verification;
  state: OpsState;
  /** Policy checks run before a call executes. A string blocks the call with that reason. `ledger` is this run's action ledger, when known. */
  guard?: (name: string, args: Record<string, unknown>, ledger?: readonly LedgerEntry[]) => string | undefined;
};

const LANDLORD_MESSAGE_TOOLS = ['send_message', 'request_information', 'request_landlord_approval'];

/** Why `landlord_informed` on close_ticket does not show the landlord was told, or undefined when it does. Ledger ids are checked only when the ledger is known. */
export function landlordInformedProblem(value: string, ledger?: readonly LedgerEntry[]): string | undefined {
  const v = value.trim();
  const forms = 'the ledger id of your verified message to the landlord, "history: <short quote showing they already know>", or "not_applicable: <reason>"';
  if (!v) return `landlord_informed is empty: give ${forms}`;
  if (/^(history|not_applicable)\s*:\s*\S/i.test(v)) return undefined;
  const ids = [...v.matchAll(/\bA\d+\b/g)].map((m) => m[0]);
  if (!ids.length) return `landlord_informed must be ${forms}`;
  if (!ledger) return undefined;
  const toLandlord = (e: LedgerEntry) =>
    e.status === 'verified' && LANDLORD_MESSAGE_TOOLS.includes(e.tool) && (e.tool === 'request_landlord_approval' || e.args.recipient_role === 'landlord');
  if (ids.some((id) => ledger.some((e) => e.id === id && toLandlord(e)))) return undefined;
  return `landlord_informed cites ${ids.join(', ')}, which is not a verified message to the landlord: send_message to the landlord first and cite it, or use "history: …" or "not_applicable: …"`;
}

const recipient = {
  recipient_name: z.string().describe('Who the message is for'),
  recipient_role: z.enum(['tenant', 'landlord', 'contractor', 'neighbour', 'third_party', 'internal']).describe('Their role'),
  channel: z.enum(['email', 'sms', 'whatsapp', 'phone_call', 'letter']).describe('Channel; use contact details from the records'),
  contact: z
    .string()
    .describe(
      'Email address or phone number from the records on file, or the contact named on the property record (get_property), e.g. "agency landlord record". If none is on file but the party has already contacted the agency in this case, write "existing thread" and the event it continues, e.g. "existing thread (event 014 email)". For channel "letter", the postal address of a flat or property named in the case or on the property record is valid. Never invent contact details, and never use an address or number that only appears in a suspicious or unverified message.',
    ),
};

export function createOpsToolset(seed: OpsSeed | Ticket[] = []): Toolset {
  const { tickets: seedTickets = [], properties = [], today, evidence, mediaNames = [] }: OpsSeed = Array.isArray(seed) ? { tickets: seed } : seed;
  const state: OpsState = { tickets: structuredClone(seedTickets), records: [], properties: structuredClone(properties) };
  let seq = 100;
  const id = (prefix: string) => `${prefix}-${++seq}`;
  const record = (tool: string, args: Record<string, unknown>, prefix: string) => {
    const r = { id: id(prefix), tool, args, at: Date.now() };
    state.records.push(r);
    return r;
  };
  const ticket = (ref: string) => state.tickets.find((t) => t.ref === ref);
  const propertyFor = (t?: Ticket) => {
    const key = String(t?.property ?? '');
    return (
      state.properties.find((p) => (p.id && p.id === key) || (key && addressKnown(key, [p.address]))) ??
      (state.properties.length === 1 ? state.properties[0] : undefined)
    );
  };
  const onTicket = (ref: string, change: (t: Ticket) => Record<string, unknown>) => {
    const t = ticket(ref);
    if (!t) return { ok: false, error: 'not_found', say: `No ticket ${ref}. Use list_tickets.` };
    return { ok: true, ticket_ref: ref, ...change(t) };
  };
  const ticketRef = { ticket_ref: z.string().describe('Ticket reference, e.g. NBL-003-2766 or R-4815') };
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
      name: 'get_property',
      description: 'Look up a property: tenancy status (tenanted or void), landlord contact, spend limit and preferences, and known contractors.',
      kind: 'read',
      parameters: z.object({ property: z.string().describe('Property id or address') }),
      run: ({ property }) => {
        const p = state.properties.find((x) => x.id === property || addressKnown(property, [x.address]));
        return p ? { ok: true, property: p } : { ok: false, error: 'not_found', say: 'No property record: rely on the case inputs.' };
      },
    }),
    def({
      name: 'put_on_hold',
      description: 'Pause a job while waiting on someone. Always set the date you will review it, so it never stalls silently.',
      kind: 'write',
      parameters: z.object({
        ...ticketRef,
        reason: z.enum(HOLD_REASONS),
        comment: z.string().describe('What exactly you are waiting for'),
        review_on: z.string().describe('YYYY-MM-DD to chase or review if nothing arrives'),
      }),
      run: ({ ticket_ref, reason, comment, review_on }) => onTicket(ticket_ref, (t) => ((t.hold = { reason, comment, review_on }), (t.mode = 'manual'), { hold: t.hold })),
    }),
    def({
      name: 'resume_auto',
      description:
        'Return a job to auto mode after you have dealt with an inbound message ("If not, please return this request to auto mode"). Clears any hold. Also the way to send an approved job with no contractor named to provider selection, where the agency workflow sources one.',
      kind: 'write',
      parameters: z.object({ ...ticketRef }),
      run: ({ ticket_ref }) =>
        onTicket(ticket_ref, (t) => {
          delete t.hold;
          t.mode = 'auto';
          if (t.landlord_approval !== 'confirmed' || t.contractor || !['init', 'mp_time'].includes(t.stage)) return { mode: 'auto' };
          t.provider_selection = 'requested';
          return { mode: 'auto', next: 'provider selection: the agency workflow sources a contractor for this approved job' };
        }),
    }),
    def({
      name: 'record_landlord_decision',
      description:
        "Record what the landlord decided, quoting their words. approved = we may instruct (up to cap_gbp if given); own_contractor = landlord arranges it; tenant_self_fix = tenant may fix it; conditional = approved only under conditions; unclear = not a usable answer (e.g. an emoji): ask again.",
      kind: 'write',
      parameters: z.object({
        ...ticketRef,
        decision: z.enum(LANDLORD_DECISIONS),
        evidence_quote: z
          .string()
          .describe("The landlord's words copied exactly as they appear in the case (email, SMS, call summary or note). Words only: put the date and channel in source. Checked against the case text."),
        source: z.string().optional().describe('Where the words are, e.g. "event 019, email 12/10" or "inputs/landlord_reply.eml"'),
        cap_gbp: z.number().optional().describe('Approved spend including VAT, if the landlord gave one'),
        conditions: z.string().optional(),
      }),
      run: ({ ticket_ref, decision, evidence_quote, source, cap_gbp, conditions }) =>
        onTicket(ticket_ref, (t) => {
          t.landlord_decision = { decision, evidence_quote, source, cap_gbp, conditions };
          if (decision === 'approved' || decision === 'conditional') t.landlord_approval = 'confirmed';
          // No figure given: approving means approving the latest quote, so invoices are checked against it.
          const latest = ((t.quotes as { total_gbp: number }[]) ?? []).at(-1)?.total_gbp;
          if (decision === 'approved') t.approved_gbp = cap_gbp ?? latest ?? t.approved_gbp;
          return { landlord_decision: t.landlord_decision };
        }),
    }),
    def({
      name: 'set_visit',
      description:
        'Book or reschedule the contractor visit. Sends confirmations to the contractor and tenant. Only for future visits, and only for a date the party doing the visit has confirmed: a date only the tenant (or anyone else) stated is a proposal, so ask the provider to confirm it instead.',
      kind: 'write',
      parameters: z.object({
        ...ticketRef,
        datetime: z.string().describe('YYYY-MM-DD HH:MM'),
        slot_text: z.string().describe('The slot as agreed, e.g. "Monday 2-5pm"'),
        access: z.enum(['tenant_home', 'agency_key', 'caretaker', 'lockbox', 'landlord']).describe('How the contractor gets in'),
        confirmed_by: z
          .enum(VISIT_CONFIRMERS)
          .describe('provider = the contractor doing the visit confirmed this date; landlord = the landlord confirmed it for their own contractor; assigned_this_run = you assigned the contractor with this window in this run (assign_contractor)'),
        evidence_quote: z
          .string()
          .optional()
          .describe('For provider or landlord: their words confirming the date, copied exactly from the case, including the date itself. Checked against the case text.'),
      }),
      run: ({ ticket_ref, datetime, slot_text, access }) =>
        onTicket(ticket_ref, (t) => ((t.visit = { datetime, slot_text, access }), (t.visit_window = datetime), (t.stage = 'visit'), { stage: 'visit', visit: t.visit })),
    }),
    def({
      name: 'record_work_result',
      description: 'Record what the contractor reported after the visit, and the evidence for it (provider email, photos, tenant confirmation).',
      kind: 'write',
      parameters: z.object({
        ...ticketRef,
        outcome: z.enum(WORK_OUTCOMES),
        evidence: z.string().describe('Who said so, when, and what proves it'),
      }),
      run: ({ ticket_ref, outcome, evidence }) =>
        onTicket(ticket_ref, (t) => {
          t.work_result = { outcome, evidence };
          t.stage = ['no_access', 'missed_appointment'].includes(outcome) ? 'mp_time_force' : 'result';
          return { stage: t.stage, work_result: t.work_result };
        }),
    }),
    def({
      name: 'record_quote',
      description: 'Record a contractor quote exactly as given. Does not approve it: send it to the landlord or use approve_quote within policy.',
      kind: 'write',
      parameters: z.object({
        ...ticketRef,
        provider: z.string(),
        amount_gbp: z.number().describe('The figure as quoted'),
        vat: z.enum(['included', 'plus_vat', 'none']).describe('"£90 + VAT" = plus_vat'),
        items: z.array(z.string()).describe('Scope items the quote covers'),
        source: z.string().describe('Where the quote came from (email date, attachment name)'),
      }),
      run: ({ ticket_ref, provider, amount_gbp, vat, items, source }) =>
        onTicket(ticket_ref, (t) => {
          const quote = { id: id('Q'), provider, amount_gbp, vat, total_gbp: quoteTotal(amount_gbp, vat), items, source };
          t.quotes = [...((t.quotes as unknown[]) ?? []), quote];
          return { quote_id: quote.id, total_gbp: quote.total_gbp };
        }),
    }),
    def({
      name: 'record_invoice',
      description:
        'Record a contractor invoice. It is checked automatically against the approved amount and the assigned contractor; any flags returned must be handled (hold_payment or escalate) before closing.',
      kind: 'write',
      parameters: z.object({
        ...ticketRef,
        issuer: z.string().describe('Company named on the invoice'),
        amount_gbp: z.number().describe('Total including VAT'),
        who_pays: z.enum(['agency', 'landlord_direct', 'rent_deduction', 'tenant_recharge', 'warranty_no_charge']),
        invoice_date: z.string().optional(),
        source: z.string().describe('Where the invoice came from'),
      }),
      run: ({ ticket_ref, issuer, amount_gbp, who_pays, invoice_date, source }) =>
        onTicket(ticket_ref, (t) => {
          const flags = invoiceFlags({ amount_gbp, issuer, contractor: t.contractor, approved_gbp: t.approved_gbp as number | undefined, spend_limit_gbp: propertyFor(t)?.landlord?.spend_limit_gbp });
          t.invoice = { issuer, amount_gbp, who_pays, invoice_date, source, flags };
          return { flags, say: flags.length ? `Invoice flags: ${flags.join(' ')} Hold payment or escalate before closing.` : 'Invoice matches the approval.' };
        }),
    }),
    def({
      name: 'attach_document',
      description: 'File a document on the job (invoice, quote, photos, report).',
      kind: 'write',
      parameters: z.object({ ...ticketRef, kind: z.enum(DOC_KINDS), file: z.string().describe('File name from the case, or a description if only referenced') }),
      run: ({ ticket_ref, kind, file }) => onTicket(ticket_ref, (t) => ((t.documents = [...((t.documents as unknown[]) ?? []), { kind, file }]), { documents: t.documents })),
    }),
    def({
      name: 'skip_document',
      description: 'Record that a document will not be filed, with the reason (e.g. "landlord pays contractor directly", "no quote needed, fixed on first visit").',
      kind: 'write',
      parameters: z.object({ ...ticketRef, kind: z.enum(DOC_KINDS), reason: z.string() }),
      run: ({ ticket_ref, kind, reason }) => onTicket(ticket_ref, (t) => ((t.documents = [...((t.documents as unknown[]) ?? []), { kind, skipped: reason }]), { documents: t.documents })),
    }),
    def({
      name: 'confirm_keys_returned',
      description: 'Record that keys lent for the job are back, with who confirmed it.',
      kind: 'write',
      parameters: z.object({ ...ticketRef, evidence: z.string() }),
      run: ({ ticket_ref, evidence }) => onTicket(ticket_ref, (t) => ((t.keys_returned = evidence), { keys_returned: evidence })),
    }),
    def({
      name: 'close_ticket',
      description:
        'Close a job. final_checks = normal close after work, invoice and landlord confirmation; without_payment = landlord used their own contractor, tenant fixed it, or no charge; by_supervisor = a human closes it. Blocked until the closing checks are met.',
      kind: 'write',
      parameters: z.object({
        ...ticketRef,
        mode: z.enum(CLOSE_MODES),
        resolution: z.string().describe('What fixed it, and on what evidence'),
        tenant_confirmation: z.string().describe('How the tenant confirmed it is fixed, or why that is not needed'),
        landlord_informed: z
          .string()
          .describe(
            'How the landlord knows the outcome. One of: the ledger id of your verified message to the landlord in this run (e.g. "A3"); "history: <short quote showing they already know>"; "not_applicable: <reason>".',
          ),
      }),
      run: ({ ticket_ref, mode, resolution, tenant_confirmation, landlord_informed }) =>
        onTicket(ticket_ref, (t) => (delete t.hold, Object.assign(t, { stage: 'completed', closed: { mode, resolution, tenant_confirmation, landlord_informed } }), { stage: 'completed' })),
    }),
    def({
      name: 'log_call',
      description: 'Log a phone call you made or received, including failed ones (voicemail, no answer, wrong number).',
      kind: 'write',
      parameters: z.object({
        ticket_ref: z.string().optional(),
        party_name: z.string(),
        party_role: z.enum(['tenant', 'landlord', 'contractor', 'neighbour', 'third_party', 'internal']),
        direction: z.enum(['outbound', 'inbound']),
        outcome: z.enum(['connected', 'voicemail', 'no_answer', 'wrong_number', 'failed']),
        summary: z.string(),
      }),
      run: (a) => ({ ok: true, call_id: record('log_call', a, 'CALL').id }),
    }),
    def({
      name: 'schedule_follow_up',
      description: 'Set a dated follow-up so nothing depends on memory: a chase when a reply is due, a re-inspection, a recurring reading.',
      kind: 'write',
      parameters: z.object({
        ticket_ref: z.string().optional(),
        due_on: z.string().describe('YYYY-MM-DD'),
        party: z.string().optional(),
        purpose: z.string(),
        recurring: z.string().optional().describe('e.g. "every 3 months"'),
      }),
      run: (a) => ({ ok: true, follow_up_id: record('schedule_follow_up', a, 'FUP').id }),
    }),
    def({
      name: 'send_message',
      description: 'Send a message to a tenant, landlord, contractor or other party. Never disclose personal data to unverified parties.',
      kind: 'write',
      parameters: z.object({
        ...recipient,
        body: z.string().describe('The exact message text'),
        ticket_ref: z.string().optional().describe('Job this message is about'),
        attachments: z.array(z.string()).optional().describe('File names from the case to attach, e.g. attachments/invoice.pdf'),
      }),
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
        update: z
          .string()
          .optional()
          .describe('What the landlord needs to know besides the decision: visit status (booked, conflicting or not yet confirmed), what is being checked and with whom, and what happens next.'),
      }),
      run: (a) => ({ ok: true, approval_id: record('request_landlord_approval', a, 'APR').id, status: 'requested' }),
    }),
    def({
      name: 'approve_quote',
      description:
        'Commit spend by approving a contractor quote. Only within the landlord spend limit, with recorded landlord approval, or on an emergency ticket with emergency_justification.',
      kind: 'write',
      parameters: z.object({
        ticket_ref: z.string(),
        amount_gbp: z.number(),
        contractor: z.string(),
        approval_basis: z.string(),
        emergency_justification: z
          .string()
          .optional()
          .describe('Emergency tickets only, when the landlord has not approved: the immediate risk to safety or property that cannot wait for the landlord, quoting the case. Checked against the case text.'),
      }),
      run: (a) => {
        const t = ticket(a.ticket_ref);
        if (t) Object.assign(t, { stage: 'quote_approved', approved_gbp: a.amount_gbp }, a.emergency_justification ? { emergency_approval: a.emergency_justification } : {});
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

  // Read-back per ticket-mutating tool: what must be true on the ticket after the call.
  const readBack: Record<string, (t: Ticket, a: Record<string, any>) => string | undefined> = {
    put_on_hold: (t, a) => ((t.hold as any)?.reason === a.reason ? undefined : `hold reason is ${(t.hold as any)?.reason ?? 'none'}`),
    resume_auto: (t) => (t.mode === 'auto' && !t.hold ? undefined : `mode is ${t.mode ?? 'unset'}${t.hold ? ', still on hold' : ''}`),
    record_landlord_decision: (t, a) => ((t.landlord_decision as any)?.decision === a.decision ? undefined : 'no landlord decision on the ticket'),
    set_visit: (t, a) => ((t.visit as any)?.datetime === a.datetime ? undefined : `visit is ${(t.visit as any)?.datetime ?? 'not set'}`),
    record_work_result: (t, a) => ((t.work_result as any)?.outcome === a.outcome ? undefined : 'no work result on the ticket'),
    record_quote: (t, a) => (((t.quotes as any[]) ?? []).some((q) => q.amount_gbp === a.amount_gbp && q.provider === a.provider) ? undefined : 'quote not on the ticket'),
    record_invoice: (t, a) => ((t.invoice as any)?.amount_gbp === a.amount_gbp ? undefined : 'invoice not on the ticket'),
    attach_document: (t, a) => (((t.documents as any[]) ?? []).some((d) => d.kind === a.kind && d.file === a.file) ? undefined : 'document not on the ticket'),
    skip_document: (t, a) => (((t.documents as any[]) ?? []).some((d) => d.kind === a.kind && d.skipped) ? undefined : 'skip not on the ticket'),
    confirm_keys_returned: (t) => (t.keys_returned ? undefined : 'keys not marked returned'),
    close_ticket: (t) => (t.stage === 'completed' ? undefined : `stage is ${t.stage}`),
  };

  const knownAddresses = () => [...state.tickets.map((t) => String(t.property ?? '')), ...state.properties.map((p) => p.address)].filter(Boolean);
  const ran = (tool: string, ref?: string) => state.records.some((r) => r.tool === tool && (!ref || JSON.stringify(r.args).includes(ref)));

  // A visit date counts only when the party doing the visit confirmed it, in words that are in the case and name the date.
  const visitUnconfirmed = (a: Record<string, any>, ledger?: readonly LedgerEntry[]): string | undefined => {
    const date = String(a.datetime ?? '').slice(0, 10);
    if (a.confirmed_by === 'assigned_this_run') {
      if (!ledger) return undefined;
      const assigned = ledger.some((e) => e.tool === 'assign_contractor' && e.status === 'verified' && e.args.ticket_ref === a.ticket_ref);
      return assigned ? undefined : `confirmed_by is assigned_this_run, but no assign_contractor for ${a.ticket_ref} is verified in this run.`;
    }
    if (!evidence) return undefined;
    const quote = String(a.evidence_quote ?? '').trim();
    if (!quote) return `No confirmation of ${date} is quoted (evidence_quote).`;
    if (!quoteAppears(quote, evidence)) return `The evidence_quote "${quote.slice(0, 120)}" is not in the case.`;
    const said = quoteEventDates(quote, evidence);
    if (!(said.length ? said : [today]).some((on) => mentionsDate(quote, a.datetime, on)))
      return `The evidence_quote does not name ${date}; a weekday or "next week" alone does not confirm a date.`;
    const speakers = quoteSpeakers(quote, evidence);
    const role = a.confirmed_by === 'landlord' ? /landlord/i : /contractor|provider|maintenance|engineer|trades/i;
    if (speakers && !speakers.some((s) => role.test(s)))
      return `Those words come from ${[...new Set(speakers)].join(' / ') || 'nobody identifiable'}, not the ${a.confirmed_by === 'landlord' ? 'landlord' : 'provider'}, so ${date} is not confirmed by the party doing the visit.`;
    return undefined;
  };

  // Rules enforced in code, not left to the prompt. Each comes from a red flag in the cases.
  const guard = (name: string, a: Record<string, any>, ledger?: readonly LedgerEntry[]): string | undefined => {
    const t = a.ticket_ref ? ticket(a.ticket_ref) : undefined;
    const p = propertyFor(t);
    const decision = (t?.landlord_decision as any)?.decision as string | undefined;
    switch (name) {
      case 'update_bank_details':
        return 'Bank details are never changed from a message in a case. Keep paying the account on file, hold the payment if needed, verify by calling the number already on file, and escalate to fraud.';
      case 'assign_contractor':
        if (t && decision && ['declined', 'own_contractor', 'tenant_self_fix', 'unclear'].includes(decision))
          return `The landlord's recorded decision is "${decision}", so the agency must not instruct a contractor. Act on that decision, or ask the landlord again.`;
        if (t?.landlord_approval === 'required' && t.severity !== 'emergency')
          return 'Landlord approval step is not complete ("Please complete landlord approval step first"). Use request_landlord_approval, or record_landlord_decision if they already answered.';
        return undefined;
      case 'approve_quote': {
        const cap = (t?.landlord_decision as any)?.cap_gbp as number | undefined;
        if ((decision === 'approved' || decision === 'conditional') && (cap === undefined || a.amount_gbp <= cap)) return undefined;
        const limit = p?.landlord?.spend_limit_gbp;
        if (limit !== undefined && a.amount_gbp <= limit) return undefined;
        const blocked = `No recorded landlord approval covers £${a.amount_gbp}${limit !== undefined ? ` and it is above the £${limit} spend limit` : ' and no spend limit is on file'}. Send the quote with request_landlord_approval instead.`;
        if (t?.severity !== 'emergency' || (decision && ['declined', 'own_contractor', 'tenant_self_fix', 'unclear'].includes(decision))) return blocked;
        const why = String(a.emergency_justification ?? '').trim();
        if (!why) return `${blocked} If the risk cannot wait for the landlord, give emergency_justification quoting the case.`;
        if (evidence && !quoteAppears(why, evidence)) return `The emergency_justification "${why.slice(0, 120)}" does not quote the case. Put the case's words describing the risk in quotes.`;
        return undefined;
      }
      case 'record_landlord_decision': {
        const quote = String(a.evidence_quote ?? '');
        if (['approved', 'conditional'].includes(a.decision) && tooThinForApproval(quote))
          return `"${quote}" is too thin to rely on as approval. Record it as unclear and ask the landlord to confirm in words.`;
        if (!evidence || a.decision === 'unclear') return undefined;
        const raw = quote.trim();
        if (raw && (quoteAppears(raw, evidence) || evidence.includes(raw))) {
          const speakers = quoteSpeakers(raw, evidence);
          if (speakers?.length && speakers.every(hearsaySpeaker))
            return `Those words were written by ${[...new Set(speakers)].join(' / ')}, not the landlord. A tenant or contractor saying the landlord agreed is hearsay, not a landlord decision. Record the decision as unclear and ask the landlord directly (request_landlord_approval); do not instruct or approve on it.`;
          return undefined;
        }
        if (namesAttachment(String(a.source ?? ''), mediaNames)) return undefined;
        return `The evidence_quote "${raw.slice(0, 120)}" is not in the case. Copy the landlord's words exactly as written (no paraphrase; date and channel go in source)${mediaNames.length ? ', or name the image or scanned attachment they come from in source' : ''}, or record the decision as unclear and ask the landlord.`;
      }
      case 'set_visit': {
        const problems = visitProblems(a.datetime, a.slot_text, today);
        if (problems.length) return problems.join(' ');
        const unconfirmed = visitUnconfirmed(a, ledger);
        return unconfirmed
          ? `${unconfirmed} Do not book it and do not tell anyone it is booked: ask the provider to confirm the date (request_information), tell the tenant the date is not confirmed yet, and schedule_follow_up.`
          : undefined;
      }
      case 'send_message':
      case 'request_information': {
        const wrong = foreignAddresses(String(a.body ?? a.questions?.join(' ') ?? ''), knownAddresses());
        if (wrong.length) return `The message mentions ${wrong.join(', ')}, which is not the property on this job (${knownAddresses().join(' / ')}). Fix the address before sending.`;
        if (a.recipient_role === 'tenant' && (t ? p : state.properties.length === 1 ? state.properties[0] : undefined)?.tenanted === false)
          return 'The property is NOT TENANTED (void). There is no current tenant to message: use the agency key or caretaker route and tell the landlord.';
        return undefined;
      }
      case 'close_ticket': {
        if (!t) return undefined;
        const problems: string[] = [];
        const work = (t.work_result as any)?.outcome;
        if (a.mode === 'final_checks') {
          if (work !== 'completed') problems.push('no completed work result is recorded (record_work_result)');
          const docs = (t.documents as any[]) ?? [];
          if (!t.invoice && !docs.some((d) => d.kind === 'invoice')) problems.push('no invoice recorded or skipped with a reason (record_invoice or skip_document)');
        }
        if (a.mode === 'without_payment' && !work && !decision) problems.push('nothing shows how it was resolved: record the work result or the landlord decision first');
        const flags = ((t.invoice as any)?.flags as string[]) ?? [];
        if (flags.length && !ran('hold_payment') && !ran('escalate_to_human')) problems.push(`invoice flags are unhandled (${flags.join(' ')}): hold the payment or escalate`);
        if (!String(a.tenant_confirmation ?? '').trim()) problems.push('say how the tenant confirmed the fix, or why that is not needed');
        const informed = landlordInformedProblem(String(a.landlord_informed ?? ''), ledger);
        if (informed) problems.push(informed);
        return problems.length ? `Cannot close ${t.ref} yet: ${problems.join('; ')}.` : undefined;
      }
    }
    return undefined;
  };

  const toolset: Toolset = {
    tools,
    state,
    guard,
    execute: (name, args, ctx) => executeWith({ tools, state }, name, args, ctx),
    verify: (name, args, result) => {
      // Read back independently of what the write returned.
      if (readBack[name]) {
        const t = ticket(String(args.ticket_ref));
        if (!t) return { status: 'not_applied', evidence: `Ticket ${String(args.ticket_ref)} not found on read-back` };
        const problem = readBack[name](t, args);
        return problem ? { status: 'not_applied', ref: t.ref, evidence: `Ticket ${t.ref}: ${problem}` } : { status: 'verified', ref: t.ref, evidence: `Ticket ${t.ref} read back after ${name}` };
      }
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
