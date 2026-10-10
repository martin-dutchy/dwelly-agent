# Case 037-landlord-thumbs-up: ANSWER

**Outcome:** action_taken · **Severity:** urgent

Tenant reported a leaking shower cable. The landlord replied with only a thumbs-up to our question about who arranges the repair, which is ambiguous and gives no spend limit. I logged an urgent ticket, asked the landlord to confirm in words, and gave the tenant safety advice and a 72-hour target.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

No ticket existed, so JOB-101 is now open at init. Outstanding: clear landlord instruction on who arranges the repair plus a spend limit, tenant photos, and contractor assignment.

**2. What is the next action, who is it for, and through which channel?**

Done: email to the landlord (Freya) asking for explicit confirmation and a spend limit. Email to the tenant (Eliza) with safety advice and the 72-hour target. Next, once the landlord confirms, assign a contractor.

**3. Does anything need a human decision, and why?**

Not yet. The landlord's authority is needed, and I have asked for it. A thumbs-up is not a reliable approval of a contractor or spend, so I did not assign anyone. If there is no reply, a human should chase the landlord because the leak is a safety risk.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 14, 44 Lantern Quay, Alderwick, ZZ9 8ZZ","category":"plumbing","severity":"urgent","description":"Shower cable/hose to sho… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","body":"Hi Freya, thanks for your reply (👍). So we get this right, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","body":"Hi Eliza, a quick update on the shower. We've logged the repai… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
