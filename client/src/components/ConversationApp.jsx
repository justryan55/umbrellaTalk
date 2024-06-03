import { useContext } from 'react'
import IndividualMessage from './IndividualMessage';
import sendImg from '../assets/images/send.svg'

export default function ConversationApp() {
  return (
    <div className='conversation-app-container'>
      <div className='conversation-content'>
          <div className='conversation-app-top'>
            {/* <IndividualMessage />
            <IndividualMessage own={true}/>
            <IndividualMessage />
            <IndividualMessage />

            <IndividualMessage own={true}/> */}
          </div>

          <div className='conversation-app-bottom'>
            <textarea className='conversation-textarea-input' placeholder='Send your message...'></textarea>
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="24" 
                 height="24" 
                 viewBox="0 0 24 24" 
                 fill="none" 
                 stroke="#FCBF49" 
                 strokeWidth="2" 
                 strokeLinecap="round" 
                 strokeLinejoin="round" 
                 className='message-submit-button'>
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
      </div>
    </div>
  )
}