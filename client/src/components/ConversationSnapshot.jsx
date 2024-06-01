import profilePicture from '../assets/images/profile-picture.png'
import tick from '../assets/images/tick.svg'

const ConversationSnapshot = () => {
  return (
    <div className='conversation-snapshot-container'>
        <div className='snapshot-content'>
            <img src={profilePicture} alt='profile' className='snapshot-profile-image'/>
            <div className='snapshot-first-row'>
                <p className='snapshot-last-user'>Ryan Irani</p>
                <p className='snapshot-last-message'>How are you?</p>
            </div>
            <div className='snapshot-second-row'>
                <p className='snapshot-timestamp'>1 hour ago</p>
                <img src={tick} alt='sent' className='snapshot-message-sent-image'/>
            </div>
        </div>
    </div>
  )
}

export default ConversationSnapshot
