import React from 'react'
import './Fakultas.css'
import {Globe, SignIn} from '@phosphor-icons/react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function Fakultas() {

  const navigate = useNavigate();

  const handleRuangan = () => {
    navigate('/ruangan')
  }
  return (
    <div className=''>
        <motion.div
        initial={{opacity: 0, x: -100}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 1}}
        className="text flex items-center mt-8 mb-8 lg:ml-20">
          <Globe size={32} />
          <h2><b>Sains dan Teknologi</b></h2>
        </motion.div>
        <motion.div
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, delay: 0.5}}
        className="course shadow-2xl border-2 lg:ml-20">
            <div
            className="course-info">
                <h6 className='text-white'>SAINTEK</h6>
                <h2 style={{visibility: 'hidden'}}>UIN RadenIntanLampung1</h2>
                <a style={{visibility: 'hidden'}}>View all</a>
            </div>
            <div className="course-progress">
                <div className="progress-container">
                    {/* <div className="progress-text">
                        Tahun 2023
                    </div> */}
                </div>
                <h2 className='font-bold text-xl'>Gedung B</h2>
                <h6 className='text-sm'>Sistem Informasi</h6>
            </div>
            <button onClick={handleRuangan} className="text-gray-700 flex gap-1 absolute bottom-3 right-5 font-bold">
                <SignIn size={25} className='font-bold' />
                  Ruangan
              </button>
        </motion.div>
    </div>
  )
}

export default Fakultas