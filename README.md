# ContractIQ Database Schema

This database schema is designed for the ContractIQ Contract Obligation Tracking and Compliance Management Platform.

---

## 1. Users

| Column | Data Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| organization | VARCHAR(150) | NOT NULL |
| department | VARCHAR(100) | NOT NULL |
| phone | VARCHAR(20) | NOT NULL |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| role | VARCHAR(50) | NOT NULL |
| is_active | BOOLEAN | DEFAULT TRUE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## 2. Contracts

| Column | Data Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| contract_name | VARCHAR(255) | NOT NULL |
| contract_number | VARCHAR(100) | UNIQUE |
| contract_type | VARCHAR(100) | NOT NULL |
| category | VARCHAR(100) | NOT NULL |
| vendor_name | VARCHAR(255) | NOT NULL |
| description | TEXT | NULL |
| start_date | DATE | NOT NULL |
| end_date | DATE | NOT NULL |
| renewal_date | DATE | NULL |
| contract_value | DECIMAL(15,2) | NULL |
| status | VARCHAR(50) | Draft / Under Review / Approved / Active / Expired / Terminated |
| owner_id | INTEGER | FOREIGN KEY → users(id) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## 3. Contract Versions

| Column | Data Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| contract_id | INTEGER | FOREIGN KEY → contracts(id) |
| version_number | INTEGER | NOT NULL |
| document_url | TEXT | NOT NULL |
| uploaded_by | INTEGER | FOREIGN KEY → users(id) |
| uploaded_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| remarks | TEXT | NULL |

---

## 4. Obligations

| Column | Data Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| contract_id | INTEGER | FOREIGN KEY → contracts(id) |
| obligation_name | VARCHAR(255) | NOT NULL |
| description | TEXT | NULL |
| obligation_type | VARCHAR(100) | NULL |
| assigned_to | INTEGER | FOREIGN KEY → users(id) |
| due_date | DATE | NOT NULL |
| priority | VARCHAR(20) | Low / Medium / High / Critical |
| status | VARCHAR(30) | Pending / In Progress / Completed / Overdue |
| completed_at | TIMESTAMP | NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## 5. Renewals

| Column | Data Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| contract_id | INTEGER | FOREIGN KEY → contracts(id) |
| renewal_date | DATE | NOT NULL |
| renewal_status | VARCHAR(50) | Upcoming / In Progress / Renewed / Expired / Cancelled |
| approved_by | INTEGER | FOREIGN KEY → users(id) |
| remarks | TEXT | NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## 6. Compliance

| Column | Data Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| contract_id | INTEGER | FOREIGN KEY → contracts(id) |
| compliance_score | INTEGER | CHECK 0–100 |
| compliance_status | VARCHAR(30) | Compliant / Pending / Delayed / Non-Compliant / High Risk |
| risk_level | VARCHAR(20) | Low / Medium / High / Critical |
| audit_date | DATE | NULL |
| remarks | TEXT | NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## 7. Notifications

| Column | Data Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| user_id | INTEGER | FOREIGN KEY → users(id) |
| contract_id | INTEGER | FOREIGN KEY → contracts(id), NULL allowed |
| title | VARCHAR(255) | NOT NULL |
| message | TEXT | NOT NULL |
| notification_type | VARCHAR(50) | Renewal / Obligation / Compliance / Approval / Email / SMS / In-App |
| is_read | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## 8. Reports

| Column | Data Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| report_name | VARCHAR(255) | NOT NULL |
| report_type | VARCHAR(100) | Contract / Compliance / Renewal / Obligation / Audit |
| generated_by | INTEGER | FOREIGN KEY → users(id) |
| file_url | TEXT | NULL |
| generated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## 9. Audit Logs

| Column | Data Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| user_id | INTEGER | FOREIGN KEY → users(id) |
| action | VARCHAR(255) | NOT NULL |
| module | VARCHAR(100) | Authentication / Contracts / Obligations / Compliance / Reports |
| target_id | VARCHAR(100) | NULL |
| ip_address | VARCHAR(50) | NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## 10. Activities

| Column | Data Type | Constraints |
|---|---|---|
| id | SERIAL | PRIMARY KEY |
| user_id | INTEGER | FOREIGN KEY → users(id) |
| activity | TEXT | NOT NULL |
| module | VARCHAR(100) | NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

---

## Database Relationships

```text
Users (1)
│
├──< Contracts
├──< Contract Versions
├──< Obligations
├──< Renewals
├──< Notifications
├──< Reports
├──< Audit Logs
└──< Activities

Contracts (1)
│
├──< Contract Versions
├──< Obligations
├──< Renewals
├──< Compliance
└──< Notifications
```

---

## User Roles

- Administrator
- Legal Manager
- Compliance Officer
- Contract Manager
- Department Head
- Employee

---

## Main Database Tables

- users
- contracts
- contract_versions
- obligations
- renewals
- compliance
- notifications
- reports
- audit_logs
- activities
