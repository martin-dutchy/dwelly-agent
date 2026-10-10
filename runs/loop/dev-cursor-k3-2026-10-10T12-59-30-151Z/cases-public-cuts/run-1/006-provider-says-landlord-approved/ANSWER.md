# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider says the landlord approved by phone, but there is no written approval, so I treated it as hearsay. I recorded the £605 quote, told the provider not to order or start, sent the landlord an SMS asking for a yes/no, and put the job on hold until 2024-10-11.

## Where the case stands
Quote (£605) with landlord for approval since event 013; provider claims phone approval (hearsay). Job on hold waiting for landlord, review 2024-10-11. Not approved, no contractor instructed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | SMS asking the landlord for a written yes/no on the £605 quote (second channel after the event 013 email) | Landlord | sms | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told provider not to order or start until written landlord approval; asked about VAT and a PDF quote | Sawyer, provider | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-10-11 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Sawyer (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your note. We have no written approval from the landlord yet, so please don't order the carpet or materials or start work until we confirm. We've asked the landlord directly and will let you know as soon as we hear. Could you also confirm whether the £220, £240, £100 and £45 figures include VAT, and send the quote as a PDF if you have one? Thanks.

**A3 · send_message → Landlord (landlord) via sms, agency landlord record** (verified)

> Re Flat 21, 11 Juniper Mews: Sawyer says you OK'd his quote by phone (total £605: paint £220, carpet £240, bathroom vinyl £100, sink waste £45). We need your confirmation in writing. Please reply YES to approve all four items, or tell us any changes. Nothing will be ordered until then.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- The provider's phone claim is not landlord authority
- No contractor instruction or spend committed

## Remaining work
- Landlord written decision (agency chases by 2024-10-11)
- Then record decision, approve quote, set visit/access via agency keys
- Confirm VAT status with provider
- Verify landlord name (Oscar vs Ruben)

## Missing or unavailable information
- Landlord written approval
- Whether quote includes VAT
- Quote PDF not seen

## Conflicts between sources
- Provider says landlord approved by phone vs no landlord reply on record; treated as unapproved
- Landlord named Oscar in event 013 vs Ruben in hold event 014

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote of £605 awaits landlord approval. The provider's phone claim is unverified. Outstanding: landlord decision, VAT clarity, visit and access booking.

**2. What is the next action, who is it for, and through which channel?**

SMS to the landlord for a written yes/no (done), email to Sawyer to hold off (done), then chase by 2024-10-11.

**3. Does anything need a human decision, and why?**

No. The landlord decision is routine and is being chased. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","provider":"Sawyer (Cedar Utilities)","amount_gbp":605,"vat":"none","items":["Supply… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after record_quote |
| A2 | `send_message` | {"recipient_name":"Sawyer","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-006-provider-s… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Quote £605 sent to landlord (email event … | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-006-provider-says-landlord-approved","note":"Provider (event 015) says landlord approved by phone: hearsay, not authority. La… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
