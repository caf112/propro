import { useNavigate } from "react-router-dom";
import { useSignOut, useAuth } from "@/hooks/useAuth";
import { paths } from "@/config/paths";
import { DraggableWindow } from "@/components/ui/draggable-window/draggable-window";

const ProfileRoute = () => {
    //ユーザー情報のupdateも作らないと
    const { data } = useAuth();
    console.log(data)
    const navigate =useNavigate();
    
    const handleSignOut = useSignOut();
    
    const handleTop = () => {
        navigate(paths.top.path)
    }

  return (
    // <div className="desktop">
    <div>
      <DraggableWindow title="profile" >
        <div className="desktop">
            <h2>MyPage</h2>
            <h2>User Profile</h2>
            <p>name:{data?.name}</p>
            <p>email:{data?.email}</p>
            <p>git_account:{data?.["custom:git_account"]}</p>
            <p>git_repository:{data?.["custom:git_repository"]}</p>
            <button onClick={handleSignOut}>signOut</button>
            <button onClick={handleTop}>topへ</button>
        </div>
    </DraggableWindow>
    </div>
  )
}

export default ProfileRoute