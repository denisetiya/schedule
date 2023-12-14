import React from 'react'
import Admintabs from '../../components/Admintabs'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

function RuanganDass() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/ruangan');
      const data = response.data;
      setData(data);
    }
    fetchData();  
  },[])

  return (
    <div className='flex md:justify-center md:items-center w-full flex-col mt-9'>
      <Admintabs/>
      <div className='text-xl my-20 font-bold text-center'>List Ruangan</div>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Kode Ruangan</Table.HeadCell>
              <Table.HeadCell>Nama Ruangan</Table.HeadCell>
              <Table.HeadCell>Kode Gedung</Table.HeadCell>
              <Table.HeadCell>Detail Lokasi</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((item) => (
                
              <Table.Row key={item.kode_ruangan} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                <Table.Cell>{item.kode_ruangan}</Table.Cell>
                <Table.Cell>{item.nama_ruangan}</Table.Cell>
                <Table.Cell>{item.kode_gedung}</Table.Cell>
                <Table.Cell>{item.detail_lokasi}</Table.Cell>
                <Table.Cell><Link to={`/ruangan-edit/${item.kode_ruangan}`}>Edit</Link> | <Link to={`/ruangan-delete/${item.kode_ruangan}`}>Delete</Link></Table.Cell>
              </Table.Row>
        
              ))}
            </Table.Body>
          </Table>
        </div>

    </div>
  )
}

export default RuanganDass