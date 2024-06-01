import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import AuthForm from '../components/AuthForm'
import Rain from '../components/Rain'


export default function LoginPage() {
  return (
    <>
      <Rain />
      <div className='container'>
        <div className='section-container'>
            <PageHeader action={"login"} />
            <AuthForm action={"login"} />
        </div>
      </div>
    </>
  )
}
