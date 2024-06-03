import { useContext } from "react"
import { UserContext } from "../services/AuthContext"
import CreateNewMessageButton from "./CreateNewMessageButton"
import { useNavigate } from "react-router"


export default function HeaderBar() {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    const handleClick = () => {
      navigate('/dashboard')
    }

  return (
    <div className="header-bar-content">
        <p className="header-text" onClick={handleClick}>Welcome {user.name}</p>
        <CreateNewMessageButton />
    </div>
  )
}
