import React from 'react';
import Logo from '../components/Logo';
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Wallet } from 'lucide-react';

export default function WelcomeLanding({ onGetStarted, onLogin }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-inner">
        {/* Top Logo */}
        <div className="welcome-logo-wrap">
          <Logo size="large" showTagline={false} />
        </div>

        {/* Abstract Minimal Money Visualization Card */}
        <div className="welcome-visual-card">
          <div className="visual-card-glow" />
          <div className="visual-card-content">
            <div className="visual-chip">
              <span className="visual-dot" />
              <span>Financial Co-Pilot for Students</span>
            </div>

            <div className="visual-metric">
              <span className="visual-label">Money Left This Month</span>
              <div className="visual-amount">₹7,420</div>
              <span className="visual-sub">After ₹2,000 saved for Bike Goal</span>
            </div>

            <div className="visual-safe-box">
              <div className="safe-box-left">
                <span className="safe-box-label">Safe to spend today</span>
                <strong className="safe-box-val">₹353 / day</strong>
              </div>
              <div className="safe-badge-pill">
                <span>🟢 On Track</span>
              </div>
            </div>

            <div className="visual-bars-row">
              <div className="v-bar active" style={{ height: '45%' }} />
              <div className="v-bar active" style={{ height: '60%' }} />
              <div className="v-bar active" style={{ height: '35%' }} />
              <div className="v-bar active" style={{ height: '70%' }} />
              <div className="v-bar highlight" style={{ height: '85%' }} />
              <div className="v-bar projected" style={{ height: '50%' }} />
              <div className="v-bar projected" style={{ height: '50%' }} />
            </div>
          </div>
        </div>

        {/* Brand Typography & Tagline */}
        <div className="welcome-text-block">
          <h1 className="welcome-headline">
            Know your money.<br />
            <span className="text-accent">Before it’s gone.</span>
          </h1>

          <p className="welcome-desc">
            Track your spending, understand your habits, and know exactly how much you can safely spend every single day.
          </p>
        </div>

        {/* CTAs */}
        <div className="welcome-actions">
          <button className="btn-primary btn-block btn-lg" onClick={onGetStarted}>
            <span>Get Started</span>
            <ArrowRight size={18} />
          </button>

          <button className="btn-secondary btn-block" onClick={onLogin}>
            I already have an account
          </button>
        </div>

        {/* Trust Badges */}
        <div className="welcome-trust-row">
          <span>🔒 Student-first privacy</span>
          <span>•</span>
          <span>⚡ Built for ₹ INR & UPI</span>
        </div>
      </div>
    </div>
  );
}
