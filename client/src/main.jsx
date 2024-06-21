import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import AppRouter from '../src/routes/routes.jsx'; 
import { AuthContext } from './services/AuthContext.jsx'

const router = AppRouter()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContext>
    <RouterProvider router={router} />
  </AuthContext>,
)
