import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

const GITHUB_TOKEN = "token"; 

// HTMLファイルをGitHubに新規追加
const createGitHubHtmlFile = async (fileName: string, content: string, owner: string, repo: string) => {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${fileName}`;

  // Base64エンコード（GitHub APIはBase64形式で受け取る）
  const base64Content = btoa(unescape(encodeURIComponent(content)));

  // GitHubにファイルを作成（PUTリクエスト）
  const result = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Create ${fileName}`,
      content: base64Content,
    }),
  });

  if (!result.ok) {
    throw new Error(`GitHub API Error: ${result.statusText}`);
  }

  return result.json();
};

// React Hook
export const useGitHubFileCreation = () => {
  const { data } = useAuth(); // ✅ ここでフックを呼ぶ

  const GITHUB_OWNER = data?.["custom:git_account"] || "your-username"; // GitHubユーザー名
  const GITHUB_REPO = data?.["custom:git_repository"] || "your-repo"; // リポジトリ名

  const createFileMutation = useMutation({
    mutationFn: async ({ fileName, code }: { fileName: string; code: string }) => {
      return createGitHubHtmlFile(fileName, code, GITHUB_OWNER, GITHUB_REPO);
    },
  });

  return {
    createFile: createFileMutation.mutate,
    // isCreating: createFileMutation.data.isLoading, 
    error: createFileMutation.error,
  };
};
