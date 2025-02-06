import { defineFunction } from '@aws-amplify/backend';

export const sendMessage = defineFunction({
  name: 'sendMessage',
  entry: './handler.ts', 
});
