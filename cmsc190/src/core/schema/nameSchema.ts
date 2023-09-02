import { Schema } from 'nutso';

export const nameSchema: Schema<string> = {
  type: 'string',
  minLength: 4,
};
