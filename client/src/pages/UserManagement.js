import React from "react";
import UserSummaryCards from "../components/UserManagement/UserSummaryCards";
import SearchBar from "../components/UserManagement/SearchBar";
import InviteUserButton from "../components/UserManagement/InviteUserButton";
import UserTable from "../components/UserManagement/UserTable";
import "../styles/user-management.css";
import { useState } from "react";
import InviteUserModal from "../components/UserManagement/InviteUserModal";

function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
  {
    id: 1,
    name: "Arjun Mehta",
    email: "arjun.mehta@contractiq.com",
    role: "Administrator",
    department: "IT",
    status: "Active",
    lastActive: "2 mins ago",
  },
  {
    id: 2,
    name: "Sarah Lin",
    email: "sarah.lin@contractiq.com",
    role: "Legal Manager",
    department: "Legal",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Deepa Nair",
    email: "deepa.nair@contractiq.com",
    role: "Compliance Officer",
    department: "Compliance",
    status: "Active",
    lastActive: "3 hours ago",
  },
  {
    id: 4,
    name: "Rahul Singh",
    email: "rahul.singh@contractiq.com",
    role: "Contract Manager",
    department: "Procurement",
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    id: 5,
    name: "Priya Kapoor",
    email: "priya.kapoor@contractiq.com",
    role: "Department Head",
    department: "Marketing",
    status: "Active",
    lastActive: "2 days ago",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.wilson@contractiq.com",
    role: "Employee",
    department: "Finance",
    status: "Inactive",
    lastActive: "1 week ago",
  },
  {
    id: 7,
    name: "Meera Pillai",
    email: "meera.pillai@contractiq.com",
    role: "Employee",
    department: "HR",
    status: "Active",
    lastActive: "4 hours ago",
  },
]);

  return (
    <div className="user-management-page">

      {/* Header */}
      <div className="user-management-hero">
        <div className="user-management-header">
            <div>
            <p className="hero-label">USER ADMINISTRATION</p>
            <h1>User Management</h1>
            <p className="hero-description">
                Manage users, roles, permissions and department access across the
                ContractIQ platform.
            </p>
            </div>

            <InviteUserButton onClick={() => setIsModalOpen(true)} />
            <InviteUserModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                users={users}
                setUsers={setUsers}
            />
        </div>
        </div>

      {/* Summary Cards */}
        <UserSummaryCards users={users} />

      {/* Search */}
      <div className="user-management-search">
        <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Users Table */}
      <UserTable
        users={users}
        searchTerm={searchTerm}
    />


    </div>
  );
}


export default UserManagement;