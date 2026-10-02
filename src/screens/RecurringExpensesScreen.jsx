import React, { useState } from 'react';
import { Plus, RefreshCw, CheckCircle2, Trash2 } from 'lucide-react';

export default function RecurringExpensesScreen({
  recurringExpenses,
  onAddRecurring,
  onDeleteRecurring,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Streaming');

  const totalRecurring = recurringExpenses.reduce((acc, item) => acc + item.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!name.trim() || isNaN(val) || val <= 0) return;

    const iconMap = {
      Streaming: '📺',
      Music: '🎵',
      Telecom: '📱',
      Fitness: '🏋️',
      Other: '🔄',
    };

    onAddRecurring({
      id: `rec-${Date.now()}`,
      name: name.trim(),
      amount: val,
      period: 'month',
      icon: iconMap[category] || '🔄',
      category,
    });

    setName('');
    setAmount('');
    setShowAddForm(false);
  };

  return (
    <div className="recurring-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-row">
        <div>
          <span className="screen-pretitle">Subscriptions & Memberships</span>
          <h1 className="screen-title">Recurring Expenses</h1>
        </div>
        <button
          type="button"
          className="btn-primary btn-sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={16} />
          <span>Add Recurring</span>
        </button>
      </div>

      {/* Hero Summary Card */}
      <div className="recurring-total-card">
        <div className="recurring-total-content">
          <span className="hero-eyebrow">MONTHLY RECURRING TOTAL</span>
          <div className="recurring-total-amount">
            <span className="currency-symbol">₹</span>
            <span>{totalRecurring.toLocaleString('en-IN')}</span>
            <span className="period-label">/ month</span>
          </div>
        </div>
        <div className="recurring-active-chip">
          <RefreshCw size={14} className="spin-slow" />
          <span>{recurringExpenses.length} active plans</span>
        </div>
      </div>

      {/* Add Recurring Form if toggled */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="recurring-add-form animate-fade-in">
          <h4 className="form-heading">Add New Recurring Subscription</h4>
          <div className="form-group">
            <label className="form-label">Service Name</label>
            <input
              type="text"
              placeholder="e.g. YouTube Premium, GitHub Copilot, Gym"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Monthly Cost (₹)</label>
              <input
                type="number"
                placeholder="299"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="form-input"
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="Streaming">Streaming / Video</option>
                <option value="Music">Music</option>
                <option value="Telecom">Mobile / 5G</option>
                <option value="Fitness">Fitness / Gym</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="form-actions-row">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Subscription
            </button>
          </div>
        </form>
      )}

      {/* List of Recurring Expenses */}
      <div className="recurring-list-section">
        <h3 className="section-title">ACTIVE SUBSCRIPTIONS</h3>
        <div className="recurring-items-grid">
          {recurringExpenses.map((rec) => (
            <div key={rec.id} className="recurring-entry-card">
              <div className="recurring-entry-left">
                <span className="recurring-icon-badge">{rec.icon}</span>
                <div>
                  <h4 className="recurring-name">{rec.name}</h4>
                  <span className="recurring-cat-tag">{rec.category}</span>
                </div>
              </div>

              <div className="recurring-entry-right">
                <div className="recurring-cost-wrap">
                  <strong className="recurring-amount">
                    ₹{rec.amount.toLocaleString('en-IN')}
                  </strong>
                  <span className="recurring-period">/ month</span>
                </div>
                {onDeleteRecurring && (
                  <button
                    type="button"
                    className="rec-delete-btn"
                    onClick={() => onDeleteRecurring(rec.id)}
                    title="Remove subscription"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
