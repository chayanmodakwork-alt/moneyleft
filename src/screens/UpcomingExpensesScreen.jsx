import React from 'react';
import { Plus, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function UpcomingExpensesScreen({
  upcomingExpenses,
  onOpenAddUpcoming,
  onMarkPaid,
}) {
  const totalUpcoming = upcomingExpenses.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="upcoming-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-row">
        <div>
          <span className="screen-pretitle">Planned Obligations</span>
          <h1 className="screen-title">Coming Up</h1>
        </div>
        <button
          type="button"
          className="btn-primary btn-sm"
          onClick={onOpenAddUpcoming}
        >
          <Plus size={16} />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Total Upcoming Hero Card */}
      <div className="upcoming-total-card">
        <div>
          <span className="hero-eyebrow">TOTAL UPCOMING COMMITMENTS</span>
          <div className="upcoming-total-amount">
            <span className="currency-symbol">₹</span>
            <span>{totalUpcoming.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <span className="total-items-badge">{upcomingExpenses.length} pending fees</span>
      </div>

      {/* Cards List */}
      <div className="upcoming-cards-list">
        <h3 className="section-title">SCHEDULED PAYMENTS</h3>
        <div className="upcoming-list-grid">
          {upcomingExpenses.map((exp) => (
            <div key={exp.id} className="upcoming-entry-card">
              <div className="upcoming-entry-left">
                <span className="upcoming-entry-icon">{exp.icon}</span>
                <div className="upcoming-entry-info">
                  <h4 className="upcoming-title">{exp.title}</h4>
                  <div className="upcoming-due-row">
                    <Calendar size={13} className="inline mr-1" />
                    <span>Due {exp.dueDate}</span>
                    {exp.dueInDays && (
                      <span className="due-in-tag">
                        <Clock size={11} className="inline mr-1" />
                        in {exp.dueInDays} days
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="upcoming-entry-right">
                <span className="upcoming-amount-val">
                  ₹{exp.amount.toLocaleString('en-IN')}
                </span>
                <button
                  type="button"
                  className="mark-paid-btn"
                  onClick={() => onMarkPaid(exp)}
                  title="Mark as Paid"
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
