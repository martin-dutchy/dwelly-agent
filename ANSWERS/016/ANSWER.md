# Smoke alarm maintenance request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Recorded the landlord's own-electrician route, asked the landlord for contractor details, a firm date and whether they sent the unverified visitor, and gave the tenant a brief safety-minded update. Follow-up set for 24 Sep. No human decision needed yet.

## Where the case stands
Stage init. Landlord's own-electrician route; alarm still unmounted since 7 Aug, no completion evidence. Waiting on landlord for contractor name, date and whether they sent the 20 Sep visitor. Tenant recently hospitalised, minimal contact requested.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord for electrician name, firm fit date, and whether they sent the unannounced 20 Sep visitor, reply by 24 Sep | Ronan Vale, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Brief reassurance: right not to admit visitor, 24h notice, battery alarm stop-gap, next update 25 Sep | Elise Rowan, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up landlord 24 Sep; chase by second channel if silent | Ronan Vale, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ronan Vale (landlord) via email, agency landlord record** (verified)

> Hello Ronan, the smoke alarm at 26 Tallowmere Close has still not been refitted (reported 7 August). The tenant says a fitter attended, removed the bracket and could not refit it as the box had no bracket. We have had no contractor name or completion date from you since your email of 12 August. Please reply by Wednesday 24 September with: 1) the name of your electrician/fitter and whether they have attended, 2) a firm date to fit a working alarm (the property has no working alarm in the meantime, so this is a safety matter; a temporary battery alarm would be a sensible stop-gap). 3) Did anyone you arranged call at the property unannounced on Saturday 20 September? The tenant did not let them in as they could not verify who it was. Please ensure any visitor gives the tenant 24 hours' written notice via us. The tenant has been unwell, so please let us arrange access with them. Until we hear from you we are treating this as your own-contractor job and will not send ours, to avoid the work being done twice.

**A4 · send_message → Elise Rowan (tenant) via email, existing thread (event 013 email)** (verified)

> Hello Elise, I hope you're recovering well. One short note on the smoke alarm, no reply needed unless you want to. You were right not to let in the unannounced visitor: nobody should enter without 24 hours' written notice from us, and we have not verified who it was. We have asked your landlord whether it was their fitter and for a firm date to refit the alarm; the landlord is arranging this with their own electrician. As the alarm is down, a cheap battery smoke alarm placed nearby would help in the meantime. If you feel unsafe, call 999. We will update you by Thursday 25 September, and we won't contact you otherwise unless needed.

**A6 · send_message → Dorian Pike (internal) via email, existing thread (event 017 update)** (verified)

> NBL-016: recorded as landlord's own-contractor route. Landlord emailed for contractor name, date and whether they sent the 20 Sep visitor (reply by 24 Sep); tenant told briefly (recovering, minimal contact). Follow-up 24 Sep; chase on second channel if silent.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Ronan Vale | Landlord reply on contractor, date, visitor | 2025-09-24 | A5 ✅ verified |

## What this does not establish
- Nothing confirms the visitor's identity or that the landlord's fitter attended
- No visit is booked; alarm is not confirmed fixed
- Own-contractor record does not confirm any cost or who pays

## Remaining work
- Landlord reply and firm date (agency/property manager)
- Verify visitor identity
- Confirm alarm fitted and tested, then close without payment
- Escalate P2 if landlord silent past chase

## Missing or unavailable information
- Electrician name
- Fit date
- Identity/purpose of 20 Sep visitor
- Whether alarm has been mounted

## Conflicts between sources
- Landlord said electrician would attend; tenant said a fitter (not the landlord) attended 2 Sep. Identity of that fitter and the 20 Sep visitor unverified.

## Answers to the case questions
**1. Where does this case stand?**

Alarm unfixed since 7 Aug; landlord's own electrician route with no name or date; a fitter attended but could not refit; unverified visitor 20 Sep; tenant recovering from hospital.

**2. Next action?**

Email to landlord (done) requesting details and date by 24 Sep; brief email to tenant; follow-up 24 Sep.

**3. Human decision needed?**

Not yet. Escalate P2 if the landlord stays silent after a second-channel chase or the visitor proves not to be theirs.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-016","decision":"own_contractor","evidence_quote":"use their own electrician to have a look","source":"event 004, email 0… | 1 | ✅ verified | Ticket NBL-016 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Ronan Vale","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-016","body… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-016","note":"Route: landlord's own electrician (event 004/007). Outstanding from landlord: contractor name, firm date, whethe… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Elise Rowan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 013 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-016","due_on":"2025-09-24","party":"Ronan Vale","purpose":"Landlord reply due: electrician name, date, whether they sent … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `send_message` | {"recipient_name":"Dorian Pike","recipient_role":"internal","channel":"email","contact":"existing thread (event 017 update)","ticket_ref":"N… | 1 | ✅ verified | MSG-105 found in the send_message log |

## Failed or unverified actions
_None._
