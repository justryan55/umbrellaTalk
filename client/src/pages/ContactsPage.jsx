import NavigationBar from "../components/NavigationBar.jsx"
import HeaderBar from "../components/HeaderBar.jsx"
import { useContext, useEffect, useState } from "react"
import { fetchUsers } from "../services/helpers.jsx"
import UserList from "../components/UserList.jsx"
import { UserContext } from "../services/AuthContext.jsx"

export default function ContactsPage() {
  const [users, setUsers] = useState([])
  const [user] = useContext(UserContext)

  useEffect(() => {
    const getUsers = async () => {
      try {   
        const fetchedUsers = await fetchUsers()
        const currentUser = fetchedUsers.find(u => u._id === user.id)

        if (currentUser) {
            const filteredUsers = fetchedUsers.filter(u => u._id !== user.id)
            setUsers(filteredUsers)
        } else {
            console.log("Error")
        }
      } catch(err){
        console.log("Error fetching users:", err)
      }
    }

    getUsers()

    document.body.style.backgroundColor = "#fff"

    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [user.id])
    
  return (
    <div>
      <div className="header-bar-container">  
        <HeaderBar page="contacts" />
      </div>
      
      <div className="user-list-container">
            {users.map((user) => {
              return (
                  <UserList key={user.email} 
                            user={[user.name, user._id, user.profilePictureID]} 
                            icon={false} 
                  />
              )
            })}
        </div>

      <div className="navigation-bar-container">
        <NavigationBar />
      </div>
    </div>
  )
}