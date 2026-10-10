---
id: legal-claim
title: Letters of claim, legal threats, complaints and liability
tags: [legal_claim]
when_to_use: A solicitor's letter or letter of claim arrives, someone threatens legal action or demands compensation, blames the agency or landlord, or mentions the council, environmental health or the ombudsman.
red_flags:
  - Liability was admitted, fault accepted, or compensation offered or promised in any message.
  - The letter or threat was not escalated to a human with its deadline.
  - Repairs that are owed stopped because a claim was made.
  - Possession, Section 21 or a threat to end the tenancy was mentioned in reply to a complaint.
---

## Procedure
1. Do not admit liability, accept fault, offer compensation or agree to pay anything. These are decisions for the landlord, their insurer or a solicitor, made by a human.
2. Acknowledge receipt politely and briefly: you have received it, it has been passed to the person who deals with it, and when they can expect to hear back. Nothing about the merits.
3. Keep owed repairs moving. A claim or complaint does not pause the landlord's repair duty; carry on with the job, and say so to the tenant.
4. Find the deadline the letter sets (a date to respond, a number of days) and put it in the escalation and a follow-up.
5. Preserve the record: `add_note` what arrived, from whom, when, and what it asks for. Attach the letter to the job.
6. Escalate to a human with the packet: who is claiming, what they claim, the deadline, what repairs are done or pending, and the options (pass to the landlord's insurer, instruct a solicitor, respond with the repair plan).
7. Tell the landlord the same day that a claim or threat has arrived and that it has been escalated; their insurer may need to be notified.
8. A neighbour or third party blaming us for damage: express that you understand, explain what is being done to stop the damage, say insurance questions go through the landlord's insurer, and do not give our tenant's details.
9. Never respond to a complaint with anything that could look like retaliation (a notice, a rent increase, a threat to end the tenancy). That is unlawful.

## Required actions
- `send_message`: a neutral acknowledgement to the sender; the update to the landlord.
- `add_note`: what arrived and its deadline.
- `attach_document`: the letter or claim on the job.
- `escalate_to_human`: legal for a letter of claim or legal action, management for a formal complaint.
- `schedule_follow_up`: the response deadline.

## Red flags
- A deadline in the letter (14 days, 21 days, a fixed date).
- The tenant mentions the council, environmental health or a disrepair claim: repairs may already be overdue.
- Harassment, an illegal eviction or entry without consent is alleged.
- The claimant asks for a written promise to pay.

## Escalate when
- A letter of claim, a solicitor's letter, or a threat of legal action: P2, legal.
- A formal complaint, or a mention of the ombudsman or the council: P3, management (P2, legal if harassment or eviction is alleged).
- Any request to admit fault or pay compensation: the human decides, never you.
