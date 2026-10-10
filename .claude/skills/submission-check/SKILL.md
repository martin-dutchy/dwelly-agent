---
name: submission-check
description: Audit the repo against the Real-World Agents Hackathon submission requirements (public repo, Apache 2.0 LICENSE, README sections 1-8, ANSWERS/<n>/ANSWER.md + REASONING.md, demo video in repo, SUBMISSION.md fields, no secrets, no judge manipulation). Use before any push to main, before the 16:30 and 17:00 deadlines, after editing README/SUBMISSION.md/ANSWERS, or when asked "are we compliant", "what's missing for submission", "can we submit".
---

# Submission check

Rules source: `Real-World Agents Hackathon Rules For Participants.md` (§6 deliverables, §7 form, §13 manipulation, §16 reproducibility). The repo is the canonical submission. If a deliverable is incomplete at 17:00 BST, the team can lose eligibility for some or all awards.

## 1. Run the mechanical checks

```bash
bash .claude/skills/submission-check/scripts/check.sh
```

The script reports FAIL, WARN or PASS for each check and exits 1 if any check fails. Report every FAIL and every WARN to the user, not only the summary.

## 2. Judgement checks the script can't do

Read these files and check them against the rules:

- **README** (§6B): could an independent engineer understand and run the project without talking to us? It must cover all 8 points: what we built, the problem, architecture, how to run, models/APIs/services, assumptions, limitations, and next steps. It must also list every external dependency (§14), including Anthropic, TypeSafe Jev, ElevenLabs, poppler/`pdftotext`, and anything added since. Check the run commands against `package.json` scripts and `src/run.ts` flags.
- **ANSWERS/** (§6C/D): for each case, can a reader tell what the system received, what it did, what it decided, what it escalated, what failed, and the final result? The files must be produced by `pnpm cases` and never hand-edited. Run `git log -p -- ANSWERS/` and confirm that only the runner wrote these files.
- **Traces** (§16): include logs or traces from the real run where practical, such as the runner's summary table, ledger output, or `runs/` excerpts. `runs/` is gitignored, so copy the relevant trace files next to the answers if they are needed as evidence.
- **Licensing** (§6G, §17): we must not publish organiser material or proprietary assets we have no right to relicense. The rules PDF and the organiser case data are not ours to publish.
- **No manipulation** (§13): outputs, READMEs and code comments must not contain text aimed at the judging model. Execution results must not be fabricated. Don't claim results that were not actually produced.

## 3. Report

Give a short checklist sorted by severity: first anything that would disqualify the submission or score zero (private repo, no LICENSE, missing ANSWERS, judge-directed text, secrets), then anything that loses points, then nice-to-haves. Give the exact fix for each item. Don't make the repo public, publish posts or rewrite history without asking the user first.
