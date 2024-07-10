import { useContext, useEffect, useState } from 'react'
import { AuthenticationContext, UserContext } from '../services/AuthContext'
import { useNavigate } from 'react-router'
import Modal from 'react-modal'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }
  
export const ProfileSettings = () => {
    const [user, setUser] = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthenticationContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [modalIsOpen, setModalIsOpen] = useState(false)
   
    const handleEditTextInput = (e) => {
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
            updateUsernameInAPI()
        }
    }, [user, loading])

    const updateUsernameInAPI = async () => {
        try {
            const res = await fetch(`https://umbrella-talk-2b5322zw5-ryans-projects-20a8834f.vercel.app/api/users/${user.id}`, {
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
            const res = await fetch(`https://umbrella-talk-2b5322zw5-ryans-projects-20a8834f.vercel.app/api/users/${user.id}`, {
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

    function openModal() {
        setModalIsOpen(true);
    }
  
    function closeModal() {
        setModalIsOpen(false);
    }

    
    const updateProfileAvatar = async (ID) => {
        setUser((prevUser) => ({
            ...prevUser,
            profilePictureID: ID
        }))

        try {
            const res = await fetch(`https://umbrella-talk-2b5322zw5-ryans-projects-20a8834f.vercel.app/api/users/${user.id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            if (!res.ok) {
                throw new Error('Failed to update profile picture')
            }

        } catch (err) {
            console.log('Error updating user:', err)
        }

        setModalIsOpen(false)
    }

    return (
        <div>
            <div className='account-settings-container'>
                <div className='profile-image-settings'>
                    <img src={`/avatars/${user.profilePictureID}.svg`} 
                        onClick={ openModal } 
                    />
                    <p className="change-profile-picture-text" onClick={openModal}>Change profile picture</p>
                </div>
                <div className='user-settings-container'>
                    <p className='user-settings'>Username:</p>
                    <textarea onChange={handleEditTextInput}
                            value={user.name}
                            className='account-settings-textarea'
                    />
                </div>
                <div className='user-settings-container'>
                    <p className='user-settings'>Email: </p>
                    <textarea className='account-settings-textarea-readonly' 
                            value={user.email}
                            disabled 
                    />
                </div>
                <p className='delete-account-btn' onClick={handleDeleteClick}>Delete Account</p>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Avatar Selection"
            >
                <p className='avatar-text'>Please select an avatar</p>
                <div className='avatar-container'>
                    <img src={`/avatars/1.svg`} className='avatar-image' onClick={() => updateProfileAvatar(1)}/>
                    <img src={`/avatars/2.svg`} className='avatar-image' onClick={() => updateProfileAvatar(2)}/>
                    <img src={`/avatars/3.svg`} className='avatar-image' onClick={() => updateProfileAvatar(3)}/>
                    <img src={`/avatars/4.svg`} className='avatar-image' onClick={() => updateProfileAvatar(4)}/>
                    <img src={`/avatars/5.svg`} className='avatar-image' onClick={() => updateProfileAvatar(5)}/>
                    <img src={`/avatars/6.svg`} className='avatar-image' onClick={() => updateProfileAvatar(6)}/>
                    <img src={`/avatars/7.svg`} className='avatar-image' onClick={() => updateProfileAvatar(7)}/>
                    <img src={`/avatars/8.svg`} className='avatar-image' onClick={() => updateProfileAvatar(8)}/>
                    <img src={`/avatars/9.svg`} className='avatar-image' onClick={() => updateProfileAvatar(9)}/>
                </div>
                <button className="btn modal-close" onClick={closeModal}>Close</button>
            </Modal>
        </div>
    )
}
