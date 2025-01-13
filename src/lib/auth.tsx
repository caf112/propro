import { Navigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader";

export const authFormConfig = {

    formFields: {
        signIn: {
            username: {//サインインオプションをusernameとするってこと？<-ログインはできた
                label: "メールアドレス",
                placeholder: "メールアドレスを入力",
            },
            password: {
                label: "パスワード",
                placeholder: "パスワードを入力",
            }
        },
        signUp: {
            email: {
                label: "メールアドレス",
                placeholder: "メールアドレスを入力",
            },
            password: {
                label: "パスワード",
                placeholder: "パスワードを入力",
            },
            confirm_password: {
                label: "パスワードの確認",
                placeholder: "もう一度パスワードを入力",
            },
            name: {
                label: "ユーザー名",
                placeholder: "ユーザー名を入力",
            },
            "custom:git_account": {
                label: "gitのアカウント名",
                placeholder: "gitのアカウント名を入力",
            },
            "custom:git_repository": {
                label: "保存するgitリポジトリ名",
                placeholder: "例：pro-pro",
            },
        }
    },

    // signUpAttributes: ['name', 'email', 'custom:git_account', 'custom:git_repository']
    
}

export type CustomAttributes = any;



//gameに必要
export const ProtectedRoute: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const { data,isLoading } = useAuth();
    
    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (!data) {
        return (//ログインしてください画面を作成する。
            <Navigate to={paths.auth.login.path} replace />
        )
    }

    return children;
}


export const AuthLoader:React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <Loader />
        )
    } 

    return children;
}