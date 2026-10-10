# Case 115: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant cannot attend the Monday slot, and the stated date 30/08/2025 is a Saturday. I recorded the landlord's approval and asked the provider to confirm the date and offer slots. I asked the tenant for her availability and set a follow-up for 1 Sept.

## Where the case stands
Stage: visit. Landlord approved Keystone. The visit is recorded as "Monday 10-12 (30/08/2025)", but that date is a Saturday, so it is unconfirmed. The tenant cannot do Monday morning. We are waiting on Keystone to confirm the date and offer slots, and on the tenant for her availability.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone to confirm the real visit date and offer alternative slots by 1 Sept | Keystone Compliance, provider | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the date is unconfirmed, ask for suitable days and times, and say she will hear from us by 2 Sept | Clara, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up on 1 Sept to rebook once the provider confirms a date the tenant accepts | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, re the oven repair at Flat 3, 3 Willowmere Road. Our messages say "Monday morning 10-12 (30/08/2025)", but 30/08/2025 is a Saturday, so the date is unclear. The tenant has also told us she cannot be home on Monday morning. Please (1) confirm the actual date and time you hold for this visit, and (2) send us your available slots over the next few days, ideally early morning, evening or Saturday, so we can agree one with the tenant. Please treat the current slot as unconfirmed until we reply. We would like your reply by end of Monday 1 September. Thank you.

**A3 · send_message → Clara (tenant) via email, existing thread (event 021 call / event 019 email)** (verified)

> Hi Clara, sorry we lost you on the phone today. Our earlier messages gave the visit as "Monday morning 10-12 (30/08/2025)", but that date is a Saturday, so we are checking the real date with the engineers (Keystone Compliance). Please don't plan around that slot until we confirm it. Since Monday morning doesn't suit you, could you reply with a few days and times that do work (including evenings or Saturday)? We will ask the engineers for the nearest one and aim to get the oven looked at as soon as we can. If a sooner slot would help, tell us. We will update you by Tuesday 2 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No new visit is booked; nothing here confirms any date.
- The oven fault's cause and any cost are not yet known.
- Landlord's 'Yes go ahead' covers sending Keystone only, with no spend figure.

## Remaining work
- Provider to confirm the date and slots (agency ops)
- Tenant to supply availability
- Call set_visit once the provider confirms a date
- Visit result, then quote or invoice and close

## Missing or unavailable information
- Provider-confirmed actual visit date
- Tenant availability
- Oven make/model
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but is described as Monday (Monday is 01/09)
- Provider named as Keystone Compliance, Riverside Works and Lantern Utilities
- Tenant named as Ruben Oakley, Grace Mercer, Harriet Fletcher and Clara Hughes
- Two contact numbers given for the job (07700 900721 and 07700 900077)
- Same address and job, so treated as one case

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved and Keystone is assigned. The visit is shown as Monday 10-12 (30/08/2025), but that date is a Saturday, so it is unconfirmed. The tenant cannot do Monday morning. Outstanding: the provider's confirmed date, the tenant's availability, and the visit itself.

**2. What is the next action, who is it for, and through which channel?**

I emailed Keystone to confirm the date and offer slots, and emailed the tenant for her availability. A follow-up is set for 1 Sept.

**3. Does anything need a human decision, and why?**

No. Rebooking is routine and no authority or spend decision is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-115","decision":"approved","evidence_quote":"Yes go ahead","source":"event 009, email 26/08/2025"} | 1 | ✅ verified | Ticket NBL-115 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call / event 019 email)","ticket… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-115","note":"Landlord approved Keystone (event 009 \"Yes go ahead\"). Visit date conflict: events 017-020 say Monday 30/08/20… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-115","due_on":"2025-09-01","party":"Keystone Compliance / tenant","purpose":"Check provider's confirmed date and tenant a… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
