import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import SignupForm from '../features/authentication/components/SignupForm';
import { signupService } from '../features/authentication/services/signup';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSignupSubmit = async (details) => {
    setError('');
    setLoading(true);
    try {
      await signupService(details);
      // Only navigate if registration is fully successful
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Page Header */}
      <header style={{ padding: '1rem 2rem', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
          <ShieldCheck size={28} />
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-text)' }}>Contract<span style={{ color: 'var(--color-primary)' }}>IQ</span></span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem' }}>
          <Link to="#" className="text-muted" style={{ textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-primary)'} onMouseOut={e => e.target.style.color='var(--color-text-muted)'}>Help Center</Link>
          <Link to="#" className="text-muted" style={{ textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-primary)'} onMouseOut={e => e.target.style.color='var(--color-text-muted)'}>Support</Link>
        </div>
      </header>

      {/* Auth Container */}
      <div className="auth-container fade-in" style={{ flex: 1, minHeight: 'auto', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="auth-card-wide" style={{ padding: '1.5rem 2rem', boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)' }}>
          <div className="auth-header" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Join Contract<span>IQ</span></h1>
            <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>Request access to the platform</p>
          </div>

          {error && (
            <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.85rem', textAlign: 'center', border: '1px solid #f87171' }}>
              {error}
            </div>
          )}

          <SignupForm onSubmit={handleSignupSubmit} disabled={loading} />

          <div className="auth-footer" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem' }}>
            <p style={{ margin: 0 }}>Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link></p>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer style={{ padding: '1.5rem 2rem', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} ContractIQ. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="#" className="text-muted" style={{ textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-primary)'} onMouseOut={e => e.target.style.color='var(--color-text-muted)'}>Privacy Policy</Link>
            <Link to="#" className="text-muted" style={{ textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-primary)'} onMouseOut={e => e.target.style.color='var(--color-text-muted)'}>Terms of Service</Link>
            <Link to="#" className="text-muted" style={{ textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--color-primary)'} onMouseOut={e => e.target.style.color='var(--color-text-muted)'}>Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
