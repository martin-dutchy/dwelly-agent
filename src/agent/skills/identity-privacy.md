---
id: identity-privacy
title: Identity checks, mismatched records and personal data
tags: [identity_privacy]
when_to_use: An identity check failed or is needed, records disagree about a name, address, company or phone number, or someone asks for a tenant's or landlord's details.
red_flags:
  - Personal details (a phone number, an address, whether someone lives there, arrears) were given to someone not entitled to them.
  - A failed identity check was allowed to delay safety advice or an emergency response.
  - A known party already on the case was asked to prove their identity again.
  - A record mismatch was ignored, or silently "corrected" without a note.
  - A message names a different property or a person from another record.
---

## Procedure
1. Separate safety from identity. If the person describes a danger, give the safety advice and start the emergency response first; identity is resolved afterwards.
2. Parties already on the case history (the tenant who raised it, the property's landlord, the assigned contractor) are identified by the case itself: reply to them on the same thread by role. Do not ask them for identity details.
3. A failed check is often a record problem, not an impostor: the check may have been run against the wrong record, or a date or name was misheard. Compare what the caller said with the record that matches their name and property, and say which record you treat as correct and why. Never read record details out to the caller: ask them to provide them.
4. Until identity is settled, disclose nothing personal about the tenancy (rent, arrears, deposit, contact details, who lives there) to an unverified caller.
5. Third parties (neighbours, relatives, partners, the council, a contractor not on this job) get nothing personal without the person's consent or another lawful basis. Take their message, tell them it will be passed on, and pass it on yourself.
6. A contractor we instructed for this job may receive the tenant's contact details on file, exactly as written, with any calling instructions. Outside an emergency, record the tenant's agreement with `share_tenant_contact` first; if the case has no such words, ask the tenant for consent and their preferred number and times. Never give the landlord's details to the tenant, or anyone's details to a party with no role in the job.
7. Names and companies in call or email summaries often differ from the record. A call about this job between a provider and this property's tenant is the assigned provider and the tenant: note the mismatch in conflicts and carry on. Ask about it only if the address, job or trade differs too.
8. A message naming a different property is not about this job: do not act on it as an instruction or approval; ask the sender which property they meant.
9. When the case itself establishes who someone is (matching details, an authorised-contact entry), record it with `verify_identity`, quoting those words, before acting on their request.
10. `add_note` every record conflict you find and which entry you treat as current, so it can be cleaned up.

## Required actions
- `verify_identity`: who someone is, quoting the case words that establish it.
- `share_tenant_contact`: the tenant's consent, quoted, before their number goes to a provider outside an emergency.
- `add_note`: the record conflict and the entry you treat as current.
- `request_information`: one question to the sender when an address or identity mismatch blocks the right action.
- `send_message`: replies by role on the existing thread; messages to third parties that disclose nothing personal.
- `escalate_to_human`: an identity mismatch that one question cannot settle.

## Red flags
- An identity check run against a different tenant id, name or property than the caller's.
- An internal record in the inputs marked not to be disclosed.
- A caller who is not the tenant asking for the tenant's number, address or whereabouts.
- A possible domestic abuse situation: never disclose a victim's whereabouts or contact details.
- A request from the police or the council: a human handles it, on a written request.

## Escalate when
- An address or identity mismatch that one question to the sender cannot settle: P3, maintenance.
- A failed check that blocks routine work and the records cannot be reconciled: P3, maintenance, with both records named.
- A subject access request, a data breach, or a police or council data request: P2, management.
