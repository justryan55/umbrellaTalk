import { createContext, useContext, useState } from "react"
import FetchUsers from "./FetchUsers.jsx"
import { UserContext } from "../services/AuthContext.jsx"
import { fetchUsers } from "../services/helpers.jsx"

export const UserListContext = createContext([])
export const UserListComponentContext = createContext([])

export default function NewConversationIcon() {
    const [users, setUsers] = useState([])
    const [user] = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false)

    const fetchUsersAndDisplay = async () => {
        if (isOpen){
            setIsOpen(false)
            setUsers([])
            return
        }

        try {
            const fetchedUsers = await fetchUsers();
            const currentUser = fetchedUsers.find(u => u._id === user.id)

            if (currentUser) {
                const filteredUsers = fetchedUsers.filter(u => u._id !== user.id)
                setUsers(filteredUsers)
                setIsOpen(true)
            } else {
                console.log("Unable to find current user")
            }
        } catch (err){
            console.log("Error fetching users:", err)
        }
    }

  return (
    <div>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            onClick={fetchUsersAndDisplay}
            className="header-new-message-icon">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        <div className="user-list-container">
            {users.map((user) => {
                return (
                    <FetchUsers key={user.email} 
                                user={[user.name, user._id, user.profilePictureID]} 
                                icon={true}
                    />
                )
            })}
        </div>
    </div>
  )
}