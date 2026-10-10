# Case 07: Duplicate report of an already-booked job: ANSWER

**Decision:** action_taken · **Severity:** routine

Amelia Clarke's email reports the existing kitchen tap drip (R-4801) is worse, so I did not create a duplicate job. I added her update to R-4801 for the already-booked 15 Oct 08:00-12:00 visit and emailed her to say no new request is needed, with advice on what to do if it floods.

## Where the case stands
Existing routine plumbing job R-4801 (dripping kitchen tap, Flat 4, 12 Mare Street, P-201) is at visit stage, with Swift Plumbing & Heating (C-12) booked for 2026-10-15 08:00-12:00, confirmed with the tenant. Tenant's new email says the drip is worse and now constant even when closed. No flood, gas or electrical risk reported. Nothing outstanding on the tenant side.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Added Amelia's update (drip worse, constant when closed, no flooding reported) to existing ticket R-4801 so the plumber sees it at the 15 Oct visit; no new job raised. | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Replied to Amelia by email: the repair is already booked as R-4801 for 15 Oct 08:00-12:00, her update has been added, no new request needed, and what to do if it floods. | Amelia Clarke, tenant | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Amelia Clarke (tenant) via email, amelia.clarke@mailbox.example** (verified)

> Hello Amelia,
> 
> Thank you for letting us know. The kitchen tap repair is already booked under reference R-4801, with a visit on Thursday 15 October between 08:00 and 12:00, which you have already confirmed with us.
> 
> We have added your update that the tap now drips even when fully closed, so the plumber can check this when they visit. You do not need to raise a new request.
> 
> If the dripping becomes a flood, or water is coming through the ceiling or into electrics, please turn off the isolation valve under the sink if you can and contact us straight away.
> 
> Kind regards,
> Lettings team

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Adding a note does not confirm the cause of the worsening drip or whether a washer, cartridge or full tap replacement is needed.
- No cost has been quoted or approved; the landlord's £300 inc-VAT limit has not been tested.
- The booking was not changed; the visit still stands as confirmed.

## Remaining work
- Swift Plumbing & Heating attends 15 Oct 08:00-12:00 (R-4801) and records the result.
- If the repair needs a part or replacement above £300 inc VAT, ask Ben Hartley (landlord) before instructing work.

## Missing or unavailable information
_None._

## Conflicts between sources
- The tenant says the tap now drips constantly when closed; the ticket still describes a routine dripping tap. The tenant's newer report was added as a note rather than changing the category or urgency, since no safety or water-damage risk was reported.

## Answers to the case questions
**1. 1. Should a new repair job be created?**

No. The same issue is already open as R-4801 (routine plumbing, stage visit, booked with C-12 on 15 Oct 08:00-12:00 and confirmed with the tenant). The new email is a worsening update on that job, not a new fault. A duplicate would confuse scheduling.

**2. 2. What do you reply to the tenant?**

Sent by email (MSG-101): the repair is already booked as R-4801 for Thu 15 Oct 08:00-12:00, her update that the tap drips even when closed has been added for the plumber, no new request is needed, and if it floods she should turn off the isolation valve under the sink and contact us.

**3. 3. What, if anything, do you change on existing records?**

Added a note to R-4801 with her report (worsening, constant drip when closed, no flooding). Stage and visit booking unchanged. Severity left as routine: no water damage, electrical or gas risk reported.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"R-4801","note":"Tenant Amelia Clarke emailed 2026-10-10 12:09: tap drip is getting worse and now drips constantly even when fully cl… | 1 | ✅ verified | Ticket R-4801 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-101 found in the send_message log |

## Failed or unverified actions
_None._
