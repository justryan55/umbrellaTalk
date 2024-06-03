import profilePicture from '../assets/images/profile-picture.png'


const UserList = ({user}) => {
  

  return (
      <div className='user-list-content'>
          <img src={profilePicture} alt='profile' className='user-list-profile-image'/>
          <p className='user-list-user'>{user}</p>
      </div>
  )
}

export default UserList
