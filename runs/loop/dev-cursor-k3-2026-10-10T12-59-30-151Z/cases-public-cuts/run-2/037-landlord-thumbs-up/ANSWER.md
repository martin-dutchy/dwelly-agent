# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied with only a 👍 to our either/or question, which is not usable authority. I recorded it as unclear, asked a yes/no question, updated the tenant and put the job on hold until 2024-03-29.

## Where the case stands
Intake/landlord gate; no provider assigned. Landlord replied only 👍 to an either/or question, so no usable approval. On hold waiting for landlord, review 2024-03-29. Tenant photos outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord a yes/no question: our contractor, or their own? | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update the tenant, ask again for photos, give next update date | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold for landlord answer, review 2024-03-29 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks Freya, we got your 👍 but can't tell which option you meant. Yes or no: may we send our contractor to replace the leaking shower hose/cable at Flat 14, 44 Lantern Quay? If you'd rather arrange your own contractor, please say so and give their name.
> 
> Options: Yes, send your contractor; No, I will arrange my own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for the landlord to confirm who will carry out the repair, and we've asked them to clarify. Photos of the damaged cable and the leak would still help. Please avoid using the shower if water is near any electrics. We'll update you by 2024-03-29.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 does not approve a contractor or spend
- No contractor assigned and no visit booked
- Cause and who pays not established

## Remaining work
- Landlord to answer yes/no (agency chases 2024-03-29)
- Tenant photos
- Assign contractor after clear approval

## Missing or unavailable information
- Clear landlord decision
- Photos of the damaged cable

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate. The 👍 is unclear, so there is no approval and no provider. Outstanding: landlord decision and tenant photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval question to the landlord by email (A2), and a tenant update by email (A3). Hold review 2024-03-29.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord has only been slow to answer, so a human is not needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks Freya, we got your 👍 but can't tell which option yo… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with 👍 only (unclear). Asked yes/no:… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
