import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import './Auth.css';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, new_password: password }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password. Token may be invalid or expired.');
      }

      const data = await response.json();
      setMessage(data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!token) {
    return (
      <div className="auth-layout-centered">
        <div className="auth-centered-brand">
          <div className="auth-brand-icon-wrapper" style={{ borderRadius: '50%' }}>
            <Sparkles className="auth-brand-icon" style={{ color: '#fff' }} />
          </div>
          <span className="auth-brand-text">ContractIQ</span>
        </div>

        <div className="auth-card-clean">
          <h2>Invalid Request</h2>
          <p>No reset token provided. Please request a new password reset link.</p>
          <Link to="/login" className="auth-back-link">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-layout-centered">
      <div className="auth-centered-brand">
        <div className="auth-brand-icon-wrapper" style={{ borderRadius: '50%' }}>
          <Sparkles className="auth-brand-icon" style={{ color: '#fff' }} />
        </div>
        <span className="auth-brand-text">ContractIQ</span>
      </div>

      <div className="auth-card-clean">
        <h2>Set New Password</h2>
        <p>Please enter your new password below.</p>
        
        {error && <div className="auth-error-message">{error}</div>}
        {message && <div className="auth-success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form-clean">
          <div className="auth-input-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>
          
          <button type="submit" className="auth-btn-primary">
            Reset Password <ArrowRight size={16} className="btn-icon-right" />
          </button>
        </form>
      </div>
    </div>
  );
}
