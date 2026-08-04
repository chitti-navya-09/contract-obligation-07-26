import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  ShieldCheck, 
  BarChart3, 
  Users 
} from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Contracts', path: '/contract-details', icon: <FileText size={20} /> },
    { name: 'Compliance', path: '/compliance', icon: <ShieldCheck size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={20} /> },
    { name: 'Team', path: '/team', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-logo">
            <span className="brand-icon">CIQ</span>
            <span className="brand-text">ContractIQ</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-section-title">MAIN MENU</div>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <style>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background-color: var(--bg-sidebar);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          transition: width 0.3s ease, background-color var(--transition-normal);
          z-index: 20;
        }

        .sidebar-header {
          height: 70px;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand-icon {
          background: linear-gradient(135deg, var(--color-indigo), var(--color-blue));
          color: white;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.4rem 0.6rem;
          border-radius: 8px;
          letter-spacing: 0.5px;
        }

        .brand-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        .sidebar-nav {
          padding: 1.5rem 1rem;
          flex: 1;
          overflow-y: auto;
        }

        .nav-section-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.75rem;
          padding-left: 0.75rem;
        }

        .nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all var(--transition-fast);
        }

        .nav-item:hover {
          background-color: var(--bg-app);
          color: var(--color-blue);
        }

        .nav-item.active {
          background-color: var(--color-blue);
          color: white;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }

        .nav-item.active .nav-icon {
          color: white;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .nav-item:hover .nav-icon {
          color: var(--color-blue);
        }
      `}</style>
    </>
  );
}
import { Link, useLocation } from 'react-router-dom';
import { DashboardIcon, ContractsIcon, ObligationsIcon, ComplianceIcon, SettingsIcon, ReportsIcon } from '../components/DashboardIcons';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { isDarkMode } = useTheme();

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'bg-white/10 text-white border-l-4 border-emerald-400' : 'text-gray-300 hover:bg-white/5 hover:text-white';
  };

  const linkClass = "flex items-center px-4 py-3 mb-2 rounded-r-lg font-medium transition-colors duration-200 group";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 ${isDarkMode ? 'bg-[#060B19] border-r border-white/10' : 'bg-[#1E3A8A]'} text-white flex flex-col h-full overflow-y-auto transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0
      `}>
        <div className="flex items-center justify-between p-4 mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
              <i className="fa-solid fa-file-signature text-white text-sm"></i>
            </div>
            <h2 className="m-0 text-xl font-extrabold tracking-tight text-white">ContractIQ</h2>
          </div>
          <button className="md:hidden text-white focus:outline-none" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-4">
          Menu
        </div>
        <nav className="flex-1 pr-4">
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className={`${linkClass} ${isActive('/dashboard')}`}>
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300 mr-3">
              <DashboardIcon className="w-5 h-5" />
            </div>
            Dashboard
          </Link>
          <Link to="/contracts" onClick={() => setIsOpen(false)} className={`${linkClass} ${isActive('/contracts')}`}>
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 mr-3">
              <ContractsIcon className="w-5 h-5" />
            </div>
            Contracts
          </Link>
          <Link to="/obligations" onClick={() => setIsOpen(false)} className={`${linkClass} ${isActive('/obligations')}`}>
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 mr-3">
              <ObligationsIcon className="w-5 h-5" />
            </div>
            Obligations
          </Link>
          <Link to="/renewals" onClick={() => setIsOpen(false)} className={`${linkClass} ${isActive('/renewals')}`}>
            <div className="p-2 rounded-lg bg-red-500/20 text-red-300 mr-3">
              <i className="fa-solid fa-calendar-check w-5 h-5 flex items-center justify-center"></i>
            </div>
            Renewals
          </Link>
          <Link to="/compliance" onClick={() => setIsOpen(false)} className={`${linkClass} ${isActive('/compliance')}`}>
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 mr-3">
              <ComplianceIcon className="w-5 h-5" />
            </div>
            Compliance
          </Link>
          <Link to="/reports" onClick={() => setIsOpen(false)} className={`${linkClass} ${isActive('/reports')}`}>
            <div className="p-2 rounded-lg bg-pink-500/20 text-pink-300 mr-3">
              <ReportsIcon className="w-5 h-5" />
            </div>
            Reports
          </Link>
        </nav>

        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-4 mt-8">
          System
        </div>
        <nav className="pr-4 mb-4">
          <Link to="/transactions" onClick={() => setIsOpen(false)} className={`${linkClass} ${isActive('/transactions')}`}>
            <div className="p-2 rounded-lg bg-orange-500/20 text-orange-300 mr-3">
              <i className="fa-solid fa-money-bill-transfer w-5 h-5 flex items-center justify-center"></i>
            </div>
            Transactions
          </Link>
          <Link to="/tax-estimators" onClick={() => setIsOpen(false)} className={`${linkClass} ${isActive('/tax-estimators')}`}>
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 mr-3">
              <i className="fa-solid fa-calculator w-5 h-5 flex items-center justify-center"></i>
            </div>
            Tax Estimators
          </Link>
          <Link to="/users" onClick={() => setIsOpen(false)} className={`${linkClass} ${isActive('/users')}`}>
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 mr-3">
              <i className="fa-solid fa-users w-5 h-5 flex items-center justify-center"></i>
            </div>
            User Management
          </Link>
          <Link to="/settings" onClick={() => setIsOpen(false)} className={`${linkClass} ${isActive('/settings')}`}>
            <div className="p-2 rounded-lg bg-slate-500/20 text-slate-300 mr-3">
              <SettingsIcon className="w-5 h-5" />
            </div>
            Settings
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
