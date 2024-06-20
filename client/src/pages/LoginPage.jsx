import WelcomePageText from '../components/WelcomePageText'
import AuthForm from '../components/AuthForm'
import Rain from '../components/Rain'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'


export default function LoginPage() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token){
      navigate('/dashboard')
    }
  }, [token, navigate])

  return (
    <>
      <Rain />
      <div className='container'>
        <div className='section-container'>
            <WelcomePageText action={"login"} />
            <AuthForm action={"login"} />
        </div>
      </div>
    </>
  )
}
