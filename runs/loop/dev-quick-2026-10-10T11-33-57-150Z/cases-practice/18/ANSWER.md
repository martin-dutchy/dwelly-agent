# Case 18: Tenant gives one month's notice: ANSWER

**Decision:** action_taken · **Severity:** n/a

The one-month notice given on 10 Oct 2026 is not valid under the Renters' Rights Act 2025 (two months' written notice required), so the earliest end date is 10 Dec 2026. The tenant was told this and that the landlord is being asked to agree to 10 Nov in writing; the landlord was asked and a follow-up is set for 13 Oct.

## Where the case stands
Tenant Tom Achterberg (T-1050, P-250, Flat 2, 5 Navarino Road) emailed notice on Sat 10 Oct 2026 for a move-out on 10 Nov 2026. Notice is one month, which is not valid under the Renters' Rights Act 2025 (two months' written notice required). Tenant has been told the earliest valid end date is 10 Dec 2026. Landlord Ben Hartley has been asked in writing whether he will agree to 10 Nov; no reply yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the notice is not valid for 10 Nov; earliest end date is 10 Dec 2026; the 10 Nov request is with the landlord; keys and deposit process explained; plan on 10 Dec until confirmed in writing. | Tom Achterberg, tenant | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked landlord Ben Hartley for a yes/no in writing on an early end date of 10 Nov 2026; tenancy runs to 10 Dec if he declines. | Ben Hartley, landlord | email | A2 ✅ |
| 3 | WAIT | Chase landlord by phone or email if no reply by 2026-10-13. | Ben Hartley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tom Achterberg (tenant) via email, tom.a@mailbox.example** (verified)

> Hi Tom,
> 
> Thanks for your email, and congratulations on the new job in Manchester.
> 
> Since 1 May 2026, a tenant ending a tenancy needs to give at least two months' written notice. Your email received on 10 October 2026 is noted, but one month's notice is not enough on its own. The earliest date your tenancy can end from this notice is 10 December 2026.
> 
> If you'd like to leave on 10 November, we can ask your landlord, Ben Hartley, whether he will agree to a shorter period in writing. We can't promise he will, and we'll let you know his answer as soon as we have it. Until you hear from us in writing, please plan on the 10 December date.
> 
> Keys: once we have confirmed your end date, we'll arrange where and when to return them. Please don't post or leave keys anywhere until we've confirmed this with you.
> 
> Deposit: your deposit of £2,019 is held in the mydeposits scheme. We'll arrange its return once the tenancy has ended, the property has been checked out and the amount to be returned is agreed. Any dispute goes through the scheme's free dispute process.
> 
> Kind regards,
> Lettings team
> Mare & Co

**A2 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Tom Achterberg (Flat 2, 5 Navarino Road, E8 1AD) emailed on 10 October 2026 to give notice. He wrote: "Please take this as my one month's notice. I'll be moving out on 10 November. I've got a new job in Manchester."
> 
> Under current law a tenant needs to give two months' written notice, so the earliest end date from this notice is 10 December 2026. Tom has been told this.
> 
> Would you agree in writing to an earlier end date of 10 November 2026? Please reply yes or no. If you say no, the tenancy will run to 10 December 2026. We won't change anything until we hear from you.
> 
> Kind regards,
> Mare & Co Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The one-month notice is not accepted as a 10 Nov end date; this is a legal requirement.
- Ending early needs the landlord's written agreement; nothing has been agreed.
- No keys, deposit or check-out arranged yet. Deposit (£2,019, mydeposits) is not released before the tenancy ends and is agreed.
- No tenancy end date has been changed in the record.

## Remaining work
- Landlord to reply yes/no on a 10 Nov early end (chase 2026-10-13, by phone if no reply).
- Once the end date is settled in writing, confirm key return and deposit steps with the tenant and mydeposits.
- Check-out and deposit return at the end of the tenancy (lettings team).

## Missing or unavailable information
- Landlord's written decision on an early end date of 10 Nov 2026.

## Conflicts between sources
- Tenant asked to leave 10 Nov; the law requires two months (earliest 10 Dec). Followed the law.

## Answers to the case questions
**1. Is the notice valid as given? What is the earliest end date under current law?**

No. One month's notice is not valid for an assured periodic tenancy since 1 May 2026; two months' written notice is required. Given on 10 Oct 2026, the earliest end date is 10 Dec 2026.

**2. What options exist to end sooner?**

Only if the landlord agrees in writing to a shorter period (for example 10 Nov 2026). The tenant cannot end it sooner unilaterally. The landlord has been asked and has not replied, so the tenancy runs to 10 Dec unless he agrees.

**3. What do you reply and what do you start?**

Replied to the tenant (A1) explaining the notice period, the 10 Dec earliest date, that the 10 Nov request is with the landlord, and the keys and deposit process. Asked the landlord (A2) for a yes/no in writing on 10 Nov. Follow-up set for 13 Oct to chase (A3).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","ticket_ref":"P-250","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"P-250… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"P-250","due_on":"2026-10-13","party":"Ben Hartley, landlord","purpose":"Chase Ben Hartley for a yes/no on an early end date o… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
