import React from 'react';

const Reports = () => {
  return (
    <div>
      <h1 style={{ margin: '0 0 32px 0', fontSize: '28px', color: 'var(--primary-color)' }}>Reports & Analytics</h1>
      
      <div className="dashboard-grid">
        <div className="stat-card" style={{ alignItems: 'center', textAlign: 'center' }}>
          <div className="stat-icon primary"><i className="fa-solid fa-chart-line"></i></div>
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--primary-color)' }}>Financial Exposure</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Overview of total contract value and financial risk.</p>
          <button className="premium-button" style={{ width: '100%' }}><i className="fa-solid fa-download" style={{ marginRight: '8px' }}></i> Download PDF</button>
        </div>
        
        <div className="stat-card" style={{ alignItems: 'center', textAlign: 'center' }}>
          <div className="stat-icon warning"><i className="fa-solid fa-calendar-days"></i></div>
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--primary-color)' }}>Upcoming Renewals</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>All contracts expiring within the next 90 days.</p>
          <button className="premium-button" style={{ width: '100%' }}><i className="fa-solid fa-download" style={{ marginRight: '8px' }}></i> Download CSV</button>
        </div>
        
        <div className="stat-card" style={{ alignItems: 'center', textAlign: 'center' }}>
          <div className="stat-icon success"><i className="fa-solid fa-clipboard-check"></i></div>
          <h3 style={{ margin: '0 0 8px 0', color: 'var(--primary-color)' }}>Compliance Report</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Detailed breakdown of obligation fulfillment.</p>
          <button className="premium-button" style={{ width: '100%' }}><i className="fa-solid fa-download" style={{ marginRight: '8px' }}></i> Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
