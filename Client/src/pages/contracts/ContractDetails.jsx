import React, { useState } from 'react';
import './Contracts.css'; // Styling file detailed below

const ContractDetails = ({ contract, onBack, onEditClick }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  if (!contract) return <div className="loading-state">No contract data available.</div>;

  return (
    <div className="details-container">
      {/* Breadcrumb Navigation Line */}
      <div className="breadcrumb-nav">
        <span className="breadcrumb-link" onClick={onBack}>Contracts</span> 
        <span className="breadcrumb-separator">›</span> 
        <span className="breadcrumb-current">{contract.id}</span>
      </div>

      {/* Main Top Header Metric Section */}
      <div className="details-card-header">
        <div className="left-meta-info">
          <div className="status-badge-row">
            <span className={`status-badge-pill ${contract.status.toLowerCase().replace(' ', '-')}`}>
              {contract.status}
            </span>
            <span className="mono-id-tag">{contract.id}</span>
          </div>
          <h1 className="contract-display-title">{contract.title}</h1>
          <p className="vendor-type-subtext">{contract.vendor} • {contract.type}</p>
        </div>

        <div className="right-action-metric">
          <div className="action-top-row">
            <button className="btn-details-download">📥 Download</button>
            <button className="btn-details-edit" onClick={() => onEditClick(contract)}>✏️ Edit</button>
          </div>
          <div className="value-metric-block">
            <div className="metric-val">{contract.value}</div>
            <div className="metric-label">Total Contract Value</div>
          </div>
        </div>
      </div>

      {/* Quick Dates & Owner Metadata Stripe */}
      <div className="metadata-grid-stripe">
        <div className="meta-block">
          <span className="meta-label">Start Date</span>
          <span className="meta-value">{contract.startDate || '2024-01-15'}</span>
        </div>
        <div className="meta-block">
          <span className="meta-label">End Date</span>
          <span className="meta-value">{contract.end_date}</span>
        </div>
        <div className="meta-block">
          <span className="meta-label">Owner</span>
          <span className="meta-value">{contract.owner || 'N/A'}</span>
        </div>
        <div className="meta-block">
          <span className="meta-label">Compliance</span>
          <span className="meta-value">{contract.compliance}</span>
        </div>
      </div>

      {/* Tab Navigation Menu */}
      <div className="tabs-navigation-menu">
        {['Overview', 'Obligations', 'Documents', 'History'].map((tab) => (
          <button
            key={tab}
            className={`tab-menu-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Content Panel Layout splits into primary content and right compliance widget */}
      <div className="details-content-split">
        
        {/* Left Primary Information Block */}
        <div className="left-split-panel">
          {activeTab === 'Overview' && (
            <>
              {/* Summary Block */}
              <div className="info-content-card">
                <h3 className="card-box-title">Contract Summary</h3>
                <p className="card-box-paragraph">
                  This enterprise agreement covers cloud infrastructure services including compute, storage, 
                  networking, and managed services with 99.95% SLA uptime guarantee, 24/7 support, 
                  and dedicated account management.
                </p>
              </div>

              {/* Key Terms Table Layout */}
              <div className="info-content-card">
                <h3 className="card-box-title">Key Terms</h3>
                <table className="terms-stripped-table">
                  <tbody>
                    <tr>
                      <td className="term-property">Auto-renewal</td>
                      <td className="term-response-val">Enabled – 90 days notice</td>
                    </tr>
                    <tr>
                      <td className="term-property">Payment</td>
                      <td className="term-response-val">Annual prepayment</td>
                    </tr>
                    <tr>
                      <td className="term-property">Governing Law</td>
                      <td className="term-response-val">California, USA</td>
                    </tr>
                    <tr>
                      <td className="term-property">Liability Cap</td>
                      <td className="term-response-val">100% of annual fees</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'Obligations' && (
            <div className="info-content-card">
              <h3 className="card-box-title">Active Obligations</h3>
              <p className="card-box-paragraph">Tracking item operations and recurring metrics associated with delivery schedules.</p>
            </div>
          )}

          {activeTab === 'Documents' && (
            <div className="info-content-card">
              <h3 className="card-box-title">Associated Attachments</h3>
              <p className="card-box-paragraph">Original uploaded PDF files and amendment extensions.</p>
            </div>
          )}

          {activeTab === 'History' && (
            <div className="info-content-card">
              <h3 className="card-box-title">Audit Log History</h3>
              <p className="card-box-paragraph">Lifecycle updates logged systematically from state initialization changes.</p>
            </div>
          )}
        </div>

        {/* Right Circular Compliance Panel Section */}
        <div className="right-split-panel">
          <div className="info-content-card compliance-widget">
            <h3 className="card-box-title">Compliance</h3>
            
            {/* SVG Progress Circle Ring matching 95% look */}
            <div className="circular-progress-box">
              <svg className="progress-svg-dims" viewBox="0 0 100 100">
                <circle className="circle-bg-track" cx="50" cy="50" r="40" />
                <circle 
                  className="circle-active-fill" 
                  cx="50" cy="50" r="40" 
                  style={{ strokeDasharray: `${2 * Math.PI * 40}`, strokeDashoffset: `${2 * Math.PI * 40 * (1 - contract.compliance / 100)}` }}
                />
              </svg>
              <div className="absolute-percentage-center">{contract.compliance}</div>
            </div>

            {/* Sub Metric Fill Strips */}
            <div className="compliance-sub-metrics">
              <div className="sub-strip-item">
                <div className="sub-strip-meta"><span>Documentation</span><span>98%</span></div>
                <div className="sub-progress-bg"><div className="sub-progress-fill" style={{ width: '98%' }} /></div>
              </div>
              <div className="sub-strip-item">
                <div className="sub-strip-meta"><span>Obligations</span><span>92%</span></div>
                <div className="sub-progress-bg"><div className="sub-progress-fill" style={{ width: '92%' }} /></div>
              </div>
              <div className="sub-strip-item">
                <div className="sub-strip-meta"><span>Renewals</span><span>87%</span></div>
                <div className="sub-progress-bg"><div className="sub-progress-fill" style={{ width: '87%' }} /></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ContractDetails;