import { Navigate, createBrowserRouter } from "react-router-dom"
import WelcomePage from "../pages/WelcomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import DashboardPage from "../pages/DashboardPage"
import { ProtectedRoute } from "../pages/ProtectedRoute"
import { AuthenticationContext } from "../services/AuthContext"
import { useContext } from "react"


const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <WelcomePage />,
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/dashboard",
                    element: <DashboardPage />,
                }
            ]
        }
    ])
    
    return router

}


export default AppRouter 
