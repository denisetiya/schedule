import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import pp from '../assets/Default_pfp.jpg'
import Loading from '../components/loading'

function editProf() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const status = localStorage.getItem('status');
  const [loading, setLoading] = useState(false);


  const [img, setImg] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('nama'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const url = img ? URL.createObjectURL(img) : null;

  useEffect(() => {
    setImage(`http://localhost:3000/${localStorage.getItem('img_url')}`);
  },[username,email])

  const handleUpdate = async() => {
    if (!username || !email ) {
      setLoading(true);
      alert('Please fill in all fields');
      setLoading(false);
      return;

    }

    else if (img !==null){
      setLoading(true);
      if (status == 'mahasiswa'){
        await axios.put(`http://localhost:3000/update-mahasiswa/${id}`,{
          username: username,
          email: email,
          img: img
        },{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': true,
          }
        })
        .then((res) => {
          if(res.status === 200){
            setLoading(false);
            alert('Profile updated successfully')
            navigate('/')
          }
          else{
            setLoading(false);
            alert(res.data.message)
          }
        }).catch((err) => {
          setLoading(false);
          console.log(err)
        })
      }
      else if (status == 'dosen'){
        setLoading(true);
        await axios.put(`http://localhost:3000/update-dosen/${id}`,{
          username: username,
          email: email,
          img: img
        },{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': true,
          }
        })
        .then((res) => {
          if(res.status === 200){
            localStorage.setItem('nama', username)
            localStorage.setItem('email', email)
            setLoading(false);
            alert('Profile updated successfully')
            navigate('/')
          }
          else{
            setLoading(false);
            alert(res.data.message)
          }
        }).catch((err) => {
          setLoading(false);
          console.log(err)
        })
      }

    }
    else{

      if (status == 'mahasiswa'){
        setLoading(true);
        await axios.put(`http://localhost:3000/updateMahasiswa/${id}`,{
          username: username,
          email: email,
        })
        .then((res) => {
          if(res.status === 200){
            setLoading(false);
            alert('Profile updated successfully')
            navigate('/')
          }
          else{
            setLoading(false);
            alert(res.data.message)
          }
        }).catch((err) => {
          setLoading(false);
          console.log(err)
        })
      }
      else if (status == 'dosen'){
        setLoading(true);
        await axios.put(`http://localhost:3000/updateDosen/${id}`,{
          username: username,
          email: email,
        })
        .then((res) => {
          if(res.status === 200){
            setLoading(false);
            localStorage.setItem('nama', username)
            localStorage.setItem('email', email)
            navigate('/')
            alert('Profile updated successfully')
          }
          else{
            setLoading(false);
            alert(res.data.message)
          }
        }).catch((err) => {
          setLoading(false);
          console.log(err)
        })
      }
    }
  }

  const handleBack = () => {

    navigate('/profile')
  }
  
  if(loading){
    return <div className=' mt-48 flex justify-center items-center'><Loading/></div>
  }
  return (
    <div className='mb-28'>
      <div>
      <div className='mt-3 mb-10 flex justify-center font-bold text-3xl'>
        Account Settings
      </div>
      <div className='flex justify-center items-center'>
          <Link to={`/editProfile/${id}`} className='bg-gray-700 px-4 py-1 text-white rounded-md rounded-r-none text-xs font-semibold'  >
            General
          </Link>
          <Link to={`/change-password/${id}`} className='border-2 px-4 py-1 rounded-md rounded-l-none text-xs font-semibold'>
            Change Password
          </Link>
        </div>
        <div className='flex flex-col gap-5 justify-center items-center border-2 shadow-md lg:ml-14 rounded-xl py-10 mt-3'>
          <div className='text-2xl font-bold'>
            Profile Update
          </div>
          <div className='flex flex-col gap-4'>
          <img src={url || image} alt=""  className='w-[150px] h-[150] rounded-full border-dotted border'  />
              <label htmlFor="file" className='bg-gray-700 px-4 py-1 text-white rounded-md text-center'>Upload</label>
              <input type="file" name='file' id='file' onChange={(e) => setImg(e.target.files[0])} className='hidden' />
          </div>
          <div className='w-[90%]'>
            <p className='text-start'>Username</p>
            <input required type="text" placeholder="Username" className='rounded-xl w-full' value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className='w-[90%]'>
            <p className='text-start'>Email</p>
            <input required type="email" placeholder='Email' className='rounded-xl w-full' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className='flex justify-end w-full mr-10 gap-4'>
            <button onClick={handleUpdate} className='bg-gray-700 p-2 mt-5 text-white rounded-xl mb-4 text-xs font-bold hover:bg-white hover:text-gray-700 transition-all duration-150 hover:border'>
              Save Changes
            </button>
            <button onClick={handleBack} className='h p-2 mt-5 border px-4 rounded-xl mb-4 text-xs font-bold hover:bg-gray-700 hover:text-white transition-all duration-100'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default editProf