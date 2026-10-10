import type { Decision } from './caseAgent.js';
import type { LoadedCase } from './cases.js';
import type { GateResult, Screen } from './jev.js';
import type { LedgerEntry } from './ledger.js';

export type Usage = { input: number; output: number; cost: number; turns: number; durationMs: number };

const cell = (s: unknown) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const short = (v: unknown, n = 160) => {
  const s = typeof v === 'string' ? v : JSON.stringify(v);
  return s.length > n ? `${s.slice(0, n)}…` : s;
};

/** Action table rendered from the verified ledger, never from model prose. */
function actionTable(ledger: LedgerEntry[]) {
  if (!ledger.length) return '_No state-changing actions were taken._';
  return [
    '| # | Action | Key arguments | Attempts | Status | Evidence |',
    '|---|---|---|---|---|---|',
    ...ledger.map(
      (e) =>
        `| ${e.id} | \`${e.tool}\` | ${cell(short(e.args, 140))} | ${e.attempts} | ${e.status === 'verified' ? '✅ verified' : e.status === 'failed' ? '❌ failed' : '⚠️ unverified'} | ${cell(e.evidence.at(-1))} |`,
    ),
  ].join('\n');
}

export function renderAnswer(c: LoadedCase, d: Decision | undefined, ledger: LedgerEntry[], error?: string) {
  if (!d) {
    return `# Case ${c.id}: ANSWER

**Outcome:** escalated (system fallback)

The agent did not produce a decision${error ? ` (error: ${error})` : ''}. The case is handed to a human with everything below.

## Actions taken
${actionTable(ledger)}
`;
  }
  const escalations = ledger.filter((e) => e.tool === 'escalate_to_human');
  return `# Case ${c.id}: ANSWER

**Outcome:** ${d.outcome} · **Severity:** ${d.severity}

${d.summary}

## Answers
${d.answers.map((a, i) => `**${i + 1}. ${a.question}**\n\n${a.answer}`).join('\n\n') || '_No explicit questions._'}

## Actions taken (from the verified action ledger)
${actionTable(ledger)}

## Escalations
${
  escalations.length
    ? escalations
        .map((e) => {
          const a = e.args as Record<string, any>;
          return `- **${a.priority} → ${a.team}** (${e.status}): ${a.reason}\n  - Known: ${a.known}\n  - Missing: ${a.missing}\n  - Options: ${(a.options ?? []).join('; ')}\n  - Recommendation: ${a.recommendation}${a.deadline ? `\n  - Deadline: ${a.deadline}` : ''}`;
        })
        .join('\n')
    : '_None._'
}

## Failed or unverified actions
${d.failed_actions.map((f) => `- ${f.ledger_id}: ${f.handling}`).join('\n') || '_None._'}
`;
}

export function renderReasoning(
  c: LoadedCase,
  d: Decision | undefined,
  ledger: LedgerEntry[],
  messages: any[],
  usage: Usage,
  error?: string,
  checks?: { screen?: Screen; gateLog?: (GateResult & { tool: string; attempt: number })[] },
) {
  const steps: string[] = [];
  let n = 0;
  for (const m of messages) {
    if (m.role === 'assistant') {
      for (const b of m.content ?? []) {
        if (b.type === 'text' && b.text.trim()) steps.push(`${++n}. **Agent:** ${b.text.trim()}`);
        if (b.type === 'toolCall') steps.push(`${++n}. **Tool call** \`${b.name}\` ${short(b.arguments, 400)}`);
      }
    } else if (m.role === 'toolResult') {
      const t = (m.content ?? []).map((b: any) => b.text ?? '').join(' ');
      steps.push(`   - ${m.isError ? '⚠️ ' : ''}Result: ${short(t, 400)}`);
    }
  }
  return `# Case ${c.id}: REASONING

## What the system received
${c.inputs.map((i) => `- \`${i.name}\` (${i.content.length} chars)`).join('\n')}

${
  checks?.screen
    ? `## Pre-screen (Jev classifier)\n${checks.screen.error ? `Unavailable: ${checks.screen.error}` : `- Severity: ${checks.screen.severity} (p=${checks.screen.severityProb.toFixed(2)})\n${Object.entries(checks.screen.flags).map(([k, p]) => `- ${k}: ${p.toFixed(2)}`).join('\n')}`}\n\n`
    : ''
}${
  checks?.gateLog?.length
    ? `## Pre-send message checks (Jev classifier)\n${checks.gateLog.map((g) => `- ${g.tool} attempt ${g.attempt}: ${g.error ? `unavailable (${g.error})` : g.block ? `held: ${g.reasons.join('; ')}` : 'passed'}`).join('\n')}\n\n`
    : ''
}## Conflicts between sources
${d?.conflicts.map((x) => `- ${x}`).join('\n') || '_None identified._'}

## Assumptions
${d?.assumptions.map((x) => `- ${x}`).join('\n') || '_None._'}

## Action ledger (every state change, read back after execution)
${actionTable(ledger)}

## Trace
${steps.join('\n')}
${error ? `\n**Run error:** ${error}\n` : ''}
## Run
- Model turns: ${usage.turns} · Tokens in/out: ${usage.input}/${usage.output} · Cost: $${usage.cost.toFixed(4)} · Duration: ${(usage.durationMs / 1000).toFixed(1)}s
- Raw event trace: \`trace.jsonl\`
`;
}
