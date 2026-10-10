# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord replied that a switch on the right-hand side of the hob needs turning on, but gave no approval for a contractor. I recorded the reply as unclear, asked the tenant to check the switch, asked the landlord a yes/no question on sending our contractor if the fan still fails, and put the job on hold until 2026-09-18.

## Where the case stands
Ticket NBL-017 is at the landlord approval gate. The landlord's reply (event 008, 15 Sep) describes a switch on the right-hand side of the hob but does not approve a contractor, own contractor, or tenant fix. Recorded as unclear. Held until 2026-09-18 waiting for the landlord and tenant.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_TENANT | Ask the tenant to check whether the switch on the right-hand side of the hob is on, and to report back if the fan still does not run. | Clara, tenant | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask the landlord one yes/no question: if the fan still fails with the switch on, approve our contractor, or do they want their own contractor (name needed). | Landlord, Flat 1, 31 Juniper Mews | email | A3 ✅ |
| 3 | WAIT | Hold the job until 2026-09-18 for replies from landlord or tenant, then review. | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Clara (tenant) via email, existing thread (event 003 email)** (verified)

> Hello Clara,
> 
> Thank you for your message about the kitchen extractor fan. The landlord has said there is a switch on the right-hand side of the hob that needs to be switched on. Could you please check whether that switch is on and whether the fan then runs?
> 
> If the fan still does not work, please reply to let us know, and we will arrange for it to be looked at. Please do not open the fan or touch any wiring.
> 
> Kind regards,
> Northbridge Lettings

**A3 · send_message → Landlord, Flat 1, 31 Juniper Mews (landlord) via email, existing thread (event 004 email)** (verified)

> Good evening,
> 
> Thank you for your reply about the kitchen extractor fan. We have asked the tenant to check the switch on the right-hand side of the hob.
> 
> One question so we can plan next steps: if the fan still does not work once that switch is on, would you like us to send one of our contractors to look at it? Please reply yes or no. If you would rather use your own contractor, please let us know their name.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's reply does not establish a fault, a cause, or that the fan is fixed.
- No contractor has been instructed and no spend is approved.
- The switch comment does not confirm the tenant may carry out any repair; it only asks the tenant to check a switch.
- The ticket reference in the case (017) was not found; the live record is NBL-017 and all actions were taken on it.

## Remaining work
- Landlord to answer the yes/no question on our contractor or their own contractor (owner: landlord, review 2026-09-18).
- Tenant to confirm whether the switch fixed the fan (owner: tenant, review 2026-09-18).
- If the fan still fails, assign a contractor only after a clear landlord approval.

## Missing or unavailable information
- Whether the hob-side switch is on and whether the fan works after that.
- Landlord's decision on our contractor or their own.
- The landlord's photo was unavailable and has not been seen.

## Conflicts between sources
- The case reference is 017 but the live ticket is NBL-017; used NBL-017.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate on NBL-017. The landlord's reply does not authorise a contractor, so no provider can be assigned. Outstanding: the tenant checking the switch, and the landlord's yes/no on our contractor or their own.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant (Clara) to check the hob-side switch (A2), and email the landlord a yes/no question on contractor (A3). Job held until 2026-09-18 for review.

**3. Does anything need a human decision, and why?**

No. The routine steps are in hand and no spend or legal decision is needed yet. Escalate only if the landlord or tenant gives a conflicting instruction or the fault is confirmed and unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched on."… | 1 | ❌ failed | Ticket 017 not found on read-back |
| A2 | `send_message` | {"ticket_ref":"017","recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 003 email)","body… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"ticket_ref":"017","recipient_name":"Landlord, Flat 1, 31 Juniper Mews","recipient_role":"landlord","channel":"email","contact":"existing t… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched … | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Landlord","comment":"Landlord reply (event 008) does not authorise a contractor. Asked tenant … | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
- A1: First record_landlord_decision used the case ref 017, which was not found. Listed tickets, found NBL-017, and retried on that ref (A4), which verified.
