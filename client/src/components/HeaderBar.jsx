import { useContext } from "react"
import { UserContext } from "../services/AuthContext"
import CreateNewMessage from "./CreateNewMessage"
import { useNavigate } from "react-router"


export default function HeaderBar({page}) {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()
    const handleBackClick = () => {
      navigate('/dashboard')
    }



  return (
    <div className="header-bar-content">
        {page === "dashboard" ? (
          <p className="header-text" onClick={handleBackClick}>Welcome {user.name}</p>
        ) : page === "contacts" ? (
          <p className="header-text" onClick={handleBackClick}>Contacts</p>
        ) : page === "settings" ? (
          <p className="header-text" onClick={handleBackClick}>Account Settings</p>
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
               onClick={handleBackClick}
               >
               <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        )
      }
        {page === "dashboard" ? (
        <CreateNewMessage />
      ) : page === "conversation" ? (
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="24" 
             height="24" 
             viewBox="0 0 24 24" 
             fill="none" 
             stroke="white" 
             strokeWidth="2" 
             strokeLinecap="round" 
             strokeLinejoin="round" 
             className="trash-icon"
             >
             <polyline points="3 6 5 6 21 6"></polyline>
             <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      ) : page === "contacts" ? (
        null
      ) : (
        null
      )}
    </div>
  )
}
