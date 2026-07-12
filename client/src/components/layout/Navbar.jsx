import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ 
      padding: '0 24px', 
      height: '64px',
      backgroundColor: 'var(--primary-color)', 
      color: 'white', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--secondary-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>
          <i className="fa-solid fa-file-signature" style={{ color: 'white' }}></i>
        </div>
        <h2 style={{ margin: 0, fontSize: '20px', letterSpacing: '0.5px' }}>ContractIQ</h2>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <i className="fa-regular fa-bell" style={{ fontSize: '20px' }}></i>
          <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: 'var(--danger-color)', width: '10px', height: '10px', borderRadius: '50%', border: '2px solid var(--primary-color)' }}></span>
        </div>
        
        <button 
          onClick={handleLogout} 
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
        >
          <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginRight: '8px' }}></i>
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
