import React, { useEffect } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Input,
  Dialog,
  Card,
  CardBody,
  Checkbox,
  CardFooter,
  DialogHeader,
  DialogBody,
  DialogFooter,

} from "@material-tailwind/react";
import {
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

import Loading from "./loading";

import { Link } from "react-router-dom";
import { House, CalendarBlank, Buildings, IdentificationCard, MagnifyingGlass } from "@phosphor-icons/react";
import logo from '../assets/logo.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import defaultPfp from '../assets/Default_pfp.jpg';
import { motion } from "framer-motion"
import {
  BorderTopOutlined
} from '@ant-design/icons';




function ProfileMenu() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const nama = localStorage.getItem('nama');
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();
  const [img, setImg] = useState(null);


  const handleLogout = () => {
    localStorage.removeItem('npm');
    localStorage.removeItem('nama');
    localStorage.removeItem('kelas');
    localStorage.removeItem('token');
    localStorage.removeItem('img_url');
    localStorage.removeItem('prodi');
    localStorage.removeItem('angkatan');
    localStorage.removeItem('noHp');
    localStorage.removeItem('fakultas');
    localStorage.removeItem('email');
    localStorage.removeItem('status');
    localStorage.removeItem('countJadwal');
    localStorage.removeItem('showJadwal');
    localStorage.removeItem('showCount');
    navigate('/');
  }

 useEffect(() => {
   if(localStorage.getItem('img_url') !== null){
     setImg('http://localhost:3000/' + localStorage.getItem('img_url'))
   }

 },[nama])


 
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            className="border border-gray-900 p-0.5"
            src={defaultPfp || img} 
            
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">       
            <MenuItem
              onClick={closeMenu}
              className="flex flex-col gap-2 rounded "
            >
       
              <Typography
                as="span"
                variant="small"
                className="font-normal hover:bg-gray-200 px-2 w-full rounded-lg "
              >
                {nama}
                {localStorage.getItem('status') =='dosen' ? (
                null
                ):(
                <p>
                 Kelas {localStorage.getItem('kelas')}
                </p>
                )}
              </Typography>         
              <Link to = '/profile' className="w-full">
              <Typography
                as="span"
                variant="small"
                className="font-normal hover:bg-gray-200 px-2 w-full rounded-lg w-full "
              >
              
                 Profile
         
              </Typography>
              </Link>

              <Link to = '/settings' className="w-full">
              <Typography
                as="span"
                variant="small"
                className="font-normal hover:bg-gray-200 px-2 w-full rounded-lg "
              >
                Settings
              </Typography>
              </Link>
              <Typography
                as="span"
                variant="small"
                className="font-normal hover:bg-gray-200 px-2 w-full rounded-lg text-red-500"
                onClick={handleLogout}
              >
                Logout
              </Typography>
            </MenuItem>
      </MenuList>
    </Menu>
  );
}
 

 
export default function NavbarX() {

  const [password, setPassword] = useState('');
  const [npm, setNpm] = useState('');
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [noHp, setNoHp] = useState('');
  const [title, setTitle] = useState('');
  // const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [opens, setOpens] = useState(false);


  const handleLogin = async (e) => {
    setLoading(true);
    if(!checked){
      e.preventDefault();
      axios.post('http://localhost:3000/login-mahasiswa', {
          npm: npm,
          password: password
      })
      .then((res) => {
          if (res.data.message === 'Login Success') {
              const data = res.data.result[0]
              localStorage.setItem('img_url', data.foto_mahasiswa);
              localStorage.setItem('npm', data.npm);
              localStorage.setItem('nama', data.nama_mahasiswa);
              localStorage.setItem('kelas', data.kelas);
              localStorage.setItem('status', 'mahasiswa');
              localStorage.setItem('img_url', data.foto_mahasiswa);
              localStorage.setItem('showJadwal', 1);
;

              setStatus('Login Success');
              setOpens(true);
              setOpen((cur) => !cur);
              setLoading(false);
              navigate('/');
             
             
          }else {
              alert(res.data.message);
              setStatus(res.data.message);
          }
      })
      .catch((err) => {
          console.log(err);
          setStatus('Npm or Password is incorrect');
          setOpens(true);
          setLoading(false);
          navigate('/');
      })
    }
    // dosen login
    else if(checked){

      e.preventDefault();
      axios.post('http://localhost:3000/login-dosen', {
        noHp: noHp,
        password: password
    }) .then((res) => {
        if (res.data.message == 'Login Success') { 
            const data = res.data.result[0]
            localStorage.setItem('token', data.id);
            localStorage.setItem('noHp', data.no_hp);
            localStorage.setItem('nama',data.gelar_depan + ' ' + data.nama_dosen + ' ' + data.gelar_belakang);
            localStorage.setItem('email', data.email);
            localStorage.setItem('img_url', data.foto_dosen);
            localStorage.setItem('showJadwal', 1);
            localStorage.setItem('status', 'dosen')
            setStatus('Login Success');
            setOpens(true);
            setOpen((cur) => !cur);
            setLoading(false);
            navigate('/');
        }else {
            alert(res.data.message);
            setStatus(res.data.message);
        }
    })
    .catch((err) => {
        console.log(err);
        setStatus('Phone number or Password is incorrect error');
        setOpens(true);
        setLoading(false);
        navigate('/');
    })
  }

  }
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  if(loading){
    return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Loading />
    </div>
    )
  }




  return (
    <motion.div
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    transition={{ duration: 1, delay: 0.8 }}
    className={localStorage.getItem('style')}>

        <div className="z-30 w-screen shadow-md rounded-xl md:shadow-none border-b z=10 bg-white fixed p-2 lg:pl-6 top-0">
          <div className="relative flex items-center justify-between text-blue-gray-900">
            <img src={logo} width={40} alt="" className="ml-5 object-cover" />
            <Typography
              className="hidden md:flex mr-4 ml-2 cursor-pointer py-1.5 font-extrabold"
            >
              Virtual Schedule Class
            </Typography>
            <div className="flex items-center justify-center lg:ml-32 w-[60%] ml-10 xl:w-[60%] 2xl:w-[70%]">
              <div className="relative w-full">
                <input type="text" className=" rounded-3xl w-[80%] pl-10 " onChange={(e) => setTitle(e.target.value)} placeholder="Search..." onKeyDown={(e) => e.key === 'Enter' && navigate(`/search/${title}`)}/>
                <MagnifyingGlass size={25} className=" absolute top-2 left-2 text-gray-600" />
              </div>
            </div>

            {localStorage.getItem('npm') == null && localStorage.getItem('noHp') == null ? (
              <button className="bg-gray-600 mr-3 px-4 py-1 rounded-2xl text-white mr-5" onClick={handleOpen}  icon={<BorderTopOutlined />}>
                Login
              </button>
              
            ) : (
            <ProfileMenu />
            )}
          </div>
          <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
          >
            <Card className="mx-auto w-full max-w-[24rem]">
              <CardBody className="flex flex-col gap-4">
                  <Typography variant="h4" color="blue-gray">
                    Sign In
                  </Typography>
                  <Typography
                    className="mb-3 font-normal"
                    variant="paragraph"
                    color="gray"
                  >
                    Masukan Data dengan benar
                  </Typography>
                  
                  <Input label="Npm or Phone Number"  size="lg" onChange={(e) => {
                    setNpm(e.target.value);
                    setNoHp(e.target.value);
                  }} />
       
                  <Input label="Password" type="" size="lg" onChange={(e) => setPassword(e.target.value)}/>
                  <div className="-ml-2.5 -mt-3">
                    <Checkbox label="Login Sebagai Dosen" checked={checked} onChange={() => setChecked(!checked)}  />
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="gradient" onClick={handleLogin} fullWidth>
                    Login
                  </Button>
                  <Typography variant="small" className="mt-4 flex justify-center">
                    Lupa Password?
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="ml-1 font-bold"
                      onClick={handleOpen}
                    >
                      <Link to="/forget">
                        Klik disini
                      </Link>
                    </Typography>
                  </Typography>
                </CardFooter>
              </Card>
            </Dialog>
            <div>

            <Dialog open={opens} handler={() => setOpens(false) } size="xs">
                <DialogHeader>Hello </DialogHeader>
                <DialogBody>
                  {status}
                </DialogBody>
                <DialogFooter>

                  <Button variant="gradient" color="gray" onClick={() => setOpens(false) && setOpen((cur) => cur) && setStatus('')} >
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>

            </div>
        </div>
      <div>
      <div className="shadow-xl fixed pt-10 top-16 h-screen w-52 lg:w-72 hidden md:block px-3 pb-4 overflow-y-auto bg-white border-r z-20">
            <ul className="space-y-2 font-medium">
              <li>
                  <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <House size={32} />
                    <span className="ms-3">Beranda</span>
                  </Link>
              </li>
              <li>
                  <Link to ="/jadwal" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <div className='relative'>
                      <div className='absolute top-3 right-[9px] text-xs font-extrabold' >{new Date().getDate()}</div>
                      <CalendarBlank size={32} />
                    </div>

                     <span className="flex-1 ms-3 whitespace-nowrap">Jadwal</span>
{/*                    
                    {
                      localStorage.getItem('npm') !== null && localStorage.getItem('countJadwal') !== 0 ? 
                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-100 bg-gray-400 rounded-full dark:bg-gray-700 dark:text-gray-300">{localStorage.getItem('countJadwal')}
                    </span> : null
                    } */}
                  </Link>
              </li>
              <li>
                  <Link to="/fakultas" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <Buildings size={32} />
                    <span className="flex-1 ms-3 whitespace-nowrap">Fakultas</span>
                  </Link>
              </li>
              <li>
                  <Link to="/dosen" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <IdentificationCard size={32} />
                    <span className="flex-1 ms-3 whitespace-nowrap">Dosen</span>
                  </Link>
              </li>

            </ul>
        </div>
        <div className="md:hidden bg-white fixed bottom-0 shadow-2xl w-full border-2 items-center justify-center rounded-t-3xl z-50">
          <ul className="space-y-2 font-medium flex items-center justify-between mx-10">
                <li>
                    <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <House size={32} />
                    </Link>
                </li>
                <li>
                    <Link to ="/jadwal" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <div className='relative'>
                        <div className='absolute top-3 right-[9px] text-xs font-extrabold' >{new Date().getDate()}</div>
                        <CalendarBlank size={32} />
                      </div>
                    </Link>
                </li>
                <li>
                    <Link to="/fakultas" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <Buildings size={32} />
                    </Link>
                </li>
                <li>
                    <Link to="/dosen" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <IdentificationCard size={32} />
                    </Link>
                </li>

              </ul>
        </div>
      </div>
    </motion.div>
  );
}