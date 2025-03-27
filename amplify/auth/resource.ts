import { defineAuth } from '@aws-amplify/backend'

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    'custom:git_account': {
      dataType: 'String',
      mutable: true,
    },
    'custom:git_repository': {
      dataType: 'String',
      mutable: true,
    },
    'custom:git_token': {
      dataType: 'String',
      mutable: true,
    },
  },
})
