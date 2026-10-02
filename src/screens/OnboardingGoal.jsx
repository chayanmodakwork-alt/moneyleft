import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const GOAL_OPTIONS = [
  { id: 'Bike', name: 'Bike', icon: '🏍️', defaultTarget: 80000 },
  { id: 'Laptop', name: 'Laptop', icon: '💻', defaultTarget: 45000 },
  { id: 'Phone', name: 'Phone', icon: '📱', defaultTarget: 30000 },
  { id: 'Trip', name: 'Trip', icon: '✈️', defaultTarget: 20000 },
  { id: 'Emergency', name: 'Emergency Fund', icon: '🛟', defaultTarget: 10000 },
  { id: 'Custom', name: 'Custom Goal', icon: '🎯', defaultTarget: 25000 },
];

export default function OnboardingGoal({ onComplete, onBack }) {
  const [selectedGoal, setSelectedGoal] = useState('Bike');
  const [targetAmount, setTargetAmount] = useState('80000');

  const handleSelectGoal = (goal) => {
    setSelectedGoal(goal.id);
    setTargetAmount(goal.defaultTarget.toString());
  };

  const handleCreatePlan = (e) => {
    e.preventDefault();
    const val = parseFloat(targetAmount);
    if (isNaN(val) || val <= 0) return;

    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0D9488', '#14B8A6', '#10B981'],
      });
    } catch {
      // Fallback
    }

    const matched = GOAL_OPTIONS.find((g) => g.id === selectedGoal);

    onComplete({
      goalName: matched ? matched.name : 'Personal Goal',
      goalIcon: matched ? matched.icon : '🎯',
      target: val,
    });
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
            <div className="onboarding-progress-bar" style={{ width: '100%' }} />
          </div>
          <span className="step-counter">3 of 3</span>
        </div>

        <div className="onboarding-content">
          <span className="onboarding-badge">Step 3 — Purpose</span>
          <h2 className="onboarding-title">What are you saving for?</h2>
          <p className="onboarding-desc">
            Having an aspirational target keeps you from spending all your pocket money before the month ends.
          </p>

          {/* Goal selection cards */}
          <div className="goal-options-grid">
            {GOAL_OPTIONS.map((g) => {
              const isSelected = selectedGoal === g.id;
              return (
                <div
                  key={g.id}
                  className={`goal-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectGoal(g)}
                >
                  <span className="goal-opt-icon">{g.icon}</span>
                  <span className="goal-opt-name">{g.name}</span>
                  {isSelected && (
                    <div className="goal-opt-check">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <form onSubmit={handleCreatePlan} className="onboarding-form mt-4">
            <div className="form-group">
              <label className="form-label">How much do you want to save?</label>
              <div className="onboarding-hero-amount compact">
                <span className="hero-currency">₹</span>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="20,000"
                  className="hero-input"
                  required
                  min="500"
                />
              </div>
            </div>

            <div className="plan-preview-box">
              <Sparkles size={18} className="text-accent" />
              <p>
                MoneyLeft will automatically carve out savings first and calculate your safe daily spending allowance so you never run out of money.
              </p>
            </div>

            <button
              type="submit"
              className="btn-primary btn-block btn-lg mt-auto"
              disabled={!targetAmount || parseFloat(targetAmount) <= 0}
            >
              <span>Create My Plan</span>
              <Sparkles size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
