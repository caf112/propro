# CI/CD（継続的インテグレーション / 継続的デリバリー）

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