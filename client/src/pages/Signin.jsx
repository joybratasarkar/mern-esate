import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';

export default function Signin() {
  const env = 'http://localhost:3000/'
  const [formData, setFormData] = useState({})
  const [error, SetError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handelSubmit = async (e) => {
    e.preventDefault();


    try {
      setLoading(true)
      const res = await fetch(`${env}api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success == false) {
        setLoading(false)
        SetError(data.message)
        return
      }
      setLoading(false)
      SetError(null)
      navigate('/');
    } catch (error) {
      SetError(data.message)

      setLoading(false)
    };

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>
      <form onSubmit={handelSubmit} className='flex flex-col gap-1 '>
        <input type="email" className='border p-3 rounded-lg' id='email' placeholder='Email' onChange={handelChange} /><br />
        <input type="password" className='border p-3 rounded-lg' id='password' placeholder='Password' onChange={handelChange} /><br />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5 mb-5 items-center justify-between w-full'>
        <p> Don't have a account  </p>
        <Link className='text-blue-700' to={'/sign-up'}>
          Sign up
        </Link>
      </div>
      {error && <p className='text-red-500'> {error}</p>}

    </div>

  )
}
