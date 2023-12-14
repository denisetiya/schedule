import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { Envelope, WhatsappLogo} from "@phosphor-icons/react";
import pp from '../assets/Default_pfp.jpg'
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";
import { Table } from 'flowbite-react';


export function Dosen() {

  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/dosen`,{
          
        });
        setData(response.data);
        setLoading(false);
    };

    fetchData();
}, []);


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
    <div className="flex flex-wrap gap-4 sm:gap-8 lg:ml-20 mt-10 justify-center ">
      <div className="overflow-x-auto w-full px-2">
        <h1 className="text-center font-bold text-xl text-gray-700 mb-20">Daftar Dosen Pengajar</h1>
      <Table hoverable className="w-full">
        <Table.Head>
          <Table.HeadCell>No</Table.HeadCell>
          <Table.HeadCell>Nama Dosen</Table.HeadCell>
          <Table.HeadCell className="text-center">Contact</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {data.map((item, index) => (
          
          <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
               {data.indexOf(item) + 1}
              </motion.div>
            </Table.Cell>
            <Table.Cell className="border">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.nama_dosen}
              </motion.div>
            </Table.Cell>
            <Table.Cell className="border">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex justify-center items-center"
                >
                  <Link to={`https://wa.me/62${item.no_hp}`}>
                      <WhatsappLogo size={25} className="text-gray-700"/>
                  </Link>
                  <Link to={`mailto:${item.email}`}>
                    <Envelope size={25} className="text-gray-700 ml-3"/>
                  </Link>
                </motion.div>
            </Table.Cell>
 
          </Table.Row>
        ))}
       
        </Table.Body>
      </Table>
    </div>
    </div>
  );
}