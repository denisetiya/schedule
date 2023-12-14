import React from 'react'
import { Table } from 'flowbite-react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Admintabs from '../../components/Admintabs'

function userDass() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/forget');
      const data = response.data;
      setData(data);
    }
    fetchData();
  },[]);




  return (
    <div>
     <div className='flex md:justify-center md:items-center w-full flex-col mt-9'>
      <Admintabs/>
      <div className='text-xl my-20 font-bold text-center'>List Lupa password</div>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Password lama</Table.HeadCell>
              <Table.HeadCell>Password baru</Table.HeadCell>
              <Table.HeadCell>Nomor hp</Table.HeadCell>
              <Table.HeadCell>Npm</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((item, index) => (
                
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                <Table.Cell>{item.username}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.passLama}</Table.Cell>
                <Table.Cell>{item.passBaru}</Table.Cell>
                <Table.Cell>{item.noHp}</Table.Cell>
                <Table.Cell>{item.npm}</Table.Cell>
              </Table.Row>
        
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default userDass