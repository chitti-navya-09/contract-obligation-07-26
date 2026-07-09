import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUI } from "../context/UIContext";
import {
  ChevRightSmIcon, SearchIcon, CalendarIcon, MoonIcon, SunIcon, HelpIcon, BellIcon, PlusIcon,
  FileIcon, ClipboardCheckIcon, UsersIcon, BarIcon, DownloadIcon, ChevDownIcon, UserIcon,
  GearIcon, BellSmIcon, SwitchIcon, LogoutIcon, MenuIcon,
} from "../components/Icons";

const ROUTE_TITLES = {
  "/": "Dashboard", "/repository": "Contract Repository", "/obligations": "Obligation Tracker",
  "/renewals": "Renewal Dashboard", "/compliance": "Compliance", "/reports": "Reports & Analytics",
  "/notifications": "Notifications", "/audit": "Audit Logs", "/users": "User Management",
  "/settings": "Settings", "/profile": "My Profile", "/help": "Help & Support", "/calendar": "Calendar",
  "/switch-role": "Switch Role",
};

const NOTIF_PREVIEW = [
  { id: 1, title: "Contract Expiring Urgently", desc: "CTR-2024-005 (Darwinbox) expires in 25 days.", time: "Just now", color: "#14B8A6" },
  { id: 2, title: "Approval Required", desc: "CTR-2024-006 (Deloitte Audit) is awaiting your review.", time: "30 min ago", color: "#6366F1" },
];

const SEARCH_INDEX = [
  { group: "Pages", label: "Dashboard", sub: "Overview & KPIs", to: "/" },
  { group: "Pages", label: "Settings", sub: "General, security, integrations", to: "/settings" },
  { group: "Pages", label: "Help & Support", sub: "FAQs & ticketing", to: "/help" },
  { group: "Pages", label: "Calendar", sub: "Obligations, renewals & tasks", to: "/calendar" },
  { group: "Contracts", label: "MSA \u2014 Cloudline Inc.", sub: "Master Service Agreement \u00b7 Active", to: "/repository" },
  { group: "Contracts", label: "Vendor Agreement \u2014 SafeHaul", sub: "Logistics vendor contract", to: "/repository" },
  { group: "Obligations", label: "Vendor SLA Renewal", sub: "Due Jul 12, 2026 \u00b7 Priya N.", to: "/obligations" },
  { group: "Users", label: "Arjun Mehta", sub: "Administrator", to: "/users" },
];

function useOutsideClick(ref, handler) {
  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [ref, handler]);
}

export default function Navbar({ onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [qaOpen, setQaOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef();
  const bellRef = useRef();
  const qaRef = useRef();
  useOutsideClick(ref, () => setOpen(false));
  useOutsideClick(bellRef, () => setBellOpen(false));
  useOutsideClick(qaRef, () => setQaOpen(false));

  const { notificationCount, setNotificationCount, user, toggleTheme, theme } = useUI();
  const navigate = useNavigate();
  const location = useLocation();
  const initials = (user?.name || "AM").split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const pageTitle = ROUTE_TITLES[location.pathname] || "Dashboard";

  const q = query.trim().toLowerCase();
  const matches = q ? SEARCH_INDEX.filter((it) => (it.label + " " + it.sub + " " + it.group).toLowerCase().includes(q)).slice(0, 8) : [];
  let lastGroup = "";

  function goTo(path) {
    navigate(path);
    setOpen(false); setBellOpen(false); setQaOpen(false);
  }

  return (
    <header className="topbar">
      <button className="icon-btn" onClick={onToggleSidebar} aria-label="Toggle menu" title="Toggle menu">
        <MenuIcon />
      </button>
      <div className="breadcrumb">
        <span>ContractIQ</span> <ChevRightSmIcon /> <span className="active">{pageTitle}</span>
      </div>

      <div className="search-wrap">
        <span className="search-ico"><SearchIcon /></span>
        <input
          type="text" autoComplete="off" placeholder="Search contracts, obligations, users..."
          value={query} onChange={(e) => setQuery(e.target.value)}
        />
        {q && (
          <div className="search-results">
            {matches.length === 0 && <div className="sr-empty">No results for "{query}"</div>}
            {matches.map((m, i) => {
              const showLabel = m.group !== lastGroup;
              lastGroup = m.group;
              return (
                <React.Fragment key={i}>
                  {showLabel && <div className="sr-group-label">{m.group}</div>}
                  <div className="sr-item" onClick={() => { goTo(m.to); setQuery(""); }}>
                    <div className="ico"><FileIcon size={15} /></div>
                    <div><strong>{m.label}</strong><span>{m.sub}</span></div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      <div className="top-actions">
        <Link to="/calendar" className="icon-btn" title="Calendar"><CalendarIcon /></Link>

        <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </button>

        <Link to="/help" className="icon-btn" title="Help & Support"><HelpIcon /></Link>

        <div className="dropdown-wrap" ref={bellRef}>
          <button className="icon-btn" title="Notifications" onClick={() => setBellOpen((o) => !o)}>
            <BellIcon />
            {notificationCount > 0 && <span className="bell-badge">{notificationCount}</span>}
          </button>
          {bellOpen && (
            <div className="dropdown" style={{ width: 320 }}>
              <div className="dd-header" style={{ justifyContent: "space-between" }}>
                <strong style={{ fontSize: 13.5 }}>Notifications</strong>
                <span className="badge danger">{notificationCount} unread</span>
              </div>
              {NOTIF_PREVIEW.map((n) => (
                <button key={n.id} type="button" className="bell-preview-item" onClick={() => goTo("/notifications")}>
                  <span className="dot" style={{ background: n.color, marginTop: 5 }} />
                  <div><strong>{n.title}</strong><p>{n.desc}</p><div className="time">{n.time}</div></div>
                </button>
              ))}
              <button type="button" className="dd-viewall" onClick={() => goTo("/notifications")}>View all notifications</button>
            </div>
          )}
        </div>

        <div className="dropdown-wrap" ref={qaRef}>
          <button className="quick-action" type="button" onClick={() => setQaOpen((o) => !o)}>
            <PlusIcon /> Quick Action
          </button>
          {qaOpen && (
            <div className="dropdown" style={{ width: 236 }}>
              <button type="button" className="dd-item" onClick={() => goTo("/repository")}><FileIcon size={17} color="#3B82F6" /> New Contract</button>
              <button type="button" className="dd-item" onClick={() => goTo("/obligations")}><ClipboardCheckIcon size={17} color="#10B981" /> Add Obligation</button>
              <button type="button" className="dd-item" onClick={() => goTo("/users")}><UsersIcon size={17} color="#8B5CF6" /> Invite User</button>
              <button type="button" className="dd-item" onClick={() => goTo("/reports")}><BarIcon size={17} color="#F59E0B" /> Generate Report</button>
              <button type="button" className="dd-item" onClick={() => setQaOpen(false)}><DownloadIcon size={17} color="#14B8A6" /> Export Analytics</button>
            </div>
          )}
        </div>

        <div className="dropdown-wrap" ref={ref}>
          <button className="user-block" onClick={() => setOpen((s) => !s)} aria-haspopup="true" aria-expanded={open}>
            <div className="avatar-purple">{initials}</div>
            <div className="user-meta"><strong>{user?.name || "Arjun Mehta"}</strong><span>{user?.role || "Administrator"}</span></div>
            <span className="chev" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .18s ease" }}><ChevDownIcon /></span>
          </button>
          {open && (
            <div className="dropdown" role="menu">
              <div className="dd-header">
                <div className="avatar-purple">{initials}</div>
                <div><strong>{user?.name || "Arjun Mehta"}</strong><span>{user?.email || "arjun.mehta@contractiq.com"}</span></div>
              </div>
              <button type="button" className="dd-item" onClick={() => { goTo("/profile"); setNotificationCount(notificationCount); }}><UserIcon /> My Profile</button>
              <button type="button" className="dd-item" onClick={() => goTo("/settings")}><GearIcon /> Settings</button>
              <button type="button" className="dd-item" onClick={() => goTo("/notifications")}><BellSmIcon /> Notifications</button>
              <button type="button" className="dd-item" onClick={() => goTo("/help")}><HelpIcon /> Help & Support</button>
              <div className="dd-sep" />
              <button type="button" className="dd-item orange" onClick={() => goTo("/switch-role")}><SwitchIcon /> Switch Role</button>
              <button type="button" className="dd-item red" onClick={() => goTo("/logout")}><LogoutIcon /> Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
