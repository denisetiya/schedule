import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardCom from '../components/card';
import CardNoLog from '../components/CardNoLog';
import {motion} from 'framer-motion';
import { Skeleton } from 'antd';
import {dotenv} from 'dotenv';


function Home() {
    const npm = localStorage.getItem('npm');
    const noHp = localStorage.getItem('noHp');
    const [data, setData] = useState([])
    const [sapa, setSapa] = useState('')
    const [nama, setNama] = useState('')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const style = localStorage.getItem('style')
    const hari = new Date().getDay();
    const base = import.meta.env.BASE_URL;
    console.log(base);

    useEffect(() => {
      
        const fetchData = async () => {
          try {

            setLoading(true);
            const response = await axios.get(`http://localhost:3000/mahasiswa/${npm}`);
            const userData = response.data[0];
            if (userData.kosma){
              localStorage.setItem('kosma', true);
            }
            else {
              localStorage.setItem('kosma', false);
            }
        
            setData([userData]);
            setNama(userData.nama_mahasiswa);
            localStorage.setItem('nama', userData.nama_mahasiswa);
            localStorage.setItem('kelas', userData.kelas);
            localStorage.setItem('prodi', userData.prodi);
            localStorage.setItem('angkatan', userData.angkatan);
            localStorage.setItem('status', 'mahasiswa');
            localStorage.setItem('npm', npm);
            localStorage.setItem('email', userData.email);
            localStorage.setItem('img_url', userData.foto_mahasiswa );
            
            localStorage.setItem('kosma', userData.kosma);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        if (npm !== null) {
          fetchData();
        } else if (noHp !== null) {
          setNama(localStorage.getItem('nama'));
        } else {
          navigate('/');
        }

        if(hari == 0){
          const kelas = localStorage.getItem('kelas');
          axios.put(`http://localhost:3000/update-note/${kelas}`)
        }

        if(localStorage.getItem('token') == 'tes'){
          navigate('/admin')
        }

        
      }, [npm, noHp, hari]);



   useEffect(() => {       
       const today = new Date().getHours();
       if (today > 0 && today < 12) {
            setSapa('Selamat Pagi')
        }
        else if (today >= 12 && today < 15) {
            setSapa('Selamat Siang')
        }
        else if (today >= 15 && today < 18) {
            setSapa('Selamat Sore')
        }
        else {
            setSapa('Selamat Malam')
        }
   }, [])


   if (loading) {
    return(
      <div className='md:ml-20 mt-8 flex flex-col gap-3'>
        <Skeleton active />
        <Skeleton active />
      </div>
    ) 
  }
  return (
    <div>
        <div className='flex justify-center items-center w-full '>
            <div className='flex flex-col sm:w-[90%]'>
                <div className='flex-col justify-center items-center w-full'>
                    <motion.h3
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className='font-extrabold text-lg mt-20 text-center'>
                        {sapa + ' '}
                        {localStorage.getItem('npm') !== null || localStorage.getItem('noHp') !== null ? nama : 'User'}
                    <p className='font-normal text-base text-'>
                        Welcome to Virtual Schedule Class
                    </p>
                    </motion.h3>

                </div>
                <div className='mt-1 text-md text-gray-700'>
                  <div>
                  {(localStorage.getItem('npm') !== null || localStorage.getItem('noHp') !== null) ? <CardCom /> : <CardNoLog />}
                  </div>
              
                </div>
            </div>
        </div>


    </div>
  )
}

export default Home