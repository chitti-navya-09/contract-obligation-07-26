import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid #ddd', padding: '1rem' }}>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: '10px' }}><Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>Dashboard</Link></li>
        <li style={{ marginBottom: '10px' }}><Link to="/contracts" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>Contract Repository</Link></li>
        <li style={{ marginBottom: '10px' }}><Link to="/obligations" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>Obligation Tracker</Link></li>
        <li style={{ marginBottom: '10px' }}><Link to="/compliance" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>Compliance Dashboard</Link></li>
        <li style={{ marginBottom: '10px' }}><Link to="/reports" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>Reports</Link></li>
        <li style={{ marginBottom: '10px' }}><Link to="/notifications" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>Notifications</Link></li>
        <li style={{ marginBottom: '10px' }}><Link to="/audit-logs" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>Audit Logs</Link></li>
        <li style={{ marginBottom: '10px' }}><Link to="/settings" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>Settings</Link></li>
      </ul>
    </aside>
  );
};
export default Sidebar;
