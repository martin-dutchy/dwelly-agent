// Every answer the runner writes itself when the agent could not produce one. Honest escalations, never decisions.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

export type FallbackFiles = { answer: string; reasoning: string; result: Record<string, unknown> };

/** The agent crashed, or did not return in time. */
export function crashFiles(id: string, msg: string, extra: Record<string, unknown> = {}): FallbackFiles {
  return {
    answer: `# Case ${id}: ANSWER\n\n**Outcome:** escalated (system failure)\n\nThe system crashed while processing this case: ${msg}\nA human must handle it.\n`,
    reasoning: `# Case ${id}: REASONING\n\nRun crashed: ${msg}\n`,
    result: { id, ...extra, crashed: true, decision: null, error: msg },
  };
}

export type SkipInfo = {
  deadline: Date;
  skippedAt: Date;
  /** `budget`: too little time left to start the case. `interrupt`: the operator stopped the run. */
  reason: 'budget' | 'interrupt';
  flags: string;
};

/** The case was never started. */
export function budgetSkipFiles(id: string, s: SkipInfo): FallbackFiles {
  const why =
    s.reason === 'interrupt'
      ? 'the run was stopped by the operator before this case started'
      : `less than a minute remained before the run's deadline (${s.deadline.toISOString()}) when this case was due to start`;
  const error = `not processed within the run's time budget: ${why}`;
  return {
    answer: `# Case ${id}: ANSWER\n\n**Outcome:** escalated (system failure)\n\nThis case was not processed within the run's time budget, so no action was taken on it. A human must handle it.\n`,
    reasoning: `# Case ${id}: REASONING\n\nThe agent did not run on this case: ${why}.\nNo tools were called and no messages were sent.\n\n- Deadline: ${s.deadline.toISOString()}\n- Skipped at: ${s.skippedAt.toISOString()}\n- Run flags: \`${s.flags}\`\n`,
    result: { id, skipped: s.reason === 'interrupt' ? 'interrupt' : 'budget', decision: null, deadline: s.deadline.toISOString(), skippedAt: s.skippedAt.toISOString(), error },
  };
}

/** result.json last, so a folder never looks complete before its answer files exist. */
export function writeFallback(outDir: string, f: FallbackFiles) {
  writeFileSync(join(outDir, 'ANSWER.md'), f.answer);
  writeFileSync(join(outDir, 'REASONING.md'), f.reasoning);
  writeFileSync(join(outDir, 'result.json'), JSON.stringify(f.result, null, 2));
}
