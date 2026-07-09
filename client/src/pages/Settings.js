import { useState } from "react";
import "./Settings.css";
import ButtonGroup from "../components/Buttons/ButtonGroup";
import Checkbox from "../components/Form/Checkbox";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import { PlugIcon, BuildingIcon, BellSmIcon, EditIcon, FileIcon, CheckIcon, DownloadIcon, BriefcaseIcon } from "../components/Icons";

const TABS = [
  { key: "general", label: "General" },
  { key: "notifications", label: "Notifications" },
  { key: "security", label: "Security" },
  { key: "integrations", label: "Integrations" },
  { key: "billing", label: "Billing" },
];

const INTEGRATIONS = [
  { key: "salesforce", name: "Salesforce CRM", desc: "Sync contracts", Icon: BuildingIcon, color: "#3B82F6" },
  { key: "slack", name: "Slack", desc: "Notifications", Icon: BellSmIcon, color: "#8B5CF6" },
  { key: "docusign", name: "DocuSign", desc: "E-signatures", Icon: EditIcon, color: "#10B981" },
  { key: "sharepoint", name: "SharePoint", desc: "Documents", Icon: FileIcon, color: "#F59E0B" },
];

const INVOICES = [
  { id: "INV-2026-06", date: "Jun 1, 2026", amount: "$4,800.00", status: "Paid" },
  { id: "INV-2026-05", date: "May 1, 2026", amount: "$4,800.00", status: "Paid" },
  { id: "INV-2026-04", date: "Apr 1, 2026", amount: "$4,320.00", status: "Paid" },
  { id: "INV-2026-03", date: "Mar 1, 2026", amount: "$4,320.00", status: "Paid" },
];

export default function Settings() {
  const [tab, setTab] = useState("general");
  const [toggles, setToggles] = useState({
    emailNotif: true, slackNotif: false, renewalAlerts: true, twoFactor: true, sso: false,
  });
  const [saved, setSaved] = useState(false);
  const [integrations, setIntegrations] = useState({ salesforce: true, slack: false, docusign: true, sharepoint: false });
  const [billingMsg, setBillingMsg] = useState("");

  function toggle(key) {
    setToggles((t) => ({ ...t, [key]: !t[key] }));
  }
  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }
  function connectIntegration(key) {
    setIntegrations((it) => ({ ...it, [key]: true }));
  }
  function flashBilling(msg) {
    setBillingMsg(msg);
    setTimeout(() => setBillingMsg(""), 2200);
  }

  return (
    <div className="page-surface settings-page">
      <h2>Settings</h2>
      <p className="muted">Application settings.</p>

      <ButtonGroup options={TABS} value={tab} onChange={setTab} />

      <div className="settings-panel">
        {tab === "general" && (
          <>
            <FormInput label="Organization Name" defaultValue="Acme Corp" />
            <div className="form-row">
              <FormSelect label="Default Currency" options={["USD", "EUR", "GBP"]} />
              <FormSelect label="Date Format" options={["YYYY-MM-DD", "MM/DD/YYYY"]} />
            </div>
          </>
        )}
        {tab === "notifications" && (
          <>
            <div className="settings-row">
              <div><strong>Email Notifications</strong><span>Receive alerts via email</span></div>
              <Checkbox checked={toggles.emailNotif} onChange={() => toggle("emailNotif")} />
            </div>
            <div className="settings-row">
              <div><strong>Slack Notifications</strong><span>Send alerts to Slack</span></div>
              <Checkbox checked={toggles.slackNotif} onChange={() => toggle("slackNotif")} />
            </div>
            <div className="settings-row">
              <div><strong>Contract Renewal Alerts</strong><span>30/60/90 day alerts</span></div>
              <Checkbox checked={toggles.renewalAlerts} onChange={() => toggle("renewalAlerts")} />
            </div>
          </>
        )}
        {tab === "security" && (
          <>
            <div className="settings-row">
              <div><strong>Two-Factor Authentication</strong><span>Require 2FA for all users</span></div>
              <Checkbox checked={toggles.twoFactor} onChange={() => toggle("twoFactor")} />
            </div>
            <div className="settings-row">
              <div><strong>Single Sign-On (SSO)</strong><span>SAML 2.0 / OIDC</span></div>
              <Checkbox checked={toggles.sso} onChange={() => toggle("sso")} />
            </div>
          </>
        )}

        {tab === "integrations" && (
          <>
            <div className="section-title"><PlugIcon size={16} /> Integrations Settings</div>
            {INTEGRATIONS.map((it) => {
              const connected = integrations[it.key];
              return (
                <div className="integration-row" key={it.key}>
                  <div className="ico" style={{ background: it.color + "22", color: it.color }}>
                    <it.Icon size={18} />
                  </div>
                  <div style={{ flex: 1 }}><strong>{it.name}</strong><span>{it.desc}</span></div>
                  {connected ? (
                    <span className="badge emerald"><CheckIcon size={12} /> Connected</span>
                  ) : (
                    <button className="btn-ghost" onClick={() => connectIntegration(it.key)}>Connect</button>
                  )}
                </div>
              );
            })}
          </>
        )}

        {tab === "billing" && (
          <>
            <div className="section-title"><BriefcaseIcon size={16} /> Plan & Billing</div>

            <div className="billing-plan-card">
              <div className="billing-plan-top">
                <div>
                  <strong style={{ fontSize: 15 }}>Enterprise Plan</strong>
                  <div className="muted" style={{ marginTop: 2 }}>Unlimited contracts \u00b7 Priority support \u00b7 Renews Jan 1, 2027</div>
                </div>
                <span className="badge emerald">Active</span>
              </div>
              <div className="billing-plan-price">$4,800 <span className="muted" style={{ fontWeight: 600 }}>/ month</span></div>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button className="quick-action" onClick={() => flashBilling("Redirecting to plan comparison...")}>Upgrade Plan</button>
                <button className="btn-ghost" onClick={() => flashBilling("Cancellation flow opened.")}>Cancel Plan</button>
              </div>
            </div>

            <div className="billing-usage-grid">
              <div className="billing-usage-card">
                <div className="settings-row" style={{ border: "none", padding: "0 0 8px" }}>
                  <strong>Seats</strong><span>50 / 100</span>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: "50%", background: "#3B82F6" }} /></div>
              </div>
              <div className="billing-usage-card">
                <div className="settings-row" style={{ border: "none", padding: "0 0 8px" }}>
                  <strong>Storage</strong><span>42 GB / 100 GB</span>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: "42%", background: "#10B981" }} /></div>
              </div>
            </div>

            <div className="section-title" style={{ marginTop: 22 }}>Payment Method</div>
            <div className="billing-payment-row">
              <div className="billing-card-chip">VISA</div>
              <div style={{ flex: 1 }}>
                <strong style={{ display: "block", fontSize: 13.5 }}>Visa ending in 4242</strong>
                <span className="muted">Expires 08/2028</span>
              </div>
              <button className="btn-ghost" onClick={() => flashBilling("Payment method update form opened.")}>Update</button>
            </div>

            <div className="section-title" style={{ marginTop: 22 }}>Billing History</div>
            <table className="data-table">
              <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {INVOICES.map((inv) => (
                  <tr key={inv.id}>
                    <td><strong>{inv.id}</strong></td>
                    <td>{inv.date}</td>
                    <td>{inv.amount}</td>
                    <td><span className="badge emerald">{inv.status}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px" }} onClick={() => flashBilling(inv.id + " downloading...")}>
                        <DownloadIcon size={13} /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {billingMsg && <div className="muted" style={{ marginTop: 10 }}>{billingMsg}</div>}
          </>
        )}
        {tab !== "integrations" && (
          <div className="settings-footer">
            {saved && <span className="muted" style={{ marginRight: 12, alignSelf: "center" }}>Saved!</span>}
            <button className="quick-action" onClick={save}>Save Settings</button>
          </div>
        )}
      </div>
    </div>
  );
}
