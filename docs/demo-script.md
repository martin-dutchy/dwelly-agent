# Demo script: "Not any more"

The story in one line: Dwelly's open cases keep stopping to wait for a person. Our agents tag onto those cases, solve the routine ones end to end, prove every action, and hand a person only the decisions that need one.

Everything runs on the portal's `/ops/show` page unless stated. The landlord call is a real recording of a real phone call, not a simulation.

## Opening pitch (spoken, about 25 seconds)

> Dwelly operates lettings for around 15,000 properties and runs more than a thousand maintenance jobs a month. Many of those cases stop because a tenant, landlord or contractor has asked for something that a person has to pick up. Not any more. Our agents tag onto your existing cases, in your own workflow, and start solving them. We spent the day testing which action is right and when a human should decide, and this is what we've built.

## 60-second video

Voiceover runs at roughly 2.5 words a second. The call segment has no voiceover; the real audio carries it.

| Time | What's on screen | Voiceover |
|---|---|---|
| 0–7s | `/ops/show`. Open cases stream in as cards, each with its stuck reason in Dwelly's words ("Please check if we need to provide a response to provider"). Counters at zero: open cases, handled with no staff time, needed a person, staff time saved (estimate). | "Dwelly runs thousands of open cases. Every day, many of them stop and wait for a person." |
| 7–14s | Every card flips to "Agent working". | "Our agents tag onto your existing cases, read where each one is stuck, and pick it up." |
| 14–19s | Case 008 (check-out works) highlights: landlord must choose between two quotes, £1,370 or £2,040 inc VAT. Status: "Calling landlord". | "This check-out needs the landlord to choose a quote. So the agent rings him." |
| 19–34s | Call panel with the real recording and live captions. Label: "Real call with a real person, recorded today, trimmed." He says "That sounds dodgy" about VAT; the agent explains; he picks Eliza Bennett's £1,370; the agent reads it back. | (no voiceover, call audio only) |
| 34–40s | Back on case 008. Follow-up actions tick in with ✓ (read back). Card turns to "Done automatically. No staff time." | "Choice read back and recorded. Follow-ups done. No staff time." |
| 40–48s | Case 027 turns amber. Open in Decisions: question, why it came to you with the tenant's message quoted, evidence, then the recommendation, nothing pre-selected. | "This tenant asks about a parking space. There's no policy the agent can see, so it asks a person, evidence first." |
| 48–53s | "Send on WhatsApp". A WhatsApp phone slides in with the delivered reply. | "One answer, sent on WhatsApp from the portal." |
| 53–60s | Clock races through the week. Remaining cards complete; counters run up to the eval run totals. Closing line on screen. | "Across all 50 public cases, one needed a person. About 4p a case." |

## Two-minute live version

Total about 2 minutes: the opening pitch (25s), then the demo (about 95s). Press → to advance the show at each step.

1. **Pitch (0:00–0:25).** Say the opening pitch over the empty `/ops/show` page.
2. **Ingest (0:25–0:40).** Press →. Cards stream in.
   - Say: "These are open cases from the public set. Each card shows where it's stuck, in Dwelly's own workflow words."
   - Point at the counters: open cases, handled with no staff time, needed a person, staff time saved. Say that the last one is an estimate.
3. **Pick-up (0:40–0:50).** Press →. All cards go to "Agent working"; case 008 highlights.
   - Say: "The landlord has to choose between two contractor quotes before the work can go ahead. Normally someone phones him. Here the agent does."
4. **The call (0:50–1:10).** Press → to play the call. Keep the "real call" label in view.
   - Say first: "This is a real call, recorded today. Our voice agent is calling a volunteer playing the landlord, Mr Langley. It's trimmed."
   - Let the VAT moment play ("That sounds dodgy"), the explanation, his choice of £1,370, and the read-back.
   - If time allows, let the last line play: he mentions a roof leak at another property but can't give the address. Say: "Without an address it doesn't invent one." (Check the recording for what the agent says next before claiming more.)
5. **Follow-ups (1:10–1:20).** Press →. Case 008 completes.
   - Say: "Every action carries a tick because the system read it back. If a rule stops an action, you see this symbol, ⊘, with the reason. That's a rule in code, not a prompt."
6. **Needs a person (1:20–1:40).** Press →. Case 027 turns amber. Click **Open in Decisions**.
   - Walk down the page in order: the question; why it came to you, with the tenant's message quoted; what's already done and deliberately not done; evidence split into established, unverified and could not check.
   - Say: "The agent's recommendation comes last and nothing is pre-selected, so you decide rather than rubber-stamp. Options that are hard to undo need a reason."
7. **Reply (1:40–1:50).** Click **Send on WhatsApp**. The phone slides in with the delivered message. Click **Back to the overview**.
8. **Fast-forward and close (1:50–2:00).** Press →. The clock runs through the week and the counters fill.
   - Say: "Across all 50 public cases: a mean judge score of 86, one handed to a person, about 4p a case. And it plugs into the systems you already run."

If something breaks, stay on the page and narrate from the numbers table. Don't restart mid-pitch.

## Recording checklist

- [ ] Server running (`pnpm voice:serve`, or the `ops-portal-local` entry in `.claude/launch.json`).
- [ ] Browser window exactly 1440×900, dark mode, zoom 100%, no bookmarks bar, no other tabs visible.
- [ ] Notifications off (Do Not Disturb), dock hidden.
- [ ] Reset the show: reload `/ops/show` so counters are at zero and no cards are present. Check case 008 and case 027 are back to their starting states.
- [ ] Real-call audio plays through system audio capture (check the recorder's input is set to system audio plus mic, and test levels).
- [ ] The "Real call with a real person, recorded today, trimmed" label stays visible for the whole call segment. Don't crop it out in the edit.
- [ ] Do a full dry run with the voiceover against a stopwatch before the real take.
- [ ] Record the voiceover separately if the first take runs long; the call audio must not be sped up.
- [ ] Watch the final cut once with sound off: the screen alone should tell the story.
- [ ] Commit the video file to the repo and link it in the README and `SUBMISSION.md`.

## The numbers and where they come from

Say "estimate" out loud for anything in the last two rows.

| Claim | Source |
|---|---|
| 50 public Property Management cases contain 89 explicit "human, please decide" prompts and 236 holds | `research/pm-case-data-analysis.md` |
| Mean judge score 86/100, 1 critical failure, 1 of 50 handed to a person | Graded eval run `eval--vE-uIR9`, 10 Oct 14:03 (`/ops/evals`) |
| $2.59 model cost for 50 cases, about 4p a case | Same run |
| Case 008: quotes of £1,370 and £2,040 inc VAT; case 027: parking question with no visible policy | Public case files 008 and 027 |
| Staff time saved in the public set (estimate): 89 decide prompts × ~6 minutes ≈ 9 hours across 50 cases | Assumption: ~6 minutes per staff touch. Holds not counted |
| Dwelly scale (estimate): 1,000+ jobs a month × ~1.8 decide prompts per case × ~6 minutes ≈ 180 staff hours a month the agents could take on | Dwelly's job volume from the brief; 1.8 = 89 ÷ 50. Say "roughly" |

The landlord call is real but staged: the person on the phone is a volunteer playing Mr Langley. Say so every time it's shown.

## Why it's easy to put into production

- **Same workflow:** the agents work on Dwelly's own job stages and system prompts ("Please check if we need to provide a response to provider", "Please complete landlord approval step first"). They run where "auto mode" runs today.
- **Same channels:** WhatsApp Business API, Twilio/Vonage telephony and email are already in Dwelly's stack. Our WhatsApp adapter is Twilio-compatible (`/ops/whatsapp/webhook`, configured by environment variables only) and the voice agent runs on ElevenLabs over a normal phone number.
- **Swap the mock for their API:** every tool goes through one adapter with read-back verification (`src/agent/adapters/`, `src/agent/opsTools.ts`). Nothing is reported as done until the system confirms it.
- **One container and Postgres:** the voice server, portal and case worker deploy together (Fly today), at about 4p of model cost a case on the public set.
- **People stay in charge:** hard rules in code for money, bank details, landlord approval and unverified addresses. Anything else that needs judgement goes to Decisions as a one-page brief, and the agent carries on once a person has answered.
