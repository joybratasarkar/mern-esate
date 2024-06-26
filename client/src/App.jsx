import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Home from './pages/home'
import Profile from './pages/profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/sign-in' element={<Signin />}></Route>
        <Route path='/sign-up' element={<Signup />}></Route>
        <Route path='/about' element={<About />}></Route>
       <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/create-listing' element={<CreateListing />} />

       </Route>
      </Routes>
    </BrowserRouter>
  )
}
