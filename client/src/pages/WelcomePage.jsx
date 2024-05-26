import WeclomePageHeader from '../components/WelcomePageHeader'
import LoginRegisterButton from '../components/LoginRegisterButton'

export default function WelcomePage() {
  return (
    <div>
        <WeclomePageHeader />
        <div className="flex .flex-column w-full justify-center gap-3">
          <LoginRegisterButton type={"login"}/>
          <LoginRegisterButton type={"register"}/>
        </div>
    </div>
  )
}
