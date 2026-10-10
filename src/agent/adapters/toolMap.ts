// Configuration for the optional organiser tool API: which of our tools go to it, under what name and route.
import { z } from 'zod';

/** Our tool name -> candidate organiser names. For HTTP the first is used. Tools not listed run on the mock only. */
export const DEFAULT_TOOL_MAP: Record<string, string[]> = {
  send_message: ['send_message', 'send_email', 'send_sms', 'message'],
  request_information: ['request_information', 'send_message', 'send_email'],
  request_landlord_approval: ['request_landlord_approval', 'request_approval', 'send_email'],
  escalate_to_human: ['escalate_to_human', 'escalate', 'handover'],
  list_tickets: ['list_tickets', 'list_jobs', 'search_tickets'],
  get_ticket: ['get_ticket', 'get_job'],
  create_ticket: ['create_ticket', 'create_job'],
  update_ticket: ['update_ticket', 'update_job'],
  assign_contractor: ['assign_contractor', 'assign_provider', 'assign_supplier'],
  approve_quote: ['approve_quote'],
  close_ticket: ['close_ticket', 'close_job', 'complete_job'],
  add_note: ['add_note', 'create_note'],
};

export type Target = { tool: string; method: string; path: string; args: Record<string, string> };

const Override = z.union([
  z.null(),
  z.string().min(1),
  z.object({ tool: z.string().min(1).optional(), route: z.string().regex(/^(GET|POST|PUT|PATCH|DELETE) \/\S*$/).optional(), args: z.record(z.string(), z.string()).optional() }),
]);
const ToolMapJson = z.record(z.string(), Override);

export type OrganiserConfig = {
  url: string;
  host: string;
  /** Never logged or written anywhere. */
  key?: string;
  transport: 'http';
  timeoutMs: number;
  overrides: z.infer<typeof ToolMapJson>;
};

/** Undefined (mock only) when ORGANISER_API_URL is unset, or when the configuration is unusable (with a warning). */
export function readOrganiserEnv(env: Record<string, string | undefined>, warn: (s: string) => void = console.warn): OrganiserConfig | undefined {
  const url = env.ORGANISER_API_URL?.trim();
  if (!url) return undefined;
  let host: string;
  try {
    host = new URL(url).host;
  } catch {
    warn('organiser API disabled: ORGANISER_API_URL is not a valid URL');
    return undefined;
  }
  const transport = (env.ORGANISER_API_TRANSPORT?.trim() || 'http').toLowerCase();
  if (transport !== 'http') {
    warn(`organiser API disabled: ORGANISER_API_TRANSPORT=${transport} is not supported by this build (http only)`);
    return undefined;
  }
  let overrides: z.infer<typeof ToolMapJson> = {};
  if (env.ORGANISER_TOOL_MAP?.trim()) {
    let json: unknown;
    try {
      json = JSON.parse(env.ORGANISER_TOOL_MAP);
    } catch {
      warn('organiser API disabled: ORGANISER_TOOL_MAP is not valid JSON');
      return undefined;
    }
    const parsed = ToolMapJson.safeParse(json);
    if (!parsed.success) {
      warn(`organiser API disabled: ORGANISER_TOOL_MAP has an invalid entry (${parsed.error.issues[0]?.path.join('.')})`);
      return undefined;
    }
    overrides = parsed.data;
  }
  return { url: url.replace(/\/+$/, ''), host, key: env.ORGANISER_API_KEY?.trim() || undefined, transport: 'http', timeoutMs: 10_000, overrides };
}

/** Where a call to our tool `name` goes, or undefined when it stays on the local mock. */
export function resolveTarget(name: string, cfg: OrganiserConfig): Target | undefined {
  const o = Object.hasOwn(cfg.overrides, name) ? cfg.overrides[name] : undefined;
  if (o === null) return undefined;
  const fallback = DEFAULT_TOOL_MAP[name]?.[0];
  if (o === undefined && !fallback) return undefined;
  const spec = typeof o === 'string' ? { tool: o } : (o ?? {});
  const tool = spec.tool ?? fallback ?? name;
  const [method, path] = spec.route ? spec.route.split(' ') : ['POST', `/tools/${tool}`];
  return { tool, method, path, args: spec.args ?? {} };
}

/** Shallow argument renames; keys without a rename pass through. */
export function renameArgs(args: Record<string, unknown>, renames: Record<string, string>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(args).map(([k, v]) => [renames[k] ?? k, v]));
}
