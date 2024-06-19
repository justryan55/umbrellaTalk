import { createContext, useState } from "react"

export const AuthenticationContext = createContext(false)
export const UserContext = createContext()

export function AuthContext({ children }){
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [user, setUser] = useState({
        name: '',
        email: '',
        profilePictureID: ''
    })

    return (
    <AuthenticationContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
        <UserContext.Provider value={[user, setUser]}>
           { children }
        </UserContext.Provider>
    </AuthenticationContext.Provider>
    )
}

