import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import * as Button from '@/components/ui/button'
import './top-contents.css'

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
            <div className="top-msg">
                {data ? (
                    <div>
                        <h2>ようこそ、{data.name}さん</h2>
                        <p>ゴンにカーソルをあわせてみてね→</p>
                    </div>
                ):(
                    <h2><Link to={paths.auth.login.getHref()}>ログイン</Link>してください</h2>
                )}
            </div>

            <div className="page-actions">
                <Button.ActionButton onClick={handleMyPage} label="マイページ" iconClass="mypage-icon"/>
                <Button.ActionButton onClick={handleGamePage} label="ゲーム選択" iconClass="game-icon"/>
            </div>
        </div>
    )
}
