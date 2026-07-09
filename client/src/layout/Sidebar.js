import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUI } from "../context/UIContext";
import {
  GridIcon, FileIcon, ClipboardIcon, RepeatIcon, ShieldIcon, BarIcon,
  BellIcon, BookIcon, UsersIcon, GearIcon, ChevLeftIcon, ChevDownIcon,
} from "../components/Icons";

const MENU = [
  { to: "/", label: "Dashboard", Icon: GridIcon },
  { to: "/repository", label: "Contract Repository", Icon: FileIcon },
  { to: "/obligations", label: "Obligation Tracker", Icon: ClipboardIcon },
  { to: "/renewals", label: "Renewal Dashboard", Icon: RepeatIcon },
  { to: "/compliance", label: "Compliance", Icon: ShieldIcon },
  { to: "/reports", label: "Reports & Analytics", Icon: BarIcon },
  { to: "/notifications", label: "Notifications", Icon: BellIcon, badgeKey: "notifications" },
  { to: "/audit", label: "Audit Logs", Icon: BookIcon },
  { to: "/users", label: "User Management", Icon: UsersIcon },
  { to: "/settings", label: "Settings", Icon: GearIcon },
];

export default function Sidebar({ collapsed = false, mobileOpen = false }) {
  const { notificationCount } = useUI();
  const [statusCollapsed, setStatusCollapsed] = useState(false);
  if (collapsed && !mobileOpen) return null;

  return (
    <aside className={"sidebar" + (mobileOpen ? " mobile-open" : "")} aria-label="Main navigation">
      <div className="sb-brand">
        <div className="mark"><ShieldIcon size={17} color="#fff" /></div>
        <h1>ContractIQ</h1>
        <button className="collapse" type="button" style={{ marginLeft: "auto", background: "transparent", border: 0, color: "#5B6B85" }}>
          <ChevLeftIcon />
        </button>
      </div>
      <div className="sb-divider" />
      <div className="sb-menu-label">MAIN MENU</div>
      <div className="sb-nav">
        {MENU.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => "sb-item" + (isActive ? " active" : "")}
          >
            <item.Icon size={17} />
            <span>{item.label}</span>
            {item.badgeKey === "notifications" && notificationCount > 0 ? (
              <span className="sb-badge">{notificationCount}</span>
            ) : null}
          </NavLink>
        ))}
      </div>
      <div className="sb-status">
        <button type="button" className="sb-status-head" onClick={() => setStatusCollapsed((c) => !c)}>
          <span className="dot" /> System Operational
          <span className={"chev" + (statusCollapsed ? " collapsed" : "")}><ChevDownIcon /></span>
        </button>
        {!statusCollapsed && (
          <div className="sb-status-body">
            <div className="sb-status-row"><span>API Server</span><span className="ok"><span className="dot" />OK</span></div>
            <div className="sb-status-row"><span>Database</span><span className="ok"><span className="dot" />OK</span></div>
            <div className="sb-status-row"><span>Queue</span><span className="ok"><span className="dot" />OK</span></div>
          </div>
        )}
      </div>
    </aside>
  );
}
