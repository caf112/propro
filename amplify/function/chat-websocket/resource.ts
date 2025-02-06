import { defineFunction } from '@aws-amplify/backend';

export const chatWebSocket = defineFunction({
    runtime: 20,
    name: 'chatWebSocket',
    entry: './handler.ts',
    timeoutSeconds: 300,
})