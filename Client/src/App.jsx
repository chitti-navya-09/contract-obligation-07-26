import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageContainer from './layout/PageContainer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import DashboardRouter from './pages/dashboards/DashboardRouter';
import UserManagement from './pages/users/UserManagement';
import ContractRepository from './pages/contracts/ContractRepository';
import ContractDetails from './pages/contracts/ContractDetails';
import ArchivedContracts from './pages/contracts/ArchivedContracts';
import Notifications from './pages/notifications/Notifications';
import Reports from './pages/reports/Reports';
import Obligations from './pages/obligations/Obligations';
import Compliance from './pages/compliance/Compliance';
import Renewals from './pages/renewals/Renewals';
import Settings from './pages/settings/Settings';
import { AuthProvider } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Placeholder components for newly added routes in sidebar
const PlaceholderPage = ({ title }) => (
  <div className="dashboard-container fade-in">
    <div className="dashboard-header mb-2">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted mt-1">This page is under construction.</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes (Main App) */}
          <Route element={<ProtectedRoute><PageContainer /></ProtectedRoute>}>
            <Route path="dashboard" element={<DashboardRouter />} />
              
            {/* Contracts Module */}
            <Route path="contracts" element={<ContractRepository />} />
            <Route path="contracts/:id" element={<ContractDetails />} />
            <Route path="archived" element={<ArchivedContracts />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reports" element={<Reports />} />
            
            {/* Obligations & Renewals */}
            <Route path="obligations" element={<Obligations />} />
            <Route path="renewals" element={<Renewals />} />
            <Route path="compliance" element={<Compliance />} />
            
            {/* Settings */}
            <Route path="settings" element={<Settings />} />

            {/* Role-Specific New Routes (Placeholders except users) */}
            <Route path="users" element={<UserManagement />} />
            <Route path="audit-logs" element={<PlaceholderPage title="Audit Logs" />} />
            <Route path="approvals" element={<PlaceholderPage title="Contract Approvals" />} />
            <Route path="my-contracts" element={<PlaceholderPage title="My Contracts" />} />
            <Route path="my-obligations" element={<PlaceholderPage title="My Obligations" />} />
            <Route path="profile" element={<PlaceholderPage title="My Profile" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
