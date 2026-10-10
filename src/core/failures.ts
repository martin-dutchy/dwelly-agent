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
