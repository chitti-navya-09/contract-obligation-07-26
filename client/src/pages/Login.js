
import React from 'react';
import LoginForm from '../features/authentication/components/LoginForm';
import '../assets/auth.css';

export default function Login() {
  return (
    <div className="auth-container">
      <LoginForm />
    </div>
  );
}

