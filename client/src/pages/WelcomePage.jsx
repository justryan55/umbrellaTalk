import PageHeader from '../components/WelcomeLoginRegisterPageHeader'
import LoginRegisterButton from '../components/LoginRegisterButton'

export default function WelcomePage() {
  return (
    <div>
        <PageHeader type={"welcome"} />
        <div className="flex .flex-column w-full justify-center gap-3">
          <LoginRegisterButton type={"login"}/>
          <LoginRegisterButton type={"register"}/>
        </div>
    </div>
  )
}
