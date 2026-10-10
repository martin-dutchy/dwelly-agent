#!/usr/bin/env bash
# Mechanical audit of the hackathon submission requirements (rules §6, §7, §13).
# Usage: bash .claude/skills/submission-check/scripts/check.sh [repo-slug]
# Prints PASS/FAIL/WARN lines; exits 1 if any FAIL.
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"
fail=0
pass() { echo "PASS  $1"; }
bad()  { echo "FAIL  $1"; fail=1; }
warn() { echo "WARN  $1"; }

# G. Apache 2.0 licence
if [ -f LICENSE ] && grep -q "Apache License" LICENSE && grep -q "Version 2.0" LICENSE; then pass "LICENSE is Apache 2.0"; else bad "LICENSE missing or not Apache 2.0"; fi
grep -q '"license": "Apache-2.0"' package.json 2>/dev/null && pass "package.json license field" || warn "package.json license field not Apache-2.0"

# B. README sections 1-8 present and not TBD
if [ -f README.md ]; then
  for s in "What we built" "operational problem" "Architecture" "How to run" "Models, APIs" "Assumptions" "Known limitations" "build next"; do
    grep -qi "^## .*$s" README.md && pass "README section: $s" || bad "README section missing: $s"
  done
  n=$(grep -c "^TBD" README.md || true)
  [ "$n" -eq 0 ] && pass "README has no TBD placeholders" || bad "README still has $n TBD placeholder(s)"
else bad "README.md missing"; fi

# A. Env vars documented, no secrets committed
[ -f .env.example ] && pass ".env.example present" || bad ".env.example missing"
git ls-files --error-unmatch .env >/dev/null 2>&1 && bad ".env is tracked by git" || pass ".env not tracked"
if git grep -nIE '(sk-ant-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{32,}|xi-api-key[^\n]{0,5}[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{30,}|-----BEGIN [A-Z ]*PRIVATE KEY)' -- . ':!pnpm-lock.yaml' >/dev/null 2>&1; then
  bad "possible secret in tracked files:"; git grep -nIE '(sk-ant-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{32,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{30,}|-----BEGIN [A-Z ]*PRIVATE KEY)' -- . ':!pnpm-lock.yaml' | cut -c1-120
else pass "no obvious secrets in tracked files"; fi

# C/D. ANSWERS/<n>/ANSWER.md + REASONING.md
if [ -d ANSWERS ]; then
  cases=$(find ANSWERS -mindepth 1 -maxdepth 1 -type d | wc -l | tr -d ' ')
  missing=0
  for d in ANSWERS/*/; do
    [ -s "$d/ANSWER.md" ] && [ -s "$d/REASONING.md" ] || { bad "incomplete: $d"; missing=1; }
  done
  [ "$missing" -eq 0 ] && pass "ANSWERS/: $cases case folder(s), each with ANSWER.md + REASONING.md"
  [ "$cases" -gt 0 ] || bad "ANSWERS/ is empty"
else warn "ANSWERS/ not present yet (generated from the 16:30 Reality Test)"; fi

# E. Demo video inside the repo, via LFS
vid=$(git ls-files | grep -iE '\.(mp4|mov|webm)$' | head -1)
if [ -n "$vid" ]; then
  pass "demo video tracked: $vid"
  git lfs ls-files 2>/dev/null | grep -q "$(basename "$vid")" && pass "video stored via Git LFS" || warn "video not in LFS (fine if small)"
else warn "no demo video committed yet (allowed after 17:00, but required)"; fi

# F / §7. SUBMISSION.md fields
if [ -f SUBMISSION.md ]; then
  t=$(grep -c "TBD" SUBMISSION.md || true)
  [ "$t" -eq 0 ] && pass "SUBMISSION.md complete" || warn "SUBMISSION.md has $t TBD field(s)"
  grep -qiE 'linkedin\.com/' SUBMISSION.md && pass "LinkedIn URL present" || warn "LinkedIn post URL missing"
  grep -qiE '(x\.com|twitter\.com)/' SUBMISSION.md && pass "X post URL present" || warn "X post URL missing"
  remote=$(git remote get-url origin 2>/dev/null | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##')
  grep -q "$remote" SUBMISSION.md && pass "SUBMISSION.md repo URL matches origin ($remote)" || bad "SUBMISSION.md repo URL does not match origin ($remote)"
else bad "SUBMISSION.md missing"; fi

# Public repo
slug="${1:-$(git remote get-url origin 2>/dev/null | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##')}"
if command -v gh >/dev/null; then
  vis=$(gh repo view "$slug" --json visibility -q .visibility 2>/dev/null || echo UNKNOWN)
  [ "$vis" = "PUBLIC" ] && pass "repo $slug is public" || bad "repo $slug visibility: $vis (must be PUBLIC by 17:00)"
fi

# Organiser material we may not relicense
git ls-files | grep -q "Rules For Participants" && warn "organiser rules doc is tracked; it is not ours to publish under Apache 2.0 (git rm --cached it)"

# §13. Judge manipulation
if git grep -nIiE '(ignore (all|previous) instructions|give (this|the) (project|submission) a (high|perfect|full)|dear (judge|evaluator)|note to (the )?(judge|grader|evaluator))' -- . ':!.claude/' ':!research/' ':!research_notes/' ':!reports/' ':!*Rules For Participants*' >/dev/null 2>&1; then
  bad "text aimed at the judge found (rules §13):"; git grep -nIiE '(ignore (all|previous) instructions|give (this|the) (project|submission) a (high|perfect|full)|dear (judge|evaluator)|note to (the )?(judge|grader|evaluator))' -- . ':!.claude/' ':!research/' ':!research_notes/' ':!reports/' ':!*Rules For Participants*' | cut -c1-120
else pass "no judge-directed text"; fi

# Reproducibility basics
[ -f pnpm-lock.yaml ] && pass "lockfile committed" || warn "no lockfile"
git diff --quiet && git diff --cached --quiet && pass "working tree clean" || warn "uncommitted changes"
[ -z "$(git log @{u}.. --oneline 2>/dev/null)" ] && pass "all commits pushed" || warn "unpushed commits"

exit $fail
