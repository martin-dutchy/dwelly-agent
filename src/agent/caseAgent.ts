import { Agent, type AgentEvent, type AgentTool, type StreamFn } from '@earendil-works/pi-agent-core';
import { type Api, type Model, type ModelThinkingLevel, type TSchema, isRetryableAssistantError } from '@earendil-works/pi-ai';
import { z } from 'zod';
import { FailureInjector, type FailurePlan } from '../core/failures.js';
import { type ToolContext, type ToolResult, executeTool, tools as coreTools } from '../core/tools.js';
import { type GateResult, checkMessage } from './jev.js';
import type { CaseMedia } from './cases.js';
import { type CriticResult, revisionNote, runCritic } from './critic/critic.js';
import { escalationPacketProblems, preCriticProblems } from './critic/validators.js';
import { ActionLedger } from './ledger.js';
import { quoteAppears } from './opsChecks.js';
import type { Toolset } from './opsTools.js';
import { verify as coreVerify } from './verify.js';

/** The fixture-backed tools shared with the voice agents. Batch cases use createOpsToolset instead. */
export const coreToolset = (): Toolset => ({ tools: coreTools, execute: executeTool, verify: coreVerify, state: { tickets: [], records: [], properties: [] } });

const asSchema = (s: z.ZodType) => z.toJSONSchema(s) as unknown as TSchema;
const text = (t: string) => [{ type: 'text' as const, text: t }];

/** What the agency does next, in the vocabulary of the real case histories. */
export const NEXT_ACTION_TYPES = [
  'REQUEST_LANDLORD_APPROVAL',
  'ASSIGN_PROVIDER',
  'BOOK_OR_CONFIRM_APPOINTMENT',
  'CHASE_PROVIDER',
  'CHASE_LANDLORD',
  'CHASE_TENANT',
  'SEND_QUOTE_FOR_APPROVAL',
  'APPROVE_INVOICE_FOR_PAYMENT',
  'REPLY_TO_TENANT',
  'REQUEST_INFORMATION',
  'SPLIT_NEW_REQUEST',
  'RECLASSIFY',
  'WAIT',
  'CLOSE_WITH_PAYMENT',
  'CLOSE_WITHOUT_PAYMENT',
  'ESCALATE_TO_HUMAN',
  'OTHER',
] as const;

export const NextAction = z.object({
  type: z.enum(NEXT_ACTION_TYPES),
  action: z.string().describe('The action in one sentence, e.g. "Ask the landlord to approve the £172.51 + VAT quote"'),
  recipient: z.string().describe('Who it is for, by name and role (e.g. "Ava Kendall, landlord"), or "internal"'),
  channel: z.enum(['email', 'sms', 'phone_call', 'whatsapp', 'letter', 'portal', 'internal']),
  ledger_id: z
    .string()
    .optional()
    .describe('The verified ledger entry that performed it. Required for every type except OTHER; WAIT cites the schedule_follow_up or put_on_hold entry that records the wait'),
});
export type NextAction = z.infer<typeof NextAction>;

export const Decision = z.object({
  case_state: z.string().describe('Where the case stands at the decision point: stage, who is waiting on whom, what is outstanding'),
  next_actions: z.array(NextAction).describe('The next action(s) taken now, most important first. At least one.'),
  boundaries: z
    .array(z.string())
    .describe('What these actions do NOT establish or decide, e.g. "Booking the visit does not confirm the cause or who pays"'),
  remaining_work: z.array(z.string()).describe('What is still open after these actions, and who owns it'),
  missing_info: z.array(z.string()).describe('Information that was missing or unavailable and mattered; empty if none'),
  outcome: z.enum(['resolved', 'action_taken', 'escalated', 'needs_info', 'no_action']).describe('Final state of the case'),
  severity: z.enum(['emergency', 'urgent', 'routine', 'n/a']).describe('Highest severity found'),
  summary: z.string().describe('Two or three sentences: what happened and what was done'),
  answers: z.array(z.object({ question: z.string(), answer: z.string() })).describe('Answer every question in the case'),
  actions_claimed: z
    .array(z.object({ ledger_id: z.string().describe('Ledger id, e.g. A1'), description: z.string() }))
    .describe('Actions you are reporting as done. Only VERIFIED ledger entries.'),
  failed_actions: z
    .array(z.object({ ledger_id: z.string(), handling: z.string().describe('What you did about it, e.g. escalated as E-4903') }))
    .describe('Every ledger entry that did not verify, and how it was handled'),
  conflicts: z.array(z.string()).describe('Contradictions found between sources, and which source you trusted'),
  assumptions: z.array(z.string()),
});
export type Decision = z.infer<typeof Decision>;

export type CaseRunOptions = {
  caseId: string;
  prompt: string;
  systemPrompt: string;
  model: Model<Api>;
  streamFn: StreamFn;
  failures?: FailurePlan;
  /** Images and scanned PDFs, sent as native content blocks after the prompt. */
  media?: CaseMedia[];
  timeoutMs?: number;
  toolset?: Toolset;
  maxRetries?: number;
  thinkingLevel?: ModelThinkingLevel;
  /** Pre-submit review of the first valid draft by a second model. Off when absent. */
  critic?: { model: Model<Api>; streamFn: StreamFn; timeoutMs?: number; attachments: string[] };
};

/** Tools a pre-submit review may never lead to: they move money, commit a provider, or end the job. */
const AFTER_REVIEW_BLOCKED = new Set(['approve_quote', 'assign_contractor', 'close_ticket', 'cancel_ticket', 'update_bank_details']);
const blockedAfterReview = (tool: string, a: Record<string, unknown>) => AFTER_REVIEW_BLOCKED.has(tool) || (tool === 'update_ticket' && ['completed', 'cancelled'].includes(String(a.stage ?? '')));
const MAX_PRE_REVIEW_BLOCKS = 2;
const CRITIC_MIN_TIME_LEFT_MS = 60_000;

export async function runCase(opts: CaseRunOptions) {
  const startedAt = Date.now();
  const timeoutMs = opts.timeoutMs ?? 4 * 60_000;
  const toolset = opts.toolset ?? coreToolset();
  const getTool = (name: string) => toolset.tools.find((t) => t.name === name);
  // Only the ops toolset's escalation carries a decision packet (known / missing / options / recommendation).
  const packetEscalation = (getTool('escalate_to_human')?.parameters as { shape?: Record<string, unknown> } | undefined)?.shape?.options !== undefined;
  const brief = opts.prompt.match(/<case\b[^>]*>\n?([\s\S]*?)<\/case>/)?.[1] ?? '';
  const ledger = new ActionLedger();
  const ctx: ToolContext = { conversationId: `case-${opts.caseId}`, channel: 'text', failures: new FailureInjector(opts.failures) };
  const lastResults = new Map<string, ToolResult>(); // toolCallId -> raw result, for the verifier
  let decision: Decision | undefined;

  const domainTools: AgentTool[] = toolset.tools.map((t) => ({
    name: t.name,
    label: t.name,
    description: t.description,
    parameters: asSchema(t.parameters),
    // Writes run one at a time so each is verified before the next one starts.
    executionMode: t.kind === 'write' ? 'sequential' : 'parallel',
    execute: async (toolCallId, params) => {
      const result = await toolset.execute(t.name, params, ctx);
      lastResults.set(toolCallId, result);
      return { content: text(JSON.stringify(result)), details: result, isError: result.ok === false };
    },
  }));

  const submitDecision: AgentTool = {
    name: 'submit_decision',
    label: 'submit_decision',
    description: 'Call exactly once, last, with the final structured outcome. Rejected if it misreports the action ledger.',
    parameters: asSchema(Decision),
    executionMode: 'sequential',
    execute: async (_id, params) => {
      decision = Decision.parse(params);
      return { content: text('Decision recorded.'), details: decision, terminate: true };
    },
  };

  const trace: (AgentEvent & { ts?: string })[] = [];
  const gateLog: (GateResult & { tool: string; attempt: number })[] = [];
  const gateBlocks = new Map<string, number>(); // recipient -> blocks so far
  const policyLog: { tool: string; reason: string }[] = [];
  const policyBlocks = new Map<string, number>(); // tool|ticket -> policy blocks so far
  let preReviewBlocks = 0; // decision-point and packet blocks, capped so they can never stall the case
  let packetBlocks = 0;
  // First write in the current assistant step that did not go through (failed, unverified or blocked).
  // Outbound messages later in the same step were written before that was seen, so they are held.
  // Reset on each assistant message_start.
  let stepFailure: string | undefined;
  const OUTBOUND = new Set(['send_message', 'request_information', 'request_landlord_approval']);
  const blockedWrite = (tool: string) => {
    if (getTool(tool)?.kind === 'write') stepFailure ??= `${tool} (blocked)`;
  };
  let critic: CriticResult | undefined;
  let revisionMode = false;
  let draft: Partial<Decision> | undefined;
  let criticEvent: (CriticResult & { type: 'critic'; ts: string }) | undefined;

  const reviewDraft = async (c: NonNullable<CaseRunOptions['critic']>, d: Partial<Decision>): Promise<CriticResult> => {
    const empty = { model: c.model.id, ms: 0, cost: 0, items: [], kept: [], dropped: [] };
    if (startedAt + timeoutMs - Date.now() < CRITIC_MIN_TIME_LEFT_MS) return { ...empty, status: 'skipped', reason: 'low_time' };
    try {
      return await runCritic({ prompt: opts.prompt, attachments: c.attachments, draft: d, ledger: ledger.entries, policyLog }, { model: c.model, streamFn: c.streamFn, timeoutMs: c.timeoutMs, match: quoteAppears });
    } catch (e) {
      return { ...empty, status: 'error', reason: `exception: ${e instanceof Error ? e.message : String(e)}` };
    }
  };

  // Hard rules enforced in code, so no amount of persuasive input can talk the model past them.
  const policyBlock = (tool: string, a: Record<string, unknown>): string | undefined => {
    if (tool === 'update_bank_details')
      return 'bank details are never changed on a message or call request (fraud policy). Use hold_payment on the affected payee and escalate_to_human to the fraud team with what was requested and by whom.';
    if (tool === 'approve_quote') {
      const ref = String(a.ticket_ref ?? '');
      const asked = ledger.entries.find((e) => e.tool === 'request_landlord_approval' && e.status === 'verified' && ref && String(e.args.ticket_ref ?? '') === ref);
      if (asked)
        return `landlord approval for ${ref} was requested in this run (${asked.id}) and has not been given. Do not wait and do not approve it yourself: tell the parties it is awaiting the landlord, and escalate if it is urgent.`;
    }
    return undefined;
  };
  const agent = new Agent({
    initialState: {
      systemPrompt: opts.systemPrompt,
      model: opts.model,
      thinkingLevel: opts.thinkingLevel ?? 'off',
      tools: [...domainTools, submitDecision],
    },
    streamFn: opts.streamFn,
    sessionId: opts.caseId,

    // BEFORE: block repeats of verified actions, and block a decision that misreports the ledger.
    beforeToolCall: async ({ toolCall, args }) => {
      const a = (args ?? {}) as Record<string, unknown>;
      if (getTool(toolCall.name)?.kind === 'write') {
        const done = ledger.findVerified(toolCall.name, a);
        if (done) return { block: true, reason: `Already done and verified as ${done.id} (${done.ref}). Do not repeat it.` };
      }
      if (revisionMode && blockedAfterReview(toolCall.name, a)) {
        const reason = 'after the pre-submit review only reads, messages, notes, follow-ups, holds and escalation are allowed.';
        policyLog.push({ tool: toolCall.name, reason });
        blockedWrite(toolCall.name);
        return { block: true, reason: `Blocked by policy: ${reason} Record what is still to do in remaining_work and call submit_decision.` };
      }
      // Run-level rules first (they know the ledger), then the toolset's own rules (they know the job record).
      const policy = policyBlock(toolCall.name, a) ?? toolset.guard?.(toolCall.name, a, ledger.entries);
      if (policy) {
        policyLog.push({ tool: toolCall.name, reason: policy });
        blockedWrite(toolCall.name);
        const key = `${toolCall.name}|${String(a.ticket_ref ?? a.ref ?? '')}`;
        const blocks = (policyBlocks.get(key) ?? 0) + 1;
        policyBlocks.set(key, blocks);
        if (blocks >= 3)
          return {
            block: true,
            reason: `Blocked by policy again (${blocks} times): ${policy}\nStop calling ${toolCall.name}: it will stay blocked. Call submit_decision now, and say in it what you could not do and why (remaining_work or assumptions).`,
          };
        return { block: true, reason: `Blocked by policy: ${policy}` };
      }
      if (toolCall.name === 'escalate_to_human' && packetEscalation && packetBlocks < MAX_PRE_REVIEW_BLOCKS) {
        const gaps = escalationPacketProblems(a);
        if (gaps.length) {
          packetBlocks++;
          blockedWrite(toolCall.name);
          return { block: true, reason: `Escalation packet incomplete: ${gaps.join(', ')}. Give what is known, what is missing, at least one option and your recommendation (a sentence each) so a person can decide from the packet alone.` };
        }
      }
      if (OUTBOUND.has(toolCall.name) && stepFailure)
        return {
          block: true,
          reason: `Not sent: ${stepFailure} did not go through earlier in this same step, so this message was written before you saw that result. Re-read the result, then send it again in a new step, stating only what is verified.`,
        };
      // Jev message gate: a fast classifier checks outgoing messages before they leave.
      // Blocks at most twice per recipient so a false positive can never stall the case.
      if (toolCall.name === 'send_message' || toolCall.name === 'request_information') {
        const who = String(a.recipient_name ?? '');
        const verifiedActions = ledger.entries.filter((e) => e.status === 'verified').map((e) => `${e.id} ${e.tool} ${e.ref ?? ''}`);
        const gate = await checkMessage(a, verifiedActions, 'Only parties whose identity is established in the case records count as verified.');
        if (gate) {
          const blocks = gateBlocks.get(who) ?? 0;
          gateLog.push({ ...gate, tool: toolCall.name, attempt: blocks + 1 });
          if (gate.block && blocks < 2) {
            gateBlocks.set(who, blocks + 1);
            return { block: true, reason: `Message held by the pre-send check: ${gate.reasons.join('; ')}. Rewrite it so it only states verified facts and is safe for this recipient, or explain why it is correct and resend.` };
          }
        }
      }
      if (toolCall.name === 'submit_decision') {
        const d = a as Partial<Decision>;
        const problems: string[] = [];
        for (const c of d.actions_claimed ?? []) {
          const e = ledger.get(c.ledger_id);
          if (!e) problems.push(`${c.ledger_id} is not in the ledger.`);
          else if (e.status !== 'verified') problems.push(`${c.ledger_id} (${e.tool}) is ${e.status}, so you cannot claim it as done.`);
        }
        const handled = new Set((d.failed_actions ?? []).map((f) => f.ledger_id));
        for (const e of ledger.unresolved()) {
          if (!handled.has(e.id)) problems.push(`${e.id} (${e.tool}) is ${e.status}: list it in failed_actions with how you handled it.`);
        }
        const hasTool = (n: string) => toolset.tools.some((t) => t.name === n);
        const did = (...names: string[]) => ledger.entries.some((e) => names.includes(e.tool) && e.status === 'verified');
        const canWait = hasTool('schedule_follow_up') || hasTool('put_on_hold');
        // The next actions are the substance of the answer: each must name a recipient and be backed by a verified action.
        if (!d.next_actions?.length) problems.push('next_actions is empty: state the next action you took (WAIT with a schedule_follow_up counts).');
        for (const na of d.next_actions ?? []) {
          if (!na.ledger_id) {
            if (na.type === 'WAIT' && canWait)
              problems.push(`next action "${na.action}" is WAIT with no ledger_id: record the wait with schedule_follow_up (or put_on_hold) and a review date, then cite that entry.`);
            else if (!['WAIT', 'OTHER'].includes(na.type)) problems.push(`next action "${na.action}" (${na.type}) has no ledger_id: perform it with a tool first, then cite the entry.`);
            continue;
          }
          const e = ledger.get(na.ledger_id);
          if (!e) problems.push(`next action "${na.action}" cites ${na.ledger_id}, which is not in the ledger: perform it with a tool first.`);
          else if (e.status !== 'verified') problems.push(`next action "${na.action}" cites ${na.ledger_id} (${e.tool}), which is ${e.status}.`);
          else if (na.type === 'WAIT' && !['schedule_follow_up', 'put_on_hold'].includes(e.tool))
            problems.push(`WAIT must cite a schedule_follow_up or put_on_hold entry with a review date, not ${e.tool}.`);
          else if (na.type === 'ESCALATE_TO_HUMAN' && e.tool !== 'escalate_to_human') problems.push(`ESCALATE_TO_HUMAN must cite an escalate_to_human entry, not ${e.tool}.`);
        }
        // An escalation or open question must actually have been handed to someone, never left waiting.
        if (d.outcome === 'no_action' && canWait && !did('schedule_follow_up', 'put_on_hold', 'add_note'))
          problems.push('outcome is "no_action": doing nothing new can be right, but leave a verified trace first: schedule_follow_up or put_on_hold with a review date, or add_note saying why no action is needed.');
        if (d.outcome === 'escalated' && hasTool('escalate_to_human') && !did('escalate_to_human'))
          problems.push('outcome is "escalated" but no escalate_to_human is verified: hand it over with a packet first.');
        if (d.outcome === 'needs_info' && hasTool('request_information') && !did('request_information', 'escalate_to_human', 'request_landlord_approval'))
          problems.push('outcome is "needs_info" but nobody was asked: send request_information (or escalate) first. Never just wait.');
        if (preReviewBlocks < MAX_PRE_REVIEW_BLOCKS) {
          const pre = preCriticProblems(d, packetEscalation ? ledger.entries : [], brief);
          if (pre.length) {
            preReviewBlocks++;
            problems.push(...pre);
          }
        }
        if (problems.length) return { block: true, reason: `Decision rejected:\n- ${problems.join('\n- ')}` };
        // One review per case, of the first draft that passes every check above; never a second round.
        if (opts.critic && !critic) {
          critic = await reviewDraft(opts.critic, d);
          criticEvent = { type: 'critic', ts: new Date().toISOString(), ...critic };
          trace.push(criticEvent as any);
          if (critic.status === 'ok' && critic.kept.length) {
            revisionMode = true;
            draft = d;
            return { block: true, reason: revisionNote(critic.kept) };
          }
        }
      }
      return undefined;
    },

    // AFTER: read back every write, whatever the API said, and tell the model the truth.
    afterToolCall: async ({ toolCall, args, isError }) => {
      if (getTool(toolCall.name)?.kind !== 'write') return undefined;
      const raw = lastResults.get(toolCall.id);
      const a = (args ?? {}) as Record<string, unknown>;
      const v = toolset.verify(toolCall.name, a, raw?.ok ? raw : undefined, ctx);
      const apiError = raw?.ok === false ? String(raw.details ?? raw.error) : undefined;
      const entry = ledger.record(toolCall.name, a, apiError, v);
      if (v.status !== 'verified') stepFailure ??= `${entry.id} (${toolCall.name})`;
      const note =
        v.status === 'verified' && isError
          ? `The API reported an error, but read-back shows the change IS in place (${v.evidence}). Do not retry.`
          : v.status === 'verified'
            ? `Verified: ${v.evidence}.`
            : v.status === 'unverifiable'
              ? `Could not verify (${v.evidence}). Do not report it as confirmed.`
              : `NOT APPLIED: ${v.evidence}. Retry once if safe, otherwise escalate. Never tell anyone it was done.`;
      return {
        content: text(`${JSON.stringify(raw ?? {})}\n[ledger ${entry.id}, attempt ${entry.attempts}] ${note}`),
        isError: v.status !== 'verified',
      };
    },
  });
  agent.subscribe((e) => {
    if (e.type === 'message_start' && e.message.role === 'assistant') stepFailure = undefined;
    if (e.type !== 'message_update') trace.push({ ts: new Date().toISOString(), ...e });
  });

  // Transient provider errors (429 rate limits, 5xx, overloaded) must not cost us the case:
  // drop the failed assistant turn and resume from the same transcript after a backoff.
  // Resuming (not restarting) means tools that already ran are never re-executed.
  const withRetries = async (step: () => Promise<void>) => {
    await step();
    for (let attempt = 1; attempt <= (opts.maxRetries ?? 6); attempt++) {
      const last = agent.state.messages.at(-1) as any;
      if (last?.role !== 'assistant' || last.stopReason !== 'error' || !isRetryableAssistantError(last)) return;
      agent.state.messages = agent.state.messages.slice(0, -1);
      const delay = Math.min(30_000, 1500 * 2 ** (attempt - 1)) + Math.random() * 1000;
      trace.push({ ts: new Date().toISOString(), type: 'retry', attempt, delayMs: Math.round(delay), error: last.errorMessage } as any);
      await new Promise((r) => setTimeout(r, delay));
      // An abort during the backoff has nothing to cancel, so the timeout must also stop the retry.
      if (timedOut) return;
      await agent.continue();
    }
  };

  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    agent.abort();
  }, timeoutMs);
  try {
    // Attachments go in the same user turn, each labelled so the model can match it to the file list.
    const first = opts.media?.length
      ? { role: 'user' as const, timestamp: Date.now(), content: [{ type: 'text' as const, text: opts.prompt }, ...opts.media.flatMap((m) => [{ type: 'text' as const, text: `Attachment "${m.name}":` }, m.media])] }
      : undefined;
    await withRetries(() => (first ? agent.prompt(first) : agent.prompt(opts.prompt)));
    // One nudge if the model stopped without a decision.
    if (!decision && !agent.state.errorMessage && !timedOut) await withRetries(() => agent.prompt('You must now call submit_decision.'));
  } finally {
    clearTimeout(timer);
  }

  // A resubmission with the same outcome and next-action types as the reviewed draft did not act on the findings.
  if (critic && criticEvent && draft && decision) {
    const types = (x: Partial<Decision>) => (x.next_actions ?? []).map((n) => n.type).join(',');
    const unchanged = decision.outcome === draft.outcome && types(decision) === types(draft);
    critic.unaddressed = criticEvent.unaddressed = unchanged ? critic.kept.map((f) => `[${f.id}] ${f.finding}`) : [];
  }

  return { decision, ledger: ledger.entries, state: toolset.state, gateLog, policyLog, trace, messages: agent.state.messages, error: agent.state.errorMessage ?? (timedOut && !decision ? `timed out after ${Math.round(timeoutMs / 1000)}s` : undefined), critic };
}
