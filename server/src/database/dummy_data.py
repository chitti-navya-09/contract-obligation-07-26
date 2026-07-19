contracts = [
    { "id": "CTR-2026-001", "vendor": "Acme Corp", "type": "NDA", "value": "$50,000", "owner": "Admin User", "status": "Active" },
    { "id": "CTR-2026-002", "vendor": "TechFlow Inc", "type": "MSA", "value": "$120,000", "owner": "Jane Doe", "status": "Pending" },
    { "id": "CTR-2026-003", "vendor": "Global Logistics", "type": "SLA", "value": "$25,000", "owner": "John Smith", "status": "Active" }
]

obligations = [
    { "id": "OBL-001", "contract": "Acme Corp NDA", "description": "Submit Q3 Financials", "dueDate": "Jul 15, 2026", "status": "Pending", "priority": "High" },
    { "id": "OBL-002", "contract": "TechFlow MSA", "description": "Renew SLA terms", "dueDate": "Jul 20, 2026", "status": "In Progress", "priority": "Medium" },
    { "id": "OBL-003", "contract": "Global Logistics SLA", "description": "Quarterly compliance audit", "dueDate": "Jun 30, 2026", "status": "Completed", "priority": "High" },
    { "id": "OBL-004", "contract": "CloudSystems Vendor", "description": "Update security certificates", "dueDate": "Jul 02, 2026", "status": "Overdue", "priority": "Critical" }
]

recentContracts = [
    { "id": "CTR-2026-001", "vendor": "Acme Corp", "type": "NDA", "status": "Active", "date": "Jul 12, 2026" },
    { "id": "CTR-2026-002", "vendor": "TechFlow Inc", "type": "MSA", "status": "Pending", "date": "Jul 10, 2026" },
    { "id": "CTR-2026-003", "vendor": "Global Logistics", "type": "SLA", "status": "Active", "date": "Jul 05, 2026" },
    { "id": "CTR-2026-004", "vendor": "CloudSystems", "type": "Vendor", "status": "Expired", "date": "Jun 28, 2026" }
]

auditLogs = [
    { "time": "2026-07-12 09:42 AM", "user": "Admin User", "action": "Login", "target": "System", "ip": "192.168.1.45" },
    { "time": "2026-07-11 14:22 PM", "user": "Jane Doe", "action": "Uploaded Contract", "target": "CTR-2026-001", "ip": "10.0.0.12" },
    { "time": "2026-07-10 11:05 AM", "user": "John Smith", "action": "Approved", "target": "CTR-2026-002", "ip": "172.16.0.4" },
    { "time": "2026-07-09 16:45 PM", "user": "System", "action": "Automated Scan", "target": "All Active", "ip": "localhost" }
]

reportMockData = [
    { "name": "Jan", "value": 4200 },
    { "name": "Feb", "value": 3800 },
    { "name": "Mar", "value": 5100 },
    { "name": "Apr", "value": 4700 },
    { "name": "May", "value": 6300 },
    { "name": "Jun", "value": 5900 }
]

users_db = {}

dashboardStats = {
    "activeContracts": { "metric": "1,248", "trendText": "+12% this month", "trendDirection": "up" },
    "upcomingRenewals": { "metric": "34", "trendText": "+4 this week", "trendDirection": "up" },
    "pendingObligations": { "metric": "156", "trendText": "-2% from last week", "trendDirection": "down" },
    "complianceStatus": { "metric": "98.5%", "trendText": "Consistent", "trendDirection": "up" }
}

activityData = [
    { "month": "Jan", "drafts": 25, "executed": 15 },
    { "month": "Feb", "drafts": 40, "executed": 20 },
    { "month": "Mar", "drafts": 35, "executed": 35 },
    { "month": "Apr", "drafts": 65, "executed": 45 },
    { "month": "May", "drafts": 50, "executed": 70 },
    { "month": "Jun", "drafts": 85, "executed": 60 }
]

reportDetails = {
    "totalValue": "$30,000",
    "renewals": "34",
    "compliance": "98.5%",
    "csvData": "id,name,value\n1,Contract A,4200\n2,Contract B,3800\n3,Contract C,5100"
}

transactionsData = [
    { "id": "TRX-101", "date": "Oct 12, 2026", "description": "Payment for Contract A", "amount": "$4,200", "status": "Completed" },
    { "id": "TRX-102", "date": "Oct 14, 2026", "description": "Software License Renewal", "amount": "$1,500", "status": "Pending" },
    { "id": "TRX-103", "date": "Oct 15, 2026", "description": "Consulting Fees", "amount": "$3,800", "status": "Failed" },
    { "id": "TRX-104", "date": "Oct 16, 2026", "description": "Legal Retainer", "amount": "$5,000", "status": "Completed" },
]

taxEstimatorsData = {
    "estimatedTax": "$12,450",
    "taxRate": "15%",
    "deductions": "$3,200",
    "netIncome": "$85,000",
    "breakdown": [
        { "category": "Federal", "amount": "$8,500" },
        { "category": "State", "amount": "$2,100" },
        { "category": "Local", "amount": "$1,850" }
    ]
}
