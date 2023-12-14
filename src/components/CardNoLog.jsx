
import { useState} from 'react';
import {motion} from 'framer-motion';
import { SignIn } from '@phosphor-icons/react';
export default function  CardNoLog() {

  const [data, setData] = useState([]);


  return (
    <div className=' items-center justify-center w-full'>
      <div className='flex w-full flex-wrap mt-10 gap-10 text-center justify-center items-center'>
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className='text-center flex flex-col items-center gap-1'
        >
         <div className='flex gap-2 justify-center items-center'>  
           Harap <b>Login</b> <SignIn size={32} />    terlebih dahulu
        </div> 
       
          untuk menikmati Fitur Lebih
        </motion.div>
      </div>
    </div>
  );
}
