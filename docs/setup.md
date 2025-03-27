# 開発環境セットアップ手順

このドキュメントは、Docker を使用して本プロジェクトの開発環境を構築するための手順を記載しています。  
Amplify についての知識が浅く、エラーが出てしまうかもしれませんが、適宜対応していただき、このドキュメントに追記していただけるとありがたいです。  
`bash` を使用することを前提としています。

---

## 📚 関連ドキュメントへのリンク

- ▶️ [Amplify コマンド集](../aws/amplify.md)
- 🔄 [CI/CD（Amplify 連携）](../aws/cicd.md)
- 🎨 [コード整形・Lintルール](../coding/frontend.md)

---

## 🔧 前提条件

以下のソフトウェアがインストールされている必要があります：

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
- [AWS Amplify CLI](https://docs.amplify.aws/cli/)
- Git
- bash（または類似のシェル環境）

---

## 🧪 環境構築手順

### 1. リポジトリのクローン

```bash
git clone git@github.com:caf112/propro.git
cd propro-vite
```

### 2. Docker イメージのビルドと起動
VSCodeで開発している方は、下の[💻 VSCode Remote Container を使用した開発（推奨）](#-vscode-remote-container-を使用した開発推奨) が推奨です。

```bash
docker-compose up --build
```

---

## 💻 VSCode Remote Container を使用した開発（推奨）

VSCode で開発を行う場合、Remote - Containers 拡張機能を使うと、ホスト環境に依存しない統一された開発環境を使用できます。

1. VSCode に Remote - Containers をインストール
2. プロジェクトルートに移動し、VSCode でこのディレクトリを開く
3. コマンドパレット（`Ctrl + Shift + P`）で  
   **`Remote-Containers: Open Folder in Container`** を選択し、ルートフォルダを指定
4. `.devcontainer/` フォルダや `docker-compose.yml` がある場合は、それらの設定に従ってコンテナがビルド・起動されます
5. `.devcontainer/` が存在しない場合は、VSCode のメニューから新規設定を作成してください  
   （参考：[Dev Containers の初期セットアップ](https://code.visualstudio.com/docs/devcontainers/containers)）

### コンテナ内で使用できるコマンド例

```bash
npm install
npm run dev
```
