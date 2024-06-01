import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import AuthForm from '../components/AuthForm'
import Rain from '../components/Rain'

export default function LoginPage() {
  return (
    <>
      <Rain />
      <div className='container'>
        <div className='section-container'>
          <div>
              <PageHeader action={"register"} />
              <AuthForm action={"register"} />
          </div>
        </div>
      </div>
    </>

  )
}
