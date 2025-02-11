import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  // Stage: a.model({
  //   id: a.id().required(),
  //   stageNumber: a.integer().required(),
  //   title: a.string(),
  //   description: a.string(),
  //   }).identifier(['stageNumber']),

    //マルチ
    Room: a.model({
      id: a.id().required(),
      password: a.string(),
      isRecruiting: a.boolean().required(),
      stageSelected: a.boolean(),
      finishedEdit: a.boolean(),
      members: a.ref('Member').array(),
      messages: a.ref('Message').array(),
      member_count: a.integer(),
      code: a.ref('Code'),
    }),
    Message: a.customType({
      id: a.id().required(),
      room_id: a.string().required(),
      message: a.string(),
      send_user: a.string(),
    }),
    Member: a.customType({
      id: a.id().required(),
      room_id: a.string().required(),
      username: a.string(),
      role: a.string(),
    }),
    Code: a.customType({
      id: a.id().required(),
      room_id: a.string().required(),
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