# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 but the tenant has ignored three contacts. I opened JOB-101, asked the landlord to approve HeatRight, asked HeatRight for slots, wrote to the tenant, and set a review for 12 Oct.

## Where the case stands
JOB-101 at intake. Waiting on landlord approval (APR-102), HeatRight slots/price and tenant reply. Review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked Ben to approve HeatRight for the gas check and told him the certificate expiry and tenant silence | Ben Hartley, landlord | email | A2 ✅ |
| 2 | CHASE_TENANT | Emailed Luca asking for times, said 24h written notice will follow, gave gas helpline | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | CHASE_PROVIDER | Asked HeatRight for slots and price (not yet instructed) | HeatRight Ltd, contractor | phone_call | A4 ✅ |
| 4 | WAIT | Review 12 Oct: if tenant still silent, send a letter and escalate to compliance | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Ben, the gas safety certificate at 19 Victoria Park Road expires 16 Oct. The tenant hasn't replied to our emails or SMS. May we instruct HeatRight Ltd (Gas Safe 550123) to do the annual check? We'll give the tenant at least 24h written notice. We don't have a price yet and will tell you before anything over £300.
> 
> Options: Yes, instruct HeatRight Ltd for the annual gas safety check (recommended); Use your own gas engineer

**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check is legally required and the current certificate runs out on 16 October. We've not heard back from you, so please reply with times that suit you in the next few days (or ring us). We're lining up our gas engineer and will send you written notice of the exact visit time, at least 24 hours before. If you smell gas at any time, leave the property and call 0800 111 999. We'll write again on Monday 12 October.

**A4 · send_message → HeatRight Ltd (contractor) via phone_call, +447700900311** (verified)

> Annual gas safety check at 19 Victoria Park Road, London E9 7HD, needed before 16 Oct. Please confirm your earliest available slots and price. Not yet instructed: awaiting landlord approval. Tenant is not yet responding; we'll give 24h written notice once you confirm a slot.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked and no contractor is assigned yet.
- Nothing here gives a right of entry; entry needs tenant access with 24h written notice.
- The tenant's silence is not consent.

## Remaining work
- Landlord approval (Ben)
- HeatRight to confirm slot and price
- Send 24h written notice to tenant for the confirmed slot; letter if still no reply
- Escalate to compliance if no access by 13-14 Oct
- Copy of new CP12 to tenant within 28 days

## Missing or unavailable information
- Price of the gas check
- Tenant availability
- Ticket/property record not found in system (P-230); relied on case inputs

## Conflicts between sources
- Legacy note says gas cert renewed 2025 with no date; the compliance record gives 2025-10-17 to 2026-10-16. Trusted the compliance record.
- get_property found no record for P-230; used case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, today. The compliance record shows a CP12 issued 2025-10-17 and expiring 2026-10-16, with Gas Safe engineer 550123 (matches HeatRight) and a file reference. I trust it over the legacy note ('renewed 2025, all good'), which is an unverified old-agency comment with no dates. It lapses in 6 days if not renewed. The renewal can be done up to 2 months early and keeps the anniversary date.

**2. What steps do you take to get access lawfully before expiry?**

Opened a job, emailed the tenant asking for times (earlier email and SMS on 25 Sep and 2 Oct went unanswered), asked HeatRight for slots, and will send at least 24h written notice for a confirmed slot. If there is still no reply, I will send a letter and phone the tenant, then escalate to compliance. No forced entry; keys give no right of entry.

**3. What do you tell the landlord?**

Ben has been told the certificate expires 16 Oct, the tenant has not responded, and we propose HeatRight (his preferred gas contractor). We asked for approval, said a price is pending and that we would call him before anything over £300.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) for 19 Victoria Park Road. Current CP… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Ben, the gas safety certificate at 19 Victoria Park Road expires 16 Oct. The tenant hasn't repl… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"phone_call","contact":"+447700900311","ticket_ref":"JOB-101","bod… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Check landlord approval, tenant reply, HeatRight slots; if tenant still silent, send letter/call and escal… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
