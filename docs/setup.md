# 開発環境セットアップ手順

このドキュメントは、Docker を使用して本プロジェクトの開発環境を構築するための手順を記載しています。  
Amplify についての知識が浅く、エラーが出てしまうかもしれませんが、適宜対応していただき、このドキュメントに追記していただけるとありがたいです。  
`bash` を使用することを前提としています。

---

## 前提条件

以下のソフトウェアがインストールされている必要があります：

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [AWS Amplify CLI](https://docs.amplify.aws/cli/)
- Git
- bash（または類似のシェル環境）

---

## 環境構築手順

1. **リポジトリのクローン**

   ```bash
   git clone git@github.com:caf112/propro.git
   cd propro-vite
   ```

2. **Docker イメージのビルドと起動**

   ```bash
   docker-compose up --build
   ```

---

## VSCode の Remote Container を使用した開発（推奨）

VSCode で開発を行う場合、Remote - Containers 拡張機能を使うと、ホスト環境に依存しない統一された開発環境を使用できます。以下は一例です。

1. VSCode に Remote - Containers をインストール
2. プロジェクトルートに移動し、VSCode でこのディレクトリを開く
3. コマンドパレット（`Ctrl + Shift + P`）で  
   **`Remote-Containers: Open Folder in Container`** を選択し、ルートフォルダを指定
4. `.devcontainer/` フォルダや `docker-compose.yml` がある場合は、それらの設定に従ってコンテナがビルド・起動されます
5. `.devcontainer/` が存在しない場合は、VSCode のメニューから新規設定を作成してください  
   （参考：[Dev Containers の初期セットアップ](https://code.visualstudio.com/docs/devcontainers/containers)）

コンテナ内ではアプリケーションの依存関係が揃った状態になるため、以下のようなコマンドを直接実行できます：

```bash
npm install
npm run dev
```

---

## Amplify 関連（必要に応じて）

### Amplify プロジェクトの初期化（初回のみ）

```bash
amplify init
```

### sandbox の起動

```bash
npx ampx sandbox
```

#### リージョンを指定して sandbox を起動

```bash
AWS_REGION=<指定するリージョン名> npx ampx sandbox
```

### バックエンド情報のリセット

```bash
npm create amplify@latest
```

---

## CI/CD（継続的インテグレーション / 継続的デリバリー）

このプロジェクトでは、**AWS Amplify の Git 連携機能**を利用して、ブランチへの push をトリガーに自動でビルド・デプロイが実行されます。

### 基本フロー

1. **`test` ブランチに push**

   - プルリクエストや個人開発など、まずは `test` ブランチで動作確認を行います。
   - Amplify が `test` ブランチの変更を検知し、自動でデプロイを開始します。

2. **Amplify 上のテスト用アプリで動作確認**

   - デプロイ完了後、表示される URL でアプリの挙動を確認してください。
   - バグがないこと、必要な機能が動作していることをチェックします。

3. **問題がなければ `main` ブランチへマージ / push**

   - `main` ブランチも Amplify によって自動デプロイされ、本番環境へ反映されます。
   - 意図しない変更が含まれていないか、必ず確認した上でマージしてください。

### 注意事項

- `.amplify` や `amplify/` ディレクトリ配下の設定ファイルを変更した場合、意図せず Amplify 環境へ影響する可能性があります。Git 差分をよく確認してください。

---

## Lint・コード整形について

このプロジェクトでは、ESLint と Prettier を用いてコードの品質と整形ルールを保っています。

### 使用コマンド

- **Lint（構文チェック・ルールチェック）**

  ```bash
  npm run lint
  ```

- **整形（Prettier によるコード自動整形）**

  ```bash
  npm run format
  ```

### 補足

- Lint で警告が出たら修正してください（コミット前のチェック推奨）。
- Prettier による自動整形は、コミット前または保存時に実行するのがおすすめです。
- VSCode などのエディタでは、`formatOnSave` を有効にすると保存時に自動整形されます。
