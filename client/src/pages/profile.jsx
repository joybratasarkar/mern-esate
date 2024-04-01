import React from 'react'
import { useSelector } from 'react-redux';

export default function profile() {
  const currentUser = useSelector((state) => state.user);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>

        <img
          className='rounded-full h-24 w-24 mt-2 object-cover cursor-pointer self-center'
          src={currentUser?.currentUser?.avatar}
          alt='profile'
        />
        <input type="text" id='username' placeholder='username' className=' border p-3 rounded-lg' />

        <input type="text" id='email' placeholder='email' className=' border p-3 rounded-lg' />


        <input type="text" id='Password' placeholder='Password' className=' border p-3 rounded-lg' />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-95'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>

      </div>
    </div>
  )
}
