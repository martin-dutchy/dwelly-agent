# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

Capital Boiler Fix quoted £640 inc VAT (arithmetic checks out) for a PCB and diverter valve, above Ben Hartley's £300 limit. I could not approve it, recorded it, asked Ben to decide (offering HeatRight as his preferred alternative), told the contractor not to order parts, and updated the tenant. Job held to 12 Oct.

## Where the case stands
Ticket R-4815 at result stage, on hold (Waiting for Landlord) until 2026-10-12. Quote recorded; landlord approval requested; contractor told not to order parts.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve £640 inc VAT quote CBF-2291 (over £300 limit), or choose HeatRight, reply by Mon 12 Oct 09:00 | Ben Hartley, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update Priya: pending landlord decision, hot water workaround, gas safety line, next update by 12 Oct | Priya Shah, tenant | email | A4 ✅ |
| 3 | WAIT | Hold awaiting landlord; chase by SMS/phone on 12 Oct if silent | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Approve Capital Boiler Fix quote CBF-2291 of £640 inc VAT (PCB £295, diverter valve £120, labour £118.33, VAT £106.67) for the Vaillant boiler at Flat 9, 3 Amhurst Road. This is above your £300 limit, so we have not approved it. Please reply by Monday 12 Oct morning. (£640)
> 
> Options: Approve Capital Boiler Fix at £640 inc VAT (they can fit Monday if approved; fastest, hot water currently off); Use HeatRight Ltd, your preferred boiler contractor, for a second quote/repair (will take longer); Another instruction
> 
> Update: Tenant Priya has no hot water; heating works intermittently. Capital Boiler Fix diagnosed a PCB fault and diverter valve this morning. Nothing is ordered yet. We could not phone you from this run; please call or reply. Tenant is being kept updated.

**A3 · send_message → Kieran Doyle (contractor) via email, existing thread (event email 10 Oct 11:02)** (verified)

> Hi Kieran, thanks for the quote CBF-2291 (£640 inc VAT). It is above the landlord's spend limit, so we cannot approve it ourselves. We have sent it to the landlord and will pass on his answer as soon as we have it. Please do not order parts or start work until we confirm in writing. Could you also confirm the Vaillant model/age and any warranty on the boiler or parts? Thanks.

**A4 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, the engineer found a faulty circuit board and valve in your boiler. The repair cost is above what we can approve ourselves, so we have asked the landlord to decide and are not yet able to give a repair date. We are treating this as urgent and will update you by Monday 12 Oct. Meanwhile, you can use kettles or a saucepan for hot water. If heating comes on intermittently that's fine, but if you smell gas, switch off and leave, then call 0800 111 999 (999 if anyone feels unwell). Let us know if anyone in the flat is unwell or vulnerable in the cold, so we can look at temporary options.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- No spend committed and no parts ordered
- The request does not confirm a repair date

## Remaining work
- Landlord decision (Ben) due Mon 12 Oct
- If approved, record decision, approve quote, book visit with Capital Boiler Fix
- If HeatRight chosen, send scope for quote/repair and reassign
- Chase landlord by phone/SMS on 12 Oct if silent; escalate P2 if still silent beyond that

## Missing or unavailable information
- Landlord decision
- Boiler age and warranty details (asked of contractor)

## Conflicts between sources
- Contractor says 'tenant has hot water off but heating works intermittently', consistent with the ticket. Capital Boiler Fix is not the landlord's preferred boiler contractor (HeatRight) but was assigned by us.

## Answers to the case questions
**1. Can you approve this quote?**

No. £640 inc VAT exceeds the £300 limit and Ben asked to be called before anything over £300. The contractor's pressure to 'just approve' doesn't change that. It's urgent (no hot water) but not an emergency, as the tenant is not vulnerable, so the emergency route doesn't apply.

**2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord) by email, as I can't phone from this run: approve £640 inc VAT quote CBF-2291 or choose HeatRight, reply by Mon 12 Oct 09:00; phone/SMS chase on 12 Oct. Kieran at Capital Boiler Fix: do not order parts until confirmed; supply boiler age and warranty details.

**3. Is there anything the tenant needs in the meantime?**

Yes. Priya was told the position, that we will update her by 12 Oct, to heat water by kettle, the gas emergency number, and to tell us if anyone is vulnerable. No repair date was promised.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix","amount_gbp":640,"vat":"included","items":["Vaillant PCB £295","Diverter valve £120",… | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"R-4815","decision_needed":"Approve Capital Boiler Fix quote CBF-2291 of £640 inc VAT (PCB £295, dive… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Kieran Doyle","recipient_role":"contractor","channel":"email","contact":"existing thread (event email 10 Oct 11:02)","tic… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","ticket_ref":"R-4815","bod… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Quote CBF-2291 £640 inc VAT exceeds £300 limit; awaiting Ben Hartley's dec… | 1 | ✅ verified | Ticket R-4815 read back after put_on_hold |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4815","due_on":"2026-10-12","purpose":"Chase landlord by SMS/phone if no reply; urgent job, no hot water. Update tenant.","… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
