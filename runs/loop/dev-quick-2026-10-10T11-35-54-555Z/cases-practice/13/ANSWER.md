# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The property is compliant today: the CP12 issued 2025-10-17 is valid until 2026-10-16. I opened JOB-101 and contacted the tenant (email and SMS), the landlord, and HeatRight Ltd, then put the job on hold to review on 2026-10-12. No visit is booked yet because the tenant has not given access and HeatRight has not confirmed availability.

## Where the case stands
Ticket JOB-101 open (gas, urgent) on hold. CP12 for P-230 valid until 2026-10-16. Tenant Luca Bianchi has not replied to 2 emails and 1 SMS. Waiting on tenant access date and HeatRight availability/price.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Email and SMS tenant Luca Bianchi asking for a visit day and time before 16 Oct, with 24h written notice promised | Luca Bianchi, tenant | email | A2 ✅ |
| 2 | CHASE_LANDLORD | Tell landlord the certificate expiry, tenant non-response, and that HeatRight will be booked within £300 limit | Ben Hartley, landlord | email | A4 ✅ |
| 3 | CHASE_PROVIDER | Ask HeatRight Ltd for earliest visit dates on or before 15 Oct and their price | HeatRight Ltd, contractor | email | A5 ✅ |
| 4 | WAIT | Hold JOB-101 and review 2026-10-12 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Dear Luca,
> 
> Your annual gas safety check at 19 Victoria Park Road is due before 16 October 2026. Your current safety certificate runs until then, so we need to book the check before it expires.
> 
> We have not heard from you about this yet. Please reply to this email or call us with a day and time that suits you. We will give you at least 24 hours' written notice of the visit.
> 
> If you have any questions, please get in touch.
> 
> Kind regards,
> Property Management Team

**A3 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, your gas safety check at 19 Victoria Park Road must be done before 16 Oct. Please reply with a day and time that suits you. We will give 24 hours' written notice. Thanks, Property Management Team

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Dear Ben,
> 
> The gas safety certificate (CP12) for 19 Victoria Park Road expires on 16 October 2026. The current certificate was issued on 17 October 2025 by Gas Safe engineer 550123.
> 
> The tenant, Luca Bianchi, has not replied to our emails of 25 September and 2 October or our text of 2 October. We are sending him another request today and will ask for a visit date.
> 
> We plan to book HeatRight Ltd, your preferred gas contractor, for the check. We will only instruct them within your spend limit of £300 including VAT. We will confirm the price with you before any work is booked if it might exceed that.
> 
> Kind regards,
> Property Management Team

**A5 · send_message → HeatRight Ltd (contractor) via email, HeatRight Ltd, phone +447700900311 (contractor record C-11)** (verified)

> Hello HeatRight team,
> 
> We need an annual gas safety check (CP12) at 19 Victoria Park Road, London E9 7HD. The current certificate expires on 16 October 2026. Could you tell us your earliest available visit dates on or before 15 October 2026? Please confirm the price too; the landlord's limit is £300 including VAT.
> 
> The tenant, Luca Bianchi, has not yet confirmed access, so we are arranging that with him and will give at least 24 hours' written notice of the visit.
> 
> Thank you.
> Property Management Team

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The property is compliant today only because the CP12 issued 2025-10-17 runs to 2026-10-16. That does not cover the next gas check.
- No visit is booked. Nothing confirms a date, price, or the outcome of the check.
- No access has been arranged. No entry without 24h written notice.
- Landlord has not approved spend. Limit on file is £300 inc VAT; HeatRight's price is unknown.

## Remaining work
- Tenant to give access date (owner: tenant; chase by 2026-10-12, review on hold).
- HeatRight to confirm dates and price (owner: HeatRight; chase 2026-10-12).
- If no access by ~2026-10-13, escalate to maintenance P2 for alternative access route and landlord decision before the 16 Oct expiry.
- Once CP12 is issued, file it and close JOB-101 with final checks.

## Missing or unavailable information
- Tenant access date (no reply to email 25/09, email 02/10, SMS 02/10).
- HeatRight availability and price.
- Landlord's confirmation of spend (price not yet known).

## Conflicts between sources
- Legacy note (2025-11-02, old agency) says 'gas cert renewed 2025, all good'. Compliance record and CP12 date (issued 2025-10-17, expires 2026-10-16) are current; trusted the system record.

## Answers to the case questions
**1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, as of today (2026-10-10). The CP12 issued 2025-10-17 by Gas Safe engineer 550123 (CP12_2025.pdf) runs to 2026-10-16. I trust compliance.json because it is the current system record with an expiry date. The legacy note 'gas cert renewed 2025, all good' is consistent with it but is older hearsay and does not show a valid date. Compliance ends 2026-10-16 unless a new CP12 is issued.

**2. What steps do you take to get access lawfully before expiry?**

I sent the tenant an email and an SMS asking for a day and time, promising 24h written notice of the visit. I asked HeatRight Ltd (preferred contractor, Gas Safe 550123) for dates on or before 15 Oct. I have not entered or set any visit. If the tenant does not respond by about 13 Oct, the next step is escalation for a lawful alternative route, such as a further written notice with a proposed date, before 16 Oct.

**3. What do you tell the landlord?**

I emailed Ben Hartley: the CP12 expires 16 Oct 2026, the tenant has not replied, I am booking HeatRight (his preferred contractor) within his £300 inc VAT limit, and I will confirm the price before booking if it might exceed that.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230 (19 Victoria Park Road, London E9 7HD)","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","body":"Dear Luca,\n\n… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","body":"Hi Luca, your gas safety check … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Dear Ben,\n… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"email","contact":"HeatRight Ltd, phone +447700900311 (contractor … | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Tenant","comment":"Waiting for tenant to give access date for CP12 (cert expires 2026-10-16). … | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |

## Failed or unverified actions
_None._
