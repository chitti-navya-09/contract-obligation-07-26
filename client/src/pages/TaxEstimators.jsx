import React, { useState, useEffect } from 'react';

const TaxEstimators = () => {
  const [taxData, setTaxData] = useState(null);

  useEffect(() => {
    fetch('/api/tax-estimators')
      .then(res => res.json())
      .then(data => setTaxData(data))
      .catch(console.error);
  }, []);

  if (!taxData) {
    return <div>Loading tax estimations...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--primary-color)' }}>Tax Estimators</h1>
          <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)' }}>Automated estimations for contract liabilities and deductions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Estimated Total Tax</h3>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--primary-color)' }}>{taxData.estimatedTax}</div>
        </div>
        <div className="stat-card">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Effective Tax Rate</h3>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--warning-color)' }}>{taxData.taxRate}</div>
        </div>
        <div className="stat-card">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Total Deductions</h3>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--success-color)' }}>{taxData.deductions}</div>
        </div>
        <div className="stat-card">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Projected Net Income</h3>
          <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--secondary-color)' }}>{taxData.netIncome}</div>
        </div>
      </div>

      <div className="premium-table-container w-full lg:w-2/3">
        <h2 className="table-title border-b p-4 mb-0">Tax Breakdown</h2>
        <table className="premium-table">
          <thead>
            <tr>
              <th>Jurisdiction / Category</th>
              <th>Estimated Amount</th>
            </tr>
          </thead>
          <tbody>
            {taxData.breakdown.map((item, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 500 }}>{item.category} Tax</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxEstimators;
