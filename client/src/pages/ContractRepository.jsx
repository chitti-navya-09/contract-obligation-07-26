import React, { useState } from 'react';
import Modal from '../components/Modals/Modal';

const ContractRepository = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for contracts
  const contracts = [
    { id: 'CTR-2026-001', vendor: 'Acme Corp', type: 'NDA', status: 'Active', value: '$50,000', owner: 'Jane Doe', date: 'Jul 12, 2026' },
    { id: 'CTR-2026-002', vendor: 'TechFlow Inc', type: 'MSA', status: 'Pending', value: '$120,000', owner: 'John Smith', date: 'Jul 10, 2026' },
    { id: 'CTR-2026-003', vendor: 'Global Logistics', type: 'SLA', status: 'Active', value: '$85,000', owner: 'Jane Doe', date: 'Jul 05, 2026' },
    { id: 'CTR-2026-004', vendor: 'CloudSystems', type: 'Vendor', status: 'Expired', value: '$10,000', owner: 'Alice Wong', date: 'Jun 28, 2026' },
    { id: 'CTR-2026-005', vendor: 'Marketing Pros', type: 'NDA', status: 'Active', value: '$25,000', owner: 'John Smith', date: 'Jun 15, 2026' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--primary-color)' }}>Contract Repository</h1>
          <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)' }}>Manage, search, and upload all your corporate contracts.</p>
        </div>
        <button className="premium-button" style={{ width: 'auto', padding: '12px 24px', display: 'flex', alignItems: 'center' }} onClick={() => setIsModalOpen(true)}>
          <i className="fa-solid fa-plus" style={{ marginRight: '8px' }}></i> Add New Contract
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', backgroundColor: '#fff', padding: '16px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid #e5e7eb' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <i className="fa-solid fa-search" style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-secondary)' }}></i>
          <input 
            type="text" 
            className="premium-input" 
            placeholder="Search by vendor, ID, or owner..." 
            style={{ paddingLeft: '44px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="premium-input" style={{ width: '200px' }}>
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Expired">Expired</option>
        </select>
        <select className="premium-input" style={{ width: '200px' }}>
          <option value="">All Types</option>
          <option value="NDA">NDA</option>
          <option value="MSA">MSA</option>
          <option value="SLA">SLA</option>
        </select>
      </div>

      {/* Contracts Table */}
      <div className="premium-table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Contract ID</th>
              <th>Counterparty</th>
              <th>Type</th>
              <th>Value</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 600, color: 'var(--secondary-color)' }}>{contract.id}</td>
                <td style={{ fontWeight: 500 }}>{contract.vendor}</td>
                <td>{contract.type}</td>
                <td>{contract.value}</td>
                <td>{contract.owner}</td>
                <td>
                  <span className={`badge ${contract.status.toLowerCase()}`}>
                    {contract.status}
                  </span>
                </td>
                <td>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', marginRight: '12px' }} title="View Details">
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }} title="Download PDF">
                    <i className="fa-solid fa-download"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Contract Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload New Contract">
        <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="form-group">
            <label className="form-label">Counterparty / Vendor Name</label>
            <input type="text" className="premium-input" placeholder="e.g. Acme Corp" required />
          </div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label className="form-label">Contract Type</label>
              <select className="premium-input" required>
                <option value="NDA">NDA</option>
                <option value="MSA">MSA</option>
                <option value="SLA">SLA</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label">Contract Value</label>
              <input type="text" className="premium-input" placeholder="$0.00" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Upload File (PDF)</label>
            <div style={{ border: '2px dashed #d1d5db', borderRadius: '8px', padding: '32px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f9fafb' }}>
              <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '32px', color: 'var(--secondary-color)', marginBottom: '12px' }}></i>
              <div style={{ fontWeight: 500 }}>Click to upload or drag and drop</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>PDF, DOCX up to 10MB</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} className="premium-button" style={{ backgroundColor: '#e5e7eb', color: 'var(--text-primary)', width: 'auto', padding: '10px 20px', marginTop: 0 }}>Cancel</button>
            <button type="submit" className="premium-button" style={{ width: 'auto', padding: '10px 20px', marginTop: 0 }}>Save Contract</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ContractRepository;
