import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart2,
  Briefcase,
  Building2,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
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

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    department: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Employee",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const {
      name,
      organization,
      department,
      phone,
      email,
      password,
      confirmPassword,
      role,
    } = formData;

    if (
      !name.trim() ||
      !organization.trim() ||
      !department.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      setMessage("Please complete all required fields.");
      setMessageType("error");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Password and confirm password do not match.");
      setMessageType("error");
      return;
    }

    if (!acceptedTerms) {
      setMessage(
        "Please accept the Terms of Service and Privacy Policy."
      );
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            organization: organization.trim(),
            department: department.trim(),
            phone: phone.trim(),
            email: email.trim(),
            password,
            role,
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
          data.detail ||
            "Unable to create the account. Please try again."
        );
        setMessageType("error");
        return;
      }

      setMessage(
        "Account created successfully. Redirecting to login..."
      );
      setMessageType("success");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        "Unable to connect to the server. Please make sure the backend is running."
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

      {/* RIGHT REGISTRATION PANEL */}
      <section className="premium-login-right">
        <div className="premium-login-wrapper signup-wrapper">
          <div className="premium-login-card signup-card">
            <div className="premium-mobile-brand">
              <div className="premium-brand-icon">
                <ShieldCheck size={19} />
              </div>

              <span>ContractIQ</span>
            </div>

            <header className="premium-form-header">
              <h2>Create Account</h2>
              <p>
                Join your organization&apos;s secure ContractIQ workspace
              </p>
            </header>

            <form
              onSubmit={handleSignup}
              className="premium-login-form"
            >
              <div className="signup-grid">
                <div className="premium-field">
                  <label htmlFor="signup-name">Full Name</label>

                  <div className="premium-input-wrapper">
                    <User
                      size={15}
                      className="premium-input-icon"
                    />

                    <input
                      id="signup-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="premium-field">
                  <label htmlFor="signup-organization">
                    Organization
                  </label>

                  <div className="premium-input-wrapper">
                    <Building2
                      size={15}
                      className="premium-input-icon"
                    />

                    <input
                      id="signup-organization"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Organization name"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="premium-field">
                  <label htmlFor="signup-department">
                    Department
                  </label>

                  <div className="premium-input-wrapper">
                    <Briefcase
                      size={15}
                      className="premium-input-icon"
                    />

                    <input
                      id="signup-department"
                      name="department"
                      type="text"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="Legal / IT / Finance"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="premium-field">
                  <label htmlFor="signup-phone">
                    Phone Number
                  </label>

                  <div className="premium-input-wrapper">
                    <Phone
                      size={15}
                      className="premium-input-icon"
                    />

                    <input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="premium-field signup-full-width">
                  <label htmlFor="signup-email">
                    Email Address
                  </label>

                  <div className="premium-input-wrapper">
                    <Mail
                      size={15}
                      className="premium-input-icon"
                    />

                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      autoComplete="email"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <div className="premium-field">
                  <label htmlFor="signup-password">
                    Password
                  </label>

                  <div className="premium-input-wrapper">
                    <Lock
                      size={15}
                      className="premium-input-icon"
                    />

                    <input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
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
                  <label htmlFor="signup-confirm-password">
                    Confirm Password
                  </label>

                  <div className="premium-input-wrapper">
                    <Lock
                      size={15}
                      className="premium-input-icon"
                    />

                    <input
                      id="signup-confirm-password"
                      name="confirmPassword"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
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
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="premium-field signup-full-width">
                  <label htmlFor="signup-role">
                    Select Role
                  </label>

                  <div className="premium-input-wrapper">
                    <Briefcase
                      size={15}
                      className="premium-input-icon"
                    />

                    <select
                      id="signup-role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
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
              </div>

              <label className="signup-terms">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) =>
                    setAcceptedTerms(event.target.checked)
                  }
                  disabled={loading}
                />

                <span>
                  I accept the{" "}
                  <button type="button">Terms of Service</button> and{" "}
                  <button type="button">Privacy Policy</button>.
                </span>
              </label>

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
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

              <p className="signup-login-text">
                Already have an account?{" "}
                <Link to="/login">Sign In</Link>
              </p>
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

export default Signup;