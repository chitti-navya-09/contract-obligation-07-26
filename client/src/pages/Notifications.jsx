import React from 'react';

const Notifications = () => {
  const notifs = [
    { type: 'danger', icon: 'fa-triangle-exclamation', title: 'Action Required: MSA Expiring', text: 'TechFlow Inc MSA is expiring in 15 days.', time: '2 hours ago' },
    { type: 'success', icon: 'fa-check-circle', title: 'Obligation Met', text: 'Quarterly compliance audit completed.', time: '5 hours ago' },
    { type: 'primary', icon: 'fa-file-signature', title: 'New Contract Uploaded', text: 'Jane Doe uploaded "Acme Corp NDA".', time: '1 day ago' },
  ];

  return (
    <div>
      <h1 style={{ margin: '0 0 32px 0', fontSize: '28px', color: 'var(--primary-color)' }}>Notifications</h1>
      
      <div className="stat-card" style={{ padding: 0, overflow: 'hidden' }}>
        {notifs.map((n, idx) => (
          <div key={idx} style={{ padding: '20px 24px', borderBottom: idx !== notifs.length - 1 ? '1px solid #e5e7eb' : 'none', display: 'flex', alignItems: 'flex-start', transition: 'background-color 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: '16px', backgroundColor: n.type === 'danger' ? 'rgba(209,67,67,0.1)' : n.type === 'success' ? 'rgba(0,217,36,0.1)' : 'rgba(99,91,255,0.1)', color: n.type === 'danger' ? 'var(--danger-color)' : n.type === 'success' ? 'var(--success-color)' : 'var(--secondary-color)' }}>
              <i className={`fa-solid ${n.icon}`}></i>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>{n.title}</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{n.text}</div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              {n.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
