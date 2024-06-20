import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'

const UserList = ({ user, icon }) => {
  const navigate = useNavigate()
  const currentUserString = localStorage.getItem('user')
  const currentUser = JSON.parse(currentUserString).id

  const navigateToConversation = async () => {
    try {
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
    } catch (err) {
      console.log("Unable to navigate to conversation:", err)
    }
  }

  return (
    <div className={icon ? 'user-list-content-icon' : 'user-list-content' } onClick={navigateToConversation}>
        <img src={`/avatars/${user[2]}.svg`} 
              alt='profile' 
              className='user-list-profile-image'
              />
        <p className={icon ? 'user-list-user-icon' : 'user-list-user'}>{user[0]}</p>
    </div>
  )
}

UserList.propTypes = {
  user: PropTypes.array.isRequired,
  icon: PropTypes.bool.isRequired
}

export default UserList
