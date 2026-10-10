# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The gas safety record is valid until 16 Oct 2026 but the tenant has not replied to three contacts. I opened JOB-101, sent the tenant a written request for access times, asked Ben to approve HeatRight, and set a follow-up for 12 Oct.

## Where the case stands
JOB-101 at intake. Waiting on landlord approval (APR-102) and tenant reply; review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve HeatRight Ltd for the gas safety renewal | Ben Hartley, landlord | email | A2 ✅ |
| 2 | CHASE_TENANT | Written request for access times, with 24h notice promised once a slot is confirmed | Luca Bianchi, tenant | email | A3 ✅ |
| 3 | WAIT | Review 12 Oct: phone and letter to tenant, book HeatRight, escalate if no access route | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Ben, the gas safety record at 19 Victoria Park Road is valid until 16 Oct 2026. Luca hasn't replied to our email (25 Sep) or email and text (2 Oct). May we instruct HeatRight Ltd to carry out the renewal check before 16 Oct? We have no quote yet; we'll call you first if it goes over £300 inc VAT. We're also giving Luca written notice and asking for a time.
> 
> Options: Yes, instruct HeatRight Ltd (recommended); I'll use my own gas engineer; Other

**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your annual gas safety check at 19 Victoria Park Road must be done before 16 October, and we haven't heard back from our earlier messages. Please reply with a few dates and times that suit you in the next few days (weekday or weekend). Once an engineer confirms a slot we'll send you at least 24 hours' written notice of the visit. Someone aged 18+ needs to be home. If you smell gas, leave the property and call 0800 111 999. We'll be in touch again by Monday 12 October.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked and no contractor assigned yet.
- Nothing here confirms access or the cost of the check.
- Compliance status is only until 16 Oct.

## Remaining work
- Landlord decision on HeatRight
- Tenant access time
- Engineer-confirmed slot plus 24h written notice
- Copy of new CP12 to tenant within 28 days

## Missing or unavailable information
- Tenant availability
- HeatRight price and slots
- Landlord approval
- CP12_2025.pdf not seen; only its record

## Conflicts between sources
- Legacy note says 'gas cert renewed 2025, all good'; compliance record gives issue 2025-10-17 and expiry 2026-10-16. Trusted the compliance record. get_property found no record for P-230, so I relied on case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety?**

Yes, until 16 Oct 2026. I trust the compliance record (CP12 issued 2025-10-17, Gas Safe 550123) over the old agency note, which is vague hearsay. It also lapses after that date. I haven't seen the PDF.

**2. What steps do you take to get access lawfully before expiry?**

Sent a written request for times. Next: phone and letter on 12 Oct. Book HeatRight (out of hours capable) once the engineer confirms a slot and landlord approves, giving the tenant at least 24h written notice. No forced entry; keys give no right of entry. If no access is possible by 16 Oct, document all attempts and escalate to a human.

**3. What do you tell the landlord?**

Told Ben the certificate is valid to 16 Oct, the tenant hasn't replied, and asked him to approve HeatRight (we'll call first if over £300 inc VAT).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) expires 2026-10-16. Tenant Luca Bianc… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Ben, the gas safety record at 19 Victoria Park Road is valid until 16 Oc… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant/landlord replies; if none, phone tenant, send letter, and book HeatRig… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
