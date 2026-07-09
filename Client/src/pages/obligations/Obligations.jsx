import React, { useState } from 'react';
import { 
  Plus, Search, Filter, CheckCircle, Clock, 
  AlertTriangle, MoreVertical, Calendar, 
  ArrowRight, LayoutList 
} from 'lucide-react';
import FormInput from '../../components/Form/FormInput';
import FormSelect from '../../components/Form/FormSelect';
import Button from '../../components/Buttons/Button';
import Modal from '../../components/Modals/Modal';
import './Obligations.css';

const Obligations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const [obligations, setObligations] = useState([
    { id: 'OBL-101', description: 'Quarterly Payment to Vendor', contractId: 'CON-2023-001', dueDate: '2023-09-30', status: 'Pending', priority: 'High' },
    { id: 'OBL-102', description: 'Annual Security Audit', contractId: 'CON-2023-045', dueDate: '2023-11-15', status: 'Completed', priority: 'High' },
    { id: 'OBL-103', description: 'Software License Renewal Notice', contractId: 'CON-2023-089', dueDate: '2023-08-01', status: 'Overdue', priority: 'Medium' },
    { id: 'OBL-104', description: 'Submit Performance Report', contractId: 'CON-2022-404', dueDate: '2023-12-01', status: 'Pending', priority: 'Low' },
    { id: 'OBL-105', description: 'Data Processing Addendum Review', contractId: 'CON-2021-112', dueDate: '2023-10-15', status: 'Pending', priority: 'Medium' },
  ]);
  const [menuOpen, setMenuOpen] = useState(null);
const [selectedObligation, setSelectedObligation] = useState(null);

  const [newObligation, setNewObligation] = useState({
  description: '',
  contractId: '',
  dueDate: '',
  status: 'Pending',
  priority: 'Medium',
  assignedTo: '',
  progress: '0%',
  obligationType: 'Payment Obligation'
});

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed': return <span className="status-pill status-success"><CheckCircle size={14} /> {status}</span>;
      case 'Pending': return <span className="status-pill status-warning"><Clock size={14} /> {status}</span>;
      case 'Overdue': return <span className="status-pill status-danger"><AlertTriangle size={14} /> {status}</span>;
      default: return <span className="status-pill status-default">{status}</span>;
    }
  };
  
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'High': return <span className="priority-dot dot-danger">High</span>;
      case 'Medium': return <span className="priority-dot dot-warning">Medium</span>;
      case 'Low': return <span className="priority-dot dot-success">Low</span>;
      default: return <span className="priority-dot">{priority}</span>;
    }
  };

  const getDueDateStatus = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return <span style={{ color: "red" }}>🔴 Overdue</span>;
  }

  if (diffDays === 0) {
    return <span style={{ color: "orange" }}>🟠 Due Today</span>;
  }

  if (diffDays === 1) {
    return <span style={{ color: "orange" }}>🟠 Due Tomorrow</span>;
  }

  return <span style={{ color: "green" }}>🟢 Due in {diffDays} days</span>;
};

  const handleAddObligation = (e) => {
  e.preventDefault();

  const id = `OBL-${Math.floor(Math.random() * 900) + 100}`;

  setObligations([{ id, ...newObligation }, ...obligations]);

  setIsAddModalOpen(false);
setNewObligation({
  description: '',
  contractId: '',
  dueDate: '',
  status: 'Pending',
  priority: 'Medium',
  assignedTo: '',
  progress: '0%',
  obligationType: 'Payment Obligation',
});
  // Success message
  alert("✅ Obligation added successfully!");
};

  const handleStatusChange = (e, id, newStatus) => {
    e.stopPropagation();
    setObligations(obligations.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };
  const overdueCount = obligations.filter(
  (o) => o.status === "Overdue"
).length;

const pendingCount = obligations.filter(
  (o) => o.status === "Pending"
).length;

const completedCount = obligations.filter(
  (o) => o.status === "Completed"
).length;

  const filteredObligations = obligations.filter(o => {
    const matchesSearch = o.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.contractId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          o.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? o.status === filterStatus : true;
    const matchesPriority = filterPriority ? o.priority === filterPriority : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="obl-dashboard fade-in">
      <div className="obl-header-section">
        <div className="obl-header-content">
          <h1 className="obl-title">Obligation Tracking</h1>
          <p className="obl-subtitle">Monitor and manage all contractual obligations, deliverables, and deadlines.</p>
        </div>
        <div className="obl-header-actions">
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)} icon={Plus}>
            New Obligation
          </Button>
        </div>
      </div>

      <div className="obl-analytics-grid">
        <div className="obl-card glass-orange">
          <div className="obl-card-top">
            <div className="obl-card-icon"><AlertTriangle size={24} /></div>
          </div>
          <div className="obl-card-data">
            <h3>Overdue Actions</h3>
            <div className="obl-val">{overdueCount}</div>
            <p>Immediate attention required</p>
          </div>
        </div>

        <div className="obl-card glass-blue">
          <div className="obl-card-top">
            <div className="obl-card-icon"><Clock size={24} /></div>
          </div>
          <div className="obl-card-data">
            <h3>Pending Deliverables</h3>
            <div className="obl-val">{pendingCount}</div>
            <p>Upcoming in next 30 days</p>
          </div>
        </div>

        <div className="obl-card glass-green">
          <div className="obl-card-top">
            <div className="obl-card-icon"><CheckCircle size={24} /></div>
          </div>
          <div className="obl-card-data">
            <h3>Completed Tasks</h3>
            <div className="obl-val">{completedCount}</div>
            <p>Successfully met this month</p>
          </div>
        </div>
      </div>

      <div className="obl-main-area animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="obl-toolbar">
          <div className="obl-search">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search description or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="obl-filters">
            <select 
              className="obl-select"
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
            <select 
              className="obl-select"
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="obl-table-wrapper">
          <table className="obl-data-table">
            <thead>
              <tr>
                <th>Obligation Details</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Progress</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredObligations.map((obligation, index) => (
              <tr
  key={obligation.id}
  className="obl-table-row"
  style={{
    animationDelay: `${index * 0.05}s`,
    backgroundColor:
      obligation.status === "Overdue" ? "#ffeaea" : "transparent",
  }}
>
                  <td>
                    <div className="obl-entity">{obligation.description}</div>
                   <div className="obl-meta">
  ID: {obligation.id} • Contract: {obligation.contractId}
</div>

<div className="obl-meta">
  Assigned To: {obligation.assignedTo || "Not Assigned"}
</div>

<div className="obl-meta">
  Progress: {obligation.progress}
</div>

<div className="obl-meta">
  Type: {obligation.obligationType}
</div>
                  </td>
                  <td>
  <div className="obl-value-text flex items-center gap-2">
    <Calendar size={14} className="text-muted" />
    {obligation.dueDate}
  </div>

  <div style={{ marginTop: "4px", fontSize: "12px" }}>
    {getDueDateStatus(obligation.dueDate)}
  </div>
</td>
                  <td>{getPriorityBadge(obligation.priority)}</td>

<td>
  <span className="status-pill status-default">
    {obligation.progress}
  </span>
</td>

<td>{getStatusBadge(obligation.status)}</td>
                  <td className="obl-action-cell">
                    <div className="obl-action-group">
                      {obligation.status !== 'Completed' && (
                        <button 
                          className="obl-action-btn complete-btn" 
                          title="Mark Completed" 
                          onClick={(e) => handleStatusChange(e, obligation.id, 'Completed')}
                        >
                          <CheckCircle size={14} /> Done
                        </button>
                      )}
                      <div style={{ position: "relative" }}>
  <button
    className="obl-icon-btn"
    onClick={() =>
      setMenuOpen(menuOpen === obligation.id ? null : obligation.id)
    }
  >
    <MoreVertical size={16} />
  </button>

  {menuOpen === obligation.id && (
    <div className="action-menu">
      <button
  onClick={() => {
    setSelectedObligation(obligation);
    setNewObligation(obligation);
    setIsAddModalOpen(true);
    setMenuOpen(null);
  }}
>
  ✏️ Edit
</button>
      <button
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this obligation?")) {
      setObligations(
        obligations.filter((o) => o.id !== obligation.id)
      );
    }
    setMenuOpen(null);
  }}
>
  🗑️ Delete
</button>
    </div>
  )}
</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredObligations.length === 0 && (
            <div className="obl-empty-state">
              <LayoutList size={48} className="text-muted" style={{ opacity: 0.5, margin: '0 auto 1rem' }} />
              <p>No obligations found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Obligation"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="button" variant="primary" onClick={handleAddObligation}>Save Obligation</Button>
          </>
        }
      >
        <form onSubmit={handleAddObligation} id="add-obligation-form">
          <FormInput 
            label="Description"
            type="text" 
            placeholder="e.g. Submit quarterly tax report" 
            required 
            value={newObligation.description}
            onChange={(e) => setNewObligation({...newObligation, description: e.target.value})}
          />
          <FormInput
  label="Contract ID"
  type="text"
  placeholder="e.g. CON-2023-001"
  required
  value={newObligation.contractId}
  onChange={(e) =>
    setNewObligation({
      ...newObligation,
      contractId: e.target.value,
    })
  }
/>
          <FormInput
  label="Due Date"
  type="date"
  required
  value={newObligation.dueDate}
  onChange={(e) =>
    setNewObligation({
      ...newObligation,
      dueDate: e.target.value,
    })
  }
/>

<FormSelect
  label="Assigned To"
  value={newObligation.assignedTo}
  onChange={(e) =>
    setNewObligation({
      ...newObligation,
      assignedTo: e.target.value,
    })
  }
  options={[
    { value: "", label: "Select Employee" },
    { value: "John", label: "John" },
    { value: "Alice", label: "Alice" },
    { value: "David", label: "David" },
    { value: "Sarah", label: "Sarah" },
    { value: "Michael", label: "Michael" },
  ]}
/>

<FormSelect
  label="Progress"
  value={newObligation.progress}
  onChange={(e) =>
    setNewObligation({
      ...newObligation,
      progress: e.target.value,
    })
  }
  options={[
    { value: "0%", label: "0%" },
    { value: "25%", label: "25%" },
    { value: "50%", label: "50%" },
    { value: "75%", label: "75%" },
    { value: "100%", label: "100%" },
  ]}
/>

<FormSelect
  label="Obligation Type"
  value={newObligation.obligationType}
  onChange={(e) =>
    setNewObligation({
      ...newObligation,
      obligationType: e.target.value,
    })
  }
  options={[
    { value: "Payment Obligation", label: "Payment Obligation" },
    { value: "Delivery Commitment", label: "Delivery Commitment" },
    { value: "Reporting Requirement", label: "Reporting Requirement" },
    { value: "Renewal Condition", label: "Renewal Condition" },
    { value: "Service Level Agreement", label: "Service Level Agreement" },
    { value: "Legal Compliance", label: "Legal Compliance" },
  ]}
/>          
        </form>
           </Modal>
    </div>
  );
};

export default Obligations;