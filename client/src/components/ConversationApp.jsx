import { useContext, useEffect, useState } from 'react'
import IndividualMessage from './IndividualMessage';
import sendImg from '../assets/images/send.svg'


export default function ConversationApp() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const currentUserString = localStorage.getItem('user')
  const currentUser = JSON.parse(currentUserString).id

  const currentURL = window.location.pathname
  const currentURLSplit = currentURL.split('/')
  const conversationId = currentURLSplit[2]

  const sendMessage = async () => {
    const res = await fetch(`http://localhost:5000/api/conversation/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        conversationId: conversationId,
        sender: currentUser,
        message: message
      })
    })

    if (res.ok){
      const data = await res.json()
      setMessages((prevMessages) => [...prevMessages, data])
    }

    setMessage("")
  }


  const fetchMessages = async () => {
    const res = await fetch(`http://localhost:5000/api/conversation/${conversationId}/messages`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (res.ok){
      const data = await res.json()
      console.log(data)
      setMessages(data)

    }
  }

  
  useEffect(() => {
    console.log("Fetching messages...")
    setMessages([])
    fetchMessages()

  }, [conversationId])

  
  return (
    <div className='conversation-app-container'>
      <div className='conversation-content'>
          <div className='conversation-app-top'>
          {messages.map((message) => {
          return (
            <IndividualMessage 
              key={message._id} 
              messageDetails={message} 
              own={message.sender === currentUser} />
              );
           })}
          </div>

           {location.pathname === '/dashboard' ? 
           (<></>) 
           
           : (
          <div className='conversation-app-bottom'>
            <textarea className='conversation-textarea-input' 
                      name='message' 
                      placeholder='Send your message...' 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="24" 
                 height="24" 
                 viewBox="0 0 24 24" 
                 fill="none" 
                 stroke="#FCBF49" 
                 strokeWidth="2" 
                 strokeLinecap="round" 
                 strokeLinejoin="round" 
                 className='message-submit-button'
                 onClick={sendMessage}
                 >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>)}
      </div>
    </div>
  )
}