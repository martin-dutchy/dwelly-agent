# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

Gas safety record is valid until 16 Oct 2026 but expires in 6 days with the tenant silent. I opened JOB-101, sent the tenant written notice asking for times, asked the landlord to approve HeatRight, and set a review for 12 Oct.

## Where the case stands
JOB-101 at intake. Waiting on landlord approval (APR-103) and tenant reply on access. Review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve HeatRight Ltd for the gas check | Ben Hartley, landlord | email | A3 ✅ |
| 2 | CHASE_TENANT | Written notice and request for times sent to tenant | Luca Bianchi, tenant | email | A2 ✅ |
| 3 | WAIT | Review 12 Oct: phone tenant, hand-deliver/post notice, escalate to compliance if still no access | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca, your yearly gas safety check at 19 Victoria Park Road is a legal requirement and the current certificate runs out on 16 October. We've emailed and texted but haven't heard back. This is written notice that we are arranging a Gas Safe engineer (HeatRight Ltd) to visit. Please reply with days and times that suit you in the next few days, or call us. Once a time is confirmed we will send you at least 24 hours' written notice, and nobody will enter without it. If you ever smell gas, leave the property, don't use switches or flames, and call 0800 111 999. Thank you.

**A3 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Gas safety certificate for 19 Victoria Park Road expires 16 Oct. Tenant hasn't replied to email/SMS. May we instruct HeatRight Ltd for the annual gas safety check (cost not yet quoted; please confirm it's fine, or cap)?
> 
> Options: Yes, instruct HeatRight Ltd (recommended); I will arrange my own Gas Safe engineer

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked; no landlord approval yet.
- Nothing here renews the certificate; it is not valid after 16 Oct without a new check.
- No entry will happen without 24h written notice of a confirmed time.

## Remaining work
- Landlord approval, then assign HeatRight and get provider-confirmed slot
- Tenant access; 24h notice
- Send copy of new CP12 to tenant within 28 days
- If no access by 12 Oct, call, letter, escalate to compliance

## Missing or unavailable information
- Tenant response/access times
- Landlord approval and the check's cost
- CP12_2025.pdf not seen; only its metadata

## Conflicts between sources
- Legacy note says cert renewed 2025; compliance record gives exact dates. Trusted the compliance record. No property record found in the system, so I relied on the case inputs.

## Answers to the case questions
**1. Is the property currently compliant for gas safety?**

Yes, today. The compliance record shows a CP12 issued 2025-10-17 and expiring 2026-10-16 (Gas Safe 550123, which matches HeatRight). I trust it over the legacy note ('renewed 2025, all good'), which is vague, unsigned and from the old agency. It is only compliant until 16 Oct; the certificate itself wasn't seen.

**2. What steps do you take to get access lawfully before expiry?**

Sent written notice to the tenant asking for times and saying 24h written notice will follow once a time is fixed. Earlier email and SMS went unanswered. Next, on 12 Oct: phone call, then posted/hand-delivered letter, then escalate to compliance. No forced entry; holding keys gives no right of entry.

**3. What do you tell the landlord?**

Ben has been told the certificate expires 16 Oct, the tenant hasn't responded, and has been asked to approve HeatRight Ltd (preferred contractor, cost not yet known, limit £300) or arrange his own.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) due before 2026-10-16 expiry. Tenant … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Gas safety certificate for 19 Victoria Park Road expires 16 Oct. Tenant … | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"If tenant still silent: phone call, letter/hand-delivered notice, escalate to compl… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
