import profilePicture from '../assets/images/profile-picture.png'

export default function MessageSnapshot({messageDetails}) {
  // console.log({messageDetails})
  return (
    <div className={'outgoing-message'}>
        <div className='message-top'>
            <img 
              className='message-img'
              src={profilePicture}
              alt=''
            />
            <p className='message-text'>"Message"</p>
        </div>
        <div className='message-bottom-timestamp'>"Timestamp"</div>
    </div>
  )
}


{/* <div className={own ? 'outgoing-message' : 'incoming-message'}> */}
