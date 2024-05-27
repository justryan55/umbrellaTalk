import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import AuthService from '../services/authService'

export default function LoginPage() {
  return (
    <div>
        <PageHeader type={"register"} />
        <AuthService type={"register"} />
      
    </div>
  )
}
