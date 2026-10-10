# Case 13: Gas certificate expiring, tenant not responding: ANSWER

**Decision:** action_taken · **Severity:** urgent

The gas safety certificate for 19 Victoria Park Road is valid until 16 October 2026, so the property is compliant today. The tenant has not replied to emails or SMS, so I sent a further SMS and email, emailed the landlord, opened JOB-101, set a 12 October review, and escalated to compliance (ESC-108) in case access cannot be arranged before expiry.

## Where the case stands
Ticket JOB-101 open, on hold for tenant until 2026-10-12. Gas safety certificate valid until 2026-10-16. Tenant Luca Bianchi has not replied to 3 contacts. No visit booked. Landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Sent SMS and email to tenant asking for a visit time this week, with 24h written notice promised | Luca Bianchi, tenant | sms | A4 ✅ |
| 2 | CHASE_LANDLORD | Emailed landlord with CP12 status, tenant non-response, and plan to book HeatRight; no spend over £300 without approval | Ben Hartley, landlord | email | A6 ✅ |
| 3 | WAIT | Review tenant reply and book HeatRight for a visit before 2026-10-16 if access is confirmed or 24h written notice can be given | internal | internal | A8 ✅ |
| 4 | ESCALATE_TO_HUMAN | Compliance team to decide on formal access notice and landlord approval if HeatRight price is above £300 | compliance team | internal | A9 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Luca Bianchi (tenant) via sms, +447700900130** (verified)

> Hi Luca, this is the lettings team about 19 Victoria Park Road. The yearly gas safety check is due before 16 October 2026. Please reply with a day and time this week that suits you, or call us. We can book it with at least 24 hours' written notice. If you can't be home, tell us and we'll find another way in. Gas emergencies: 0800 111 999.

**A5 · send_message → Luca Bianchi (tenant) via email, luca.bianchi@mailbox.example** (verified)

> Hi Luca,
> 
> The annual gas safety check (CP12) for 19 Victoria Park Road is due before 16 October 2026. We have emailed on 25 September and 2 October and texted on 2 October without a reply.
> 
> Please reply with a day and time this week that suits you. We will give you at least 24 hours' written notice of the visit. If you can't be home, tell us and we'll arrange another way in.
> 
> If you smell gas, leave the property and call the National Gas Emergency line on 0800 111 999.
> 
> Thank you,
> Lettings team

**A6 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben,
> 
> Quick update on 19 Victoria Park Road. The current gas safety certificate (CP12, Gas Safe engineer 550123) was issued on 17 October 2025 and runs out on 16 October 2026. So it is still valid today.
> 
> The tenant, Luca Bianchi, has not replied to our emails or texts about booking the yearly check. We have asked him again to reply with a time this week.
> 
> Our plan is to book HeatRight Ltd, your preferred gas contractor, as soon as he confirms access. Their charge for the check is not yet known; we will come back to you before anything over £300 including VAT, as you asked. If the tenant doesn't reply, we will tell you what options we have, including the possibility of a short access notice.
> 
> Thanks,
> Lettings team

## Escalation
- **P2 → compliance** (verified): Gas safety certificate (CP12) for 19 Victoria Park Road expires 2026-10-16. Tenant has not responded to 3 contacts. Access is not yet arranged.
  - Known: CP12 issued 2025-10-17 by Gas Safe 550123 (HeatRight Ltd), valid until 2026-10-16, so compliant today. Emails 2026-09-25 and 2026-10-02 and SMS 2026-10-02 to tenant Luca Bianchi (T-1030) unanswered. Landlord Ben Hartley informed by email 2026-10-10. Ticket JOB-101 on hold until 2026-10-12.
  - Missing: Tenant's access time. Landlord's view on the HeatRight charge (unknown, may exceed £300 limit). No phone call has been placed yet; only SMS and email are sent. Legacy note from old agency is not a current record.
  - Options: Phone the tenant (weekend/evening) to confirm a visit slot, then book HeatRight with 24h written notice; If no reply by 2026-10-12, serve a formal 24h written access notice for a visit before 2026-10-16; Ask landlord to approve HeatRight spend above £300 if their quote is higher
  - Recommendation: Keep trying the tenant through a phone call and written notice now. Book HeatRight for a visit before 2026-10-16 as soon as access is confirmed or 24h written notice can be given. Prepare landlord approval if the price is over £300.
  - Deadline: 2026-10-14

## What this does not establish
- The current CP12 (issued 2025-10-17, valid to 2026-10-16) shows the property is compliant today; this does not confirm the boiler is safe after 2026-10-16.
- Sending messages does not mean the tenant has agreed to access.
- No visit is booked and no contractor is assigned; the HeatRight price is unknown.
- Entry without 24h written notice or consent is not allowed.

## Remaining work
- Compliance team (ESC-108, by 2026-10-14): decide on formal access notice and landlord approval if needed.
- Agency: review tenant reply on 2026-10-12 (FUP-107) and book HeatRight visit before 2026-10-16.
- Agency: upload new CP12 once issued and send copy to tenant within 28 days.

## Missing or unavailable information
- Tenant's reply and access time
- HeatRight quote for the gas safety check
- Confirmation of tenant's current phone contact (no phone call placed in this run)

## Conflicts between sources
- Legacy note (2025-11-02, old agency) says 'gas cert renewed 2025, all good'. This agrees with compliance.json, so no real conflict. The current system record was preferred.
- The log_call for CALL-102 recorded a call that was never made; this was corrected with a note.

## Answers to the case questions
**1. 1. Is the property currently compliant for gas safety? Which record do you trust and why?**

Yes, for now. The CP12 issued 2025-10-17 by Gas Safe engineer 550123 expires 2026-10-16, and today is 2026-10-10. I trust compliance.json, the current system record with the signed CP12 file reference. The legacy note 'gas cert renewed 2025' agrees but is hearsay and was only used as support. Compliance lapses after 2026-10-16 unless a new CP12 is issued.

**2. 2. What steps do you take to get access lawfully before expiry?**

Opened JOB-101. Sent tenant an SMS and an email asking for a visit time this week, with 24h written notice and an alternative if he can't be home. Set a review for 2026-10-12. If there is no reply, a formal 24h written access notice is the next step, with the visit booked with HeatRight Ltd before 2026-10-16. Entry without notice or consent is not allowed. Escalated to compliance (ESC-108) for a decision on formal notice.

**3. 3. What do you tell the landlord?**

Emailed Ben Hartley: the CP12 is valid today and expires 2026-10-16; the tenant has not replied; HeatRight (his preferred contractor) will be booked once access is confirmed or notice is given; the price is not yet known and nothing over £300 including VAT will be committed without his approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230 (19 Victoria Park Road, London E9 7HD)","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `log_call` | {"party_name":"Luca Bianchi","party_role":"tenant","direction":"outbound","outcome":"failed","summary":"No call placed yet in this run; atte… | 1 | ✅ verified | CALL-102 found in the log_call log |
| A3 | `add_note` | {"entity":"JOB-101","note":"Correction: CALL-102 was logged in error as a failed outbound call to Luca Bianchi. No call was placed in this r… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"sms","contact":"+447700900130","body":"Hi Luca, this is the lettings t… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","body":"Hi Luca,\n\nTh… | 1 | ✅ verified | MSG-105 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben,\n\n… | 1 | ✅ verified | MSG-106 found in the send_message log |
| A7 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Tenant","comment":"Waiting for Luca Bianchi to reply with access time for gas safety check bef… | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"Luca Bianchi","purpose":"Check for tenant reply. If none, book HeatRight Ltd (Gas Saf… | 1 | ✅ verified | FUP-107 found in the schedule_follow_up log |
| A9 | `escalate_to_human` | {"priority":"P2","team":"compliance","reason":"Gas safety certificate (CP12) for 19 Victoria Park Road expires 2026-10-16. Tenant has not re… | 1 | ✅ verified | ESC-108 found in the escalate_to_human log |

## Failed or unverified actions
- A2: CALL-102 was logged as a failed outbound call to the tenant, but no call was made. Corrected with NOTE-103 (ledger A3). Treat CALL-102 as an erroneous entry.
