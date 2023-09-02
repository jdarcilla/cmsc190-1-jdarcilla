import { Schema } from 'nutso';

export const passwordSchema: Schema<string> = {
  type: 'string',
  minLength: 6,
};
