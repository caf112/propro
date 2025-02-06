import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource';
import { data } from './data/resource'
import { chatWebSocket } from './functions/chat-websocket/resource';

export const backend = defineBackend({
    auth,
    data,
    chatWebSocket
});