import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import './Auth.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to request password reset');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-layout-centered">
      <div className="auth-centered-brand">
        <div className="auth-brand-icon-wrapper" style={{ borderRadius: '50%' }}>
          <Sparkles className="auth-brand-icon" style={{ color: '#fff' }} />
        </div>
        <span className="auth-brand-text">ContractIQ</span>
      </div>

      <div className="auth-card-clean">
        <h2>Forgot your password?</h2>
        <p>Enter your work email and we'll send you a link to reset it.</p>
        
        {error && <div className="auth-error-message">{error}</div>}
        {message && <div className="auth-success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form-clean">
          <div className="auth-input-group">
            <label htmlFor="email">Work email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@company.com"
            />
          </div>
          
          <button type="submit" className="auth-btn-primary">
            Send reset link <ArrowRight size={16} className="btn-icon-right" />
          </button>
          
          <Link to="/login" className="auth-back-link">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </form>
      </div>
    </div>
  );
}
