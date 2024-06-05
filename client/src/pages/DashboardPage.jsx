import { useContext, useEffect, useState } from "react"
import { UserContext } from "../services/AuthContext.jsx"
import NavigationBar from "../components/NavigationBar.jsx"
import HeaderBar from "../components/HeaderBar.jsx"
import FetchConversationList from "../components/FetchConversationList.jsx"
import ConversationApp from "../components/ConversationApp.jsx"

export default function DashboardPage() {
  const [user, setUser] = useContext(UserContext)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    }, []);



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
        <HeaderBar page={"dashboard"} />
      </div>
      {isMobile ? (
          <FetchConversationList />
        ) : (
        <div className={`content-container ${isMobile ? "mobile" : "desktop"}`}>
          <FetchConversationList />
          {!isMobile && <ConversationApp />}
        </div>
      )}
        <NavigationBar />
    </div>
  )
}
