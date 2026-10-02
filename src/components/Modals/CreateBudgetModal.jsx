import React, { useState } from 'react';
import { X, ArrowRight, PieChart } from 'lucide-react';

const ICONS = ['🍔', '🚕', '🛍️', '🎓', '🎮', '📺', '🏠', '💊', '⚡', '🥪', '☕', '📦'];

export default function CreateBudgetModal({ isOpen, onClose, onSave }) {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [icon, setIcon] = useState('🥪');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(limit);
    if (!category.trim() || isNaN(val) || val <= 0) return;

    onSave({
      category: category.trim(),
      limit: val,
      icon,
      color: '#0D9488',
      avgDaily: Math.round(val / 30),
      insight: 'New budget envelope active.',
      history: [0, 0, 0, 0, 0, 0, 0],
    });

    setCategory('');
    setLimit('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pretitle">Spending Cap</span>
            <h2 className="modal-title">Create Budget Envelope</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Category Icon</label>
            <div className="icon-selector-grid">
              {ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`icon-tile ${icon === emoji ? 'active' : ''}`}
                  onClick={() => setIcon(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Envelope / Category Name</label>
            <input
              type="text"
              placeholder="e.g. Snacks & Cafes, Project Printing, Gym"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Monthly Spending Limit (₹)</label>
            <div className="amount-hero-input compact">
              <span className="currency-prefix">₹</span>
              <input
                type="number"
                placeholder="1500"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="amount-input"
                required
                min="100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary btn-block mt-3"
            disabled={!category.trim() || !limit || parseFloat(limit) <= 0}
          >
            <span>Create Budget</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
