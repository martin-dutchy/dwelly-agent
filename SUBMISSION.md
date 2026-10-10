# Submission

| Field | Value |
|---|---|
| Team name | Agents of Estate |
| Track | Property Management |
| Team members | Marc Fluvià (GitHub `mfluviag`), Martin van der Heijden (GitHub `martin-dutchy`) |
| Repository | https://github.com/martin-dutchy/dwelly-agent |
| Commit hash at 17:00 freeze | `d55b3e4be1add18e52662458a448f6c0725e96e3` |
| Code freeze (16:30 form) | `68387876` |
| Reality Test results | [`ANSWERS/`](ANSWERS/) (30 cases, run log in [`ANSWERS/RUN_SUMMARY.md`](ANSWERS/RUN_SUMMARY.md)) |
| Reality Test input | [DwellyOrg/HackatonChallenges](https://github.com/DwellyOrg/HackatonChallenges) at `ce84e8c0`, folder `Property Management` |
| Demo video | [`demo/demo.mp4`](demo/demo.mp4) (Git LFS, ≤ 60 s) |
| LinkedIn post | https://lnkd.in/p/gYszcG7d |
| X post | https://x.com/maartie0/status/2108943707739193613 |

## Launch posts

Post only after the repository is public. The metric comes from the README results table (`evals/baseline-final-dev-k3.json`: mean 90.2 over 48 cases × 3 runs, 0 critical failures). Keep the repository URL exact.

**LinkedIn**

```
Today at the Real-World Agents Hackathon (Property Management track) Martin and I built an autonomous maintenance case worker for lettings agencies.

Give it a repair case at any point in its history (the tenant's report, the e-mails, calls, holds and notes so far) and it decides the next step and takes it: landlord approval, contractor assignment, booking, chasing, quotes, replies. When a human must decide (safety, money, law, conflicting facts), it stops and hands over a packet with what is known, what is missing and a recommendation.

Every action goes through a tool and is read back before it can be reported, and the rules that must never be broken (changing bank details, instructing work the landlord has not approved, closing a job with an unhandled invoice) are enforced in code. People see it in a live portal: import the open cases, watch each one get done, and decide only the ones it hands over, with a one-page brief and a WhatsApp reply. Its voice agent also phones landlords for approvals; we tested it on a real call with a volunteer.

On our own evaluation: a mean rubric score of 90/100 over 48 cases, three runs each, with no critical failures.

Built on Claude (Sonnet 5.5 + Opus 5.5) and @earendil-works/pi-agent-core. Apache 2.0.

Code, traces and the 60-second demo: https://github.com/martin-dutchy/dwelly-agent
```

**X** (≤ 280 characters as X counts them; the URL counts as 23, so keep the metric under 30 characters)

```
Real-World Agents Hackathon build: an autonomous maintenance case worker for lettings agencies. It reads the case so far, acts with verified tools and escalates with a handover packet when a human must decide. Mean 90/100 on our eval, 0 critical failures. https://github.com/martin-dutchy/dwelly-agent
```
