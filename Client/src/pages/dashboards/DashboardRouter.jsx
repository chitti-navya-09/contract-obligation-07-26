import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import LegalManagerDashboard from './LegalManagerDashboard';
import ComplianceOfficerDashboard from './ComplianceOfficerDashboard';
import ContractManagerDashboard from './ContractManagerDashboard';
import DepartmentHeadDashboard from './DepartmentHeadDashboard';
import EmployeeDashboard from './EmployeeDashboard';

const DashboardRouter = () => {
  const { role, loading } = useAuth();

  if (loading) {
    return <div className="dashboard-container fade-in"><p>Loading Dashboard...</p></div>;
  }

  const normalizedRole = role ? role.toLowerCase().trim() : '';

  if (normalizedRole === 'admin' || normalizedRole === 'administrator') {
    return <AdminDashboard />;
  } else if (normalizedRole === 'legal manager' || normalizedRole === 'legal') {
    return <LegalManagerDashboard />;
  } else if (normalizedRole === 'compliance officer' || normalizedRole === 'compliance') {
    return <ComplianceOfficerDashboard />;
  } else if (normalizedRole === 'contract manager' || normalizedRole === 'contract') {
    return <ContractManagerDashboard />;
  } else if (normalizedRole === 'department head') {
    return <DepartmentHeadDashboard />;
  } else {
    return <EmployeeDashboard />;
  }
};

export default DashboardRouter;
