import { useNavigate } from 'react-router'
import profilePicture from '../assets/images/profile-picture.png'
import { UserListContext } from './CreateNewMessageButton'
import { useContext } from 'react'


const UserList = ({user}) => {
  const navigate = useNavigate()
  const [userListComponents, setUserListComponents] = useContext(UserListContext)
  const currentUserString = localStorage.getItem('user')
  const currentUser = JSON.parse(currentUserString).id


  const handleClick = async () => {
    setUserListComponents([])

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
        const { conversationIdObject }  = await res.json()
        const conversationId = JSON.stringify(conversationIdObject)
        navigate(`/conversation/${conversationId}`)

      }

  }

  return (
      <div className='user-list-content' onClick={handleClick}>
          <img src={profilePicture} 
               alt='profile' 
               className='user-list-profile-image'
               />
          <p className='user-list-user'>{user[0]}</p>

      </div>
  )
}

export default UserList
