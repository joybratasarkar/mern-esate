import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure, deleteUserSuccess, deleteUser,
  signOutUser, signOutUserSuccess, signOutUserFailure
} from '../redux/userSlice';
import { app } from '../firebase';
import { persistStore } from 'redux-persist';

export default function profile() {
  const env = 'http://localhost:3000/'
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handelFileUpload(file)
    }
  }, [file])
  const handelFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime + file.name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot?.bytesTransferred / snapshot?.totalBytes) * 100
      setFilePercentage(Math.round(progress))
    },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        })
      });

  }
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      console.log('formData', formData);
      const res = await fetch(`${env}api/auth/signout/${currentUser?._id}`, {
        method: 'PUT',
        mode: "cors",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }

  }
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUser())
      const res = await fetch(`${env}api/user/delete/${currentUser?._id}`, {
        method: 'DELETE',
        mode: "cors",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }


  const handleSignOut = async () => {
    try {

      dispatch(signOutUser());
      const res = await fetch(`${env}api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));

    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form onSubmit={handelSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file" ref={fileRef} hidden accept='image/*' />
        <img
          onClick={() => fileRef.current.click()}
          className='rounded-full h-24 w-24 mt-2 object-cover cursor-pointer self-center'
          src={formData?.avatar ? formData?.avatar : currentUser?.avatar}
          alt='profile'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePercentage === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>


        <input onChange={handelChange} defaultValue={currentUser?.username} type="text" id='username' placeholder='username' className=' border p-3 rounded-lg' />

        <input onChange={handelChange} defaultValue={currentUser?.email} type="text" id='email' placeholder='email' className=' border p-3 rounded-lg' />


        <input onChange={handelChange} type="Password" id='Password' placeholder='Password' className=' border p-3 rounded-lg' />

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-95'>
          {loading ? 'loading...' : 'Update'}
        </button>

      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>

      </div>
      <div className='flex justify-center'>
        <div className='flex justify-between'>
          <p className='text-red-700 mt-5'>
            {error ? error : ''}
          </p>
          <p className='text-green-700 mt-5'>
            {updateSuccess ? 'User is updated successfully' : ''}
          </p>
        </div>
      </div>

    </div>
  )
}
