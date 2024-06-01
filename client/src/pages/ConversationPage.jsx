import { useEffect } from "react"
import ConversationApp from "../components/ConversationApp.jsx"
import NavigationBar from "../components/NavigationBar.jsx"


export default function ConversationPage() {

  useEffect(() => {
    document.body.style.backgroundColor = "#fff"

    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])

  return (
    <div>
      <NavigationBar />
      <ConversationApp />
    </div>
  )
}
