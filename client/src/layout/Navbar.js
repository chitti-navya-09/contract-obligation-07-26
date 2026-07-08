import React from 'react';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-greeting">
        <h1>Welcome back, Saptak! 👋</h1>
        <p>Here's what's happening with your contracts today.</p>
      </div>
      
      <div className="navbar-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search contracts, obligations..." />
        </div>
        <div className="notifications-icon">🔔 <span className="badge">3</span></div>
        <div className="profile-dropdown">
          <img src="profile.jpg" alt="Saptak Biswas" />
          <span>Saptak Biswas (Admin)</span>
        </div>
        <button className="new-contract-btn">+ New Contract</button>
      </div>
    </header>
  );
};

export default Navbar;