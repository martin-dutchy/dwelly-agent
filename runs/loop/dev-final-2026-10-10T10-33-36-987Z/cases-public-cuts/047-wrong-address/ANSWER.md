# Case 047-wrong-address: ANSWER

**Outcome:** escalated · **Severity:** routine

Tenant's window repair is still awaiting landlord approval. The landlord's reply names a different address (Flat 18, 88 Alder Lane) and a plumber, so it can't count as approval. I logged JOB-101, added a note and escalated to maintenance to clarify with the landlord. I sent no messages because there are no contact details on file.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The tenant's toilet issue is resolved and only the bedroom window remains. The tenant was acknowledged and the landlord asked for a contractor decision. The landlord's reply concerns a different property and a plumber, so approval for the window is still outstanding. No ticket existed, so JOB-101 was created (routine).

**2. What is the next action, who is it for, and through which channel?**

Email the landlord, Isaac Oakley, to correct the address and issue, cancel the mistaken plumber visit and ask approval to send a window contractor to Flat 24. Then update the tenant with the routine 14-day target. I couldn't send it myself because no contact details are available in my records, so it is routed via the maintenance escalation ESC-102.

**3. Does anything need a human decision, and why?**

Yes, a low-priority one (P3). A person needs to resolve the landlord's address/issue mismatch and get contractor approval, since I can't confirm the landlord's intent or reach them.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","category":"roof","severity":"routine","description":"Bedroom window not cl… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Landlord reply refers to wrong property and obsolete issue; no contact details on file to cl… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `add_note` | {"entity":"JOB-101","note":"Landlord reply (event 010) names Flat 18, 88 Alder Lane and a plumber: mismatch with Flat 24 window job. Not tre… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Escalations
- **P3 → maintenance** (verified): Landlord reply refers to wrong property and obsolete issue; no contact details on file to clarify via tools
  - Known: Tenant at Flat 24, 150 Copperfield Walk reported bedroom window not closing (event 001). Toilet issue was fixed by tenant's mother (event 006); only window needed. Landlord Isaac Oakley (event 010) says plumber will visit Flat 18, 88 Alder Lane, Willowbank tomorrow morning - different property, and a plumber is not relevant to a window. Landlord approval for window contractor not given. Job JOB-101 logged (routine).
  - Missing: Whether the landlord owns/has a separate issue at Flat 18, 88 Alder Lane; landlord's decision on contractor for Flat 24 window. No landlord/tenant contact details available in my tools' records.
  - Options: Email landlord to correct address/issue and ask approval to send agency glazier/carpenter to Flat 24; Cancel the plumber visit if sent in error
  - Recommendation: Contact landlord today, confirm the plumber is not needed for Flat 24, get approval for a window repair contractor, then book within the 14-day routine target and update tenant.

## Failed or unverified actions
_None._
