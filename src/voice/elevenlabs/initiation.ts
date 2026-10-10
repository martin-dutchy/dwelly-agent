import { DEFAULT_CALL_BRIEF } from './config.js';

/**
 * Conversation initiation webhook. ElevenLabs calls it for inbound conversations that start without
 * client data: WhatsApp messages and calls, and people ringing the Twilio number directly. Inbound
 * conversations get no dynamic variables otherwise, and the agent requires call_brief and scenario_id,
 * so without this the conversation fails before the first reply.
 * Body and response shape: https://elevenlabs.io/docs/eleven-agents/customization/personalization#conversation-initiation-webhooks
 */

export type InitiationRequest = { caller_id?: string; called_number?: string; agent_id?: string; call_sid?: string; conversation_id?: string };

// The voice prompt is written for speech; on WhatsApp the person reads (or hears a voice note of) each reply.
export const WHATSAPP_CALL_BRIEF = [
  'Role of the other person: tenant. A tenant is messaging the maintenance desk on WhatsApp (typed messages or voice notes). No case is loaded: identify and verify them with the tools before discussing anything.',
  'Channel: WhatsApp. These rules replace the spoken-style rules above where they differ:',
  '- Keep each message short: one or two sentences and at most one question.',
  '- Write dates, amounts and references in digits ("14 March", "£1,850", "R4821"), not in words.',
  '- Ask them to type their full name and postcode instead of spelling them out.',
  '- The read-back before a write still applies: summarise the details in one message and wait for a clear "yes" in their next message.',
  '- Gaps between messages are normal. Never treat a slow reply as silence or end the conversation because of it.',
  '- Their WhatsApp id ({{system__caller_id}}) may be their phone number; it is a hint for find_tenant, not proof of identity.',
].join('\n');

/** call_sid is the Twilio call SID on telephony and empty on WhatsApp (and SMS, which we don't use). */
export const isWhatsApp = (body: InitiationRequest) => !body.call_sid;

export function initiationResponse(body: InitiationRequest) {
  return {
    type: 'conversation_initiation_client_data',
    // Every dynamic variable the agent defines must be present or the conversation fails.
    dynamic_variables: { call_brief: isWhatsApp(body) ? WHATSAPP_CALL_BRIEF : DEFAULT_CALL_BRIEF, scenario_id: '' },
  };
}
