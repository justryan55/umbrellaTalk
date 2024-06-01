import { createContext, useState } from "react"

export const AuthenticationContext = createContext(false)

export function AuthContext({ children }){
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const userDetails = {
        name: '',
        email: '',
        profileImg: ''
    }

    const [user, setUser] = useState(userDetails)

    return (
        <AuthenticationContext.Provider value={[isAuthenticated, setIsAuthenticated, user, setUser]}>
            { children }
        </AuthenticationContext.Provider>
    )
}

