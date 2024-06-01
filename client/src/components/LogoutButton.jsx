import { Link } from "react-router-dom";
import logoutIcon from '../assets/images/logout.svg'
import { useContext } from "react";
import { AuthenticationContext, UserContext } from "../services/AuthContext";
import { useNavigate } from 'react-router'

export default function LogoutButton() {
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthenticationContext)
    const [user, setUser] = useContext(UserContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const handleLogout = () => {
        if (token) {
            localStorage.removeItem('token')
            setUser({
                name: '',
                email: '',
                profileImg: ''
            })
            setIsAuthenticated(false)
            navigate('/')
        }
    }
 
  return (
    <div>
        <img src={logoutIcon} 
             alt='logout-icon' 
             onClick={() => handleLogout()}
        />
    </div>

)
}
