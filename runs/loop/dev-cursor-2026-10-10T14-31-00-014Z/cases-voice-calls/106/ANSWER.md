# Case 106: Dishwasher Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oakfield Homes attended, tightened a loose heater connection and the dishwasher now runs; a missing dial needs £95 approval. The landlord was already asked at event 020, so I recorded the quote and work result, put the job on hold for landlord reply and updated the tenant. No human decision needed.

## Where the case stands
Stage: result/quote loop. Dishwasher fault fixed on site (loose heater connection tightened, runs on test). Missing control dial quoted £95 incl VAT; awaiting landlord approval (asked event 020, no reply). Ticket on hold, review 2026-12-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord decision on £95 dial quote; review 2026-12-10, then chase on a second channel (SMS/phone) with a reply-by date | Turner, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: dishwasher running, dial awaiting landlord approval, next update by 10 Dec | Amelia Nolan, tenant | email | A4 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Amelia Nolan (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Amelia, thanks for letting the engineer in. He found a loose connection on the heater, tightened it, and the dishwasher ran normally on test. He also found the control dial is missing and needs ordering. We've asked the landlord to approve that cost and will update you by Thursday 10 December. If the dishwasher plays up again before then, please let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it; no order may be placed until the landlord says yes
- The earlier 'Yes please go ahead' covered a contractor looking at the fault only
- Heater fix rests on the contractor's report; tenant has not yet confirmed it

## Remaining work
- Landlord decision on £95 quote (agency)
- Then tell Ashford/Oakfield Homes to order and fit dial, tenant confirmation, invoice, close
- Ashford told the team will ring back after landlord decides

## Missing or unavailable information
- Landlord's answer on the £95 quote
- Tenant confirmation that dishwasher works

## Conflicts between sources
- Contractor named variously as Oakfield Homes, Cedar Maintenance, Alder Maintenance, Juniper Surveying; treated as the assigned provider.
- Appliance described as 'Riverside Services' dishwasher in the summary; treated as the same job.
- Event 019 says quote 'incl. parts, labour and VAT' while the call framed it as the dial only; recorded as £95 inclusive.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Visit done, main fault fixed; £95 dial quote awaiting landlord approval; tenant confirmation, invoice and closure outstanding.

**2. What is the next action, who for, which channel?**

Wait for the landlord's reply (already asked by email, event 020), chase on a second channel after review 10 Dec; tenant updated by email.

**3. Does anything need a human decision?**

No. The landlord decides the spend; no escalation needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-106","provider":"Oakfield Homes (Ashford)","amount_gbp":95,"vat":"included","items":["Replacement control dial incl. part… | 1 | ✅ verified | Ticket NBL-106 read back after record_quote |
| A2 | `record_work_result` | {"ticket_ref":"NBL-106","outcome":"needs_quote","evidence":"Ashford (provider) by note event 019 and call event 021, 2026-12-07: water remov… | 1 | ✅ verified | Ticket NBL-106 read back after record_work_result |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-106","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no on £95 incl VAT control dial quote (asked event … | 1 | ✅ verified | Ticket NBL-106 read back after put_on_hold |
| A4 | `send_message` | {"recipient_name":"Amelia Nolan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hi Amelia… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
