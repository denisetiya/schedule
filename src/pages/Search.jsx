import React from 'react'

import { Card } from 'flowbite-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';
import { WhatsappLogo, Envelope, DotsThreeCircle } from '@phosphor-icons/react';
import { Link, useParams } from 'react-router-dom';
import { Skeleton } from 'antd';

function Search() {

  const { title } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
      const fetchData = async () => {
  
        try {
          const response = await axios.get(`http://localhost:3000/search/${title}`)
          const datas = []
          datas.push(response.data);
          if (datas[0].length == 0) {
            setData([])
            setLoading(false);
          }
          else {
            setData(datas[0]);
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
          setLoading(false);

        }
      }
    fetchData();
    
  }, [title]);

  if (loading) {
    return(
      <div className='md:ml-20 mt-8 flex flex-col gap-3'>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    ) 
  }

  return (
    <div>
      {data.length !== 0 ? (
      <div className=' items-center justify-center mt-14'>
       <div className='flex w-full flex-wrap mt-10  gap-10 items-center justify-center xl:px-10'>
        {data.map((data, index) => (
          <motion.div key={data.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5,delay: index*0.1 }}

          >
               <Card className="w-[310px] shadow-xl lg:w-[370px]"   horizontal>
              <div className='flex flex-col'>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data.nama_matkul}
                </h5>
                <p className="font-normal text-sm text-gray-700 dark:text-gray-400 ">
                  {data.dosen_pengampu}
                </p>
              </div>
              <div className='flex flex-col text-xs'>
                <p>
                  Waktu : Day {data.hari}, {data.jam}
                </p>
                <p>
                  Ruangan : {data.nama_ruangan}
                </p>
                <p>
                  Gedung : {data.nama_gedung}
                </p>
                <p>
                  Kelas : {data.kelas}
                </p>
              </div>
              <div className='flex gap-2'>
                <Link to="">
                  <WhatsappLogo size={25} />
                </Link>
                <Link>
                  <Envelope size={25} />
                </Link>
                {/* <Link>
                  <DotsThreeCircle size={25} />
                </Link> */}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
      )
        : (
          <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className='flex justify-center items-center mt-52 font-bold'
          >
            Jadwal tidak ditemukan
          </motion.div>
        )
      }
    </div>
  )
}

export default Search