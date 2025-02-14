import { useNavigate } from "react-router-dom";
import { buttonStyle } from "@/components/ui/button/hoverButton";
import { useSignOut, useAuth } from "@/hooks/useAuth";
import { paths } from "@/config/paths";


const ProfileRoute = () => {
  const { data } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = useSignOut();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const gitAccount = data?.["custom:git_account"];
  const gitRepository = data?.["custom:git_repository"];
  const gitRepoUrl = gitAccount && gitRepository ? `https://github.com/${gitAccount}/${gitRepository}` : "";

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2>マイページ</h2>
      <p><strong>名前:</strong> {data?.name}</p>
      <p><strong>メールアドレス:</strong> {data?.email}</p>
      <p><strong>GitHub アカウント名:</strong> {gitAccount}</p>
      {gitRepoUrl && (
        <p>
          <strong>登録リポジトリ：</strong>
          <a href={gitRepoUrl} target="_blank" rel="noopener noreferrer">
            {gitRepoUrl}
          </a>
        </p>
      )}

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => handleNavigate(paths.top.path)}
          style={buttonStyle("#6c757d", "#5a6268")}>
          トップ画面へ
        </button>
        <button onClick={() => handleNavigate(paths.mypage.learn.getHref())}
          style={buttonStyle("#007bff", "#0056b3")}>
          教材へ
        </button>
        <button onClick={handleSignOut}
          style={buttonStyle("#dc3545", "#a71d2a")}>
          サインアウト
        </button>
      </div>
    </div>
  );
};



export default ProfileRoute;
