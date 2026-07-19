import React, { useState, useEffect } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(console.error);
  }, []);

  const handleExport = () => {
    if (transactions.length === 0) return;
    const headers = ['Transaction ID', 'Date', 'Description', 'Amount', 'Status'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => `"${t.id}","${t.date}","${t.description}","${t.amount}","${t.status}"`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions-ledger.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', color: 'var(--primary-color)' }}>Financial Transactions</h1>
          <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)' }}>Track all payments and monetary exchanges tied to your contracts.</p>
        </div>
        <button onClick={handleExport} className="premium-button" style={{ width: 'auto', padding: '12px 24px' }}>
          <i className="fa-solid fa-download" style={{ marginRight: '8px' }}></i> Export Ledger
        </button>
      </div>

      <div className="premium-table-container">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{trx.id}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{trx.date}</td>
                <td style={{ fontWeight: 500 }}>{trx.description}</td>
                <td style={{ fontWeight: 600 }}>{trx.amount}</td>
                <td>
                  <span className={`badge ${trx.status.toLowerCase()}`}>
                    {trx.status}
                  </span>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>Loading transactions...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
