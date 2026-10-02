import React from 'react';
import Logo from '../components/Logo';
import { ArrowRight, Sparkles, Shield, CheckCircle2, TrendingUp, HelpCircle, Target, Wallet, GraduationCap } from 'lucide-react';

export default function LandingPage({ onStartFree, onTryDemo, onLogin }) {
  return (
    <div className="public-landing-page animate-fade-in">
      {/* Top Navbar */}
      <nav className="landing-navbar">
        <Logo size="medium" />
        <div className="landing-nav-actions">
          <button type="button" className="btn-secondary btn-sm" onClick={onLogin}>
            Log In
          </button>
          <button type="button" className="btn-primary btn-sm" onClick={onStartFree}>
            Start for Free
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="landing-hero-section">
        <div className="landing-hero-badge">
          <Sparkles size={14} className="text-teal" />
          <span>The Financial Co-Pilot for College Students</span>
        </div>

        <h1 className="landing-main-heading">
          Know your money.<br />
          <span className="text-teal">Before it’s gone.</span>
        </h1>

        <p className="landing-main-sub">
          MoneyLeft helps students understand their spending, plan upcoming expenses, and know exactly how much they can safely spend every single day.
        </p>

        <div className="landing-hero-ctas">
          <button type="button" className="btn-primary btn-lg" onClick={onStartFree}>
            <span>Start for Free</span>
            <ArrowRight size={18} />
          </button>

          <button type="button" className="btn-secondary btn-lg demo-hero-btn" onClick={onTryDemo}>
            <span>⚡ Try Demo</span>
          </button>
        </div>

        <div className="landing-trust-row">
          <span>🔒 Private & User-Isolated</span>
          <span>•</span>
          <span>⚡ Built for ₹ INR & UPI</span>
          <span>•</span>
          <span>🎓 Campus Budget Ready</span>
        </div>
      </section>

      {/* INTERACTIVE FEATURE SHOWCASES */}
      <div className="landing-features-grid">
        {/* Feature 1: Safe to Spend Today */}
        <div className="landing-feature-card hero-highlight">
          <div className="feature-card-header">
            <span className="feature-icon-badge">⚡</span>
            <div>
              <span className="feature-eyebrow">SIGNATURE CO-PILOT</span>
              <h3 className="feature-title">How much can you safely spend?</h3>
            </div>
          </div>
          <p className="feature-desc">
            Never stress about running out of money before your next allowance. MoneyLeft calculates your daily spending allowance in real time.
          </p>

          <div className="feature-mock-display">
            <span className="mock-label">SAFE TO SPEND TODAY</span>
            <div className="mock-amount">₹353 <span className="mock-unit">/ day</span></div>
            <div className="mock-bar-wrap">
              <div className="mock-bar-fill" style={{ width: '65%' }} />
            </div>
            <span className="mock-sub">Based on ₹7,420 balance & 21 days remaining</span>
          </div>
        </div>

        {/* Feature 2: Where did your money go? */}
        <div className="landing-feature-card">
          <div className="feature-card-header">
            <span className="feature-icon-badge">📊</span>
            <div>
              <span className="feature-eyebrow">DYNAMIC VISUALIZATION</span>
              <h3 className="feature-title">Where did your money go?</h3>
            </div>
          </div>
          <p className="feature-desc">
            Clean category envelopes that show how much you’re spending on canteen food, hostel rent, and weekend delivery.
          </p>

          <div className="feature-categories-preview">
            <div className="preview-cat-row">
              <span>🍔 Food (Canteen & Zomato)</span>
              <strong>₹3,180 (38%)</strong>
            </div>
            <div className="preview-cat-row">
              <span>🛍️ Shopping (Books & Tech)</span>
              <strong>₹1,850 (22%)</strong>
            </div>
            <div className="preview-cat-row">
              <span>🚕 Transport (Autos & Metro)</span>
              <strong>₹1,420 (17%)</strong>
            </div>
          </div>
        </div>

        {/* Feature 3: Can I Afford This? */}
        <div className="landing-feature-card">
          <div className="feature-card-header">
            <span className="feature-icon-badge">🤔</span>
            <div>
              <span className="feature-eyebrow">BEFORE YOU BUY</span>
              <h3 className="feature-title">Can I afford this?</h3>
            </div>
          </div>
          <p className="feature-desc">
            Thinking of buying wireless headphones or concert tickets? Test the purchase first to see what happens to your daily spending allowance.
          </p>

          <div className="feature-afford-preview">
            <div className="afford-pill-row">
              <div className="afford-chip before">
                <span>Before</span>
                <strong>₹353 / day</strong>
              </div>
              <div className="afford-arrow">→</div>
              <div className="afford-chip after">
                <span>After ₹1,500</span>
                <strong>₹139 / day</strong>
              </div>
            </div>
            <div className="afford-badge-caution">
              <span>🟡 You Can Afford It — With Caution</span>
            </div>
          </div>
        </div>

        {/* Feature 4: Track Your Goals */}
        <div className="landing-feature-card">
          <div className="feature-card-header">
            <span className="feature-icon-badge">🏍️</span>
            <div>
              <span className="feature-eyebrow">FUTURE TARGETS</span>
              <h3 className="feature-title">Track your savings goals</h3>
            </div>
          </div>
          <p className="feature-desc">
            Save for a new bike, semester trip, or laptop. MoneyLeft carves out savings first so you make steady progress every month.
          </p>

          <div className="feature-goal-preview">
            <div className="goal-preview-top">
              <strong>🏍️ New Bike Goal</strong>
              <span className="text-teal font-bold">18.75%</span>
            </div>
            <div className="mock-bar-wrap">
              <div className="mock-bar-fill" style={{ width: '18.75%' }} />
            </div>
            <div className="goal-preview-stats">
              <span>Saved: ₹15,000</span>
              <span>Target: ₹80,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* BUILT FOR STUDENTS SECTION */}
      <section className="built-for-students-section">
        <div className="section-center-badge">
          <GraduationCap size={16} className="text-teal" />
          <span>Made for Indian College Students</span>
        </div>
        <h2 className="section-h2">Designed for the realities of student life</h2>

        <div className="student-pillars-grid">
          <div className="pillar-card">
            <span className="pillar-icon">💰</span>
            <h4>Pocket Money</h4>
            <p>Manage monthly, weekly, or irregular parental allowances without overspending in week one.</p>
          </div>

          <div className="pillar-card">
            <span className="pillar-icon">🏠</span>
            <h4>Hostel & Mess</h4>
            <p>Protect rent, laundry, and semester mess advances before calculating what you can safely spend.</p>
          </div>

          <div className="pillar-card">
            <span className="pillar-icon">🍔</span>
            <h4>Canteen & Delivery</h4>
            <p>Keep track of midnight Swiggy orders and daily tapri chai before they quietly drain your budget.</p>
          </div>

          <div className="pillar-card">
            <span className="pillar-icon">🎓</span>
            <h4>College & Xerox</h4>
            <p>Plan exam fees, textbook xerox, and lab manuals alongside everyday transport expenses.</p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="landing-cta-bottom">
        <h2>Start managing your money smarter.</h2>
        <p>No credit cards. No complex financial jargon. Just clear numbers.</p>
        <div className="bottom-cta-buttons">
          <button type="button" className="btn-primary btn-lg" onClick={onStartFree}>
            <span>Create Free Account</span>
            <ArrowRight size={18} />
          </button>
          <button type="button" className="btn-secondary btn-lg" onClick={onTryDemo}>
            <span>⚡ Open Sandbox Demo</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <Logo size="small" />
          <span>MoneyLeft © 2026 • Financial Co-Pilot for College Students</span>
        </div>
      </footer>
    </div>
  );
}
