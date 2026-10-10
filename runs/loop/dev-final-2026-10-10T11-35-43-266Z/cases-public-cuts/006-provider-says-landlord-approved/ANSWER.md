# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

The check-out works quote was sent to the landlord and is awaiting their answer. The contractor says the landlord approved by phone, but there is no record of it, so I told them not to order materials. The quote is recorded and the job is on hold until 12 Oct.

## Where the case stands
Stage mp_time, on hold. Quote (£605 total, four items) sent to landlord at event 013 same day; no landlord reply. Provider claims phone approval (hearsay). No appointment details; tenant has vacated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told Sawyer not to order materials as there is no written landlord approval, and asked whether prices include VAT | Sawyer, contractor | email | A2 ✅ |
| 2 | WAIT | Hold for landlord's written answer to the quote request; review 12 Oct, then chase by SMS/phone | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your email. We have no written approval from the landlord yet, so please don't order the carpet or any parts for now. We've asked the landlord to confirm the quote directly and will let you know as soon as we have it. Could you also confirm whether your prices include VAT?

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval recorded and no spend committed
- Quote recording does not approve it
- Provider's phone claim is not landlord authority
- Total £605 is my sum of the four lines; VAT status unknown

## Remaining work
- Landlord to give a clear written yes/no on £605 quote
- Then record decision, approve quote, tell provider
- Chase landlord on second channel after 3 days
- Confirm landlord name (Oscar vs Ruben) and VAT

## Missing or unavailable information
- Landlord's own reply
- VAT status of quote
- Landlord contact details and spend limit not in property record

## Conflicts between sources
- Provider says landlord approved by phone vs no landlord reply on record; trusted the record.
- Landlord named Oscar in email, Ruben in hold note.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Quote received and sent to the landlord at event 013; awaiting the landlord's written approval. The contractor's phone-approval claim is unverified. Outstanding: landlord decision, VAT confirmation, and the visit/works dates.

**2. What is the next action, for whom, via which channel?**

Email to Sawyer (provider) not to order anything until approved (done, A2). Then wait for the landlord, with review on 12 Oct and an SMS/phone chase if silent (A3).

**3. Does anything need a human decision?**

No. The landlord's decision is theirs to make and routine chasing covers it. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Quote £605 sent to landlord (event 013) a… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |

## Failed or unverified actions
_None._
