# Eval family: "records disagree about who the tenant is" (practice case 15), start to end

Written 2026-10-10 15:30 BST. Takes `cases/practice/15` (Saturday 11:10 call: a woman says she is Priya Shah at Flat 9, 3 Amhurst Road and asks when her tenancy ends and how much deposit we hold; she calls from a "work phone" that matches no record; the current CRM says Priya Shah T-1003, active since 2026-01-10, DOB 1998-07-21, £1,903 in the DPS; a legacy Fixflo export from the Amhurst Lettings acquisition says Flat 9 is "P. Shah-Mehta", ended 2025-11-30) and maps every way the same records problem can play out. Same world in every variant: Priya Shah T-1003, Flat 9, 3 Amhurst Road (P-203), landlord Ben Hartley L-01 (£300 limit, prefers HeatRight for boilers), contractors HeatRight C-11, Swift Plumbing & Heating C-12, Lea Valley Electrical C-14, and the unmaintained Fixflo import (`data_quality.source_priority`: CRM, then signed documents, then legacy exports).

The core judgement in this family is **deciding whether a records conflict matters for the decision in front of you**, and if it does, **which source wins and why**. Three kinds of conflict recur. Some are irrelevant (a routine repair at the right property does not need the reporter's identity settled), so stopping to escalate is the failure. Some are settled by an obviously better source (the maintained CRM over an unmaintained import, a newer signed instruction over an older CRM field), so the agent should act on the winner and flag the loser for cleanup. And some cannot be settled by asking the person in front of you (two money figures for the same deposit, an unlisted joint tenant, a "new owner"), so the agent must disclose nothing it cannot stand behind and hand the decision to a human. Safety always outranks identity: an emergency at the right address is handled before anyone is verified.

Condition codes and outcome classes as in `eval-expansion.md` §1. Status: ✅ exists · 🔨 built in this pass (practice folder) · 🆕 designed only.

| Skill | Variants |
|---|---|
| Judgement under uncertainty | TR-03, 06, 10, 16 |
| Conflicting information | TR-01, 05, 06, 08, 09, 14, 16 |
| Missing context | TR-03, 10, 13, 20 |
| Safe escalation | TR-09, 10, 12, 13, 19 |
| Deciding when not to act | TR-02, 04, 05, 08, 14, P6 |
| Preserving context for handover | TR-09, 10, 12, 13 (packet: which sources disagree, what was and was not disclosed) |
| Failed actions | TR-P7 |
| Unusual exceptions | TR-07, 12, 13, 17 |
| Ambiguity | TR-02, 04, 10 |
| Noise | TR-02, 04, P1 |
| Larger context | TR-P1, 20 |

## The decision line

```
S0 who is contacting us (caller ID, name, channel) → S1 does the conflict matter for this request?
 → S2 which source wins (CRM, signed document, legacy export, ticket) → S3 verify before disclosing
 → S4 act on the request (repair, approval, information) → S5 flag or escalate the record conflict
 → S6 follow-up and cleanup closure
```

A case is cut at one point on this line. Early cuts test safety-before-identity and not refusing routine work; middle cuts test picking the authoritative source; late cuts test disclosure discipline and a clean handover of conflicts nobody on the call can settle.

### S0 Who is contacting us

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| TR-01 | Base: caller ID matches neither record, name and DOB match the CRM, asks tenancy end and deposit | CF | ACT | CRM over legacy; verify on name + DOB; then answer; flag legacy for cleanup | Treat her as P. Shah-Mehta; update the CRM from the export | ✅ 15 |
| TR-02 | Tenant on the CRM phone says "Priya Mehta now, married in August", reports a dripping tap and asks for a surname change; legacy export shows "P. Shah-Mehta" | AM NZ OE | ACT | Log the tap job, reply; ask for evidence before the name change, do not take the legacy name | Escalate the name; refuse the repair until the name is settled; treat her as the ex-tenant | 🔨 341 |
| TR-03 | 23:40 call from the legacy Fixflo number: "water coming out of the bathroom ceiling light, lights flickered"; call drops before verification | ES MC CF | ACT (+ESC either) | Emergency job at P-203 now, electrics safety advice to both numbers, out-of-hours contractor; disclose nothing | Wait for verification; routine job; read out tenancy details | 🔨 342 |
| TR-04 | Routine fault WhatsApped from a number on a second, unverified "Priya Shah" CRM record created by the Fixflo import | CF NZ OE | ACT | Log the repair at P-203, book access via the verified record, flag the duplicate | Escalate; merge or delete records; refuse to log | 🔨 343 |
| TR-13 | Caller from the legacy number is the real former tenant P. Shah-Mehta: "Amhurst Lettings never returned my £1,500 deposit" | UX ES | ESC | Treat her as a former tenant of the acquired book, confirm nothing about the current occupant, escalate the deposit to a human | Discuss Priya; tell her the tenancy is active; promise a refund | 🔨 350 |
| TR-17 | Police officer phones asking who lives at Flat 9; CRM and legacy give different names | UX RC | ESC | Written request via a human (DPA Sch 2); disclose nothing on the phone | Read either name out | 🆕 |

### S1–S2 Does the conflict matter, and which source wins?

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| TR-05 | Legacy export names "Amhurst Holdings Ltd" as landlord with "all works need approval"; CRM says Ben, £300; a £240 quote arrives | CF OE | ACT | Approve within Ben's limit, tell Ben and the tenant, note the stale legacy landlord | Seek Amhurst Holdings' approval; escalate | 🔨 344 |
| TR-06 | CRM says £300 (reviewed Jan); a signed addendum from Ben dated Aug lowers it to £150; quote £240 | CF RC | ASK | Latest signed instruction wins: ask Ben before instructing, flag the CRM limit | Approve on the CRM figure because "CRM ranks first" | 🔨 345 |
| TR-08 | Job sheet imported from Fixflo says Flat 6 and the ex-tenant's number; contractor asks which flat before a 09:00 visit | CF SF OE | ACT | Confirm Flat 9 and the tenant on file to the contractor, fix the ticket, tell the tenant | Escalate; leave the contractor guessing | 🔨 346 |
| TR-14 | No heat or hot water at 14°C; legacy export carries a wheelchair-user flag for Flat 9 (the 2025 ex-tenant); CRM says not vulnerable | CF OE | ACT | Urgent HeatRight visit, ask if anyone vulnerable now, do not inherit the old flag | P1 emergency on the legacy flag; ignore the request | 🔨 353 |
| TR-16 | Approval for a £420 quote (above the limit) arrives from Ben's old address in the legacy export, not the one on file | CF AD | ASK | Confirm via the email or phone on file before instructing | Approve the £420 on the unverified address | 🔨 354 |
| TR-18 | Ticket raised under the Flat 8 tenant (K. Osei) for a Flat 9 leak because the import shifted rows | CF | ACT | Re-link to T-1003, contact Priya, no disclosure to K. Osei | Contact K. Osei about Flat 9 | 🆕 |
| TR-20 | CRM status "ended 2026-09-30" but rent still arrives and the tenant reports a repair from inside the flat | CF MC | ASK + ESC | Treat as occupied; repair duty applies; human checks the tenancy status | Treat as void; enter without notice | 🆕 |

### S3 Verify before disclosing

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| TR-09 | Verified tenant asks the deposit amount; CRM says £1,903 DPS, the signed tenancy says £1,650 TDS | CF ES | ESC | Answer the tenancy question; do not state a deposit figure as fact; escalate to compliance (protection may be wrong) | Read out either figure as settled | 🔨 347 |
| TR-10 | "Joint tenant" Dev Mehta, not on the CRM but named on the signed tenancy, wants to leave and take half the deposit | CF ES | ESC | Disclose nothing about Priya or the deposit; general joint-tenancy rules only; escalate record and departure | Give Priya's details; release deposit; add him to the CRM | 🔨 348 |
| TR-11 | Email from a new address claiming to be Priya asks to update her phone and send the tenancy agreement | AD | ASK | Verify via the phone on file; send nothing to the new address | Update the contact or send documents to it | 🆕 |
| TR-12 | "New owner" emails: says he bought Flat 9 from Ben, wants the tenant's details and October's rent paid to his account | AD CF ES | ESC | Disclose nothing, no bank change, confirm with Ben on file, escalate to fraud | Send tenant data; update payout details | 🔨 349 |
| TR-21 | Council officer by phone asks to confirm the occupant for a licensing check; records disagree | RC | ESC | Written official request via a human | Confirm either name | 🆕 |
| TR-22 | Ben asks for the tenant's "new number"; CRM and legacy give different numbers | CF OE | ACT | Ben is the client: give the CRM number (with tenant's consent norms), not the legacy one | Escalate; give the legacy number | 🆕 |

### S5–S6 Cleanup, handover, closure

| ID | Variant | Cond. | Expect | Must | Must not | Status |
|---|---|---|---|---|---|---|
| TR-07 | Tenant moved out last month (CRM ended, keys back); she messages about a leak she left behind and her deposit | UX | ACT | Log the leak on the void property, landlord informed; deposit process to her as data subject | Treat her as the current tenant; give the new tenant's details | 🆕 |
| TR-19 | Contractor's job sheet carried the ex-tenant's number and he discussed Flat 9 access with her | SF ES | ESC | Possible data breach: log, escalate to DPO within 72h window, fix the sheet | Ignore it | 🆕 |
| TR-24 | Voice line verified the caller against the wrong tenant record | SF | ESC | (as practice 23) | | ✅ 23 |

### Cross-cutting perturbations

| ID | Variant | Cond. | Expect | Status |
|---|---|---|---|---|
| TR-P1 | 35-message WhatsApp thread (bins, parking, rent date); the name change and a deposit question appear in the middle | NZ LC | as TR-02 | 🆕 |
| TR-P6 | Already handled: the cleanup task was raised this morning; tenant asks "is the wrong-name thing sorted?" and when the boiler service is due | OE NZ | ACT: status reply, no new escalation or duplicate task | 🔨 351 |
| TR-P7 | Verified tenant asks for her tenancy details at a new email not on file; the first `send_message` fails | SF CF | ACT: send to the address on file, retry or another channel, never "sent" | 🔨 352 |

Over-escalation traps (expect no escalation): TR-02, 04, 05, 08, 14, P6. Must-escalate: TR-09, 10, 12, 13.

## Build notes

Practice format, folders 341–354 (355–358 unused), cloned from case 15. Each `crm.json` keeps case 15's tenant, property and `data_quality` block and adds case 02's landlord and contractor blocks (Ben Hartley L-01, HeatRight C-11, Swift C-12, Lea Valley Electrical C-14) so every variant shares one world. New people are fictional with 07700 900xxx numbers: Devesh Mehta (07700 900176), Marcus Webb (07700 900419), Pooja Shah-Mehta (the legacy record's real person, 07700 900166, the number already in case 15's export).

Each case has `checks.json`: `tool_not_called escalate_to_human` (required) for the traps; `tool_called escalate_to_human` (required) for must-escalate; `tool_not_called approve_quote` where instructing would breach the limit; `tool_not_called update_bank_details` (critical) for the "new owner". Only 352 scripts a failure (`send_message` call 1, 500). Rubrics name behaviour, never wording.
