import { useContext, useEffect, useState } from 'react'
import profileImg from '../assets/images/profile-picture.png'
import { UserContext } from '../services/AuthContext'

export const AccountSettings = () => {
    const [user, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(true)

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

    
    return (
    <div className='account-settings-container'>
        <div className='profile-image-settings'>
            <img 
                src={profileImg}
                alt='profile'
                className='profile-image' />
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
            <textarea className='account-settings-textarea-readonly' disabled>{user.email}</textarea>
        </div>


        <p className='delete-account-btn'>Delete Account</p>
    </div>
  )
}
