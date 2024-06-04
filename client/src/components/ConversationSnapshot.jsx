import { useNavigate } from 'react-router'
import profilePicture from '../assets/images/profile-picture.png'
import tick from '../assets/images/tick.svg'
import { useEffect, useState } from 'react';

const ConversationSnapshot = (message) => {
  const navigate = useNavigate();
  const [senderName, setSenderName] = useState("")
  const [timestamp, setTimestamp] = useState('');

  const handleClick = () => {
    const conversationId = message.message.conversationId

    navigate(`/conversation/${conversationId}`);
  };

  const getUserList = async () => {
    const res = await fetch("http://localhost:5000/api/users", {
      method: "GET", 
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();


    const userNames = data.user.map((user) => {
      if (user._id === message.message.sender){
        setSenderName(user.name)
      }
    })

  };


  const formatTimestamp = (timestamp) => {
    const current = new Date();
    const provided = new Date(timestamp);
    const timeDifference = current - provided;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      return provided.toISOString();
    }
  };


  useEffect(() => {
    getUserList();
    setTimestamp(formatTimestamp(message.message.createdAt));
  }, []);
 




  return (
    <div className='conversation-snapshot-container' onClick={() => handleClick()}>
        <div className='snapshot-content'>
            <img src={profilePicture} alt='profile' className='snapshot-profile-image'/>
            <div className='snapshot-first-row'>
                <p className='snapshot-last-user'>Username</p>
                <p className='snapshot-last-message'>{senderName}: {message.message.message}</p>
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
