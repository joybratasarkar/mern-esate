import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/userSlice';
import OAuth from '../components/OAuth';

export default function Signin() {
  const env = 'http://localhost:3000/'
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      dispatch(signInStart());
      const res = await fetch(`${env}api/auth/signin`, {
        method: 'POST',
        headers: headers,
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Handle non-successful responses
        const errorData = await res.json();
        dispatch(signInFailure(errorData.message));
        return;
      }

      // Extract authorization token from response headers
      const authToken = await res.headers.get('Authorization');


      // Parse response body as JSON
      const data = await res.json();
      let updateresponse = { ...data, authToken }

      // Dispatch action to indicate successful sign-in along with any other relevant data
      dispatch(signInSuccess(updateresponse));

      // Navigate to the desired location after successful sign-in
      navigate('/');
    } catch (error) {
      // Handle any unexpected errors
      dispatch(signInFailure(error.message));
    }
  };

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
        <OAuth />
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
