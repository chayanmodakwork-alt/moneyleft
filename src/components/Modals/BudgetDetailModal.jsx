import React, { useState } from 'react';
import { X, TrendingUp, AlertTriangle, CheckCircle, PauseCircle, Edit3, Calendar } from 'lucide-react';

export default function BudgetDetailModal({ isOpen, onClose, budget, onUpdateBudget }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLimit, setNewLimit] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  if (!isOpen || !budget) return null;

  const remaining = budget.limit - budget.spent;
  const pct = Math.min(100, Math.round((budget.spent / budget.limit) * 100));
  const isOver = budget.spent > budget.limit;

  const handleSaveLimit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(newLimit);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdateBudget({ ...budget, limit: parsed });
      setIsEditing(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pretitle">Budget Analysis</span>
            <h2 className="modal-title">
              {budget.icon} {budget.category} Budget
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="budget-detail-content">
          {/* Main limit and spent banner */}
          <div className={`budget-highlight-card ${isOver ? 'overbudget' : ''}`}>
            <div className="budget-stat-group">
              <span className="stat-label">Monthly Limit</span>
              <strong className="stat-val">₹{budget.limit.toLocaleString('en-IN')}</strong>
            </div>
            <div className="budget-stat-divider" />
            <div className="budget-stat-group">
              <span className="stat-label">Spent So Far</span>
              <strong className="stat-val text-accent">₹{budget.spent.toLocaleString('en-IN')}</strong>
            </div>
            <div className="budget-stat-divider" />
            <div className="budget-stat-group">
              <span className="stat-label">Remaining</span>
              <strong className={`stat-val ${remaining >= 0 ? 'text-success' : 'text-danger'}`}>
                {remaining >= 0 ? `₹${remaining.toLocaleString('en-IN')}` : `−₹${Math.abs(remaining)}`}
              </strong>
            </div>
          </div>

          {/* Progress bar */}
          <div className="budget-progress-section">
            <div className="progress-labels">
              <span>{pct}% utilized</span>
              <span>21 days left in month</span>
            </div>
            <div className="progress-bar-track">
              <div
                className={`progress-bar-fill ${isOver ? 'danger' : pct > 80 ? 'warning' : 'teal'}`}
                style={{ width: `${Math.min(100, pct)}%` }}
              />
            </div>
          </div>

          {/* Daily metrics */}
          <div className="budget-metrics-grid">
            <div className="metric-box">
              <span className="metric-title">Average Daily Spending</span>
              <strong className="metric-num">₹{budget.avgDaily || 82} / day</strong>
              <small className="metric-sub">Across 9 active days</small>
            </div>
            <div className="metric-box">
              <span className="metric-title">Days Remaining</span>
              <strong className="metric-num">21 days</strong>
              <small className="metric-sub">Until next allowance</small>
            </div>
          </div>

          {/* Mini Spending Trend Chart */}
          <div className="spending-trend-card">
            <div className="trend-header">
              <span className="trend-title">Daily Spending Trend (Last 7 Days)</span>
              <TrendingUp size={16} className="text-muted" />
            </div>
            <div className="trend-bars">
              {(budget.history || [65, 80, 110, 75, 95, 82, 90]).map((amt, idx) => {
                const maxVal = 130;
                const barHeight = Math.min(100, Math.round((amt / maxVal) * 100));
                const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Today'];
                return (
                  <div key={idx} className="trend-bar-col">
                    <div className="trend-bar-wrapper">
                      <div
                        className="trend-bar-fill"
                        style={{ height: `${barHeight}%` }}
                        title={`₹${amt}`}
                      />
                    </div>
                    <span className="trend-bar-label">{days[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insight pill */}
          <div className={`budget-insight-callout ${isOver ? 'alert' : 'info'}`}>
            <div className="callout-icon">
              {isOver ? <AlertTriangle size={18} /> : <CheckCircle size={18} />}
            </div>
            <p className="callout-text">
              {budget.insight ||
                'You are currently spending slightly faster than your planned pace. Reducing weekend food orders will keep you safe.'}
            </p>
          </div>

          {/* Edit Form if toggled */}
          {isEditing && (
            <form onSubmit={handleSaveLimit} className="budget-edit-form">
              <label className="form-label">New Monthly Limit (₹)</label>
              <div className="edit-input-row">
                <input
                  type="number"
                  placeholder={budget.limit}
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  className="form-input"
                  autoFocus
                  required
                />
                <button type="submit" className="btn-primary">
                  Save
                </button>
              </div>
            </form>
          )}

          {/* Action buttons */}
          <div className="modal-actions-row">
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={() => {
                setNewLimit(budget.limit.toString());
                setIsEditing(!isEditing);
              }}
            >
              <Edit3 size={16} /> {isEditing ? 'Cancel Edit' : 'Edit Budget'}
            </button>
            <button
              type="button"
              className={`btn-secondary flex-1 ${isPaused ? 'paused-active' : ''}`}
              onClick={() => setIsPaused(!isPaused)}
            >
              <PauseCircle size={16} /> {isPaused ? 'Resume Budget' : 'Pause Budget'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
