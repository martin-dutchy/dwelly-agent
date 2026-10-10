/**
 * Scripted tool failures, mirroring cases/practice/<n>/tool_failures.json.
 * - error:       the call fails and nothing happens (HTTP 500).
 * - silent_drop: the call reports success but the change never lands (the nasty one).
 * - timeout:     the change DOES land but the caller gets an error (outcome unknown, so a blind retry duplicates).
 */
export type FailureMode = 'error' | 'silent_drop' | 'timeout';
export type FailurePlan = Record<string, { call: number; mode: FailureMode }[]>;

/** Accepts {call, mode} or the practice-case format {call, error: "500 ..." | "timeout ..."}. */
export function normaliseFailurePlan(raw: unknown): FailurePlan {
  const plan: FailurePlan = {};
  for (const [tool, list] of Object.entries((raw ?? {}) as Record<string, any[]>)) {
    plan[tool] = (list ?? []).map((f) => ({
      call: Number(f.call ?? 1),
      mode: (f.mode as FailureMode) ?? (/timeout|timed out/i.test(String(f.error)) ? 'timeout' : /silent|drop/i.test(String(f.error)) ? 'silent_drop' : 'error'),
    }));
  }
  return plan;
}

export class FailureInjector {
  private calls = new Map<string, number>();
  constructor(private plan: FailurePlan = {}) {}

  /** Returns the failure scheduled for this call of `tool`, if any. Counts every call. */
  next(tool: string): FailureMode | undefined {
    const n = (this.calls.get(tool) ?? 0) + 1;
    this.calls.set(tool, n);
    return this.plan[tool]?.find((f) => f.call === n)?.mode;
  }
}

/** Stable text for a value: object keys sorted, so the same intent always gives the same key. */
export const canonical = (v: unknown): string =>
  Array.isArray(v)
    ? `[${v.map(canonical).join(',')}]`
    : v && typeof v === 'object'
      ? `{${Object.keys(v)
          .sort()
          .map((k) => `${k}:${canonical((v as Record<string, unknown>)[k])}`)
          .join(',')}}`
      : JSON.stringify(v);

/** What to do about a failed call: retry it, reach the same outcome another way, or stop and hand it over. */
export type FailureClass = 'retry' | 'alternative_route' | 'record_and_escalate';
export type ClassifiedFailure = { failureClass: FailureClass; nextStep: string };

const ALTERNATIVE: Record<string, string> = {
  send_message: 'send it on another channel from the records (email, SMS or phone_call), or phone the party and log_call',
  request_information: 'ask on another channel from the records (email, SMS or phone_call), or phone the party and log_call',
  request_landlord_approval: 'ask the landlord with send_message on another channel from the records, or phone them and log_call',
  set_visit: 'confirm the date to each party with send_message, and schedule_follow_up to book it again',
  assign_contractor: 'assign another contractor from the records, or escalate if there is none',
};

/** Failures of the system rather than of the request: a 5xx, a timeout, no response, or a write that silently did not land. */
export const isTransient = (error?: string) => !error || /timed? ?out|HTTP 5\d\d|not responding|ECONN|ETIMEDOUT|socket|unavailable|tool_failed/i.test(error);

/**
 * A transient failure on its first attempt is worth one retry. After that, or for a request the system refused,
 * a tool with another route switches route; anything else is recorded and handed to a human.
 */
export function classifyFailure(tool: string, attempt: number, error?: string): ClassifiedFailure {
  if (attempt <= 1 && isTransient(error))
    return {
      failureClass: 'retry',
      nextStep: /timed? ?out/i.test(error ?? '')
        ? 'The request timed out, so the change may be in place: check the read-back before retrying once.'
        : 'Transient failure: retry once with the same arguments.',
    };
  if (ALTERNATIVE[tool]) return { failureClass: 'alternative_route', nextStep: `Do not repeat the same call: ${ALTERNATIVE[tool]}. List the failure in failed_actions.` };
  return {
    failureClass: 'record_and_escalate',
    nextStep:
      tool === 'escalate_to_human'
        ? 'Do not retry again: add_note with the full handover packet and list the failure in failed_actions.'
        : 'Do not retry again: list it in failed_actions and escalate_to_human with what failed and what is still needed.',
  };
}

const MODES: FailureMode[] = ['error', 'silent_drop', 'timeout'];

/** Small seeded PRNG so a chaos run is reproducible for the same seed and case. */
function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 3432918353), (h = (h << 13) | (h >>> 19));
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/**
 * --chaos: fail each of the first two calls of every write tool with probability `rate`,
 * so the happy-path cases also exercise failure handling. Scripted failures from the case win.
 */
export function chaosPlan(writeTools: string[], rate: number, seed: string, scripted: FailurePlan = {}): FailurePlan {
  if (!(rate > 0)) return scripted;
  const rand = rng(seed);
  const plan: FailurePlan = {};
  for (const tool of writeTools) {
    const fails = [1, 2].filter(() => rand() < rate).map((call) => ({ call, mode: MODES[Math.floor(rand() * MODES.length)] }));
    if (fails.length) plan[tool] = fails;
  }
  return { ...plan, ...scripted };
}
