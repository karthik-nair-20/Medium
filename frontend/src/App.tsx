import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Blog from './components/Blog'
import Newuser from './components/Newuser'
import axios from 'axios';

function App() {
  axios.defaults.baseURL = "https://backend.herbolax77.workers.dev/api/v1";

  return (
    <BrowserRouter>
      <Routes>
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
        <Route path='signin/:authType' element={<Newuser />} />
        <Route path='signup/:authType' element={<Newuser />} />
        <Route path='blog/:id' element={<Blog />} />
        <Route />
      </Routes>
    </BrowserRouter>
  )
}

export default App
