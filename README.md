# PRO×PRO
ゲーム感覚でプログラミングを学ぼう！
回答をブラウザで表示できるよ。
## 機能
### Githubを登録して記録できる
ユーザー登録時にリポジトリを登録してプレイ後に記録できる。
### 一人モード
### 対戦モード
## 言語
- HTML
- CSS
- TypeScript

## ツール
- React
    - Vite
    - TypeScript
- Material-UI(MUI)
    - おすすめのUIライブラリ教えてください
- AWS
    - AWS Amplify Gen2
    - AWS Cognito
    - AWS DynamoDB
    - AWS AppSync
- VSCode
---
オニオンアーキテクチャ試しました。
※解釈があっているかわからないです
- domain
- usecase
- presentation
- infrastructure
- ui

## コマンド
### AWS
東京でサンドボックスを起動
- `AWS_REGION=ap-northeast-1 npx ampx sandbox`
オレゴンでサンドボックスを起動
- `npx ampx sandbox`



# 開発環境(コマンドはbashを使用)
## 1.プロジェクトを作成
### a.viteを使用してTypeScriptのReactアプリケーションを作成  
`npm create vite@latest propro-app -- --template react-ts`  
### b.作成したpropro-app配下で、パッケージをイントール  
`npm install`  
```
npm install react-router-dom
npm install --save-dev @types/react-router-dom
npm install @tanstack/react-query
```

`npm run dev`


## 2.amplifyのバックエンドフォルダ作成
### a.必要なパッケージをインストール  
```
npm add --save-dev @aws-amplify/backend@latest @aws-amplify/backend-cli@latest
npm add @aws-amplify/ui-react
```  
### b. `amplify`を作成し、`backend.ts`を作成
```
mkdir amplify
echo "import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource';

defineBackend({
    auth,
});
" > amplify/backend.ts
```
### c.`amplify/auth`フォルダを作成し、`resource.ts`を作成
```
mkdir amplify/auth
echo "import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
    loginWith: {
        email: true
    },
    userAttributes: {
        "custom:git_account": {
            dataType: "String",
            mutable: true,
        },
        "custom:git_repository": {
            dataType: "String",
            mutable: true,
        },
    },
});
" > amplify/auth/resource.ts
```
## 3.sandboxを起動
`AWS_REGION=ap-northeast-1 npx ampx sandbox`
