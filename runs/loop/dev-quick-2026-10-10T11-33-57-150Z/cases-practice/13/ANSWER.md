# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The current gas safety record (CP12 issued 2025-10-17, expires 2026-10-16) is still valid today, so the property is compliant. The legacy note "renewed 2025, all good" agrees but is superseded by the signed certificate. Ticket JOB-101 was opened and assigned to HeatRight Ltd, the tenant, landlord and contractor were contacted, and the job is on hold until 2026-10-12 for the tenant's access reply.

## Where the case stands
Gas safety renewal for P-230 (19 Victoria Park Road). Ticket JOB-101 at visit stage, assigned to HeatRight Ltd, no visit window confirmed yet. On hold waiting for tenant access reply and HeatRight booking. Review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tenant asked by email to reply with an access time for the gas safety check before 16 Oct; explained 24h written notice and that entry needs their agreement | Luca Bianchi, tenant | email | A3 ✅ |
| 2 | ASSIGN_PROVIDER | HeatRight Ltd asked to book the CP12 before 16 Oct and confirm a visit window | HeatRight Ltd, contractor | phone_call | A4 ✅ |
| 3 | CHASE_LANDLORD | Landlord told the certificate is still valid to 16 Oct, the tenant has not replied, and that we will call before booking anything over £300 inc VAT | Ben Hartley, landlord | email | A5 ✅ |
| 4 | WAIT | Hold JOB-101 with review on 2026-10-12 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hello Luca,
> 
> Your property's yearly gas safety check (the CP12 certificate) runs out on 16 October 2026, and the law requires it to be renewed. We have emailed and texted you without a reply, so we would be grateful if you could reply to this email or call us as soon as possible with a time that suits you.
> 
> The check is usually quick. Our approved gas engineer is HeatRight Ltd. We will give you at least 24 hours' written notice of the visit before anyone attends. We cannot enter without your agreement except in a genuine emergency.
> 
> If you have any questions, please reply here.
> 
> Kind regards,
> Lettings Operations

**A4 · send_message → HeatRight Ltd (contractor) via phone_call, +447700900311** (verified)

> Please book the annual gas safety check (CP12) for 19 Victoria Park Road, London E9 7HD (P-230) before the current certificate expires on 16 October 2026. Tenant Luca Bianchi has not yet replied, so please confirm a visit window with us once you have one. Access is via the tenant only after 24 hours' written notice.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Your gas safety certificate (CP12) for 19 Victoria Park Road is valid until 16 October 2026. It is currently still valid. We have not yet been able to book the renewal because the tenant, Luca Bianchi, has not replied to our emails and text.
> 
> We have asked HeatRight Ltd, our usual gas engineer, to do the check before the certificate expires. We expect the annual check to fall within your £300 spend limit, but we will call you before booking if the price is above £300 including VAT.
> 
> If you'd like to discuss, please reply here or call the office.
> 
> Kind regards,
> Lettings Operations

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Gas safety is currently compliant: CP12 issued 2025-10-17 expires 2026-10-16, so it is valid today. This does not confirm the boiler is safe beyond that record.
- No visit is booked. The 'TBC' window is not a booking.
- Entry has not been arranged; no access without tenant agreement or a genuine emergency.
- The landlord email said we expect the check to fall within £300; that is an expectation, not a quote.

## Remaining work
- HeatRight Ltd to confirm a visit date before 2026-10-16 (owner: HeatRight, chase by 2026-10-12).
- Tenant to reply with an access time (owner: Luca Bianchi). If none by 2026-10-12, phone the tenant and escalate P2 to maintenance.
- Landlord: if HeatRight's price is above £300 inc VAT, call Ben Hartley before booking.
- After the visit: record work result, file the new CP12, send a copy to the tenant within 28 days, and close.

## Missing or unavailable information
- Tenant access time (no reply to two emails and one SMS)
- HeatRight's price and availability
- Whether the tenant's phone number is reachable (call not yet attempted)

## Conflicts between sources
- Legacy note (2025-11-02, old agency) says gas cert renewed 2025 and all good; CP12 record shows issue 2025-10-17 expiring 2026-10-16. Trusted the signed CP12 record.
- Landlord's £300 call-first rule vs. the CP12 cost (unknown): no quote yet, so no approval needed yet.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, as of today (2026-10-10). I trust the current signed CP12 record (CP12_2025.pdf, issued 2025-10-17, expires 2026-10-16, Gas Safe 550123). The legacy note saying 'renewed 2025, all good' is an old-agency comment with no expiry date, so it is secondary. The certificate lapses on 2026-10-16 unless renewed.

**2. What steps do you take to get access lawfully before expiry?**

Opened JOB-101 and assigned HeatRight Ltd. Emailed the tenant asking for an access time, with 24h written notice and no entry without agreement. Asked HeatRight to book before 16 Oct. Held the job until 2026-10-12 to review. If there is still no reply, phone the tenant and escalate to maintenance at P2. Do not enter without 24h written notice or an emergency.

**3. What do you tell the landlord?**

That the CP12 is valid until 16 Oct 2026, the tenant has not replied, HeatRight has been asked to book before expiry, and we will call before booking anything above £300 inc VAT, his spend limit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230 (19 Victoria Park Road, London E9 7HD)","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"HeatRight Ltd","visit_window":"TBC - to be confirmed by HeatRight Ltd before 2026-10-16"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"ticket_ref":"JOB-101","recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"ticket_ref":"JOB-101","recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"phone_call","contact":"+447700900311","bod… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"ticket_ref":"JOB-101","recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Tenant","comment":"Waiting for tenant Luca Bianchi to reply with access time for CP12 (current… | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |

## Failed or unverified actions
_None._
