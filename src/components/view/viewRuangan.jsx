import React from 'react'
import './style.css'
import { useParams,useNavigate, Link } from 'react-router-dom'
import { useEffect,useState } from 'react';
import axios from 'axios';
import Loading from '../loading'


function viewRuangan() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const response = await axios.post(`http://localhost:3000/show-jadwal/`, {
        ruangan : id,
        waktu : new Date().getHours()
      });

      console.log(response.status)

      if (response.status === 201) {
        setMenu(true);
        const response = await axios.post(`http://localhost:3000/ruangan-view`,{
          id : id
        });
        const data = response.data;
        setData(data[0]);
        setLoading(false);
      } else{
        setMenu(false);
      const data = response.data;
      setData(data);
      setLoading(false);
      }
    }
    fetchData();
  
  },[])
  
  if (loading) {
    return <div><Loading/></div>;
  }
  
  return (
    <div>
        <div className="container">
          <div className="flex flex-col justify-center items-center mt-20">
              <h2 className='text-3xl font-bold'>Detail ruangan</h2>
              <div className="flex gap-2 justify-center flex-col mt-10">
                {menu == true ? (
                  <div className="flex fl gap-4 flex-col justify-center items-center shadow-lg rounded-xl border pb-6 md:pb-0 md:flex-row md:pr-4 bg-[url(./rm380-14.jpg)] bg">
                      <img className="w-72 rounded-xl" src={`http://localhost:3000/assets/room/${id.substring(2)}.jpg`} alt="" />
                      <div className="textdetail">
                          <p className='text-sm font-bold'>Ruangan : {data.nama_ruangan} </p>
                          <p className='text-sm font-bold'>Lokasi : Sistem Informasi B, {data.detail_lokasi} </p>
                          <p className='text-sm font-bold text-green-700'>Status : Tidak Digunakan </p>
                          {/* <p>Pengguna : - </p>
                          <p>Matakuliah : - </p>
                          <p>Dosen Pengampu : </p>
                          <p>Waktu : </p> */}
                      </div>
                  </div>

                ) : (
                  <div className="flex gap-4 justify-center items-center shadow-lg rounded-xl border pr-4 bg-[url(./rm380-14.jpg)] bg">
                      <img className="w-72 rounded-xl" src={`http://localhost:3000/assets/room/${id.substring(2)}.jpg`} alt="" />
                      <div className="textdetail">
                        <p className='text-sm font-bold'>Ruangan : {data.nama_ruangan} </p>
                        <p className='text-sm font-bold'>Lokasi : Sistem Informasi B, {data.detail} </p>
                        <p className='text-sm font-bold text-red-700'>Status : Digunakan</p>
                        <p className='text-sm font-bold'>Pengguna : {data.kelas}</p>
                        <p className='text-sm font-bold'>Matakuliah : {data.nama_matkul}</p>
                        <p className='text-sm font-bold'>Dosen Pengampu : {data.dosen_pengampu}</p>
                        <p className='text-sm font-bold'>Waktu : {data.jam}</p>
                      </div>
                  </div>

                )}

              </div>
            </div>
          </div>
    </div>
  )
}

export default viewRuangan