import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DinosaurProvider } from './context/DinosaurContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DinosaurProvider>
      <App />
    </DinosaurProvider>
  </StrictMode>
)