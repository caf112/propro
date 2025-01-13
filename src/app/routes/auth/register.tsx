import { Authenticator } from "@aws-amplify/ui-react"
import { authFormConfig } from "@/lib/auth"
import { Link, Navigate } from "react-router-dom";
import { paths } from "@/config/paths";


const RegisterRoute = () => {

    const formConfig = authFormConfig;

    return (
        <div className="auth">
            <Authenticator 
                initialState="signUp"
                // components={authComponent}
                signUpAttributes={formConfig.signUpAttributes}
                formFields={formConfig.formFields}
            >
                <Navigate to={paths.Top.path} replace/>
            </Authenticator>
            <div>
                <Link to={paths.Top.path}>ログインせずにトップページへ</Link>
            </div>
        </div>
    )
}

export default RegisterRoute;