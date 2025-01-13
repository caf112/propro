import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"
import { paths } from "@/config/paths";

const TopRoute = () => {
  const { data } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate(paths.auth.login.path)
  }
  
  const handleMyPage = () => {
    navigate(paths.mypage.mypage.path)
  }

  return (
      <div>
        <h1>Top</h1>
        {data ? (
          <p>ようこそ、{data.name}さん</p>
        ):(
          <div>
            <p>ログインしてください</p>
            <button onClick={handleLogin}>ログイン</button>
          </div>
        )
      }
        <button onClick={handleMyPage}>マイページへ</button>
      </div>
  )
}

export default TopRoute