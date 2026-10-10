# Case 20: Water pouring into the flat below: ANSWER

**Decision:** escalated · **Severity:** emergency

Downstairs neighbour reported water through her ceiling onto a light fitting; tenant above is away and unreachable. Logged emergency JOB-101, assigned out-of-hours plumber, told tenant and landlord, and escalated P1 for key holder entry.

## Where the case stands
JOB-101 emergency at stage visit; Swift assigned 20:00-22:00 tonight; escalated P1 (ESC-105) for key holder dispatch; tenant and landlord notified; awaiting attendance confirmation.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 handover to dispatch OOH key holder to meet Swift and enter to isolate the water | internal, maintenance | internal | A6 ✅ |
| 2 | ASSIGN_PROVIDER | Assigned Swift Plumbing & Heating out of hours, 20:00-22:00 tonight | Swift Plumbing & Heating, contractor | portal | A2 ✅ |
| 3 | OTHER | Emailed landlord Ben about the leak, entry and insurer notification | Ben Hartley, landlord | email | A4 ✅ |
| 4 | REPLY_TO_TENANT | SMS to Amelia that a plumber is attending and we will enter to make safe | Amelia Clarke, tenant | sms | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Amelia Clarke (tenant) via sms, +447700900101** (verified)

> Hi Amelia, it's Mare and Co. Water appears to be leaking from your flat into the flat below. As it's an emergency, we're sending a plumber tonight and will use our emergency key to get in and turn the water off. Please call us as soon as you can, and if you can, tell us if you know of any cause.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, emergency at Flat 4, 12 Mare Street: the downstairs neighbour reports water coming through her kitchen ceiling this evening (Sat 10 Oct, 19:35). Amelia is away until 12 Oct and not answering. We're sending Swift Plumbing out of hours to enter with our key holder, isolate the water and make safe. Please call us if you expect cost over £300; please also tell your buildings insurer via your block policy. We have not accepted liability for any damage below.

## Escalation
- **P1 → maintenance** (verified): Active leak into Flat 3 over a light fitting; tenant of Flat 4 away and unreachable; need out-of-hours key holder to give Swift Plumbing entry tonight. Neighbour also demands written liability cover.
  - Known: Caller Olu Adeyemi (Flat 3, not our tenant) 19:35 Sat 10 Oct: water through kitchen ceiling onto light fitting. Amelia Clarke (T-1001) away 9-12 Oct per portal; phone voicemail, SMS delivered (MSG-102). Landlord Ben Hartley emailed (MSG-103). JOB-101 emergency, Swift (C-12, out of hours) assigned 20:00-22:00. Stopcock under kitchen sink; keys in office key safe / OOH key holder. Landlord spend limit £300.
  - Missing: Confirmation Swift has attended and the key holder dispatched; cause of leak; whether anyone is in Flat 4.
  - Options: Dispatch OOH key holder to meet Swift and enter as genuine emergency, isolate water, document entry; If cannot isolate, Swift makes safe further and landlord called re costs over £300
  - Recommendation: Option 1 now; knock and announce before entering, photograph, leave written notice for tenant, keep entry to make-safe only. Refer Flat 3's damage claim to landlord/insurer; give no liability statement.
  - Deadline: Tonight, within 1 hour

## What this does not establish
- Entry is only to make safe, not a general inspection or repair
- Assigning Swift does not confirm cause, who pays, or liability for Flat 3 damage
- No liability or compensation accepted or promised to the neighbour
- Swift attendance not yet confirmed

## Remaining work
- Human/key holder to confirm entry and isolation tonight
- Confirm Swift attended; record result and quote/invoice; call landlord if over £300
- Tenant to call back; leave written notice of entry
- Neighbour's damage claim goes to landlord/buildings insurer

## Missing or unavailable information
- Cause of leak
- Whether anyone is in Flat 4
- Landlord reply

## Conflicts between sources
- Caller says it is our fault; the agency manages the flat but liability is not established
- Tenant phone goes to voicemail, SMS delivered; portal note says she is away

## Answers to the case questions
**1. Is this an emergency that justifies entering without 24 hours' notice? What conditions?**

Yes: active flooding with electrics at risk is a genuine emergency, so entry without 24h notice is justified. Conditions: make-safe only (isolate water at stopcock under kitchen sink), use OOH key holder with contractor, try the tenant first (done by call and SMS), knock and announce, record and photograph the entry, leave written notice, tell tenant and landlord.

**2. What do you tell the caller (not your tenant)?**

Keep clear of the light fitting, switch off the lights/circuit at the consumer unit only if safe, move belongings, call 999 if sparks, burning smell or fire. A plumber is being sent and we are arranging emergency access. We cannot give out the tenant's number or any tenant details, and we'll pass your contact details to the landlord. Damage claims go through the landlord and buildings insurer; no written liability cover from us tonight.

**3. What actions and notifications do you make, and what must you avoid saying?**

Created JOB-101 emergency, assigned Swift, SMSed tenant, emailed landlord, logged the call, escalated P1. Avoid: tenant's phone or personal details, any admission of fault or promise to pay, any promised arrival time or cause.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active water leak from Flat 4 coming through ceiling of Flat… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `log_call` | {"party_name":"Olu Adeyemi","party_role":"neighbour","direction":"inbound","outcome":"connected","ticket_ref":"JOB-101","summary":"Neighbour… | 1 | ✅ verified | CALL-104 found in the log_call log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak into Flat 3 over a light fitting; tenant of Flat 4 away and unreachable; need ou… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
- A1: API timed out but read-back showed JOB-101 in place; not retried, no duplicate created
