

import { Outlet } from "react-router";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useState } from "react";

export const DashboardLayout = () => {

  const [openSidebar,setOpenSidebar]=useState(false)
const handleOpenSidebar=()=>{
  setOpenSidebar(value=>!value)
}
  return (
    <div className="min-h-screen flex m-5">
    <Sidebar setOpenSidebar={handleOpenSidebar} openSidebar={openSidebar} />
  
      
      <section className="mx-3 sm:mx-20 flex bg-gray-800 flex-col w-full h-[calc(100vh-50px)] bg-opacity-10 p-5 rounded-3xl">
        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-auto h-full p-1">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  
  );
};