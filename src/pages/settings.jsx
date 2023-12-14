import React from 'react'
import { Palette, Translate, WhatsappLogo, Envelope } from '@phosphor-icons/react'
import {Link} from 'react-router-dom'


function settings() {

  const handleLight = () => {
    localStorage.setItem('styleA', 'text-gray-700 bg-white')
    localStorage.setItem('styleB', 'text-white bg-gray-700')
    localStorage.setItem('styleC', 'text-white bg-green-700')
  }

  const handleDark = () => {
    localStorage.setItem('styleA', 'text-white bg-gray-700')
    localStorage.setItem('styleB', 'text-gray-700 bg-white')
    localStorage.setItem('styleC', 'text-white bg-green-700')

  }

  const handleGreen = () => {
    localStorage.setItem('styleA', 'text-white bg-green-700')
    localStorage.setItem('styleB', 'text-gray-700 bg-white')
    localStorage.setItem('styleC', 'text-white bg-gray-700')
  }

  return (
    <div  >
      <div className='flex justify-center items-center mt-5 w-full flex-col '>
        <div className='text-3xl font-bold'>
          Settings
        </div>
        <div className='border p-6 rounded-2xl flex justify-center items-center w-[80%] mt-10 flex-col shadow-md'>
          <div className='flex flex-col justify-center items-center'>
            <div className='text-xl font-semibold mb-10'>
              Bahasa App
            </div>
            <div className='flex gap-5 pb-5'>
              <p className='flex items-center bg-gray-700 px-4 py-1 rounded-xl text-white text-xs gap-1 cursor-pointer'>
                <Translate size={32} />
                Bahasa Indonesia
              </p>
              <p className='flex items-center text-gray-400 text-xs gap-1 border-2 px-4 py-1 rounded-lg'>
                <Translate size={32} />
                Bahasa Inggris
              </p>
            </div>
          </div>
        </div>

        <div className='border p-6 rounded-2xl flex justify-center items-center w-[80%] mt-10 flex-col shadow-md'>
          <div className='flex flex-col justify-center items-center pb-8'>
            <div className='text-xl font-semibold mb-10'>
              Tema App
            </div>
            <div className='flex gap-5'>
              <button onClick={handleDark} className='flex items-center bg-gray-700 px-4 py-1 rounded-xl text-white'>
                <Palette size={32} />
              </button>
              <button onClick={handleLight} className='flex items-center text-gray-400 border-2 px-4 py-1 rounded-xl'>
                <Palette size={32} />
              </button>
              <button onClick={handleGreen} className='flex items-center bg-green-700 text-white border-2 px-4 py-1 rounded-xl'>
                <Palette size={32} />
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <div className=' flex flex-col  justify-center items-center text-xl font-semibold mt-10 mb-5'>
            <p>
              Hubungi Kami ?
            </p>
            <b className='font-normal text-gray-400 text-xs'>Sistem Informasi III B</b>
          </div>
          <div className='flex gap-5'>
            <Link to='https://wa.me/6285779743074'>
              <WhatsappLogo size={32} className='text-gray-700'/>
            </Link>
            <Link to ='mailto:denisetiya009@gmail.com'>
              <Envelope size={32} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default settings