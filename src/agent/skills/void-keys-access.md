---
id: void-keys-access
title: Access, entry notice, keys, lockouts and empty properties
tags: [void_keys, access_entry]
when_to_use: Someone needs to get in (a contractor, the landlord, an inspection), a tenant refuses or cannot give access, keys or a key safe are involved, a tenant is locked out, or the property is empty (NOT TENANTED).
red_flags:
  - Entry was arranged without 24 hours' written notice and the tenant's agreement, outside a genuine emergency.
  - The landlord was let in, or a contractor given keys, against the tenant's wishes.
  - A key-safe code or keys were released to someone not verified or not booked for the job.
  - A tenant message was sent for an empty property.
  - Keys lent for a job were not confirmed back before closing.
---

## Procedure
1. Entry for an inspection or repair needs at least 24 hours' written notice at a reasonable time, and the tenant can refuse non-emergency access. Holding keys gives no right to use them. Only a genuine emergency (gas, fire, flooding, a risk to life or serious damage) justifies entry without notice, and then only after trying to reach the tenant.
2. The landlord asks to let someone in without the tenant's agreement: refuse plainly, offer the lawful route and start it: a dated written notice to the tenant of the proposed visit, at least 24 hours ahead, and keep trying the tenant.
3. A tenant refuses access: offer other slots, record each attempt. After three refusals, document them and escalate. Never force entry. For a gas safety check, record every written attempt (at least three).
4. Lockouts: first ask whether they are safe. Lost or misplaced keys are usually the tenant's cost (office keys during opening hours; a locksmith out of hours at their cost). A broken lock or failed entry system is the landlord's repair. If a fault was reported before, the lock may be the landlord's responsibility; if the cause is unclear, the locksmith's findings decide who pays. Say this before anyone is sent.
5. Keys and codes: release them only to the verified tenant or to a contractor booked for the job, and log the release. After a contractor job, `confirm_keys_returned` before closing.
6. Empty property (NOT TENANTED): check the tenancy status and where the keys are kept with `get_property`. There is no tenant to message. Arrange access through the keys, a caretaker or a key holder, set the visit with that access, and tell the landlord.
7. Book the visit only with a date the party doing the visit confirmed, and say how they get in.

## Required actions
- `send_message`: the written notice of entry, or the options given to a locked-out tenant.
- `set_visit`: with the access route (tenant_home, agency_key, caretaker, lockbox or landlord).
- `log_call`: each access attempt.
- `confirm_keys_returned`: before closing a job that used keys.
- `escalate_to_human`: repeated refusals or an unlawful entry request.

## Red flags
- The occupant is locked out at night, in the cold, or is vulnerable.
- The lock was reported as faulty before the lockout.
- A caller who is not the tenant asks for a key-safe code.
- A landlord instruction to enter, change locks or remove belongings.
- A job on an empty property addressed to "the tenant".

## Escalate when
- Three access refusals, or a landlord insisting on entry without notice: P2, legal.
- A tenant locked out at night who is vulnerable and cannot be helped tonight: P1, maintenance.
- Signs of abandonment or unknown occupants: P2, legal (never change locks or enter on assumption).
