import { useNavigate } from "react-router-dom";
import { useSignOut, useAuth } from "@/hooks/useAuth";
import { paths } from "@/config/paths";
import * as Button from '@/components/ui/button'


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
            <h2>User Profile</h2>
            <p>name:{data?.name}</p>
            <p>email:{data?.email}</p>
            <p>git_account:{data?.["custom:git_account"]}</p>
            <p>git_repository:{data?.["custom:git_repository"]}</p>
            <Button.ActionButton onClick={handleSignOut} label="signOut" iconClass="signOut-icon"/>
            <Button.ActionButton onClick={handleTop} label="topへ" iconClass="top-icon"/>
            <Button.ActionButton onClick={handleLearnPage} label="教材" iconClass="yomimono" />
        </div>
  )
}

export default ProfileRoute