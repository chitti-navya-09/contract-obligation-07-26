import React from 'react';
import PageContainer from '../layout/PageContainer';
import ContractStatusChart from '../components/Charts/ContractStatusChart';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  return (
    <PageContainer>
      <div className="dashboard-grid">
        
        {/* KPI Summary Cards */}
        <div className="kpi-cards">
          <div className="card">Total Contracts: 156</div>
          <div className="card">Active Contracts: 98</div>
          <div className="card">Expiring Soon: 12</div>
          <div className="card">Overdue Obligations: 7</div>
        </div>

        {/* Middle Section: Chart, Deadlines, Calendar */}
        <div className="middle-section">
       <div className="card chart-container">
         <h3>Contract Status Overview</h3>
         <ContractStatusChart />
       </div>
          
          <div className="card deadlines-container">
            <div className="section-header">
              <h3>Upcoming Deadlines</h3>
              <a href="#">View all</a>
            </div>
            <ul className="deadline-list">
              <li>Master Services Agreement - 15 May 2024</li>
              <li>Software License Agreement - 22 May 2024</li>
              <li>Maintenance Contract - 30 May 2024</li>
              <li>Vendor Agreement - 05 Jun 2024</li>
            </ul>
          </div>

          <div className="card calendar-container">
         <h3>Calendar</h3>
         <Calendar className="custom-calendar" />
       </div>
     </div>

        {/* Bottom Section: Tables and Activity */}
        <div className="bottom-section">
          <div className="card recent-contracts">
            <div className="section-header">
              <h3>Recent Contracts</h3>
              <a href="#">View all</a>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Contract Name</th>
                  <th>Party</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Master Services Agreement</td>
                  <td>Acme Corporation</td>
                  <td><span className="status-active">Active</span></td>
                  <td>01 Jan 2024</td>
                  <td>31 Dec 2024</td>
                  <td>$250,000</td>
                  <td>...</td>
                </tr>
                {/* Additional Rows */}
              </tbody>
            </table>
          </div>

          <div className="card recent-activity">
            <div className="section-header">
              <h3>Recent Activity</h3>
              <a href="#">View all</a>
            </div>
            <ul className="activity-list">
              <li>New obligation "Quarterly Report" added - 2m ago</li>
              <li>Obligation "Insurance Renewal" completed - 1h ago</li>
              <li>Contract "Maintenance Contract" is expiring soon - 3h ago</li>
            </ul>
            <button className="view-all-btn">View All Activity</button>
          </div>
        </div>
        
      </div>
    </PageContainer>
  );
};

export default Home;