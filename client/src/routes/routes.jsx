import { createBrowserRouter } from "react-router-dom"
import WelcomePage from "../pages/WelcomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import DashboardPage from "../pages/DashboardPage"
import ConversationPage from "../pages/ConversationPage"
import { ProtectedRoute } from "../pages/ProtectedRoute"
import ContactPage from "../pages/ContactPage"


const AppRouter = () => {

    const token = localStorage.getItem('token')
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
            path: "/dashboard",
            element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
        },
        {
            path: "/contacts",
            element: <ContactPage />
        },
        {
            path: "/conversation/:conversationId",
            element: <ConversationPage />
        }
        
    ])
    
    return router

}


export default AppRouter 
