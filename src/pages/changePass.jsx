import React, { useEffect } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import Loading from '../components/loading';
function changePass() {
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [urlLocA, setUrlLocA] = useState('');
  const [urlLocB, setUrlLocB] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPassword(newPassword)
    if(localStorage.getItem('status') == 'mahasiswa'){
      setUrlLocA('update-passwordMhs')
      setUrlLocB('cek-passwordMhs')
    }
    else if(localStorage.getItem('status') == 'dosen'){
      setUrlLocA('update-passwordDsn')
      setUrlLocB('cek-passwordDsn')
    }
  }, [id, newPassword])

  const handleUpdate = () => {
    setLoading(true);
    if(newPassword == confirmPassword){      
      axios.post(`http://localhost:3000/${urlLocB}/${id}`, {
       password : oldPassword
      }) .then((res) => {
        if(res.status === 200){
          axios.put(`http://localhost:3000/${urlLocA}/${id}`, {
            password : password
          })
          .then((res) => {
            if(res.status === 200){
              setLoading(false);
              alert('password updated')
              navigate('/profile')
            }
            else{
              setLoading(false);
              alert('error')
            }
        }) .catch((err) => {
          setLoading(false);
          console.log(err)
        }) 
     } else{
       setLoading(false);
       alert(res.data)
     }
  })
} else{
    setLoading(false);
    alert('password not match')
}}
  
  const handleBack = () => {
    setLoading(false);
    navigate('/profile')
  }

  if(loading){
    return <div className=' mt-48 flex justify-center items-center'><Loading/></div>
  }


  return (
    <div>
      <div className='mb-28'>
      <div>
      <div className='mt-3 mb-10 flex justify-center font-bold text-3xl'>
        Account Settings
      </div>
      <div className='flex justify-center items-center'>
         <Link to={`/editProfile/${id}`} className='border-2 px-4 py-1 rounded-md rounded-r-none text-xs font-semibold'>
            General
          </Link>
          <Link to={`/change-password/${id}`} className='bg-gray-700 px-4 py-1 text-white rounded-md rounded-l-none text-xs font-semibold'  >
            Change Password
          </Link>
        </div>
        <div className='flex flex-col gap-5 justify-center items-center border-2 shadow-md lg:ml-14 rounded-xl py-10 mt-3'>
          <div className='text-2xl font-bold'>
            Change Password
          </div>
          <div className='flex flex-col gap-4'>
      
          </div>
          <div className='w-[90%]'>
            <input type="text" placeholder="Old Password" required onChange={(e) => setOldPassword(e.target.value)}  className='rounded-xl w-full' />
          </div>
          <div className='w-[90%]'>
            <input type="password" placeholder='New Password' required onChange={(e) => setNewPassword(e.target.value)} className='rounded-xl w-full' />
          </div>
          <div className='w-[90%]'>
            <input type="password" placeholder='Confirm Password' required onChange={(e) => setConfirmPassword(e.target.value)} className='rounded-xl w-full' />
          </div>

          <div className='flex justify-end w-full mr-10 gap-4'>
            <button onClick={handleUpdate} className='bg-gray-700 p-2 mt-5 text-white rounded-xl mb-4 text-xs font-bold hover:bg-white hover:text-gray-700 transition-all duration-150 hover:border'>
              Save Changes
            </button>
            <button onClick={handleBack} className='h p-2 mt-5 border px-4 rounded-xl mb-4 text-xs font-bold hover:bg-gray-700 hover:text-white transition-all duration-100'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default changePass