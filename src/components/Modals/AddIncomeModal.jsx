import React, { useState } from 'react';
import { X, ArrowRight, DollarSign } from 'lucide-react';

const INCOME_SOURCES = ['Pocket Allowance', 'Freelance Work', 'Internship Stipend', 'Family Gift', 'Other'];

export default function AddIncomeModal({ isOpen, onClose, onSave }) {
  const [amount, setAmount] = useState('12000');
  const [source, setSource] = useState('Pocket Allowance');
  const [date, setDate] = useState('2026-10-02');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    const newIncome = {
      id: `tx_${Date.now()}`,
      merchant: source.trim() || 'Income',
      category: 'Income',
      amount: val,
      type: 'income',
      date: 'Today, Just now',
      dateKey: 'Today',
      paymentMethod,
      notes: notes.trim(),
      icon: '💰',
      badge: 'Income',
    };

    onSave(newIncome);
    setAmount('');
    setNotes('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pretitle">Add Inflow</span>
            <h2 className="modal-title">Add Income</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="amount-hero-input">
            <span className="currency-prefix">+₹</span>
            <input
              type="number"
              step="any"
              min="1"
              placeholder="12,000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              required
              className="amount-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Income Source</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="form-select"
            >
              {INCOME_SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-select"
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes (Optional)</label>
            <input
              type="text"
              placeholder="e.g. October monthly allowance from parents"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            className="btn-primary btn-block mt-3"
            disabled={!amount || parseFloat(amount) <= 0}
          >
            <span>Record Income</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
