import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import LoginRegisterButton from '../components/LoginRegisterButton'

export default function WelcomePage() {
  return (
    <div>
        <PageHeader action={"welcome"} />
        <div className='welcome-page-action-btn-container'>
          <LoginRegisterButton action={"login"}/>
          <LoginRegisterButton action={"register"}/>
        </div>
    </div>
  )
}
