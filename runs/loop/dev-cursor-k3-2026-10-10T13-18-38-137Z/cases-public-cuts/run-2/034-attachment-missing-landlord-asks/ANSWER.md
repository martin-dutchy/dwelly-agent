# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider reported the shower mixer fixed, but attachments were not received. I asked the provider to re-send, told the landlord I can't yet give the invoice amount, asked the tenant to confirm, and put the ticket on hold to 4 June.

## Where the case stands
Ticket at mp_time, landlord approval confirmed, Meadow Works assigned. Provider says (event 010) they attended 1 June and fixed the mixer, but the invoice and photos are not visible and no visit is recorded. On hold until 2025-06-04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to re-send invoice and photos and confirm attendance date and invoice total | Meadow Works, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask Ava to confirm the visit happened and the shower works | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 4 June for invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> Hi Meadow Works, thanks for your update on the shower at Flat 9, 9 Willowmere Road. The photos and invoice did not reach us. Please could you re-send them as PDF/JPG attachments, and confirm in the email the date and time you attended and the invoice total including VAT? We will not be able to close or pay the job until we have these. Thanks.

**A2 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, Meadow Works emailed today to say they attended the shower at Willowmere Road, found a problem with the mixer, cleaned and greased it, and that hot and cold now run fine. That is their report so far; we are confirming it with the tenant. Their invoice and photos did not come through to us, so I can't yet tell you the amount. I've asked them to re-send, and will pass on the invoice total as soon as we have it, by Wednesday 4 June. Please don't pay anything directly until then.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ava, Meadow Works tell us they visited today and fixed the shower mixer, so hot and cold both run. Could you let us know whether they did attend, and whether the cold side now works and the temperature is steady? If anything is still wrong, tell us and we will arrange a return visit. We will update you by Wednesday 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The provider's claim is not verified fix; no work result recorded.
- Nothing approved for payment; invoice amount unknown.
- Landlord was told the report is the provider's claim only.

## Remaining work
- Get invoice and photos from Meadow Works
- Tenant confirmation
- Record work result and invoice, tell landlord the amount, then close

## Missing or unavailable information
- Invoice amount and attachments (not visible)
- Visit date/time
- Tenant confirmation

## Conflicts between sources
- Hints say visit not booked, but provider says they attended 1 June; unverified until the tenant confirms.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider reports the work done on 1 June. Invoice, photos, visit record and tenant confirmation are outstanding. The landlord is asking for the amount.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email to re-send the invoice and photos; update the landlord and ask the tenant to confirm, both by email. All sent.

**3. Does anything need a human decision, and why?**

No. This is routine follow-up; no escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","reason":"Waiting for Provider","comment":"Awaiting re-sent invoice, photos and vis… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after put_on_hold |

## Failed or unverified actions
_None._
