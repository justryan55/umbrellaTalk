import { useNavigate } from 'react-router'
import profilePicture from '../assets/images/profile-picture.png'
import tick from '../assets/images/tick.svg'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../services/AuthContext';

const ConversationSnapshot = ({conversation, message}) => {
  const navigate = useNavigate();
  const [senderName, setSenderName] = useState("")
  const [conversationName, setConversationName] = useState("")
  const [timestamp, setTimestamp] = useState('');
  const [currentUser] = useContext(UserContext)
  const [messageText, setMessageText] = useState('')

  // console.log(conversation)
  

  const handleClick = () => {
    const conversationId = conversation._id

    navigate(`/conversation/${conversationId}`);
  };

  const getUserList = async () => {
    const res = await fetch("http://localhost:5000/api/users", {
      method: "GET", 
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();

    console.log(data)
    data.user.map((user) => {
      if (user._id === message.sender){
        setSenderName(user.name)
      }
    })


    data.user.map(user => {
      if (currentUser.id === conversation.userOne){
        if (user._id === conversation.userTwo){
          setConversationName(user.name)
        }
      } else {
        if (user._id === conversation.userOne){
          setConversationName(user.name)
        }

      }
    })  
  };




  const formatTimestamp = (timestamp) => {
    const current = new Date();
    const provided = new Date(timestamp);
    const timeDifference = current - provided;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  };


  useEffect(() => {
    getUserList();
    setTimestamp(formatTimestamp(message.createdAt));
  }, []);
 



  return (
    <div className='conversation-snapshot-container' onClick={() => handleClick()}>
        <div className='snapshot-content'>
            <img src={profilePicture} alt='profile' className='snapshot-profile-image'/>
            <div className='snapshot-first-row'>
                <p className='snapshot-last-user'>{conversationName}</p>
                <p className='snapshot-last-message'>{senderName}: {message.message}</p>
            </div>
            <div className='snapshot-second-row'>
                <p className='snapshot-timestamp'>{timestamp}</p>
                
                <img src={tick} alt='sent' className='snapshot-message-sent-image'/>
            </div>
        </div>
    </div>
  )
}

export default ConversationSnapshot
