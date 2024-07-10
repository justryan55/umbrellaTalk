import { useContext, useEffect, useState } from 'react'
import ConversationSnapshot from './ConversationSnapshot'
import { UserContext } from '../services/AuthContext'

export default function FetchConversationList() {
    const [user] = useContext(UserContext)
    const [conversationListComponent, setConversationListComponent] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const fetchConversationList = async () => {
        try {
            const res = await fetch(`https://umbrella-talk-api.vercel.app/api/${user.id}/conversation`, {
              method: "GET",
              headers: {
                'Content-Type': 'application/json'
              },
            })

            const data = await res.json()
            const dataArray = data.conversation   
                  
            const conversationHistory = (
              <div>
                {dataArray.map((conversation) => (
                  <ConversationSnapshot 
                    key={conversation.conversation._id} 
                    conversation={conversation.conversation} 
                    message={conversation.latestMessage ? conversation.latestMessage.latestMessage : ''}
                  />
                ))}
              </div>
            )
  
          setConversationListComponent(conversationHistory)
          setIsLoading(false)
        } catch (err) {
          console.log("Error fetching list:", err)
          setIsLoading(false)
        }}
        
        fetchConversationList()
 
    }, [user])

  return (
    <div>
        {isLoading ? <p className='loading-text'>Loading conversations...</p> : conversationListComponent}
    </div>
  )
}
