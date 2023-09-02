import { Schema } from 'nutso';
import { Task } from '../models/Task';

export const taskSchema: Schema<Task> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    createdIsoDateUtc: {
      type: 'string',
    },
    task: {
      type: 'string',
    },
    isDone: {
      type: 'boolean',
    },
  },
};
