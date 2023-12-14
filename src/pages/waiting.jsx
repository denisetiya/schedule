import React from 'react'
import {motion} from 'framer-motion'
import Loading from '../components/loading'

function waiting() {
  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-20'>
        <motion.p
        initial={{ opacity: 0 , y: -50 }}
        animate={{ opacity: 1 , y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className='text-lg font-bold px-1 text-center'>
          Harap menunggu proses reset password
        </motion.p>
        <motion.p
        initial={{ opacity: 0 , y: 20 }}
        animate={{ opacity: 1 , y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className='text-gray-600 font-semibold'>
          kamu akan menerima email dari admin
        </motion.p>
        <motion.p
        initial={{ opacity: 0 , y: 20 }}
        animate={{ opacity: 1 , y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className='text-gray-600 mt-10'>
          Harap menunggu, Terima Kasih
        </motion.p>
        <div className='p-10'>
          <Loading />
        </div>

      </div>
    </div>
  )
}

export default waiting