# Case 106: Dishwasher Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oakfield Homes fixed a loose heater connection; the dishwasher now runs. A missing dial needs ordering at £95 inc VAT. I recorded the quote and the result, and told the tenant. The landlord's question was already sent, so I put the ticket on hold with a review on 10 Dec.

## Where the case stands
Visit done 7 Dec; heater connection fixed and dishwasher running. £95 inc VAT missing-dial quote recorded and awaiting landlord approval (asked event 020, no reply). Ticket on hold, review 10 Dec.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord yes/no on the £95 dial (already asked in event 020); chase on a second channel on 10 Dec. | Turner, landlord | internal | A7 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: connection fixed, dial pending landlord approval, next update by 10 Dec. | Amelia Nolan, tenant | email | A5 ✅ |

## Messages sent (verbatim)
**A5 · send_message → Amelia Nolan (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Amelia, thanks for letting our contractor in today. They found a loose connection in the dishwasher, tightened it, and it ran correctly on test. They also found a control dial is missing and would need ordering. We have asked the landlord to approve that cost, so we can't give a date for it yet. In the meantime the dishwasher should work, but please tell us if it starts running non-stop again. We'll update you by 10 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing approves the £95; the 3 Dec 'Yes please go ahead' covered the visit only.
- The dial has not been ordered and no repair date is promised.
- Work result 'needs_quote' does not close the job; invoice and final checks still to come.

## Remaining work
- Landlord decision on £95 (agency, review 10 Dec)
- If approved: approve quote, tell Oakfield Homes to order, confirm fit visit with provider
- Tell Oakfield Homes the decision is pending (the call said the team will ring back)
- Invoice, tenant confirmation and close

## Missing or unavailable information
- Landlord response on the £95
- Whether the dial is really needed for function, given the dishwasher runs
- Readable attachment (event 013 photo unavailable)

## Conflicts between sources
- Provider named variously as Oakfield Homes, Cedar Maintenance, Alder Maintenance; the note is addressed to Juniper Surveying. Same job and address, so treated as the assigned provider.
- Callback number 07700 900730 differs from the tenant contact 07700 900529.
- Old hold 'waiting for appointment to be booked' is stale; replaced by a hold on the landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The dishwasher is working after the connection fix. The £95 dial quote awaits landlord approval, as the earlier approval covered the visit only.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord's reply to the email of event 020, then chase on SMS or phone on 10 Dec. The tenant has been updated by email.

**3. Does anything need a human decision, and why?**

No human is needed. The landlord's spend decision is the only decision outstanding, and it is routine and already requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-106","decision":"approved","evidence_quote":"Yes please go ahead.","source":"event 009, email 03/12","conditions":"Covers… | 1 | ✅ verified | Ticket NBL-106 read back after record_landlord_decision |
| A2 | `record_quote` | {"ticket_ref":"NBL-106","provider":"Oakfield Homes","amount_gbp":95,"vat":"included","items":["Replacement control dial (missing), parts, la… | 1 | ✅ verified | Ticket NBL-106 read back after record_quote |
| A3 | `record_work_result` | {"ticket_ref":"NBL-106","outcome":"needs_quote","evidence":"Oakfield Homes (Ashford) note event 019 and call event 021, 7 Dec: water removed… | 1 | ✅ verified | Ticket NBL-106 read back after record_work_result |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-106","reason":"Waiting for Landlord","comment":"Waiting for landlord yes/no on £95 inc VAT dial replacement (asked event … | 1 | ✅ verified | Ticket NBL-106 read back after put_on_hold |
| A5 | `send_message` | {"recipient_name":"Amelia Nolan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `add_note` | {"entity":"NBL-106","note":"Landlord approval of 3 Dec (\"Yes please go ahead\") was to a contractor visit only; £95 dial not approved. Quot… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A7 | `schedule_follow_up` | {"ticket_ref":"NBL-106","due_on":"2026-12-10","party":"Landlord","purpose":"Chase landlord on a second channel (SMS/phone) for yes/no on £95… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
