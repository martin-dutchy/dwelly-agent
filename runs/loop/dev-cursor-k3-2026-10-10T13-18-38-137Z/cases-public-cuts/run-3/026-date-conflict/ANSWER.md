# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant disputes the 30/08 visit date, saying 8 Sept was agreed. The provider hasn't confirmed either date, so I asked Keystone to confirm, told the tenant what the record holds and that 8 Sept is not booked, and set a follow-up for 2 Sept.

## Where the case stands
Provider assigned (Keystone Compliance, landlord approved). Visit on record 30/08/2025 10-12 (a Saturday, labelled Monday); tenant says she arranged 8 Sept. Provider has not confirmed either date. Waiting on provider; follow-up 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask provider to confirm whether they attended 30/08 and which date was agreed (30/08 vs 08/09) | Keystone Compliance, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the record holds 30/08, we are confirming with provider, 8 Sept not booked until confirmed, next update by 2 Sept | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Review provider reply and then set_visit or record result | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, regarding the oven repair at Flat 3, 3 Willowmere Road. Our record holds a visit on 30/08/2025, 10-12 (note: that date is a Saturday, though the booking says Monday). The tenant has called to say she arranged 8 September 2025 with you instead. Please reply today to confirm: (1) did you attend this morning, and (2) which date have you actually agreed with the tenant? Please do not treat any date as booked until you confirm it. Many thanks.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 019 email)** (verified)

> Hi Clara, thanks for calling. Our record currently shows 30 August (10-12), but you've told us you agreed 8 September. We've asked Keystone Compliance to confirm which date is right, and until they do we can't say 8 September is booked. Nobody should be expected on a date the contractor hasn't confirmed. If anyone did turn up or call this morning, please let us know. We'll update you by Tuesday 2 September at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked or changed; 8 Sept is only the tenant's claim.
- Does not establish whether the provider attended on 30/08.
- No quote or spend approved.

## Remaining work
- Provider to confirm date; then set_visit or record_work_result (missed/no access) - agency ops, review 2025-09-02
- Attachment at event 014 never seen
- Ticket still marked hold/auto state unresolved (resume_auto failed)

## Missing or unavailable information
- Provider confirmation of visit date and attendance
- Attachment-25-document unavailable

## Conflicts between sources
- 30/08/2025 is a Saturday but the booking says Monday
- Record 30/08 vs tenant's 8 Sept; the record is treated as current until the provider confirms
- Provider and tenant names vary across events (Keystone Compliance/Riverside Works/Lantern Utilities; Clara/Grace Mercer/Ruben Oakley)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Keystone assigned. The visit date is disputed (record 30/08, a Saturday labelled Monday, versus tenant's 8 Sept). It is now past the 30/08 10-12 slot with no result recorded. Provider confirmation is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance asking them to confirm attendance and the agreed date, and an email to the tenant explaining the position. Both sent. Follow-up set for 2 Sept.

**3. Does anything need a human decision, and why?**

No. A provider question resolves the date. Note the muddled party names across events, which a human may want to tidy in the records.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 019 email)","ticket_ref":"0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"026","note":"Date conflict: record/system messages (events 017-020) say 30/08/2025 'Monday' (30/08 is a Saturday); tenant (event … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"026","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Confirm visit date (30/08 vs 08/09) and whether 30/08 att… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"026"} | 1 | ❌ failed | Ticket 026 not found on read-back |

## Failed or unverified actions
- A5: resume_auto returned ticket 026 not found; not retried as the case reference doesn't exist as a ticket ID. Noted for the human to correct; nothing was reported as done.
