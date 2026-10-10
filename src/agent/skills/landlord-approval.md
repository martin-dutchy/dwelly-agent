---
id: landlord-approval
title: Landlord approval, spend limits and landlord replies
tags: [landlord_approval]
when_to_use: A job needs the landlord's decision or approval, a landlord has replied, a spend limit or standing instruction applies, or the landlord uses their own contractor.
red_flags:
  - A contractor was assigned or a quote approved without a recorded landlord decision, a spend limit that covers it, or an emergency.
  - An emoji, "ok", a paraphrase, or a tenant's or contractor's "the landlord said go ahead" was treated as approval.
  - A job was approved by the landlord but stopped because no contractor was named, instead of going to provider selection.
  - Our contractor was sent on a job where the landlord is using their own.
  - A reply that names a different property was treated as approval for this one.
---

## Procedure
1. Check the landlord's spend limit, preferred contractors and standing instructions (`get_property`, or the records in the case). Find the landlord's latest words on this job and record them with `record_landlord_decision`, quoting them exactly (put the date and channel in source). A paraphrase, "I assume", a 👍, "ok", "noted", or a tenant or provider saying the landlord told them to go ahead is not authority: record it as unclear and ask the landlord one yes-or-no question. Emergencies are the exception: make safe first and tell the landlord.
2. Standing instructions count. "Under £250 just send your contractor, no need to ask" is approval for jobs within that limit: record it as conditional with their words and `cap_gbp`, then proceed as for a clear yes. Do not ask again; tell them afterwards if they asked to be told. Anything likely to exceed the limit goes back to them first. "Up to £X" covers that figure and nothing above.
3. Read the reply:
   - Clear yes ("yes, send your contractor", "please approve this quote"): record approved with their words, then assign or approve, and tell the tenant what happens next.
   - Yes with a limit ("fine but nothing over £150 without asking"): record with `cap_gbp`. Anything above goes back to them.
   - "I'll send my own contractor": record own_contractor, tell the tenant, ask the landlord for the contractor's name and a date, and wait with a review date. Do not assign ours. Every tenant update says the landlord is arranging their own contractor. Before offering or sending ours on such a job, ask the landlord whether their contractor has attended or will attend, so the work is not done twice.
   - "It's the tenant's fault": do not tell the tenant no. Check who is responsible under the tenancy, reply to both, escalate if the repair is a legal duty.
   - A question (cost, warranty, progress): answer with facts you hold; ask the provider for what you lack. Never invent a price or a date.
   - "I'll pay the contractor directly": once completion is confirmed, close the job without payment; do not chase an invoice.
   - A complaint about delay or missing photos: acknowledge, chase the provider for evidence, say only what you have.
   - Names a different property: not approval. Ask which property they meant.
   - Raises another issue or property: log it separately and keep this job on track.
   - Asks for something unlawful or unsafe: refuse plainly, do the lawful routine work, escalate.
4. Approved, but no contractor named. Once approval is recorded (their reply, or a standing instruction or spend limit that covers the job), a missing contractor name is not a reason to stop or to ask anyone: sourcing one is the workflow's next stage. Assign a contractor the case names for this trade; if it names none, `resume_auto` the job, which sends it to provider selection. Tell the tenant a contractor is being arranged and will contact them to book, without a date. Cite the `resume_auto` entry as the provider-assignment step.
5. Asking for approval: send the tenant's report or the quote with `request_landlord_approval`, with the options (our contractor, their own, tenant fixes it, approve the quote) and your recommendation first, and the date you need the answer by. Tell the tenant what is pending, then hold with a review date.
6. Landlord silent: after 3 days with no answer, one chase on a second channel (SMS or phone) and a review date. Every chase says exactly what you need and by when. If the records disagree about what they approved, ask one clear question on a second channel, `add_note` the conflicting entries and which you treat as current, and hold with a review date.

## Required actions
- `record_landlord_decision`: the landlord's exact words and the decision.
- `request_landlord_approval`: the decision needed, the options, the amount and a deadline.
- `assign_contractor` or `resume_auto`: after approval, a named contractor or provider selection.
- `put_on_hold` or `schedule_follow_up`: while the landlord's answer is awaited.
- `send_message`: tell the tenant what is happening.

## Red flags
- A quote above the landlord's spend limit, or a "call me before anything over £X" note in the record.
- The landlord's reply names another address.
- A contractor was assigned in the history before any approval appears.
- Two entitled parties give conflicting instructions.
- The landlord's notes say emergencies are approved without asking.

## Escalate when
- The landlord has been silent beyond 3 days after a chase on a second channel and the repair is urgent: P2, maintenance.
- Two entitled parties give conflicting instructions and asking them has not settled it: P3, maintenance.
- The landlord refuses a repair that is a legal duty, or asks for something unlawful: P2, legal.
