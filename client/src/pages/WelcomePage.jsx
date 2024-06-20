import WelcomePageText from '../components/WelcomePageText'
import LoginRegisterButton from '../components/LoginRegisterButton'
import Rain from '../components/Rain'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function WelcomePage() {
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
          <WelcomePageText action={"welcome"} />
          <div className='welcome-page-action-btn-container'>
            <Link to='/login' style={{textDecoration: 'none', width: '100%'}}><LoginRegisterButton action={"login"}/></Link>
            <Link to='/register'style={{textDecoration: 'none', width: '100%'}}><LoginRegisterButton action={"register"}/></Link>
          </div>
        </div>
      </div>
    </>

  )
}
