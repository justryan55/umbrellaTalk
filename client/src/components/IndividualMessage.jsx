import profilePicture from '../assets/images/profile-picture.png'

export default function MessageSnapshot({messageDetails, own}) {
  let message = ""
  let timestamp = ""

  if (messageDetails && messageDetails.length > 0) {
    message = messageDetails[0].message;
    timestamp = messageDetails[0].createdAt
  } 


  return (
    <div className={own ? 'outgoing-message' : 'incoming-message'}>
        {messageDetails && messageDetails.length > 0 && (
          <div className='message-top'>
            <img className='message-img' src={profilePicture} alt='' />
            <p className='message-text'>{message}</p>
          </div>
        )}
      
        {messageDetails && messageDetails.length > 0 && (
          <div className='message-bottom-timestamp'>{timestamp}</div>
        )}
    </div>
  )
}

