
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './jadwal.css';
import {motion} from 'framer-motion';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';

function Jadwal() {
  const kelas = localStorage.getItem('kelas');
  const kosma = localStorage.getItem('kosma');
  const noHp = localStorage.getItem('noHp');
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = localStorage.getItem('status') === 'mahasiswa' ?
          `http://localhost:3000/all-jadwal/${kelas}` :
          `http://localhost:3000/all-jadwal-dosen/${noHp}`;

        const response = await axios.get(endpoint);
        const groupedByDay = groupDataByDay(response.data);
        setGroupedData(groupedByDay);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kelas, noHp]);

  const groupDataByDay = (data) => {
    return data.reduce((grouped, item) => {
      const day = item.hari;
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(item);
      return grouped;
    }, {});
  };

  const getDayName = (day) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[day];
  };

  if (loading) {
    return (
      <div className='md:ml-20 mt-8 flex flex-col gap-3'>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Skeleton key={index} active />
        ))}
      </div>
    );
  }


  return (
    <div className='md:ml-16 lg:28 mt-8 mb-20'>
      {Object.keys(groupedData).length === 0 ? (
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}

        className='flex flex-col mt-20 text-gray-600 justify-center items-center font-bold text-center'>
          Kamu Perlu Login Untuk Lihat jadwal Kamu
          <div>__ _ __ _ __</div>
          <div className='flex flex-col justify-center  items-center mt-32 font-semibold text-gray-500'>
            <p> 
              Ingin Cari jadwal ? 
            </p>
            <b className='text-gray-800'>kamu bisa gunakan fitur search</b>
          </div>
        </motion.div>
      ):(
        
  
      <div className="table--wrapper overflow-auto">
        {Object.entries(groupedData).map(([day, schedules], index) => (
          <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          key={day} className='mb-4'>
            <h3 className="main--title mb-4 mt-6">
              <b className='text-gray-500 text-2xl mb-3'>Hari {getDayName(day)}</b>
            </h3>
            <div className="table-container">
              <table className='border-2'>
                <thead>
                  <tr>
                    <th>Matakuliah</th>
                    <th>Gedung </th>
                    <th>Ruangan</th>
                    <th>Waktu</th>
                  {localStorage.getItem('status') == 'mahasiswa' ? (
                    null
                    
                  ) : (
                    <>
                      <th>Kelas</th>
                      <th>Note</th>
                      <th>Action</th>
                    </>
                  )}
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama_matkul}</td>
                      <td>{item.nama_gedung}</td>
                      <td>{item.nama_ruangan}</td>
                      <td>{item.jam}</td>
                      {localStorage.getItem('status') == 'mahasiswa' ? (
                          null
                          
                        ) : (
                          <>
                           <td>{item.kelas}</td>
                           <td><Link to ={`/jadwal/${item.id}`} className='text-green-700'>Tambah</Link></td>
                           <td><Link to ={`/jadwal-edit/${item.id}`} className='text-green-700'>Edit</Link></td>
                          </>
                        )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>
          )}
    </div>
  );
}

export default Jadwal;
