/** Each v2 layer is off unless named, so the runner behaves exactly as before by default. */
export const HARNESS_FLAGS = ['ingestV2', 'brief', 'skills', 'guardsV2', 'completionV2', 'criticContext'] as const;
export type HarnessFlag = (typeof HARNESS_FLAGS)[number];
export type HarnessFlags = Record<HarnessFlag, boolean>;

export const NO_FLAGS: HarnessFlags = Object.freeze(Object.fromEntries(HARNESS_FLAGS.map((f) => [f, false])) as HarnessFlags);

/** Parse "brief,skills" or "all" (from --harness or HARNESS). Unknown names throw, so a typo never silently runs v1. */
export function parseHarnessFlags(spec: string | undefined): HarnessFlags {
  const names = (spec ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const flags: HarnessFlags = { ...NO_FLAGS };
  for (const n of names) {
    if (n === 'all') HARNESS_FLAGS.forEach((f) => (flags[f] = true));
    else if (n === 'none') continue;
    else if ((HARNESS_FLAGS as readonly string[]).includes(n)) flags[n as HarnessFlag] = true;
    else throw new Error(`unknown harness flag "${n}"; use ${HARNESS_FLAGS.join(', ')}, all or none`);
  }
  return flags;
}

export const flagsLine = (f: HarnessFlags) => HARNESS_FLAGS.filter((k) => f[k]).join(',') || 'none';
