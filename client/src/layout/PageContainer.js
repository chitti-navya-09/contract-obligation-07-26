import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function PageContainer({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(()=>{
    function onResize(){
      if(window.innerWidth < 900){
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
        setMobileOpen(false);
      }
    }
    onResize();
    window.addEventListener('resize', onResize);
    return ()=> window.removeEventListener('resize', onResize);
  },[])

  function toggleSidebar(){
    if(window.innerWidth < 900){
      setMobileOpen(s => !s);
    } else {
      setSidebarOpen(s => !s);
    }
  }

  return (
    <div className="app-layout">
      <Sidebar collapsed={!sidebarOpen} mobileOpen={mobileOpen} />
      {mobileOpen && <div className="sidebar-overlay show" onClick={()=>setMobileOpen(false)} />}
      <div className="main-area">
        <Navbar onToggleSidebar={toggleSidebar} />
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
