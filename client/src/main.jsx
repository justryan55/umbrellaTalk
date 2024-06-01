import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import { AuthContext } from './services/AuthContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContext>
    <RouterProvider router={router} />
  </AuthContext>,
)
