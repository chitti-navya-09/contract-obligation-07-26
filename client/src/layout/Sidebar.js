import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>ContractIQ</h2>
        <p>Contract Obligation Tracking Assistant</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className="active">Dashboard</li>
          <li>Contracts</li>
          <li>Obligations</li>
          <li>Compliance</li>
          <li>Calendar</li>
          <li>Documents</li>
          <li>Tasks</li>
          <li>Reports</li>
          <li>Notifications <span className="badge">3</span></li>
          <li>Users</li>
          <li>Settings</li>
        </ul>
      </nav>

      <div className="sidebar-alerts">
        <div className="alert-card">
          <h4>Stay on top of your obligations</h4>
          <p>Get real-time alerts and never miss a deadline.</p>
          <button>Manage Alerts</button>
        </div>
      </div>

      <div className="sidebar-profile">
        <img src="profile.jpg" alt="Saptak Biswas" />
        <div>
          <p>Saptak Biswas</p>
          <span>Admin</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;