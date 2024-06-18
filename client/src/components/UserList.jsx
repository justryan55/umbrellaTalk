import { useNavigate } from 'react-router'
import profilePicture from '../assets/images/profile-picture.png'
import { UserListContext } from './CreateNewMessage'
import { useContext } from 'react'


const UserList = ({user, icon}) => {
  const navigate = useNavigate()
  const [userListComponents, setUserListComponents] = useContext(UserListContext)
  const currentUserString = localStorage.getItem('user')
  const currentUser = JSON.parse(currentUserString).id


  const handleClick = async () => {

    const res = await fetch("http://localhost:5000/api/conversation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userOne: currentUser,
        userTwo: user[1]
      })
    })
 
      if (res.ok){
        const { conversationId }  = await res.json()
        navigate(`/conversation/${conversationId}`)

      }

  }

  return (
      <div className={icon ? 'user-list-content-icon' : 'user-list-content' } onClick={handleClick}>
          <img src={profilePicture} 
               alt='profile' 
               className='user-list-profile-image'
               />
          <p className={icon ? 'user-list-user-icon' : 'user-list-user'}>{user[0]}</p>

      </div>
  )
}

export default UserList
