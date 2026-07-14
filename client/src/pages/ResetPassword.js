import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  BarChart2,
  CheckCircle,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
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

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailFromUrl = useMemo(
    () => searchParams.get("email") || "",
    [searchParams]
  );

  const [email, setEmail] = useState(emailFromUrl);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleResetPassword = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (!email.trim()) {
      setMessage("Please enter your registered email address.");
      setMessageType("error");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setMessage("Please enter and confirm your new password.");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            new_password: newPassword,
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
          data.detail || "Unable to reset your password."
        );
        setMessageType("error");
        return;
      }

      setResetComplete(true);
      setMessage(
        data.message ||
          "Your password has been reset successfully."
      );
      setMessageType("success");

      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (error) {
      console.error("Reset password error:", error);

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

      {/* RIGHT RESET PASSWORD PANEL */}
      <section className="premium-login-right">
        <div className="premium-login-wrapper">
          <div className="premium-login-card">
            <div className="premium-mobile-brand">
              <div className="premium-brand-icon">
                <ShieldCheck size={19} />
              </div>

              <span>ContractIQ</span>
            </div>

            {!resetComplete ? (
              <>
                <div className="auth-page-icon">
                  <KeyRound size={24} />
                </div>

                <header className="premium-form-header">
                  <h2>Create New Password</h2>
                  <p>
                    Choose a strong password to secure your ContractIQ
                    account.
                  </p>
                </header>

                <form
                  onSubmit={handleResetPassword}
                  className="premium-login-form"
                >
                  <div className="premium-field">
                    <label htmlFor="reset-email">
                      Email Address
                    </label>

                    <div className="premium-input-wrapper">
                      <ShieldCheck
                        size={15}
                        className="premium-input-icon"
                      />

                      <input
                        id="reset-email"
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
                    <label htmlFor="new-password">
                      New Password
                    </label>

                    <div className="premium-input-wrapper">
                      <Lock
                        size={15}
                        className="premium-input-icon"
                      />

                      <input
                        id="new-password"
                        type={
                          showNewPassword ? "text" : "password"
                        }
                        value={newPassword}
                        onChange={(event) =>
                          setNewPassword(event.target.value)
                        }
                        placeholder="Minimum 8 characters"
                        autoComplete="new-password"
                        disabled={loading}
                        required
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowNewPassword(
                            (current) => !current
                          )
                        }
                        aria-label={
                          showNewPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        disabled={loading}
                      >
                        {showNewPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="premium-field">
                    <label htmlFor="confirm-new-password">
                      Confirm New Password
                    </label>

                    <div className="premium-input-wrapper">
                      <Lock
                        size={15}
                        className="premium-input-icon"
                      />

                      <input
                        id="confirm-new-password"
                        type={
                          showConfirmPassword ? "text" : "password"
                        }
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        placeholder="Re-enter new password"
                        autoComplete="new-password"
                        disabled={loading}
                        required
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(
                            (current) => !current
                          )
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        disabled={loading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="password-requirements">
                    <p>Password should contain:</p>
                    <ul>
                      <li>At least 8 characters</li>
                      <li>Uppercase and lowercase letters</li>
                      <li>At least one number or symbol</li>
                    </ul>
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
                      ? "Resetting Password..."
                      : "Reset Password"}
                  </button>
                </form>
              </>
            ) : (
              <div className="forgot-success-content">
                <div className="forgot-success-icon">
                  <CheckCircle size={30} />
                </div>

                <h2>Password Reset Successful</h2>

                <p>
                  Your password has been updated successfully. You will be
                  redirected to the login page.
                </p>

                {message && (
                  <div className="auth-message auth-message-success">
                    {message}
                  </div>
                )}

                <Link
                  to="/login"
                  className="premium-sign-in-button auth-link-button"
                >
                  Continue to Sign In
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

export default ResetPassword;