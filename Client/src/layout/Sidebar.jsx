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
    const normalizedRole = userRole ? userRole.toLowerCase().trim() : '';

    if (normalizedRole === 'admin' || normalizedRole === 'administrator') {
        return [
          { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
          { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
          { path: '/audit-logs', label: 'Audit Logs', icon: <Activity size={20} /> },
          { path: '/users', label: 'User Management', icon: <Users size={20} /> },
        ];
    } else if (normalizedRole === 'legal manager' || normalizedRole === 'legal') {
        return [
          { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
          { path: '/contracts', label: 'Contract Repository', icon: <Archive size={20} /> },
          { path: '/obligations', label: 'Obligation Tracker', icon: <CheckSquare size={20} /> },
          { path: '/renewals', label: 'Renewal Dashboard', icon: <CalendarClock size={20} /> },
          { path: '/compliance', label: 'Compliance', icon: <ShieldCheck size={20} /> },
          { path: '/reports', label: 'Reports & Analytics', icon: <BarChart3 size={20} /> },
          { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
        ];
    } else if (normalizedRole === 'compliance officer' || normalizedRole === 'compliance') {
        return [
          { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
          { path: '/contracts', label: 'Contract Repository', icon: <Archive size={20} /> },
          { path: '/obligations', label: 'Obligation Tracker', icon: <CheckSquare size={20} /> },
          { path: '/renewals', label: 'Renewal Dashboard', icon: <CalendarClock size={20} /> },
          { path: '/compliance', label: 'Compliance', icon: <ShieldCheck size={20} /> },
          { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
        ];
    } else if (normalizedRole === 'contract manager' || normalizedRole === 'contract') {
        return [
          { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
          { path: '/contracts', label: 'Contract Repository', icon: <Archive size={20} /> },
          { path: '/obligations', label: 'Obligation Tracker', icon: <CheckSquare size={20} /> },
          { path: '/renewals', label: 'Renewal Dashboard', icon: <CalendarClock size={20} /> },
          { path: '/notifications', label: 'Notifications', icon: <Bell size={20} /> },
        ];
    } else {
        return [
          { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
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
