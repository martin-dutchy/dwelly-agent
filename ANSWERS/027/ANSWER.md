# Move-out maintenance at 46 Fernwick Lane: ANSWER

**Decision:** action_taken · **Severity:** routine

Alderwick's lump-sum quote of £3,865.68 exceeds the approval threshold and the landlord has not replied to the email or an unanswered call. I recorded the quote, held the job, sent the landlord an approval request with a reply-by date, asked the contractor for an itemised breakdown, and set a 18 Sep follow-up.

## Where the case stands
Stage init, on hold (Waiting for Landlord, review 2025-09-18). Quote NBL-027-Q1 £3,865.68 recorded; landlord approval requested, no reply; contractor asked for itemised breakdown.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve the £3,865.68 quote, reply by 18 Sep, with open threads | Owen Vale, landlord | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask contractor for per-task prices, VAT status and exclusions | Iris Bell, Alderwick Property Works | email | A4 ✅ |
| 3 | WAIT | Hold and review 18 Sep | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Owen Vale (landlord)** (verified)

> Approve Alderwick Property Works quote NBL-027-Q1 (£3,865.68, single lump sum, VAT not stated) for move-out works at 46 Fernwick Lane? (£3865.68)
> 
> Options: Approve the quote as it stands; Ask the contractor for a line-by-line breakdown first (recommended, as the quote has no per-item prices); Arrange your own contractor; Decline
> 
> Update: Our email of 15 Sep and a call today did not get a reply (the call only reached a recording), so this is a second-channel chase. Property is vacant, keys at our office. The quote does not cover carpets, worktop, boiler casing inspection, curtains/pole, bulbs, flooring or other items on the checkout list. We are asking the contractor for itemised prices and VAT status. No start date requested or promised until you approve. Please reply by 18 Sep.

**A4 · send_message → Iris Bell (contractor) via email, existing thread (event 013 email)** (verified)

> Hi Iris, thanks for quote NBL-027-Q1. The landlord is considering it. Please could you reply by 17 Sep with: (1) a price for each task, (2) whether £3,865.68 includes VAT, and (3) which items on the check-out report are not included (e.g. carpets, kitchen worktop, flooring, boiler casing inspection, curtain pole/curtains, bulbs). No start date is needed until the landlord approves. Thank you.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Owen Vale / Iris Bell | Landlord decision and itemised quote | 2025-09-18 | A5 ✅ verified |
| Owen Vale | Hold waiting for landlord | 2025-09-18 | A2 ✅ verified |

## What this does not establish
- Recording the quote does not approve it or commit spend
- No contractor assigned and no visit booked
- Request does not establish the landlord has seen or agreed anything

## Remaining work
- Landlord decision on quote (owner: landlord/ops)
- Itemised quote and exclusions from Alderwick
- Items on checkout list not in quote (carpets, worktop, boiler casing, flooring, curtains, bulbs) need scoping
- Escalate P3 if landlord still silent on 18 Sep

## Missing or unavailable information
- Landlord approval/rejection
- Per-item prices and VAT status
- Whether landlord approval was already in place for move-out works (event 002 vs event 015 threshold)

## Conflicts between sources
- Event 002 says landlord approval normally in place; event 015 says the quote is above threshold and needs approval. Treated the later as current.
- Quote lists a combined threshold and toilet-roll holder item and omits several checkout items.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Quote received and recorded, awaiting landlord approval; itemisation and scope gaps outstanding with contractor; property vacant, no tenant to inform.

**2. What is the next action, who for, which channel?**

Approval request to Owen Vale (email) and itemisation request to Iris Bell (email); review 18 Sep.

**3. Does anything need a human decision?**

Not yet. The landlord's approval is the decision needed. Escalate P3 if there is still no reply by 18 Sep.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-027","provider":"Alderwick Property Works","amount_gbp":3865.68,"vat":"none","items":["newel post repair","door frame scr… | 1 | ✅ verified | Ticket NBL-027 read back after record_quote |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-027","reason":"Waiting for Landlord","comment":"Awaiting landlord approval of Alderwick quote NBL-027-Q1 (£3,865.68, abov… | 1 | ✅ verified | Ticket NBL-027 read back after put_on_hold |
| A3 | `request_landlord_approval` | {"landlord":"Owen Vale","ticket_ref":"NBL-027","decision_needed":"Approve Alderwick Property Works quote NBL-027-Q1 (£3,865.68, single lump … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Iris Bell","recipient_role":"contractor","channel":"email","contact":"existing thread (event 013 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-027","due_on":"2025-09-18","party":"Owen Vale / Iris Bell","purpose":"Check landlord decision and contractor's itemised b… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
