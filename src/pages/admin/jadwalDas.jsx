import React from 'react'
import Admintabs from '../../components/Admintabs'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

function jadwalDas() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/jadwal');
      const data = response.data;
      setData(data);
    }
    fetchData();
    
  },[])


  return (
    <div className='flex md:justify-center md:items-center w-full flex-col mt-9'>
      <Admintabs/>

      <div className='text-xl my-20 font-bold text-center'>List Jadwal</div>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Kode Jadwal</Table.HeadCell>
              <Table.HeadCell>nama matakuliah</Table.HeadCell>
              <Table.HeadCell>nama ruangan</Table.HeadCell>
              <Table.HeadCell>nama dosen</Table.HeadCell>
              <Table.HeadCell>hari</Table.HeadCell>
              <Table.HeadCell>jam</Table.HeadCell>
              <Table.HeadCell>kelas</Table.HeadCell>
              <Table.HeadCell>action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((item) => (
                
              <Table.Row key={item.kode_gedung} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                <Table.Cell>{item.kode_gedung}</Table.Cell>
                <Table.Cell>{item.nama_gedung}</Table.Cell>
              </Table.Row>
        
              ))}
            </Table.Body>
          </Table>
        </div>
      
    </div>
  )
}

export default jadwalDas