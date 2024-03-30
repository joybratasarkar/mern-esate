import React from 'react'
import {Link} from 'react-router-dom'
export default function Signin() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form className='flex flex-col gap-2 '>
        <input type="text" className='border p-3 rounded-lg' id='username' placeholder='Username' /><br/>
        <input type="email" className='border p-3 rounded-lg' id='email' placeholder='Email' /><br/>
        <input type="password" className='border p-3 rounded-lg' id='password' placeholder='Password' /><br/>
    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> Sign up</button> 
      </form>
      <div className='flex gap-2 mt-5'>
          <p> Have an account </p>
          <Link className='text-blue-700' to={'/sign-in'}>
          Sign in
          </Link>
        
      </div>
    </div>

  )
}
