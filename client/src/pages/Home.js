import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MoreVertical, FileText, CheckCircle2, Clock, XCircle } from "lucide-react";

const contracts = [
  {
    id: "CNT001",
    title: "Software Development Agreement",
    client: "ABC Pvt Ltd",
    status: "Active",
    startDate: "01-07-2026",
    endDate: "30-06-2027",
    value: "$45,000"
  },
  {
    id: "CNT002",
    title: "Cloud Service Agreement",
    client: "XYZ Technologies",
    status: "Pending",
    startDate: "15-07-2026",
    endDate: "14-07-2027",
    value: "$12,500"
  },
  {
    id: "CNT003",
    title: "Maintenance Contract",
    client: "Global Solutions",
    status: "Completed",
    startDate: "10-01-2026",
    endDate: "09-07-2026",
    value: "$8,000"
  },
];

const StatusBadge = ({ status }) => {
  let colorClass = "";
  let Icon = null;
  
  switch (status.toLowerCase()) {
    case "active":
      colorClass = "status-active";
      Icon = CheckCircle2;
      break;
    case "pending":
      colorClass = "status-pending";
      Icon = Clock;
      break;
    case "completed":
      colorClass = "status-completed";
      Icon = FileText;
      break;
    default:
      colorClass = "status-default";
      Icon = XCircle;
  }

  return (
    <span className={`status-badge ${colorClass}`}>
      <Icon size={14} className="status-icon" />
      {status}
    </span>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContracts = contracts.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Contract Repository</h1>
          <p className="page-subtitle">Manage and track all your active and pending contracts.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Filter size={16} /> Filter
          </button>
          <button className="btn-primary" onClick={() => navigate("/contract-details")}>
            New Contract
          </button>
        </div>
      </div>

      <div className="card-container">
        <div className="table-toolbar">
          <div className="search-bar">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search by ID, title, or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="toolbar-stats">
            Showing {filteredContracts.length} results
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Contract ID</th>
                <th>Contract Title</th>
                <th>Client</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Value</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.length > 0 ? (
                filteredContracts.map((contract) => (
                  <tr key={contract.id} className="table-row">
                    <td className="font-medium">{contract.id}</td>
                    <td>
                      <div className="contract-title">{contract.title}</div>
                    </td>
                    <td>{contract.client}</td>
                    <td>
                      <StatusBadge status={contract.status} />
                    </td>
                    <td className="text-muted">
                      {contract.startDate} to {contract.endDate}
                    </td>
                    <td className="font-medium">{contract.value}</td>
                    <td className="text-right">
                      <button 
                        className="btn-action"
                        onClick={() => navigate("/contract-details")}
                        title="View Details"
                      >
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No contracts found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .dashboard-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          animation: fadeIn var(--transition-normal);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.5px;
          margin-bottom: 0.25rem;
        }

        .page-subtitle {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-primary {
          background-color: var(--color-blue);
          color: white;
          border: none;
          padding: 0.6rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background-color var(--transition-fast), transform var(--transition-fast);
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
        }
        .btn-primary:hover {
          background-color: var(--color-blue-hover);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background-color: var(--bg-card);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          padding: 0.6rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all var(--transition-fast);
        }
        .btn-secondary:hover {
          background-color: var(--bg-app);
          color: var(--text-primary);
        }

        .card-container {
          background-color: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        .table-toolbar {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .search-bar {
          position: relative;
          width: 350px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-bar .search-input {
          width: 100%;
          padding: 0.6rem 1rem 0.6rem 2.5rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: var(--bg-app);
          color: var(--text-primary);
          font-size: 0.85rem;
          transition: border-color var(--transition-fast);
        }
        .search-bar .search-input:focus {
          outline: none;
          border-color: var(--color-blue);
        }

        .toolbar-stats {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .table-responsive {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .data-table th {
          padding: 1rem 1.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          background-color: var(--bg-app);
          letter-spacing: 0.5px;
          border-bottom: 1px solid var(--border-color);
        }

        .data-table td {
          padding: 1.25rem 1.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        .table-row {
          transition: background-color var(--transition-fast);
        }
        .table-row:hover {
          background-color: var(--bg-app);
        }
        
        .table-row:last-child td {
          border-bottom: none;
        }

        .contract-title {
          font-weight: 600;
          color: var(--text-primary);
        }

        .font-medium {
          font-weight: 500;
          color: var(--text-primary);
        }

        .text-muted {
          color: var(--text-muted);
        }

        .text-right {
          text-align: right;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-active {
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--color-green);
        }
        
        .status-pending {
          background-color: rgba(245, 158, 11, 0.1);
          color: var(--color-yellow);
        }
        
        .status-completed {
          background-color: rgba(59, 130, 246, 0.1);
          color: var(--color-blue);
        }

        .btn-action {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: background-color var(--transition-fast), color var(--transition-fast);
        }
        .btn-action:hover {
          background-color: var(--border-color);
          color: var(--text-primary);
        }

        .empty-state {
          text-align: center;
          padding: 3rem 0;
          color: var(--text-muted);
          font-style: italic;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}