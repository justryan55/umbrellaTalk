import React, { useState } from 'react'
import ConversationSnapshot from './ConversationSnapshot'


export default function FetchConversationList() {
    const [conversationList, setConversationList] = useState()

    
  return (
    <div>
        <ConversationSnapshot />
        <ConversationSnapshot />
        <ConversationSnapshot />
        <ConversationSnapshot />
        <ConversationSnapshot />
        <ConversationSnapshot />
        <ConversationSnapshot />
    </div>
  )
}
