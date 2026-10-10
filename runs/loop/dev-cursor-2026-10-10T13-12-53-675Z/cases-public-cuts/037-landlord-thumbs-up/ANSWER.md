# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The landlord answered the approval request with only a thumbs-up. I recorded it as unclear and asked a clear yes/no question. I updated the tenant with safety advice and put the job on hold until 2024-03-30. No contractor has been assigned.

## Where the case stands
Provider selection stage, no contractor assigned. Landlord's reply was only a thumbs-up, which is not approval. Waiting on the landlord's yes/no, reviewed 2024-03-30. Tenant photos are outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord a clear yes/no on using our contractor (or own contractor), reply by 2024-03-30 | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, no date yet, safety advice, photos still wanted, next update by 30 March | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-03-30 for landlord reply | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks Freya. A thumbs-up isn't enough for us to instruct anyone. Yes or no: may we send our contractor to repair the leaking shower cable at Flat 14, 44 Lantern Quay? If you'd rather arrange your own contractor, please say so. Please reply by 2024-03-30.
> 
> Options: Yes, send your contractor; No, I will arrange my own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for the landlord to confirm who will do the repair, so we can't yet give a visit date. Until it's fixed, if the leak is near any electrics or an electric shower, please don't use it. Photos of the cable and the leak would still help. You'll hear from us again by 30 March. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the thumbs-up as unclear does not approve any spend or contractor.
- The tenant update does not promise a visit date.
- Nothing here establishes the cause of the leak.

## Remaining work
- Landlord to answer yes/no (agency awaits, review 2024-03-30)
- Assign a contractor once approved
- Tenant photos outstanding
- If no reply by review date, chase on a second channel

## Missing or unavailable information
- Clear landlord approval
- Tenant photos of the cable and leak

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At provider selection, with no contractor assigned. The landlord's thumbs-up is not usable approval. Outstanding: clear landlord decision and tenant photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request to the landlord by email (done), plus a tenant update by email (done). We wait until 2024-03-30.

**3. Does anything need a human decision, and why?**

No. Asking the landlord again is routine. Escalate only if the landlord stays silent after a chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks Freya. A thumbs-up isn't enough for us to instruct a… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hi Eliza, a quic… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with 👍 only (unclear). Asked a yes/n… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
