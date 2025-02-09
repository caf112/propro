import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUserAttributes, signOut } from "@aws-amplify/auth"
import { paths } from "@/config/paths";

export const useAuth = () => {

    //ユーザー情報を取得
    const userQuery = useQuery ({
        queryKey: ["auth"], 
        queryFn: async () => {
            try {
                const attributes = await fetchUserAttributes();
                return attributes;
            } catch (error) {
                console.error("ログインしてください\n", error);
                throw error;
            }
        }
    })
    return { ...userQuery }
}

//サインアウト処理
export const useSignOut = () => {
    const queryClient = useQueryClient();

    const handleSignOut = async () => {
        try {
            await signOut();
            queryClient.invalidateQueries();
            window.location.href = paths.auth.login.path;
        } catch (error) {
            console.error("サインアウト：",error)
        }
    }
    return handleSignOut
}
