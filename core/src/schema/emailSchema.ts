import { Schema } from 'nutso';

export const emailSchema: Schema<string> = {
  type: 'string',
  minLength: 1,
  pattern: /\S+@\S+\.\S+/,
};
