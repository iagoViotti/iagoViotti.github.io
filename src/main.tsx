import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DivProvider } from './context/DivContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DivProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DivProvider>
)
