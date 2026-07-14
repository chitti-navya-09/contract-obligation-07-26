import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart2,
  CheckCircle,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import "../styles/Auth.css";

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

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (!email.trim()) {
      setMessage("Please enter your registered email address.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
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
        setMessage(
          data.detail || "Unable to verify this email address."
        );
        setMessageType("error");
        return;
      }

      setSent(true);
      setMessage(
        data.message ||
          "Email verified. You can now reset your password."
      );
      setMessageType("success");
    } catch (error) {
      console.error("Forgot password error:", error);

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
      {/* LEFT COMMON PANEL */}
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

      {/* RIGHT FORGOT PASSWORD PANEL */}
      <section className="premium-login-right">
        <div className="premium-login-wrapper">
          <div className="premium-login-card">
            <div className="premium-mobile-brand">
              <div className="premium-brand-icon">
                <ShieldCheck size={19} />
              </div>

              <span>ContractIQ</span>
            </div>

            {!sent ? (
              <>
                <div className="auth-page-icon">
                  <Mail size={24} />
                </div>

                <header className="premium-form-header">
                  <h2>Forgot Password?</h2>
                  <p>
                    Enter your registered email address to continue with
                    password reset.
                  </p>
                </header>

                <form
                  onSubmit={handleForgotPassword}
                  className="premium-login-form"
                >
                  <div className="premium-field">
                    <label htmlFor="forgot-email">
                      Email Address
                    </label>

                    <div className="premium-input-wrapper">
                      <Mail
                        size={15}
                        className="premium-input-icon"
                      />

                      <input
                        id="forgot-email"
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
                      ? "Verifying Email..."
                      : "Verify Email Address"}
                  </button>
                </form>
              </>
            ) : (
              <div className="forgot-success-content">
                <div className="forgot-success-icon">
                  <CheckCircle size={30} />
                </div>

                <h2>Email Verified</h2>

                <p>
                  Your account has been verified successfully. Continue to
                  create a new password.
                </p>

                {message && (
                  <div className="auth-message auth-message-success">
                    {message}
                  </div>
                )}

                <Link
                  to={`/reset-password?email=${encodeURIComponent(
                    email.trim()
                  )}`}
                  className="premium-sign-in-button auth-link-button"
                >
                  Continue to Reset Password
                </Link>
              </div>
            )}

            <Link to="/login" className="back-to-login-link">
              <ArrowLeft size={14} />
              Back to Sign In
            </Link>
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

export default ForgotPassword;