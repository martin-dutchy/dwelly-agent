// Completion checks: what must be true before a decision is accepted. Applied on submit by harness/apply.ts.
import type { CompletionCheck } from '../harness/contracts.js';
import { conflictsAcknowledged, escalationPacket, noProseOverclaim, reviewDatesValid, safetyAddressed } from './checks.js';

export const COMPLETION_CHECKS: CompletionCheck[] = [safetyAddressed, reviewDatesValid, escalationPacket, noProseOverclaim, conflictsAcknowledged];
