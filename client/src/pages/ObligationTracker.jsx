import React from 'react';

const ObligationTracker = () => {
  const obligations = [
    { id: 'OBL-001', contract: 'Acme Corp NDA', description: 'Submit Q3 Financials', dueDate: 'Jul 15, 2026', status: 'Pending', priority: 'High' },
    { id: 'OBL-002', contract: 'TechFlow MSA', description: 'Renew SLA terms', dueDate: 'Jul 20, 2026', status: 'In Progress', priority: 'Medium' },
    { id: 'OBL-003', contract: 'Global Logistics SLA', description: 'Quarterly compliance audit', dueDate: 'Jun 30, 2026', status: 'Completed', priority: 'High' },
    { id: 'OBL-004', contract: 'CloudSystems Vendor', description: 'Update security certificates', dueDate: 'Jul 02, 2026', status: 'Overdue', priority: 'Critical' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--primary-color)' }}>Obligation Tracker</h1>
          <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)' }}>Track and manage deliverables and deadlines across all contracts.</p>
        </div>
        <button className="premium-button" style={{ width: 'auto', padding: '12px 24px' }}>
          <i className="fa-solid fa-plus" style={{ marginRight: '8px' }}></i> New Task
        </button>
      </div>

      <div className="premium-table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Contract</th>
              <th>Task Description</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {obligations.map((obl, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600 }}>{obl.id}</td>
                <td>{obl.contract}</td>
                <td>{obl.description}</td>
                <td style={{ color: obl.status === 'Overdue' ? 'var(--danger-color)' : 'inherit', fontWeight: obl.status === 'Overdue' ? 600 : 'normal' }}>
                  {obl.dueDate}
                </td>
                <td>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                    backgroundColor: obl.priority === 'Critical' ? 'rgba(209,67,67,0.1)' : obl.priority === 'High' ? 'rgba(255,176,32,0.1)' : 'rgba(99,91,255,0.1)',
                    color: obl.priority === 'Critical' ? 'var(--danger-color)' : obl.priority === 'High' ? 'var(--warning-color)' : 'var(--secondary-color)'
                  }}>
                    {obl.priority}
                  </span>
                </td>
                <td><span className={`badge ${obl.status === 'Completed' ? 'active' : obl.status === 'Overdue' ? 'expired' : 'pending'}`}>{obl.status}</span></td>
                <td>
                  <button className="premium-button" style={{ padding: '6px 12px', fontSize: '12px', width: 'auto', margin: 0 }}>Mark Done</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ObligationTracker;
