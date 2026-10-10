# Case 101: Dishwasher Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor attended, tightened a loose connection and found a missing dial costing £95 inc VAT. He pressed for approval, saying it was under £100. No spend limit is on file and the landlord approved only the inspection, so I recorded the quote, kept the landlord request open, placed a dated hold and updated the contractor and tenant.

## Where the case stands
Stage mp_time, on hold waiting for landlord decision on £95 inc VAT dial quote (asked event 020, 2026-12-07). Inspection done, loose connection tightened, dial still missing.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord decision on £95 quote; review 2026-12-10 | Landlord (Turner) | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Updated tenant on status and next update date | Amelia Nolan, tenant | email | A4 ✅ |
| 3 | CHASE_PROVIDER | Told contractor not to order parts or do more work until approved; asked for invoice, photos and company name | Ashford, Oakfield Homes, contractor | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ashford, Oakfield Homes (contractor) via email, existing thread (event 021 call)** (verified)

> Hi Ashford, thanks for your update. We have recorded your £95 including VAT quote for the replacement dial and sent it to the landlord for a decision. The landlord's approval so far covered the inspection only, so please do not order parts or carry out further work until we confirm approval. We will update you by 10 December. Please also send your invoice for the visit and any photos of the work done, and confirm the company name you are working under.

**A4 · send_message → Amelia Nolan (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Amelia, the contractor attended and tightened a loose connection, and reports the dishwasher ran normally on test. He also found a dial missing, which needs ordering. We have asked the landlord to approve that cost and are waiting for their answer. Please let us know if the dishwasher still fails to finish its cycle. We will update you by 10 December.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- Landlord's 'Yes please go ahead' covered inspection only, not the £95
- No work result, invoice or closure recorded; the fix is only the contractor's claim until the invoice, photos and tenant confirmation arrive

## Remaining work
- Landlord decision on £95 (agency, review 2026-12-10; chase on a second channel if silent)
- Invoice, photos and tenant confirmation, then close
- Confirm the contractor company name

## Missing or unavailable information
- Landlord approval of the £95 quote
- Spend limit on file (none shown)
- Contractor invoice and photos
- Tenant confirmation the dishwasher now finishes its cycle

## Conflicts between sources
- Contractor said the agent can approve under £100; no such limit is on file, so I did not accept it.
- Provider names vary (Oakfield Homes, Cedar Maintenance, Alder Maintenance, Juniper Surveying); I treated Oakfield Homes, the assigned provider, as current and asked for confirmation.
- The contractor did the fix beyond the inspection-only scope; the tenant's appointment was only reported by a call, with no date confirmed by the provider.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit is done and the quote is with the landlord. Outstanding: the landlord's decision on £95, invoice and photos, and tenant confirmation.

**2. What is the next action, who is it for, and through which channel?**

Wait for the landlord's reply (review 10 Dec). Contractor and tenant have been updated by email.

**3. Does anything need a human decision, and why?**

No human is needed now. The decision belongs to the landlord, not the agency. Escalate only if the landlord stays silent after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-101","provider":"Oakfield Homes","amount_gbp":95,"vat":"included","items":["Replacement dial (missing), parts and labour"… | 1 | ✅ verified | Ticket NBL-101 read back after record_quote |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-101","reason":"Waiting for Landlord","comment":"Waiting for landlord decision on £95 inc VAT replacement dial quote (aske… | 1 | ✅ verified | Ticket NBL-101 read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Ashford, Oakfield Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 021 call)","ti… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Amelia Nolan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
