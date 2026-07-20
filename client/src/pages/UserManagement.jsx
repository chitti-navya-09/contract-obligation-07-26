import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = () => {
    fetch('/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch users.", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeactivate = (userId) => {
    fetch(`/api/users/${userId}`, { method: 'DELETE' })
      .then(() => fetchUsers())
      .catch(console.error);
  };

  const handleAddUser = () => {
    const newUser = {
      name: "New User",
      email: "new.user@company.com",
      role: "User"
    };
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
    .then(() => fetchUsers())
    .catch(console.error);
  };

  const handleEditClick = (user) => {
    setEditingUser({ ...user });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    fetch(`/api/users/${editingUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        status: editingUser.status
      })
    })
    .then(() => {
      setEditingUser(null);
      fetchUsers();
    })
    .catch(console.error);
  };

  const getRoleBadge = (role) => {
    switch(role) {
      case 'Admin': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'Manager': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Auditor': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'Inactive': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'Pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-white relative">
      
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            User Management
          </h1>
          <p className="text-gray-400 mt-2">Manage roles, permissions, and system access.</p>
        </div>
        <button onClick={handleAddUser} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-300 text-sm uppercase tracking-wider">
                <th className="p-5 font-semibold">User</th>
                <th className="p-5 font-semibold">Role</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold">Last Login</th>
                <th className="p-5 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">Loading users...</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold shadow-inner group-hover:scale-110 transition-transform">
                          {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-100">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 text-xs font-medium border rounded-full ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 text-xs font-medium border rounded-full flex items-center gap-1 w-max ${getStatusBadge(user.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-5 text-gray-400 text-sm">
                      {user.lastLogin}
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditClick(user)} className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDeactivate(user.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Deactivate">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1E3A8A] rounded-2xl p-6 w-full max-w-md shadow-2xl border border-white/10 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleUpdateUser} className="space-y-4 text-left">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Name</label>
                <input 
                  type="text" 
                  value={editingUser.name} 
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  value={editingUser.email} 
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Role</label>
                <select 
                  value={editingUser.role} 
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-400 [&>option]:bg-[#1E3A8A]"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                  <option value="Auditor">Auditor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Status</label>
                <select 
                  value={editingUser.status} 
                  onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-400 [&>option]:bg-[#1E3A8A]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setEditingUser(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 rounded-lg font-semibold shadow-lg transition-all">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
