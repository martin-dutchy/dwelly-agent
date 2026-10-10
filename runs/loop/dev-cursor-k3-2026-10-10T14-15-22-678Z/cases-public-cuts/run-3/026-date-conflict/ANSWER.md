# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair job with visit date conflict between the record (30/08, a Saturday labelled Monday) and the tenant (8 Sept). I asked the provider to confirm the date and attendance, told the tenant it is unconfirmed and asked if 8 Sept suits, noted the conflict and set a follow-up for 2 Sept.

## Where the case stands
Provider assigned (landlord approved). Visit date unconfirmed: record says 30/08/2025 (a Saturday, labelled Monday); tenant says 08/09/2025. Waiting on provider to confirm date and whether anyone attended today.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask provider to confirm the actual agreed date/window and whether anyone attended today, by 1 Sept | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant date is unconfirmed, ask if 8 Sept is acceptable with oven out of use, next update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on provider confirmation 2 Sept | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, re the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit of 30/08/2025 10-12 (described as "Monday", but 30/08 is a Saturday). The tenant has now phoned to say she agreed 8 September 2025 (a Monday) with your engineer instead. Please reply by end of Monday 1 September to confirm: (1) the exact date and time window you have agreed with the tenant, and (2) whether anyone attended this morning. Please do not attend on any date you have not confirmed with the tenant. Please also send the oven make and model once seen and any quote before work starts, as per our approval process. Thank you.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 019 email)** (verified)

> Hello Clara, thanks for your call, and sorry for the confusion over dates. Our record shows 30/08 (this morning), which was wrongly labelled "Monday". We are asking the engineer to confirm whether 8 September is the agreed date, and until they confirm it please treat it as not yet confirmed; nobody should be expected on a date they haven't confirmed. As the oven is out of use, is 8 September acceptable to you? If not, we will ask for an earlier slot. We will update you by Tuesday 2 September. Please let us know if anyone did turn up this morning.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked; 8 Sept is only the tenant's account until the provider confirms
- Does not establish whether anyone attended on 30/08
- Does not establish the cause or cost; landlord approval covers sending the provider only, any quote needs approval

## Remaining work
- Provider to confirm date; then set_visit if future and confirmed
- Record work result after the visit
- Quote/invoice handling and landlord update on completion

## Missing or unavailable information
- Provider-confirmed visit date
- Whether engineer attended 30/08
- Oven make/model
- Attachment at event 014 unavailable

## Conflicts between sources
- 30/08/2025 labelled Monday but is a Saturday; tenant says 08/09/2025 (a Monday); the provider has confirmed neither
- Provider named as Keystone Compliance, Riverside Works, Lantern Utilities, Keystone Utilities; tenant named Clara, Ruben Oakley, Grace Mercer, Harriet Fletcher; treated as the same job and property
- Event 004 hold 'Waiting for Provider' then 'Waiting for Landlord'; landlord has since approved

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved sending a contractor; provider assigned; visit date is disputed (30/08 vs 08/09) and unconfirmed by the provider; repair not done.

**2. What is the next action, who is it for, and through which channel?**

Email the provider to confirm the date and attendance, and email the tenant explaining it is unconfirmed and asking if 8 Sept is acceptable; both sent.

**3. Does anything need a human decision, and why?**

No. It is a routine date confirmation; follow-up set for 2 Sept.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","body":"Hello C… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"Flat 3, 3 Willowmere Road oven job","note":"Date conflict: record/events 017-020 say 30/08/2025 10-12 'Monday' (30/08 is a Saturd… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-09-02","purpose":"Check provider confirmed visit date (30/08 vs 08/09); update tenant; chase sooner slot if tenant wants one… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
