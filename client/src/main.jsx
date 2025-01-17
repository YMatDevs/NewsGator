import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'; 

// Importing Tailwing
import './index.css';

// Importing Pages
import Auth from './Pages/Auth';
import Home from './Pages/Home';  
import ForgotPassword from './Pages/Forgotpwd';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element = {<Auth />} />
        <Route path='/content' element = {<Home />} /> 
        <Route path='/resetpwd' element = {<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
