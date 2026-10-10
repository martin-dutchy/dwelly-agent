# Case 113: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Washing machine job awaits landlord approval. I sent the landlord a follow-up including the tenant's holiday deadline and own-machine swap question, updated the tenant that the 25th is unconfirmed, and put the job on hold to 26 Dec.

## Where the case stands
Landlord approval gate; no decision yet. Landlord first emailed 24 Dec 10:02, follow-up approval request sent. On hold to 26 Dec. No contractor assigned, no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor inspection or choose own contractor/tenant swap, reply by 26 Dec | Landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant 25 Dec pm is a preference only, nothing booked, next update by 26 Dec | Rowan Price, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 26 Dec | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord, Flat 15, 55 Alder Lane (landlord)** (verified)

> Follow-up to our email today: may we send our contractor to inspect the washing machine (fills but won't start; in the garage)? Tenant is away from 27 Dec for two weeks and asked for a visit before then (preferred 25 Dec afternoon, not confirmed with any contractor). The tenant also has their own machine and asks if it can replace yours if yours can't be repaired; no isolation valves are fitted. Please reply yes/no by 26 Dec.
> 
> Options: Yes, send your contractor to inspect (recommended); I will arrange my own contractor; Tenant may fix/replace it themselves; Decline

**A2 · send_message → Rowan Price (tenant) via email, existing thread (event 005 email)** (verified)

> Hello Rowan, thanks for your call. I've noted you'd like a visit before you fly on 27 Dec, afternoon of 25 Dec preferred, machine in the garage. That is only your preference for now: no engineer is booked and the landlord hasn't approved a visit yet. I've sent the landlord a reminder asking for a reply by 26 Dec, including your question about swapping in your own machine (which needs their consent). I'll update you by 26 Dec at the latest, and sooner if they reply. Please don't expect anyone on the 25th until we confirm.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing approved, assigned or booked; 25 Dec is only the tenant's preference.
- Does not establish the fault or whether replacement with the tenant's machine is allowed.

## Remaining work
- Landlord decision; then assign contractor and get provider-confirmed date before 27 Dec (Christmas Day availability uncertain).
- If no reply by 26 Dec, chase on SMS/phone.

## Missing or unavailable information
- Landlord decision
- Provider-confirmed visit date

## Conflicts between sources
- Date hints (24/25/27 Dec) are the tenant's preference and departure date, not provider bookings.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate; landlord hasn't replied (asked 24 Dec, under 3 days). Outstanding: landlord decision, contractor, provider-confirmed visit before the tenant leaves 27 Dec.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (A1, landlord, email/agency record) and tenant update (A2, email); wait until 26 Dec then chase on a second channel.

**3. Does anything need a human decision, and why?**

No human escalation now; the decision belongs to the landlord. Escalate only if they stay silent past the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord, Flat 15, 55 Alder Lane","decision_needed":"Follow-up to our email today: may we send our contractor to inspect the wa… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Rowan Price","recipient_role":"tenant","channel":"email","contact":"existing thread (event 005 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-113","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on our contractor / own contractor / tenant sw… | 1 | ✅ verified | Ticket NBL-113 read back after put_on_hold |

## Failed or unverified actions
_None._
