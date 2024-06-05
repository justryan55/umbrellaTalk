
import NavigationBar from "../components/NavigationBar.jsx"
import HeaderBar from "../components/HeaderBar.jsx"
import { useEffect } from "react"


export default function AccountPage() {
  
  useEffect(() => {
        document.body.style.backgroundColor = "#fff"
    
        return () => {
          document.body.style.backgroundColor = ""
        }
      }, [])
    
    
  return (
    <div>
      <div className="header-bar-container">  
        <HeaderBar page="settings" />
      </div>

      <div className="navigation-bar-container">
        <NavigationBar />
      </div>
    </div>
  )
}
