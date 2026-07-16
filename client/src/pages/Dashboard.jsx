import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LegalDashboard from '../features/dashboard/LegalDashboard';
import ActivityChart from '../components/ActivityChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentContracts, setRecentContracts] = useState([]);

  useEffect(() => {
    fetch('/api/dashboard/recent')
      .then(res => res.json())
      .then(data => setRecentContracts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--primary-color)' }}>Overview Dashboard</h1>
        <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)' }}>Welcome back! Here is what's happening with your contracts today.</p>
      </div>

      {/* Stats Grid */}
      <LegalDashboard />
      
      {/* Visual Analytics */}
      <ActivityChart />

      {/* Recent Activity Table */}
      <div className="premium-table-container">
        <div className="table-header">
          <h2 className="table-title">Recent Contracts</h2>
          <button className="premium-button" style={{ width: 'auto', padding: '8px 16px', marginTop: 0 }} onClick={() => navigate('/contracts')}>View All</button>
        </div>
        <table className="premium-table">
          <thead>
            <tr>
              <th>Contract ID</th>
              <th>Counterparty</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {recentContracts.map((contract, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 500 }}>{contract.id}</td>
                <td>{contract.vendor}</td>
                <td>{contract.type}</td>
                <td>
                  <span className={`badge ${contract.status.toLowerCase()}`}>
                    {contract.status}
                  </span>
                </td>
                <td>{contract.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
