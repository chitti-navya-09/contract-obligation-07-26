// Normalized & clean centralized mock data for ContractIQ.
// Serving as a single source of truth for the frontend components.

export const MOCK_USER = {
  id: 1,
  full_name: "Arjun Mehta",
  email: "arjun.mehta@contractiq.com",
  role: "Administrator",
  department: "Legal Operations",
  job_title: "Compliance Lead",
  phone: "+1 (555) 019-2834",
  bio: "Senior legal operations leader overseeing vendor contracts, compliance strategy, and cross-functional legal reviews.",
  avatar_url: null,
  updated_at: null,
};

export const MOCK_NOTIFICATIONS = [
  { id: 1, cat: "Renewals", urgency: "critical", title: "Contract Expiring Urgently", desc: "CTR-2024-005 (Darwinbox) expires in 25 days. No renewal initiated.", time: "Just now", isRead: false },
  { id: 2, cat: "Approvals", urgency: "critical", title: "Approval Required", desc: "CTR-2024-006 (Deloitte Audit) is awaiting your legal review and approval.", time: "30 min ago", isRead: false },
  { id: 3, cat: "Workflow", urgency: "warning", title: "Overdue Obligation", desc: "OBL-004 (Property Insurance Renewal) is overdue by 5 days.", time: "2 hrs ago", isRead: false },
  { id: 4, cat: "Risk Alerts", urgency: "warning", title: "Risk Alert", desc: "3 contracts flagged for missing SLA clauses — compliance risk detected.", time: "3 hrs ago", isRead: true },
  { id: 5, cat: "Compliance", urgency: "info", title: "Compliance Score Updated", desc: "Compliance score increased to 84% after 3 obligations were resolved.", time: "5 hrs ago", isRead: true },
  { id: 6, cat: "Contracts", urgency: "info", title: "New Contract Assigned", desc: "CTR-2024-007 (Ogilvy) has been assigned to your review queue.", time: "Yesterday", isRead: true },
  { id: 7, cat: "System", urgency: "info", title: "Scheduled Audit Reminder", desc: "Q2 Financial Controls Audit scheduled for Jul 25 — 3 weeks away.", time: "Yesterday", isRead: true },
];

export const MOCK_UPCOMING_RENEWALS = [
  { code: "CTR-2024-005", name: "Darwinbox", daysLeft: 25 },
  { code: "CTR-2024-011", name: "Zoho People", daysLeft: 41 },
  { code: "CTR-2024-014", name: "AWS Enterprise", daysLeft: 58 },
];

export const MOCK_KPIS = [
  { label: "Contracts Signed (QTD)", value: "34", trend: "+12%" },
  { label: "Avg. Turnaround Time", value: "6.2 days", trend: "-8%" },
  { label: "Total Contract Value", value: "$2.1M", trend: "+18%" },
  { label: "Renewal Rate", value: "91%", trend: "+1.5%" },
];

export const MOCK_MONTHLY_VOLUME = [
  { month: "Feb", value: 18 },
  { month: "Mar", value: 22 },
  { month: "Apr", value: 19 },
  { month: "May", value: 27 },
  { month: "Jun", value: 24 },
  { month: "Jul", value: 34 },
];

export const MOCK_REPORT_TEMPLATES = [
  { title: "Compliance Summary", sub: "Score trend + open flags, last 90 days" },
  { title: "Obligation Status", sub: "All obligations grouped by owner and status" },
  { title: "Contract Portfolio", sub: "Full repository export with value & expiry" },
  { title: "Audit Trail", sub: "Every logged action for a chosen date range" },
];

export const MOCK_INTEGRATIONS = [
  { key: "salesforce", name: "Salesforce CRM", desc: "Sync contract records", color: "#3B82F6" },
  { key: "slack", name: "Slack Link", desc: "Push channel alerts", color: "#8B5CF6" },
  { key: "docusign", name: "DocuSign Connect", desc: "Manage e-signatures", color: "#10B981" },
  { key: "sharepoint", name: "SharePoint Repo", desc: "Document repository sync", color: "#F59E0B" },
];

export const MOCK_INVOICES = [
  { id: "INV-2026-06", date: "Jun 1, 2026", amount: "$4,800.00", status: "Paid" },
  { id: "INV-2026-05", date: "May 1, 2026", amount: "$4,800.00", status: "Paid" },
  { id: "INV-2026-04", date: "Apr 1, 2026", amount: "$4,320.00", status: "Paid" },
  { id: "INV-2026-03", date: "Mar 1, 2026", amount: "$4,320.00", status: "Paid" },
];

export const MOCK_FAQS = [
  { q: "How does ContractIQ identify a missed conditional deadline?", a: 'ContractIQ parses clause language for conditional triggers (e.g. "within 30 days of notice") and cross-references them against linked event dates, flagging any obligation that passes its computed due date without a logged completion.' },
  { q: "Can I assign backup owners to critical obligations?", a: 'Yes. Open any obligation in the Tracker, select "Assign Backup Owner," and choose a teammate. Backup owners receive the same alert cadence as the primary owner.' },
  { q: "How are renewal notice periods calculated?", a: "ContractIQ reads the auto-renewal clause and counts backward from the term end date using the stated notice window, then surfaces the result on the Renewal Dashboard." },
  { q: "Can I export obligation history for an audit?", a: "From Audit Logs, choose a date range and export to CSV or PDF. Exports include owner, status changes, and timestamps for every obligation in scope." },
];

export const MOCK_HELP_CATEGORIES = [
  { title: "Getting Started", sub: "Initial setup and ingesting contract PDFs" },
  { title: "Obligation Mapping", sub: "Defining SLAs, compliance parameters, milestones" },
  { title: "Audit & Reporting Logs", sub: "Exporting CSV/PDF history for executive review" },
  { title: "Integrations & Webhooks", sub: "Connecting repositories to external trackers" },
];

export const MOCK_QUICK_ACTIONS = [
  { id: "gen_report", label: "Run Compliance Audit", desc: "Scans repository and highlights SLA flags", icon: "Shield", color: "#3B82F6" },
  { id: "export_analytics", label: "Export Quarterly Review", desc: "Builds powerpoint and CSV data summary", icon: "Download", color: "#10B981" },
  { id: "notify_owners", label: "Ping Overdue Owners", desc: "Triggers Slack/Email reminders to all active owners", icon: "Bell", color: "#F59E0B" },
  { id: "clear_cache", label: "Clear Pipeline Queue", desc: "Flushes background OCR ingestion caches", icon: "Repeat", color: "#8B5CF6" },
  { id: "backup_db", label: "Trigger Backup snapshot", desc: "Creates secondary cold-storage backup", icon: "Briefcase", color: "#EC4899" },
  { id: "test_webhook", label: "Send Webhook Ping", desc: "Verifies DocuSign status ping receivers", icon: "Plug", color: "#14B8A6" },
];

export const MOCK_INVITED_USERS = [
  { id: 1, email: "sarah.connor@contractiq.com", role: "Reviewer", department: "Operations", status: "Pending", invitedAt: "2026-07-10T14:32:00Z" },
  { id: 2, email: "john.doe@contractiq.com", role: "Viewer", department: "Sales", status: "Accepted", invitedAt: "2026-07-08T09:15:00Z" },
  { id: 3, email: "ellen.ripley@contractiq.com", role: "Legal Lead", department: "Legal", status: "Expired", invitedAt: "2026-07-01T11:00:00Z" }
];
