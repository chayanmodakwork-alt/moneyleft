import React, { useState, useMemo } from 'react';
import { X, Target, Sparkles, ArrowRight } from 'lucide-react';

const GOAL_ICONS = ['🏍️', '💻', '📱', '✈️', '🛟', '🎮', '🎧', '👟', '🎯'];

export default function CreateGoalModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [current, setCurrent] = useState('0');
  const [targetDate, setTargetDate] = useState('2027-09-30');
  const [icon, setIcon] = useState('🎯');

  // Compute required monthly savings dynamically
  const monthlyRequired = useMemo(() => {
    const targetAmt = parseFloat(target) || 0;
    const currentAmt = parseFloat(current) || 0;
    const remainingToSave = Math.max(0, targetAmt - currentAmt);

    if (remainingToSave <= 0) return 0;

    const today = new Date();
    const targetD = new Date(targetDate);
    const diffMonths =
      (targetD.getFullYear() - today.getFullYear()) * 12 +
      (targetD.getMonth() - today.getMonth());

    const months = Math.max(1, diffMonths);
    return Math.round(remainingToSave / months);
  }, [target, current, targetDate]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetAmt = parseFloat(target);
    if (isNaN(targetAmt) || targetAmt <= 0 || !name.trim()) return;

    const currentAmt = parseFloat(current) || 0;

    const targetDateObj = new Date(targetDate);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const formattedDate = `${monthNames[targetDateObj.getMonth()]} ${targetDateObj.getFullYear()}`;

    const newGoal = {
      id: `goal-${Date.now()}`,
      name: name.trim(),
      icon,
      target: targetAmt,
      saved: currentAmt,
      targetDate: formattedDate,
      targetMonth: formattedDate,
      monthlyRequired,
      featured: false,
      category: 'Personal',
      notes: 'Added through savings planner',
    };

    onSave(newGoal);
    setName('');
    setTarget('');
    setCurrent('0');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pretitle">Future Savings</span>
            <h2 className="modal-title">Create a Goal</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Emoji Icon picker */}
          <div className="form-group">
            <label className="form-label">Goal Icon</label>
            <div className="icon-selector-grid">
              {GOAL_ICONS.map((emoji) => (
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

          {/* Goal Name */}
          <div className="form-group">
            <label className="form-label">Goal Name</label>
            <input
              type="text"
              placeholder="e.g. New Bike, Semester Trip, Laptop"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Target Amount & Initial Savings */}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Target Amount (₹)</label>
              <input
                type="number"
                placeholder="₹20,000"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="form-input"
                required
                min="100"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Current Savings (₹)</label>
              <input
                type="number"
                placeholder="₹0"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="form-input"
                min="0"
              />
            </div>
          </div>

          {/* Target Date */}
          <div className="form-group">
            <label className="form-label">Target Date</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Dynamic calculation banner */}
          <div className="goal-calc-preview">
            <div className="calc-header">
              <Sparkles size={16} className="text-accent" />
              <span>Smart Savings Projection</span>
            </div>
            <p className="calc-text">
              To reach this goal, you need to save approximately{' '}
              <strong>₹{monthlyRequired.toLocaleString('en-IN')}</strong> per month.
            </p>
          </div>

          <button
            type="submit"
            className="btn-primary btn-block"
            disabled={!name.trim() || !target || parseFloat(target) <= 0}
          >
            <span>Create Goal</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
