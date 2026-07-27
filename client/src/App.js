import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";
import PageContainer from "./layout/PageContainer";
import Home from "./pages/Home";
import ContractDetails from "./pages/ContractDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./assets/global.css";

function DashboardLayout() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contract-details" element={<ContractDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
