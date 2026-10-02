import React, { useState } from 'react';
import { X, Calendar, PlusCircle } from 'lucide-react';

export default function AddUpcomingModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('2026-10-25');
  const [category, setCategory] = useState('College');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!title.trim() || isNaN(val) || val <= 0) return;

    const iconMap = {
      Hostel: '🏠',
      College: '🎓',
      Bills: '📱',
      Subscriptions: '📺',
      Other: '🧾',
    };

    const newUpcoming = {
      id: `up-${Date.now()}`,
      title: title.trim(),
      amount: val,
      dueDate: new Date(dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      dueInDays: 14,
      icon: iconMap[category] || '🧾',
      category,
      status: 'pending',
    };

    onSave(newUpcoming);
    setTitle('');
    setAmount('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pretitle">Commitments</span>
            <h2 className="modal-title">Add Upcoming Expense</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Expense Title</label>
            <input
              type="text"
              placeholder="e.g. Mess Advance, Exam Fee, Wi-Fi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                placeholder="2000"
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
                <option value="Hostel">Hostel Fee</option>
                <option value="College">College Fee</option>
                <option value="Bills">Bills & Recharge</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn-primary btn-block">
            <span>Add to Planned Expenses</span>
            <PlusCircle size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
