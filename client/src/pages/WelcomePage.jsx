import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import LoginRegisterButton from '../components/LoginRegisterButton'

export default function WelcomePage() {
  return (
    <div>
        <PageHeader action={"welcome"} />
        <div className="flex .flex-column w-full justify-center gap-3">
          <LoginRegisterButton action={"login"}/>
          <LoginRegisterButton action={"register"}/>
        </div>
    </div>
  )
}
