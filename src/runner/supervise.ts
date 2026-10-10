// Per-case supervision: a hard deadline that aborts the case, and a toolset that refuses to act once it has.
import type { Toolset } from '../agent/opsTools.js';

export type ToolCallRecord = { at: string; tool: string; status: 'running' | 'ok' | 'error' | 'refused' };

const reasonOf = (signal: AbortSignal) => (signal.reason instanceof Error ? signal.reason.message : String(signal.reason ?? 'the case was stopped'));

/** `toolset`, except that no tool runs once `signal` has fired. Every call is appended to `calls`. */
export function stoppable(toolset: Toolset, signal: AbortSignal, calls: ToolCallRecord[]): Toolset {
  return {
    ...toolset,
    execute: async (name, args, ctx) => {
      const rec: ToolCallRecord = { at: new Date().toISOString(), tool: name, status: 'running' };
      calls.push(rec);
      if (signal.aborted) {
        rec.status = 'refused';
        return { ok: false, error: `not run: ${reasonOf(signal)}` };
      }
      try {
        const r = await toolset.execute(name, args, ctx);
        rec.status = r.ok ? 'ok' : 'error';
        return r;
      } catch (e) {
        rec.status = 'error';
        throw e;
      }
    },
  };
}

/** The runner stopped waiting for a case: it overran its guard or the operator interrupted the run. */
export class CaseStopped extends Error {}

/**
 * Resolve with `work`, or abort `controller` and reject with `CaseStopped` when it overruns `ms` or `interrupt`
 * fires. Whatever is still running inside `work` must check `controller.signal` before it acts.
 */
export function bounded<T>(work: Promise<T>, ms: number, controller: AbortController, interrupt?: AbortSignal): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  let onInterrupt: (() => void) | undefined;
  const stop = new Promise<never>((_, reject) => {
    const abort = (msg: string) => {
      const e = new CaseStopped(msg);
      controller.abort(e);
      reject(e);
    };
    timer = setTimeout(() => abort(`the agent did not return within ${Math.round(ms / 1000)}s; the case was stopped`), ms);
    onInterrupt = () => abort('the run was stopped by the operator (Ctrl-C) while this case was running');
    if (interrupt?.aborted) onInterrupt();
    else interrupt?.addEventListener('abort', onInterrupt, { once: true });
  });
  return Promise.race([work, stop]).finally(() => {
    clearTimeout(timer);
    interrupt?.removeEventListener('abort', onInterrupt!);
  });
}

/** Throw the abort reason if the case has been stopped, so work past a checkpoint never starts. */
export function checkpoint(signal: AbortSignal) {
  if (signal.aborted) throw signal.reason instanceof Error ? signal.reason : new Error(reasonOf(signal));
}
