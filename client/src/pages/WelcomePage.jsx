import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import LoginRegisterButton from '../components/LoginRegisterButton'
import Rain from '../components/Rain'

export default function WelcomePage() {
  return (
    <>
      <Rain />
      <div className='container'>
        <div className='section-container'>
          <PageHeader action={"welcome"} />
          <div className='welcome-page-action-btn-container'>
            <LoginRegisterButton action={"login"}/>
            <LoginRegisterButton action={"register"}/>
          </div>
        </div>
      </div>
    </>

  )
}
