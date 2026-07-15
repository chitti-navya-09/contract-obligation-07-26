import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Zap, Lock, ArrowRight, Sparkles } from 'lucide-react';
import './Auth.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to register');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-layout-split">
      {/* Left Panel - Branding */}
      <div className="auth-panel-left">
        <div className="auth-brand-logo">
          <div className="auth-brand-icon-wrapper">
            <Sparkles className="auth-brand-icon" size={20} />
          </div>
          <span className="auth-brand-text">ContractIQ</span>
        </div>
        
        <div className="auth-hero-content">
          <h1 className="auth-hero-title">
            The intelligent way to manage every contract, obligation & renewal.
          </h1>
          <p className="auth-hero-subtitle">
            AI-assisted contract intelligence for enterprise legal, procurement and compliance teams.
          </p>
          
          <ul className="auth-features-list">
            <li>
              <ShieldCheck size={18} />
              <span>SOC 2 • ISO 27001 • HIPAA ready</span>
            </li>
            <li>
              <Zap size={18} />
              <span>Automate 90% of obligation tracking</span>
            </li>
            <li>
              <Lock size={18} />
              <span>End-to-end encryption at rest & in transit</span>
            </li>
          </ul>
        </div>
        
        <div className="auth-footer-text">
          © 2028 ContractIQ, Inc.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="auth-panel-right">
        <div className="auth-form-container">
          <div className="auth-header-right">
            <h2>Create an account</h2>
            <p>Join your organization workspace.</p>
          </div>
          
          {error && <div className="auth-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form-clean">
            <div className="auth-input-group">
              <label htmlFor="email">Work email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="elena@contractiq.io"
              />
            </div>
            
            <div className="auth-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a password"
              />
            </div>
            
            <button type="submit" className="auth-btn-primary">
              Create account <ArrowRight size={16} className="btn-icon-right" />
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="auth-social-buttons">
            <button className="auth-btn-outline">Google</button>
            <button className="auth-btn-outline">SSO / SAML</button>
          </div>

          <div className="auth-bottom-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
