import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'; 

// Importing Pages
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<Login />} />
        <Route path='/Signup' element = {<Signup />} />
        <Route path='/' element = {<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
