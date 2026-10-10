# Demo video

`demo/demo.mp4`: a 60-second screen recording of the real CLI processing real cases. Stored with Git LFS (`.gitattributes` routes `*.mp4`, `*.mov` and `*.webm` through LFS); run `brew install git-lfs && git lfs install` before cloning to get the video rather than a pointer file.

The recording itself is not in the repository yet. This file is the storyboard and the commands used to make it.

## 1. Pre-run the cases shown (before recording)

The footage shows real outputs, produced ahead of time so nothing waits on the API during the take.

```bash
pnpm cases --in "HackatonPublicCases/Property Management" --out runs/demo --only 025,047 --at auto
```

Both `runs/demo/025/ANSWER.md` and `runs/demo/047/ANSWER.md` must exist and the runner table must show no `CRASH` or `NO DECISION` row. For the batch shot, keep the output of a full run (`pnpm loop --profile final`, or `pnpm cases --in cases/practice --out runs/rehearsal --concurrency 6`).

## 2. Storyboard (target 55 seconds of footage)

Terminal at 1280 × 800 or larger, font 16 pt or larger, one theme throughout. Narrate only what is on screen.

| Time | On screen | Narration |
|---|---|---|
| 0–10 s | `less "HackatonPublicCases/Property Management/025/history.md"`, scrolling fast. | "A lettings maintenance case from the organisers' data: an oven. 64 events and 13 holds over 33 days, most of it waiting on people to decide the next step." |
| 10–35 s | `cat runs/demo/025/ANSWER.md`, then `head -40 runs/demo/025/REASONING.md`. Pause on the warranty question, the date conflict, the drafted landlord e-mail and the review date. | "Drop the case in, cut mid-history. The agent works out where it stands, spots the contradictory dates and the warranty question, drafts the landlord e-mail and sets a review date. Every action went through a tool and was read back." |
| 35–50 s | `cat runs/demo/047/ANSWER.md`. Point at the address mismatch and the escalation packet; show the policy-block line in `REASONING.md` if one fired. | "A messier one: the landlord replies about a different flat. The agent does not treat it as approval, the address check holds the message, and it hands over a packet a person can act on in minutes." |
| 50–60 s | The batch summary from the full run: cases, decided, critical failures, cost. | "The whole batch: [N] cases, [N] with a decision, [M] escalated with reasons. This is the piece that decides the next step; an agency plugs it in where its case system asks a person today." |

Fill the bracketed figures from the batch summary actually shown on screen, and adjust any narration line that the pre-run outputs do not bear out (for example if case 047's run did not escalate).

## 3. Record, encode, commit

Record with QuickTime Player (File → New Screen Recording, microphone on), or `screencapture -V 75 -x demo/raw.mov` for a silent take. Then:

```bash
ffmpeg -y -i demo/raw.mov -t 60 -vf "scale=1280:-2" -c:v libx264 -preset fast -crf 28 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart demo/demo.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 demo/demo.mp4   # must print ≤ 60
ls -l demo/demo.mp4                                                          # aim ≤ 10 MB; raise crf to 30 if larger
rm demo/raw.mov
git add demo/demo.mp4
git lfs ls-files                                                             # expect: <oid> * demo/demo.mp4
git commit -m "docs: 60-second demo video (Git LFS)" && git push
```

If the take has no audio track, drop `-c:a aac -b:a 96k`.
