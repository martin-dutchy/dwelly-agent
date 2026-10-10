# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 but the tenant has not answered email or SMS. I opened JOB-101, tried WhatsApp and a letter, asked HeatRight for slots and a price, asked the landlord to approve, and set a follow-up for 12 Oct.

## Where the case stands
JOB-101 at init. Waiting on the tenant (reply), HeatRight (slots and price) and Ben (approval). Follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve HeatRight for the gas check | Ben Hartley, landlord | email | A5 ✅ |
| 2 | CHASE_TENANT | Contact tenant by WhatsApp and letter for access times | Luca Bianchi, tenant | whatsapp | A2 ✅ |
| 3 | REQUEST_INFORMATION | Ask HeatRight for slots and price | HeatRight Ltd, contractor | phone_call | A4 ✅ |
| 4 | WAIT | Review on 12 Oct; send 24h notice for the confirmed slot; escalate if still no access by 14 Oct | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Luca Bianchi (tenant) via whatsapp, +447700900130** (verified)

> Hi Luca, it's your letting agent. Your yearly gas safety check at 19 Victoria Park Road must be done before 16 October. It's a legal safety check and takes about 30-60 minutes. Please reply with days/times that suit you over the next few days (weekdays or Saturday). We'll confirm a slot with our gas engineer and send you at least 24 hours' written notice before anyone visits. If you smell gas, leave the property and call 0800 111 999. We'll also email and write to you, and will be in touch again by Monday 12 October.

**A3 · send_message → Luca Bianchi (tenant) via letter, 19 Victoria Park Road, London E9 7HD** (verified)

> Dear Luca, your annual gas safety check at 19 Victoria Park Road is due before 16 October 2026. This is a legal safety requirement. Please contact us with times that suit you. Once a slot is confirmed with the engineer we will give you at least 24 hours' written notice of the visit. If you smell gas, leave the property and call 0800 111 999.

**A4 · request_information → HeatRight Ltd (contractor) via phone_call, +447700900311** (verified)

> - Which dates/time windows between Mon 12 and Thu 15 Oct can you do a landlord gas safety inspection (CP12) at 19 Victoria Park Road, E9 7HD?
> - What is your price for the inspection including VAT?
> 
> Why: CP12 expires 16 Oct; tenant unresponsive so we need confirmed slot to give 24h notice. Landlord limit £300 inc VAT.

**A5 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Gas safety certificate expires 16 Oct. Tenant hasn't replied to email/SMS (25 Sep, 2 Oct); we've now tried WhatsApp and letter. Please confirm we can instruct HeatRight Ltd for the annual gas safety check (price awaited; we'll call you first if over £300 inc VAT). The property is not compliant after 16 Oct if not done; lawful access needs 24h written notice, no forced entry.
> 
> Options: Yes, instruct HeatRight Ltd for the gas safety check (recommended); I'll arrange my own gas engineer

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked and no contractor is assigned yet.
- Nothing here confirms the CP12 will be renewed in time.
- The legacy note was not relied on.

## Remaining work
- Get HeatRight's slot and price, and the landlord's decision.
- Send 24h written notice to the tenant.
- Escalate on 14 Oct if there is still no access.
- Send the new CP12 to the tenant within 28 days.

## Missing or unavailable information
- Tenant availability
- HeatRight slots and price
- Landlord approval

## Conflicts between sources
- No real conflict: the legacy note agrees with compliance.json but has no dates. get_property found no record for P-230, so I relied on the case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust the compliance.json CP12 (issued 2025-10-17, expires 2026-10-16, Gas Safe 550123), a structured system record. The legacy note 'gas cert renewed 2025' is hearsay with no dates and agrees with it. Without a new CP12 the property is non-compliant from 17 Oct.

**2. What steps do you take to get access lawfully before expiry?**

I opened an urgent job. I contacted the tenant on two new channels (WhatsApp and a letter) after the earlier email and SMS got no reply. I asked HeatRight, the preferred Gas Safe contractor, for slots between 12 and 15 Oct. Once a slot is confirmed I will give the tenant at least 24h written notice. I will not force entry, and holding keys gives no right of entry. I have scheduled a check on 12 Oct and will escalate if there is still no access by 14 Oct, keeping a record of every attempt to show reasonable steps.

**3. What do you tell the landlord?**

I told Ben (by approval request) that the certificate expires 16 Oct, that the tenant has not replied, what we have tried, that lawful access needs 24h notice, and asked him to approve HeatRight. I will call him first if the price is over £300 inc VAT.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) due before 2026-10-16. Current CP12 i… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900130","ticket_ref":"JOB-101","body":"Hi … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"letter","contact":"19 Victoria Park Road, London E9 7HD","ticket_ref":… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_information` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"phone_call","contact":"+447700900311","questions":["Which dates/t… | 1 | ✅ verified | REQ-104 found in the request_information log |
| A5 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Gas safety certificate expires 16 Oct. Tenant hasn't replied to email/SM… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant reply, HeatRight slots and landlord answer; if no tenant contact, send… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
