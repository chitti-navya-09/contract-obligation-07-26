import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  Bell, 
  Settings,
  UserPlus,
  ShieldAlert,
  Server,
  TerminalSquare
} from 'lucide-react';
import ButtonGroup from '../../components/Buttons/ButtonGroup';
import Dropdown from '../../components/Buttons/Dropdown';
import Button from '../../components/Buttons/Button';
import Badge from '../../components/DataDisplay/Badge';
import Modal from '../../components/Modals/Modal';
import FormInput from '../../components/Form/FormInput';
import FormSelect from '../../components/Form/FormSelect';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('30D');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Admin' });
  const [showAllActivities, setShowAllActivities] = useState(false);

  const [activities, setActivities] = useState([
    { id: 1, user: 'Sarah Smith', avatar: 'SS', action: 'Changed role for', target: 'John Doe', time: '2 hours ago', status: 'Success', type: 'success' },
    { id: 2, user: 'System', avatar: 'SY', action: 'Generated', target: 'Weekly Audit Report', time: '4 hours ago', status: 'Completed', type: 'primary' },
    { id: 3, user: 'Alex Johnson', avatar: 'AJ', action: 'Failed login attempt', target: 'IP 192.168.1.5', time: '1 day ago', status: 'Warning', type: 'warning' },
    { id: 4, user: 'Admin User', avatar: 'AU', action: 'Updated', target: 'System Settings', time: '2 days ago', status: 'Success', type: 'success' },
  ]);

  const handleCreateUser = (e) => {
    e.preventDefault();
    alert('User created successfully!');
    const newActivity = {
      id: Date.now(),
      user: 'Current User', 
      avatar: 'CU',
      action: 'Created user',
      target: newUser.name || 'New User',
      time: 'Just now',
      status: 'Success',
      type: 'success'
    };
    setActivities([newActivity, ...activities]);
    setIsUserModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Admin' });
  };

  const stats = [
    { label: 'Total Users', value: '284', icon: <Users size={24} />, color: 'var(--color-primary)', trend: '+12', trendType: 'positive', subtext: 'new this month' },
    { label: 'Active Sessions', value: '42', icon: <Activity size={24} />, color: 'var(--color-success)', trend: 'Stable', trendType: 'neutral', subtext: 'current users' },
    { label: 'Unread Notifications', value: '15', icon: <Bell size={24} />, color: 'var(--color-warning)', trend: '+5', trendType: 'warning', subtext: 'needs attention' },
    { label: 'System Errors', value: '3', icon: <Server size={24} />, color: 'var(--color-danger)', trend: '-2', trendType: 'positive', subtext: 'since yesterday' },
  ];

  const multiplyData = (dataArray, factor) => dataArray.map(d => Math.round(d * factor));
  const filterFactor = timeFilter === '7D' ? 0.3 : timeFilter === '1Y' ? 3 : 1;

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Users',
        data: multiplyData([12, 19, 15, 25, 22, 30], filterFactor),
        borderColor: '#6B8EB1',
        backgroundColor: 'rgba(107, 142, 177, 0.15)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#6B8EB1',
        pointBorderWidth: 2,
        pointHoverRadius: 6
      }
    ]
  };

  const lineChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(68, 75, 83, 0.05)', borderDash: [5, 5] }, beginAtZero: true }
    }
  };

  const doughnutData = {
    labels: ['Legal Managers', 'Compliance Officers', 'Contract Managers', 'Admins'],
    datasets: [
      {
        data: multiplyData([45, 30, 20, 5], filterFactor),
        backgroundColor: ['#3498db', '#f1c40f', '#2ecc71', '#9b59b6'],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const doughnutOptions = {
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { position: 'bottom', labels: { padding: 20, usePointStyle: true, pointStyle: 'circle' } }
    }
  };

  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Logins',
        data: multiplyData([120, 150, 140, 180, 160, 40, 50], filterFactor),
        backgroundColor: '#2ecc71',
        borderRadius: 4
      }
    ]
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(68, 75, 83, 0.05)', borderDash: [5, 5] }, beginAtZero: true }
    }
  };

  const displayedActivities = showAllActivities ? activities : activities.slice(0, 4);

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header mb-2 stagger-1">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted mt-1">System overview, user management, and audit logs.</p>
        </div>
        <div className="dashboard-header-actions">
          <ButtonGroup className="time-filters">
            <button className={`filter-btn ${timeFilter === '7D' ? 'active' : ''}`} onClick={() => setTimeFilter('7D')}>7D</button>
            <button className={`filter-btn ${timeFilter === '30D' ? 'active' : ''}`} onClick={() => setTimeFilter('30D')}>30D</button>
            <button className={`filter-btn ${timeFilter === '1Y' ? 'active' : ''}`} onClick={() => setTimeFilter('1Y')}>1Y</button>
          </ButtonGroup>
          <div className="header-buttons">
            <Button variant="primary" icon={UserPlus} onClick={() => setIsUserModalOpen(true)}>
              New User
            </Button>
          </div>
        </div>
      </div>

      <div className="stats-grid stagger-1">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-card-header">
              <p className="stat-label">{stat.label}</p>
              <div className="stat-icon" style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
                {stat.icon}
              </div>
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <div className="stat-footer">
                <span className={`stat-trend ${stat.trendType}`}>{stat.trend}</span>
                <span className="stat-subtext">{stat.subtext}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-middle-grid stagger-2">
        <div className="dashboard-card main-chart-card">
          <div className="dashboard-card-header">
            <div>
              <h3>User Growth</h3>
              <p>Monthly new user registrations</p>
            </div>
          </div>
          <div className="chart-wrapper">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="dashboard-card quick-actions-card glow-card">
            <div className="dashboard-card-header">
              <h3>Admin Actions</h3>
            </div>
            <div className="quick-actions-grid">
              <button className="quick-action-btn" onClick={() => setIsUserModalOpen(true)}>
                <div className="qa-icon" style={{ color: 'var(--color-primary)', backgroundColor: 'rgba(107, 142, 177, 0.15)' }}><UserPlus size={20}/></div>
                <span>Create User</span>
              </button>
              <button className="quick-action-btn">
                <div className="qa-icon" style={{ color: 'var(--color-warning)', backgroundColor: 'rgba(241, 196, 15, 0.15)' }}><TerminalSquare size={20}/></div>
                <span>Audit Logs</span>
              </button>
              <button className="quick-action-btn">
                <div className="qa-icon" style={{ color: 'var(--color-success)', backgroundColor: 'rgba(46, 204, 113, 0.15)' }}><Bell size={20}/></div>
                <span>Broadcast</span>
              </button>
              <button className="quick-action-btn">
                <div className="qa-icon" style={{ color: 'var(--color-danger)', backgroundColor: 'rgba(231, 76, 60, 0.15)' }}><Settings size={20}/></div>
                <span>System Config</span>
              </button>
            </div>
          </div>
          
          <div className="dashboard-card flex-1">
            <div className="dashboard-card-header">
              <h3>Role Distribution</h3>
            </div>
            <div className="chart-wrapper doughnut-wrapper">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-middle-grid stagger-3">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h3>System Activity</h3>
              <p>User logins and sessions over the week</p>
            </div>
          </div>
          <div className="chart-wrapper">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
        
        <div className="dashboard-card activity-dashboard-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="dashboard-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-primary" />
              <h3 style={{ margin: 0 }}>Recent Audit Logs</h3>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAllActivities(!showAllActivities)}>
              {showAllActivities ? 'Show Less' : 'View All'}
            </Button>
          </div>
          <div className="activity-table-wrapper" style={{ flex: 1 }}>
            <table className="activity-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {displayedActivities.map((act) => (
                  <tr key={act.id}>
                    <td>
                      <div className="table-user">
                        <div className="table-avatar">{act.avatar}</div>
                        <div>
                          <p className="font-semibold" style={{ marginBottom: 0 }}>{act.user}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p style={{ margin: 0, fontSize: '0.95rem' }}>
                        {act.action} <span className="font-semibold">{act.target}</span>
                      </p>
                    </td>
                    <td>
                      <Badge variant={act.type}>{act.status}</Badge>
                    </td>
                    <td className="text-muted text-sm">{act.time}</td>
                    <td>
                      <Dropdown 
                        label="Manage" 
                        onSelect={(item) => alert(`${item.label} selected for activity ID: ${act.id}`)}
                        items={[
                          { label: 'View Details' },
                          { label: 'Export Log' }
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isUserModalOpen} 
        onClose={() => setIsUserModalOpen(false)}
        title="Create New User"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setIsUserModalOpen(false)}>Cancel</Button>
            <Button type="button" variant="primary" onClick={handleCreateUser}>Create User</Button>
          </>
        }
      >
        <form onSubmit={handleCreateUser} id="create-user-form">
          <FormInput label="Full Name" type="text" placeholder="e.g. Jane Doe" required value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
          <FormInput label="Email Address" type="email" placeholder="e.g. jane@company.com" required value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
          <FormSelect 
            label="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            options={[
              { value: 'Admin', label: 'Administrator' },
              { value: 'Legal Manager', label: 'Legal Manager' },
              { value: 'Compliance Officer', label: 'Compliance Officer' },
              { value: 'Contract Manager', label: 'Contract Manager' }
            ]}
          />
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
