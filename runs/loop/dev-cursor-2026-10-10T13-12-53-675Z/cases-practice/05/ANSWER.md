# Case 05: Boiler quote above the landlord's spend limit: ANSWER

**Decision:** action_taken · **Severity:** urgent

Capital Boiler Fix quoted £640 inc VAT for a PCB and diverter valve, above Ben's £300 limit (he asks for a call over £300 and prefers HeatRight). I recorded the quote, did not approve it, asked Ben by email and SMS, told the contractor to hold parts, updated the tenant and set a hold and follow-up for 12 Oct.

## Where the case stands
Stage result, on hold (Waiting for Landlord) until 2026-10-12. Quote Q-101 £640 recorded, not approved. Ben asked by email and SMS; contractor told to hold off ordering parts; tenant informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked Ben to approve £640 quote, or choose HeatRight second quote / own contractor, reply by 11 Oct | Ben Hartley, landlord | email | A2 ✅ |
| 2 | CHASE_LANDLORD | SMS second-channel prompt with reply-by date | Ben Hartley, landlord | sms | A7 ✅ |
| 3 | REPLY_TO_TENANT | Told Priya approval is pending, interim advice, next update by 12 Oct | Priya Shah, tenant | email | A3 ✅ |
| 4 | REPLY_TO_TENANT | Told Capital Boiler Fix not to order parts until approved | Kieran Doyle, contractor | email | A4 ✅ |
| 5 | WAIT | Follow-up/hold to chase landlord on Monday 12 Oct; escalate P2 if silent | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hi Ben, Flat 9, 3 Amhurst Road has no hot water (heating intermittent). Capital Boiler Fix attended and quote £640 inc VAT (Vaillant PCB £295, diverter valve £120, labour £118.33, VAT £106.67) - above your £300 limit, so we have not approved it. They could fit Monday if approved today. Please reply by end of today (Sat 10 Oct) if possible, or Sunday at the latest. You normally prefer HeatRight for boilers. (£640)
> 
> Options: Approve Capital Boiler Fix quote of £640 inc VAT (recommended, fastest: parts ordered now, Monday fit); Ask HeatRight Ltd for a second quote/attendance (slower, tenant stays without hot water longer); Arrange your own contractor

**A3 · send_message → Priya Shah (tenant) via email, priya.shah@mailbox.example** (verified)

> Hi Priya, the engineer found a faulty circuit board and valve in your boiler. The repair cost needs your landlord's approval, which we have asked for today. We'll update you by Monday 12 Oct at the latest. Meanwhile you can heat water in a kettle for washing, and use the heating when it works. If you smell gas, leave the property and call 0800 111 999. Please tell us if anyone in the home is unwell or vulnerable to the cold.

**A4 · send_message → Kieran Doyle (contractor) via email, existing thread (event email 2026-10-10 11:02)** (verified)

> Hi Kieran, thanks for the quote CBF-2291 (£640 inc VAT). It is above the landlord's spend limit so we can't approve it ourselves; we've asked him today. Please don't order parts yet. We'll confirm as soon as we hear back.

**A7 · send_message → Ben Hartley (landlord) via sms, +447700900201** (verified)

> Hi Ben, boiler quote for Flat 9, 3 Amhurst Road, London E8 2AU is £640 inc VAT, over your £300 limit. No hot water for tenant. Emailed details - can you reply yes/no by Sunday 11 Oct? Happy to call too.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or commit spend
- No visit/Monday date is booked
- Not a gas emergency; no vulnerable occupant on record, so not treated as an emergency

## Remaining work
- Ben's decision on £640 (landlord)
- If approved: record decision, approve_quote, confirm Monday fit with Capital Boiler Fix and tenant
- Chase 12 Oct; escalate P2 if still silent

## Missing or unavailable information
- Landlord decision
- Whether HeatRight should quote instead
- Whether tenant has any vulnerability (asked)

## Conflicts between sources
- Contractor says tenant's heating works intermittently and asks for approval today; policy and landlord limit take priority over the contractor's urgency.

## Answers to the case questions
**1. Can you approve this quote?**

No. £640 exceeds the £300 spend limit, there is no landlord approval, and it is not an emergency (no vulnerable occupant, no gas fault reported). The contractor's pressure to just approve is not authority.

**2. Who needs to be contacted, how, and what exactly do you ask for?**

Ben Hartley (landlord) by email and SMS, as he asks for a call over £300; I cannot phone from this run. Ask: approve £640 inc VAT, or have HeatRight quote, or use his own contractor, reply by 11 Oct. Contractor told to wait; tenant updated.

**3. Is there anything the tenant needs in the meantime?**

Yes: an update, a kettle for hot water, use of heating when it works, gas safety advice (0800 111 999), and a request to flag any vulnerability. Next update by 12 Oct. If the landlord stays silent, escalate P2.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"R-4815","provider":"Capital Boiler Fix","amount_gbp":640,"vat":"included","items":["Vaillant PCB £295","Diverter valve £120",… | 1 | ✅ verified | Ticket R-4815 read back after record_quote |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"R-4815","amount_gbp":640,"decision_needed":"Hi Ben, Flat 9, 3 Amhurst Road has no hot water (heating… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","ticket_ref":"R-4815","bod… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kieran Doyle","recipient_role":"contractor","channel":"email","contact":"existing thread (event email 2026-10-10 11:02)",… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"R-4815","due_on":"2026-10-12","party":"Ben Hartley","purpose":"Chase landlord decision on £640 quote; escalate P2 if still si… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A6 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"£640 quote exceeds £300 limit; awaiting Ben's decision (APR-102)","review_… | 1 | ✅ verified | Ticket R-4815 read back after put_on_hold |
| A7 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"sms","contact":"+447700900201","ticket_ref":"R-4815","body":"Hi Ben, … | 1 | ✅ verified | MSG-106 found in the send_message log |

## Failed or unverified actions
- first SMS attempt: Blocked by policy for an abbreviated address; resent with the full address as A7.
