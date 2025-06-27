import React from 'react'
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles.css'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>asdfdsaf
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App