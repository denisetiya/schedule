import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Admintabs from '../../components/Admintabs'
function Admin() {
  
  const identify =localStorage.getItem('token')
  const navigate = useNavigate();
  
  useEffect(() => {
    if(identify !== 'tes'){
      navigate('/login')
    }
  },[])
  return (
    <div className='flex justify-center items-center w-full flex-col'>
        <Admintabs/>
      <div>
        <div className='flex flex-wrap gap-4 mt-20 rounded-lg justify-center px-4 py-4 '>
          <Link className='px-4 py-2 rounded text-2xl font-bold'>
              Welcome To Admin Dasboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Admin