import React, { useEffect } from 'react'
import pp from '../assets/Default_pfp.jpg'
import {motion} from 'framer-motion'
import { Pen } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
function profile() {

  const [img, setImg] = useState(pp);
  const nama = localStorage.getItem('nama')
  const npm = localStorage.getItem('npm')
  const kelas = localStorage.getItem('kelas')
  const prodi = localStorage.getItem('prodi')
  const tahun = localStorage.getItem('angkatan')
  const email = localStorage.getItem('email')
  const noHp = localStorage.getItem('noHp')

  return (
    <div className='flex w-full justify-center items-center flex-col'>

  
    <motion.div
    initial={{ opacity: 0 , y: -50 }}
    animate={{ opacity: 1 , y: 0 }}
    transition={{ duration: 0.8, delay: 0.1 }}
    className='md:ml-20 mt-8 flex flex-col md:flex-row gap-3 w-[90%] border p-6 rounded-3xl shadow-xl lg:w-[50%] xl:w-[40%] items-center justify-center'>
        <div className='md:border-r-2 md:p-4 sm:border-gray-700'>
          <img src={pp || `http://localhost:3000/${localStorage.getItem('img_url')}` } alt=""  className='rounded-full w-44 h-44'/>
        </div>
        <div className='flex flex-col justify-center gap-3 items-center md:justify-start md:items-start md:ml-4'>
          <h1 className='flex font-extrabold 2xl:text-3xl md:text-2xl sm:text-xl'>{nama}</h1>
          {localStorage.getItem('status') === 'dosen' ? (
            <div className='flex flex-col justify-center items-center md:justify-start md:items-start'>
            <div className='font-semibold text-gray-600'>
                0{noHp}
              </div>
                <div className='flex justify-center items-center'>
                  {email !== null ? (
                  <p>
                    {email}
                  </p>     
                  ):null}
              </div>
            </div>
          ): (
            <div className='flex flex-col justify-center items-center md:justify-start md:items-start'>
              <div className='font-semibold text-gray-600'>
                {npm}
              </div>
              <div>
                {tahun-2020 + ' - ' + kelas + ' ' + prodi}
              </div>
              <div className='text-sm mb-2'>
                {email !== null ? (
                    <p>
                     {email}
                    </p>     
                ):null}
              </div>
            </div>
          )}
        </div>
    </motion.div>


    <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.7 }}
    className='flex justify-center items-center text-center mt-11 p-3 border rounded-xl shadow-md'>
    
    <Link to={`/editProfile/${noHp || npm}`} className='flex gap-1 items-center'>
        Update Profile <Pen size={32} />
      </Link>
    </motion.button>

    </div>
  )
}

export default profile