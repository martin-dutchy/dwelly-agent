import { Agent, type AgentEvent, type AgentTool, type StreamFn } from '@earendil-works/pi-agent-core';
import { type Api, type Model, type TSchema, isRetryableAssistantError } from '@earendil-works/pi-ai';
import { z } from 'zod';
import { FailureInjector, type FailurePlan } from '../core/failures.js';
import { type ToolContext, type ToolResult, executeTool, tools as coreTools } from '../core/tools.js';
import { type GateResult, checkMessage } from './jev.js';
import { ActionLedger } from './ledger.js';
import type { Toolset } from './opsTools.js';
import { verify as coreVerify } from './verify.js';

/** The fixture-backed tools shared with the voice agents. Batch cases use createOpsToolset instead. */
export const coreToolset = (): Toolset => ({ tools: coreTools, execute: executeTool, verify: coreVerify, state: { tickets: [], records: [] } });

const asSchema = (s: z.ZodType) => z.toJSONSchema(s) as unknown as TSchema;
const text = (t: string) => [{ type: 'text' as const, text: t }];

export const Decision = z.object({
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
  timeoutMs?: number;
  toolset?: Toolset;
  maxRetries?: number;
  thinkingLevel?: 'off' | 'low' | 'medium' | 'high';
};

export async function runCase(opts: CaseRunOptions) {
  const toolset = opts.toolset ?? coreToolset();
  const getTool = (name: string) => toolset.tools.find((t) => t.name === name);
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

  const trace: AgentEvent[] = [];
  const gateLog: (GateResult & { tool: string; attempt: number })[] = [];
  const gateBlocks = new Map<string, number>(); // recipient -> blocks so far
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
        if (problems.length) return { block: true, reason: `Decision rejected:\n- ${problems.join('\n- ')}` };
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
    if (e.type !== 'message_update') trace.push(e);
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
      trace.push({ type: 'retry', attempt, delayMs: Math.round(delay), error: last.errorMessage } as any);
      await new Promise((r) => setTimeout(r, delay));
      await agent.continue();
    }
  };

  const timer = setTimeout(() => agent.abort(), opts.timeoutMs ?? 4 * 60_000);
  try {
    await withRetries(() => agent.prompt(opts.prompt));
    // One nudge if the model stopped without a decision.
    if (!decision && !agent.state.errorMessage) await withRetries(() => agent.prompt('You must now call submit_decision.'));
  } finally {
    clearTimeout(timer);
  }

  return { decision, ledger: ledger.entries, state: toolset.state, gateLog, trace, messages: agent.state.messages, error: agent.state.errorMessage };
}
