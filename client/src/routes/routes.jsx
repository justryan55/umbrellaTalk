import { createBrowserRouter } from "react-router-dom"
import WelcomePage from "../pages/WelcomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"


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
])

export default router 
