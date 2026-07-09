import { useState } from "react";
import "./Audit.css";
import ButtonGroup from "../components/Buttons/ButtonGroup";

const LOGS = [
  { id: 1, time: "Jul 7, 2026 \u00b7 9:42 AM", actor: "Arjun Mehta", action: "Updated obligation status", target: "Vendor SLA Renewal", cat: "workflow" },
  { id: 2, time: "Jul 7, 2026 \u00b7 8:15 AM", actor: "Priya Nair", action: "Uploaded new contract", target: "CTR-2024-008", cat: "contracts" },
  { id: 3, time: "Jul 6, 2026 \u00b7 5:03 PM", actor: "System", action: "Auto-flagged missing SLA clause", target: "CTR-2024-003", cat: "compliance" },
  { id: 4, time: "Jul 6, 2026 \u00b7 2:47 PM", actor: "Karan Shah", action: "Marked obligation overdue", target: "Insurance Certificate Submission", cat: "workflow" },
  { id: 5, time: "Jul 6, 2026 \u00b7 11:20 AM", actor: "Arjun Mehta", action: "Enabled Two-Factor Authentication", target: "Account Security", cat: "security" },
  { id: 6, time: "Jul 5, 2026 \u00b7 4:10 PM", actor: "Meera Rao", action: "Connected integration", target: "DocuSign", cat: "settings" },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "contracts", label: "Contracts" },
  { key: "workflow", label: "Workflow" },
  { key: "compliance", label: "Compliance" },
  { key: "security", label: "Security" },
  { key: "settings", label: "Settings" },
];
const CAT_COLOR = { contracts: "#3B82F6", workflow: "#F59E0B", compliance: "#10B981", security: "#EF4444", settings: "#8B5CF6" };

export default function Audit() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? LOGS : LOGS.filter((l) => l.cat === filter);

  return (
    <div className="page-surface audit-page">
      <h2>Audit Logs</h2>
      <p className="muted">View system and user activity logs.</p>

      <ButtonGroup options={FILTERS} value={filter} onChange={setFilter} />

      <div className="audit-list">
        {filtered.map((l) => (
          <div className="audit-row" key={l.id}>
            <span className="audit-time">{l.time}</span>
            <span><strong>{l.actor}</strong> \u2014 {l.action} <span className="muted">({l.target})</span></span>
            <span className="badge-pill" style={{ background: CAT_COLOR[l.cat] + "22", color: CAT_COLOR[l.cat] }}>{l.cat}</span>
          </div>
        ))}
        {filtered.length === 0 && <p className="muted" style={{ padding: 20 }}>No entries in this category.</p>}
      </div>
    </div>
  );
}
