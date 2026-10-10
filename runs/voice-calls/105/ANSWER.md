# Case 105: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved the tenant fitting her own washing machine, on condition she pays for installation and for removing the old machine. She must also remove her own machine and pay for that when she leaves. I recorded this as tenant_self_fix, told the tenant, noted the wrong-address mix-up in event 004, and put the job on hold awaiting her confirmation.

## Where the case stands
Landlord approved tenant self-fit by phone (event 007) with conditions. Decision recorded. Tenant told. On hold awaiting tenant's confirmation that the machine is fitted; review 2025-08-01.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told Ruben the landlord's approval and conditions, asked her to confirm when fitted, gave 1 Aug as next contact | Ruben, tenant | email | A2 ✅ |
| 2 | WAIT | Hold for tenant confirmation, review 2025-08-01, then close without payment | Ruben, tenant | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ruben, the landlord has said you can fit your own washing machine at Flat 9, 59 Alder Lane. Their conditions are: you pay for the installation and for removing the old machine, and when you leave you take your machine with you and pay for its removal. The new machine stays yours. Please let us know once it's fitted and the old one has gone, so we can close the job. We'll check in with you on 1 August if we haven't heard before then. Many thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Approval does not confirm the machine is fitted or the old one removed
- It does not set who removes the old machine beyond the landlord's stated conditions that the tenant pays
- The landlord's spoken conditions have not been confirmed in writing

## Remaining work
- Tenant to fit machine and confirm; agency then closes without payment and confirms the landlord knows
- Review 2025-08-01

## Missing or unavailable information
_None._

## Conflicts between sources
- Event 004 names Flat 18, 128 Meadow Row (ZZ5 9ZZ); the landlord owns both properties and confirmed Flat 9, 59 Alder Lane in event 007. Treated as the other property.
- Event 008 system line says own_contractor, but the landlord is not sending a contractor; the tenant fits her own machine, so I recorded tenant_self_fix.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord gate is cleared: conditional approval for the tenant to self-fit, given on the call in event 007. Outstanding: the tenant fitting the machine and confirming, then closing without payment.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant Ruben with the landlord's conditions (sent), then wait with a review on 2025-08-01.

**3. Does anything need a human decision, and why?**

No. The landlord decided and the conditions are clear. The wrong-address mention in event 004 is noted and does not affect this job.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-105","decision":"tenant_self_fix","evidence_quote":"It doesn't work for me, but if she covers the cost of the installatio… | 1 | ✅ verified | Ticket NBL-105 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-105","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-105","note":"Event 004 call note refers to Flat 18, 128 Meadow Row/Road (ZZ5 9ZZ), a different property owned by the same lan… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-105","reason":"Waiting for Tenant","comment":"Waiting for tenant to confirm new machine fitted and old one removed at her… | 1 | ✅ verified | Ticket NBL-105 read back after put_on_hold |

## Failed or unverified actions
_None._
