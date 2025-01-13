import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUserAttributes, signOut } from "@aws-amplify/auth"
import { paths } from "@/config/paths";
// import { useNavigate } from "react-router-dom";

export const useAuth = () => {

    //ユーザー情報を取得
    const userQuery = useQuery ({
        queryKey: ["auth"], 
        queryFn: async () => {
            try {
                const attributes = await fetchUserAttributes();
                return attributes;
            } catch (error) {
                console.error("Error fetching user attributes:", error);
                throw error;
            }
        }
    })
    return { ...userQuery }
}

//サインアウト処理
export const handleSignOut = async () => {
    const queryClient = useQueryClient();
    try {
        await signOut();
        queryClient.invalidateQueries();
        window.location.href = paths.auth.Login.path;
    } catch (error) {
        console.error("error singing out:",error)
    }
    return { handleSignOut }
}
