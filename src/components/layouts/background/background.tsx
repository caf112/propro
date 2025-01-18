import { useNavigate } from "react-router-dom";
import { imagePaths } from "@/config/paths"
import { paths } from "@/config/paths";
import { useSignOut } from "@/hooks/useAuth";
import './background.css'

type BackGroundProps = {
    children?: React.ReactNode;
}

export const BackGroundLayout: React.FC<BackGroundProps> = ({children}) => {
    const icon = imagePaths.icon;
    const navigate = useNavigate();

    const handleSignOut = useSignOut();

    const handleClick = (page: string) => {
        if (page == "home") {
            return navigate(paths.top.path)
        }

        if (page == "game") {
            return navigate(paths.game.modeSelector.getHref())
        }

        if (page == "mypage") {
            return navigate(paths.mypage.profile.getHref())
        }
        
        if (page == "material") {
            return navigate(paths.mypage.profile.getHref())
        }

        if (page == "settings") {
            return navigate(paths.mypage.profile.getHref())
        }
    }

  return (
    <div className="back-img">
        <div className="desktop-container">
            <div className="top-logo">
                    <img src='/logo/logo.png' alt="top" />
            </div>  
        </div>
        <div className="icons-container">
            <div className="icons-gomi">
                <p className="speech-bubble">サインアウト</p>
                <img
                    src={icon.gomibako} 
                    onClick={handleSignOut} 
                    alt="ゴミ箱"
                    />
            </div>
            <div className="icons-home">
                <p className="speech-bubble">ホーム</p>
                <img
                    src={icon.home} 
                    onClick={() => handleClick("home")}
                    alt="ホーム"
                    />
            </div>
            <div className="icons-mail">
                <p className="speech-bubble">マイページ</p>
                <img
                    src={icon.mail} 
                    onClick={() => handleClick("mypage")}
                    alt="メール"
                    />
            </div>
            <div className="icons-mypage">
                <p className="speech-bubble">マイページ</p>
                <img
                    src={icon.mypage} 
                    onClick={() => handleClick("mypage")}
                    alt="マイページ"
                    />
            </div>
            <div className="icons-file">
                <p className="speech-bubble">ゲーム</p>
                <img
                    src={icon.file} 
                    onClick={() => handleClick("game")}
                    alt="ファイル"
                    />
            </div>
            <div className="icons-editor">
                <p className="speech-bubble">ゲーム</p>
                <img
                    src={icon.editor} 
                    onClick={() => handleClick("game")}
                    alt="エディタ"
                    />
            </div>
            <div className="icons-yomi" >
                <p className="speech-bubble">教材</p>
                <img
                    src={icon.yomimono} 
                    onClick={() => handleClick("material")}
                    alt="読み物"
                    />
            </div>
            <div className="icons-sett">
                <p className="speech-bubble">設定</p>
                <img
                    src={icon.settings} 
                    onClick={() => handleClick("settings")}
                    alt="設定"
                    />
            </div>
            <div className="floating-image-container">
                    <img src={imagePaths.usa.hunter} alt="Floating Icon" />
                </div>
        </div>
            {children}
    </div>
  )
}

