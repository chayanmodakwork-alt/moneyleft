import React from 'react';
import { Plus, Sparkles, Calendar, Target, PlusCircle } from 'lucide-react';

export default function GoalsScreen({
  goals,
  onOpenCreateGoal,
  onOpenAddMoney,
}) {
  const featuredGoal = goals.find((g) => g.featured) || goals[0];
  const otherGoals = goals.filter((g) => g.id !== (featuredGoal?.id));

  const totalSavedAcrossGoals = goals.reduce((acc, g) => acc + g.saved, 0);

  return (
    <div className="goals-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-row">
        <div>
          <span className="screen-pretitle">Future Planning</span>
          <h1 className="screen-title">Your Goals</h1>
        </div>
        <button
          type="button"
          className="btn-primary btn-sm"
          onClick={onOpenCreateGoal}
        >
          <Plus size={16} />
          <span>Create Goal</span>
        </button>
      </div>

      {/* Featured Goal: Large Card */}
      {featuredGoal && (
        <div className="featured-goal-card">
          <div className="featured-goal-top">
            <div className="goal-identity">
              <span className="featured-goal-icon">{featuredGoal.icon}</span>
              <div>
                <span className="goal-eyebrow">PRIMARY SAVINGS GOAL</span>
                <h3 className="featured-goal-title">{featuredGoal.name}</h3>
              </div>
            </div>
            <button
              type="button"
              className="btn-primary btn-sm add-money-btn"
              onClick={() => onOpenAddMoney(featuredGoal)}
            >
              <PlusCircle size={15} />
              <span>Add Money</span>
            </button>
          </div>

          {/* Numbers Grid */}
          <div className="goal-numbers-grid">
            <div className="goal-stat-box">
              <span className="g-stat-label">Target</span>
              <strong className="g-stat-val">₹{featuredGoal.target.toLocaleString('en-IN')}</strong>
            </div>
            <div className="goal-stat-box">
              <span className="g-stat-label">Saved</span>
              <strong className="g-stat-val text-teal">₹{featuredGoal.saved.toLocaleString('en-IN')}</strong>
            </div>
            <div className="goal-stat-box">
              <span className="g-stat-label">Remaining</span>
              <strong className="g-stat-val text-secondary">
                ₹{(featuredGoal.target - featuredGoal.saved).toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          {/* Progress Bar & Percentage */}
          {(() => {
            const pct = ((featuredGoal.saved / featuredGoal.target) * 100).toFixed(2);
            return (
              <div className="goal-progress-section">
                <div className="goal-progress-info">
                  <span className="pct-badge">{pct}% completed</span>
                  <span className="timeline-badge">
                    <Calendar size={13} className="inline mr-1" />
                    Target: {featuredGoal.targetDate || 'September 2027'}
                  </span>
                </div>
                <div className="goal-progress-track">
                  <div
                    className="goal-progress-fill"
                    style={{ width: `${Math.min(100, parseFloat(pct))}%` }}
                  />
                </div>
              </div>
            );
          })()}

          {/* Monthly requirement footer note */}
          <div className="goal-requirement-pill">
            <Sparkles size={16} className="text-accent" />
            <span>
              Required monthly saving:{' '}
              <strong>₹{(featuredGoal.monthlyRequired || 5417).toLocaleString('en-IN')}/mo</strong>
            </span>
          </div>
        </div>
      )}

      {/* Other Goals Grid */}
      <div className="other-goals-section mt-4">
        <h3 className="section-title">OTHER GOALS</h3>
        <div className="other-goals-grid">
          {otherGoals.map((g) => {
            const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
            return (
              <div key={g.id} className="goal-mini-card">
                <div className="goal-mini-header">
                  <span className="goal-mini-icon">{g.icon}</span>
                  <button
                    type="button"
                    className="btn-secondary btn-xs"
                    onClick={() => onOpenAddMoney(g)}
                  >
                    + Add
                  </button>
                </div>

                <h4 className="goal-mini-name">{g.name}</h4>

                <div className="goal-mini-amounts">
                  <strong>₹{g.saved.toLocaleString('en-IN')}</strong>
                  <span>/ ₹{g.target.toLocaleString('en-IN')}</span>
                </div>

                <div className="goal-progress-track mt-2">
                  <div className="goal-progress-fill" style={{ width: `${pct}%` }} />
                </div>

                <div className="goal-mini-footer">
                  <span>{pct}% saved</span>
                  <span>{g.targetMonth || g.targetDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
