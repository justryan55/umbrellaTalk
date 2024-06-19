import { useContext, useEffect, useState } from 'react'
import { AuthenticationContext, UserContext } from '../services/AuthContext'
import { useNavigate } from 'react-router'
import Avvvatars from 'avvvatars-react'


export const AccountSettings = () => {
    const [user, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [setIsAuthenticated] = useContext(AuthenticationContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const profileImage = user.profilePicture


    const handleTextInput = (e) => {
        const username = e.target.value
        setUser((prevUser) => ({
           ...prevUser, 
           name: username 
        }))
    }  

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser) {
            setUser(storedUser)
        }
        setLoading(false)

    }, [])

    useEffect(() => {
        if (!loading && user) {
            localStorage.setItem('user', JSON.stringify(user))
            updatedUsernameInAPI()
        }
    }, [user, loading])

    const updatedUsernameInAPI = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (!res.ok) {
            throw new Error('Failed to update username')
        }
    } catch (err) {
        console.log('Error updating user:', err)
    }

    }

    const handleDeleteClick = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
                method: 'DELETE' })

            if (res.status === 200){
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                setIsAuthenticated(false)
                navigate('/')
                }
        } catch (err) {
            console.log('Error deleting user:', err)
        }
    }

    
    return (
    <div className='account-settings-container'>
        <div className='profile-image-settings'>
        <Avvvatars value={user.email} size={200} style='character'/>
        <p>Change Profile Picture</p>
        </div>
        <div className='user-settings-container'>
            <p className='user-settings'>Username:</p>
            <textarea onChange={handleTextInput}
                        value={user.name}
                        className='account-settings-textarea' />
        </div>
        <div className='user-settings-container'>
            <p className='user-settings'>Email: </p>
            <textarea className='account-settings-textarea-readonly' 
                      value={user.email}
                      disabled />
            
        </div>


        <p className='delete-account-btn'
           onClick={handleDeleteClick}
           >
            Delete Account
           </p>
    </div>
  )
}
