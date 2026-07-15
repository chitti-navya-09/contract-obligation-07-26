import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Zap, Lock, ArrowRight, Sparkles } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      const data = await response.json();
      login(data.access_token);
      navigate('/');
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
            <h2>Welcome back</h2>
            <p>Sign in to your organization workspace.</p>
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
              <div className="auth-label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="auth-link-small">Forgot?</Link>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            
            <button type="submit" className="auth-btn-primary">
              Sign in <ArrowRight size={16} className="btn-icon-right" />
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
            Don't have an account? <Link to="/signup">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
