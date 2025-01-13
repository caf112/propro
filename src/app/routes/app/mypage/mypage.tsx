import { useNavigate } from "react-router-dom";
import { useSignOut, useAuth } from "@/hooks/useAuth";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

const MyPageRoute = () => {
    //ユーザー情報のupdateも作らないと
    const { data } = useAuth();
    console.log(data)
    const navigate =useNavigate();
    
    const handleSignOut = useSignOut();
    
    const handleTop = () => {
        navigate(paths.Top.path)
    }

  return (
    <ProtectedRoute>
        <div>
            <h2>MyPage</h2>
            <h2>User Profile</h2>
            <p>name:{data?.name}</p>
            <p>email:{data?.email}</p>
            <p>git_account:{data?.["custom:git_account"]}</p>
            <p>git_repository:{data?.["custom:git_repository"]}</p>
            <button onClick={handleSignOut}>signOut</button>
            <button onClick={handleTop}>topへ</button>
        </div>
    </ProtectedRoute>
  )
}

export default MyPageRoute