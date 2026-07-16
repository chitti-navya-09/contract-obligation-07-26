const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const contracts = [
  {
    id: "CNT001",
    title: "Software Development Agreement",
    client: "ABC Pvt Ltd",
    status: "Active",
    startDate: "01-07-2026",
    endDate: "30-06-2027"
  },
  {
    id: "CNT002",
    title: "Cloud Service Agreement",
    client: "XYZ Technologies",
    status: "Pending",
    startDate: "15-07-2026",
    endDate: "14-07-2027"
  },
  {
    id: "CNT003",
    title: "Maintenance Contract",
    client: "Global Solutions",
    status: "Completed",
    startDate: "10-01-2026",
    endDate: "09-07-2026"
  }
];

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/contracts", (req, res) => {
  res.json(contracts);
});

const obligations = [
  { id: 'OBL-001', contract: 'Acme Corp NDA', description: 'Submit Q3 Financials', dueDate: 'Jul 15, 2026', status: 'Pending', priority: 'High' },
  { id: 'OBL-002', contract: 'TechFlow MSA', description: 'Renew SLA terms', dueDate: 'Jul 20, 2026', status: 'In Progress', priority: 'Medium' },
  { id: 'OBL-003', contract: 'Global Logistics SLA', description: 'Quarterly compliance audit', dueDate: 'Jun 30, 2026', status: 'Completed', priority: 'High' },
  { id: 'OBL-004', contract: 'CloudSystems Vendor', description: 'Update security certificates', dueDate: 'Jul 02, 2026', status: 'Overdue', priority: 'Critical' }
];

const recentContracts = [
  { id: 'CTR-2026-001', vendor: 'Acme Corp', type: 'NDA', status: 'Active', date: 'Jul 12, 2026' },
  { id: 'CTR-2026-002', vendor: 'TechFlow Inc', type: 'MSA', status: 'Pending', date: 'Jul 10, 2026' },
  { id: 'CTR-2026-003', vendor: 'Global Logistics', type: 'SLA', status: 'Active', date: 'Jul 05, 2026' },
  { id: 'CTR-2026-004', vendor: 'CloudSystems', type: 'Vendor', status: 'Expired', date: 'Jun 28, 2026' }
];

const auditLogs = [
  { time: '2026-07-12 09:42 AM', user: 'Admin User', action: 'Login', target: 'System', ip: '192.168.1.45' },
  { time: '2026-07-11 14:22 PM', user: 'Jane Doe', action: 'Uploaded Contract', target: 'CTR-2026-001', ip: '10.0.0.12' },
  { time: '2026-07-10 11:05 AM', user: 'John Smith', action: 'Approved', target: 'CTR-2026-002', ip: '172.16.0.4' },
  { time: '2026-07-09 16:45 PM', user: 'System', action: 'Automated Scan', target: 'All Active', ip: 'localhost' }
];

const reportMockData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 5100 },
  { name: 'Apr', value: 4700 },
  { name: 'May', value: 6300 },
  { name: 'Jun', value: 5900 }
];

app.get("/api/obligations", (req, res) => {
  res.json(obligations);
});

app.get("/api/dashboard/recent", (req, res) => {
  res.json(recentContracts);
});

app.get("/api/audit-logs", (req, res) => {
  res.json(auditLogs);
});

app.get("/api/reports/mockData", (req, res) => {
  res.json(reportMockData);
});

const users = [];

app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'Email might be in use' });
  }
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, name, email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  res.json({ message: 'Login successful', access_token: 'fake-jwt-token-123' });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});