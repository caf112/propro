# フロントエンド規約(React/TypeScript)

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
