// Optional organiser tool API, switched on by ORGANISER_API_URL. Wraps the per-case mock Toolset:
// mapped calls go to the organiser, writes are shadow-applied to the mock so read-back works as in a mock run,
// and the first transport failure switches the whole process back to the mock.
import type { ToolContext, ToolResult } from '../../core/tools.js';
import type { Toolset } from '../opsTools.js';
import { type OrganiserConfig, renameArgs, resolveTarget } from './toolMap.js';
import { httpCall } from './transport.js';

export type Trip = { caseId: string; call: number; tool: string; reason: string };
export type AdapterReport = {
  mode: 'mock' | 'organiser';
  host?: string;
  transport?: 'http';
  sent: { writes: number; reads: number };
  /** Tools this case called that have no organiser mapping. */
  localOnly: string[];
  /** Set when the API failed during this case. */
  tripped?: Trip;
  /** Set when the API had already failed in an earlier case, so this case never used it. */
  disabledBy?: Trip;
  /** Set when another case's failure switched the API off while this case was running. */
  disabledMidCase?: Trip;
};

let trip: Trip | undefined;
/** Tests only: forget an earlier failure. */
export function resetTrip() {
  trip = undefined;
}

const scrub = (s: string, cfg: OrganiserConfig) => (cfg.key ? s.split(cfg.key).join('***') : s).slice(0, 200);

export function withOrganiserApi(mock: Toolset, cfg: OrganiserConfig | undefined, caseId: string): { toolset: Toolset; report: () => AdapterReport } {
  const sent = { writes: 0, reads: 0 };
  if (!cfg) return { toolset: mock, report: () => ({ mode: 'mock', sent, localOnly: [] }) };
  const disabledBy = trip;
  const localOnly = new Set<string>();
  // Calls the organiser refused. The mock's read-back could still match (e.g. closing a ticket the mirror already
  // shows closed), so a refusal must never be read back as verified.
  const refused = new Map<string, string>();
  const callKey = (name: string, args: unknown) => `${name}|${JSON.stringify(args ?? {})}`;
  let calls = 0;
  let tripped: Trip | undefined;

  const execute = async (name: string, args: unknown, ctx: ToolContext): Promise<ToolResult> => {
    const target = resolveTarget(name, cfg);
    if (!target) localOnly.add(name);
    if (trip || !target) return mock.execute(name, args, ctx);
    const kind = mock.tools.find((t) => t.name === name)?.kind;
    const call = ++calls;
    let reply;
    try {
      reply = await httpCall(cfg, target, renameArgs((args ?? {}) as Record<string, unknown>, target.args));
    } catch (e) {
      tripped = trip = { caseId, call, tool: name, reason: scrub(e instanceof Error ? e.message : String(e), cfg) };
      return mock.execute(name, args, ctx);
    }
    if (kind === 'write') sent.writes++;
    else sent.reads++;
    const body = reply.body && typeof reply.body === 'object' ? reply.body : {};
    refused.delete(callKey(name, args));
    if (body.ok === false || body.error) {
      const error = scrub(typeof body.error === 'string' ? body.error : JSON.stringify(body.error ?? 'refused'), cfg);
      refused.set(callKey(name, args), error);
      return { ok: false, error, say: `The organiser system refused this: ${error}`, organiser: { status: reply.status } };
    }
    const id = body.id ?? body.ref ?? undefined;
    if (kind === 'write') {
      const shadow = await mock.execute(name, args, ctx);
      return { ...shadow, organiser: { status: reply.status, ...(id !== undefined ? { id } : {}) } };
    }
    return { ok: true, ...body, organiser: { status: reply.status } };
  };

  const toolset: Toolset = {
    tools: mock.tools,
    state: mock.state,
    guard: mock.guard,
    execute,
    verify: (name, args, result, ctx) => {
      const refusal = refused.get(callKey(name, args));
      if (refusal !== undefined) return { status: 'not_applied', evidence: `organiser API refused it: ${refusal}` };
      const v = mock.verify(name, args, result, ctx);
      const o = result?.organiser as { status: number; id?: unknown } | undefined;
      return o ? { ...v, evidence: `organiser API accepted (HTTP ${o.status}${o.id !== undefined ? `, id ${o.id}` : ''}); ${v.evidence}` } : v;
    },
  };
  return {
    toolset,
    report: () =>
      disabledBy
        ? { mode: 'mock', host: cfg.host, transport: cfg.transport, sent, localOnly: [...localOnly], disabledBy }
        : { mode: 'organiser', host: cfg.host, transport: cfg.transport, sent, localOnly: [...localOnly], ...(tripped ? { tripped } : trip ? { disabledMidCase: trip } : {}) },
  };
}

/** The one `Toolset:` line for REASONING.md. */
export function toolsetLine(r: AdapterReport): string {
  if (r.disabledBy) return `Toolset: local mock environment (organiser API disabled after a failure in case ${r.disabledBy.caseId}: ${r.disabledBy.reason}).`;
  if (r.mode === 'mock') return 'Toolset: local mock environment (no organiser API configured).';
  if (r.tripped)
    return `Toolset: organiser API at ${r.host} failed on call ${r.tripped.call} (${r.tripped.tool}: ${r.tripped.reason}); this and all later calls ran on the local mock environment.`;
  const total = r.sent.writes + r.sent.reads;
  const local = r.localOnly.length ? `, ${r.localOnly.length} tools local only (${r.localOnly.join(', ')})` : '';
  const mid = r.disabledMidCase ? ` The organiser API was disabled during this case after a failure in case ${r.disabledMidCase.caseId} (${r.disabledMidCase.reason}); later calls ran on the local mock environment.` : '';
  return `Toolset: organiser API at ${r.host}: ${total} calls sent (${r.sent.writes} writes, ${r.sent.reads} reads)${local}. Writes were also applied to the local mirror, and read-back is against that mirror.${mid}`;
}

/** The run's start line. */
export function toolsetStartLine(cfg: OrganiserConfig | undefined, toolNames: string[]): string {
  if (!cfg) return 'Toolset: local mock environment (no organiser API configured)';
  const mapped = toolNames.filter((n) => resolveTarget(n, cfg)).length;
  return `Toolset: organiser API at ${cfg.host} (${cfg.transport}), ${mapped} of ${toolNames.length} tools mapped; falls back to the local mock on the first failure`;
}

/** Puts the toolset line right under the REASONING title. */
export function withToolsetLine(reasoning: string, line: string): string {
  const nl = reasoning.indexOf('\n');
  return nl < 0 ? `${reasoning}\n\n${line}\n` : `${reasoning.slice(0, nl + 1)}\n${line}\n${reasoning.slice(nl + 1)}`;
}
