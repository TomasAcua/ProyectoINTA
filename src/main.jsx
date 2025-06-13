import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Buffer } from 'buffer';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
window.Buffer = Buffer;

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
