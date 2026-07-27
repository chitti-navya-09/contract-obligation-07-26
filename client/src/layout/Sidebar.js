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
