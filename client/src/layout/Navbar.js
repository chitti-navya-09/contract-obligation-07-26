import React from 'react';

const Navbar = ({ user }) => {
  return (
    <header className="navbar">
      <div className="navbar-greeting">
        <h1>Welcome back, {user?.name || ''}! 👋</h1>
        <p>Here's what's happening with your contracts today.</p>
      </div>
      
      <div className="navbar-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search contracts, obligations..." />
        </div>
        <div className="notifications-icon">🔔 <span className="badge">{user?.notificationsCount || 0}</span></div>
        <div className="profile-dropdown">
          <img src={user?.profilePic || "default_profile.png"} alt="Profile" />
          <span>{user?.name || ''} {user?.role ? `(${user.role})` : ''}</span>
        </div>
        <button className="new-contract-btn">+ New Contract</button>
      </div>
    </header>
  );
};

export default Navbar;