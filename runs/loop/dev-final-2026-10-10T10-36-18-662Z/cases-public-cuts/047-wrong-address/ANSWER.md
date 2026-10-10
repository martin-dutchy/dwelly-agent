# Case 047-wrong-address: ANSWER

**Outcome:** action_taken · **Severity:** routine

Tenant's window repair was waiting on the landlord. The landlord replied about a plumber at a different address (Flat 18, 88 Alder Lane), although the tenant says the toilet is fixed. I logged a routine window ticket, asked the landlord to correct the address and confirm a contractor for the window, and updated the tenant.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Only the bedroom window is outstanding, as the toilet is fixed. No ticket existed, so JOB-101 was created. The landlord has not yet approved a contractor for the window, and his reply named the wrong property and the wrong job (a plumber).

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord (Isaac Oakley) to say the property is Flat 24, 150 Copperfield Walk, to cancel the plumber for this request, and to ask for contractor approval for the window. Email to the tenant with a 14-day routine target. Both are sent. Once the landlord confirms, assign a contractor and give the tenant 24h notice.

**3. Does anything need a human decision, and why?**

Not at this point. It is a routine repair and the landlord's contractor decision is already requested. A human should look only if the landlord's answer stays unclear or the Alder Lane mix-up looks like a records error.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","category":"other","severity":"routine","description":"Bedroom window not c… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","body":"Dear Isaac, thank you for your reply. The address you… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","body":"Hello, glad the toilet is sorted. We've logged the bedroom wi… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
