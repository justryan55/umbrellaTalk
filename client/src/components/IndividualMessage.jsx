import profilePicture from '../assets/images/profile-picture.png'

export default function MessageSnapshot({own}) {
  return (
    <div className={own ? 'outgoing-message' : 'incoming-message'}>
        <div className='message-top'>
            <img 
              className='message-img'
              src={profilePicture}
              alt=''
            />
            <p className='message-text'>Hello this is a message</p>
        </div>
        <div className='message-bottom-timestamp'>1 hour ago</div>
    </div>
  )
}