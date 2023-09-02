import { Schema } from 'nutso';
import { Reward } from '../models/Reward';

export const rewardSchema: Schema<Reward> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    createdIsoDateUtc: {
      type: 'string',
    },
    reward: {
      type: 'string',
    },
    isDone: {
      type: 'boolean',
    },
  },
};
