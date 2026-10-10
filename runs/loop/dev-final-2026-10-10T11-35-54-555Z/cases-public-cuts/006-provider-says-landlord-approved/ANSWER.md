# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider Sawyer says the landlord approved the £605 quote by phone and plans to order materials. That is hearsay, so I recorded the quote, told Sawyer not to order, asked the landlord for written yes/no and put the job on hold to 14 Oct.

## Where the case stands
Quote recorded (Q-101, £605 sum of items, VAT unstated). Landlord approval requested at event 013 and re-asked; no landlord reply. Provider's claim of phone approval is hearsay. Ticket on hold until 2024-10-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a written yes/no on the £605 quote, noting the provider's phone claim | Oscar, landlord | email | A3 ✅ |
| 2 | WAIT | Hold for landlord reply, review 2024-10-14 (second-channel chase then) | Oscar, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your email. We have no written approval from the landlord yet, so please don't order the carpet or materials or start work. We've asked the landlord to confirm directly and will let you know as soon as we hear. Please also confirm whether your prices (£220, £240, £100, £45) include VAT.

**A3 · send_message → Oscar (landlord) via email, existing thread (event 013 email)** (verified)

> Hi, following our earlier email about Flat 21, 11 Juniper Mews: Sawyer says you agreed the quote by phone. We need your confirmation in writing before anything is ordered. Please reply yes or no: do you approve the quote totalling £605 (paint £220, carpet £240, bathroom vinyl £100, chrome waste £45; VAT not yet confirmed)? Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- Telling the provider not to order does not decline the work
- No contractor instruction or spend committed

## Remaining work
- Landlord written decision (owner: landlord/agency)
- Provider to confirm VAT and a visit/start date
- Then approve quote, record decision, schedule work, invoice, close

## Missing or unavailable information
- Landlord's written approval
- VAT status of quote
- Landlord name (Oscar vs Ruben)
- Spend limit not on file

## Conflicts between sources
- Provider says landlord approved by phone; no landlord record. Treated as unapproved.
- Landlord named Oscar in event 013 but Ruben in hold line event 014.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote received and recorded; landlord approval is outstanding. Provider's verbal-approval claim is not accepted. VAT unconfirmed.

**2. What is the next action, who is it for, and through which channel?**

Landlord (Oscar) asked by email for a written yes/no; provider told to wait by email; hold until 2024-10-14 then chase on SMS/phone.

**3. Does anything need a human decision, and why?**

No. Routine waiting on landlord approval; escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Oscar","recipient_role":"landlord","channel":"email","contact":"existing thread (event 013 email)","ticket_ref":"NBL-006-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting written landlord yes/no on Sawye… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-006-provider-says-landlord-approved","note":"Event 015: provider claims verbal landlord approval; not authority. Landlord add… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
