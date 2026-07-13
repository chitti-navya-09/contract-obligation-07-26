import { Link } from "react-router-dom";
import LoginForm from "../features/authentication/components/LoginForm";
import "./Auth.css";

export default function Login() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div style={{ width: 36, height: 36, background: "#0F172A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>CI</div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>ContractIQ</div>
        </div>
        <h2>Welcome back</h2>
        <p className="muted">Sign in to your contract obligation workspace.</p>
        <LoginForm />
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}
