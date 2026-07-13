import { Link } from "react-router-dom";
import SignupForm from "../features/authentication/components/SignupForm";
import "./Auth.css";

export default function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div style={{ width: 36, height: 36, background: "#0F172A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>CI</div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>ContractIQ</div>
        </div>
        <h2>Create your account</h2>
        <p className="muted">Set up your workspace in under a minute.</p>
        <SignupForm />
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
