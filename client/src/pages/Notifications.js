import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";
import { useUI } from "../context/UIContext";
import { FileIcon, ShieldIcon, RepeatIcon, ClipboardIcon, AlertTriIcon, CheckIcon, GearIcon } from "../components/Icons";

const NOTIF_CAT_STYLE = {
  Contracts: { color: "#3B82F6", Icon: FileIcon },
  Compliance: { color: "#10B981", Icon: ShieldIcon },
  Renewals: { color: "#14B8A6", Icon: RepeatIcon },
  Workflow: { color: "#F59E0B", Icon: ClipboardIcon },
  "Risk Alerts": { color: "#8B5CF6", Icon: AlertTriIcon },
  Approvals: { color: "#6366F1", Icon: CheckIcon },
  System: { color: "#64748B", Icon: GearIcon },
};
const FILTERS = ["All", "Contracts", "Compliance", "Renewals", "Workflow", "Risk Alerts", "Approvals", "System"];

const NOTIFS = [
  { id: 1, cat: "Renewals", urgency: "critical", title: "Contract Expiring Urgently", desc: "CTR-2024-005 (Darwinbox) expires in 25 days. No renewal initiated.", time: "Just now" },
  { id: 2, cat: "Approvals", urgency: "critical", title: "Approval Required", desc: "CTR-2024-006 (Deloitte Audit) is awaiting your legal review and approval.", time: "30 min ago" },
  { id: 3, cat: "Workflow", urgency: "warning", title: "Overdue Obligation", desc: "OBL-004 (Property Insurance Renewal) is overdue by 5 days.", time: "2 hrs ago" },
  { id: 4, cat: "Risk Alerts", urgency: "warning", title: "Risk Alert", desc: "3 contracts flagged for missing SLA clauses \u2014 compliance risk detected.", time: "3 hrs ago" },
  { id: 5, cat: "Compliance", urgency: "info", title: "Compliance Score Updated", desc: "Compliance score increased to 84% after 3 obligations were resolved.", time: "5 hrs ago" },
  { id: 6, cat: "Contracts", urgency: "info", title: "New Contract Assigned", desc: "CTR-2024-007 (Ogilvy) has been assigned to your review queue.", time: "Yesterday" },
  { id: 7, cat: "System", urgency: "info", title: "Scheduled Audit Reminder", desc: "Q2 Financial Controls Audit scheduled for Jul 25 \u2014 3 weeks away.", time: "Yesterday" },
];
const UPCOMING_RENEWALS = [
  { code: "CTR-2024-005", name: "Darwinbox", daysLeft: 25 },
  { code: "CTR-2024-011", name: "Zoho People", daysLeft: 41 },
  { code: "CTR-2024-014", name: "AWS Enterprise", daysLeft: 58 },
];

export default function Notifications() {
  const { setNotificationCount } = useUI();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [dismissed, setDismissed] = useState([]);
  const [viewMsg, setViewMsg] = useState("");

  const all = NOTIFS.filter((n) => !dismissed.includes(n.id));
  const filtered = filter === "All" ? all : all.filter((n) => n.cat === filter);
  const counts = { critical: 0, warning: 0, info: 0 };
  all.forEach((n) => counts[n.urgency]++);

  function markAllRead() {
    setNotificationCount(0);
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <div className="page-title" style={{ marginBottom: 0 }}>Notifications Center</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--info)", cursor: "pointer" }} onClick={markAllRead}>Mark all read</span>
          <span
            style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
            onClick={() => navigate("/settings")}
          >
            <GearIcon size={14} /> Settings
          </span>
        </div>
      </div>
      <div className="page-sub">Stay updated with approvals, renewals, compliance alerts, and risk insights.</div>

      <div className="grid-2">
        <div>
          <div className="chip-row">
            {FILTERS.map((f) => (
              <div key={f} className={"chip" + (filter === f ? " active" : "")} onClick={() => setFilter(f)} style={{ cursor: "pointer" }}>{f}</div>
            ))}
          </div>
          <div className="card">
            {filtered.length === 0 && <div style={{ padding: "30px 0", textAlign: "center", color: "var(--text-secondary)", fontSize: 12.5 }}>No notifications in this category.</div>}
            {filtered.map((n) => {
              const s = NOTIF_CAT_STYLE[n.cat];
              return (
                <div className="notif-item" key={n.id}>
                  <div className="ico" style={{ background: s.color + "22", color: s.color }}><s.Icon size={18} /></div>
                  <div className="body">
                    <strong>{n.title}</strong>
                    <span className="badge" style={{ background: s.color + "1a", color: s.color, margin: "4px 0" }}>{n.cat}</span>
                    <p>{n.desc}</p>
                    <div className="time">{n.time}</div>
                    <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                      <button className="action" onClick={() => setViewMsg("Opening: " + n.title)}>View Details</button>
                      <button className="action" style={{ color: "var(--text-secondary)" }} onClick={() => setDismissed((d) => [...d, n.id])}>Dismiss</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {viewMsg && <div className="muted" style={{ marginTop: 10 }}>{viewMsg}</div>}
        </div>
        <div>
          <div className="card" style={{ padding: 20, marginBottom: 20 }}>
            <div className="section-title">Today's Summary</div>
            <p style={{ fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
              You have {counts.critical} urgent item{counts.critical === 1 ? "" : "s"} requiring action \u2014 a contract expiry and an approval request.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, textAlign: "center", padding: "12px 6px", borderRadius: 10, background: "rgba(239,68,68,0.08)" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--danger)" }}>{counts.critical}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Critical</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: "12px 6px", borderRadius: 10, background: "rgba(245,158,11,0.08)" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--warning)" }}>{counts.warning}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Warnings</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: "12px 6px", borderRadius: 10, background: "rgba(59,130,246,0.08)" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--info)" }}>{counts.info}</div>
                <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>Info</div>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div className="section-title">Upcoming Renewals</div>
            {UPCOMING_RENEWALS.map((r) => (
              <div className="stat-row" key={r.code}>
                <span>{r.code} <span style={{ color: "var(--text-secondary)" }}>({r.name})</span></span>
                <strong style={{ color: r.daysLeft <= 25 ? "var(--danger)" : r.daysLeft <= 45 ? "var(--warning)" : "var(--emerald)" }}>{r.daysLeft}d left</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
