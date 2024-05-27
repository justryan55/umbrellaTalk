import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import AuthService from '../components/AuthForm'

export default function LoginPage() {
  return (
    <div>
        <PageHeader action={"register"} />
        <AuthService type="submit" action={"register"} />
      
    </div>
  )
}
