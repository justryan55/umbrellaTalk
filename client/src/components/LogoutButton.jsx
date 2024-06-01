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
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="nav-icon"
        id="logout-icon"
        onClick={handleLogout}
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>  

)
}
