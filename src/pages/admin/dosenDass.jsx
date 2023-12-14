import React from 'react'
import Admintabs from '../../components/Admintabs'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Table } from 'flowbite-react';

function dosenDass() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/dosen');
      const data = response.data;
      setData(data);
    }
    fetchData();
    
  },[])


  return (
    <div className='flex md:justify-center md:items-center w-full flex-col mt-9'>
      <Admintabs/>
      
      <div className='text-xl my-20 font-bold text-center'>List Dosen</div>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Nama Dosen</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Nomer Hp</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((item) => (
                
              <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.gelar_depan} {item.nama_dosen} {item.gelar_belakang}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>0{item.no_hp}</Table.Cell>
              </Table.Row>
        
              ))}
            </Table.Body>
          </Table>
        </div>

    </div>
  )
}

export default dosenDass