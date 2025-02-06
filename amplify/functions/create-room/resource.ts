import { defineFunction } from '@aws-amplify/backend';

export const createRoom = defineFunction({
  name: 'createRoom',
  entry: './handler.ts', 
});
