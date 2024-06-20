import { useEffect } from "react"
import MessengerApp from "../components/MessengerApp.jsx"
import NavigationBar from "../components/NavigationBar.jsx"
import HeaderBar from "../components/HeaderBar.jsx"

export default function ConversationPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#fff"

    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])

  return (
    <div>
      <div className="header-bar-container">  
        <HeaderBar page={"conversation"} />
      </div>
      <MessengerApp />
      <div className="navigation-bar-container">
        <NavigationBar />
      </div>
    </div>
  )
}
