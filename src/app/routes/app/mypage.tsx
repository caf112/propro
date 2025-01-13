import { useNavigate } from "react-router-dom";
import { handleSignOut, useAuth } from "@/hooks/useAuth";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

const MyPageRoute = () => {
    //ユーザー情報のupdateも作らないと
    const { data } = useAuth();
    const handleClick = handleSignOut();
    const navigate =useNavigate();
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
            <button onClick={() => handleClick}>signOut</button>
            <button onClick={handleTop}>topへ</button>
        </div>
    </ProtectedRoute>
  )
}

export default MyPageRoute