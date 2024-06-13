
import NavigationBar from "../components/NavigationBar.jsx"
import HeaderBar from "../components/HeaderBar.jsx"
import { useContext, useEffect, useState } from "react"
import CreateNewMessage, { UserListComponentContext } from "../components/CreateNewMessage.jsx"
import { fetchUsers } from "../helpers.js";
import UserList from "../components/UserList.jsx";


export default function ContactPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const u = await fetchUsers()
      setUsers(u)
    }

    getUsers()

    document.body.style.backgroundColor = "#fff"

    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])
    
  return (
    <div>
      <div className="header-bar-container">  
        <HeaderBar page="contacts" />
      </div>
      
      <div className="user-list-container">
            {users.map((user) => {
            return (
                <UserList key={user.email} user={[user.name, user._id]} />
            )
            })}
        </div>

      <div className="navigation-bar-container">
        <NavigationBar />
      </div>
    </div>
  )
}