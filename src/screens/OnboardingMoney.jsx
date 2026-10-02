import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const FREQUENCIES = ['Monthly', 'Weekly', 'Biweekly', 'Irregular'];

export default function OnboardingMoney({ initialIncome = 12000, onNext, onBack }) {
  const [income, setIncome] = useState(initialIncome.toString());
  const [frequency, setFrequency] = useState('Monthly');

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(income);
    if (!isNaN(val) && val > 0) {
      onNext({ income: val, incomeFrequency: frequency });
    }
  };

  return (
    <div className="onboarding-screen">
      <div className="onboarding-container">
        {/* Top Header & Progress */}
        <div className="onboarding-nav-bar">
          <button className="onboarding-back-btn" onClick={onBack}>
            <ArrowLeft size={18} />
          </button>
          <div className="onboarding-progress-track">
            <div className="onboarding-progress-bar" style={{ width: '33%' }} />
          </div>
          <span className="step-counter">1 of 3</span>
        </div>

        <div className="onboarding-content">
          <span className="onboarding-badge">Step 1 — Allowance</span>
          <h2 className="onboarding-title">
            How much money do you usually receive?
          </h2>
          <p className="onboarding-desc">
            Your pocket money, student stipend, freelance work, or family support.
          </p>

          <form onSubmit={handleSubmit} className="onboarding-form">
            {/* Hero input */}
            <div className="onboarding-hero-amount">
              <span className="hero-currency">₹</span>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="12,000"
                className="hero-input"
                autoFocus
                required
                min="500"
              />
            </div>

            {/* Frequency Selector */}
            <div className="frequency-section">
              <label className="frequency-label">How often do you receive it?</label>
              <div className="frequency-grid">
                {FREQUENCIES.map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    className={`frequency-btn ${frequency === freq ? 'active' : ''}`}
                    onClick={() => setFrequency(freq)}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick helper note */}
            <div className="onboarding-tip-card">
              💡 <span>Students receiving monthly allowances usually allocate 20% to savings goals first.</span>
            </div>

            <button
              type="submit"
              className="btn-primary btn-block btn-lg mt-auto"
              disabled={!income || parseFloat(income) <= 0}
            >
              <span>Continue</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
