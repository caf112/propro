import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"
import { paths } from "@/config/paths";
import { Link } from "react-router-dom";

const TopRoute = () => {
  const { data } = useAuth();
  const navigate = useNavigate();
  
  const handleMyPage = () => {
    navigate(paths.mypage.profile.getHref())
  }

  const handleGamePage = () => {
    navigate(paths.game.modeSelector.getHref())
  }

  return (
      <div>
        <h1>Top</h1>
        {data ? (
          <p>ようこそ、{data.name}さん</p>
        ):(
          <div>
            <p>ログインしてください</p>
            <div>
              <Link to={paths.auth.login.getHref()}>ログイン</Link>
            </div>
            <div>
              <Link to={paths.auth.register.getHref()}>新規登録</Link>
            </div>
          </div>
        )
      }
        <button onClick={handleMyPage}>マイページへ</button>
        <div>
        </div>
        <button onClick={handleGamePage} >モード選択へ</button>
      </div>
  )
}

export default TopRoute