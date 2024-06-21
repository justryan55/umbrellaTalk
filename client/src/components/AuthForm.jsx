import { useNavigate } from 'react-router'
import LoginRegisterButton from './LoginRegisterButton'
import { useContext } from 'react'
import { AuthenticationContext, UserContext } from '../services/AuthContext'
import PropTypes from "prop-types"

export default function AuthForm({ action }) {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useContext(AuthenticationContext)
  const [user, setUser] = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData)

    const params = {
      method: 'GET',
      headers: new Headers(),
      body: null,
    };
    
    if (payload) {
      params.method = 'POST';
      params.headers.set('Content-Type', 'application/json');
      params.body = JSON.stringify(payload);
    }
    
    if (action === "register"){
      const res = await fetch("http://localhost:5000/api/auth/register", params);
  
      if(res.ok) {
        const { token, userName, userEmail, userId, profilePictureID } = await res.json()  
        const newUser = ({
          name: userName,
          email: userEmail,
          profilePictureID: profilePictureID,
          id: userId, 
        })
        setIsAuthenticated(true)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(newUser))
        navigate('/dashboard')
        return;
      }
    } 
    
    if (action === "login"){
        const res = await fetch("http://localhost:5000/api/auth/login", params);
          if (res.ok){
            const { token, userName, userEmail, userId, profilePictureID } = await res.json()  
            const userDetails = ({
              name: userName,
              email: userEmail,
              profilePictureID: profilePictureID,
              id: userId, 
            })
            setIsAuthenticated(true)
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(userDetails))
            navigate('/dashboard')
            return 
          }
    }
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form-content">
        <form className="auth-form" onSubmit={handleSubmit}> 
          {action === "register" ? 
            <div>
              <label htmlFor="name" className="auth-form-label">Full Name</label>
              <div>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  className="auth-form-input"
                  required
                />
              </div>
            </div>
          : ""
          }

          <div>
            <label htmlFor="email" className="auth-form-label">Email</label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="auth-form-input"
                required
              />
            </div>
          </div>

          <div>
            <div className="password-container">
              <label htmlFor="password" className="auth-form-label">Password</label>
              {action === "login" ? 
                <div>
                  <a href="#" className="forgot-password">Forgot password?</a>
                </div>
              : ""
              }
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                className="auth-form-input"
                required
              />
            </div>
          </div>
          
          {action === "register" ? 
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirm-password" className="auth-form-label">Confirm Password</label>
              </div>
              <div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  className="auth-form-input"
                  required
                />
              </div>
            </div>
          : ""
          }
          <div>
            <LoginRegisterButton action={action} />
          </div>
        </form>
      </div>
    </div>
  )
}

AuthForm.propTypes = {
  action: PropTypes.string.isRequired
}