import { Link, useNavigate } from "react-router-dom";

export default function LoginRegisterButton({action}) {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  
 
  return (
    <div className="btn-container">
        <button
            action = {action}
            className="btn"
            >
                {action === "login" ? "Login" : "Register" }
        </button>
    </div>
  )
}
