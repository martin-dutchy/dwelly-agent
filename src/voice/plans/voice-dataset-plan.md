# Voice dataset: real calls on real cases

Owner: Martin. Sub-plan of M6 in [the master plan](../../../docs/plans/dwelly-case-worker-master-plan.md). Runbook for the hosted system: [DEPLOY.md](../DEPLOY.md).

## Goal

Collect real human phone calls, with bad lines, hesitations, interruptions and twists, on the decision points the case worker is judged on. Use them to harden both the voice agent and the case worker.

## The story (one pipeline, end to end)

```
public PM case (non-holdout), cut at a decision point
  → a volunteer plays the tenant / landlord / contractor, from a persona card with a twist
  → the voice agent handles the call with case tools (verified, read back, ledgered)    [graded live: voice checks]
  → pnpm voice:export: the call becomes a Call event + Update events in that case's history
  → pnpm cases --at 100%: the case worker decides the next step from the new evidence
  → pnpm eval: the judge grades the next step against the scenario's follow-up rubric    [graded: case-worker score]
```

Both grades are stored per call: the voice grade in `/admin`, the case-worker grade in `evals/report-*.md`.

## Scenarios (src/voice/scenarios.ts)

| id | role | source | twist | what it tests |
|---|---|---|---|---|
| tenant-conflicting-appointment | tenant, inbound | 026 e16–e25 | already agreed 8 Sept with the engineer | conflicting dates; contractor is the authority |
| tenant-self-swapped-machine | tenant, inbound | 040 e05–e13 | swapped it herself; going on holiday | withdrawn scope; inform landlord; no visit during holiday |
| tenant-door-already-fixed | tenant, outbound | 014 e09–e14 | workaround worked; back door too | close-out with monitoring; split second issue |
| landlord-two-quotes | landlord, outbound | 008 e21–e38 | thinks VAT is added; roof leak elsewhere | correct totals; explicit choice; split other property |
| landlord-tenant-own-washer | landlord, outbound | 038 e04–e09 | confuses it with his other flat | address confirmation; ownership; cost cap |
| landlord-wrong-address-plumber | landlord, inbound | 047 e04–e11 | sent plumber to his other flat | address mismatch; toilet already fixed; window split |
| landlord-own-gardener | landlord, outbound | 001 e09–e26 | own contractor, no start date | close without payment path; inform both tenants |
| contractor-oven-warranty | contractor, outbound | 025 e30–e42 | 2-year manufacturer warranty | no paid repair without landlord; warranty route |
| contractor-window-unbooked | contractor, outbound | 047 e16–e35 | heard landlord's own man is doing it | no cancel on hearsay; no double dispatch |
| contractor-extra-part | contractor, inbound | 011 e18–e25 | wants £95 part approved now | agent never approves spend |
| routine-repair, gas-emergency | tenant, inbound | baseline | none | tenant line and safety baseline |

Holdout cases (031, 036, 041, 045, 048, 050) are never used; a test enforces it.

## Waves

| Wave | When | Who | What | Done when |
|---|---|---|---|---|
| W0 shake-out | today, 30 min | Martin, Marc | Every scenario once in text mode (`/admin/console`, "Text only"), then 3 by phone. Fix prompt and scenario wording. | No scenario fails for a prompt bug we already know about |
| W1 friends | today and tomorrow | 6–8 friends | 2 scenarios each, one landlord or contractor and one tenant, by phone ("Call me now"). At least 2 people calling from somewhere noisy. | Every case scenario has 2 or more calls |
| W2 family | this week | 4–6 relatives (older, varied accents) | 1 to 2 scenarios each, phone or browser | Every case scenario has 3 or more calls from 2 or more people; 30 % or more noisy |

Assign scenarios when creating each invite, so coverage is planned, not random. Use "Rotate cases" only for people doing several calls.

## What we measure (per scenario and overall)

- **Voice pass rate:** the deterministic checks in `/admin`.
- **Case-worker score after the call:** `pnpm eval` on the exports.
- **Robustness:** read-back corrections (the caller said "no" to a read-back), misheard entities (postcodes, amounts, names; compare the transcript with the card), dead air over 3 s (transcript timestamps), interruptions, and calls ended early.
- **Flags:** `unclear_audio`, failed evaluation criteria, unverified writes.

## Loop after each wave

1. Export the calls: `set -a; . ./.env.production; set +a; pnpm voice:export`.
2. Run and judge them: `pnpm cases --in datasets/voice --out runs/voice --at 100%`, then `pnpm eval --cases datasets/voice --answers runs/voice`.
3. Triage every failure into one bucket:
   - **voice prompt:** fix in `src/voice/elevenlabs/config.ts`, then `pnpm voice:sync` for both agents.
   - **tool or check:** fix in `src/voice/caseTools.ts` or `scenarios.ts`.
   - **scenario wording:** the card confused the volunteer.
   - **case worker:** raise with the core team; don't fix in voice.
4. Re-run the affected scenario in text mode before the next wave. Note what changed in the Progress section below.

## Consent and privacy

- The message and the page both say: it's an AI, the call is recorded for testing, use only the made-up details. Pressing "Call me now" is the opt-in. Nobody is called without pressing it.
- Recordings live in ElevenLabs, and transcripts and grades in Neon. To delete a person's data on request: revoke their invite, then delete their calls in Neon and the conversations in ElevenLabs.
- `datasets/` is git-ignored. Anything shown in the README or demo is a short excerpt, used only with that person's OK, and never with names or numbers.

## Messages

The `/admin` WhatsApp and "Copy message" buttons generate each person's message: their link, the persona card and the twist. Use these around them.

**Group or broadcast intro (before sending links):**
> Hi all 👋 I'm building an AI phone assistant for a lettings agency at a hackathon and need real people to test it. It's a 3-minute phone call where you play a tenant, a landlord or a builder, with a little card telling you the story. I'll send you your own link. You press "Call me now" and it rings you. It's recorded just for testing, and you only use made-up details. Bad lines, interruptions and confusion are actually helpful! Reply if you're in 🙏

**Nudge (next day, if not done):**
> No pressure, but if you have 3 minutes today, your call is still waiting: just open the link and press "Call me now" 🙂

**Thank-you (after their call):**
> Thank you so much! 🙌 Quick question if you have 10 seconds: on a scale of 1 to 5, how natural did it feel? And was there a moment it misunderstood you or was annoying?

## Progress

- [x] (2026-10-10 12:00) Pipeline proven end to end on landlord-two-quotes. The voice call graded 2/3 checks: the roof leak was mentioned but not noted, so the prompt was fixed. The case worker scored 30: it approved and put the payment on hold, but did not instruct the contractor ("no contact details on file"). That is a case-worker finding for the core team.
- [ ] W0 shake-out
- [ ] W1 friends
- [ ] W2 family

## Discoveries

- **Twilio trial:** trial accounts add a "press any key" message and can only call verified numbers. The account was upgraded on 10 Oct.
- **Mac WhatsApp:** the desktop app often drops `wa.me` pre-filled text. Use "Copy message", or open the link on a phone.
- **Restarts and grading:** grading waits in memory, so a deploy used to lose it. It now resumes on boot.
