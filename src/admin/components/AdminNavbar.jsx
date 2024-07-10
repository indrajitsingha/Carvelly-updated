import { Outlet } from "react-router-dom";
import Navbar from "./CustomComponents/Navbar";
import Sidebar from "./CustomComponents/Sidebar";


const AdminNavbar = () => {
  return (
    <div className=" h-full relative">
      <div className=" hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <main className=" md:pl-72">
        <Navbar />
        <Outlet />
      </main>

    </div>
  )
}

export default AdminNavbar