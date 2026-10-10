@AGENTS.md

## Claude Code specifics

- **Skills** live in `.agents/skills/` and are surfaced to Claude Code through symlinks in `.claude/skills/`. Edit the files in `.agents/`.
- Use plan mode for changes to `src/agent/caseAgent.ts`, `src/run.ts` or the `Decision` schema.
- Run `/code-review` on your own diff before opening or updating a PR when a change meets the same threshold (AGENTS.md non-negotiable 8).
- When executing a milestone from the master plan, update its Progress, Discoveries and Decision log sections in the same commit as the code.
