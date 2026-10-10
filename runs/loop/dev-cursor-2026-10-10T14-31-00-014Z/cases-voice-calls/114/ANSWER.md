# Case 114: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Window repair stalled since 1 March. Landlord's only reply named another property, so no approval exists; contractor heard only by hearsay that landlord's own contractor is on it. Asked landlord, told contractor to stand down until confirmed, updated tenant, held to 12 Apr.

## Where the case stands
Stage visit, on hold (Waiting for Landlord, review 12 Apr). No valid landlord approval for this flat; contractor's 11 Apr offer is tentative.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord which property they meant, and whether own contractor is attending Flat 24 or ours may go ahead | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit confirmed, checking with landlord, update by 12 Apr | Eliza Jenkins, tenant | email | A3 ✅ |
| 3 | CHASE_PROVIDER | Tell contractor not to attend 11 Apr until landlord confirms | Oscar Turner, contractor | email | A2 ✅ |
| 4 | WAIT | Hold awaiting landlord, review 12 Apr | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your email of 22 Feb named Flat 18, 88 Alder Lane, so we haven't treated it as covering the bedroom window at Flat 24, 150 Copperfield Walk. Is your own window contractor attending or has attended Flat 24, or may we send our contractor Oscar Turner? Please reply by 12 April.
> 
> Options: Yes, send our contractor Oscar Turner to Flat 24 (he has offered Thursday 11 April, all day, not yet confirmed with you); I'm using my own contractor for Flat 24: please give us their name and visit date; Neither: tenant or other arrangement
> 
> Update: Window in bedroom of Flat 24 won't close properly (reported 21 Feb). Our contractor was assigned 1 March but never booked; he says a neighbour told him your own contractor is doing it, unconfirmed by you. Toilet issue was fixed by tenant. We will not send anyone until you confirm, to avoid double work. We'll chase on 12 April.

**A2 · send_message → Oscar Turner (contractor) via email, existing thread (event 018 email)** (verified)

> Hi Oscar, thanks for speaking to us today. Please don't attend Flat 24, 150 Copperfield Walk on Thursday 11 April yet. We are checking with the landlord whether the job is still yours or their own contractor is doing it. Your Thursday availability is noted but not a confirmed booking. We'll contact you once the landlord replies, target 12 April.

**A3 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Eliza, sorry for the delay with your bedroom window. Our contractor hasn't been able to book in, and we're now checking with the landlord whether they're using their own contractor or we should go ahead with ours. No visit is confirmed yet, so nobody should be expected on 11 April. If anyone from the landlord has already been in touch about the window, please let us know. We'll update you by 12 April.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing confirms the landlord approved our contractor or has their own contractor
- 11 April visit is not booked
- No cost or cause established

## Remaining work
- Landlord reply needed by 12 Apr; then record decision and either set visit with Oscar or note own-contractor route
- If landlord silent on 12 Apr, chase on SMS/phone

## Missing or unavailable information
- Landlord decision for Flat 24
- Whether a landlord contractor attended

## Conflicts between sources
- Landlord email event 010 names Flat 18, 88 Alder Lane, not this property
- Contractor hearsay that landlord's own contractor is doing the job vs no landlord confirmation
- Contractor assigned without recorded landlord approval

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Contractor assigned but never booked; no valid landlord approval; landlord decision outstanding; 11 Apr offer unconfirmed.

**2. Next action, recipient, channel?**

Landlord asked by email (APR-101); contractor and tenant told by email; hold to 12 Apr.

**3. Does anything need a human decision?**

No; routine landlord question. Escalate only if landlord stays silent after a chase on a second channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-114","decision_needed":"Your email of 22 Feb named Flat 18, 88 Alder Lane, so we haven't treate… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Oscar Turner","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticket_ref":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-114","reason":"Waiting for Landlord","comment":"Landlord's 22 Feb email named a different property (Flat 18, 88 Alder Lan… | 1 | ✅ verified | Ticket NBL-114 read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-114","note":"Conflicts: landlord email event 010 refers to Flat 18, 88 Alder Lane (plumber, 23 Feb) - not this property, not … | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
