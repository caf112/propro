import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  Stage: a.model({
    title: a.string(),
    description: a.string(),
    code: a.hasOne('Code', 'codeId'),
    blanks: a.hasMany('Blanks', 'blankId'),
    score: a.hasMany('Score', 'scoreId')
    // userResponses: a.hasMany('UserResponses', 'userResponsesId'),
    }),
    Code: a.model({
      codeId: a.id(),
      stage: a.belongsTo('Stage', 'codeId'),
      html: a.string().array(),
      css: a.string().array(),
      js: a.string().array(),
    }),
    Blanks: a.model({
      blankId: a.id(),
      stage: a.belongsTo('Stage', 'blankId'),
      blankKey: a.string(),
      placeholder: a.string(),
      answer: a.string(),
      choices: a.string().array(),
    }),
    // UserResponses: a.model({
    //   userResponsesId: a.id(),
    //   stage: a.belongsTo('Stage', 'userResponsesId'),
    //   score: a.integer(),
    //   blankKey: a.string(),
    //   responses: a.string().array(),
    // }),
    Score: a.model({
      scoreId: a.id(),
      stage: a.belongsTo('Stage', 'scoreId'),
      attempt: a.integer(),
      score: a.integer(),
    })
}).authorization(allow => [allow.owner(),allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

// データリソースの定義
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', // APIキーをデフォルト認証方式として設定
    apiKeyAuthorizationMode: { expiresInDays: 30 }, // APIキーの有効期限を30日として設定
  },
  name: "ProproApi" // AppSync名を設定
});