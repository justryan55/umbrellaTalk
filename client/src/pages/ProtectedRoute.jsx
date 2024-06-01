import { useContext } from 'react';
import { AuthenticationContext } from '../services/AuthContext';


export const ProtectedRoute = ( {token}) => {
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthenticationContext)
    const jwt = localStorage.getItem('jwt')
    console.log(jwt)
  return (
    <div>
      

    </div>
  )
}
