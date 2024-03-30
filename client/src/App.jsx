import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signin from './pages/Signin'
import Signout from './pages/Signout'
import About from './pages/About'
import Home from './pages/home'
import Profile from './pages/profile'



export default function App() {
  return (
    <BrowserRouter>
    <Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/sign-in' element={<Signin/>}></Route>
<Route path='/sign-up' element={<Signout/>}></Route>
<Route path='/about' element={<About/>}></Route>
<Route path='/profile' element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>
    )
}
