import { useNavigate } from "react-router-dom";
import { useSignOut, useAuth } from "@/hooks/useAuth";
import { paths } from "@/config/paths";


const ProfileRoute = () => {
    //ユーザー情報のupdateも作らないと
    const { data } = useAuth();
    const navigate =useNavigate();
    
    const handleSignOut = useSignOut();
    
    const handleTop = () => {
        navigate(paths.top.path)
    }

    const handleLearnPage = () => {
        navigate(paths.mypage.learn.getHref())
    }

  return (
        <div className="desktop">
            <h2>マイページ</h2>
            <p><strong>名前:</strong>{data?.name}</p>
            <p><strong>メールアドレス:</strong>{data?.email}</p>
            <p><strong>githubアカウント名:</strong>{data?.["custom:git_account"]}</p>
            <p><strong>登録リポジトリ：</strong>
                <a 
                    href={`https://github.com/${data?.["custom:git_account"]}/${data?.["custom:git_repository"]}`} target="_blank" rel="noopener noreferrer">
                    https://github.com/{data?.["custom:git_account"]}/{data?.["custom:git_repository"]}
                </a>
            </p>
            <button onClick={handleSignOut} >サインアウト</button>
            <button onClick={handleTop} >トップ画面へ</button>
            <button onClick={handleLearnPage} >教材へ</button>
        </div>
  )
}

export default ProfileRoute