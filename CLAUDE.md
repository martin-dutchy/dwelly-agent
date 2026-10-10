@AGENTS.md

# dwelly-hackathon

Real-World Agents Hackathon, 10 Oct 2026, Property Management track. Rules: `Real-World Agents Hackathon Rules For Participants.md` (local only). The orchestrating plan: `docs/plans/dwelly-case-worker-master-plan.md`.

## Always
- Score = 70 technical (mostly the **unseen** 16:30 Reality Test) + 30 demo. Robustness and coverage on unseen cases come before polish. Escalating or doing nothing can be the right answer.
- Never hand-edit agent outputs in `ANSWERS/`, and never fabricate results. Never write text aimed at the judging model (rules §13).
- No secrets in git. Every external service goes in the README. Everything is Apache 2.0.
- Prefer general fixes over prompts tuned to one practice case. Tune only on the `dev` split in `cases/splits.json`; never open `holdout` transcripts.

## Skills (`.claude/skills/`)
- `hackathon-scorecard`: what to work on next, scored against the judging weights and the clock.
- `submission-check`: audit the deliverables (`bash .claude/skills/submission-check/scripts/check.sh`).
- `reality-test-run`: the 16:30-17:00 runbook.
- `spec-and-plan-docs`: where plans live and how to write a spec (symlink to `.agents/skills/`).
- `first-principles-review`: design review from first principles, invoke explicitly (symlink to `.agents/skills/`).

## Commands
`pnpm verify` (done-gate), `pnpm loop [--split dev|holdout] [--chaos 0.15]`, `pnpm cases --in <dir> --out <dir>`, `pnpm eval --cases <dir> --answers <dir>`.

## Claude Code specifics
- Skills under `.agents/skills/` are edited there; `.claude/skills/` holds the symlinks plus Martin's hackathon skills.
- Use plan mode for changes to `src/agent/caseAgent.ts`, `src/run.ts` or the `Decision` schema.
- Run `/code-review` on your own diff before opening or updating a PR when a change meets the same threshold (AGENTS.md non-negotiable 8).
- When executing a milestone from the master plan, update its Progress, Discoveries and Decision log in the same commit as the code.
