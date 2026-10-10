# Case 019: Garden Maintenance Request: ANSWER

**Decision:** escalated · **Severity:** routine

The garden job has been stuck at the landlord approval gate since January, with no landlord decision on file. Emailed the landlord for a decision and told the tenant the next step, put the job on hold until 17 Mar, and escalated to a human (ESC-104) to phone the landlord.

## Where the case stands
Stage: landlord approval gate (ticket NBL-019 stage init, landlord_approval required). No contractor assigned and no landlord decision on file. Landlord last contacted by email on 8 Feb; no reply. Tenant chased by phone on 13 Mar. Hold placed until 17 Mar.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to decide: use our contractor (with a spend limit) or their own contractor (name and date). Mention the £500+VAT conflict. | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the landlord is being asked again, no date can be given yet, and an update will follow. | Tenant, Flat 25 | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | Phone the landlord to get a recorded decision and a phone/SMS contact for the job; escalated for a human to do this. | Maintenance team | internal | A5 ✅ |
| 4 | WAIT | Review the hold and chase the landlord if nothing has arrived. | Jenkins, landlord | email | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via email, existing thread (event 012 email)** (verified)

> Hi Jenkins,
> 
> Following on from our earlier email about Flat 25, 185 Copperfield Walk. The tenant has asked for the back garden to be cleared of rubbish and construction waste, levelled, and covered with gravel so it can be used safely. The tenant has been waiting since January for an update.
> 
> Please reply with one of these:
> 1. Yes, we arrange the work through our contractor. Please confirm the spend limit you are approving.
> 2. No, you will arrange your own contractor. Please send their name and a date they can attend.
> 
> Our records also show a £500 + VAT quote mentioned in January. We have no written approval from you on file for it, so please confirm whether it covers this work.
> 
> Thanks,
> Maya

**A2 · send_message → Tenant (Flat 25, 185 Copperfield Walk) (tenant) via email, existing thread (event 018 phone call)** (verified)

> Hello,
> 
> Thank you for chasing the back garden work. We are still waiting for the landlord to tell us how they want the work done, whether through our contractor or their own. We have asked them again today. We will update you as soon as we hear back. We cannot give a date for the work until the landlord has decided.
> 
> Thanks,
> Maya

## Escalation
- **P2 → maintenance** (verified): Landlord (Jenkins) has not given a decision on the garden works since the job opened on 17 Jan 2025. Our only landlord contact is an email on 8 Feb (event 012). No landlord phone or SMS contact is on file, so the second-channel chase cannot be made.
  - Known: Tenant asks for back garden rubbish and waste removal, levelling and gravel so it is safe to use (event 001). Job is at landlord approval gate. Landlord emailed 8 Feb (A2, 13 Mar follow-up on the same thread). Tenant messaged on existing thread and told no date can be given (A1). Hold placed until 17 Mar (A4). Event 009 (31 Jan) notes a £500+VAT approval with Harbour Compliance, but no landlord message supports it and the ticket still requires approval.
  - Missing: Landlord decision (our contractor with a spend limit, or own contractor). Landlord phone/SMS contact. Confirmation whether the 31 Jan £500+VAT approval is real. Garden photos (unavailable).
  - Options: Call the landlord on a verified number and get a yes or no on our contractor with a cap, or own contractor; If no response by 17 Mar, follow the landlord's escalation route or agency management review; Ask the tenant for photos again so the scope can be quoted
  - Recommendation: Phone the landlord today to get a recorded decision. Do not instruct Harbour Compliance until the approval is confirmed in writing.
  - Deadline: 2025-03-17

## What this does not establish
- The 31 Jan note (£500+VAT approved, Harbour Compliance going ahead) is not confirmed by any landlord message, so it is not treated as approval.
- Sending the messages does not mean the landlord has decided anything.
- No date, cost or contractor has been confirmed for the work.
- Garden photos were unavailable, so the scope is taken from the written request only.

## Remaining work
- Landlord decision on route and spend cap (owner: landlord, chased by agency).
- Landlord phone/SMS contact and phone call (owner: maintenance human via ESC-104).
- If approved: assign contractor, visit, result, invoice, close (owner: agency).
- Review hold on 2025-03-17.

## Missing or unavailable information
- Landlord decision on the works and on the 31 Jan £500+VAT approval.
- Landlord phone or SMS contact.
- Garden photos (attachment unavailable).

## Conflicts between sources
- Event 009 (31 Jan) says landlord approved £500+VAT and Harbour Compliance was going ahead, but no landlord message supports it, the ticket still requires landlord approval, and later events (010-018) show the landlord was never reached. Trusted the current record: no approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stage is landlord approval. No contractor assigned, no written landlord decision. Outstanding: landlord choice of route and cap, and resolving the 31 Jan £500+VAT note.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord Jenkins on the existing thread (A1) asking for a decision. Tell the tenant by email on the existing thread (A2) that the landlord is being asked and no date can be given yet. Human phones the landlord (ESC-104).

**3. Does anything need a human decision, and why?**

Yes. The landlord has been silent for about 8 weeks and no phone/SMS contact is on file, so the second-channel chase cannot be made by us. The conflicting £500+VAT approval also needs checking with the landlord. Escalated as ESC-104.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-01… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant (Flat 25, 185 Copperfield Walk)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 018… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Record conflict: event 009 (31 Jan) says landlord approved £500+VAT and Harbour Complian… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Landlord decision needed: use our contractor (sta… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A5 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Landlord (Jenkins) has not given a decision on the garden works since the job opened on 17 J… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
