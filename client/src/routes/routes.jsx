import { createBrowserRouter } from "react-router-dom"
import WelcomePage from "../pages/WelcomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import DashboardPage from "../pages/DashboardPage"
import ConversationPage from "../pages/ConversationPage"
import { ProtectedRoute } from "../pages/ProtectedRoute"
import ContactPage from "../pages/ContactPage"
import AccountPage from "../pages/AccountPage"


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
            path: "/dashboard",
            element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
        },
        {
            path: "/contacts",
            element: <ProtectedRoute><ContactPage /></ProtectedRoute>,
        },
        {
            path: "/account",
            element: <ProtectedRoute><AccountPage /></ProtectedRoute>,
        },
        {
            path: "/conversation/:conversationId",
            element: <ProtectedRoute><ConversationPage /></ProtectedRoute>
        }
    ])

    return router
}


export default AppRouter 
