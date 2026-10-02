import React, { useState } from 'react';
import { Plus, AlertTriangle, ChevronRight, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function BudgetsScreen({
  budgets,
  onSelectBudget,
  onOpenCreateBudget,
}) {
  const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalPct = Math.min(100, Math.round((totalSpent / totalBudget) * 100));

  return (
    <div className="budgets-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-row">
        <div>
          <span className="screen-pretitle">Spending Envelopes</span>
          <h1 className="screen-title">Your Budgets</h1>
        </div>
        <button
          type="button"
          className="btn-primary btn-sm"
          onClick={onOpenCreateBudget}
        >
          <Plus size={16} />
          <span>Create Budget</span>
        </button>
      </div>

      {/* Aggregate Budget Hero Card */}
      <div className="total-budget-summary-card">
        <div className="total-budget-top">
          <div>
            <span className="summary-card-label">TOTAL MONTHLY BUDGET</span>
            <div className="summary-budget-amount">₹{totalBudget.toLocaleString('en-IN')}</div>
          </div>
          <div className="total-spent-tag">
            <span className="text-muted">Spent:</span>
            <strong className="text-secondary ml-1">₹{totalSpent.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="global-budget-progress-track">
          <div
            className={`global-budget-progress-fill ${
              totalSpent > totalBudget ? 'danger' : totalPct > 85 ? 'warning' : 'teal'
            }`}
            style={{ width: `${Math.min(100, totalPct)}%` }}
          />
        </div>

        <div className="total-budget-footer">
          <span>{totalPct}% of planned allowance utilized</span>
          <span>₹{(totalBudget - totalSpent).toLocaleString('en-IN')} left overall</span>
        </div>
      </div>

      {/* Category Budget Cards */}
      <div className="category-budgets-list">
        <h3 className="section-title">CATEGORY ENVELOPES</h3>
        <div className="budget-cards-grid">
          {budgets.map((b) => {
            const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
            const isOver = b.spent > b.limit;
            const diff = Math.abs(b.spent - b.limit);

            return (
              <div
                key={b.id}
                className={`budget-category-card ${isOver ? 'over-budget' : ''}`}
                onClick={() => onSelectBudget(b)}
              >
                <div className="budget-card-header">
                  <div className="cat-title-group">
                    <span className="cat-icon-badge">{b.icon}</span>
                    <div>
                      <h4 className="cat-budget-name">{b.category}</h4>
                      <span className="cat-daily-rate">~₹{b.avgDaily || 80}/day avg</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="card-arrow" />
                </div>

                {/* Amount figures */}
                <div className="budget-amounts-row">
                  <span className="spent-figure">
                    ₹{b.spent.toLocaleString('en-IN')}
                  </span>
                  <span className="limit-figure">
                    / ₹{b.limit.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="budget-bar-track">
                  <div
                    className={`budget-bar-fill ${
                      isOver ? 'danger' : pct > 80 ? 'warning' : 'teal'
                    }`}
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>

                {/* Warning / Status */}
                {isOver ? (
                  <div className="budget-warning-banner">
                    <AlertTriangle size={15} />
                    <span>{b.warning || `${b.category} budget exceeded by ₹${diff}`}</span>
                  </div>
                ) : (
                  <div className="budget-safe-banner">
                    <CheckCircle2 size={14} className="text-teal" />
                    <span>₹{diff.toLocaleString('en-IN')} remaining</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
