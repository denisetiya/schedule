import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function PriviewJadwal() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('');
  const [tipe, setTipe] = useState('');
  
  const [note, setNote] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3000/get-jadwal/${id}`);
      const data = response.data;
      setData(data);
    }
    fetchData();
  }, [id]);

  const handleSubmit = async() => {
    const keterangan = `${status + ' ' + tipe}`
    
      await axios.put(`http://localhost:3000/update-status-jadwal/${id}`,{
          keterangan: keterangan,
          note: note,
          kelas: data[0].kelas
      }) .then((res) => {
        if(res.status === 200){
          navigate('/')
        }
        else{
          alert(res.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='flex w-full justify-center items-center flex-col gap-10 mb-20 '>
      {data.map((item) => (
        <div key={item.id} className='flex p-8 rounded-xl w-80 lg:w-[800px] border shadow-xl flex-col gap-3'>
          <div className='text-2xl font-extrabold'>
            {item.nama_matkul}
          </div>
          <div>
            <div className='text-base mt-2'>
              {item.jam}
            </div>
            <div>
              Ruangan : {item.nama_ruangan}
            <div>
              Kelas : {item.kelas}
            </div>
            </div>
          </div>

          <div>
            <div>
              Semester : {(item.angkatan) - 2020}
            </div>
            <div>
              Prodi : {item.prodi}
            </div>
            <div>
              Gedung :{item.nama_gedung}
            </div>
          </div>
        </div>
      ))}
      <div className='flex flex-col gap-3'>
        <textarea type="text" placeholder='Tambahkan Catatan ' onChange={(e) => setNote(e.target.value)}  className='rounded-xl w-full lg:w-[700px]'/>

        <h1 className='text-xl font-bold mt-5'>Status Perkuliahan</h1>
        <div className='flex gap-4 '>
          <div className='flex gap-2 items-center'>
            <input type="radio" name="statusPerkuliahan" value="masuk" onChange={ (e) => setStatus(e.target.value)} />
            <p>Masuk</p>
          </div>
          <div className='flex gap-2 items-center'>
            <input type="radio" name="statusPerkuliahan" value="tidakMasuk"  onChange={(e) => setStatus(e.target.value)}/>
            <p>Tidak Masuk</p>
          </div>
        </div>


        <h1 className='text-xl font-bold mt-5'>Tipe Perkuliahan</h1>
        <div className='flex gap-4'>
          <div className='flex gap-2 items-center'>
            <input type="radio" name="tipePerkuliahan" value="luring" onChange={(e) => setTipe(e.target.value)} />
            <p>Luring</p>
          </div>
          <div className='flex gap-2 items-center'>
            <input type="radio" name="tipePerkuliahan" value="daring" onChange={(e) => setTipe(e.target.value)}/>
            <p>Daring</p>
          </div>
          <div className='flex gap-2 items-center'>
            <input type="radio" name="tipePerkuliahan" value="Kosongkan" />
            <p>Kosongkan</p>
          </div>
        </div>

        <button onClick={handleSubmit} className='bg-gray-500 hover:bg-gray-700 mt-10 text-white font-bold py-2 px-4 rounded'>Submit</button>


      </div>
    </div>
  )
}

export default PriviewJadwal