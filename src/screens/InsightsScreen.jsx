import React from 'react';
import { ArrowRight, TrendingUp, AlertCircle, ShoppingBag, Coffee, Car } from 'lucide-react';

export default function InsightsScreen({ insights, onNavigateScreen }) {
  return (
    <div className="insights-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-block">
        <span className="screen-pretitle">Behavioral Co-Pilot</span>
        <h1 className="screen-title">Your Money Insights</h1>
        <p className="screen-subtitle">Understand where your money is going.</p>
      </div>

      {/* Grid of Insight Cards */}
      <div className="insights-grid">
        {/* Card 1: Food */}
        <div className="insight-card primary-border">
          <div className="insight-card-top">
            <span className="insight-emoji-badge">🍔</span>
            <span className="insight-tag high">28% of total</span>
          </div>
          <h3 className="insight-title">Food is your biggest expense</h3>
          <p className="insight-description">
            You spent ₹3,180 on food this month, around 28% of your total spending. Zomato deliveries on weekend study nights make up over 55% of this.
          </p>
          <button
            type="button"
            className="insight-action-btn"
            onClick={() => onNavigateScreen('budgets')}
          >
            <span>Review Food Envelope</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 2: Spending Trend */}
        <div className="insight-card">
          <div className="insight-card-top">
            <span className="insight-emoji-badge">📈</span>
            <span className="insight-tag warning">+14% vs Sep</span>
          </div>
          <h3 className="insight-title">Spending increased</h3>
          <p className="insight-description">
            Your spending this month is 14% higher than last month. The surge began during the semester tech festival week.
          </p>
          <button
            type="button"
            className="insight-action-btn"
            onClick={() => onNavigateScreen('analytics')}
          >
            <span>View Spending Breakdown</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 3: Small Purchases */}
        <div className="insight-card">
          <div className="insight-card-top">
            <span className="insight-emoji-badge">🧾</span>
            <span className="insight-tag purple">Micro-Habit</span>
          </div>
          <h3 className="insight-title">Small purchases add up</h3>
          <p className="insight-description">
            You made 23 purchases under ₹100 this month. Together they cost ₹1,740. Daily tapri chai, samosas, and printouts drain a substantial portion of your budget.
          </p>
          <button
            type="button"
            className="insight-action-btn"
            onClick={() => onNavigateScreen('transactions')}
          >
            <span>Audit Micro-Purchases</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 4: Transport */}
        <div className="insight-card">
          <div className="insight-card-top">
            <span className="insight-emoji-badge">🚕</span>
            <span className="insight-tag green">Saving Win</span>
          </div>
          <h3 className="insight-title">Transport</h3>
          <p className="insight-description">
            You spent ₹1,420 on transport this month. By walking between academic blocks instead of taking autos, you’ve maintained an under-budget cushion of ₹380.
          </p>
          <button
            type="button"
            className="insight-action-btn"
            onClick={() => onNavigateScreen('budgets')}
          >
            <span>Check Transport Limit</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
