import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart2,
  Briefcase,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import "../styles/Auth.css";

const ROLES = [
  "Administrator",
  "Legal Manager",
  "Compliance Officer",
  "Contract Manager",
  "Department Head",
  "Employee",
];

const FEATURES = [
  {
    icon: <Sparkles size={18} />,
    title: "AI Contract Analysis",
    description: "AI-powered clause detection",
    className: "feature-purple",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Compliance Monitoring",
    description: "Real-time obligation tracking",
    className: "feature-green",
  },
  {
    icon: <Zap size={18} />,
    title: "Automated Approvals",
    description: "Workflow automation engine",
    className: "feature-yellow",
  },
  {
    icon: <Lock size={18} />,
    title: "Enterprise Security",
    description: "Secure role-based access",
    className: "feature-blue",
  },
  {
    icon: <Users size={18} />,
    title: "Team Collaboration",
    description: "Department-based workflows",
    className: "feature-teal",
  },
  {
    icon: <BarChart2 size={18} />,
    title: "Risk Intelligence",
    description: "Predictive risk scoring",
    className: "feature-red",
  },
];

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Administrator");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        setMessage(data.detail || "Login failed. Please try again.");
        setMessageType("error");
        return;
      }

      if (data.role && data.role !== role) {
        setMessage(
          `This account belongs to the ${data.role} role. Please select the correct role.`
        );
        setMessageType("error");
        return;
      }

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("email");

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("email");

      const storage = remember ? localStorage : sessionStorage;

      storage.setItem("token", data.access_token);
      storage.setItem("role", data.role || role);
      storage.setItem("name", data.name || "ContractIQ User");
      storage.setItem("email", email.trim());

      setMessage("Login successful. Redirecting...");
      setMessageType("success");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        "Unable to connect to the server. Please start the backend and try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="premium-login-page">
      <section className="premium-login-left">
        <div className="login-background-pattern" />
        <div className="login-background-glow" />

        <header className="premium-brand">
          <div className="premium-brand-icon">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h1>ContractIQ</h1>
            <p>AI-powered contract platform</p>
          </div>
        </header>

        <div className="premium-left-content">
          <div className="premium-feature-grid">
            {FEATURES.map((feature) => (
              <article
                className={`premium-feature-card ${feature.className}`}
                key={feature.title}
              >
                <div className="premium-feature-icon">
                  {feature.icon}
                </div>

                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>

          <section className="compliance-card">
            <div className="compliance-header">
              <div className="compliance-live">
                <span className="live-dot" />
                <span>Live Compliance Score</span>
              </div>

              <div className="ai-monitored-badge">
                <Sparkles size={11} />
                <span>AI Monitored</span>
              </div>
            </div>

            <div className="compliance-value-row">
              <strong>84%</strong>

              <span className="compliance-trend">
                <TrendingUp size={15} />
                +2% this month
              </span>
            </div>

            <div className="compliance-progress">
              <div className="compliance-progress-value" />
            </div>

            <div className="compliance-details">
              <span>61 of 72 obligations met</span>
              <span>Updated 5 min ago</span>
            </div>
          </section>
        </div>

        <footer className="premium-left-footer">
          <blockquote>
            “Strong compliance builds stronger organizations.”
          </blockquote>

          <p>
            Manage contracts securely, automate approvals, monitor
            compliance, and reduce organizational risks using AI-powered
            workflows.
          </p>
        </footer>
      </section>

      <section className="premium-login-right">
        <div className="premium-login-wrapper">
          <div className="premium-login-card">
            <div className="premium-mobile-brand">
              <div className="premium-brand-icon">
                <ShieldCheck size={19} />
              </div>

              <span>ContractIQ</span>
            </div>

            <header className="premium-form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your secure enterprise workspace</p>
            </header>

            <form
              onSubmit={handleLogin}
              className="premium-login-form"
            >
              <div className="premium-field">
                <label htmlFor="login-email">
                  Email Address
                </label>

                <div className="premium-input-wrapper">
                  <Mail
                    size={15}
                    className="premium-input-icon"
                  />

                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@company.com"
                    autoComplete="email"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="premium-field">
                <label htmlFor="login-password">
                  Password
                </label>

                <div className="premium-input-wrapper">
                  <Lock
                    size={15}
                    className="premium-input-icon"
                  />

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((current) => !current)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="premium-field">
                <label htmlFor="login-role">
                  Role
                </label>

                <div className="premium-input-wrapper premium-select-wrapper">
                  <Briefcase
                    size={15}
                    className="premium-input-icon"
                  />

                  <select
                    id="login-role"
                    value={role}
                    onChange={(event) =>
                      setRole(event.target.value)
                    }
                    disabled={loading}
                  >
                    {ROLES.map((roleName) => (
                      <option
                        value={roleName}
                        key={roleName}
                      >
                        {roleName}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={15}
                    className="premium-select-arrow"
                  />
                </div>
              </div>

              <div className="premium-login-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) =>
                      setRemember(event.target.checked)
                    }
                    disabled={loading}
                  />

                  <span>Remember me</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="forgot-password-link"
                >
                  Forgot Password?
                </Link>
              </div>

              {message && (
                <div
                  className={`auth-message ${
                    messageType === "success"
                      ? "auth-message-success"
                      : "auth-message-error"
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="premium-sign-in-button"
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In to ContractIQ"}
              </button>

              <div className="premium-divider">
                <span>or</span>
              </div>

              <Link
                to="/signup"
                className="premium-create-account-button"
              >
                Create New Account
              </Link>
            </form>
          </div>

          <footer className="premium-form-footer">
            <button type="button">Privacy Policy</button>
            <span>•</span>
            <button type="button">Terms of Service</button>
            <span>•</span>
            <button type="button">Help Center</button>
          </footer>
        </div>
      </section>
    </main>
  );
}

export default Login;