import { createContext, useContext, useState } from "react";
import UserList from "./UserList";
import { UserContext } from "../services/AuthContext";


export const UserListContext = createContext([])

export default function CreateNewMessage() {
    const [userListComponents, setUserListComponents] = useState([]);
    const [user, setUser] = useContext(UserContext)

    const fetchUsers = async () => {
        const params = {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: null,
          };
      
        const res = await fetch("http://localhost:5000/api/users", params) 
        const userList = await res.json()

        if (res.status === 200){
            if (userListComponents.length === 0){
                const userListArray = userList.user     

                const userListExcludingCurrentUserArray = userListArray.map((existingUser) => {
                    if (existingUser.email === user.email){
                        console.log(user.email)
                        //find out how to remove this from the array
                    } else {
                        console.log(existingUser.email)
                    }
                }) 


                const users = (
                    <div className="user-list-container">
                        <UserListContext.Provider value={[userListComponents, setUserListComponents]}>
                            {userListArray.map((user) => (
                            <UserList key={user.email} user={[user.name, user._id]} />
                            ))}
                        </UserListContext.Provider>
                    </div>
                )
                


                setUserListComponents(users)

            } else {
                setUserListComponents([])
            }

        } else {
            console.log("error")
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
            onClick={fetchUsers}
            className="header-new-message-icon">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        {userListComponents}
    </div>
  )
}
