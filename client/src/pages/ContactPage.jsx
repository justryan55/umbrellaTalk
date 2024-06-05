
import NavigationBar from "../components/NavigationBar.jsx"
import HeaderBar from "../components/HeaderBar.jsx"
import { useContext, useEffect } from "react"
import CreateNewMessage, { UserListComponentContext } from "../components/CreateNewMessage.jsx"


export default function ContactPage() {
  const [userListComponents, setUserListComponents] = useContext(UserListComponentContext);
  
  useEffect(() => {
        document.body.style.backgroundColor = "#fff"
    
        return () => {
          document.body.style.backgroundColor = ""
        }
      }, [])
    
      console.log(userListComponents)
    
  return (
    <div>
      <div className="header-bar-container">  
        <HeaderBar />
      </div>
      {userListComponents}
      <div className="navigation-bar-container">
        <NavigationBar />
      </div>
    </div>
  )
}
