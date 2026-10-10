# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The CP12 is valid until 16 Oct 2026 but the renewal is unbooked and the tenant has not replied to three contacts. I opened JOB-101, asked the tenant for times, asked HeatRight for slots and price, asked the landlord for approval, and put the job on hold until 12 Oct.

## Where the case stands
JOB-101 urgent, on hold until 12 Oct. Waiting on the tenant (access times), HeatRight (price and slots) and the landlord (approval). No visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked tenant for access times, with 24h notice promised | Luca Bianchi, tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Asked HeatRight for price and slots 12-15 Oct | HeatRight Ltd, contractor | sms | A3 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Asked Ben to approve HeatRight and told him the status | Ben Hartley, landlord | email | A4 ✅ |
| 4 | WAIT | Hold with review 12 Oct; if still no tenant reply, send a formal written 24h notice of a proposed slot, try phone/letter, and escalate (P2 maintenance) if nothing by 13 Oct | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your yearly gas safety check at 19 Victoria Park Road is a legal requirement and the current certificate runs out on 16 October. We have emailed and texted but not heard back. Please reply with a few times in the next few days that suit you (mornings, afternoons or evenings), or call us. We will confirm a firm slot in writing, with at least 24 hours' notice, before any engineer comes. We will not enter without your agreement. We will contact you again on Monday 12 October. If you smell gas, leave the property and call 0800 111 999.

**A3 · send_message → HeatRight Ltd (contractor) via sms, +447700900311** (verified)

> Hi, we need an annual gas safety check (CP12) at 19 Victoria Park Road, E9 7HD before 16 Oct. Please send your price and the dates/times you can attend between 12 and 15 Oct. Nothing is booked yet; we are waiting on the tenant's access times and landlord approval.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hi Ben, the gas safety certificate at 19 Victoria Park Road is valid until 16 Oct 2026, so it is currently compliant, but the renewal is not yet booked. Luca has not replied to our email (25 Sep, 2 Oct) or SMS (2 Oct). We have asked him for times and asked HeatRight Ltd (your preferred gas firm) for price and availability. May we instruct HeatRight for the check? We will call you before committing anything over £300 inc VAT. We will update you by Monday 12 Oct. We will not enter without the tenant's agreement and 24h written notice.
> 
> Options: Yes, instruct HeatRight Ltd (up to £300 inc VAT); Use your own engineer

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is booked and no contractor is assigned; the renewal is not guaranteed before 16 Oct.
- The valid CP12 does not mean the renewal is done.
- No entry will be made without tenant agreement; holding keys gives no right of entry.

## Remaining work
- Landlord decision (agency/Ben)
- HeatRight confirmation of slot (HeatRight)
- Tenant access (Luca)
- Written 24h notice once a slot is confirmed (agency)
- Issue the new CP12 to the tenant within 28 days

## Missing or unavailable information
- Tenant response
- HeatRight price and availability
- Landlord approval
- Property record P-230 not found in system; relied on case inputs

## Conflicts between sources
- Legacy note says gas cert renewed 2025 (undated); compliance record gives issue date 2025-10-17 and expiry 2026-10-16. Trusted the compliance record.
- get_property returned no record for P-230; used the case CRM data.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, until 16 Oct 2026. I trust compliance.json (CP12 issued 2025-10-17, expires 2026-10-16, Gas Safe 550123, which matches HeatRight) over the vague legacy note 'gas cert renewed 2025', which has no date and is from the old agency. The CP12 itself is not seen directly.

**2. What steps do you take to get access lawfully before expiry?**

Contacts so far: email 25 Sep, email 2 Oct and SMS 2 Oct. Now I have sent another email asking for times and promising written notice of at least 24h, and asked HeatRight for slots. Next, on 12 Oct, I send formal written notice of a provider-confirmed slot, try phone and letter, and escalate if there is still no reply. No forced entry, and keys give no right of entry. The renewal can be done up to 2 months early, so a late visit is fine as long as it lands before 16 Oct.

**3. What do you tell the landlord?**

I told Ben the certificate is valid to 16 Oct, the tenant has not responded, HeatRight has been asked, we need his approval (call before anything over £300), and we will update him by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","tenant":"T-1030","description":"Annual gas safety check (CP12) due; current certif… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","ticket_ref":"JOB-101","body":"Hi,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hi Ben, the gas safety certificate at 19 Victoria Park Road is valid unt… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Tenant","comment":"Awaiting tenant access times, HeatRight price/slots and landlord approval. … | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |

## Failed or unverified actions
_None._
