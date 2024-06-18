import { useContext, useEffect, useState } from 'react'
import ConversationSnapshot from './ConversationSnapshot'
import { UserContext } from '../services/AuthContext'


export default function FetchConversationList() {
    const [user] = useContext(UserContext)
    const [ConversationListComponent, setConversationListComponent] = useState()

    const fetchConversationList = async () => {
      const res = await fetch(`http://localhost:5000/api/${user.id}/conversation`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      
      const data = await res.json()
      const dataArray = data.messageHistory

      const sortedArray = dataArray.sort((a, b) => {
        if (a.conversationId === b.conversationId) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return a.conversationId - b.conversationId;
      });
      
      const mostRecentMessages = [];
      const seenConversations = new Set();
      
      for (const message of sortedArray) {
        if (!seenConversations.has(message.conversationId)) {
          mostRecentMessages.push(message);
          seenConversations.add(message.conversationId);
        }
      }     
    

      const messageHistory = (
        <div>
          {mostRecentMessages.map((message) => {
            return <ConversationSnapshot key={message._id} message={message} />
          })}
        </div>
      )

      setConversationListComponent(messageHistory)
    }

    useEffect(() => {
      fetchConversationList()
    }, [user])

  return (
    <div>
        {ConversationListComponent}
    </div>
  )
}
