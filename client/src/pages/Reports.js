import "./Reports.css";

const KPIS = [
  { label: "Contracts Signed (QTD)", value: "34" },
  { label: "Avg. Turnaround Time", value: "6.2 days" },
  { label: "Total Contract Value", value: "$2.1M" },
  { label: "Renewal Rate", value: "91%" },
];
const MONTHLY_VOLUME = [
  { month: "Feb", value: 18 }, { month: "Mar", value: 22 }, { month: "Apr", value: 19 },
  { month: "May", value: 27 }, { month: "Jun", value: 24 }, { month: "Jul", value: 34 },
];
const TEMPLATES = [
  { title: "Compliance Summary", sub: "Score trend + open flags, last 90 days" },
  { title: "Obligation Status", sub: "All obligations grouped by owner and status" },
  { title: "Contract Portfolio", sub: "Full repository export with value & expiry" },
  { title: "Audit Trail", sub: "Every logged action for a chosen date range" },
];

export default function Reports() {
  const maxVal = Math.max(...MONTHLY_VOLUME.map((m) => m.value));

  return (
    <div className="page-surface reports-page">
      <h2>Reports & Analytics</h2>
      <p className="muted">Run reports and export analytics.</p>

      <div className="kpi-grid" style={{ marginTop: 18 }}>
        {KPIS.map((k) => (
          <div className="kpi-card" key={k.label}>
            <div className="kpi-val">{k.value}</div>
            <div className="kpi-lbl">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-split">
        <div>
          <div className="section-title">Contract Volume \u2014 Last 6 Months</div>
          <div className="bar-chart">
            {MONTHLY_VOLUME.map((m) => (
              <div className="bar-col" key={m.month}>
                <div className="bar-fill" style={{ height: (m.value / maxVal) * 100 + "%" }} />
                <span>{m.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="section-title">Report Templates</div>
          {TEMPLATES.map((t) => (
            <div className="report-row" key={t.title}>
              <div>
                <div className="task-title">{t.title}</div>
                <div className="task-meta">{t.sub}</div>
              </div>
              <button className="btn-ghost">Export</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
