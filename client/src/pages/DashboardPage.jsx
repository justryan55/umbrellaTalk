import { useContext, useEffect } from "react"
import { UserContext } from "../services/AuthContext.jsx"
import NavigationBar from "../components/NavigationBar.jsx"
import HeaderBar from "../components/HeaderBar.jsx"
import FetchConversationList from "../components/FetchConversationList.jsx"


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
    <div className="dashboard-page-container">
      <div className="header-bar-container">
        <HeaderBar />
      </div>
      <FetchConversationList />
      <NavigationBar />
    </div>
  )
}
