import { useContext, useEffect, useState } from 'react'
import profilePicture from '../assets/images/profile-picture.png'
import { UserContext } from '../services/AuthContext'

export default function MessageSnapshot({messageDetails, own}) {
  const [message, setMessage] = useState('')
  const [user] = useContext(UserContext)
  const [isEditing, setIsEditing] = useState(false)
  const timestamp = messageDetails.createdAt
  const currentURL = window.location.pathname
  const currentURLSplit = currentURL.split('/')
  const conversationId = currentURLSplit[2]
  const [altUserId, setAltUserId] = useState('')
  const [altUserProfileId, setAltUserProfileId] = useState('')

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleTextAreaChange = (e) => {
    setMessage(e.target.value)
  }
  
  const handleTextAreaKeyDown = async (e) => {
    if (e.keyCode === 13){
      try {
        const res = await fetch(`http://localhost:5000/api/conversation/${conversationId}/messages/${messageDetails._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: message,
          })
        }) 
        setIsEditing(false)  
      } catch (err) {
        console.log('There has been an error:', err)
      }
    } 
  }

  const handleDeleteMessageClick = async () => {
    try {
      const res = await fetch (`http://localhost:5000/api/conversation/${conversationId}/messages/${messageDetails._id}`, {
        method: 'DELETE'
      })
      setMessage("This message has been deleted")
    } catch (err) {
      console.log('There has been an error:', err)
    }
  }

  const getAltUserProfileImage = async () => {
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

    const userList = await fetch("http://localhost:5000/api/users", {
          method: "GET", 
          headers: {'Content-Type': 'application/json'}
        });
    
    const userData = await userList.json();

    userData.user.map(u => {
      if (u._id === altUserId){
        setAltUserProfileId(u.profilePictureID)
      }
    })
  };

  getAltUserProfileImage()

  useEffect(() => {
      setMessage(messageDetails.message)
  }, [messageDetails])

  return (
    <div className={own ? 'outgoing-message' : 'incoming-message'}>
        {messageDetails && (
            <div className='message-top'>
                <img className='message-img' src={own ? `/avatars/${user.profilePictureID}.svg` : `/avatars/${altUserProfileId}.svg`} alt='' />
                <div className='message-text-container'>
                  {isEditing ? (
                    <textarea
                      value={message}
                      onChange={handleTextAreaChange}
                      onKeyDown={handleTextAreaKeyDown}
                      className='edit-text-area'
                      onBlur={() => setIsEditing(false)}
                      autoFocus
                    />
                  ) : (
                    <p className={message === "This message has been deleted" ? "message-text deleted-message" : "message-text"}>{message}</p>
                  )}
                  {own && !isEditing && message !== "This message has been deleted" && ( 
                  <div className='icon-container'>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                         width="24" 
                         height="24" 
                         viewBox="0 0 24 24" 
                         fill="none" 
                         stroke="black" 
                         strokeWidth="2" 
                         strokeLinecap="round" 
                         strokeLinejoin="round" 
                         className="bin-icon"
                         onClick={handleDeleteMessageClick}>
                         <polyline points="3 6 5 6 21 6"></polyline>
                         <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="black" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="edit-icon"
                          onClick={handleEditClick}
                          >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg> 
                  </div>
                  )}
                </div>
          </div>
        )}
      
        {messageDetails && messageDetails.length > 0 && (
          <div className='message-bottom-timestamp'>{timestamp}</div>
        )}
    </div>
  )
}
