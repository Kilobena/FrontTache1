import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RegisterForm from './Auth/Register'
import AppRoutes from './routes'
import "../index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes/>
  </StrictMode>,
)
