import { z } from 'zod';
import { audit } from './audit.js';
import { canonical, classifyFailure } from './failures.js';
import type { ToolContext, ToolDef, ToolResult } from './tools.js';

export type ExecutorOptions = {
  tools: ToolDef[];
  /** Mutable state the tools write to; snapshotted to simulate silent drops. */
  state: object;
  /** Extra precondition (e.g. identity verified). Return a refusal result to block. */
  guard?: (tool: ToolDef, args: Record<string, unknown>, ctx: ToolContext) => ToolResult | undefined;
};

async function runWithFailures(tool: ToolDef, args: Record<string, unknown>, ctx: ToolContext, state: object): Promise<ToolResult> {
  const mode = ctx.failures?.next(tool.name);
  if (mode === 'error') throw new Error('HTTP 500 Internal Server Error');
  if (mode === 'silent_drop') {
    const snapshot = structuredClone(state);
    const result = await tool.run(args, ctx);
    Object.assign(state, snapshot); // the API said yes, but nothing was persisted
    return result;
  }
  const result = await tool.run(args, ctx);
  if (mode === 'timeout') throw new Error('Request timed out after 10000ms');
  return result;
}

// Failed attempts per conversation and intent (tool + canonical args), so the class can tell a first failure from a repeat.
const failedAttempts = new WeakMap<ToolContext, Map<string, number>>();

function typed(ctx: ToolContext, name: string, args: unknown, result: ToolResult): ToolResult {
  const seen = failedAttempts.get(ctx) ?? new Map<string, number>();
  failedAttempts.set(ctx, seen);
  const key = `${name}:${canonical(args ?? {})}`;
  const attempt = (seen.get(key) ?? 0) + 1;
  seen.set(key, attempt);
  const { failureClass, nextStep } = classifyFailure(name, attempt, String(result.details ?? result.error ?? ''));
  return { ...result, failure_class: failureClass, next_step: nextStep };
}

/** Single execution path: validation, guard, scripted failures, error capture, failure class, audit trail. */
export async function executeWith(opts: ExecutorOptions, name: string, rawArgs: unknown, ctx: ToolContext): Promise<ToolResult> {
  const tool = opts.tools.find((t) => t.name === name);
  let result: ToolResult;
  if (!tool) {
    result = { ok: false, say: `Unknown tool ${name}.` };
  } else {
    const parsed = tool.parameters.safeParse(rawArgs ?? {});
    const refusal = parsed.success ? opts.guard?.(tool, parsed.data, ctx) : undefined;
    if (!parsed.success) {
      result = { ok: false, error: 'invalid_arguments', details: z.prettifyError(parsed.error) };
    } else if (refusal) {
      result = refusal;
    } else {
      try {
        result = await runWithFailures(tool, parsed.data, ctx, opts.state);
      } catch (e) {
        result = { ok: false, error: 'tool_failed', say: 'The system is not responding. Escalate to a human.', details: String(e) };
      }
      // A result with only `say` is the tool redirecting the request, not a failure.
      if (result.ok === false && result.error !== undefined) result = typed(ctx, name, parsed.data, result);
    }
  }
  audit(ctx.conversationId, { type: 'tool', channel: ctx.channel, name, args: rawArgs, result });
  return result;
}
