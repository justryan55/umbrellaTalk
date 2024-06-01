import { useContext, useEffect } from "react"
import { UserContext } from "../services/AuthContext.jsx"
import NavigationBar from "../components/NavigationBar.jsx"


export default function DashboardPage() {
  const [user, setUser] = useContext(UserContext)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser){
      setUser(storedUser)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <div>
      <NavigationBar />
      <p>Welcome {user.name}</p>
    </div>
  )
}
