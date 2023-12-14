import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/loading';
function forget() {

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [noHp, setNoHp] = useState('')
  const [npm, setNpm] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [lastPassword, setLastPassword] = useState('')
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const handleSubmit = async () => {
    if (password === confirmPassword) {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/forget', {
                username: nama,
                email: email,
                oldPassword: lastPassword,
                newPassword: password,
                noHp: noHp,
                npm: npm
            });

 

            if (response.status === 200) {
                setLoading(false);
                alert('Silahkan tunggu email dari admin');
                navigate('/waiting');
            } else {
                setLoading(false);  
                alert('Terjadi kesalahan. Silahkan coba lagi.');
                console.log(response.data);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            alert('Terjadi kesalahan. Silahkan coba lagi.');
        }
    } else {
        setLoading(false);
        alert('Password tidak sesuai');
    }
};

if(loading){
  return <div className=' mt-48 flex justify-center items-center'><Loading/></div>
}

  return (
    <div>
      <div>
        <div className='mt-20'>
          <form action="post" className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-xl mb-8 font-bold'>Masukan Data Diri dengan benar</h1>
            <input type="text" required placeholder='Nama' className='rounded-xl w-[80%]' onChange={(e) => setNama(e.target.value)}/>
            <input type="email" required placeholder='Email' className='rounded-xl w-[80%]' onChange={(e) => setEmail(e.target.value)}/>
            <input type="number" placeholder='NPM ' className='rounded-xl w-[80%]' onChange={(e) => setNpm(e.target.value)}/>
            <input type="number" required placeholder='Nomor HP / Wa' className='rounded-xl w-[80%]' onChange={(e) => setNoHp(e.target.value)}/>
            <input type="password" required placeholder='Password Terakhir Dingat' className='rounded-xl w-[80%]' onChange={(e) => setLastPassword(e.target.value)}/>
            <input type="password" required placeholder='password baru' className='rounded-xl w-[80%]' onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" required placeholder='konfirmasi password' className='rounded-xl w-[80%]' onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button type='submit' onClick={handleSubmit}  className='bg-gray-600 px-4 py-1 rounded-xl w-[80%] text-white'>Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default forget