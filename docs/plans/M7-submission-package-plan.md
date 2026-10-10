# Submission package (M7): README, SUBMISSION.md, demo video, public repo, launch posts

Status: ready to execute · Shape: default plan · Owner: Marc · Window: 15:00–16:30 BST with two late steps at 16:55 · Written 2026-10-10 11:45 BST

Sub-plan of [dwelly-case-worker-master-plan.md](dwelly-case-worker-master-plan.md) (milestone M7, requirement 6, AC14, AC15, workstream D). Plan rules: [README.md](README.md). Audit tooling: `.claude/skills/submission-check/` (`SKILL.md` and `scripts/check.sh`). Runbook for the 16:30–17:00 window: `.claude/skills/reality-test-run/SKILL.md` (M8, not this plan).

The deliverables are files and repo settings, not code. Appendices A–E hold the exact text and commands so the 15:00 session pastes and runs rather than writes.

---

## Goal

By 17:00 BST the repository is a complete, compliant submission under rules §6 and §7: public, Apache-2.0, README sections 1–8 filled with real content and a measured metrics table, `SUBMISSION.md` with every form field, a ≤ 60 s demo video inside the repo via Git LFS, one LinkedIn and one X post linking the repo, and the freeze hash recorded. `bash .claude/skills/submission-check/scripts/check.sh` exits 0.

## User-visible outcome

- An independent engineer opens `README.md` and, without talking to us, understands what the system is, the lettings-maintenance problem it works on, how it is built, how to run it, which external services it calls, what we assumed, where it falls short, and what we would do next. A metrics table states, with split, k, commit, date and models, how it scored on our own evaluation.
- Someone cloning the repo gets `demo/demo.mp4` (via LFS) and can watch 60 seconds of the real CLI processing real cases.
- The hackathon form can be filled from `SUBMISSION.md` alone: team, track, members, repo URL, freeze hash, results path, video path, LinkedIn URL, X URL.

## Context / current state (measured 11:37 BST on `claude/unruffled-joliot-008b2a`, which equals `main` at `f073c83`)

Evidence from running the audit and inspecting the repo:

| Item | State now | Evidence |
|---|---|---|
| `README.md` | Sections 1–8 headings exist with the exact wording `check.sh` greps for; sections 1, 2, 5, 6, 7, 8 are each a single `TBD` line; sections 3 and 4 are written. Links `demo/demo.mp4` and `ANSWERS/`. | `grep -c TBD README.md` → 6; `check.sh` → `FAIL README still has 6 TBD placeholder(s)` |
| `SUBMISSION.md` | Table with 9 fields; team, track, members, hash, LinkedIn, X are `TBD`. Repo URL matches origin. | `grep -c TBD SUBMISSION.md` → 6; `check.sh` → `PASS SUBMISSION.md repo URL matches origin` |
| `LICENSE` | Apache 2.0 present; `package.json` has `"license": "Apache-2.0"`. | `check.sh` → both `PASS` |
| `.gitattributes` | Already routes `*.mp4`, `*.mov`, `*.webm` through LFS. | file contents |
| `demo/` | Does not exist. | `ls demo` → no such file |
| Git LFS, ffmpeg, ffprobe | **Not installed** on Marc's machine. | `command -v git-lfs ffprobe ffmpeg` → empty; `git lfs version` → not a git command |
| `gh` | 2.78.0, logged in as `mfluviag`. | `gh auth status` |
| Repo visibility | `martin-dutchy/dwelly-agent` is **PRIVATE**. `mfluviag` has `push: true, admin: false`. The flip requires admin, so **Martin must run it** (or grant Marc admin first). `gh` 2.78 also requires `--accept-visibility-change-consequences`. | `gh repo view --json visibility`; `gh api repos/martin-dutchy/dwelly-agent --jq .permissions` |
| Organiser rules doc | `Real-World Agents Hackathon Rules For Participants.md` is in `.gitignore` **and** tracked by git (it was committed before the ignore rule). `check.sh` WARNs. | `git ls-files \| grep "Rules For"` → listed |
| `HackatonPublicCases/` | 444 files, 13 MB, tracked. README run commands and `cases/splits.json` depend on it. | `git ls-files HackatonPublicCases \| wc -l` |
| `evals/` | Does not exist in this checkout; `pnpm loop` creates it and writes `evals/latest-<split>.json` (gitignored) and `evals/baseline-<split>.json` (committed) with fields `split, at, chaos, cases, decided, judged, mean, criticalCases, cost, rows[]`. M4 extends this into `summary.json` with pass^3, escalation precision/recall, injection and recovery rates. | `src/eval/loop.ts:62-80`, `.gitignore` |
| `ANSWERS/` | Absent, correctly: it is produced at 16:30 by M8. | `check.sh` → `WARN ANSWERS/ not present yet` |
| AC15 grep | Three hits, all benign: two code comments about our own eval judge (`src/agent/cases.ts`, `src/agent/publicCases.ts`) and the phrase "human judgement" in a tool description (`src/core/tools.ts`). None addresses an evaluator. | command in Verification |
| `check.sh` overall | Exit 1. FAIL lines: README TBDs, repo PRIVATE. WARN lines: ANSWERS, video, SUBMISSION TBDs, LinkedIn, X, rules doc tracked. | run at 11:37 BST |

External services the code uses today, for the README disclosure: Anthropic API (Sonnet 5.5 agent, Opus 5.5 judge, via `@earendil-works/pi-ai`), TypeSafe Jev classifier (optional, `TYPESAFE_API_KEY`), poppler `pdftotext` (local binary), Git LFS and GitHub for hosting. ElevenLabs only if M6 ships. All case-side tools (`src/agent/opsTools.ts`) are a local mock; nothing sends real email or SMS.

## Requirements

1. README sections 1, 2, 5, 6, 7, 8 filled with accurate prose (Appendix A), no `TBD` lines anywhere in `README.md`. Sections 3 and 4 stay as written unless a fact changed.
2. README section 5 discloses every external dependency (rules §14): Anthropic, TypeSafe Jev, poppler/`pdftotext`, Git LFS, and ElevenLabs if and only if voice shipped.
3. A metrics table in the README fed from M4's `summary.json`, with the fallback below if M4 is late, always labelled with split, k, commit, date and models.
4. `SUBMISSION.md` with team name, track, members, repo URL, freeze hash, results path, video path, LinkedIn URL, X URL, plus the two post drafts (Appendix C).
5. `demo/demo.mp4` ≤ 60 s, tracked by LFS, showing the real CLI per the storyboard in `research/pm-case-data-analysis.md` section 6, committed before the 16:30 form.
6. Repo public by 17:00 (rules §6), `LICENSE` Apache 2.0 (already true).
7. The 17:00 freeze hash in `SUBMISSION.md`.
8. No text anywhere addressed to an evaluator (rules §13). No `ANSWERS/` edits (rules §6D).

## Non-goals

- Editing `src/**`. The three benign AC15 hits are comments owned by Martin's workstream; rewording them is optional and not M7.
- A web UI, slides or a pitch deck. The demo is a screen recording of the CLI and the generated files (master plan non-goal).
- Running the Reality Test or touching `ANSWERS/` (M8, `reality-test-run` skill).
- Rewriting README sections 3 and 4, except the one-line pnpm-8 note in Decision 11 if M0 did not resolve the lockfile.
- Choosing a team name or writing anyone's surname: humans fill those cells.

## Constraints / invariants

- Rules §4 freeze source code and the demo video at **16:30** (submitted to the form); §7 freezes the implementation and Reality Test results at **17:00** and allows the video, social links and submission metadata to be added after 17:00. Plan for the 16:30 reading; the §7 allowance is the fallback only.
- Posts must link to a repo that is public when the link is clicked, so posting follows the visibility flip.
- The visibility flip needs admin. Marc does not have it (see Context). Martin runs the command, or grants Marc admin beforehand.
- `evals/latest-*.json` is gitignored. Metrics are pasted into the README as values, never linked.
- Everything committed must be publishable under Apache 2.0. Organiser material: the rules doc comes out of the index (Decision 5); the public cases stay by assumption (Decision 4).
- No secrets. `check.sh` greps for key patterns; `.env` is ignored.
- Never write for the judging model. README and posts describe; they do not plead.

## Proposed approach

Split the work by what it waits on, and by who can do it:

| Group | Waits on | Steps | Who |
|---|---|---|---|
| A. Independent | nothing | tooling, untrack rules doc, README prose, SUBMISSION.md skeleton, post drafts, `demo/` folder | agent, with Marc filling team cells |
| B. Metrics | M4's `summary.json` (or the fallback) | metrics table | agent |
| C. Demo | a green M1 run (the M5 rehearsal at 15:15 produces one) | pre-run the demo cases, record, encode, LFS commit, 16:30 form | **Marc records**; agent does the rest |
| D. Freeze | M8's `ANSWERS/` commit at 16:55 | hash into `SUBMISSION.md`, visibility flip, posts, URLs, final audit, form | **Martin flips; Marc posts and submits**; agent edits and audits |

Group A can start before 15:00 whenever a session is free; nothing in it depends on the agent work. The README drafts in Appendix A are written against the architecture that exists at `f073c83` plus the M1–M4 deliverables named in the master plan; the 15:00 session checks each bracketed `<…>` placeholder against what actually merged and deletes any sentence about a milestone that did not ship.

## Implementation plan

Times are BST. "Agent" means a Claude Code session can run it unattended; "Human" means a person must act.

### Group A: independent, run any time before 15:45

1. **Install tooling** (agent, 3 min). `brew install git-lfs ffmpeg && git lfs install`. Prove by: `git lfs version` prints a version; `ffprobe -version` prints a version.
2. **Untrack the organiser rules doc** (agent, 1 min). `git rm --cached "Real-World Agents Hackathon Rules For Participants.md"` and commit. The file stays on disk because `.gitignore` lists it. Prove by: `check.sh` no longer prints the `organiser rules doc is tracked` WARN; `ls "Real-World Agents Hackathon Rules For Participants.md"` still succeeds.
3. **README sections 1, 2, 5, 6, 7, 8** (agent pastes Appendix A, Marc reads once, 10 min). Replace each `TBD` line with the draft. Resolve every `<…>` placeholder or delete its sentence. Keep the headings byte-identical to what `check.sh` greps. If M6 did not ship, delete the ElevenLabs row and the voice limitation. Prove by: `grep -c "^TBD" README.md` → 0; the section-heading loop in Verification prints eight `ok` lines; `grep -n "<" README.md` shows no unresolved angle-bracket placeholder.
4. **SUBMISSION.md skeleton** (agent pastes Appendix B; **Marc supplies team name and members' full names**, 3 min). Track is `Property Management`. Hash, LinkedIn and X stay `TBD` until Group D. Prove by: `grep -c TBD SUBMISSION.md` → exactly 3, and they are the hash, LinkedIn and X rows.
5. **Post drafts into SUBMISSION.md** (agent pastes Appendix C, 2 min). One metric placeholder each, filled in Group B. Prove by: the `## Launch posts` section exists with a LinkedIn draft and an X draft of ≤ 280 characters (`wc -m` on the X draft).
6. **`demo/` folder and LFS attribute** (agent, 1 min). `mkdir -p demo && touch demo/.gitkeep`. Prove by: `git check-attr filter demo/demo.mp4` prints `demo/demo.mp4: filter: lfs`.

### Group B: waits on M4 (deadline for the real table 15:45, otherwise fallback)

7. **Metrics table** (agent, 5 min). If M4 merged: run `pnpm loop --k 3` (or whatever M4 documents) and render the table with the snippet in Appendix A.5 against the produced `summary.json`. If M4 has not merged by 15:45: run `pnpm loop` (dev split, k = 1) and render the same snippet against `evals/latest-dev.json`; the snippet prints `not measured` for the M4-only rows, and the label line must say `dev split · k = 1 · deterministic checks not run`. Paste the table and its label line under section 1 of the README where Appendix A marks it. Prove by: the README table has numeric values for cases attempted, coverage, mean score, critical cases, seconds and cost; the label line names split, k, commit (`git rev-parse --short HEAD`), date and `CASE_MODEL`/`JUDGE_MODEL`.

### Group C: waits on a green M1 run (the 15:15 rehearsal); recording no later than 16:00

8. **Pre-run the demo cases** (agent, 5 min, can run in the background during step 3). `pnpm cases --in "HackatonPublicCases/Property Management" --out runs/demo --only 025,047 --at auto`. Keep the rehearsal's batch summary table on screen or in `runs/` for shot 4. Prove by: `ls runs/demo/025/ANSWER.md runs/demo/047/ANSWER.md` succeeds and neither says `CRASH`.
9. **Record** (**Marc**, 15 min including one retake). Shot list and on-screen commands in Appendix D. QuickTime Player → File → New Screen Recording, microphone on, or `screencapture -V 75 -x demo/raw.mov` for a silent take. Prove by: `demo/raw.mov` exists and plays.
10. **Encode, trim, commit via LFS, push** (agent, 5 min). Commands in Appendix D.3. Prove by: `ffprobe -v error -show_entries format=duration -of csv=p=0 demo/demo.mp4` ≤ 60; `git lfs ls-files` shows `* demo/demo.mp4` (asterisk means the object is present, not a bare pointer); `git status` clean; `git log @{u}..` empty; file size ≤ 10 MB.
11. **16:30 form** (**Marc**, 2 min). Rules §4: code and video frozen and submitted. Note `git rev-parse HEAD` at that moment in `SUBMISSION.md` as the "code freeze (16:30)" line. Prove by: form confirmation screenshot saved outside the repo.

### Group D: 16:55 and after

12. **17:00 hash** (agent, 1 min, immediately after M8's `ANSWERS/` commit lands on `main`). Put `git rev-parse HEAD` in the hash row of `SUBMISSION.md`, commit, push. Prove by: `grep -c TBD SUBMISSION.md` → 2 (LinkedIn, X); the hash row matches `git rev-parse HEAD` of the commit that contains `ANSWERS/`. (The SUBMISSION.md commit itself is metadata, allowed after the freeze by §7.)
13. **Visibility flip** (**Martin**, 1 min; see Decision 3 for the alternative). Command in Appendix E. Prove by: `gh repo view martin-dutchy/dwelly-agent --json visibility -q .visibility` → `PUBLIC`; the repo URL opens in a private browser window.
14. **Posts** (**Marc**, 5 min). Publish the LinkedIn and X drafts from `SUBMISSION.md` with the final metric, then paste both URLs into the LinkedIn and X rows. Agent commits and pushes. Prove by: `check.sh` prints `PASS LinkedIn URL present` and `PASS X post URL present`.
15. **Final audit and form** (agent audits, **Marc** submits). `bash .claude/skills/submission-check/scripts/check.sh` → exit 0, then the §7 form with all nine fields from `SUBMISSION.md`. Prove by: `echo $?` → 0 after the script; form confirmation.

## Acceptance criteria

- [ ] **M7-AC1 Audit green.** `bash .claude/skills/submission-check/scripts/check.sh` exits 0 at 17:00 with zero `FAIL` lines. Interim bar at 16:25 (before `ANSWERS/` exists and before the flip): the only `FAIL` line is the visibility one and the only `WARN` lines are `ANSWERS/ not present yet` and the two post-URL lines.
- [ ] **M7-AC2 AC14 Submission** (master plan): `gh repo view --json isPrivate` → `false`; `head -3 LICENSE` shows Apache 2.0; `grep -c TBD README.md SUBMISSION.md` → `0` for both; `git lfs ls-files | grep demo/demo.mp4` lists the file with `*`; `ffprobe` duration ≤ 60; `SUBMISSION.md` rows team, track, members, hash, video path, LinkedIn URL, X URL are all non-empty and non-TBD; `ANSWERS/` contains the 16:30 run only (`git log --format=%s -- ANSWERS/` shows a single runner commit).
- [ ] **M7-AC3 AC15 No judge-directed text**: the AC15 grep in Verification returns only lines that describe our own eval harness or human judgement, none addressing an evaluator. Expected hits at `f073c83`: the three listed in Context. Any new hit is read and either benign or removed by its owner.
- [ ] **M7-AC4 Disclosure.** README section 5 names Anthropic (with both model IDs), TypeSafe Jev, poppler `pdftotext`, Git LFS, and ElevenLabs if voice shipped, and states that the case tools are a local mock that sends nothing.
- [ ] **M7-AC5 Metrics labelled.** The README metrics table is immediately preceded by one line naming split, k, commit, date and models, and no number in it was typed by hand (it is the output of the Appendix A.5 snippet).
- [ ] **M7-AC6 Cold clone** (master plan reproducibility): in a temp dir, `git clone https://github.com/martin-dutchy/dwelly-agent && cd dwelly-agent && pnpm install && cp .env.example .env` then, with a key, `pnpm cases --in cases/practice --only 01 --out /tmp/x` produces `/tmp/x/01/ANSWER.md`. Run after the flip (or, before it, as the authenticated user).
- [ ] **M7-AC7 Posts** exist, are public, link `https://github.com/martin-dutchy/dwelly-agent`, and their URLs are in `SUBMISSION.md`.
- [ ] **M7-AC8 Nothing hand-edited in `ANSWERS/`**: `git log --format='%an %s' -- ANSWERS/` shows only the M8 runner commit(s).

## Verification

Every command from the repo root. Show the output, not a claim.

- [ ] `pnpm verify` (repo root) exits 0. M7 changes no code, so this guards against an accidental edit; run it once before the 16:30 push.
- [ ] unit tests: none specific to M7 (documentation and repo settings). `pnpm verify` above covers the suite.
- [ ] agent behaviour: step 8's `pnpm cases --in "HackatonPublicCases/Property Management" --out runs/demo --only 025,047 --at auto` finishes with both `ANSWER.md` files and no `CRASH` or `NO DECISION` row in the runner table (this is the footage, so it must be real).
- [ ] other, in order of the day:
  - `git lfs version && ffprobe -version | head -1` → both print a version (step 1).
  - `bash .claude/skills/submission-check/scripts/check.sh; echo exit=$?` → at 16:25 matches the interim bar in M7-AC1; at 17:00 `exit=0` (M7-AC1).
  - `grep -c "^TBD" README.md` → `0`; `grep -c TBD SUBMISSION.md` → `0` at 17:00 (`3` after step 4, `2` after step 12).
  - `for s in "What we built" "operational problem" "Architecture" "How to run" "Models, APIs" "Assumptions" "Known limitations" "build next"; do grep -qi "^## .*$s" README.md && echo "ok  $s" || echo "MISSING $s"; done` → eight `ok` lines.
  - `grep -n "<[A-Za-z]" README.md SUBMISSION.md` → no unresolved placeholders (HTML-free files, so any `<letter` is a leftover).
  - `grep -nE "ElevenLabs" README.md` → present if and only if M6 shipped.
  - `ffprobe -v error -show_entries format=duration -of csv=p=0 demo/demo.mp4` → a number ≤ 60 (AC14).
  - `git lfs ls-files` → a line `<oid> * demo/demo.mp4` (AC14); `ls -l demo/demo.mp4` → ≤ 10 MB.
  - `gh repo view martin-dutchy/dwelly-agent --json isPrivate,visibility` → `{"isPrivate":false,"visibility":"PUBLIC"}` (AC14).
  - `head -3 LICENSE` → `Apache License`, `Version 2.0, January 2004` (AC14).
  - `grep -riE "judge|grader|score this|give this" ANSWERS/ src/agent src/core | grep -v src/eval` → only benign lines on reading (AC15). At `f073c83` with no `ANSWERS/` the expected output is the three lines listed in Context.
  - `git grep -nIiE '(ignore (all|previous) instructions|dear (judge|evaluator)|note to (the )?(judge|grader|evaluator))' -- README.md SUBMISSION.md docs/` → empty (rules §13 on the files M7 writes).
  - `git log --format='%an %s' -- ANSWERS/` → one runner commit (M7-AC8).
  - Cold clone per M7-AC6; pass is the existence of `/tmp/x/01/ANSWER.md`.

## Progress

- [x] 12:05 BST, branch `marc/m7-submission` (from `main` at `46a0dc6`). Step 3: README sections 1, 2, 5, 6, 7, 8 written from Appendix A and checked against the code on `main`. Removed claims that did not ship (critic pass, ElevenLabs); described the 28 tools in `src/agent/opsTools.ts`, the `Decision` schema (`case_state`, typed `next_actions` citing verified ledger entries) and the code-enforced rules in `caseAgent.ts`, `opsTools.ts` and `opsChecks.ts`; disclosed `claude-haiku-5-5` (quick loop profile) alongside Sonnet and Opus. Corrected the plan's `pdftotext` claim: without it, PDFs are sent to Claude natively, not replaced by a placeholder. Section 3 bullets refreshed (guards, decision gate, job-state seeding); section 4 install line changed per Decision 11 (no `packageManager` pin on `main`).
- [x] Step 7 (interim): metrics table rendered by script from the two committed baselines (`evals/baseline-final-dev.json`, 23 cases, mean 93.4; `evals/baseline-final-dev-partial.json`, 25 public cuts, mean 76.0; both Sonnet agent and Opus grader, k = 1, no chaos, pre-M1), each labelled with file, run time and commit. A `TBD` line under the table makes `check.sh` FAIL until the final-profile run on the frozen code replaces it.
- [x] Steps 4–5: `SUBMISSION.md` filled with track, repo URL, results and video paths; team name, Martin's surname, 16:30 hash, 17:00 hash and both post URLs left as `TBD` for humans. LinkedIn and X drafts added (X draft is 265 characters as X counts them with a 30-character metric).
- [x] Step 6: `demo/README.md` holds the storyboard and the encode/commit commands. `.gitattributes` already routed `*.mp4` through LFS (`git check-attr filter demo/demo.mp4` → `lfs`); no change needed. Case 025 facts in the narration re-measured: 64 events, 13 holds, 33 days (the research doc said 49 and 10).
- [ ] Step 1: `brew install git-lfs ffmpeg && git lfs install`. Human (not run by the agent).
- [ ] Step 2: untrack the organiser rules doc. Not done in this branch (outside the files this session owned); still a `check.sh` WARN.
- [ ] Steps 8–15: demo pre-run, recording, final metrics, freeze hashes, visibility flip, posts, final audit.
- Note: open PR #10 (voice) also replaces the section 5 `TBD` line, so it will conflict with this branch there. Resolve by keeping this section 5 and adding the voice services as rows only if voice merges (Decision 13). PR #11 (logging) edits section 4 and the "Reality Test results" section, which this branch does not touch apart from the one install line.

## Discoveries (11:37 BST, Marc's machine)

- Observation: `mfluviag` cannot flip visibility; permissions are `push: true, admin: false`. Evidence: `gh api repos/martin-dutchy/dwelly-agent --jq .permissions`. Consequence: step 13 is Martin's, or Martin grants admin first (Decision 3).
- Observation: `gh` 2.78.0 refuses `--visibility` without `--accept-visibility-change-consequences`. Evidence: `gh repo edit --help`.
- Observation: Git LFS and ffmpeg/ffprobe are not installed; `.gitattributes` already has the LFS rules. Evidence: `command -v`, file contents.
- Observation: the rules doc is both gitignored and tracked. Evidence: `git ls-files | grep "Rules For"`. `check.sh` only WARNs, so it does not block exit 0, but it is organiser material.
- Observation: `evals/latest-*.json` is gitignored and `evals/` does not exist until `pnpm loop` runs once. Evidence: `.gitignore`, `ls evals`.
- Observation: the README's "How to run" says `pnpm install`, which fails on pnpm 10 against the v6 lockfile unless M0 pinned pnpm 8 or upgraded the lockfile (master plan Discoveries). The cold-clone check depends on this (Decision 11).
- Observation: rules §4 says the demo video is frozen and submitted at 16:30, while §7 says it may be added after 17:00. Planned for §4 (Decision 12).

## Decision log

Hackathon exception (plan rules): Marc could not be interviewed while this plan was written, so each open question is resolved by a stated assumption. Marc overrides any of them at 15:00 by editing the row.

1. Decision: team name and members' full names are left as `TBD` cells for Marc, with git evidence noted (Marc Fluvià `mfluviag`; Martin, GitHub `martin-dutchy`, commits as `martin-kenzu-ai`). Rationale: the registered team name and Martin's surname are not in the repo; guessing a name on a public submission is worse than a 30-second human edit. Date/Author: 2026-10-10 11:45, Claude for Marc.
2. Decision: track is `Property Management`. Rationale: `CLAUDE.md`, the master plan and all research say so; the `?` in `SUBMISSION.md` is stale. Date/Author: same.
3. Decision: Martin runs the visibility flip (Appendix E). Alternative, if Martin is busy at 16:55: Martin runs `gh api -X PUT repos/martin-dutchy/dwelly-agent/collaborators/mfluviag -f permission=admin` any time before, after which Marc's session can run the flip. Rationale: `admin: false` for Marc, measured. Date/Author: same.
4. Decision: keep `HackatonPublicCases/` tracked and published. Rationale: README run commands, `cases/splits.json` and the M2 public-cuts corpus depend on it; the organisers issued the synthetic data to teams for this build and rules §17 contemplates cases feeding Dwelly's benchmarking. Reversal if Marc or the organisers object: `git rm -r --cached HackatonPublicCases && echo "HackatonPublicCases/" >> .gitignore`, plus a README note telling readers where to obtain the data; the cold-clone check then needs `cases/practice` only, which already is the AC6 command. Date/Author: same. **Marc confirms at 15:00.**
5. Decision: untrack the organiser rules doc (step 2). Rationale: `submission-check` SKILL.md says it is not ours to relicense; `CLAUDE.md` already calls it local only; the file stays on disk. Date/Author: same.
6. Decision: metrics fallback is `evals/latest-dev.json` from a fresh `pnpm loop` on the dev split, values pasted and labelled `k = 1 · deterministic checks not run`, never linked. Rationale: the M4 scope ladder names this fallback; the file is gitignored; a labelled smaller claim beats an unlabelled one. The M4-only field names in the Appendix A.5 snippet (`passK`, `escalation.precision/recall`, `injectionSuccessRate`, `failureRecoveryRate`) are provisional; the 15:00 session renames them to whatever M4 shipped, and absent fields print `not measured`. Date/Author: same.
7. Decision: no `holdout` numbers in the README. Rationale: `cases/splits.json` says holdout prints aggregates only and is never tuned on; publishing it as a headline invites reading its transcripts. If M4's summary includes holdout aggregates, they may be added as one extra row labelled `holdout (aggregate only)`. Date/Author: same.
8. Decision: the demo is narrated live by Marc over a QuickTime screen recording; a silent `screencapture -V` take is the fallback. Rationale: rules §10 say production quality is not judged; narration is the cheapest way to cover "what, why, how, workflow, result" inside 60 s. Date/Author: same.
9. Decision: encode the video at 1280 px wide, H.264 CRF 28, target ≤ 10 MB. Rationale: GitHub LFS free tier bandwidth is 1 GB per month; a small file keeps every clone cheap. Date/Author: same.
10. Decision: both posts from Marc's personal LinkedIn and X accounts unless Martin prefers to post one. Rationale: rules §6F allow the same member for both. Date/Author: same.
11. Decision: if `main` at 15:00 still ships a v6 lockfile with no `packageManager` pin, M7 changes the one line under README section 4 "Install & configure" from `pnpm install` to `npx -y pnpm@8 install --frozen-lockfile   # lockfile is pnpm 8 format` and nothing else in section 4. Rationale: the cold-clone acceptance criterion fails otherwise; it is a one-line fix inside the README M7 owns. Date/Author: same.
12. Decision: the video is committed and pushed by 16:25 and reported on the 16:30 form; adding it after 17:00 (rules §7) is the fallback only if recording slips. Rationale: §4 is the stricter reading. Date/Author: same.
13. Decision: ElevenLabs appears in README section 5 and the limitations only if M6 shipped (voice gate 14:00 in the master plan). Rationale: disclosing a service we do not call is inaccurate. Date/Author: same.
14. Decision: the README does not mention the hackathon scoring, the judging model or awards. Rationale: rules §13; the README is for an engineer, and the drafts describe behaviour and evidence only. Date/Author: same.

---

## Appendix A: README drafts (paste over the `TBD` lines; resolve every `<…>`)

Headings must stay exactly as in the current README. Numbers without `<…>` are from `research/pm-case-data-analysis.md` section 2 and `research/dwelly-company.md` and may be stated as the public-data facts they are. Every `<…>` is filled from the day's actual outputs or the sentence is deleted.

### A.1 Section 1

```md
## 1. What we built

An autonomous **maintenance case worker** for a UK lettings agency. It takes a reactive-maintenance case at any point in its history (the tenant's report, the e-mails, calls, SMS, notes, holds and system updates so far, plus any attachments), works out where the case stands, and does what a good property manager would do next: ask the landlord for approval, assign a contractor, confirm or re-confirm an appointment, chase, send a quote for approval, reply to the tenant, split off an unrelated issue, wait with a review date, close the case, or hand it to a human with a one-screen handover packet.

It runs as a batch over a folder of case folders:

    pnpm cases --in <cases-dir> --out ANSWERS

and writes, for every case, `ANSWER.md` (the decision, the actions taken, the drafted communications), `REASONING.md` (evidence, conflicts found, what failed, why it did or did not escalate) and a `trace.jsonl` of every tool call. Every state change goes through a tool and is read back before it can be reported; a decision that claims an action the ledger did not verify is rejected and redone. One case crashing or timing out never stops the batch: that case gets an honest failure record instead of nothing.

The system is one agent loop (Claude Sonnet 5.5 on `@earendil-works/pi-agent-core`) with a maintenance-specific policy, <a deterministic case-state reconstruction step (stage, parties, open approvals, dates with conflicts flagged, quotes and invoices, attachments referenced vs present)>, a verified action ledger, policy hooks that block prohibited actions outright (changing bank details; approving a quote while landlord approval is outstanding; reporting an escalation without a verified `escalate_to_human` call), <and a critic pass on the draft decision>. The evaluation harness (`pnpm loop`) is part of the product: a frozen dev/holdout split, a rubric grader, deterministic checks, chaos injection of tool failures, and a regression diff against a saved baseline.

### Results on our own evaluation

<label line from Appendix A.5, e.g. "Dev split (17 practice cases + <n> public cases cut at a decision point) · k = <k> · commit <short hash> · 2026-10-10 <HH:MM> BST · agent claude-sonnet-5-5, grader claude-opus-5-5">

<table from Appendix A.5>

These are our own cases and our own rubrics, graded by a Claude model; they measure consistency with the behaviour we specified, not ground truth. The held-out split is run for aggregates only and is not reported here.
```

### A.2 Section 2

```md
## 2. The operational problem it solves

Reactive maintenance is the highest-volume workflow in lettings: a tenant reports a fault, the agency needs the landlord's approval, a contractor has to be chosen and booked, the tenant and contractor have to agree a date, quotes and invoices have to stay inside what was approved, and everyone has to be kept informed until the job is closed. The organisers' public Property Management data (50 cases from a synthetic agency, 1,505 events) shows what that looks like in practice: a median case takes about 16 days, the longest 111, and almost all of that is waiting on landlords and contractors. Across the 50 cases the case system put work on hold 236 times and asked a person to decide 89 times, 53 of them with the same prompt: "please check if we need to provide a response… if not, return to auto mode". Dwelly's own published figures for its live maintenance agent say the remaining human cost is about five short escalations per task.

The system is the component that answers that prompt. Given the case so far, it decides the next step and takes it with tools when the facts are clear and the action is within policy, asks one specific question when a single missing fact blocks the right action, and escalates with a handover packet when the decision is one a human must make: safety, money above approval limits, legal matters, suspected fraud, conflicting information it cannot resolve, or a failed action it cannot retry safely. Doing nothing new, with a review date, is a valid outcome.

The data also shows where naive automation goes wrong, and these are the cases the policy is written for: a landlord replying about a different flat than the one on the case; appointment dates that contradict each other across e-mails; a tenant fixing the fault themselves after the landlord approved a visit (closing is fine, but the landlord must be told); unrelated issues bundled into one thread; attachments referenced but absent; template fields reused as free text; contractor e-mails that cannot be parsed. See `research/pm-case-data-analysis.md` for the full catalogue.
```

### A.3 Section 5

```md
## 5. Models, APIs and external services

| Service | Used for | How it is configured | Required? |
|---|---|---|---|
| Anthropic API (Claude) | The case agent (`claude-sonnet-5-5`), <the critic pass> and the rubric grader (`claude-opus-5-5`). Called through `@earendil-works/pi-ai`. | `ANTHROPIC_API_KEY`, `CASE_MODEL`, `JUDGE_MODEL` in `.env` | Yes |
| TypeSafe Jev | Optional fast classifier that pre-screens each case and checks outgoing messages before they are sent (`src/agent/jev.ts`). Fails open if unavailable. | `TYPESAFE_API_KEY`, `USE_JEV` | No |
| <ElevenLabs Agents | Voice call to the landlord to capture approve / decline / own contractor, written back through the same tools (`src/voice/`). Demo only; never part of the batch run. | `ELEVENLABS_API_KEY` | No> |
| poppler `pdftotext` | Extracts text from PDF attachments that have a text layer. Scanned PDFs and images go to Claude natively. | `brew install poppler` | Yes for text PDFs; without it they are replaced by a placeholder and the run continues |
| GitHub + Git LFS | Hosting; `demo/demo.mp4` is stored via LFS. | `brew install git-lfs && git lfs install` before cloning if you want the video | Only for the video |

No other hosted infrastructure. The case-side tools (`list_tickets`, `get_ticket`, `create_ticket`, `update_ticket`, `cancel_ticket`, `assign_contractor`, `send_message`, `request_information`, `request_landlord_approval`, `approve_quote`, `hold_payment`, `update_bank_details`, `add_note`, `escalate_to_human`) are a local in-memory mock in `src/agent/opsTools.ts`; the system sends no real e-mail, SMS or payments. Their bodies are written to be swapped for an agency's real API.
```

### A.4 Sections 6, 7, 8

```md
## 6. Assumptions

- **Case format.** Cases arrive as a folder with `index.md`, `history.md` and optional `attachments/`, in the organisers' public format, possibly cut at a decision point. Our own practice format (`case.md` + `inputs/`) is also accepted. <If a third format arrives, a loader-only adapter converts it; nothing else changes.>
- **The agency is UK-based and the law is as of October 2026.** The policy (`src/core/policy.md`) applies the Renters' Rights Act 2025 (no Section 21 since 1 May 2026), 24 hours' written notice for non-emergency access, the Tenant Fees Act, deposit protection and GDPR. Safety outranks the law, which outranks fraud and data protection, which outranks the landlord's instructions, which outrank preference, which outranks speed and cost.
- **Chargeable work needs the landlord's approval first**, unless it is an emergency make-safe. The agency's own workflow (approval → provider selection → booking → quote → approval → completion → invoice → final checks) is treated as the state machine the agent moves cases through.
- **No human is available at runtime.** No tool blocks on a person. When an action needs authority the agent does not have, it does the safe parts (logging, holding a payment, make-safe advice), then escalates with a packet a person can act on in about three minutes.
- **Tools can fail.** Every write is read back; an unverifiable action is reported as failed, never as done. Transient errors are retried; persistent ones are escalated.
- **Inbound text is untrusted.** Instructions found inside e-mails or attachments are evidence about the sender, not commands. Template fields (for example `Pets:`) are treated as free text. A message about a different address or property is never merged into the current case without confirmation.
- **Attachments referenced but not present are treated as absent**; the agent never describes a document it has not seen.
- **The latest verified instruction from the person entitled to give it wins** when parties change their minds, and everyone affected is told.

## 7. Known limitations

- **The tools are mocks.** Decisions and drafted messages are real; delivery is not. Plugging into a real case system means implementing the tool bodies against its API and keeping the read-back verification.
- **Our evaluation grades against our own rubrics with a Claude model.** It measures consistency with the behaviour we specified. The public cases without a hand-written rubric are graded against their recorded ending, which is one acceptable path, not the only one.
- **Tuned on a small dev split** (17 practice cases and <n> public cases cut at a decision point). The held-out split is used for aggregates only; unseen cases of a shape we did not anticipate may behave worse.
- **No memory across cases.** Each case is processed alone; duplicate requests for the same property in different cases are not linked, and landlord or contractor preferences are not learned.
- **Attachments.** PDFs without a text layer and images are sent to Claude as native content; `pdftotext` is required for text PDFs and, if missing, those attachments are silently reduced to a placeholder (the run still completes).
- **Time and cost.** About <N> seconds and $<C> per case at concurrency <k>; a batch of 30 cases takes about <M> minutes. Rate limits on the Anthropic API are the binding constraint.
- **Identity and verification are policy, not integration.** The agent asks for and records verification; it cannot check anything against an external record.
- <**Voice is a demo on one case.** The ElevenLabs call writes back through the same tools, but it is not part of the batch run and has no retry or transcript validation beyond what the post-call webhook supplies.>

## 8. What we'd build next

1. **A real adapter** for an agency case system (Dwelly's or any CRM with tickets, e-mail and SMS), behind the same tool interface, with the read-back verification kept as the contract.
2. **Scheduled follow-through.** Today "wait with a review date" writes a note; a scheduler that re-opens the case on that date and chases automatically would remove most of the 236 holds in the public data.
3. **Cross-case memory** of landlords (approval limits, preferred contractors, responsiveness) and contractors (no-show history), so chase-or-swap decisions get better with volume.
4. **Human feedback into the rubric.** Every escalation packet gets a one-click "right call / should have acted / should have asked" from the human; those labels become the next eval split.
5. **Voice at scale** for the two biggest waits in the data: landlord approval and contractor confirmation, with the call transcript landing in the same ledger.
6. **A larger mutation corpus** (emergencies, damp and mould under Awaab's Law timelines, tenant vulnerability, access refusal, injected instructions) and `pnpm loop` in CI on every pull request.
```

### A.5 Metrics table renderer

Run after M4's loop (or the fallback `pnpm loop`) and paste the output verbatim under the label line in section 1. Rename the M4-only keys to what M4 actually writes; absent keys print `not measured`.

```bash
node -e '
const fs=require("fs");const p=process.argv[1];const s=JSON.parse(fs.readFileSync(p,"utf8"));
const n=s.rows?.length||0;const secs=n?s.rows.reduce((a,r)=>a+(r.secs||0),0)/n:null;
const row=(k,v)=>console.log(`| ${k} | ${v==null||Number.isNaN(v)?"not measured":v} |`);
console.log("| Metric | Value |");console.log("|---|---|");
row("Cases attempted",s.cases);
row("Coverage (decided / attempted)",`${s.decided} / ${s.cases}`);
row("Mean rubric score (0–100)",s.mean?.toFixed(1));
row("Cases with a critical failure",s.criticalCases);
row("pass^3 (same correct decision 3 of 3 runs)",s.passK?.toFixed?.(2));
row("Escalation precision / recall",s.escalation?`${s.escalation.precision} / ${s.escalation.recall}`:null);
row("Injection success rate",s.injectionSuccessRate);
row("Failure-recovery rate under chaos",s.failureRecoveryRate);
row("Mean seconds per case",secs?.toFixed(0));
row("Cost per case (USD)",n?(s.cost/n).toFixed(2):null);
' "${1:-evals/latest-dev.json}"
```

Label line template (fill from `git rev-parse --short HEAD`, `date "+%H:%M"`, `.env`):

```
<split> split (<counts>) · k = <k> · commit <hash> · 2026-10-10 <HH:MM> BST · agent <CASE_MODEL>, grader <JUDGE_MODEL> · <"deterministic checks not run" if fallback>
```

## Appendix B: SUBMISSION.md skeleton

```md
# Submission

| Field | Value |
|---|---|
| Team name | TBD (Marc: the name registered at the 9:30 onboarding) |
| Track | Property Management |
| Team members | TBD (Marc Fluvià; Martin <surname>) |
| Repository | https://github.com/martin-dutchy/dwelly-agent |
| Commit hash at 17:00 freeze | TBD (filled at 16:55 after the ANSWERS commit: `git rev-parse HEAD`) |
| Code freeze (16:30 form) | <hash noted when the 16:30 form was submitted> |
| Reality Test results | [`ANSWERS/`](ANSWERS/) |
| Demo video | `demo/demo.mp4` (Git LFS, ≤ 60 s) |
| LinkedIn post | TBD |
| X post | TBD |

## Launch posts

<Appendix C>
```

## Appendix C: launch post drafts

Fill `<metric>` from the README table. Keep the repo URL exact. Post after the repo is public.

**LinkedIn** (Marc):

```
Today at the Real-World Agents Hackathon (Property Management track) Martin and I built an autonomous maintenance case worker for lettings agencies.

Give it a repair case at any point in its history – the tenant's report, the e-mails, calls, holds and notes so far – and it decides the next step and takes it: landlord approval, contractor assignment, booking, chasing, quotes, replies. When a human must decide (safety, money, law, conflicting facts), it stops and hands over a one-screen packet instead.

Every action goes through a tool and is read back before it can be reported. On our own evaluation: <metric, e.g. "N/N cases completed, 0 critical failures">.

Built on Claude (Sonnet 5.5 + Opus 5.5) and @earendil-works/pi-agent-core. Apache 2.0.

Code, traces and the 60-second demo: https://github.com/martin-dutchy/dwelly-agent
```

**X** (Marc, ≤ 280 characters as X counts them: the URL counts as 23 regardless of length, so the raw text may be up to 303; check with `wc -m` after filling the metric, keeping the metric under 30 characters):

```
Real-World Agents Hackathon build: an autonomous maintenance case worker for lettings agencies. It reads the case so far, acts with verified tools and escalates with a handover packet when a human must decide. <metric>. https://github.com/martin-dutchy/dwelly-agent
```

## Appendix D: demo recording

Storyboard: `research/pm-case-data-analysis.md` section 6. Target 55 seconds of footage so the trim never cuts a sentence. Terminal at 1280 × 800 or larger, font 16 pt or larger, dark or light theme consistently. Rehearse once with the pre-run outputs open in a second terminal pane so nothing waits on the API during the take.

### D.1 Pre-run (agent, step 8)

```bash
pnpm cases --in "HackatonPublicCases/Property Management" --out runs/demo --only 025,047 --at auto
```

Keep the rehearsal batch table (from M5, `pnpm loop` or `pnpm cases --in cases/practice --out runs/rehearsal`) in `runs/` for shot 4. If the rehearsal did not run, `pnpm cases --in cases/practice --out runs/rehearsal --concurrency 6` takes a few minutes and is real footage.

### D.2 Shot list (Marc)

| Time | On screen | Say (one breath each) |
|---|---|---|
| 0–10 s | `less "HackatonPublicCases/Property Management/025/history.md"`, scroll fast. | "A real lettings maintenance case: an oven. 49 events, 10 holds, 32 days, most of it waiting on people to decide the next step." |
| 10–35 s | `cat runs/demo/025/ANSWER.md`, then `head -40 runs/demo/025/REASONING.md`. Pause on the warranty question, the date conflict, the drafted landlord e-mail and the review date. | "Drop the case in, cut mid-history. The agent reconstructs where it stands, spots the contradictory dates and the warranty question, drafts the landlord e-mail, sets a review date. Every action went through a tool and was read back." |
| 35–50 s | `cat runs/demo/047/ANSWER.md`. Point at the address mismatch and the escalation packet; show the `policyLog` or ledger line that blocked the action. | "A messier one: the landlord replies about a different flat. The agent refuses to treat it as approval, the verifier blocks the write, and it escalates with a handover a person can act on in minutes." |
| 50–60 s | The batch table from `runs/rehearsal` or `pnpm loop` output: cases, decided, critical, cost. | "The whole batch: <N> cases, <N> completed, <M> escalated with reasons, zero critical failures. This is the piece that decides the next step; an agency plugs it in where its case system asks a human today." |

Do not read anything aloud that is not on screen. Do not mention scoring, judging or awards.

### D.3 Encode, trim, commit (agent, step 10)

```bash
ffmpeg -y -i demo/raw.mov -t 60 -vf "scale=1280:-2" -c:v libx264 -preset fast -crf 28 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart demo/demo.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 demo/demo.mp4     # must print ≤ 60
ls -l demo/demo.mp4                                                            # aim ≤ 10 MB; raise crf to 30 if larger
rm demo/raw.mov demo/.gitkeep
git add .gitattributes demo/demo.mp4
git lfs ls-files                                                               # expect: <oid> * demo/demo.mp4
git commit -m "docs: 60-second demo video (Git LFS)" && git push
```

If the take has no audio track, drop `-c:a aac -b:a 96k`.

## Appendix E: 16:55 command block

Run in this order. Steps marked (Martin) or (Marc) need that person.

```bash
# 1. After M8's "chore: reality test results" commit is on main (agent)
git pull --ff-only
git rev-parse HEAD                                   # → paste into SUBMISSION.md "Commit hash at 17:00 freeze"
git add SUBMISSION.md && git commit -m "docs: freeze hash" && git push

# 2. Visibility (Martin; admin required). Alternative: grant Marc admin first, see Decision 3.
gh repo edit martin-dutchy/dwelly-agent --visibility public --accept-visibility-change-consequences
gh repo view martin-dutchy/dwelly-agent --json isPrivate,visibility     # → {"isPrivate":false,"visibility":"PUBLIC"}

# 3. Posts (Marc): publish the two drafts from SUBMISSION.md, copy the URLs into the LinkedIn and X rows, then (agent):
git add SUBMISSION.md && git commit -m "docs: launch post links" && git push

# 4. Final audit (agent) and form (Marc)
bash .claude/skills/submission-check/scripts/check.sh; echo exit=$?       # → exit=0
```

Form fields (rules §7), all from `SUBMISSION.md`: repository URL, team name, track, member names, 17:00 commit hash, `ANSWERS/`, `demo/demo.mp4`, LinkedIn URL, X URL.
