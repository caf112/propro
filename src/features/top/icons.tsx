import { useNavigate } from "react-router-dom";
import { imagePaths } from "@/config/paths"
import { paths } from "@/config/paths";
import { useSignOut } from "@/hooks/useAuth";
import './top.css'

export const HandleIcons = () => {
    const icon = imagePaths.icon;
    const navigate = useNavigate();

    const handleSignOut = useSignOut();

    const handleClick = (page: string) => {
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
    <div className="icon-container">
        <div className="icons-gomi">
            <p className="fukidashi">ゴミ箱</p>
            <img
                src={icon.gomibako} 
                onClick={handleSignOut} 
                alt="ゴミ箱"
                />
        </div>
        <div className="icons-home">
            <p className="fukidashi">ホーム</p>
            <img
                src={icon.home} 
                onClick={handleSignOut}
                alt="ホーム"
                />
        </div>
        <div className="icons-mail">
            <p className="fukidashi">メール</p>
            <img
                src={icon.mail} 
                onClick={() => handleClick("mypage")}
                alt="メール"
                />
        </div>
        <div className="icons-mypage">
            <p className="fukidashi">マイページ</p>
            <img
                src={icon.mypage} 
                onClick={() => handleClick("mypage")}
                alt="マイページ"
                />
        </div>
        <div className="icons-file">
            <p className="fukidashi">ファイル</p>
            <img
                src={icon.file} 
                onClick={() => handleClick("game")}
                alt="ファイル"
                />
        </div>
        <div className="icons-editor">
            <p className="fukidashi">エディタ</p>
            <img
                src={icon.editor} 
                onClick={() => handleClick("game")}
                alt="エディタ"
                />
        </div>
        <div className="icons-yomi" >
            <p className="fukidashi">読み物</p>
            <img
                src={icon.yomimono} 
                onClick={() => handleClick("material")}
                alt="読み物"
                />
        </div>
        <div className="icons-sett">
            <p className="fukidashi">設定</p>
            <img
                src={icon.settings} 
                onClick={() => handleClick("settings")}
                alt="設定"
            />
        </div>
    </div>
  )
}
