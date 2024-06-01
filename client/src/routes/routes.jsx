import { createBrowserRouter } from "react-router-dom"
import WelcomePage from "../pages/WelcomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import DashboardPage from "../pages/DashboardPage"
import { ProtectedRoute } from "../pages/ProtectedRoute"


const AppRouter = () => {

    const token = localStorage.getItem('token')
    const router = createBrowserRouter([
        {
            path: "/",
            element: <WelcomePage />,
        },
        {
            path: "/login",
            element: token ? <DashboardPage /> : <LoginPage />,
        },
        {
            path: "/register",
            element: token ? <DashboardPage /> : <RegisterPage />,
        },
        {
            path: "/dashboard",
            element: <ProtectedRoute children={<DashboardPage />} />
        }
    ])
    
    return router

}


export default AppRouter 
