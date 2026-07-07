import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Files, 
  CheckSquare, 
  CalendarClock, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Archive,
  BarChart3,
  Users,
  FileSignature,
  Bell,
  Activity,
  Briefcase,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { role, logout } = useAuth();

  const getNavItemsByRole = (userRole) => {
    const commonItems = [
      { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    ];

    const normalizedRole = userRole ? userRole.toLowerCase().trim() : '';

    if (normalizedRole === 'admin' || normalizedRole === 'administrator') {
        return [
          ...commonItems,
          { path: '/users', label: 'User Management', icon: <Users size={20} /> },
          { path: '/contracts', label: 'Contracts', icon: <Files size={20} /> },
          { path: '/archived', label: 'Contract Repository', icon: <Archive size={20} /> },
          { path: '/obligations', label: 'Obligations', icon: <CheckSquare size={20} /> },
          { path: '/renewals', label: 'Renewals', icon: <CalendarClock size={20} /> },
          { path: '/compliance', label: 'Compliance', icon: <ShieldCheck size={20} /> },
          { path: '/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
          { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
          { path: '/audit-logs', label: 'Audit Logs', icon: <Activity size={20} /> },
        ];
    } else if (normalizedRole === 'legal manager' || normalizedRole === 'legal') {
        return [
          ...commonItems,
          { path: '/archived', label: 'Contract Repository', icon: <Archive size={20} /> },
          { path: '/contracts', label: 'Contract Management', icon: <Files size={20} /> },
          { path: '/approvals', label: 'Contract Approval', icon: <FileSignature size={20} /> },
          { path: '/renewals', label: 'Renewals', icon: <CalendarClock size={20} /> },
          { path: '/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
          { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
        ];
    } else if (normalizedRole === 'compliance officer' || normalizedRole === 'compliance') {
        return [
          ...commonItems,
          { path: '/compliance', label: 'Compliance Monitoring', icon: <ShieldCheck size={20} /> },
          { path: '/obligations', label: 'Obligations', icon: <CheckSquare size={20} /> },
          { path: '/renewals', label: 'Renewals', icon: <CalendarClock size={20} /> },
          { path: '/reports', label: 'Compliance Reports', icon: <BarChart3 size={20} /> },
          { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
        ];
    } else if (normalizedRole === 'contract manager' || normalizedRole === 'contract') {
        return [
          ...commonItems,
          { path: '/contracts', label: 'Contracts', icon: <Files size={20} /> },
          { path: '/archived', label: 'Repository', icon: <Archive size={20} /> },
          { path: '/obligations', label: 'Obligations', icon: <CheckSquare size={20} /> },
          { path: '/renewals', label: 'Renewals', icon: <CalendarClock size={20} /> },
          { path: '/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
          { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
        ];
    } else if (normalizedRole === 'department head') {
        return [
          ...commonItems,
          { path: '/contracts', label: 'Department Contracts', icon: <Briefcase size={20} /> },
          { path: '/approvals', label: 'Approvals', icon: <FileSignature size={20} /> },
          { path: '/obligations', label: 'Obligations', icon: <CheckSquare size={20} /> },
          { path: '/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
          { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
        ];
    } else {
        return [
          ...commonItems,
          { path: '/my-contracts', label: 'My Contracts', icon: <Files size={20} /> },
          { path: '/my-obligations', label: 'My Obligations', icon: <CheckSquare size={20} /> },
          { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
        ];
    }
  };

  const navItems = getNavItemsByRole(role);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <ShieldCheck className="sidebar-logo-icon" size={28} />
        <div className="sidebar-title">Contract<span>IQ</span></div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={closeSidebar}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <nav className="sidebar-footer-nav">
          <NavLink to="/settings" className="nav-item" onClick={closeSidebar}>
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>
          <button 
            className="nav-item nav-item-danger" 
            style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
            onClick={() => {
              closeSidebar();
              logout();
            }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
