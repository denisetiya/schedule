import React from 'react'
import { Link } from 'react-router-dom'

function Admintabs() {
  return (
    <div>
      <div className='flex flex-wrap gap-4 mt-20 rounded-lg justify-center px-4 py-2 border'>
        <Link to='/jadwal-admin' className='px-4 py-2 rounded font-bold'>
          Jadwal
        </Link>
        <Link to='/ruangan-admin' className='px-4 py-2 rounded font-bold'>
           Ruangan
        </Link>
        <Link to='/dosen-admin' className='px-4 py-2 rounded font-bold'>
          Dosen
        </Link>
        <Link to='/fakultas-admin' className='px-4 py-2 rounded font-bold'>
          Gedung
        </Link>
        <Link to='/mk-admin' className='px-4 py-2 rounded font-bold'>
          Matakuliah
        </Link>
        <Link to='/user-admin' className='px-4 py-2 rounded font-bold'>
          User
        </Link>
      </div>
    </div>
  )
}

export default Admintabs