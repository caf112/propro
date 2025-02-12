import { useLocation, useNavigate } from "react-router-dom";
import { imagePaths } from "@/config/paths"
import { paths } from "@/config/paths";
import { useSignOut } from "@/hooks/useAuth";
import './background.css'

type BackGroundProps = {
    children?: React.ReactNode;
}

export const BackGroundLayout: React.FC<BackGroundProps> = ({children}) => {
    const icon = imagePaths.icon;
    const navigate = useNavigate()
    const location = useLocation()
    
    const handleSignOut = useSignOut();
    const handleClick = (page: string) => {
        if (page == "gomibako") {
            handleSignOut
            return 
        }
        if (page == "home") return navigate(paths.top.path)
        if (page == "mail") return navigate(page)
        if (page == "mypage") return navigate(paths.mypage.profile.getHref())        
        if (page == "file") return navigate(paths.game.modeSelector.getHref())
        if (page == "editor") return navigate(paths.game.modeSelector.getHref())
        if (page == "material") return navigate(paths.mypage.learn.getHref())
        if (page == "settings") return navigate(paths.mypage.profile.getHref())
    }

    const pageComments: Record<string, string> = {
        [paths.top.path]: "オレはゴン！\nそれぞれのページで\n話すよ！",
        [paths.mypage.profile.path]: "感謝するぜ\nお前と出会えた\nこれまでの全てに!!!",
        [paths.mypage.learn.path]: "オレももっと\n強くならなきゃ!",
        [paths.game.modeSelector.path]: "オレはこっちを選ぶ！",
        // [paths.game.awsTest.path]: "これはテストページだ！",
        [paths.game.single.stageSelector.path]: "どれを選ぶ？",
        [paths.game.single.play.path]: "がんばれ！\nオレもついてるから！",
        [paths.game.single.result.path]: "道草を楽しめ  大いにな\nほしいものより大切なものが\nきっとそっちに転がってる",
        [paths.game.multi.recruit.path]: "9月1日\nヨークシンシティで!!",
        [paths.game.multi.stageSelector.path]: "どれを選ぶ？",
        [paths.game.multi.play.path]: "がんばれ！\nオレもついてるから！",
        [paths.game.multi.result.path]: "道草を楽しめ  大いにな\nほしいものより大切なものが\nきっとそっちに転がってる",
    }

    const gonMessage = pageComments[location.pathname] || "オレはゴン！";

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
                <p className="speech-bubble">メール</p>
                <img
                    src={icon.mail} 
                    onClick={() => handleClick("mail")}
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
                <p className="speech-bubble">ファイル</p>
                <img
                    src={icon.file} 
                    onClick={() => handleClick("file")}
                    alt="ファイル"
                    />
            </div>
            <div className="icons-editor">
                <p className="speech-bubble">エディタ</p>
                <img
                    src={icon.editor} 
                    onClick={() => handleClick("editor")}
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
                    <p className="gon-comment">{gonMessage}</p>
            </div>
        </div>
            {children}
    </div>
  )
}

