import React, { useState } from 'react';
import { HelpCircle, AlertCircle, CheckCircle2, ArrowRight, Sparkles, ShoppingBag, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESETS = [
  { item: 'Wireless Headphones', price: 1500, icon: '🎧' },
  { item: 'Campus Concert Ticket', price: 800, icon: '🎟️' },
  { item: 'New Sneakers', price: 2800, icon: '👟' },
  { item: 'Gaming Mechanical Keyboard', price: 2200, icon: '⌨️' },
  { item: 'Weekend Cafe Outing', price: 650, icon: '☕' },
];

export default function CanIAffordItScreen({
  stats,
  onBuyAnyway,
  onMaybeLater,
}) {
  const [itemName, setItemName] = useState('Wireless Headphones');
  const [priceInput, setPriceInput] = useState('1500');
  const [checkedResult, setCheckedResult] = useState({
    active: true,
    item: 'Wireless Headphones',
    price: 1500,
  });

  // Base state values from stats
  const availableMoney = 7420;
  const upcomingExpenses = 2000;
  const savingsCommitment = 1000;
  const daysLeft = stats.daysRemaining || 21;

  const currentSafeDaily = Math.round(
    Math.max(0, (availableMoney - upcomingExpenses - savingsCommitment) / daysLeft)
  ) || 353;

  const handleCheck = (e) => {
    e.preventDefault();
    const parsedPrice = parseFloat(priceInput);
    if (isNaN(parsedPrice) || parsedPrice <= 0 || !itemName.trim()) return;

    setCheckedResult({
      active: true,
      item: itemName.trim(),
      price: parsedPrice,
    });
  };

  const handleApplyPreset = (preset) => {
    setItemName(preset.item);
    setPriceInput(preset.price.toString());
    setCheckedResult({
      active: true,
      item: preset.item,
      price: preset.price,
    });
  };

  // Perform dynamic financial impact projection
  const purchasePrice = checkedResult.active ? checkedResult.price : 1500;
  const projectedRemaining = availableMoney - purchasePrice - upcomingExpenses - savingsCommitment;
  const afterSafeDaily = Math.round(Math.max(0, projectedRemaining / daysLeft));

  // Determine affordability status tier
  let statusBadge = {
    type: 'caution',
    label: 'YOU CAN AFFORD IT — WITH CAUTION',
    emoji: '🟡',
    colorClass: 'warning',
    message:
      'This purchase is possible based on your current plan, but it would significantly reduce your remaining daily spending allowance.',
  };

  if (projectedRemaining < 0 || afterSafeDaily < 60) {
    statusBadge = {
      type: 'danger',
      label: 'WILL OVERSTRETCH YOUR BUDGET',
      emoji: '🔴',
      colorClass: 'danger',
      message:
        'This purchase would deplete your emergency allowance and leave you with less than ₹60/day for the remaining 21 days.',
    };
  } else if (afterSafeDaily >= 280) {
    statusBadge = {
      type: 'safe',
      label: 'YOU CAN SAFELY AFFORD IT',
      emoji: '🟢',
      colorClass: 'success',
      message:
        'You have ample surplus this month! Your daily spending allowance remains comfortably above ₹280/day.',
    };
  }

  const handleExecutePurchase = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch {}

    onBuyAnyway({
      id: `tx-${Date.now()}`,
      merchant: checkedResult.item || 'Afford It Purchase',
      category: 'Shopping',
      amount: purchasePrice,
      type: 'expense',
      date: 'Today, Just now',
      dateKey: 'Today',
      paymentMethod: 'UPI',
      notes: `Purchased after checking with Can I Afford It co-pilot`,
      icon: '🛍️',
      badge: 'Shopping',
    });
  };

  return (
    <div className="afford-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-block">
        <div className="afford-tagline-pill">
          <Sparkles size={14} className="text-accent" />
          <span>Signature Co-Pilot</span>
        </div>
        <h1 className="screen-title">CAN I AFFORD IT?</h1>
        <p className="screen-subtitle">Before you buy it, see what it does to your budget.</p>
      </div>

      {/* Input Form Card */}
      <div className="afford-input-card">
        <form onSubmit={handleCheck} className="afford-form">
          <div className="form-group">
            <label className="form-label">What do you want to buy?</label>
            <input
              type="text"
              placeholder="e.g. Wireless Headphones, Festival Ticket, Sneakers"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Price (₹)</label>
            <div className="amount-hero-input compact">
              <span className="currency-prefix">₹</span>
              <input
                type="number"
                placeholder="1500"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className="amount-input"
                required
                min="10"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="afford-presets-row">
            <span className="presets-label">Student ideas:</span>
            <div className="presets-scroll">
              {PRESETS.map((p) => (
                <button
                  key={p.item}
                  type="button"
                  className="preset-chip"
                  onClick={() => handleApplyPreset(p)}
                >
                  <span>{p.icon}</span>
                  <span>{p.item}</span>
                  <span className="preset-price">₹{p.price}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary btn-block btn-lg mt-3">
            <span>Check Impact</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>

      {/* DYNAMIC RESULTS DISPLAY */}
      {checkedResult.active && (
        <div className="afford-results-section animate-scale-up">
          {/* Affordability Status Badge */}
          <div className={`afford-status-banner ${statusBadge.colorClass}`}>
            <span className="status-emoji">{statusBadge.emoji}</span>
            <h3 className="status-badge-text">{statusBadge.label}</h3>
          </div>

          {/* Impact Ledger Breakdown */}
          <div className="afford-ledger-card">
            <h4 className="ledger-title">Budget Impact Breakdown</h4>

            <div className="ledger-row">
              <span className="ledger-label">Current available money</span>
              <strong className="ledger-val">₹{availableMoney.toLocaleString('en-IN')}</strong>
            </div>

            <div className="ledger-row expense">
              <span className="ledger-label">Purchase: {checkedResult.item}</span>
              <strong className="ledger-val text-red">−₹{purchasePrice.toLocaleString('en-IN')}</strong>
            </div>

            <div className="ledger-row planned">
              <span className="ledger-label">Upcoming expenses</span>
              <strong className="ledger-val text-amber">−₹{upcomingExpenses.toLocaleString('en-IN')}</strong>
            </div>

            <div className="ledger-row savings">
              <span className="ledger-label">Savings commitment</span>
              <strong className="ledger-val text-teal">−₹{savingsCommitment.toLocaleString('en-IN')}</strong>
            </div>

            <div className="ledger-divider" />

            <div className="ledger-row total">
              <span className="ledger-label font-bold">Projected remaining</span>
              <strong className={`ledger-val font-bold ${projectedRemaining < 0 ? 'text-red' : 'text-teal'}`}>
                ₹{projectedRemaining.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          {/* Daily Allowance Comparison Cards */}
          <div className="allowance-comparison-grid">
            <div className="allowance-card before">
              <span className="allowance-card-eyebrow">BEFORE PURCHASE</span>
              <div className="allowance-daily-num">₹{currentSafeDaily}</div>
              <span className="allowance-sub">Safe daily spending</span>
            </div>

            <div className="allowance-arrow">→</div>

            <div className={`allowance-card after ${afterSafeDaily < 150 ? 'caution' : ''}`}>
              <span className="allowance-card-eyebrow">AFTER PURCHASE</span>
              <div className="allowance-daily-num">₹{afterSafeDaily}</div>
              <span className="allowance-sub">Safe daily spending</span>
            </div>
          </div>

          {/* Contextual Co-Pilot Explanation */}
          <div className="afford-explanation-card">
            <p className="explanation-body">{statusBadge.message}</p>
          </div>

          {/* Actions */}
          <div className="afford-actions-row">
            <button
              type="button"
              className="btn-primary flex-1 btn-lg"
              onClick={handleExecutePurchase}
            >
              Buy Anyway
            </button>
            <button
              type="button"
              className="btn-secondary flex-1 btn-lg"
              onClick={onMaybeLater}
            >
              Maybe Later
            </button>
          </div>

          {/* Responsible Financial Disclaimer */}
          <div className="afford-disclaimer-box">
            <AlertCircle size={14} className="text-muted" />
            <p>
              Calculations are estimates based on your own planned budget and entries, not professional financial advice.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
