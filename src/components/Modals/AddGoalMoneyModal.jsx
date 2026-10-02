import React, { useState } from 'react';
import { X, ArrowRight, PiggyBank } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AddGoalMoneyModal({ isOpen, onClose, goal, onDeposit }) {
  const [amount, setAmount] = useState('1000');

  if (!isOpen || !goal) return null;

  const handleDeposit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0D9488', '#14B8A6', '#F59E0B'],
      });
    } catch {
      // Fallback
    }

    onDeposit(goal.id, val);
    onClose();
  };

  const remaining = Math.max(0, goal.target - goal.saved);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pretitle">Add Savings</span>
            <h2 className="modal-title">
              {goal.icon} {goal.name}
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleDeposit} className="modal-form">
          <div className="goal-deposit-summary">
            <div className="deposit-summary-item">
              <span>Current Saved</span>
              <strong>₹{goal.saved.toLocaleString('en-IN')}</strong>
            </div>
            <div className="deposit-summary-arrow">→</div>
            <div className="deposit-summary-item">
              <span>Goal Target</span>
              <strong>₹{goal.target.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">How much would you like to deposit?</label>
            <div className="amount-hero-input compact">
              <span className="currency-prefix">₹</span>
              <input
                type="number"
                placeholder="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-input"
                autoFocus
                required
                min="10"
              />
            </div>
          </div>

          {/* Quick chip increments */}
          <div className="quick-deposit-chips">
            {[500, 1000, 2000, 5000].map((preset) => (
              <button
                key={preset}
                type="button"
                className="deposit-chip"
                onClick={() => setAmount(preset.toString())}
              >
                +₹{preset}
              </button>
            ))}
          </div>

          <p className="form-hint-text">
            Remaining needed to reach goal: ₹{remaining.toLocaleString('en-IN')}
          </p>

          <button type="submit" className="btn-primary btn-block">
            <span>Confirm Deposit</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
