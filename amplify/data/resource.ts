import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Stage: a.model({
    stageNumber: a.integer().required(),
    title: a.string(),
    description: a.string(),
    }).identifier(['stageNumber']),

    //マルチ
    Room: a.model({
      room_id: a.integer().required(),
      password: a.string(),
      messages: a.ref('Message').array(),
      members: a.ref('Member').array(),
      member_count: a.integer(),
      code: a.ref('Code'),
    }).identifier(['room_id']),
    Message: a.customType({
      room_id: a.integer().required(),
      message: a.string(),
      send_user: a.string(),
    }),
    Member: a.customType({
      room_id: a.integer().required(),
      username: a.string(),
    }),
    Code: a.customType({
      room_id: a.integer().required(),
      content: a.string().array(),
      lastModifiedBy: a.string(),
      codeJudge: a.boolean().array(),
    }),    
}).authorization(allow => [allow.publicApiKey(),allow.authenticated()]);

export type Schema = ClientSchema<typeof schema>;

// データリソースの定義
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', // APIキーをデフォルト認証方式として設定
    apiKeyAuthorizationMode: { expiresInDays: 30 }, // APIキーの有効期限を30日として設定
  },
  name: "ProproApi"
});