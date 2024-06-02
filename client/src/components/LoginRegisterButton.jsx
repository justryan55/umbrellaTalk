import { Link, useNavigate } from "react-router-dom";

export default function LoginRegisterButton({action}) {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
 
  return (
    <div className="auth-form-submit-btn-container">
        <button
            type="submit"
            action = {action}
            className="auth-form-submit-btn"
            >
                {action === "login" ? <Link to="/login">Login</Link> : action === "register" ? <Link to="/register">Register</Link> : <Link to="/">Back</Link>}
        </button>
    </div>
  )
}
