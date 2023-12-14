import React from 'react'
import { Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/loading'
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'

function ruangan() {

  const [hari, setHari] = useState(new Date().getDay());
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);
  const sekarang = new Date();
  const jam = sekarang.getHours().toString().padStart(2, '0');
  const menit = sekarang.getMinutes().toString().padStart(2, '0');
  const detik = sekarang.getSeconds().toString().padStart(2, '0');

  useEffect(() => {
    const now = `${jam}:${menit}:${detik}`
    const fetchData = async () => {
      setLoading(true);

      try {        
        const response = await axios.get(`http://localhost:3000/ruangan/${hari}/${now}`,{
          hari : hari,
          jam : now
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    };
    fetchData();  

  }, [hari]);

  if (loading) {
    return (
    <div className='flex w-full h-[70vh] justify-center items-center'>
      <Loading />
    </div>)
  }


  return (
    <div className='lg:ml-20  mt-8'>
  <div className="overflow-x-auto">
    <h1 className='text-center mt-16 mb-10 font-bold text-xl text-gray-700'>Daftar Ruangan</h1>
      <Table hoverable className='border rounded-md'>
        <Table.Head className='border'>
          <Table.HeadCell>Ruangan</Table.HeadCell>
          <Table.HeadCell>Gedung</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>More</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item,index ) => ( 
           
              <Table.Row  className="bg-white border dark:border-gray-700 dark:bg-gray-800" key={index}>
                <Table.Cell className="border whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: index * 0.1}}>
                    {item.nama_ruangan}
                  </motion.div>
                </Table.Cell>
                <Table.Cell className='border'>
                  <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: index * 0.1}}>
                    {item.nama_gedung}
                  </motion.div>
                </Table.Cell>
                <Table.Cell className=''>
                  <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: index * 0.1}}>
                   {item.status}
                  </motion.div>
                </Table.Cell>
                <Table.Cell className='text-green-600 border'>
                  <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5, delay: index * 0.1}}>
                    {item.status =='not available' ? (null) :(
                    <Link to={`/view/${item.nama_ruangan}`}>View</Link>
                    )}
                  </motion.div>
                </Table.Cell>
              </Table.Row>
                   
          ))}
         
        </Table.Body>
      </Table>
    </div>
    </div>
  )
}

export default ruangan