import { Schema } from 'nutso';
import { JournalEntry, JournalEntryEvent } from '../models/JournalEntry';

export const journalEntrySchema: Schema<JournalEntry> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    createdIsoDateUtc: {
      type: 'string',
    },
    situation: {
      type: 'string',
    },
    mood: {
      type: 'string',
    },
    automaticThoughts: {
      type: 'string',
    },
    supportiveEvidence: {
      type: 'string',
    },
    contradictoryEvidence: {
      type: 'string',
    },
    balancedThoughts: {
      type: 'string',
    },
  },
};

export const journalEntryEventSchema: Schema<JournalEntryEvent> = {
  type: 'object',
  properties: {
    journalEntryId: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    time: {
      type: 'string',
    },
    circleColor: {
      type: 'string',
    },
  },
};
