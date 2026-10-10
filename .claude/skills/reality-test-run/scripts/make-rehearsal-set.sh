#!/usr/bin/env bash
# Builds runs/rehearsal-cases/: absolute symlinks to the 25 cases of the 15:15 rehearsal
# (the frozen holdout split plus 14 public cases never used for tuning; see docs/plans/M5-reality-runner-implementation-plan.md).
# Prints counts only, never case content.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

OUT="${1:-runs/rehearsal-cases}"
PUBLIC="HackatonPublicCases/Property Management"
UNSEEN_PUBLIC=(016 046 011 009 013 022 023 018 027 028 049 005 015 029)

rm -rf "$OUT"
mkdir -p "$OUT"

link() {
  local src="$PWD/$1/$2"
  [ -d "$src" ] || { echo "missing case folder: $1/$2" >&2; exit 1; }
  [ -e "$OUT/$2" ] && { echo "duplicate case id: $2" >&2; exit 1; }
  ln -s "$src" "$OUT/$2"
}

# Holdout split, read from the frozen splits file so the two never drift.
while IFS=$'\t' read -r dir id; do link "$dir" "$id"; done < <(
  node -e 'const s=require("./cases/splits.json"); for (const g of s.holdout) for (const id of g.only) console.log(`${g.dir}\t${id}`)'
)
for id in "${UNSEEN_PUBLIC[@]}"; do link "$PUBLIC" "$id"; done

echo "rehearsal set: $(find "$OUT" -mindepth 1 -maxdepth 1 | wc -l | tr -d ' ') cases in $OUT"
