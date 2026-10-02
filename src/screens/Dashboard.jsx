import React from 'react';
import { 
  PlusCircle, 
  ArrowUpRight, 
  HelpCircle, 
  Sparkles, 
  Calendar, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Plus
} from 'lucide-react';

export default function Dashboard({
  user,
  stats,
  transactions,
  onOpenAddExpense,
  onOpenAddIncome,
  onOpenCanIAfford,
  onOpenAddGoal,
  onNavigateScreen,
  onSelectTransaction,
}) {
  // Safe calculation values
  const income = stats.monthlyIncome || 12000;
  const spent = stats.spent || 4580;
  const planned = stats.planned || 1800;
  const savings = stats.savings || 2000;
  const moneyLeft = Math.max(0, income - spent - savings);
  const daysLeft = stats.daysRemaining || 21;
  const safeDaily = Math.round(Math.max(0, (moneyLeft - planned) / daysLeft)) || 353;

  // Days progress in month (31 days in October, 10 days passed, 21 days remaining)
  const monthProgressPct = Math.round(((31 - daysLeft) / 31) * 100);

  // Recent transactions: show top 4
  const recentList = transactions.slice(0, 4);

  return (
    <div className="dashboard-view animate-fade-in">
      {/* Top Greeting */}
      <div className="dashboard-greeting-bar">
        <div className="greeting-text">
          <span className="greeting-sub">October 2026 • Semester Budget</span>
          <h1 className="greeting-heading">Good morning, {user.name || 'Chayan'} 👋</h1>
        </div>
        <div 
          className="student-badge-pill" 
          onClick={() => onNavigateScreen('profile')}
          title="Student Profile"
        >
          <div className="student-avatar">{user.avatar || 'C'}</div>
          <span className="student-label">Student Plan</span>
        </div>
      </div>

      {/* HERO CARD 1: MONEY LEFT */}
      <div className="money-left-hero-card">
        <div className="money-left-bg-glow" />
        <div className="money-left-header">
          <span className="hero-eyebrow">MONEY LEFT</span>
          <span className="hero-status-tag">🟢 Live Balance</span>
        </div>

        <div className="money-left-amount">
          <span className="currency-symbol">₹</span>
          <span>{moneyLeft.toLocaleString('en-IN')}</span>
        </div>
        <p className="money-left-sub">Available this month after savings reserve</p>

        {/* Breakdown Row */}
        <div className="hero-breakdown-grid">
          <div className="breakdown-stat">
            <span className="b-label">Monthly income</span>
            <strong className="b-val">₹{income.toLocaleString('en-IN')}</strong>
          </div>
          <div className="breakdown-stat">
            <span className="b-label">Spent</span>
            <strong className="b-val text-red">₹{spent.toLocaleString('en-IN')}</strong>
          </div>
          <div className="breakdown-stat">
            <span className="b-label">Planned</span>
            <strong className="b-val text-amber">₹{planned.toLocaleString('en-IN')}</strong>
          </div>
          <div className="breakdown-stat">
            <span className="b-label">Savings</span>
            <strong className="b-val text-teal">₹{savings.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Visual Allocation Stack Bar */}
        <div className="hero-stack-bar-wrap">
          <div 
            className="stack-segment spent" 
            style={{ width: `${(spent / income) * 100}%` }}
            title={`Spent: ₹${spent}`} 
          />
          <div 
            className="stack-segment planned" 
            style={{ width: `${(planned / income) * 100}%` }}
            title={`Planned: ₹${planned}`} 
          />
          <div 
            className="stack-segment savings" 
            style={{ width: `${(savings / income) * 100}%` }}
            title={`Savings: ₹${savings}`} 
          />
          <div 
            className="stack-segment remaining" 
            style={{ width: `${(moneyLeft / income) * 100}%` }}
            title={`Remaining: ₹${moneyLeft}`} 
          />
        </div>
      </div>

      {/* HERO CARD 2: SAFE TO SPEND TODAY */}
      <div className="safe-spend-card">
        <div className="safe-spend-top">
          <div>
            <span className="safe-eyebrow">SAFE TO SPEND TODAY</span>
            <div className="safe-spend-amount">
              <span className="currency-symbol">₹</span>
              <span>{safeDaily.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="safe-ring-badge">
            <span className="ring-icon">⚡</span>
            <span className="ring-pct">{monthProgressPct}%</span>
          </div>
        </div>

        <p className="safe-spend-desc">
          Based on your remaining balance, upcoming expenses, and savings goal.
        </p>

        {/* Progress indicator */}
        <div className="safe-progress-box">
          <div className="safe-progress-labels">
            <span className="font-semibold text-secondary">
              <Calendar size={13} className="inline mr-1" />
              {daysLeft} days remaining
            </span>
            <span className="text-muted">Month ends Oct 31</span>
          </div>
          <div className="safe-progress-track">
            <div 
              className="safe-progress-fill" 
              style={{ width: `${monthProgressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* FINANCIAL STATUS BADGE */}
      <div className="financial-status-card">
        <div className="status-indicator-dot on-track" />
        <div className="status-content">
          <div className="status-title-row">
            <span className="status-title">FINANCIAL STATUS</span>
            <span className="status-badge green">🟢 On Track</span>
          </div>
          <p className="status-note">
            Your current spending pace is within your planned budget.
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="quick-actions-section">
        <h3 className="section-title">QUICK ACTIONS</h3>
        <div className="quick-actions-grid">
          <button 
            type="button" 
            className="action-chip primary"
            onClick={onOpenAddExpense}
          >
            <span className="action-icon">💸</span>
            <span className="action-text">Add Expense</span>
          </button>

          <button 
            type="button" 
            className="action-chip"
            onClick={onOpenAddIncome}
          >
            <span className="action-icon">💰</span>
            <span className="action-text">Add Income</span>
          </button>

          <button 
            type="button" 
            className="action-chip highlight"
            onClick={onOpenCanIAfford}
          >
            <span className="action-icon">🤔</span>
            <span className="action-text">Can I Afford It?</span>
          </button>

          <button 
            type="button" 
            className="action-chip"
            onClick={onOpenAddGoal}
          >
            <span className="action-icon">🎯</span>
            <span className="action-text">Add Goal</span>
          </button>
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="recent-tx-section">
        <div className="section-header-row">
          <h3 className="section-title">RECENT TRANSACTIONS</h3>
          <button 
            className="view-all-link"
            onClick={() => onNavigateScreen('transactions')}
          >
            <span>View all transactions</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="tx-card-list">
          {recentList.map((tx) => (
            <div 
              key={tx.id} 
              className="tx-item-row"
              onClick={() => onSelectTransaction(tx)}
            >
              <div className={`tx-icon-bubble ${tx.type}`}>
                {tx.icon}
              </div>
              <div className="tx-meta-col">
                <span className="tx-merchant-name">{tx.merchant}</span>
                <span className="tx-category-badge">{tx.category}</span>
              </div>
              <div className="tx-amount-col">
                <span className={`tx-amt-val ${tx.type}`}>
                  {tx.type === 'income' ? '+' : '−'}₹{tx.amount.toLocaleString('en-IN')}
                </span>
                <span className="tx-time-sub">{tx.date.split(',')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
