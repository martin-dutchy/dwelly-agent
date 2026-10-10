# Case 006: Check-Out Works: Carpet Replacement and Repainting: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider says the landlord approved by phone, which is hearsay. I asked the landlord for a written yes/no, told the provider to hold off ordering, and put the job on hold until 11 Oct with a follow-up.

## Where the case stands
Quote from Sawyer (Cedar Utilities) relayed to landlord at event 013; no written landlord reply. Provider claims verbal approval (event 015), unverified. Ticket on hold awaiting landlord until 11 Oct. Nothing instructed or ordered.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a written yes/no on the £605 quote, noting the provider's claimed phone approval, reply by 11 Oct | Landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell Sawyer not to order until written landlord approval; ask about VAT and a PDF quote | Sawyer, provider | email | A2 ✅ |
| 3 | WAIT | Hold and follow-up 11 Oct to chase landlord on a second channel | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (Oscar per event 013; record also mentions Ruben) (landlord)** (verified)

> Yes or no: do you approve Sawyer's quote (full studio repaint £220, carpet c.27 sqm £240, bathroom vinyl £100, chrome sink waste £45; items total £605, VAT not stated) so we can instruct him? (£605)
> 
> Options: Yes, approve the quote as sent, up to £605; No, I will arrange my own contractor; No, I would like a second quote
> 
> Update: Sawyer emailed us this evening saying he spoke to you by phone and you said go ahead, and that he plans to order the carpet and parts tomorrow. We have no record of that call, so we cannot treat it as approval. Please reply yes or no by 11 Oct. Nothing is ordered or instructed until we have your written answer. Flat is empty, so no tenant to schedule.

**A2 · send_message → Sawyer (Cedar Utilities) (contractor) via email, existing thread (event 015 email)** (verified)

> Hi Sawyer, thanks for your email. We have no record of the landlord's approval, so please do not order the carpet or parts yet. We have asked the landlord to confirm the quote in writing and will let you know as soon as we hear, with a chase planned for 11 October. Please also confirm whether the quoted prices include VAT, and send the quote as a PDF if you have one, as we only have a summary. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the quote or instructs the contractor
- Quote not formally recorded because VAT is unstated
- Does not establish whether the phone call took place

## Remaining work
- Landlord written decision (owner: landlord)
- Provider VAT confirmation and PDF quote
- After approval: record decision, approve quote, schedule works, invoice, close

## Missing or unavailable information
- Landlord's written approval
- Whether quote includes VAT
- Landlord spend limit not on file
- Visit date for quote/works not confirmed

## Conflicts between sources
- Provider says landlord approved by phone vs no landlord reply on record; treated as unapproved
- Provider named Cedar Utilities vs Sawyer; landlord Oscar vs Ruben (hold note)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote of £220+£240+£100+£45 (£605, VAT unstated) is awaiting landlord approval. The provider's claim of verbal approval is unverified. The flat is vacant.

**2. What is the next action, who is it for, and through which channel?**

Landlord: yes/no approval request by email (APR-101). Provider: do not order yet, confirm VAT and send PDF (email). Chase landlord on a second channel on 11 Oct.

**3. Does anything need a human decision, and why?**

No human escalation now. The decision belongs to the landlord, and it is routine. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord (Oscar per event 013; record also mentions Ruben)","ticket_ref":"NBL-006-provider-says-landlord-approved","decision_ne… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Sawyer (Cedar Utilities)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-006-provider-says-landlord-approved","note":"Route: our contractor, awaiting landlord approval. Quote relayed to landlord at … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on Saw… | 1 | ✅ verified | Ticket NBL-006-provider-says-landlord-approved read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-006-provider-says-landlord-approved","due_on":"2024-10-11","purpose":"Chase landlord on second channel (SMS/phone) for qu… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
