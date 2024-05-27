import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import AuthForm from '../components/AuthForm'

export default function LoginPage() {
  return (
    <div>
        <PageHeader action={"login"} />
        <AuthForm action={"login"} />
    </div>
  )
}
