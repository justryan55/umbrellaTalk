import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import AuthForm from '../components/AuthForm'

export default function LoginPage() {
  return (
    <div>
        <PageHeader action={"register"} />
        <AuthForm type="submit" action={"register"} />
      
    </div>
  )
}
