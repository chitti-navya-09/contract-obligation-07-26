import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Mail
} from 'lucide-react';
import Button from '../../components/Buttons/Button';
import Badge from '../../components/DataDisplay/Badge';
import Dropdown from '../../components/Buttons/Dropdown';
import Modal from '../../components/Modals/Modal';
import FormInput from '../../components/Form/FormInput';
import FormSelect from '../../components/Form/FormSelect';

const mockUsers = [
  { id: 1, name: 'Alice Smith', email: 'alice.smith@contractiq.com', role: 'Administrator', department: 'IT', status: 'Active' },
  { id: 2, name: 'Bob Jones', email: 'bob.jones@contractiq.com', role: 'Legal Manager', department: 'Legal', status: 'Active' },
  { id: 3, name: 'Charlie Davis', email: 'charlie.davis@contractiq.com', role: 'Compliance Officer', department: 'Compliance', status: 'Inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana.prince@contractiq.com', role: 'Contract Manager', department: 'Operations', status: 'Active' },
  { id: 5, name: 'Evan Wright', email: 'evan.wright@contractiq.com', role: 'Department Head', department: 'Sales', status: 'Active' },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona.g@contractiq.com', role: 'Employee', department: 'Marketing', status: 'Active' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Employee', department: '' });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.department) {
      alert('Please fill out all fields.');
      return;
    }

    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const userToAdd = {
      id: nextId,
      ...newUser,
      status: 'Active'
    };

    setUsers([...users, userToAdd]);
    setIsAddUserModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Employee', department: '' });
  };

  const toggleUserStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return user;
    }));
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="dashboard-container fade-in">
      {/* Header */}
      <div className="dashboard-header mb-2 stagger-1">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users size={28} className="text-primary" /> User Management
          </h1>
          <p className="text-muted mt-1">Manage user roles, permissions, and account status.</p>
        </div>
        <div className="dashboard-header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="header-search" style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem', width: '250px' }}>
            <Search size={16} className="text-muted" style={{ marginRight: '0.5rem' }} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={handleSearch}
              style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.9rem' }}
            />
          </div>
          <Button variant="primary" icon={Plus} onClick={() => setIsAddUserModalOpen(true)}>
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="stats-grid stagger-1 mb-6">
        <div className="stat-card">
          <div className="stat-card-header">
            <p className="stat-label">Total Users</p>
            <div className="stat-icon" style={{ color: 'var(--color-primary)', backgroundColor: 'rgba(107, 142, 177, 0.15)' }}>
              <Users size={24} />
            </div>
          </div>
          <div className="stat-content">
            <h3>{users.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <p className="stat-label">Active Accounts</p>
            <div className="stat-icon" style={{ color: 'var(--color-success)', backgroundColor: 'rgba(46, 204, 113, 0.15)' }}>
              <CheckCircle2 size={24} />
            </div>
          </div>
          <div className="stat-content">
            <h3>{users.filter(u => u.status === 'Active').length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <p className="stat-label">Inactive Accounts</p>
            <div className="stat-icon" style={{ color: 'var(--color-danger)', backgroundColor: 'rgba(231, 76, 60, 0.15)' }}>
              <XCircle size={24} />
            </div>
          </div>
          <div className="stat-content">
            <h3>{users.filter(u => u.status === 'Inactive').length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-header">
            <p className="stat-label">Administrators</p>
            <div className="stat-icon" style={{ color: 'var(--color-warning)', backgroundColor: 'rgba(241, 196, 15, 0.15)' }}>
              <ShieldCheck size={24} />
            </div>
          </div>
          <div className="stat-content">
            <h3>{users.filter(u => u.role === 'Administrator').length}</h3>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="dashboard-card stagger-2" style={{ overflow: 'visible' }}>
        <div className="activity-table-wrapper" style={{ overflow: 'visible' }}>
          <table className="activity-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th style={{ width: '80px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="table-user">
                        <div className="table-avatar" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                          {user.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold" style={{ marginBottom: '0.1rem', color: 'var(--color-text)' }}>{user.name}</p>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Mail size={12} /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge variant={user.role === 'Administrator' ? 'warning' : 'primary'}>{user.role}</Badge>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-dark)' }}>{user.department}</span>
                    </td>
                    <td>
                      <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>{user.status}</Badge>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <Dropdown 
                        label={<MoreVertical size={16} />}
                        hideArrow
                        onSelect={(item) => {
                          if (item.action === 'toggleStatus') toggleUserStatus(user.id);
                          if (item.action === 'delete') deleteUser(user.id);
                        }}
                        items={[
                          { label: 'Edit Profile', action: 'edit' },
                          { label: user.status === 'Active' ? 'Deactivate' : 'Activate', action: 'toggleStatus' },
                          { label: 'Remove User', action: 'delete', danger: true }
                        ]}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-text-muted)' }}>
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal 
        isOpen={isAddUserModalOpen} 
        onClose={() => setIsAddUserModalOpen(false)}
        title="Add New User"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setIsAddUserModalOpen(false)}>Cancel</Button>
            <Button type="button" variant="primary" onClick={handleAddUser}>Create User</Button>
          </>
        }
      >
        <form onSubmit={handleAddUser} id="add-user-form">
          <FormInput 
            label="Full Name" 
            type="text" 
            placeholder="e.g. John Doe" 
            required 
            value={newUser.name} 
            onChange={(e) => setNewUser({...newUser, name: e.target.value})} 
          />
          <FormInput 
            label="Email Address" 
            type="email" 
            placeholder="e.g. john.doe@contractiq.com" 
            required 
            value={newUser.email} 
            onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
          />
          <FormSelect 
            label="System Role"
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            options={[
              { value: 'Administrator', label: 'Administrator' },
              { value: 'Legal Manager', label: 'Legal Manager' },
              { value: 'Compliance Officer', label: 'Compliance Officer' },
              { value: 'Contract Manager', label: 'Contract Manager' },
              { value: 'Department Head', label: 'Department Head' },
              { value: 'Employee', label: 'Employee' }
            ]}
          />
          <FormInput 
            label="Department" 
            type="text" 
            placeholder="e.g. Finance, Legal, Operations" 
            required 
            value={newUser.department} 
            onChange={(e) => setNewUser({...newUser, department: e.target.value})} 
          />
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
