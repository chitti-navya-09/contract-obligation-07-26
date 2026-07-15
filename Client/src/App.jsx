import React, { useState } from 'react'; // 1. Added missing useState import
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageContainer from './layout/PageContainer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import ContractRepository from './pages/contracts/ContractRepository';
import ContractsDashboard from './pages/contracts/ContractDashboard'; // This is your container wrapper
import Notifications from './pages/notifications/Notifications';
import Reports from './pages/reports/Reports';
import Obligations from './pages/obligations/Obligations';
import Compliance from './pages/compliance/Compliance';
import Renewals from './pages/renewals/Renewals';
import Settings from './pages/settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes (Main App Layout) */}
        <Route path="/" element={<PageContainer />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
            
          {/* Contracts Module */}
          {/* Path 1: The main grid list of all contracts */}
          <Route path="contracts" element={<ContractRepository />} />
          
          {/* Path 2: The dynamic individual contract page.
              We point this directly to ContractsDashboard so it fetches 
              the data before passing it to ContractDetails. */}
          <Route path="contracts/:id" element={<ContractsDashboard />} />
          
         
          <Route path="notifications" element={<Notifications />} />
          <Route path="reports" element={<Reports />} />
          
          {/* Future Modules */}
          <Route path="obligations" element={<Obligations />} />
          <Route path="renewals" element={<Renewals />} />
          <Route path="compliance" element={<Compliance />} />
          
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;