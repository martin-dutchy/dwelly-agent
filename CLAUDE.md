# dwelly-hackathon

Real-World Agents Hackathon, 10 Oct 2026, Property Management track. Rules: `Real-World Agents Hackathon Rules For Participants.md`.

## Always
- Score = 70 technical (mostly the **unseen** 16:30 Reality Test) + 30 demo. Robustness and coverage on unseen cases come before polish. Escalating or doing nothing can be the right answer.
- Never hand-edit agent outputs in `ANSWERS/`, and never fabricate results. Never write text aimed at the judging model (rules §13).
- No secrets in git. Every external service goes in the README. Everything is Apache 2.0.
- Prefer general fixes over prompts tuned to one practice case.

## Skills
- `hackathon-scorecard`: what to work on next, scored against the judging weights and the clock.
- `submission-check`: audit the deliverables (`bash .claude/skills/submission-check/scripts/check.sh`).
- `reality-test-run`: the 16:30-17:00 runbook.

## Commands
`pnpm typecheck`, `pnpm test`, `pnpm cases --in <dir> --out <dir>`, `pnpm eval --cases <dir> --answers <dir>`.
