import { useContext, useState } from "react"
import { Navigate } from "react-router"
import { AuthenticationContext } from "../services/AuthContext"


export const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthenticationContext)
    const jwt = localStorage.getItem('jwt')


    return (
    <div>
      {
        (isAuthenticated || jwt) ?
          <div>
            { children }
          </div>
          : 
          <Navigate to='/' />
      }
    </div>
  )
}
