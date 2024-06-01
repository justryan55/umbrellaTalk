import { useContext, useEffect } from "react"
import { UserContext } from "../services/AuthContext.jsx"
import NavigationBar from "../components/NavigationBar.jsx"
import ConversationSnapshot from "../components/ConversationSnapshot.jsx"


export default function DashboardPage() {
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser){
      setUser(storedUser)
    }
  }, [])

  useEffect(() => {
    document.body.style.backgroundColor = "#fff"

    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])


  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <div>
      <NavigationBar />
      <p>Welcome {user.name}</p>
      <ConversationSnapshot />
      <ConversationSnapshot />
      <ConversationSnapshot />
      <ConversationSnapshot />
      <ConversationSnapshot />
      <ConversationSnapshot />
      <ConversationSnapshot />

    </div>
  )
}
