import { useNavigate } from 'react-router'
import profilePicture from '../assets/images/profile-picture.png'
import tick from '../assets/images/tick.svg'
import { useState } from 'react';

const ConversationSnapshot = (message) => {
  const navigate = useNavigate();
  const [senderName, setSenderName] = useState("")

  const handleClick = () => {
    navigate('/conversation');
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

  getUserList()

 




  return (
    <div className='conversation-snapshot-container' onClick={() => handleClick()}>
        <div className='snapshot-content'>
            <img src={profilePicture} alt='profile' className='snapshot-profile-image'/>
            <div className='snapshot-first-row'>
                <p className='snapshot-last-user'>{senderName}</p>
                <p className='snapshot-last-message'>{message.message.message}</p>
            </div>
            <div className='snapshot-second-row'>
                <p className='snapshot-timestamp'>{message.message.createdAt}</p>
                
                <img src={tick} alt='sent' className='snapshot-message-sent-image'/>
            </div>
        </div>
    </div>
  )
}

export default ConversationSnapshot
