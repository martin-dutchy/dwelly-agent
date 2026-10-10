// Load a case so that a broken optional harness file costs a note, never the case.
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
import { normaliseFailurePlan } from '../core/failures.js';
import type { CaseBundle } from '../agent/harness/contracts.js';

/** Optional harness files a loader parses, with the parse it applies. Grading files are never parsed, so not listed. */
const PARSED_HARNESS_FILES: Record<string, (raw: string) => unknown> = {
  'tool_failures.json': (raw) => normaliseFailurePlan(JSON.parse(raw)),
};

export type HarnessFileProblem = { name: string; reason: string };

export function malformedHarnessFiles(dir: string): HarnessFileProblem[] {
  return Object.entries(PARSED_HARNESS_FILES).flatMap(([name, parse]) => {
    const p = join(dir, name);
    if (!existsSync(p)) return [];
    try {
      parse(readFileSync(p, 'utf8'));
      return [];
    } catch (e) {
      return [{ name, reason: `malformed (${e instanceof Error ? e.message : String(e)}); ignored, so the case ran with no scripted tool failures` }];
    }
  });
}

/** A view of `dir` without `skip`, as symlinks under a temporary folder with the same basename. */
function shadow(dir: string, skip: Set<string>) {
  const root = mkdtempSync(join(tmpdir(), 'case-shadow-'));
  const view = join(root, basename(dir));
  mkdirSync(view);
  for (const f of readdirSync(dir)) if (!skip.has(f)) symlinkSync(join(resolve(dir), f), join(view, f));
  return { view, cleanup: () => rmSync(root, { recursive: true, force: true }) };
}

/**
 * `load(dir)`, tolerating malformed optional harness files: they are reported in the bundle's manifest and
 * withheld list, and when the loader throws on one, the case is loaded again without it.
 */
export function loadTolerant(dir: string, load: (dir: string) => CaseBundle): { bundle: CaseBundle; problems: HarnessFileProblem[] } {
  const problems = malformedHarnessFiles(dir);
  let bundle: CaseBundle;
  try {
    bundle = load(dir);
  } catch (e) {
    if (!problems.length) throw e;
    const s = shadow(dir, new Set(problems.map((p) => p.name)));
    try {
      bundle = { ...load(s.view), dir };
    } finally {
      s.cleanup();
    }
  }
  if (!problems.length) return { bundle, problems };
  const bad = new Map(problems.map((p) => [p.name, p.reason]));
  return {
    bundle: {
      ...bundle,
      withheld: [...bundle.withheld.filter((w) => !bad.has(w.name)), ...problems],
      manifest: [...bundle.manifest.filter((m) => !bad.has(m.path)), ...problems.map((p) => ({ path: p.name, kind: 'json' as const, parse: 'malformed', included: false, note: p.reason }))],
    },
    problems,
  };
}
