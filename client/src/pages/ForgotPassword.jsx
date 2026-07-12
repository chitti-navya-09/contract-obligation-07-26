import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/theme.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to send email
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {!isSubmitted ? (
          <>
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-subtitle">Enter your email and we'll send you a link to reset your password.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email address</label>
                <input 
                  type="email" 
                  className="premium-input" 
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="premium-button" disabled={isLoading}>
                {isLoading ? 'Sending Email...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(0,217,36,0.1)', color: 'var(--success-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 24px auto' }}>
              <i className="fa-solid fa-paper-plane"></i>
            </div>
            <h1 className="auth-title">Check your email</h1>
            <p className="auth-subtitle">
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and spam folder.
            </p>
          </div>
        )}

        <div className="auth-link" style={{ marginTop: '32px' }}>
          <Link to="/login"><i className="fa-solid fa-arrow-left" style={{ marginRight: '8px' }}></i> Back to login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
