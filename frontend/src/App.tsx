import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Blog from './pages/Blog'
import Newuser from './components/Newuser'
import axios from 'axios';
import BlogDetail from './pages/BlogDetail'
import Publish from './pages/Create'
import { Toaster } from 'sonner'

function App() {
  axios.defaults.baseURL = "https://backend.herbolax77.workers.dev/api/v1";

  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors expand={true} />
      <Routes>
        <Route path="/" element={<Navigate to="/blogs" />} />
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
        <Route path='signin/:authType' element={<Newuser />} />
        <Route path='signup/:authType' element={<Newuser />} />
        <Route path='blogs' element={<Blog />} />
        <Route path='blog/:id' element={<BlogDetail />} />
        <Route path='publish' element={<Publish />} />
        <Route />
      </Routes>
    </BrowserRouter>
  )
}

export default App
