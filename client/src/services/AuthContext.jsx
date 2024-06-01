import { createContext, useState } from "react"

export const AuthenticationContext = createContext(false)

export function AuthContext({ children }){
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <AuthenticationContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
            { children }
        </AuthenticationContext.Provider>
    )
}

