# Case 08: ANSWER

**Outcome:** action_taken · **Severity:** routine

Refused same-day entry and lock change, as there was no emergency and no 24h written notice. Sent the tenant 24h written notice for an inspection on Mon 12 Oct 10:00-12:00, replied to the landlord, and escalated the subletting suspicion to management (ESC-103).

## Answers
**1. 1. Can the agency enter the property today?**

No. Clause 7.1 needs at least 24 hours' written notice, there is no emergency, and holding a spare key gives no right of entry. Entering would risk unlawful entry or harassment, and changing the locks would be unlawful eviction. The tenant is also vulnerable.

**2. 2. What do you reply to the landlord?**

Sent MSG-102. It explains why we can't enter or change locks, says an inspection notice has been served for Monday, and asks for evidence such as the listing link and neighbour details. It says we are escalating, and warns her not to act herself. One wording slip: it says photos were taken, but photos will be taken at the inspection.

**3. 3. What do you do about the subletting suspicion?**

Treat it as unproven hearsay and a possible breach of clause 9.3. Escalated to management (ESC-103) for a P3 decision. Next steps: noticed inspection, a neutral written query to the tenant, evidence gathering, and legal advice before any formal step. No lock-out.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Hi Jonah, this is … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Hi Mar… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Landlord suspects unauthorised subletting at P-202 and asked for entry and lock change","know… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Escalations
- **P3 → management** (verified): Landlord suspects unauthorised subletting at P-202 and asked for entry and lock change
  - Known: Landlord email 10 Oct: neighbour reports different people and suitcases; landlord suspects Airbnb. Clause 9.3 bans subletting without consent; clause 7.1 needs 24h written notice. Tenant Jonah Okafor is flagged vulnerable (anxiety, prefers email). Agency refused entry today and the lock change. Sent the tenant 24h notice for inspection Mon 12 Oct 10-12 and replied to landlord.
  - Missing: No evidence beyond hearsay; no listing found; tenant's response unknown; landlord is overseas Oct-Dec.
  - Options: Attend inspection Monday and record condition; Ask the tenant in writing about occupancy; Landlord takes legal advice on breach under clause 9.3 / Section 8; Check for online listing
  - Recommendation: Run the noticed inspection, gather evidence, ask the tenant neutrally, and take legal advice before any formal breach step. Never lock out the tenant.

## Failed or unverified actions
_None._
