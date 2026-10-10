# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord answered a two-option question with only a 👍, which is not usable authority. I recorded it as unclear, asked a single yes/no question, updated the tenant with a safety note, and set a hold and follow-up for 29 March.

## Where the case stands
Provider selection, no contractor assigned. Landlord's 👍 doesn't answer the "you arrange or we arrange" question. Ticket on hold until 2024-03-29 awaiting a clear landlord answer; tenant photos also awaited.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord one yes/no question: may we use our contractor, or will they arrange their own | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: waiting on landlord, safety note, photos still wanted, next update by 29 March | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold and follow-up on 2024-03-29; chase on a second channel if still no answer | Freya, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Your 👍 reply doesn't tell us which option you meant. Yes or no: may we arrange the shower cable repair with our contractor on your behalf? (Reply "yes, use your contractor" or "no, I'll arrange my own".)
> 
> Options: Yes, use our contractor (recommended); No, I will arrange my own contractor
> 
> Update: Tenant reports the shower cable to the handle is damaged and leaking. We have asked the tenant for photos. No contractor is assigned and no visit booked until we have your clear answer. Please reply by 2024-03-29.

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting on the landlord to confirm how the repair will be arranged, so no contractor is booked yet. Until it's fixed, please avoid using the shower if water is leaking near any electrical parts, and if it's an electric shower, switch it off at the isolator. Photos of the cable and the leak would still help. We'll update you by 29 March at the latest. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the 👍 as unclear does not approve or decline anything
- No contractor assigned, no visit booked, no cost or date promised
- Cause and severity of the leak are not yet established

## Remaining work
- Landlord to give a clear answer (agency chases 2024-03-29)
- Tenant photos
- Assign contractor and book a visit once approved

## Missing or unavailable information
- Clear landlord decision
- Photos of the damaged cable and leak
- Whether the shower is electric

## Conflicts between sources
- Hold said 'LL to approve contractor' and the landlord replied, but the 👍 does not say which option they chose

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At provider selection with no contractor. The landlord's 👍 is ambiguous. Outstanding: a clear landlord decision and tenant photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request to the landlord by email (done), a tenant update by email (done), and a hold and follow-up for 29 March.

**3. Does anything need a human decision, and why?**

No. This is a routine clarification; escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email, 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Your 👍 reply doesn't tell us which option you meant. Yes o… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-037-landlord-thumbs-up","due_on":"2024-03-29","party":"Landlord","purpose":"Chase landlord for clear yes/no on our contra… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with 👍 only (unclear). Asked yes/no … | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
