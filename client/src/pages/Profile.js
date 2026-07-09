import { useState, useRef } from "react";
import "./Profile.css";
import FormInput from "../components/Form/FormInput";
import Checkbox from "../components/Form/Checkbox";
import { UserIcon, LockIcon, ShieldIcon, BarIcon, CheckIcon, EditIcon } from "../components/Icons";

function MatrixItem({ title, sub }) {
  return (
    <div className="matrix-item">
      <div className="ico"><CheckIcon size={16} /></div>
      <div><strong>{title}</strong><span>{sub}</span></div>
    </div>
  );
}

export default function Profile() {
  const [mfa, setMfa] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const photoInputRef = useRef(null);
  const coverInputRef = useRef(null);

  function readFile(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div className="page-title">My Profile</div>
      <div className="page-sub">Manage your personal information, obligation ownership, and account security.</div>

      <div className="card profile-banner">
        <div
          className="profile-banner-cover"
          style={coverPhoto ? { backgroundImage: "url(" + coverPhoto + ")", backgroundSize: "cover", backgroundPosition: "center" } : {}}
        >
          <button type="button" className="cover-edit-btn" onClick={() => coverInputRef.current && coverInputRef.current.click()}>
            <EditIcon /> Change cover
          </button>
        </div>
        <div className="profile-header">
          <div className="profile-avatar">
            {userPhoto ? <img src={userPhoto} alt="Profile" /> : "R"}
            <button type="button" className="edit-tag" onClick={() => photoInputRef.current && photoInputRef.current.click()}>
              <EditIcon /> Edit Photo
            </button>
          </div>
          <div>
            <h2>Rishwanth</h2>
            <div className="role-line">rishwanth@contractiq.com</div>
            <div style={{ display: "flex", gap: 8, marginTop: 9 }}>
              <span className="badge info">Administrator</span>
              <span className="badge emerald">Legal Operations</span>
            </div>
          </div>
        </div>
      </div>

      <input
        ref={photoInputRef} type="file" accept="image/*" style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files[0]; if (f) readFile(f, setUserPhoto); }}
      />
      <input
        ref={coverInputRef} type="file" accept="image/*" style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files[0]; if (f) readFile(f, setCoverPhoto); }}
      />

      <div className="grid-2">
        <div>
          <div className="card" style={{ padding: 20, marginBottom: 20 }}>
            <div className="section-title"><UserIcon size={16} /> Personal Information</div>
            <div className="field-row">
              <FormInput label="First Name" defaultValue="Rishwanth" />
              <FormInput label="Last Name" defaultValue="S V" />
            </div>
            <div className="field-row">
              <FormInput label="Corporate Email" defaultValue="rishwanth@contractiq.com" />
              <FormInput label="Phone Number" defaultValue="+91 98765 43210" />
            </div>
            <div className="field-row">
              <FormInput label="Job Title" defaultValue="Compliance Administrator" />
              <FormInput label="Department" defaultValue="Legal Operations" />
            </div>
            <button className="btn btn-primary">Save Changes</button>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div className="section-title"><LockIcon size={16} /> Security & Authorization</div>
            <div className="field-row">
              <FormInput label="Current Password" type="password" defaultValue="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" />
              <FormInput label="New Password" type="password" placeholder="Enter new password" />
            </div>
            <div className="row-toggle">
              <div><strong>Multi-Factor Authentication</strong><span>Require a verification code at every sign-in</span></div>
              <Checkbox checked={mfa} onChange={() => setMfa((v) => !v)} />
            </div>
            <button className="btn btn-ghost" style={{ marginTop: 14 }}>Update Password</button>
          </div>
        </div>
        <div>
          <div className="card" style={{ padding: 20, marginBottom: 20 }}>
            <div className="section-title"><ShieldIcon size={16} /> Obligation Role & Signing Authority</div>
            <MatrixItem title="Primary Obligation Owner" sub="24 contracts assigned" />
            <MatrixItem title="Legal Signatory Approval Cleared" sub="Tier 1 & Tier 2 agreements" />
            <MatrixItem title="Compliance Reviewer \u2014 Tier 2" sub="Cross-functional review rights" />
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div className="section-title"><BarIcon size={16} /> Ownership Summary</div>
            <div className="stat-row"><span>Contracts Owned</span><strong>24</strong></div>
            <div className="stat-row"><span>Obligations Tracked</span><strong>156</strong></div>
            <div className="stat-row"><span>Due This Month</span><strong>17</strong></div>
            <div className="stat-row"><span>Overdue</span><strong style={{ color: "var(--danger)" }}>3</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
