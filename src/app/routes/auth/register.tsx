import { Authenticator } from '@aws-amplify/ui-react'
import { authFormConfig } from '@/lib/auth'
import { Link, Navigate } from 'react-router-dom'
import { paths } from '@/config/paths'
import { CustomAttributes } from '@/lib/auth'

const RegisterRoute = () => {
  const formConfig = authFormConfig

  return (
    <div className="auth">
      <Authenticator
        initialState="signUp"
        // components={authComponent}
        signUpAttributes={
          [
            'email',
            'name',
            'custom:git_account',
            'custom:git_repository',
            'custom:git_token',
          ] as CustomAttributes
        }
        // signUpAttributes={formConfig.signUpAttributes}
        formFields={formConfig.formFields}
      >
        <Navigate to={paths.top.path} replace />
      </Authenticator>
      <div>
        <Link to={paths.top.path}>ログインせずにトップ画面へ</Link>
      </div>
    </div>
  )
}

export default RegisterRoute
