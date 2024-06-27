import { useContext, useEffect, useState } from "react"
import { UserContext } from "../services/AuthContext"
import NewConversationIcon from "./NewConversationIcon"
import { useNavigate } from "react-router"
import PropTypes from "prop-types"

export default function HeaderBar({ page }) {
    const [user] = useContext(UserContext)
    const navigate = useNavigate()
    const currentURL = window.location.pathname
    const currentURLSplit = currentURL.split('/')
    const conversationId = currentURLSplit[2]
    const [altUserId, setAltUserId] = useState('')
    const [altUserName, setAltUserName] = useState('')
    const [isLoading, setIsLoading] = useState(true)
  
    const handleBackClick = () => {
      navigate('/dashboard')
    }

    const deleteConversation = async () => {
      try {
        await fetch(`http://localhost:5000/api/conversation/${conversationId}/messages`, {
          method: "DELETE"
        })
        navigate('/dashboard')
      } catch (err) {
        console.log("Error deleting conversation:", err)
      }
    }

    useEffect(() => {
      const fetchAltUser = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/conversation/${conversationId}`, {
            method: "GET", 
            headers: {'Content-Type': 'application/json'}
          });
          const data = await res.json();
      
          if (user.id === data[0].userOne){
            setAltUserId(data[0].userTwo)
          } else {
            setAltUserId(data[0].userOne)
          }

          const fetchUsers = await fetch("http://localhost:5000/api/users", {
                method: "GET", 
                headers: {'Content-Type': 'application/json'}
              });
          
          const userData = await fetchUsers.json()
            
          userData.user.map(u => {
            if (u._id === altUserId){
              setAltUserName(u.name)
              setIsLoading(false)
            }
          })
        } catch (err){
            console.log("Error fetching alt user:", err)
        }
      }

      if (page === "conversation") {
        fetchAltUser();
      }
    }, [conversationId, page, user.id, altUserId]);
  
  return (
    <div className="header-bar-content">
        {page === "dashboard" ? (
          <p className="header-text" onClick={handleBackClick}>Welcome {user.name}</p>
        ) : page === "contacts" ? (
          <p className="header-text" onClick={handleBackClick}>Create conversation</p>
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
      {page === "conversation" && isLoading ? 'Loading...' : page === "conversation" && !isLoading ? `Chatting with ${altUserName}` : ""}
      {page === "dashboard" ? (
        <NewConversationIcon />
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
             onClick={deleteConversation}
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

HeaderBar.propTypes = {
  page: PropTypes.string.isRequired,
};

