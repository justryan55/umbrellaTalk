import profilePicture from '../assets/images/profile-picture.png'

export default function MessageSnapshot({messageDetails, own}) {

  const message = messageDetails.message;
  const timestamp = messageDetails.createdAt

  return (
    <div className={own ? 'outgoing-message' : 'incoming-message'}>
        {messageDetails && (
            <div className='message-top'>
                <img className='message-img' src={profilePicture} alt='' />
                <div className='message-text-container'>
                  <p className='message-text'>{message}</p>
                  {own ? 
                  <svg xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="black" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="edit-icon">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg> 
                  : null}
                </div>
          </div>
        )}
      
        {messageDetails && messageDetails.length > 0 && (
          <div className='message-bottom-timestamp'>{timestamp}</div>
        )}
    </div>
  )
}
