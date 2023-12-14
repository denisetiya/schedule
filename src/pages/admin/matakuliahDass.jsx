import React from 'react'
import Admintabs from '../../components/Admintabs'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Table } from 'flowbite-react';

function matakuliahDass() {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/mk');
      const data = response.data;
      setData(data);
    }
    fetchData();
  },[])

  return (
    <div className='flex md:justify-center md:items-center w-full flex-col mt-9'>
    <Admintabs/>
    <div className='text-xl my-20 font-bold text-center'>List Matakuliah</div>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Kode Matakluiah</Table.HeadCell>
              <Table.HeadCell>Nama Matakuliah</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((item) => (
                
              <Table.Row key={item.kode_matkul} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                <Table.Cell>{item.kode_matkul}</Table.Cell>
                <Table.Cell>{item.nama_matkul}</Table.Cell>
              </Table.Row>
        
              ))}
            </Table.Body>
          </Table>
        </div>

    </div>
  )
}

export default matakuliahDass