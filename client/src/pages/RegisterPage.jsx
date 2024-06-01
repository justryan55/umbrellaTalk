import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import AuthForm from '../components/AuthForm'

export default function LoginPage() {
  return (
    <div className='container'>
      <div className='section-container'>
        <div>
            <PageHeader action={"register"} />
            <AuthForm action={"register"} />
        </div>
      </div>
    </div>
  )
}
