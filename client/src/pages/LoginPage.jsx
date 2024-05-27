import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import AuthService from '../components/AuthForm'

export default function LoginPage() {
  return (
    <div>
        <PageHeader action={"login"} />
        <AuthService action={"login"} />
    </div>
  )
}
