import { useState, useRef, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend
} from "recharts";
import {
  LayoutDashboard, FileText, ShieldCheck, BarChart2, Users, Settings,
  Server, User, Bell, ChevronDown, ChevronRight, LogOut, Search,
  Plus, Eye, Edit2, Trash2, Download, Filter, RefreshCw,
  AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown,
  Lock, Mail, Phone, Building2, ArrowLeft, X, Activity,
  Calendar, Briefcase, AlertCircle, HelpCircle,
  UploadCloud, ChevronLeft, Database, Cpu, Globe,
  ClipboardList, BookOpen, MoreVertical, Upload,
  FileCheck, Info, Zap, Award, Sparkles, Bot,
  Send, RefreshCcw, Sun, Moon, Columns,
  ChevronUp, ArrowRight, Repeat, SlidersHorizontal,
  CalendarDays, MoreHorizontal, Inbox, Shield,
  CircleDot
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen = "splash" | "login" | "register" | "forgot" | "reset" | "app";
type Role = "Administrator" | "Legal Manager" | "Compliance Officer" | "Contract Manager" | "Department Head" | "Employee";
type AppView = "dashboard" | "contracts" | "obligations" | "renewals" | "compliance" | "reports" | "notifications" | "audit" | "users" | "settings" | "profile";

interface NavItem { id: AppView; label: string; icon: React.ReactNode; roles: Role[]; badge?: number; }

// ─── Constants ────────────────────────────────────────────────────────────────
const ROLES: Role[] = ["Administrator", "Legal Manager", "Compliance Officer", "Contract Manager", "Department Head", "Employee"];

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard",     label: "Dashboard",          icon: <LayoutDashboard size={16}/>, roles: ROLES },
  { id: "contracts",     label: "Contract Repository", icon: <FileText size={16}/>,        roles: ROLES },
  { id: "obligations",   label: "Obligation Tracker",  icon: <ClipboardList size={16}/>,   roles: ROLES },
  { id: "renewals",      label: "Renewal Dashboard",   icon: <Repeat size={16}/>,          roles: ROLES },
  { id: "compliance",    label: "Compliance",          icon: <ShieldCheck size={16}/>,     roles: ["Administrator","Legal Manager","Compliance Officer","Contract Manager"] },
  { id: "reports",       label: "Reports & Analytics", icon: <BarChart2 size={16}/>,       roles: ["Administrator","Legal Manager","Compliance Officer","Contract Manager","Department Head"] },
  { id: "notifications", label: "Notifications",       icon: <Bell size={16}/>,            roles: ROLES, badge: 2 },
  { id: "audit",         label: "Audit Logs",          icon: <BookOpen size={16}/>,        roles: ["Administrator","Legal Manager","Compliance Officer"] },
  { id: "users",         label: "User Management",     icon: <Users size={16}/>,           roles: ["Administrator"] },
  { id: "settings",      label: "Settings",            icon: <Settings size={16}/>,        roles: ["Administrator","Legal Manager"] },
];

// ─── Mock Data ────────────────────────────────────────────────────────────────
const CONTRACTS = [
  { id: "CTR-2024-001", title: "Enterprise Software License – Microsoft", vendor: "Microsoft Corp", type: "License", status: "Active", value: "$284,000", start: "Jan 15, 2024", end: "Jan 14, 2025", risk: "Low", owner: "Arjun Mehta", daysLeft: 193 },
  { id: "CTR-2024-002", title: "Cloud Infrastructure Services – AWS", vendor: "Amazon Web Services", type: "SaaS", status: "Active", value: "$512,000", start: "Mar 1, 2024", end: "Feb 28, 2025", risk: "Medium", owner: "Sarah Lin", daysLeft: 238 },
  { id: "CTR-2024-003", title: "Legal Advisory Retainer – Sharma & Co.", vendor: "Sharma & Co LLP", type: "Services", status: "Pending Review", value: "$96,000", start: "Apr 1, 2024", end: "Mar 31, 2025", risk: "Low", owner: "Deepa Nair", daysLeft: 269 },
  { id: "CTR-2024-004", title: "Office Space Lease – Bandra BKC Tower", vendor: "Prestige Properties", type: "Lease", status: "Active", value: "$1,240,000", start: "Jun 1, 2022", end: "May 31, 2027", risk: "Low", owner: "Arjun Mehta", daysLeft: 1060 },
  { id: "CTR-2024-005", title: "HR Analytics Platform – Darwinbox", vendor: "Darwinbox Inc", type: "SaaS", status: "Expiring Soon", value: "$48,000", start: "Jul 1, 2023", end: "Jul 30, 2024", risk: "High", owner: "Rahul Singh", daysLeft: 25 },
  { id: "CTR-2024-006", title: "Cybersecurity Audit – Deloitte", vendor: "Deloitte India", type: "Professional Services", status: "Draft", value: "$180,000", start: "Aug 1, 2024", end: "Jul 31, 2025", risk: "Medium", owner: "Sarah Lin", daysLeft: 391 },
  { id: "CTR-2024-007", title: "Marketing Agency Agreement – Ogilvy", vendor: "Ogilvy & Mather", type: "Services", status: "Active", value: "$320,000", start: "Jan 1, 2024", end: "Dec 31, 2024", risk: "Low", owner: "Priya Kapoor", daysLeft: 179 },
  { id: "CTR-2024-008", title: "Data Center Colocation – Nxtgen", vendor: "Nxtgen Technologies", type: "Infrastructure", status: "Expired", value: "$72,000", start: "Jan 1, 2023", end: "Dec 31, 2023", risk: "Medium", owner: "Rahul Singh", daysLeft: 0 },
];

const OBLIGATIONS = [
  { id: "OBL-001", contract: "CTR-2024-002", title: "Quarterly Security Audit Report Submission", priority: "High", due: "Jul 15, 2024", status: "Pending", assignee: "Deepa Nair" },
  { id: "OBL-002", contract: "CTR-2024-001", title: "License Compliance Usage Report", priority: "Medium", due: "Jul 31, 2024", status: "In Progress", assignee: "Arjun Mehta" },
  { id: "OBL-003", contract: "CTR-2024-003", title: "Monthly Legal Advisory Meeting", priority: "Low", due: "Jul 10, 2024", status: "Completed", assignee: "Sarah Lin" },
  { id: "OBL-004", contract: "CTR-2024-004", title: "Property Insurance Renewal Documentation", priority: "High", due: "Jun 30, 2024", status: "Overdue", assignee: "Priya Kapoor" },
  { id: "OBL-005", contract: "CTR-2024-005", title: "Contract Renewal Decision – Darwinbox", priority: "Critical", due: "Jun 15, 2024", status: "Overdue", assignee: "Rahul Singh" },
  { id: "OBL-006", contract: "CTR-2024-007", title: "Mid-Year Campaign Performance Review", priority: "Medium", due: "Jul 20, 2024", status: "In Progress", assignee: "Priya Kapoor" },
];

const USERS = [
  { id: "USR-001", name: "Arjun Mehta", email: "arjun.mehta@contractiq.com", role: "Administrator", dept: "IT", status: "Active", last: "2 mins ago" },
  { id: "USR-002", name: "Sarah Lin", email: "sarah.lin@contractiq.com", role: "Legal Manager", dept: "Legal", status: "Active", last: "1 hour ago" },
  { id: "USR-003", name: "Deepa Nair", email: "deepa.nair@contractiq.com", role: "Compliance Officer", dept: "Compliance", status: "Active", last: "3 hours ago" },
  { id: "USR-004", name: "Rahul Singh", email: "rahul.singh@contractiq.com", role: "Contract Manager", dept: "Procurement", status: "Active", last: "Yesterday" },
  { id: "USR-005", name: "Priya Kapoor", email: "priya.kapoor@contractiq.com", role: "Department Head", dept: "Marketing", status: "Active", last: "2 days ago" },
  { id: "USR-006", name: "James Wilson", email: "james.wilson@contractiq.com", role: "Employee", dept: "Finance", status: "Inactive", last: "1 week ago" },
  { id: "USR-007", name: "Meera Pillai", email: "meera.pillai@contractiq.com", role: "Employee", dept: "HR", status: "Active", last: "4 hours ago" },
];

const ACTIVITIES = [
  { icon: <FileCheck size={13}/>, text: "CTR-2024-003 approved by Legal Manager", time: "5 min ago", color: "text-emerald-400" },
  { icon: <AlertTriangle size={13}/>, text: "High risk flag raised on CTR-2024-005", time: "22 min ago", color: "text-amber-400" },
  { icon: <User size={13}/>, text: "New user James Wilson added to Finance dept", time: "1 hr ago", color: "text-blue-400" },
  { icon: <Clock size={13}/>, text: "OBL-004 overdue – Property Insurance Renewal", time: "2 hrs ago", color: "text-red-400" },
  { icon: <CheckCircle size={13}/>, text: "OBL-003 marked complete by Sarah Lin", time: "3 hrs ago", color: "text-emerald-400" },
  { icon: <FileText size={13}/>, text: "CTR-2024-006 draft created by Sarah Lin", time: "5 hrs ago", color: "text-blue-400" },
  { icon: <ShieldCheck size={13}/>, text: "Compliance score updated to 84%", time: "Yesterday", color: "text-teal-400" },
];

const AUDIT_LOGS = [
  { user: "Arjun Mehta", action: "Approved Contract", target: "CTR-2024-003", ip: "192.168.1.42", time: "2 min ago", type: "approval" },
  { user: "Sarah Lin", action: "Created Draft", target: "CTR-2024-006", ip: "192.168.1.55", time: "1 hr ago", type: "create" },
  { user: "Deepa Nair", action: "Updated Compliance Score", target: "Organization", ip: "192.168.1.78", time: "3 hrs ago", type: "update" },
  { user: "Rahul Singh", action: "Role Switch Attempted", target: "Legal Manager", ip: "192.168.1.90", time: "5 hrs ago", type: "security" },
  { user: "System", action: "Auto-flagged High Risk", target: "CTR-2024-005", ip: "10.0.0.1", time: "6 hrs ago", type: "ai" },
  { user: "Arjun Mehta", action: "Deleted User", target: "USR-009 (inactive)", ip: "192.168.1.42", time: "8 hrs ago", type: "delete" },
  { user: "Priya Kapoor", action: "Exported Report", target: "Compliance Q2 2024", ip: "192.168.1.103", time: "Yesterday", type: "export" },
  { user: "James Wilson", action: "Login Failed (3x)", target: "Authentication", ip: "103.45.22.11", time: "Yesterday", type: "security" },
  { user: "Sarah Lin", action: "Bulk Uploaded Contracts", target: "5 contracts", ip: "192.168.1.55", time: "2 days ago", type: "upload" },
];

const monthlyContractData = [
  { month: "Jan", active: 42, new: 8, expired: 3 },{ month: "Feb", active: 45, new: 5, expired: 2 },
  { month: "Mar", active: 48, new: 7, expired: 4 },{ month: "Apr", active: 52, new: 9, expired: 5 },
  { month: "May", active: 55, new: 6, expired: 3 },{ month: "Jun", active: 58, new: 11, expired: 8 },
  { month: "Jul", active: 61, new: 7, expired: 4 },
];
const complianceData = [
  { month: "Jan", score: 72 },{ month: "Feb", score: 75 },{ month: "Mar", score: 78 },
  { month: "Apr", score: 80 },{ month: "May", score: 82 },{ month: "Jun", score: 80 },{ month: "Jul", score: 84 },
];
const riskData = [
  { name: "Low Risk", value: 34, color: "#10B981" },{ name: "Medium Risk", value: 18, color: "#F59E0B" },
  { name: "High Risk", value: 6, color: "#EF4444" },{ name: "Critical", value: 2, color: "#7C3AED" },
];
const contractTypeData = [
  { type: "SaaS", count: 18 },{ type: "Services", count: 14 },{ type: "Lease", count: 8 },
  { type: "License", count: 12 },{ type: "Infra", count: 6 },{ type: "Other", count: 3 },
];
const renewalData = [
  { month: "Jul", count: 3 },{ month: "Aug", count: 5 },{ month: "Sep", count: 2 },
  { month: "Oct", count: 7 },{ month: "Nov", count: 4 },{ month: "Dec", count: 8 },
];

// ─── Utility ──────────────────────────────────────────────────────────────────
function Badge({ label, variant = "default" }: { label: string; variant?: string }) {
  const styles: Record<string, string> = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    danger:  "bg-red-50 text-red-700 border border-red-200",
    info:    "bg-blue-50 text-blue-700 border border-blue-200",
    muted:   "bg-slate-100 text-slate-500",
    purple:  "bg-purple-50 text-purple-700 border border-purple-200",
    teal:    "bg-teal-50 text-teal-700 border border-teal-200",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${styles[variant] ?? styles.default}`}>{label}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Active": "success","Pending Review": "info","Expiring Soon": "warning","Draft": "muted","Expired": "danger",
    "Completed": "success","In Progress": "info","Pending": "warning","Overdue": "danger","Scheduled": "info","Operational": "success",
  };
  return <Badge label={status} variant={map[status] ?? "default"}/>;
}

function RiskBadge({ risk }: { risk: string }) {
  const m: Record<string, string> = { Low: "success", Medium: "warning", High: "danger", Critical: "purple" };
  return <Badge label={risk} variant={m[risk] ?? "default"}/>;
}

function StatCard({ title, value, sub, icon, trend, trendUp, color = "blue" }: {
  title: string; value: string | number; sub?: string; icon: React.ReactNode;
  trend?: string; trendUp?: boolean; color?: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600", emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600", red: "bg-red-50 text-red-600",
    teal: "bg-teal-50 text-teal-600", purple: "bg-purple-50 text-purple-600",
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-slate-900">{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
        </div>
        <div className={`p-2.5 rounded-xl group-hover:scale-110 transition-transform ${colors[color] ?? colors.blue}`}>{icon}</div>
      </div>
      {trend && (
        <div className="flex items-center gap-1.5 text-xs">
          {trendUp ? <TrendingUp size={11} className="text-emerald-500"/> : <TrendingDown size={11} className="text-red-500"/>}
          <span className={`font-semibold ${trendUp ? "text-emerald-600" : "text-red-600"}`}>{trend}</span>
          <span className="text-slate-400">vs last month</span>
        </div>
      )}
    </div>
  );
}

function Card({ title, children, action, className = "" }: {
  title?: string; children: React.ReactNode; action?: React.ReactNode; className?: string;
}) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 ${className}`}>
      {title && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  const palette = ["bg-blue-500","bg-emerald-500","bg-purple-500","bg-amber-500","bg-teal-500","bg-pink-500","bg-indigo-500"];
  const color = palette[name.charCodeAt(0) % palette.length];
  const sizes = { sm: "w-7 h-7 text-[10px]", md: "w-8 h-8 text-xs", lg: "w-10 h-10 text-sm", xl: "w-12 h-12 text-base" };
  return <div className={`${sizes[size]} ${color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>{initials}</div>;
}

function Progress({ value, color = "blue" }: { value: number; color?: string }) {
  const c: Record<string, string> = {
    blue: "bg-blue-500", emerald: "bg-emerald-500", amber: "bg-amber-500",
    red: "bg-red-500", teal: "bg-teal-500", purple: "bg-purple-500",
  };
  return (
    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
      <div className={`h-1.5 rounded-full transition-all duration-700 ${c[color] ?? "bg-blue-500"}`} style={{ width: `${Math.min(value, 100)}%` }}/>
    </div>
  );
}

function AiBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200/60">
      <Sparkles size={10} className="text-violet-500"/>
      <span className="text-[10px] font-semibold text-violet-600 uppercase tracking-wide">{text}</span>
    </div>
  );
}

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(onDone, 400); return 100; }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #0B1320 0%, #0D2340 50%, #1E293B 100%)" }}>
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}/>
      {[320,480,640,800].map((s,i) => (
        <div key={i} className="absolute rounded-full border border-white/5 animate-pulse"
          style={{ width:s, height:s, animationDelay:`${i*0.3}s`, animationDuration:"3s" }}/>
      ))}
      {[
        { label: "84% Compliance", x: "-240px", y: "-80px", c: "text-emerald-400", icon: <ShieldCheck size={13}/> },
        { label: "61 Active Contracts", x: "210px", y: "-60px", c: "text-blue-400", icon: <FileText size={13}/> },
        { label: "AI Analysis Live", x: "-190px", y: "110px", c: "text-violet-400", icon: <Sparkles size={13}/> },
        { label: "0 Critical Risks", x: "190px", y: "120px", c: "text-teal-400", icon: <CheckCircle size={13}/> },
      ].map((card, i) => (
        <div key={i} className={`absolute flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold animate-pulse ${card.c}`}
          style={{ transform:`translate(${card.x},${card.y})`, animationDelay:`${i*0.5}s`,
            background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", backdropFilter:"blur(8px)", color:"inherit" }}>
          {card.icon}<span className="text-white/70">{card.label}</span>
        </div>
      ))}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30"
          style={{ background: "linear-gradient(135deg, #10B981, #14B8A6)" }}>
          <ShieldCheck size={38} className="text-white"/>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">ContractIQ</h1>
          <p className="text-slate-400 text-base font-medium">Secure Contracts. Smarter Compliance.</p>
        </div>
        <div className="w-56 mt-2">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-100"
              style={{ width:`${progress}%`, background:"linear-gradient(90deg,#10B981,#14B8A6)" }}/>
          </div>
          <p className="text-center text-slate-500 text-xs mt-2">Initializing AI engine… {progress}%</p>
        </div>
      </div>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, onNavigate }: { onLogin: (r: Role) => void; onNavigate: (s: Screen) => void }) {
  const [email, setEmail] = useState("arjun.mehta@contractiq.com");
  const [password, setPassword] = useState("••••••••••");
  const [role, setRole] = useState<Role>("Administrator");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="min-h-screen flex" style={{ fontFamily:"'Inter',sans-serif" }}>
      {/* Left */}
      <div className="hidden lg:flex lg:w-[58%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background:"linear-gradient(145deg,#0B1320 0%,#0D1F3C 55%,#1a2d4a 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:"radial-gradient(circle,#ffffff 1px,transparent 1px)", backgroundSize:"32px 32px" }}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background:"radial-gradient(circle,#10B981,transparent 70%)" }}/>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30"
            style={{ background:"linear-gradient(135deg,#10B981,#14B8A6)" }}>
            <ShieldCheck size={20} className="text-white"/>
          </div>
          <span className="text-white text-xl font-bold tracking-tight">ContractIQ</span>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center py-10">
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon:<Sparkles size={18}/>, label:"AI Contract Analysis", sub:"GPT-4 powered clause detection", c:"from-violet-500/20 to-violet-500/10 border-violet-500/20" },
              { icon:<ShieldCheck size={18}/>, label:"Compliance Monitoring", sub:"Real-time obligation tracking", c:"from-emerald-500/20 to-emerald-500/10 border-emerald-500/20" },
              { icon:<Zap size={18}/>, label:"Automated Approvals", sub:"Workflow automation engine", c:"from-amber-500/20 to-amber-500/10 border-amber-500/20" },
              { icon:<Lock size={18}/>, label:"Enterprise Security", sub:"SOC 2 Type II certified", c:"from-blue-500/20 to-blue-500/10 border-blue-500/20" },
              { icon:<Users size={18}/>, label:"Team Collaboration", sub:"Role-based access control", c:"from-teal-500/20 to-teal-500/10 border-teal-500/20" },
              { icon:<BarChart2 size={18}/>, label:"Risk Intelligence", sub:"Predictive risk scoring", c:"from-red-500/20 to-red-500/10 border-red-500/20" },
            ].map((item,i) => (
              <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl border bg-gradient-to-br backdrop-blur-sm ${item.c}`}>
                <div className="text-white/70 mt-0.5 flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="text-white/85 text-sm font-semibold leading-tight">{item.label}</p>
                  <p className="text-white/40 text-[11px] mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-5 border" style={{ background:"rgba(255,255,255,0.05)", borderColor:"rgba(255,255,255,0.1)", backdropFilter:"blur(12px)" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"/>
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wide">Live Compliance Score</span>
              </div>
              <AiBadge text="AI Monitored"/>
            </div>
            <div className="flex items-end gap-4 mb-3">
              <span className="text-4xl font-bold text-white">84%</span>
              <div className="flex items-center gap-1 mb-1 text-emerald-400 text-sm"><TrendingUp size={14}/> +2% this month</div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width:"84%", background:"linear-gradient(90deg,#10B981,#14B8A6)" }}/>
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-white/40">
              <span>61 of 72 obligations met</span><span>Updated 5 min ago</span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <blockquote className="text-white/70 text-base italic leading-relaxed mb-2">
            "Strong compliance builds stronger organizations."
          </blockquote>
          <p className="text-white/35 text-xs leading-relaxed">
            Manage contracts securely, automate approvals, monitor compliance, and reduce organizational risks using AI-powered workflows.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-[400px]">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
              <p className="text-slate-500 text-sm mt-1">Sign in to your secure enterprise workspace</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"/>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"/>
                  <button onClick={() => setShowPw(!showPw)} type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    <Eye size={14}/>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Role</label>
                <div className="relative">
                  <Briefcase size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                  <select value={role} onChange={e => setRole(e.target.value as Role)}
                    className="w-full pl-10 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all">
                    {ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4 rounded border-slate-300 accent-blue-500"/>
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <button onClick={() => onNavigate("forgot")} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Forgot Password?</button>
              </div>
              <button onClick={() => onLogin(role)}
                className="w-full py-2.5 text-white font-semibold rounded-xl transition-all text-sm shadow-sm shadow-blue-500/20 mt-1"
                style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity="0.9"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity="1"}>
                Sign In to ContractIQ
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"/></div>
                <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-slate-400">or</span></div>
              </div>
              <button onClick={() => onNavigate("register")}
                className="w-full py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors text-sm">
                Create New Account
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-5 text-xs text-slate-400">
            <span className="cursor-pointer hover:text-slate-600">Privacy Policy</span>
            <span className="text-slate-200">•</span>
            <span className="cursor-pointer hover:text-slate-600">Terms of Service</span>
            <span className="text-slate-200">•</span>
            <span className="cursor-pointer hover:text-slate-600">Help Center</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20"
            style={{ background:"linear-gradient(135deg,#10B981,#14B8A6)" }}>
            <ShieldCheck size={18} className="text-white"/>
          </div>
          <span className="text-slate-900 text-xl font-bold">ContractIQ</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create Account</h1>
          <p className="text-slate-500 text-sm mb-6">Join your organization&apos;s ContractIQ workspace</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label:"Full Name", icon:<User size={13}/>, placeholder:"Arjun Mehta", span:1 },
              { label:"Organization Name", icon:<Building2 size={13}/>, placeholder:"Acme Corp", span:1 },
              { label:"Department", icon:<Briefcase size={13}/>, placeholder:"Legal / IT / Finance", span:1 },
              { label:"Phone Number", icon:<Phone size={13}/>, placeholder:"+91 98765 43210", span:1 },
              { label:"Email Address", icon:<Mail size={13}/>, placeholder:"you@company.com", span:2 },
              { label:"Password", icon:<Lock size={13}/>, placeholder:"Min 8 characters", span:1, pw:true },
              { label:"Confirm Password", icon:<Lock size={13}/>, placeholder:"Confirm password", span:1, pw:true },
            ].map(f => (
              <div key={f.label} className={f.span === 2 ? "col-span-2" : ""}>
                <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{f.label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{f.icon}</span>
                  <input type={f.pw ? "password" : "text"} placeholder={f.placeholder}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"/>
                </div>
              </div>
            ))}
            <div className="col-span-2">
              <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Select Role</label>
              <div className="relative">
                <Briefcase size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                <select className="w-full pl-9 pr-8 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
              </div>
            </div>
          </div>
          <label className="flex items-start gap-2 mt-4 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-slate-300 accent-blue-500"/>
            <span className="text-sm text-slate-600">
              I accept the <span className="text-blue-600 cursor-pointer hover:underline">Terms of Service</span> and{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>
            </span>
          </label>
          <button className="w-full mt-5 py-2.5 text-white font-semibold rounded-xl transition-all text-sm"
            style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}>
            Create Account
          </button>
          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{" "}
            <button onClick={() => onNavigate("login")} className="text-blue-600 font-semibold hover:underline">Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
}

function ForgotScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:"linear-gradient(135deg,#10B981,#14B8A6)" }}>
            <ShieldCheck size={18} className="text-white"/>
          </div>
          <span className="text-slate-900 text-xl font-bold">ContractIQ</span>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {!sent ? (
            <>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                <Mail size={22} className="text-blue-600"/>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Forgot Password?</h1>
              <p className="text-slate-500 text-sm mb-6">Enter your email to receive a password reset link.</p>
              <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Email Address</label>
              <div className="relative mb-4">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="you@company.com"/>
              </div>
              <button onClick={() => setSent(true)}
                className="w-full py-2.5 text-white font-semibold rounded-xl transition-all text-sm"
                style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}>
                Send Reset Link
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={26} className="text-emerald-500"/>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Check Your Email</h2>
              <p className="text-slate-500 text-sm">We have sent a password reset link to your email address.</p>
            </div>
          )}
          <button onClick={() => onNavigate("login")} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mt-5 mx-auto transition-colors">
            <ArrowLeft size={14}/> Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ role, view, onView, collapsed, onCollapse }: {
  role: Role; view: AppView; onView: (v: AppView) => void; collapsed: boolean; onCollapse: () => void;
}) {
  const [aiOpen, setAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<{ r: "u"|"a"; t: string }[]>([
    { r:"a", t:"Hi! I am your AI contract assistant. Ask me about contracts, compliance, or risks." }
  ]);
  const [sysOpen, setSysOpen] = useState(false);

  const allowed = NAV_ITEMS.filter(n => n.roles.includes(role));

  function sendAi() {
    if (!aiInput.trim()) return;
    const lower = aiInput.toLowerCase();
    const reply = lower.includes("risk")
      ? "I detected 8 contracts with elevated risk. CTR-2024-005 is critical — expiring in 25 days with no renewal initiated."
      : lower.includes("compliance")
      ? "Compliance score is 84%. To reach 90%, resolve 5 pending obligations in Procurement."
      : lower.includes("renew")
      ? "3 contracts expire within 30 days. Darwinbox (CTR-2024-005) requires urgent action — consider renewing at -15% cost."
      : "Based on your portfolio, I recommend reviewing the 3 high-risk contracts flagged this week.";
    setAiMessages(m => [...m, { r:"u", t:aiInput }, { r:"a", t:reply }]);
    setAiInput("");
  }

  return (
    <div className={`flex flex-col h-screen transition-all duration-300 flex-shrink-0 ${collapsed ? "w-[68px]" : "w-[240px]"}`}
      style={{ background:"#0B1320", borderRight:"1px solid rgba(255,255,255,0.06)" }}>

      {/* Logo */}
      <div className={`flex items-center px-4 py-4 border-b flex-shrink-0 ${collapsed ? "justify-center" : "justify-between"}`}
        style={{ borderColor:"rgba(255,255,255,0.06)" }}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20"
              style={{ background:"linear-gradient(135deg,#10B981,#14B8A6)" }}>
              <ShieldCheck size={15} className="text-white"/>
            </div>
            <div>
              <span className="text-white text-sm font-bold tracking-tight block leading-tight">ContractIQ</span>
              <span className="text-slate-500 text-[10px] font-medium">AI-Powered Platform</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20"
            style={{ background:"linear-gradient(135deg,#10B981,#14B8A6)" }}>
            <ShieldCheck size={15} className="text-white"/>
          </div>
        )}
        {!collapsed && (
          <button onClick={onCollapse} className="text-slate-600 hover:text-slate-400 p-1 rounded-lg hover:bg-white/5 transition-all">
            <ChevronLeft size={15}/>
          </button>
        )}
      </div>

      {/* Workspace */}
      {!collapsed && (
        <div className="px-3 py-2.5 border-b" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer hover:bg-white/5 transition-all"
            style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate leading-tight">Acme Corp</p>
              <p className="text-slate-500 text-[10px]">Enterprise Plan</p>
            </div>
            <ChevronDown size={11} className="text-slate-600 flex-shrink-0"/>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 overflow-x-hidden">
        {!collapsed && <p className="px-3 mb-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Main Menu</p>}
        {allowed.map(item => {
          const active = view === item.id;
          return (
            <button key={item.id} onClick={() => onView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 group relative ${
                active ? "text-white" : "text-slate-500 hover:text-slate-300"
              } ${collapsed ? "justify-center" : ""}`}
              style={active
                ? { background:"rgba(59,130,246,0.15)", border:"1px solid rgba(59,130,246,0.2)" }
                : { border:"1px solid transparent" }}>
              {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full bg-blue-400"/>}
              <span className={`flex-shrink-0 transition-colors ${active ? "text-blue-400" : "text-slate-600 group-hover:text-slate-400"}`}>{item.icon}</span>
              {!collapsed && <span className="text-[13px] font-medium truncate flex-1">{item.label}</span>}
              {!collapsed && item.badge && item.badge > 0 && (
                <span className="flex-shrink-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{item.badge}</span>
              )}
              {collapsed && item.badge && item.badge > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom widgets */}
      <div className="flex-shrink-0 border-t px-2 py-2 space-y-1.5" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
        {/* System Status */}
        {!collapsed && (
          <>
            <button onClick={() => setSysOpen(!sysOpen)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
              style={{ border:"1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0 animate-pulse"/>
              <span className="text-slate-500 text-[11px] font-medium flex-1 text-left">System Operational</span>
              <ChevronUp size={11} className={`text-slate-600 transition-transform ${sysOpen ? "" : "rotate-180"}`}/>
            </button>
            {sysOpen && (
              <div className="mx-1 p-2.5 rounded-xl space-y-1.5" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}>
                {[{l:"API Server",ok:true},{l:"AI Engine",ok:true},{l:"Database",ok:true},{l:"Queue",ok:true}].map(s => (
                  <div key={s.l} className="flex items-center justify-between">
                    <span className="text-slate-600 text-[11px]">{s.l}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>
                      <span className="text-[10px] font-medium text-emerald-500">OK</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* AI Assistant */}
            <button onClick={() => setAiOpen(!aiOpen)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all"
              style={{ background:aiOpen?"rgba(139,92,246,0.15)":"rgba(139,92,246,0.08)", border:"1px solid rgba(139,92,246,0.2)" }}>
              <Bot size={14} className="text-violet-400 flex-shrink-0"/>
              <span className="text-violet-300 text-[11px] font-semibold flex-1 text-left">AI Assistant</span>
              <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"/>
            </button>
            {aiOpen && (
              <div className="mx-1 rounded-xl overflow-hidden" style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(139,92,246,0.2)" }}>
                <div className="px-3 py-2 border-b overflow-y-auto max-h-36 space-y-2" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
                  {aiMessages.map((m, i) => (
                    <div key={i} className={`text-[11px] rounded-lg px-2.5 py-1.5 leading-relaxed ${
                      m.r === "a" ? "text-slate-400" : "text-blue-300 ml-4 text-right"
                    }`} style={{ background:m.r==="a"?"rgba(255,255,255,0.04)":"rgba(59,130,246,0.1)" }}>
                      {m.t}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 p-2">
                  <input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendAi()}
                    placeholder="Ask AI…"
                    className="flex-1 px-2.5 py-1.5 text-[11px] rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-500/40"
                    style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.07)" }}/>
                  <button onClick={sendAi}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                    style={{ background:"rgba(139,92,246,0.3)" }}>
                    <Send size={11} className="text-violet-300"/>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        {collapsed && (
          <button onClick={onCollapse} className="w-full flex items-center justify-center p-2.5 text-slate-600 hover:text-slate-400 hover:bg-white/5 rounded-xl transition-all">
            <ChevronRight size={15}/>
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Top Nav ──────────────────────────────────────────────────────────────────
function TopNav({ role, view, onLogout, onSwitchRole, onView, darkMode, onToggleDark }: {
  role: Role; view: AppView; onLogout: () => void; onSwitchRole: () => void;
  onView: (v: AppView) => void; darkMode: boolean; onToggleDark: () => void;
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function h(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) setQuickOpen(false);
    }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const label = NAV_ITEMS.find(n => n.id === view)?.label ?? "Dashboard";

  return (
    <header className="flex items-center gap-3 px-5 py-3 bg-white border-b border-slate-200 flex-shrink-0">
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 flex-shrink-0 min-w-0">
        <span className="hidden lg:inline">ContractIQ</span>
        <ChevronRight size={12} className="text-slate-300 hidden lg:block"/>
        <span className="font-semibold text-slate-700 truncate">{label}</span>
      </div>

      {/* Search */}
      <div className={`relative flex items-center transition-all duration-200 flex-1 max-w-xs ${searchFocused ? "max-w-md" : ""}`}>
        <Search size={13} className="absolute left-3 text-slate-400"/>
        <input
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
          placeholder="Search contracts, obligations, users…"
          onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}/>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"><CalendarDays size={17}/></button>
        <button onClick={onToggleDark} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
          {darkMode ? <Sun size={17}/> : <Moon size={17}/>}
        </button>
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"><HelpCircle size={17}/></button>
        <button onClick={() => onView("notifications")} className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
          <Bell size={17}/>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">2</span>
        </button>

        {/* Quick Actions */}
        <div className="relative mx-1" ref={quickRef}>
          <button onClick={() => setQuickOpen(!quickOpen)}
            className="flex items-center gap-1.5 px-3 py-2 text-white text-xs font-semibold rounded-xl transition-all shadow-sm shadow-blue-500/20"
            style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}>
            <Plus size={13}/> Quick Action
          </button>
          {quickOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-50 py-1.5">
              {[
                { icon:<FileText size={13}/>, label:"New Contract", c:"text-blue-600" },
                { icon:<ClipboardList size={13}/>, label:"Add Obligation", c:"text-emerald-600" },
                { icon:<Users size={13}/>, label:"Invite User", c:"text-purple-600" },
                { icon:<BarChart2 size={13}/>, label:"Generate Report", c:"text-amber-600" },
                { icon:<Download size={13}/>, label:"Export Analytics", c:"text-teal-600" },
              ].map(a => (
                <button key={a.label} onClick={() => setQuickOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <span className={a.c}>{a.icon}</span>{a.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all">
            <Avatar name="Arjun Mehta" size="sm"/>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">Arjun Mehta</p>
              <p className="text-[10px] text-slate-400">{role}</p>
            </div>
            <ChevronDown size={12} className="text-slate-400"/>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Avatar name="Arjun Mehta" size="md"/>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Arjun Mehta</p>
                    <p className="text-[11px] text-slate-400">arjun.mehta@contractiq.com</p>
                  </div>
                </div>
              </div>
              {[
                { icon:<User size={13}/>, label:"My Profile", v:"profile" as AppView },
                { icon:<Settings size={13}/>, label:"Settings", v:"settings" as AppView },
                { icon:<Bell size={13}/>, label:"Notifications", v:"notifications" as AppView },
              ].map(item => (
                <button key={item.label} onClick={() => { onView(item.v); setProfileOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                  <span className="text-slate-400">{item.icon}</span>{item.label}
                </button>
              ))}
              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                <HelpCircle size={13} className="text-slate-400"/> Help &amp; Support
              </button>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button onClick={() => { onSwitchRole(); setProfileOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 transition-colors">
                  <RefreshCw size={13} className="text-amber-500"/> Switch Role
                </button>
                <button onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={13} className="text-red-500"/> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Switch Role Dialog ───────────────────────────────────────────────────────
function SwitchRoleDialog({ currentRole, onClose, onSwitch }: {
  currentRole: Role; onClose: () => void; onSwitch: (r: Role) => void;
}) {
  const [targetRole, setTargetRole] = useState<Role>(currentRole);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }}>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <RefreshCw size={18} className="text-amber-600"/>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Switch Role</h2>
              <p className="text-xs text-slate-500 mt-0.5">Current: <span className="font-semibold text-slate-700">{currentRole}</span></p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"><X size={18}/></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Switch To</label>
            <div className="relative">
              <select value={targetRole} onChange={e => setTargetRole(e.target.value as Role)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Confirm Password</label>
            <div className="relative">
              <Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
              <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(""); }} placeholder="Enter your password"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"/>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4 flex gap-2 items-start">
          <Info size={12} className="text-amber-600 mt-0.5 flex-shrink-0"/>
          <p className="text-[11px] text-amber-700">Demo Mode: Role switching is enabled for presentation purposes. In production, users access only their assigned role.</p>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={() => { if (!pw) { setError("Password required"); return; } onSwitch(targetRole); onClose(); }}
            className="flex-1 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}>
            Confirm Switch
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Welcome Banner ───────────────────────────────────────────────────────────
function WelcomeBanner({ role }: { role: Role }) {
  const names: Partial<Record<Role, string>> = {
    Administrator:"Arjun","Legal Manager":"Sarah","Compliance Officer":"Deepa",
    "Contract Manager":"Rahul","Department Head":"Priya",Employee:"Deepa",
  };
  const name = names[role] ?? "User";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="relative overflow-hidden rounded-2xl mx-6 mt-6"
      style={{ background:"linear-gradient(135deg,#0B1320 0%,#0f2442 40%,#162d55 70%,#1E3A5F 100%)", minHeight:158 }}>
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage:"radial-gradient(circle,#ffffff 1px,transparent 1px)", backgroundSize:"28px 28px" }}/>
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
        style={{ background:"radial-gradient(circle,#3B82F6,transparent 70%)" }}/>
      <div className="absolute -bottom-16 left-1/3 w-48 h-48 rounded-full opacity-10"
        style={{ background:"radial-gradient(circle,#10B981,transparent 70%)" }}/>
      <div className="relative z-10 flex items-center justify-between px-8 py-7">
        <div>
          <p className="text-blue-300 text-sm font-medium mb-1">{greeting} 👋</p>
          <h1 className="text-white text-2xl font-bold mb-2">Welcome back, {name}.</h1>
          <p className="text-slate-400 text-sm max-w-lg">
            You have <span className="text-white font-semibold">2 unread notifications</span>,{" "}
            <span className="text-white font-semibold">5 pending actions</span>, and{" "}
            <span className="text-amber-300 font-semibold">3 upcoming renewals</span> this week.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <AiBadge text="AI Insights Active"/>
            <div className="h-3 w-px bg-white/10"/>
            <span className="text-slate-500 text-xs">Last updated 5 min ago</span>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          {[
            { label:"Notifications", value:"2", icon:<Bell size={15}/>, c:"from-blue-500/20 to-blue-500/10 border-blue-500/20 text-blue-400" },
            { label:"Pending Actions", value:"5", icon:<ClipboardList size={15}/>, c:"from-amber-500/20 to-amber-500/10 border-amber-500/20 text-amber-400" },
            { label:"Renewals Due", value:"3", icon:<Repeat size={15}/>, c:"from-red-500/20 to-red-500/10 border-red-500/20 text-red-400" },
            { label:"Compliance", value:"84%", icon:<ShieldCheck size={15}/>, c:"from-emerald-500/20 to-emerald-500/10 border-emerald-500/20 text-emerald-400" },
          ].map(k => (
            <div key={k.label} className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border bg-gradient-to-br backdrop-blur-sm min-w-[84px] ${k.c}`}>
              <span>{k.icon}</span>
              <span className="text-white text-xl font-bold">{k.value}</span>
              <span className="text-white/50 text-[10px] font-medium text-center leading-tight">{k.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard({ role }: { role: Role }) {
  return (
    <div className="space-y-5 pb-6">
      <WelcomeBanner role={role}/>
      <div className="px-6">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-1">Quick Actions:</p>
          {[{l:"Add User",c:"blue"},{l:"Generate Report",c:"emerald"},{l:"Review Risks",c:"amber"},{l:"Export Analytics",c:"purple"}].map(a => (
            <button key={a.l}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all hover:shadow-sm ${
                a.c==="blue"?"bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100":
                a.c==="emerald"?"bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100":
                a.c==="amber"?"bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100":
                "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
              }`}>{a.l}</button>
          ))}
        </div>
      </div>

      <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="142" icon={<Users size={18}/>} trend="+5 this week" trendUp color="blue"/>
        <StatCard title="Total Contracts" value="61" icon={<FileText size={18}/>} trend="+7 this month" trendUp color="emerald"/>
        <StatCard title="Pending Approvals" value="7" icon={<Clock size={18}/>} color="amber"/>
        <StatCard title="Compliance Score" value="84%" icon={<ShieldCheck size={18}/>} trend="+2% this month" trendUp color="teal"/>
      </div>
      <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Active Contracts" value="48" icon={<CheckCircle size={18}/>} color="emerald"/>
        <StatCard title="Expired Contracts" value="8" icon={<AlertCircle size={18}/>} color="red"/>
        <StatCard title="High Risk" value="8" icon={<AlertTriangle size={18}/>} trend="+1 flagged" trendUp={false} color="red"/>
        <StatCard title="Storage Used" value="73%" sub="182 GB / 250 GB" icon={<Database size={18}/>} color="purple"/>
      </div>

      <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Contract Activity" className="lg:col-span-2" action={<button className="text-xs text-blue-600 font-semibold hover:underline">View all</button>}>
          <div className="p-4">
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={monthlyContractData}>
                <defs>
                  <linearGradient id="ga1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/><stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/></linearGradient>
                  <linearGradient id="gb1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="month" tick={{ fontSize:11, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:11, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:10, border:"1px solid #E2E8F0", fontSize:12 }}/>
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:11 }}/>
                <Area type="monotone" dataKey="active" name="Active" stroke="#3B82F6" fill="url(#ga1)" strokeWidth={2} dot={false}/>
                <Area type="monotone" dataKey="new" name="New" stroke="#10B981" fill="url(#gb1)" strokeWidth={2} dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Risk Distribution">
          <div className="p-4">
            <ResponsiveContainer width="100%" height={170}>
              <PieChart>
                <Pie data={riskData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                  {riskData.map((e,i) => <Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius:8, border:"1px solid #E2E8F0", fontSize:11 }}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {riskData.map(d => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background:d.color }}/><span className="text-slate-600">{d.name}</span></div>
                  <span className="font-bold text-slate-800">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-800">Recent Activities</h3>
            <button className="text-xs text-blue-600 font-semibold hover:underline">View all</button>
          </div>
          <div className="divide-y divide-slate-50">
            {ACTIVITIES.map((a,i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-slate-50 transition-colors">
                <div className={`mt-0.5 ${a.color}`}>{a.icon}</div>
                <p className="flex-1 text-sm text-slate-700">{a.text}</p>
                <span className="text-xs text-slate-400 flex-shrink-0 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
              <Sparkles size={14} className="text-violet-500"/>
              <h3 className="text-sm font-semibold text-slate-800">AI Recommendations</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { t:"Initiate renewal for CTR-2024-005 — expires in 25 days", s:"high" },
                { t:"3 contracts lack signed addendums — compliance risk", s:"medium" },
                { t:"Marketing dept compliance below 70% threshold", s:"medium" },
              ].map((r,i) => (
                <div key={i} className={`flex items-start gap-2.5 p-3 rounded-xl ${r.s==="high"?"bg-red-50 border border-red-100":"bg-amber-50 border border-amber-100"}`}>
                  <AlertCircle size={12} className={r.s==="high"?"text-red-500 mt-0.5":"text-amber-500 mt-0.5"}/>
                  <p className="text-xs text-slate-700 leading-relaxed">{r.t}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card title="System Health">
            <div className="p-4 space-y-2.5">
              {[{l:"API Server",s:"Operational",ok:true},{l:"AI Engine",s:"Active",ok:true},{l:"Database",s:"Operational",ok:true},{l:"Storage",s:"73% Used",ok:true}].map(s => (
                <div key={s.l} className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{s.l}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/>
                    <span className="text-xs font-medium text-emerald-600">{s.s}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Role Dashboards ──────────────────────────────────────────────────────────
function ComplianceDashboard({ role }: { role: Role }) {
  return (
    <div className="space-y-5 pb-6">
      <WelcomeBanner role={role}/>
      <div className="px-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-2 rounded-xl p-6 text-white" style={{ background:"linear-gradient(135deg,#10B981,#14B8A6)" }}>
          <div className="flex items-center gap-2 mb-2"><ShieldCheck size={15} className="text-emerald-100"/><p className="text-emerald-100 text-xs font-bold uppercase tracking-wide">Compliance Score</p><AiBadge text="AI"/></div>
          <div className="flex items-end gap-3 mb-3"><span className="text-5xl font-bold">84%</span><div className="flex items-center gap-1 mb-1 text-emerald-200 text-sm"><TrendingUp size={13}/> +2%</div></div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden"><div className="h-full rounded-full bg-white" style={{ width:"84%" }}/></div>
          <p className="text-emerald-100 text-xs mt-2">61 of 72 obligations met</p>
        </div>
        <StatCard title="High Risk Contracts" value="8" icon={<AlertTriangle size={18}/>} color="red"/>
        <StatCard title="Missed Deadlines" value="4" icon={<Clock size={18}/>} color="amber"/>
      </div>
      <div className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Compliance Score Trend">
          <div className="p-4">
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="month" tick={{ fontSize:11, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <YAxis domain={[60,100]} tick={{ fontSize:11, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:10, border:"1px solid #E2E8F0", fontSize:12 }}/>
                <Line type="monotone" dataKey="score" name="Score" stroke="#10B981" strokeWidth={2.5} dot={{ fill:"#10B981",r:4 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Compliance by Department">
          <div className="p-5 space-y-3.5">
            {[{d:"Legal",s:96,c:"emerald"},{d:"IT & Security",s:88,c:"blue"},{d:"Finance",s:84,c:"blue"},{d:"HR",s:79,c:"amber"},{d:"Procurement",s:72,c:"amber"},{d:"Marketing",s:65,c:"red"}].map(d => (
              <div key={d.d}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-600 font-medium">{d.d}</span>
                  <span className={`font-bold ${d.s>=80?"text-emerald-600":d.s>=70?"text-amber-600":"text-red-600"}`}>{d.s}%</span>
                </div>
                <Progress value={d.s} color={d.c}/>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="px-6">
        <Card>
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
            <Sparkles size={13} className="text-violet-500"/><h3 className="text-sm font-semibold text-slate-800">AI Compliance Insights</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t:"Obligation Bottleneck", d:"Procurement dept has 5 overdue obligations — contributing 8% to compliance gap.", c:"amber" },
              { t:"Expiring High-Risk", d:"CTR-2024-005 expires in 25 days with no renewal plan. Recommend escalation.", c:"red" },
              { t:"Improvement Opportunity", d:"Automating monthly reporting in Finance could raise score by +4% in 30 days.", c:"emerald" },
            ].map((ins,i) => (
              <div key={i} className={`p-4 rounded-xl border ${ins.c==="amber"?"bg-amber-50 border-amber-200":ins.c==="red"?"bg-red-50 border-red-200":"bg-emerald-50 border-emerald-200"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={11} className={ins.c==="amber"?"text-amber-600":ins.c==="red"?"text-red-600":"text-emerald-600"}/>
                  <p className={`text-xs font-bold ${ins.c==="amber"?"text-amber-700":ins.c==="red"?"text-red-700":"text-emerald-700"}`}>{ins.t}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ins.d}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function LegalDashboard({ role }: { role: Role }) {
  return (
    <div className="space-y-5 pb-6">
      <WelcomeBanner role={role}/>
      <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Awaiting Review" value="12" icon={<Eye size={18}/>} color="blue"/>
        <StatCard title="Pending Approvals" value="7" icon={<Clock size={18}/>} color="amber"/>
        <StatCard title="Approved This Month" value="23" icon={<CheckCircle size={18}/>} color="emerald" trend="+5 vs last month" trendUp/>
        <StatCard title="Rejected" value="3" icon={<X size={18}/>} color="red"/>
      </div>
      <div className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Approval Queue" action={<button className="text-xs text-blue-600 font-semibold hover:underline">View all</button>}>
          <div className="divide-y divide-slate-50">
            {CONTRACTS.slice(0,5).map((c,i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"><FileText size={13} className="text-blue-600"/></div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 max-w-[180px] truncate">{c.title}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{c.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={c.status}/>
                  <button className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold rounded-lg transition-colors">Approve</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100">
              <Sparkles size={13} className="text-violet-500"/><h3 className="text-sm font-semibold text-slate-800">AI Clause Detection</h3>
            </div>
            <div className="p-4 space-y-2.5">
              {[
                { c:"Non-compete clause missing", id:"CTR-2024-003", r:"Medium" },
                { c:"Auto-renewal term detected", id:"CTR-2024-005", r:"High" },
                { c:"SLA penalty cap unspecified", id:"CTR-2024-002", r:"Low" },
              ].map((cl,i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{cl.c}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{cl.id}</p>
                  </div>
                  <RiskBadge risk={cl.r}/>
                </div>
              ))}
            </div>
          </Card>
          <StatCard title="Legal Repository" value="61" sub="Total contracts stored" icon={<BookOpen size={18}/>} color="teal"/>
        </div>
      </div>
    </div>
  );
}

function EmployeeDashboard({ role }: { role: Role }) {
  const names: Partial<Record<Role, string>> = { "Department Head":"Priya", Employee:"Deepa" };
  const name = names[role] ?? "User";
  return (
    <div className="space-y-5 pb-6">
      <WelcomeBanner role={role}/>
      <div className="px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="My Contracts" value="6" icon={<FileText size={18}/>} color="blue"/>
        <StatCard title="Assigned Tasks" value="8" icon={<ClipboardList size={18}/>} color="amber"/>
        <StatCard title="Completed Tasks" value="14" icon={<CheckCircle size={18}/>} color="emerald"/>
        <StatCard title="Upcoming Deadlines" value="3" icon={<Clock size={18}/>} color="red"/>
      </div>
      <div className="px-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="My Tasks" action={<button className="text-xs text-blue-600 font-semibold">View all</button>}>
          <div className="divide-y divide-slate-50">
            {OBLIGATIONS.slice(0,4).map(o => (
              <div key={o.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${o.status==="Overdue"?"bg-red-500":o.status==="Completed"?"bg-emerald-500":"bg-amber-500"}`}/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 font-medium truncate">{o.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Due {o.due} • {o.contract}</p>
                </div>
                <StatusBadge status={o.status}/>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Today&apos;s Schedule">
          <div className="p-5 space-y-3.5">
            {[
              { time:"09:00 AM", event:"Contract Review – AWS Cloud Services", type:"review" },
              { time:"11:00 AM", event:"Legal Team Standup", type:"meeting" },
              { time:"02:00 PM", event:"Obligation Due – License Compliance Report", type:"deadline" },
              { time:"04:30 PM", event:"Approval Submission for CTR-2024-006", type:"action" },
            ].map((s,i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[11px] text-slate-400 font-mono w-20 flex-shrink-0 pt-0.5">{s.time}</span>
                <div className="flex items-start gap-2 flex-1">
                  <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${s.type==="deadline"?"bg-red-400":s.type==="meeting"?"bg-blue-400":s.type==="action"?"bg-amber-400":"bg-emerald-400"}`}/>
                  <p className="text-sm text-slate-700">{s.event}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function getDashboardForRole(role: Role) {
  switch (role) {
    case "Administrator":      return <AdminDashboard role={role}/>;
    case "Legal Manager":      return <LegalDashboard role={role}/>;
    case "Compliance Officer": return <ComplianceDashboard role={role}/>;
    case "Contract Manager":   return <AdminDashboard role={role}/>;
    case "Department Head":    return <EmployeeDashboard role={role}/>;
    case "Employee":           return <EmployeeDashboard role={role}/>;
    default:                   return <AdminDashboard role={role}/>;
  }
}

// ─── Contract Repository ──────────────────────────────────────────────────────
function ContractsView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"table"|"grid">("table");
  const statuses = ["All","Active","Pending Review","Draft","Expiring Soon","Expired"];
  const filtered = CONTRACTS.filter(c =>
    (statusFilter==="All"||c.status===statusFilter) &&
    (c.title.toLowerCase().includes(search.toLowerCase())||c.vendor.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Contract Repository</h2>
          <p className="text-sm text-slate-500">{CONTRACTS.length} contracts · AI Smart Search enabled</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50"><UploadCloud size={13}/> Upload</button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50"><Download size={13}/> Export</button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20" style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}>
            <Plus size={13}/> New Contract
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-60" placeholder="AI Smart Search…"/>
        </div>
        <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded-xl p-1">
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition-all ${statusFilter===s?"bg-blue-600 text-white shadow-sm":"text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-0.5 bg-white border border-slate-200 rounded-xl p-1">
          <button onClick={() => setViewMode("table")} className={`p-1.5 rounded-lg transition-all ${viewMode==="table"?"bg-slate-800 text-white":"text-slate-400 hover:text-slate-600"}`}><SlidersHorizontal size={13}/></button>
          <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-lg transition-all ${viewMode==="grid"?"bg-slate-800 text-white":"text-slate-400 hover:text-slate-600"}`}><Columns size={13}/></button>
        </div>
      </div>
      {viewMode==="table" ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Contract ID","Title & Vendor","Type","Value","Status","Risk","End Date",""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400">{c.id}</td>
                  <td className="px-4 py-3.5"><p className="font-semibold text-slate-800">{c.title}</p><p className="text-xs text-slate-400">{c.vendor}</p></td>
                  <td className="px-4 py-3.5 text-xs text-slate-500">{c.type}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-slate-800">{c.value}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={c.status}/></td>
                  <td className="px-4 py-3.5"><RiskBadge risk={c.risk}/></td>
                  <td className="px-4 py-3.5">
                    <p className="text-xs text-slate-500">{c.end}</p>
                    {c.daysLeft>0&&c.daysLeft<60&&<p className="text-[11px] text-red-500 font-semibold">{c.daysLeft}d left</p>}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Eye size={13}/></button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"><Edit2 size={13}/></button>
                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length===0&&<div className="py-14 text-center"><FileText size={38} className="mx-auto mb-2 text-slate-200"/><p className="text-sm font-semibold text-slate-400">No contracts found</p></div>}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-500">Showing {filtered.length} of {CONTRACTS.length} contracts</p>
            <div className="flex gap-1">{[1,2,3].map(p=><button key={p} className={`w-7 h-7 text-xs rounded-lg font-medium ${p===1?"bg-blue-600 text-white":"text-slate-500 hover:bg-slate-100"}`}>{p}</button>)}</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(c => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2"><StatusBadge status={c.status}/><RiskBadge risk={c.risk}/></div><MoreHorizontal size={14} className="text-slate-300"/></div>
              <p className="text-sm font-bold text-slate-900 mb-1 leading-snug">{c.title}</p>
              <p className="text-xs text-slate-400 mb-3">{c.vendor}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100"><span className="font-bold text-slate-800">{c.value}</span><span>{c.end}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Obligations ──────────────────────────────────────────────────────────────
function ObligationsView() {
  const [tab, setTab] = useState<"all"|"pending"|"overdue"|"completed">("all");
  const filtered = OBLIGATIONS.filter(o => {
    if (tab==="all") return true;
    if (tab==="pending") return o.status==="Pending"||o.status==="In Progress";
    if (tab==="overdue") return o.status==="Overdue";
    return o.status==="Completed";
  });
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-slate-900">Obligation Tracker</h2><p className="text-sm text-slate-500">Monitor and manage all contract obligations</p></div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl" style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}><Plus size={13}/> Add Obligation</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total" value={OBLIGATIONS.length} icon={<ClipboardList size={18}/>} color="blue"/>
        <StatCard title="Overdue" value={OBLIGATIONS.filter(o=>o.status==="Overdue").length} icon={<AlertCircle size={18}/>} color="red"/>
        <StatCard title="In Progress" value={OBLIGATIONS.filter(o=>o.status==="In Progress").length} icon={<Activity size={18}/>} color="amber"/>
        <StatCard title="Completed" value={OBLIGATIONS.filter(o=>o.status==="Completed").length} icon={<CheckCircle size={18}/>} color="emerald"/>
      </div>
      <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {(["all","pending","overdue","completed"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${tab===t?"bg-slate-800 text-white":"text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}>{t}</button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-slate-100 bg-slate-50">{["ID","Obligation","Contract","Priority","Due Date","Assignee","Status"].map(h=><th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(o => (
              <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400">{o.id}</td>
                <td className="px-4 py-3.5"><p className="font-semibold text-slate-800 max-w-xs">{o.title}</p></td>
                <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400">{o.contract}</td>
                <td className="px-4 py-3.5"><Badge label={o.priority} variant={o.priority==="Critical"?"purple":o.priority==="High"?"danger":o.priority==="Medium"?"warning":"muted"}/></td>
                <td className="px-4 py-3.5 text-xs text-slate-600">{o.due}</td>
                <td className="px-4 py-3.5"><div className="flex items-center gap-2"><Avatar name={o.assignee} size="sm"/><span className="text-xs text-slate-600">{o.assignee}</span></div></td>
                <td className="px-4 py-3.5"><StatusBadge status={o.status}/></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0&&<div className="py-14 text-center"><CheckCircle size={36} className="mx-auto mb-2 text-slate-200"/><p className="text-sm font-semibold text-slate-400">No obligations here</p></div>}
      </div>
    </div>
  );
}

// ─── Renewal Dashboard ────────────────────────────────────────────────────────
function RenewalsView() {
  const expiring = CONTRACTS.filter(c=>c.daysLeft>0&&c.daysLeft<=90).sort((a,b)=>a.daysLeft-b.daysLeft);
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-slate-900">Renewal Dashboard</h2><p className="text-sm text-slate-500">Track and manage upcoming contract renewals</p></div>
        <div className="flex gap-2"><AiBadge text="AI Renewal Prediction"/><button className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl" style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}><RefreshCcw size={13}/> Auto-Remind All</button></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Expiring in 30d" value={CONTRACTS.filter(c=>c.daysLeft>0&&c.daysLeft<=30).length} icon={<AlertTriangle size={18}/>} color="red"/>
        <StatCard title="Expiring in 60d" value={CONTRACTS.filter(c=>c.daysLeft>30&&c.daysLeft<=60).length} icon={<Clock size={18}/>} color="amber"/>
        <StatCard title="Expiring in 90d" value={CONTRACTS.filter(c=>c.daysLeft>60&&c.daysLeft<=90).length} icon={<Calendar size={18}/>} color="blue"/>
        <StatCard title="Auto-Reminder ON" value="5" sub="Out of 8 expiring" icon={<Zap size={18}/>} color="emerald"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Renewal Pipeline" className="lg:col-span-2">
          <div className="p-4">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={renewalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="month" tick={{ fontSize:11, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:11, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:10, border:"1px solid #E2E8F0", fontSize:12 }}/>
                <Bar dataKey="count" name="Renewals Due" fill="#3B82F6" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100"><Sparkles size={13} className="text-violet-500"/><h3 className="text-sm font-semibold text-slate-800">AI Renewal Prediction</h3></div>
          <div className="p-4 space-y-3">
            {[
              { id:"CTR-2024-005", action:"Renew at -15% cost", confidence:94, color:"emerald" },
              { id:"CTR-2024-001", action:"Renegotiate SLA terms", confidence:87, color:"blue" },
              { id:"CTR-2024-007", action:"Extend 6 months auto", confidence:76, color:"amber" },
            ].map((p,i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] text-slate-500">{p.id}</span>
                  <span className={`text-[11px] font-bold ${p.color==="emerald"?"text-emerald-600":p.color==="blue"?"text-blue-600":"text-amber-600"}`}>{p.confidence}%</span>
                </div>
                <p className="text-xs font-semibold text-slate-800 mb-1.5">{p.action}</p>
                <Progress value={p.confidence} color={p.color}/>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card title="Contracts Expiring Soon">
        <div className="divide-y divide-slate-50">
          {expiring.length===0?(
            <div className="py-14 text-center"><CheckCircle size={36} className="mx-auto mb-2 text-slate-200"/><p className="text-sm font-semibold text-slate-400">No contracts expiring within 90 days</p></div>
          ):expiring.map(c => (
            <div key={c.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.daysLeft<=30?"bg-red-50":c.daysLeft<=60?"bg-amber-50":"bg-blue-50"}`}>
                  <Repeat size={15} className={c.daysLeft<=30?"text-red-600":c.daysLeft<=60?"text-amber-600":"text-blue-600"}/>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{c.title}</p>
                  <p className="text-xs text-slate-400">{c.vendor} · Expires {c.end}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className={`text-sm font-bold ${c.daysLeft<=30?"text-red-600":c.daysLeft<=60?"text-amber-600":"text-blue-600"}`}>{c.daysLeft} days</p>
                  <p className="text-[11px] text-slate-400">{c.value}</p>
                </div>
                <button className="px-3 py-1.5 text-white text-xs font-semibold rounded-xl" style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}>Initiate Renewal</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────────────────────────
function ReportsView() {
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <span>ContractIQ</span><ChevronRight size={12} className="text-slate-300"/><span>Modules</span><ChevronRight size={12} className="text-slate-300"/>
        <span className="text-slate-700 font-semibold">Reports &amp; Analytics</span>
      </div>
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-slate-900">Reports &amp; Analytics</h2><p className="text-sm text-slate-500">Generate, analyze, and export comprehensive reports</p></div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600"><CalendarDays size={13}/><span className="text-xs font-medium">Jul 1 – Jul 31, 2024</span></div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50"><Upload size={13}/> PDF</button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50"><Download size={13}/> Excel</button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Contract Value" value="$2.75M" icon={<Award size={18}/>} trend="+12% this quarter" trendUp color="blue"/>
        <StatCard title="Obligations Met" value="84%" icon={<CheckCircle size={18}/>} trend="+2% this month" trendUp color="emerald"/>
        <StatCard title="Avg Duration" value="14.2 mo" icon={<Calendar size={18}/>} color="teal"/>
        <StatCard title="Risk Exposure" value="Medium" sub="8 high-risk contracts" icon={<Shield size={18}/>} color="amber"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Monthly Contract Activity">
          <div className="p-4">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={monthlyContractData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="month" tick={{ fontSize:11, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:11, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:10, border:"1px solid #E2E8F0", fontSize:12 }}/>
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:11 }}/>
                <Bar dataKey="active" name="Active" fill="#3B82F6" radius={[4,4,0,0]}/>
                <Bar dataKey="new" name="New" fill="#10B981" radius={[4,4,0,0]}/>
                <Bar dataKey="expired" name="Expired" fill="#EF4444" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Compliance Trend">
          <div className="p-4">
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={complianceData}>
                <defs>
                  <linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9"/>
                <XAxis dataKey="month" tick={{ fontSize:11, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <YAxis domain={[60,100]} tick={{ fontSize:11, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius:10, border:"1px solid #E2E8F0", fontSize:12 }}/>
                <Area type="monotone" dataKey="score" name="Score" stroke="#10B981" fill="url(#cg3)" strokeWidth={2.5} dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card>
        <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100"><Sparkles size={13} className="text-violet-500"/><h3 className="text-sm font-semibold text-slate-800">AI Analytics Insights</h3><AiBadge text="Auto-generated"/></div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { i:"Contract volume increased 18% QoQ", d:"Driven primarily by SaaS agreements (+6 new)", c:"blue" },
            { i:"Compliance score plateaued at 84%", d:"Bottleneck: Procurement dept — 5 pending obligations", c:"amber" },
            { i:"3 contracts at renewal risk", d:"Estimated $630K ARR at risk if not renewed in time", c:"red" },
          ].map((ins,i) => (
            <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${ins.c==="blue"?"bg-blue-50 border-blue-100":ins.c==="amber"?"bg-amber-50 border-amber-100":"bg-red-50 border-red-100"}`}>
              <Sparkles size={13} className={ins.c==="blue"?"text-blue-600 mt-0.5":ins.c==="amber"?"text-amber-600 mt-0.5":"text-red-600 mt-0.5"}/>
              <div>
                <p className="text-sm font-bold text-slate-900">{ins.i}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ins.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { t:"Contract Summary Report", d:"Overview of all contracts by status, type, and value", icon:<FileText size={20}/>, c:"blue" },
          { t:"Compliance Report", d:"Compliance scores and obligation status per department", icon:<ShieldCheck size={20}/>, c:"emerald" },
          { t:"Risk Assessment Report", d:"High-risk contracts and mitigation recommendations", icon:<AlertTriangle size={20}/>, c:"red" },
          { t:"Renewal Pipeline Report", d:"Contracts expiring within 30, 60, and 90 days", icon:<RefreshCw size={20}/>, c:"amber" },
          { t:"Department Performance", d:"Compliance and obligations per department", icon:<BarChart2 size={20}/>, c:"teal" },
          { t:"Audit Trail Report", d:"Complete activity log for selected date range", icon:<BookOpen size={20}/>, c:"purple" },
        ].map(r => (
          <div key={r.t} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all cursor-pointer">
            <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${r.c==="blue"?"bg-blue-50 text-blue-600":r.c==="emerald"?"bg-emerald-50 text-emerald-600":r.c==="red"?"bg-red-50 text-red-600":r.c==="amber"?"bg-amber-50 text-amber-600":r.c==="teal"?"bg-teal-50 text-teal-600":"bg-purple-50 text-purple-600"}`}>{r.icon}</div>
            <h3 className="text-sm font-bold text-slate-800 mb-1">{r.t}</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">{r.d}</p>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg transition-colors">Preview</button>
              <button className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg transition-colors">Generate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Notifications Center ─────────────────────────────────────────────────────
function NotificationsView() {
  const [category, setCategory] = useState("All");
  const categories = ["All","Contracts","Compliance","Renewals","Workflow","AI Alerts","Approvals","System"];
  const all = [
    { t:"Contract Expiring Urgently", d:"CTR-2024-005 (Darwinbox) expires in 25 days. No renewal initiated.", type:"error", cat:"Renewals", time:"Just now", unread:true },
    { t:"Approval Required", d:"CTR-2024-006 (Deloitte Audit) is awaiting your legal review and approval.", type:"info", cat:"Approvals", time:"30 min ago", unread:true },
    { t:"Overdue Obligation", d:"OBL-004 (Property Insurance Renewal) is overdue by 5 days.", type:"error", cat:"Workflow", time:"2 hrs ago", unread:false },
    { t:"AI Risk Alert", d:"3 contracts flagged by AI for missing SLA clauses — compliance risk detected.", type:"warning", cat:"AI Alerts", time:"3 hrs ago", unread:false },
    { t:"Compliance Score Updated", d:"Compliance score increased to 84% after 3 obligations were resolved.", type:"success", cat:"Compliance", time:"5 hrs ago", unread:false },
    { t:"New Contract Assigned", d:"CTR-2024-007 (Ogilvy) has been assigned to your review queue.", type:"info", cat:"Contracts", time:"Yesterday", unread:false },
    { t:"Scheduled Audit Reminder", d:"Q2 Financial Controls Audit scheduled for Jul 25 — 3 weeks away.", type:"info", cat:"System", time:"Yesterday", unread:false },
  ];
  const filtered = all.filter(n => category==="All"||n.cat===category);

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Notifications Center</h2>
          <p className="text-sm text-slate-500">Stay updated with approvals, renewals, compliance alerts, and AI insights.</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs text-slate-500 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50">Mark all read</button>
          <button className="text-xs text-blue-600 font-semibold px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100">Settings</button>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex-1 space-y-3.5">
          <div className="flex gap-1.5 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${category===c?"bg-blue-600 text-white border-blue-600":"bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"}`}>
                {c}
              </button>
            ))}
          </div>
          {filtered.length===0?(
            <div className="py-20 text-center bg-white rounded-xl border border-slate-200">
              <Inbox size={44} className="mx-auto mb-3 text-slate-200"/>
              <p className="text-sm font-bold text-slate-400">No notifications</p>
              <p className="text-xs text-slate-300 mt-1">You are all caught up.</p>
            </div>
          ):filtered.map((n,i) => (
            <div key={i} className={`bg-white rounded-xl border p-4 flex items-start gap-4 hover:shadow-sm transition-all cursor-pointer ${n.unread?"border-blue-200 shadow-sm":"border-slate-200"}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${n.type==="error"?"bg-red-50":n.type==="warning"?"bg-amber-50":n.type==="success"?"bg-emerald-50":"bg-blue-50"}`}>
                {n.type==="error"?<AlertCircle size={16} className="text-red-600"/>:n.type==="warning"?<AlertTriangle size={16} className="text-amber-600"/>:n.type==="success"?<CheckCircle size={16} className="text-emerald-600"/>:<Info size={16} className="text-blue-600"/>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-bold text-slate-900">{n.t}</p>
                  <Badge label={n.cat} variant="muted"/>
                  {n.unread&&<div className="w-2 h-2 bg-blue-500 rounded-full"/>}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{n.d}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button className="text-xs font-semibold text-blue-600 hover:underline">View Details</button>
                  <button className="text-xs text-slate-400 hover:text-slate-600">Dismiss</button>
                </div>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0 whitespace-nowrap">{n.time}</span>
            </div>
          ))}
        </div>
        {/* AI Summary sidebar */}
        <div className="w-60 flex-shrink-0 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3.5 border-b border-slate-100" style={{ background:"linear-gradient(135deg,rgba(139,92,246,0.05),rgba(59,130,246,0.05))" }}>
              <Sparkles size={13} className="text-violet-500"/><h3 className="text-sm font-semibold text-slate-800">AI Summary</h3>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">You have <strong>2 urgent items</strong> requiring action — a contract expiry and an approval request.</p>
              <div className="space-y-2">
                {[{l:"Critical",count:2,c:"red"},{l:"Warnings",count:2,c:"amber"},{l:"Info",count:3,c:"blue"}].map(s => (
                  <div key={s.l} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5"><div className={`w-2 h-2 rounded-full ${s.c==="red"?"bg-red-500":s.c==="amber"?"bg-amber-500":"bg-blue-500"}`}/><span className="text-slate-600">{s.l}</span></div>
                    <span className="font-bold text-slate-700">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Card title="Upcoming Renewals">
            <div className="p-3 space-y-2">
              {CONTRACTS.filter(c=>c.daysLeft>0&&c.daysLeft<=60).slice(0,3).map(c => (
                <div key={c.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="min-w-0"><p className="text-[11px] font-semibold text-slate-800 truncate">{c.id}</p><p className="text-[10px] text-slate-400">{c.daysLeft}d left</p></div>
                  <span className={`text-[10px] font-bold ml-2 ${c.daysLeft<=30?"text-red-600":"text-amber-600"}`}>{c.daysLeft<=30?"Urgent":"Soon"}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Audit Logs ───────────────────────────────────────────────────────────────
function AuditLogsView() {
  const [filter, setFilter] = useState("All");
  const types = ["All","Security","Approval","Create","Update","Delete","Export"];
  const filtered = AUDIT_LOGS.filter(l => filter==="All"||l.type.toLowerCase()===filter.toLowerCase());

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-slate-900">Audit Logs</h2><p className="text-sm text-slate-500">Complete activity trail — user actions, security events, and system changes</p></div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50"><SlidersHorizontal size={13}/> Filters</button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50"><Download size={13}/> Export</button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Events" value={AUDIT_LOGS.length} icon={<BookOpen size={18}/>} color="blue"/>
        <StatCard title="Security Events" value={AUDIT_LOGS.filter(l=>l.type==="security").length} icon={<Lock size={18}/>} color="red"/>
        <StatCard title="Approvals" value={AUDIT_LOGS.filter(l=>l.type==="approval").length} icon={<CheckCircle size={18}/>} color="emerald"/>
        <StatCard title="AI Actions" value={AUDIT_LOGS.filter(l=>l.type==="ai").length} icon={<Sparkles size={18}/>} color="purple"/>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${filter===t?"bg-slate-800 text-white border-slate-800":"bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-50">
          {filtered.map((log,i) => (
            <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${log.type==="security"||log.type==="delete"?"bg-red-50":log.type==="approval"?"bg-emerald-50":log.type==="ai"?"bg-violet-50":log.type==="export"||log.type==="upload"?"bg-teal-50":log.type==="create"?"bg-blue-50":"bg-amber-50"}`}>
                {log.type==="security"?<Lock size={13} className="text-red-600"/>:log.type==="approval"?<CheckCircle size={13} className="text-emerald-600"/>:log.type==="create"?<Plus size={13} className="text-blue-600"/>:log.type==="delete"?<Trash2 size={13} className="text-red-600"/>:log.type==="ai"?<Sparkles size={13} className="text-violet-600"/>:log.type==="export"?<Download size={13} className="text-teal-600"/>:log.type==="upload"?<UploadCloud size={13} className="text-blue-600"/>:<Edit2 size={13} className="text-amber-600"/>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5"><Avatar name={log.user} size="sm"/><span className="text-sm font-bold text-slate-800">{log.user}</span></div>
                  <span className="text-sm text-slate-500">{log.action}</span>
                  <span className="text-sm font-semibold text-blue-600">{log.target}</span>
                  <Badge label={log.type} variant={log.type==="security"||log.type==="delete"?"danger":log.type==="approval"?"success":log.type==="ai"?"purple":log.type==="export"||log.type==="upload"?"teal":log.type==="create"?"info":"warning"}/>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">IP: {log.ip}</p>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0 whitespace-nowrap">{log.time}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-500">Showing {filtered.length} of {AUDIT_LOGS.length} events</p>
          <div className="flex gap-1">{[1,2,3].map(p=><button key={p} className={`w-7 h-7 text-xs rounded-lg font-medium ${p===1?"bg-slate-800 text-white":"text-slate-500 hover:bg-slate-100"}`}>{p}</button>)}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Users / Settings / Profile ───────────────────────────────────────────────
function UsersView() {
  const [search, setSearch] = useState("");
  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase())||u.role.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div><h2 className="text-lg font-bold text-slate-900">User Management</h2><p className="text-sm text-slate-500">{USERS.length} users · Role-based access control</p></div>
        <button className="flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20" style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}><Plus size={13}/> Invite User</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={USERS.length} icon={<Users size={18}/>} color="blue"/>
        <StatCard title="Active" value={USERS.filter(u=>u.status==="Active").length} icon={<CheckCircle size={18}/>} color="emerald"/>
        <StatCard title="Inactive" value={USERS.filter(u=>u.status==="Inactive").length} icon={<AlertCircle size={18}/>} color="amber"/>
        <StatCard title="Departments" value="6" icon={<Building2 size={18}/>} color="teal"/>
      </div>
      <div className="relative w-72">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
        <input value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Search users…"/>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-slate-100 bg-slate-50">{["User","Role","Department","Status","Last Active","Actions"].map(h=><th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3"><Avatar name={u.name} size="md"/><div><p className="font-semibold text-slate-800">{u.name}</p><p className="text-xs text-slate-400">{u.email}</p></div></div>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-600 font-medium">{u.role}</td>
                <td className="px-4 py-3.5 text-xs text-slate-600">{u.dept}</td>
                <td className="px-4 py-3.5"><Badge label={u.status} variant={u.status==="Active"?"success":"muted"}/></td>
                <td className="px-4 py-3.5 text-xs text-slate-400">{u.last}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit2 size={13}/></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={13}/></button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"><MoreVertical size={13}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="p-6 space-y-5 max-w-3xl">
      <div><h2 className="text-lg font-bold text-slate-900">Settings</h2><p className="text-sm text-slate-500">Manage platform preferences, security, and integrations</p></div>
      {[
        { title:"General Settings", icon:<Settings size={15}/>, type:"inputs", items:[
          {l:"Organization Name",v:"ContractIQ Technologies Pvt. Ltd."},{l:"Default Language",v:"English (US)"},{l:"Date Format",v:"DD/MM/YYYY"},{l:"Timezone",v:"Asia/Kolkata (IST +5:30)"},
        ]},
        { title:"Notification Preferences", icon:<Bell size={15}/>, type:"toggles", toggles:[
          {l:"Contract renewal alerts (30 days before)",on:true},{l:"Obligation deadline reminders",on:true},{l:"Compliance score updates",on:true},{l:"AI insights notifications",on:true},{l:"Weekly digest email",on:false},
        ]},
        { title:"Security Settings", icon:<Lock size={15}/>, type:"toggles", toggles:[
          {l:"Two-Factor Authentication (2FA)",on:true},{l:"Login alert notifications",on:true},{l:"Session timeout (30 min idle)",on:false},{l:"IP allowlist enforcement",on:false},
        ]},
        { title:"Workflow Automation", icon:<Zap size={15}/>, type:"toggles", toggles:[
          {l:"Auto-assign obligations on contract activation",on:true},{l:"Send renewal reminders 30 days before expiry",on:true},{l:"Auto-escalate overdue items to department heads",on:false},{l:"AI auto-flagging for high-risk clauses",on:true},
        ]},
      ].map(section => (
        <div key={section.title} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100 bg-slate-50">
            <span className="text-slate-500">{section.icon}</span>
            <h3 className="text-sm font-bold text-slate-800">{section.title}</h3>
          </div>
          <div className="p-5">
            {section.type==="inputs"&&section.items&&(
              <div className="grid grid-cols-2 gap-4">
                {section.items.map(f => (
                  <div key={f.l}>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{f.l}</label>
                    <input defaultValue={f.v} className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"/>
                  </div>
                ))}
              </div>
            )}
            {section.type==="toggles"&&section.toggles&&(
              <div className="space-y-3">
                {section.toggles.map(t => (
                  <div key={t.l} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                    <p className="text-sm text-slate-700">{t.l}</p>
                    <div className={`w-11 h-6 rounded-full cursor-pointer flex items-center transition-colors ${t.on?"bg-emerald-500":"bg-slate-200"}`}>
                      <div className={`w-4 h-4 bg-white rounded-full mx-1 shadow transition-transform duration-200 ${t.on?"translate-x-5":""}`}/>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex justify-end gap-2">
        <button className="px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50">Cancel</button>
        <button className="px-5 py-2.5 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20" style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}>Save All Changes</button>
      </div>
    </div>
  );
}

function ProfileView({ role }: { role: Role }) {
  return (
    <div className="p-6 space-y-5 max-w-3xl">
      <h2 className="text-lg font-bold text-slate-900">My Profile</h2>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-100">
          <div className="relative">
            <Avatar name="Arjun Mehta" size="xl"/>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm"><Edit2 size={11} className="text-white"/></button>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Arjun Mehta</h3>
            <p className="text-slate-500 text-sm mt-0.5">{role} · IT Department</p>
            <div className="flex gap-2 mt-2"><Badge label="Active" variant="success"/><Badge label={role} variant="info"/></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            {l:"Full Name",v:"Arjun Mehta",icon:<User size={13}/>},{l:"Email Address",v:"arjun.mehta@contractiq.com",icon:<Mail size={13}/>},
            {l:"Phone Number",v:"+91 98765 43210",icon:<Phone size={13}/>},{l:"Department",v:"Information Technology",icon:<Building2 size={13}/>},
            {l:"Role",v:role,icon:<Briefcase size={13}/>},{l:"Organization",v:"ContractIQ Technologies Pvt. Ltd.",icon:<Award size={13}/>},
          ].map(f => (
            <div key={f.l}>
              <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{f.l}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{f.icon}</span>
                <input defaultValue={f.v} className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"/>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-5 gap-2">
          <button className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50">Cancel</button>
          <button className="px-4 py-2 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20" style={{ background:"linear-gradient(135deg,#2563EB,#1D4ED8)" }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ─── View Renderer ────────────────────────────────────────────────────────────
function renderView(view: AppView, role: Role) {
  switch (view) {
    case "dashboard":     return getDashboardForRole(role);
    case "contracts":     return <ContractsView/>;
    case "obligations":   return <ObligationsView/>;
    case "renewals":      return <RenewalsView/>;
    case "compliance":    return <ComplianceDashboard role={role}/>;
    case "reports":       return <ReportsView/>;
    case "notifications": return <NotificationsView/>;
    case "audit":         return <AuditLogsView/>;
    case "users":         return <UsersView/>;
    case "settings":      return <SettingsView/>;
    case "profile":       return <ProfileView role={role}/>;
    default:              return getDashboardForRole(role);
  }
}

// ─── App Shell ────────────────────────────────────────────────────────────────
function AppShell({ role, onLogout, onSwitchRole }: {
  role: Role; onLogout: () => void; onSwitchRole: (r: Role) => void;
}) {
  const [view, setView] = useState<AppView>("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [switchOpen, setSwitchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily:"'Inter',sans-serif" }}>
      <Sidebar role={role} view={view} onView={setView} collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}/>
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNav role={role} view={view} onLogout={onLogout} onSwitchRole={() => setSwitchOpen(true)} onView={setView} darkMode={darkMode} onToggleDark={() => setDarkMode(!darkMode)}/>
        <main className="flex-1 overflow-y-auto" style={{ background:"#F8FAFC" }}>
          {renderView(view, role)}
        </main>
      </div>
      {switchOpen&&<SwitchRoleDialog currentRole={role} onClose={() => setSwitchOpen(false)} onSwitch={r => { onSwitchRole(r); setSwitchOpen(false); }}/>}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [role, setRole] = useState<Role>("Administrator");

  return (
    <>
      {screen==="splash"   && <SplashScreen onDone={() => setScreen("login")}/>}
      {screen==="login"    && <LoginScreen onLogin={r => { setRole(r); setScreen("app"); }} onNavigate={setScreen}/>}
      {screen==="register" && <RegisterScreen onNavigate={setScreen}/>}
      {screen==="forgot"   && <ForgotScreen onNavigate={setScreen}/>}
      {screen==="app"      && <AppShell role={role} onLogout={() => setScreen("login")} onSwitchRole={r => setRole(r)}/>}
    </>
  );
}
