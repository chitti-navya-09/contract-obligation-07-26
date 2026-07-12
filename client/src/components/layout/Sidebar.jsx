import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'sidebar-link active-link' : 'sidebar-link';
  };

  return (
    <aside style={{ width: '260px', backgroundColor: '#fff', borderRight: '1px solid #e5e7eb', padding: '24px 16px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '16px' }}>
        Main Menu
      </div>
      <nav style={{ flex: 1 }}>
        <Link to="/dashboard" className={isActive('/dashboard')}>
          <i className="fa-solid fa-chart-pie"></i> Dashboard
        </Link>
        <Link to="/contracts" className={isActive('/contracts')}>
          <i className="fa-solid fa-folder-open"></i> Contract Repository
        </Link>
        <Link to="/obligations" className={isActive('/obligations')}>
          <i className="fa-solid fa-list-check"></i> Obligation Tracker
        </Link>
        <Link to="/compliance" className={isActive('/compliance')}>
          <i className="fa-solid fa-shield-halved"></i> Compliance Dashboard
        </Link>
        <Link to="/reports" className={isActive('/reports')}>
          <i className="fa-solid fa-file-invoice"></i> Reports & Analytics
        </Link>
      </nav>

      <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '16px', marginTop: '32px' }}>
        System
      </div>
      <nav>
        <Link to="/notifications" className={isActive('/notifications')}>
          <i className="fa-solid fa-bell"></i> Notifications
        </Link>
        <Link to="/audit-logs" className={isActive('/audit-logs')}>
          <i className="fa-solid fa-clock-rotate-left"></i> Audit Logs
        </Link>
        <Link to="/settings" className={isActive('/settings')}>
          <i className="fa-solid fa-gear"></i> Settings
        </Link>
      </nav>
      
      {/* Sidebar Footer User Profile snippet */}
      <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', paddingLeft: '8px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--secondary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '12px' }}>
          AD
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Admin User</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>admin@company.com</div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
