import type { Schema } from '@/../amplify/data/resource'
import { generateClient } from 'aws-amplify/api'

export const client = generateClient<Schema>({
  authMode: 'userPool',
})

export type Room = Schema['Room']['type']
