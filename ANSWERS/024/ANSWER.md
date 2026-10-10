# End-of-occupancy property service request: ANSWER

**Decision:** action_taken · **Severity:** routine

Work is reported done on 23 Sept but there is no recorded landlord approval, contractor confirmation or invoice, and the quote covers cleaning only. I asked the contractor for evidence, re-asked the landlord for a decision, and held the job with a review date of 26 Sept.

## Where the case stands
NBL-024 at landlord quote approval, now on hold to 2025-09-26. No landlord decision recorded; work reportedly done 23 Sept per internal note only; no contractor confirmation, photos or invoice.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Larkspan to confirm attendance date, whether listed items were removed, send photos and invoice, confirm keys returned | Perrin Holt, contractor | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Re-ask landlord to approve/reject £180+VAT quote by 27 Sept, with status update | Sella Voss, landlord | email | A2 ✅ |
| 3 | WAIT | Hold until review on 26 Sept | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Perrin Holt (contractor) via email, existing thread (event 011 email)** (verified)

> - Did Larkspan attend 7 Brackenmere Walk, and on what date? Our internal note says work was done on 23 September, but we have no confirmation from you.
> - Was the removal of the items listed in the checkout report (kitchen drawers, garden storage box, kitchen bins, cellar items) carried out? Your quote of 9 September (NBL-024-Q1, £180 + VAT) lists cleaning tasks only and does not mention removal.
> - Please send completion photos and your invoice (as a PDF), with the key figures typed in the email body. Please do not invoice beyond the £180 + VAT quote.
> - Please confirm the keys held by the agency have been returned.
> 
> Why: Work is noted as done but nothing from the contractor or landlord approval is on record; we need evidence before anything is closed or paid.

**A2 · request_landlord_approval → Sella Voss (landlord)** (verified)

> Approve or reject Larkspan Property Care's quote of £180 + VAT (£216 inc VAT) for the end-of-occupancy service at 7 Brackenmere Walk. Please reply by 2025-09-27. (£216)
> 
> Options: Approve the quote of £180 + VAT (£216 inc VAT); Reject the quote / arrange your own contractor
> 
> Update: Apologies for chasing again; our earlier emails of 18 and 21 Sept had no reply. Our internal note says the clear-out and service may already have been carried out on 23 Sept, but this is not yet confirmed by the contractor and no approval was recorded from you. We are asking Larkspan to confirm attendance, what was done (their quote lists cleaning only, not item removal), and to send photos and invoice. Nothing will be paid until you decide and the work is verified. The property is vacant; no tenant is involved.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Sella Voss / Larkspan | Review landlord decision and contractor evidence | 2025-09-26 | A3 ✅ verified |

## What this does not establish
- Requests do not establish that work was done, that it matched the requested scope, or that the landlord approves the spend.
- Nothing is approved, paid or closed.

## Remaining work
- Landlord decision on quote (owner: landlord/agency)
- Provider evidence: attendance, scope incl. item removal, photos, invoice, keys (owner: Larkspan)
- Check invoice vs £216 and then close; chase landlord on a second channel (phone/SMS) if still silent on 26 Sept; escalate if work proved done unapproved or invoice exceeds quote

## Missing or unavailable information
- Landlord approval evidence
- Contractor confirmation of work done and scope
- Landlord decision on deposit claim noted in event 015

## Conflicts between sources
- Event 002 'approval obtained' vs no approval evidence and later approval requests: treated as unapproved.
- Event 020 'work done' vs no contractor confirmation: unverified.
- Request covers item removal; quote covers cleaning only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord quote approval (£216 inc VAT, over £100 threshold), no landlord reply to 18/21 Sept emails. Internal note says work done 23 Sept, unverified. Outstanding: approval, contractor confirmation, scope (removal not in quote), photos, invoice, keys.

**2. What is the next action, who is it for, and through which channel?**

Evidence request to Perrin Holt (Larkspan) by email, and re-request of approval to Sella Voss by email; hold to 26 Sept.

**3. Does anything need a human decision, and why?**

Not yet. Landlord approval is theirs to give and is pending. Escalate if the landlord stays silent after a second-channel chase, or if the work is confirmed done without approval or invoiced above quote.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Perrin Holt","recipient_role":"contractor","channel":"email","contact":"existing thread (event 011 email)","questions":["… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `request_landlord_approval` | {"landlord":"Sella Voss","ticket_ref":"NBL-024","decision_needed":"Approve or reject Larkspan Property Care's quote of £180 + VAT (£216 inc … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-024","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on £180+VAT quote (£216 inc), and provider con… | 1 | ✅ verified | Ticket NBL-024 read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-024","note":"Conflicts: event 002 says landlord approval obtained but no approval evidence exists; events 018/019 ask for app… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
