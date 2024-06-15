import { useEffect, useState } from 'react'
import profilePicture from '../assets/images/profile-picture.png'

export default function MessageSnapshot({messageDetails, own}) {
  const [message, setMessage] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const timestamp = messageDetails.createdAt
  const currentURL = window.location.pathname
  const currentURLSplit = currentURL.split('/')
  const conversationId = currentURLSplit[2]

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

  useEffect(() => {
      setMessage(messageDetails.message)
  }, [messageDetails])

  return (
    <div className={own ? 'outgoing-message' : 'incoming-message'}>
        {messageDetails && (
            <div className='message-top'>
                <img className='message-img' src={profilePicture} alt='' />
                <div className='message-text-container'>
                  {isEditing ? (
                    <textarea
                      value={message}
                      onChange={handleTextAreaChange}
                      onKeyDown={handleTextAreaKeyDown}
                      onBlur={() => setIsEditing(false)}
                      autoFocus
                    />
                  ) : (
                    <p className="message-text">{message}</p>
                  )}
                  {own && !isEditing && ( 
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
