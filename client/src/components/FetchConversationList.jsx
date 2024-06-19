import { useContext, useEffect, useState } from 'react'
import ConversationSnapshot from './ConversationSnapshot'
import { UserContext } from '../services/AuthContext'


export default function FetchConversationList() {
    const [user] = useContext(UserContext)
    const [conversationListComponent, setConversationListComponent] = useState()

    const fetchConversationList = async () => {
      try {
          const res = await fetch(`http://localhost:5000/api/${user.id}/conversation`, {
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
                message={conversation.latestMessage ? conversation.latestMessage.latestMessage : ''} />
            ))}
          </div>
        )

        setConversationListComponent(conversationHistory)
      } catch (err) {
      console.log("Error fetching list:", err)
      }}

    useEffect(() => {
      fetchConversationList()
    }, [user])

  return (
    <div>
        {conversationListComponent}
    </div>
  )
}
