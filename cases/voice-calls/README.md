# Voice calls as cases

Real test calls from the voice agent (src/voice), exported with `pnpm voice:export --out cases/voice-calls --only <conversation id>`. Each case is a public Property Management case (never a holdout case), cut at the scenario's decision point. Our phone call is appended as a `Call` event (summary and transcript), followed by `Update` events for what the voice agent recorded. Volunteers played made-up personas; no real personal details are included.

`rubric.json` is written for what actually happened on that call, which is often not what the scenario intended. Run with the full history: `pnpm cases --in cases/voice-calls --out runs/voice --at none`. They are in the `dev` split, so `pnpm loop` includes them.

| Case | Source | What happened on the call |
|---|---|---|
| V025-contractor-oven-warranty-gdyhaf | 025 | The voice agent booked a £150 paid repair off the contractor's quote with no landlord approval, and never asked about the warranty. |
| V011-contractor-extra-part-s4gv7h | 011 | The engineer pushed for the £95 part to be approved; the agent refused, but the call cut off before anything was recorded. |
