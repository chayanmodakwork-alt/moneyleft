import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'Food', name: 'Food', icon: '🍔' },
  { id: 'Transport', name: 'Transport', icon: '🚕' },
  { id: 'Shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'Education', name: 'Education', icon: '🎓' },
  { id: 'Entertainment', name: 'Entertainment', icon: '🎮' },
  { id: 'Bills', name: 'Bills', icon: '⚡' },
  { id: 'Hostel', name: 'Hostel', icon: '🏠' },
  { id: 'Health', name: 'Health', icon: '💊' },
  { id: 'Subscriptions', name: 'Subscriptions', icon: '📺' },
  { id: 'Other', name: 'Other', icon: '📦' },
];

const PAYMENT_METHODS = ['UPI', 'Cash', 'Card', 'Other'];

export default function AddExpenseModal({ isOpen, onClose, onSave }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [merchant, setMerchant] = useState('');
  const [date, setDate] = useState('2026-10-02');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [notes, setNotes] = useState('');
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const matchedCat = CATEGORIES.find((c) => c.id === category);

    const newExpense = {
      id: `tx-${Date.now()}`,
      merchant: merchant.trim() || `${category} Expense`,
      category,
      amount: numAmount,
      type: 'expense',
      date: 'Today, Just now',
      dateKey: 'Today',
      paymentMethod,
      notes: notes.trim(),
      icon: matchedCat ? matchedCat.icon : '💸',
      badge: category,
    };

    setShowSavedFeedback(true);
    setTimeout(() => {
      onSave(newExpense);
      setShowSavedFeedback(false);
      setAmount('');
      setMerchant('');
      setNotes('');
      onClose();
    }, 650);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pretitle">Quick Entry</span>
            <h2 className="modal-title">Add Expense</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {showSavedFeedback ? (
          <div className="modal-success-state">
            <div className="success-icon-pulse">
              <CheckCircle2 size={48} color="#0D9488" />
            </div>
            <h3>Expense Logged!</h3>
            <p>₹{amount} deducted. Your safe daily allowance has been updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Large Amount Field */}
            <div className="amount-hero-input">
              <span className="currency-prefix">₹</span>
              <input
                type="number"
                step="any"
                min="1"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus
                required
                className="amount-input"
              />
            </div>

            {/* Category Selector */}
            <div className="form-group">
              <label className="form-label">Category</label>
              <div className="category-scroll-chips">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`category-chip ${category === cat.id ? 'active' : ''}`}
                    onClick={() => setCategory(cat.id)}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Merchant Field */}
            <div className="form-group">
              <label className="form-label">Where did you spend?</label>
              <input
                type="text"
                placeholder="e.g. Zomato, Campus Tapri, Uber, Stationery"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Date & Payment Method */}
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
                <label className="form-label">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-select"
                >
                  {PAYMENT_METHODS.map((pm) => (
                    <option key={pm} value={pm}>
                      {pm}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label">Notes (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Split with Rohan, dinner after lab"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary btn-block submit-expense-btn"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              <span>Save Expense</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
