# Case 110: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's LG washing machine failed; she offered to fit her own. The landlord agreed on a call and will contribute £10 towards removing the old one. I recorded the decision, noted the record conflicts, confirmed in writing with both parties and set a follow-up for 30 July.

## Where the case stands
Landlord agreed by phone (event 007) to tenant fitting her own machine, £10 contribution to LG removal. Decision recorded as tenant_self_fix; both parties informed in writing. Waiting for tenant to fit machine and remove the old one; follow-up 30 July.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told Ruben the landlord agreed, her machine stays hers, £10 landlord contribution to removal, she pays the rest | Ruben, tenant | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Sent landlord written confirmation of the phone agreement, asking for corrections by 30 July | Henry Ingram, landlord | email | A4 ✅ |
| 3 | WAIT | Follow-up 30 July to confirm the swap is done, then close without payment | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ruben (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ruben, good news: your landlord has agreed by phone that you can fit your own washing machine. It stays yours and you can take it with you if you move out. For removing the old LG, the landlord will contribute up to £10 and you would cover the rest of the cost. We'll send the landlord a written confirmation of this too. Please let us know if anything about this isn't what you expected. We'll update you by 1 August if there's anything further.

**A4 · send_message → Henry Ingram (landlord) via email, agency landlord record** (verified)

> Hi Henry, thanks for your call about Flat 9, 59 Alder Lane. To confirm in writing: the tenant will fit her own washing machine, which remains hers and will leave with her, so the flat will have no washing machine afterwards. The old LG will be removed, you will contribute up to £10 towards that and the tenant pays the rest. If any of this is wrong, please reply to let us know by 30 July; otherwise we'll treat it as agreed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not establish who carries out or pays the actual removal beyond the £10 contribution
- Not a repair: no contractor assigned, no spend approved
- Landlord's call was muddled, so written confirmation was requested; not yet closed

## Remaining work
- Confirm tenant has fitted her machine and removed the old LG (agency, 30 July)
- Landlord to correct if the written summary is wrong
- Close without payment once confirmed
- Landlord to decide later about a replacement machine for future tenants (landlord)

## Missing or unavailable information
_None._

## Conflicts between sources
- Event 004 names Flat 18, 128 Meadow Row (ZZ5 9ZZ), not this property; ignored.
- Event 008 labels the decision own_contractor but the call shows tenant self-fix; trusted the call transcript.
- Event 005 asked landlord to cover removal; landlord agreed only £10; latest statement used.
- Derived hints say a quote is awaiting approval; no quote exists, only the removal cost estimate.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval obtained by phone for tenant self-fix with £10 contribution; ticket still open pending the swap and old machine removal.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the tenant and the landlord confirming the arrangement; follow-up on 30 July.

**3. Does anything need a human decision, and why?**

No. The decision belongs to the landlord, who has made it. No spend or contractor is involved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-110","decision":"tenant_self_fix","evidence_quote":"Yeah, I agree.","source":"event 007, call 2025-07-27 (AI call transcr… | 1 | ✅ verified | Ticket NBL-110 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-110","note":"Event 004 call note names Flat 18, 128 Meadow Row (ZZ5 9ZZ), not this property; treated as a mis-filed note, not… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ruben","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-110","… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Henry Ingram","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-110","bo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-110","due_on":"2025-07-30","purpose":"Check for landlord correction to written confirmation and tenant confirmation that … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
