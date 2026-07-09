import { useState } from "react";
import "./Help.css";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import { SearchIcon, ChevDownIcon, SendIcon } from "../components/Icons";

const CATEGORIES = [
  { title: "Getting Started", sub: "Initial setup and ingesting contract PDFs" },
  { title: "Obligation Mapping", sub: "Defining SLAs, compliance parameters, milestones" },
  { title: "Audit & Reporting Logs", sub: "Exporting CSV/PDF history for executive review" },
  { title: "Integrations & Webhooks", sub: "Connecting repositories to external trackers" },
];
const FAQS = [
  { q: "How does ContractIQ identify a missed conditional deadline?", a: 'ContractIQ parses clause language for conditional triggers (e.g. "within 30 days of notice") and cross-references them against linked event dates, flagging any obligation that passes its computed due date without a logged completion.' },
  { q: "Can I assign backup owners to critical obligations?", a: 'Yes. Open any obligation in the Tracker, select "Assign Backup Owner," and choose a teammate. Backup owners receive the same alert cadence as the primary owner.' },
  { q: "How are renewal notice periods calculated?", a: "ContractIQ reads the auto-renewal clause and counts backward from the term end date using the stated notice window, then surfaces the result on the Renewal Dashboard." },
  { q: "Can I export obligation history for an audit?", a: "From Audit Logs, choose a date range and export to CSV or PDF. Exports include owner, status changes, and timestamps for every obligation in scope." },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={() => setOpen((o) => !o)}>
        {item.q}
        <ChevDownIcon className={open ? "faq-chev open" : "faq-chev"} />
      </button>
      {open && <div className="faq-a"><div className="faq-a-inner">{item.a}</div></div>}
    </div>
  );
}

export default function Help() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <div className="help-hero">
        <h2>How can we help you today?</h2>
        <div className="search-wrap">
          <span className="search-ico"><SearchIcon /></span>
          <input placeholder="Search documentation, obligation templates, and compliance guides..." />
        </div>
      </div>
      <div className="cat-grid">
        {CATEGORIES.map((c) => (
          <div className="card cat-card" key={c.title}>
            <strong>{c.title}</strong>
            <span>{c.sub}</span>
          </div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card" style={{ padding: 20 }}>
          <div className="section-title">Frequently Asked Questions</div>
          {FAQS.map((f, i) => <FaqItem item={f} key={i} />)}
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div className="section-title">Submit a Support Ticket</div>
          <FormInput label="Subject" placeholder="Briefly describe the issue" />
          <FormSelect label="Issue Severity" options={["Low", "Medium", "Critical Compliance Breach"]} />
          <div className="field">
            <label>Details</label>
            <textarea placeholder="Describe what happened, and any obligation or contract IDs involved..." />
          </div>
          <button
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: 7 }}
            onClick={() => setSubmitted(true)}
          >
            <SendIcon size={14} /> Submit Ticket
          </button>
          {submitted && <span className="muted" style={{ marginLeft: 10 }}>Submitted!</span>}
        </div>
      </div>
    </div>
  );
}
