import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contracts.css';

const ContractRepository = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal visibility toggler
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dynamic Form Field Payload state
  const [formData, setFormData] = useState({
    title: '',
    vendor: '',
    type: 'SaaS License',
    value: '',
    endDate: '',
    owner: '',
    status: 'Active',
    compliance: 'high'
  });

  const API_BASE_URL = 'http://127.0.0.1:8000/api/contracts';

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          search: searchTerm || undefined,
          status: statusFilter !== 'All' ? statusFilter : undefined
        }
      });
      setContracts(response.data);
    } catch (error) {
      console.error("Backend connection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchContracts();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, statusFilter]);

  // Handle value tracking for each text or menu change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit collected layout straight into the active POST configuration
  const handleSubmitContract = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/`, formData);
      
      // Clear values and fold the modal back up safely
      setIsModalOpen(false);
      setFormData({
        title: '',
        vendor: '',
        type: 'SaaS License',
        value: '',
        endDate: '',
        owner: '',
        status: 'Active',
        compliance: 'high'
      });
      
      fetchContracts(); // Refresh data rows immediately
    } catch (error) {
      console.error("Error creating contract record:", error);
    }
  };

  return (
    <div className="repository-container">
      
      {/* Title Bar Section */}
      <div className="header-row">
        <div>
          <h1 className="title-main">Contract Repository</h1>
          <p className="subtitle-count">{contracts.length} contracts total</p>
        </div>
        <button className="btn-create" onClick={() => setIsModalOpen(true)}>+ New Contract</button>
      </div>

      {/* Filter Block Panel */}
      <div className="filter-panel">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search contracts, vendors..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          {['All', 'Active', 'Renewal Due', 'Under Review'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`btn-filter ${statusFilter === status ? 'active' : 'inactive'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="table-wrapper">
        {loading ? (
          <div className="loading-state">Loading live repository entries...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header">ID</th>
                <th className="table-header">Title / Vendor</th>
                <th className="table-header">Type</th>
                <th className="table-header">Value</th>
                <th className="table-header">End Date</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="cell-mono">{item.id}</td>
                  <td className="cell-data">
                    <div className="contract-title">{item.title}</div>
                    <div className="contract-vendor">{item.vendor}</div>
                  </td>
                  <td className="cell-data" style={{ color: '#475569' }}>{item.type}</td>
                  <td className="cell-data" style={{ fontWeight: '700', color: '#0f172a' }}>{item.value}</td>
                  <td className="cell-data" style={{ color: '#64748b' }}>{item.endDate}</td>
                  <td className="cell-data">
                    <span className={`status-badge ${
                      item.status === 'Active' ? 'active-status' : 
                      item.status === 'Renewal Due' ? 'renewal-status' : 'review-status'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* --- FORM OVERLAY MODAL WINDOW --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Create New Contract</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmitContract}>
              <div className="form-grid">
                
                <div className="form-group">
                  <label className="form-label">Contract Title</label>
                  <input type="text" name="title" required className="form-input" placeholder="e.g. AWS Production Infrastructure" value={formData.title} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Vendor Name</label>
                  <input type="text" name="vendor" required className="form-input" placeholder="e.g. Amazon Web Services" value={formData.vendor} onChange={handleInputChange} />
                </div>

                <div className="form-row-half">
                  <div className="form-group">
                    <label className="form-label">Contract Type</label>
                    <select name="type" className="form-select" value={formData.type} onChange={handleInputChange}>
                      <option>SaaS License</option>
                      <option>Cloud Services</option>
                      <option>Database Software</option>
                      <option>Marketing Services</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contract Value</label>
                    <input type="text" name="value" required className="form-input" placeholder="e.g. $1.20M" value={formData.value} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="form-row-half">
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input type="date" name="endDate" required className="form-input" value={formData.endDate} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contract Owner</label>
                    <input type="text" name="owner" required className="form-input" placeholder="e.g. Sarah Chen" value={formData.owner} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="form-row-half">
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select name="status" className="form-select" value={formData.status} onChange={handleInputChange}>
                      <option>Active</option>
                      <option>Renewal Due</option>
                      <option>Under Review</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Compliance</label>
                    <select name="compliance" className="form-select" value={formData.compliance} onChange={handleInputChange}>
                      <option value="high">High Risk</option>
                      <option value="medium">Medium Risk</option>
                      <option value="low">Low Risk</option>
                    </select>
                  </div>
                </div>

              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Save Contract</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ContractRepository;