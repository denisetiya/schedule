

import { Card } from 'flowbite-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';
import { WhatsappLogo, Envelope, DotsThreeCircle,Eye } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';
import noSchedule from '../assets/noSchedule.png'

export default function  CardCom() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const status = localStorage.getItem('status');
  const [count, setCount] = useState(0);
useEffect(() => {
  setLoading(true);

  const fetchData = async () => {
    const kelas = localStorage.getItem('kelas');
    const hari = new Date().getDay();

    try {
      let response;
      if (status === 'mahasiswa') {
        response = await axios.get(`http://localhost:3000/jadwal/${hari}/${kelas}`);
      } else if (status === 'dosen') {
        const noHp = localStorage.getItem('noHp');
        response = await axios.get(`http://localhost:3000/all-jadwal-dosen/${hari}/${noHp}`);
      }

      if (response.data === 'tidak ada jadwal') {
        setData([]);
        localStorage.setItem('countJadwal', 0);
        localStorage.setItem('showJadwal', 0);
        localStorage.setItem('showCount', 0);
        localStorage.setItem('countJadwal', data.length);
        setCount(0)
      } else {
        setData(response.data);
        localStorage.setItem('countJadwal', data.length);
        localStorage.setItem('showJadwal', 1);
        localStorage.setItem('showCount', 1);
        setCount(1)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [status]);


  if (loading) {
    return(
      <div className='md:ml-20 mt-8 flex flex-col gap-3'>
        <Skeleton active />
        <Skeleton active />
      </div>
    ) 
  }
  else{
  return (
    <div className=''>
      { count !== 0 ? (
        <div className=' items-center justify-center mt-14'>
          <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='text-center font-bold'>Berikut Jadwal kamu hari ini</motion.h1>
          <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className='text-center'> -- ---  --</motion.div>
          <div className='flex w-full flex-wrap mt-10 gap-10 items-center justify-center'>
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
                    <p className="font-semibold text-xs text-gray-500 dark:text-gray-400 ">
                      {data.dosen_pengampu}
                    </p>
                  </div>
                  <div className='flex flex-col text-xs'>
                    <p>
                      Waktu : {data.jam}
                    </p>
                    <p>
                      Ruangan : {data.nama_ruangan}
                    </p>
                    <p>
                      Gedung : {data.nama_gedung}
                    </p>
                    <p>
                      {localStorage.getItem('status') === 'dosen' ? (
                        <p>
                          Kelas : {data.kelas}
                        </p>
                      ): (null)}
                    </p>
                    {
                      data.note !== null ? (
                        <p>
                          Note : {data.note}
                        </p>
                        
                      ): null
                    }
            
                  </div>
                  <div className='flex gap-2 items-center relative'>
                    <Link to={`https://wa.me/62${data.no_hp}`}>
                      <WhatsappLogo size={25} />
                    </Link>
                    <Link to={`mailto:${data.email}`}>
                      <Envelope size={25} className="text-gray-700"/>
                    </Link>
                    {localStorage.getItem('status') === 'mahasiswa' ? (
                      null
                    ): (
                    <Link to ={`/jadwal/${data.id}`}>
                      <DotsThreeCircle size={25} />
                    </Link>
                      )}
                      <p className='text-xs font-bold absolute bottom-0 right-0'>
                        {data.keterangan}
                      </p>
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

                className='flex flex-col w-full mt-16 items-center justify-center font-bold'>
                  Kamu tidak ada jadwal Hari ini
                  <div className='mt-20'>
                    <img src={noSchedule} alt="" width={200}/>
                  </div>
                </motion.div>
              )
    }
    </div>
  );
  }
}
