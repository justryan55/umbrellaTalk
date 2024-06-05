
import NavigationBar from "../components/NavigationBar.jsx"
import HeaderBar from "../components/HeaderBar.jsx"
import { useContext, useEffect } from "react"


export default function ProfilePage() {

  useEffect(() => {
        document.body.style.backgroundColor = "#fff"
    
        return () => {
          document.body.style.backgroundColor = ""
        }
      }, [])
    
    
  return (
    <div>
      <div className="header-bar-container">  
        <HeaderBar />
      </div>
      <div className="navigation-bar-container">
        <NavigationBar />
      </div>
    </div>
  )
}
