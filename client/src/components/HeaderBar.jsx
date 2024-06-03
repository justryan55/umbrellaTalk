import { useContext } from "react"
import { UserContext } from "../services/AuthContext"
import CreateNewMessageButton from "./CreateNewMessageButton"


export default function HeaderBar() {
    const [user, setUser] = useContext(UserContext)

  return (
    <div className="header-bar-content">
        <p className="header-text">Welcome {user.name}</p>
        <CreateNewMessageButton />
    </div>
  )
}
