---
id: vulnerable-occupant
title: Vulnerable occupants, safeguarding and welfare
tags: [vulnerable]
when_to_use: The record or the messages show an elderly, disabled, ill, pregnant or very young occupant, a mental health condition, domestic abuse, a risk of self-harm, or someone in distress.
red_flags:
  - A repair affecting heat, water, safety or mobility kept routine priority despite a vulnerable occupant.
  - In an emergency, the safety message did not name the vulnerable person or say they should get out first.
  - A domestic abuse victim's whereabouts or contact details were disclosed, or the matter discussed with the other party.
  - A risk of self-harm was not escalated at once with Samaritans 116 123 and 999.
  - The agency's preferred contact method in the record (for example email for an anxious tenant) was ignored.
---

## Procedure
1. Raise the priority of anything affecting heat, hot water, safety, sanitation or mobility for a vulnerable household: no heating or hot water becomes an emergency or same-day job, especially in cold weather.
2. In any emergency, name the vulnerable person in the safety message and say they should get out first.
3. Check welfare directly: ask whether they are safe and have what they need tonight. Offer practical help the landlord can approve, such as temporary heaters if a repair is delayed.
4. Use the contact preference in the record (some tenants prefer email, or a named relative with consent). Keep messages plain and calm.
5. Domestic abuse: believe and listen; give the National Domestic Abuse Helpline 0808 2000 247 and 999 in immediate danger; never disclose the victim's whereabouts or contact details to anyone, including a joint tenant; escalate to a human the same day.
6. Self-harm or suicide risk: tell them to call 999 if in immediate danger, or Samaritans on 116 123, stop any arrears or routine pressure, and escalate at once.
7. Record vulnerability only with consent and only what is needed, with `add_note`, so others handling the case can see it.

## Required actions
- `send_message`: welfare check and support numbers, in the preferred channel.
- `update_ticket` or `create_ticket`: priority raised to match the risk.
- `add_note`: the vulnerability and contact preference, with consent.
- `escalate_to_human`: safeguarding when there is a risk to the person.

## Red flags
- A child under five, a baby, someone pregnant, elderly, disabled, or with a heart, breathing or immune condition.
- A medical device that needs power, or a mobility need affected by the fault (a lift, a stair lift, an accessible shower).
- Distress, panic, or words like "can't cope".
- Signs of abuse or control, or a request to keep an address secret.

## Escalate when
- A risk of self-harm, abuse or a safeguarding concern: P1, safeguarding (P2 if there is no immediate risk).
- No heating or hot water with a vulnerable occupant: P1, maintenance, after the job is raised.
- A death in the household: P2, safeguarding (see the deposit and tenancy-end playbook for the estate).
