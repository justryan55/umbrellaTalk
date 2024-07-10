import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../services/AuthContext'
import PropTypes from "prop-types"

export default function MessageSnapshot({messageDetails, own}) {
  const [message, setMessage] = useState('')
  const [user] = useContext(UserContext)
  const [isEditing, setIsEditing] = useState(false)
  const [timestamp, setTimestamp] = useState('')
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
        await fetch(`/api/conversation/${conversationId}/messages/${messageDetails._id}`, {
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
      await fetch (`/api/conversation/${conversationId}/messages/${messageDetails._id}`, {
        method: 'DELETE'
      })
      setMessage("This message has been deleted")
    } catch (err) {
      console.log('There has been an error:', err)
    }
  }

  const formatTimestamp = (timestamp) => {
    const current = new Date()
    const provided = new Date(timestamp)
    const timeDifference = current - provided
    const minutes = Math.floor(timeDifference / (1000 * 60))
    const hours = Math.floor(timeDifference / (1000 * 60 * 60))
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    if (minutes === 0) {
        return "Just now"
    }  else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`
    } else {
      return `${days} day${days === 1 ? '' : 's'} ago`
    }
  }


  const fetchAltUserProfileImage = async () => {
    try {
      const res = await fetch(`/api/conversation/${conversationId}`, {
        method: "GET", 
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json()

      if (user.id === data[0].userOne){
        setAltUserId(data[0].userTwo)
      } else {
        setAltUserId(data[0].userOne)
      }

      const userList = await fetch("/api/users", {
            method: "GET", 
            headers: {'Content-Type': 'application/json'}
          });
      
      const userData = await userList.json();

      userData.user.map(u => {
        if (u._id === altUserId){
          setAltUserProfileId(u.profilePictureID)
        }
      })
    } catch(err){
      console.log("Error fetching alt user profile image", err)
    }
  }

  fetchAltUserProfileImage()

  useEffect(() => {
      setMessage(messageDetails.message)
      setTimestamp(formatTimestamp(messageDetails.createdAt))
  }, [messageDetails, messageDetails.createdAt])

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
                    onClick={handleEditClick}>
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg> 
            </div>
            )}
          </div>
        </div>
      )}
      {messageDetails && (
        <div className='message-bottom-timestamp'>{timestamp}</div>
      )}
    </div>
  )
}

MessageSnapshot.propTypes = {
  messageDetails: PropTypes.shape({
    _id: PropTypes.string.isRequired, 
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  own: PropTypes.bool.isRequired
}