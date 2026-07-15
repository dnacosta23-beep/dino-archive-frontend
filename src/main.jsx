import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DinosaurProvider } from './context/DinosaurContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <DinosaurProvider>
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
    }}
  />

  <App />
</DinosaurProvider>
  </StrictMode>
)