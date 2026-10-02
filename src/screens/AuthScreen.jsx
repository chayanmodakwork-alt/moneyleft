import React, { useState } from 'react';
import Logo from '../components/Logo';
import { ArrowRight, Mail, Lock, ArrowLeft } from 'lucide-react';

export default function AuthScreen({ onComplete, onBack }) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('chayan@campus.edu.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <div className="auth-screen">
      <div className="auth-container">
        {/* Back button */}
        <button className="auth-back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="auth-logo">
          <Logo size="medium" />
        </div>

        <div className="auth-header">
          <h2 className="auth-title">
            {isLogin ? 'Welcome back to MoneyLeft' : 'Welcome to MoneyLeft'}
          </h2>
          <p className="auth-subtitle">
            {isLogin
              ? 'Enter your student credentials to continue'
              : 'Create your account to start managing your student money'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">College Email</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="name@college.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input has-icon"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input has-icon"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary btn-block btn-lg mt-4">
            <span>Continue</span>
            <ArrowRight size={18} />
          </button>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="btn-google-auth btn-block"
            onClick={onComplete}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </form>

        <div className="auth-footer-link">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="link-btn"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="link-btn"
                onClick={() => setIsLogin(true)}
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
