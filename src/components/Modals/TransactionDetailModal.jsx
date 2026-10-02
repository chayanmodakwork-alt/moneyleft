import React, { useState } from 'react';
import { X, Trash2, Edit3, Calendar, CreditCard, Tag, FileText, Check } from 'lucide-react';

export default function TransactionDetailModal({
  isOpen,
  onClose,
  transaction,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editMerchant, setEditMerchant] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [editNotes, setEditNotes] = useState('');

  if (!isOpen || !transaction) return null;

  const handleStartEdit = () => {
    setEditMerchant(transaction.merchant);
    setEditAmount(transaction.amount.toString());
    setEditNotes(transaction.notes || '');
    setIsEditing(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updated = {
      ...transaction,
      merchant: editMerchant.trim() || transaction.merchant,
      amount: parseFloat(editAmount) || transaction.amount,
      notes: editNotes.trim(),
    };
    onUpdate(updated);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(transaction.id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pretitle">Transaction Details</span>
            <h2 className="modal-title">{transaction.merchant}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveEdit} className="modal-form">
            <div className="form-group">
              <label className="form-label">Merchant / Place</label>
              <input
                type="text"
                className="form-input"
                value={editMerchant}
                onChange={(e) => setEditMerchant(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input
                type="number"
                step="any"
                className="form-input"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <input
                type="text"
                className="form-input"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
              />
            </div>

            <div className="modal-actions-row">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <Check size={16} /> Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="tx-detail-body">
            {/* Hero Amount Display */}
            <div className={`tx-hero-display ${transaction.type}`}>
              <div className="tx-hero-icon">{transaction.icon || '💸'}</div>
              <div className="tx-hero-amount">
                {transaction.type === 'income' ? '+' : '−'}₹
                {transaction.amount.toLocaleString('en-IN')}
              </div>
              <div className="tx-hero-badge">
                {transaction.type === 'income' ? 'Income' : 'Expense'}
              </div>
            </div>

            {/* Structured Info Card */}
            <div className="tx-info-card">
              <div className="tx-detail-row">
                <div className="tx-detail-label">
                  <Tag size={16} /> Category
                </div>
                <div className="tx-detail-val font-semibold">{transaction.category}</div>
              </div>

              <div className="tx-detail-row">
                <div className="tx-detail-label">
                  <Calendar size={16} /> Date
                </div>
                <div className="tx-detail-val">{transaction.dateKey || transaction.date}</div>
              </div>

              <div className="tx-detail-row">
                <div className="tx-detail-label">
                  <CreditCard size={16} /> Payment
                </div>
                <div className="tx-detail-val">{transaction.paymentMethod || 'UPI'}</div>
              </div>

              <div className="tx-detail-row">
                <div className="tx-detail-label">
                  <FileText size={16} /> Notes
                </div>
                <div className="tx-detail-val notes-text">
                  {transaction.notes || 'No notes added'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-actions-row">
              <button
                type="button"
                className="btn-secondary flex-1"
                onClick={handleStartEdit}
              >
                <Edit3 size={16} /> Edit
              </button>
              <button
                type="button"
                className="btn-danger flex-1"
                onClick={handleDelete}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
