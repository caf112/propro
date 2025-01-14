import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { imagePaths } from "@/config/paths";
import * as Button from '@/components/ui/button'

export const TopContents = () => {

    const { data } = useAuth();
      const navigate = useNavigate();
      
      const handleMyPage = () => {
        navigate(paths.mypage.profile.getHref())
      }
    
      const handleGamePage = () => {
        navigate(paths.game.modeSelector.getHref())
      }
    return (
        <div className="top-container">
            <div className="top-logo">
                <img src={imagePaths.logo} />
            </div>

            <div className="user">
                {data ? (
                    <h2>ようこそ、{data.name}さん</h2>
                ):(
                    <div className="user-auth">
                    <p>ログインしてください</p>
                    <div className="user-links">
                        <Link to={paths.auth.login.getHref()}>ログイン</Link>
                        <Link to={paths.auth.register.getHref()}>新規登録</Link>
                    </div>
                    </div>
                )}
            </div>

            <div className="page-actions">
                <Button.ActionButton onClick={handleMyPage} label="マイページ" icon="mypage-icon"/>
                <Button.ActionButton onClick={handleGamePage} label="ゲーム選択" icon="game-icon"/>
            </div>

            <div className="floating-image-container">
                <img src={imagePaths.usa.hunter} alt="Floating Icon" />
            </div>

        </div>
    )
}
