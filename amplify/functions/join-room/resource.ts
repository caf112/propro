import { defineFunction } from '@aws-amplify/backend';

export const joinRoom = defineFunction({
  name: 'joinRoom',
  entry: './handler.ts', 
});
