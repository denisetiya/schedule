import { Routes, Route,Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Jadwal from "./pages/jadwal/Jadwal"
import JadwalEdit from "./pages/jadwal/editJadwal"
import Fakultas from "./pages/fakultas/Fakultas"
import { Dosen } from "./pages/dosen"
import profile from "./pages/profile"
import PriviewJadwal from "./pages/PriviewJadwal"
import editProf from "./pages/editProf"
import upProfile from './pages/editProfile/profile'
import changePass from "./pages/changePass"
import settings from "./pages/settings"
import ruangan from "./pages/ruangan"
import forget from "./pages/forget"
import waiting from "./pages/waiting"
import admin from "./pages/admin/adminDass"
import view from "./components/view/viewRuangan"
import dosenDass from "./pages/admin/dosenDass"
import matakuliahDass from "./pages/admin/matakuliahDass"
import RuanganDass from "./pages/admin/RuanganDass"
import jadwalDas from "./pages/admin/jadwalDas"
import userDass from "./pages/admin/userDass"
import fakultasDass from "./pages/admin/fakultasDass"

function App() {


  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/search/:title" Component={Search} />
        <Route path="/jadwal" Component={Jadwal} />
        <Route path="/fakultas" Component={Fakultas} />
        <Route path="/dosen" Component={Dosen} />
        <Route path="/profile" Component={profile} />
        <Route path="/jadwal/:id" Component={PriviewJadwal} />
        <Route path="/editProfile/:id" Component={editProf} />
        <Route path="/updateProfile/:id" Component={upProfile}/>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/change-password/:id" Component={changePass} />
        <Route path="/settings" Component={settings} />
        <Route path="/ruangan" Component={ruangan} />
        <Route path="/forget" Component={forget} />
        <Route path="/waiting" Component={waiting} />
        <Route path="/jadwal-edit/:id" Component={JadwalEdit} />
        <Route path="/admin" Component={admin} />
        <Route path="/view/:id" Component={view} />
        <Route path="/dosen-admin" Component={dosenDass} />
        <Route path="/mk-admin" Component={matakuliahDass} />
        <Route path="/ruangan-admin" Component={RuanganDass} />
        <Route path="/jadwal-admin" Component={jadwalDas} />
        <Route path="/user-admin" Component={userDass} />
        <Route path="/fakultas-admin" Component={fakultasDass} />

      </Routes>
    </>
  )
}

export default App
