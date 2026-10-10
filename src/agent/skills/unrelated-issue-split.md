---
id: unrelated-issue-split
title: Several issues in one thread, and requests that are not repairs
tags: [unrelated_issue]
when_to_use: A message raises another fault, another property or a non-repair matter (parking, bins, direct debit, an alteration) on an existing job, or a closed job's thread gets a new problem.
red_flags:
  - A second issue, especially a leak or safety item, was lost inside the existing job's thread.
  - A message about another property was treated as part of this job.
  - A tenant's alteration or own appliance was handled as a repair without the landlord's consent.
  - The original job was dropped while handling the new issue.
---

## Procedure
1. One job per issue, each with its own severity. Open the new one with `create_ticket` and `related_ticket_ref` pointing at the original. Check `list_tickets` first so you do not duplicate an open job.
2. A hazard in the new issue (sparks, a smell, water near electrics, glass, smoke) raises severity: safety advice first, then an emergency job with the right trade assigned at once.
3. Keep the original job on track: answer its latest system line or message in the same run. Handling one does not settle the other.
4. Another property: not about this job. Do not act on it here; ask the sender which property they mean, and log it separately.
5. Non-repair requests: route them to whoever handles them (the council for bins, block management for parking or communal areas, accounts for direct debits), tell the sender where it has gone, and `add_note` it.
6. Alterations and the tenant's own appliances need landlord consent; they are not repairs. Put the tenant's terms to the landlord, ask who pays to disconnect and remove the existing item and fit the new one, and `add_note` that the tenant's item stays theirs, is not on the inventory, and what happens to the landlord's.
7. A duplicate report of an open job: link it, update the person, and stop. No new job; if a duplicate job was opened in error, `cancel_ticket` it with the reason.
8. Tell the sender, in one message, how each issue is being handled.

## Required actions
- `create_ticket`: one per new issue, with `related_ticket_ref`.
- `list_tickets`: check for an open job first.
- `send_message`: tell the sender how each issue is handled.
- `add_note`: routed non-repair requests and alteration terms.
- `request_landlord_approval`: an alteration or a new repair that needs approval.

## Red flags
- A leak, damp or a safety item mentioned in passing ("also the ceiling is dripping").
- "Other things are broken too" without detail: ask what, and log what they say.
- Communal parts that may be the freeholder's or block manager's responsibility.
- A message thread on a closed job with a new fault.

## Escalate when
- The new issue is an emergency: follow the safety playbook and escalate P1.
- Responsibility for a communal or shared item cannot be settled by asking the block manager: P3, maintenance.
