import { useContext } from "react"
import { UserContext } from "../services/AuthContext"
import CreateNewMessage from "./CreateNewMessage"
import { useNavigate } from "react-router"
import backIcon from '../assets/images/chevron-left.svg'


export default function HeaderBar({page}) {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    const handleClick = () => {
      navigate('/dashboard')
    }

  return (
    <div className="header-bar-content">
        {page === "dashboard" ? (
          <p className="header-text" onClick={handleClick}>Welcome {user.name}</p>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" 
               width="24" 
               height="24" 
               viewBox="0 0 24 24" 
               fill="none" 
               stroke="white" 
               strokeWidth="2" 
               strokeLinecap="round" 
               strokeLinejoin="round" 
               className="back-icon"
               onClick={handleClick}
               >
               <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        )
      }
        {page === "dashboard" ? <CreateNewMessage /> : null }
    </div>
  )
}
