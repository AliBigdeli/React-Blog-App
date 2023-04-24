import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home/Home'
import BlogList from './pages/Blog/blogList'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {

  return (
    <main>

      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/blogs" element={<BlogList/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
          </Routes>
        </div>
      </Router>


    </main>
  )
}

export default App
