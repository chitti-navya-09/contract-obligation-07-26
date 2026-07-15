import React, { useState } from "react";

function InviteUserModal({open,onClose,users,setUsers,}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
  // Basic validation
  if (
    !formData.name ||
    !formData.email ||
    !formData.role ||
    !formData.department
  ) {
    alert("Please fill all fields.");
    return;
  }

  const newUser = {
    id: users.length + 1,
    ...formData,
    status: "Active",
    lastActive: "Just now",
  };

  setUsers([...users, newUser]);

  // Clear the form
  setFormData({
    name: "",
    email: "",
    role: "",
    department: "",
  });

  onClose();
    };

  return (
    <div className="modal-overlay">
      <div className="invite-modal">

        <h2>Invite User</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option>Administrator</option>
          <option>Legal Manager</option>
          <option>Compliance Officer</option>
          <option>Employee</option>
        </select>

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>

          <button
            className="invite-btn"
            onClick={handleSubmit}
          >
            Invite
          </button>
        </div>

      </div>
    </div>
  );
}

export default InviteUserModal;