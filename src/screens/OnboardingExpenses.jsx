import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const SPEND_CATEGORIES = [
  { id: 'Food', label: 'Food', icon: '🍔', desc: 'Canteen, Zomato, mess' },
  { id: 'Transport', label: 'Transport', icon: '🚕', desc: 'Auto, metro, bus, cab' },
  { id: 'Hostel', label: 'Hostel', icon: '🏠', desc: 'Rent, laundry, room' },
  { id: 'Mobile', label: 'Mobile', icon: '📱', desc: '5G recharge, data packs' },
  { id: 'College', label: 'College', icon: '🎓', desc: 'Books, xerox, lab fees' },
  { id: 'Shopping', label: 'Shopping', icon: '🛍️', desc: 'Clothes, tech accessories' },
  { id: 'Entertainment', label: 'Entertainment', icon: '🎮', desc: 'Movies, gaming, outings' },
  { id: 'Subscriptions', label: 'Subscriptions', icon: '📺', desc: 'Netflix, Spotify, Prime' },
  { id: 'Health', label: 'Health', icon: '💊', desc: 'Meds, gym, wellness' },
  { id: 'Other', label: 'Other', icon: '✨', desc: 'Miscellaneous spends' },
];

export default function OnboardingExpenses({ onNext, onBack }) {
  const [selected, setSelected] = useState(['Food', 'Transport', 'Hostel', 'Shopping', 'Subscriptions']);

  const toggleCategory = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    onNext({ selectedCategories: selected });
  };

  return (
    <div className="onboarding-screen">
      <div className="onboarding-container">
        {/* Top Header & Progress */}
        <div className="onboarding-nav-bar">
          <button className="onboarding-back-btn" onClick={onBack}>
            <ArrowLeft size={18} />
          </button>
          <div className="onboarding-progress-track">
            <div className="onboarding-progress-bar" style={{ width: '66%' }} />
          </div>
          <span className="step-counter">2 of 3</span>
        </div>

        <div className="onboarding-content">
          <span className="onboarding-badge">Step 2 — Categories</span>
          <h2 className="onboarding-title">What do you usually spend on?</h2>
          <p className="onboarding-desc">
            Select the categories that apply to your college lifestyle. We’ll auto-build your baseline envelopes.
          </p>

          <div className="category-select-grid">
            {SPEND_CATEGORIES.map((cat) => {
              const isSelected = selected.includes(cat.id);
              return (
                <div
                  key={cat.id}
                  className={`category-select-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleCategory(cat.id)}
                >
                  <div className="category-select-top">
                    <span className="cat-icon">{cat.icon}</span>
                    <div className={`selection-checkbox ${isSelected ? 'checked' : ''}`}>
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>
                  <strong className="cat-name">{cat.label}</strong>
                  <span className="cat-desc">{cat.desc}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-auto pt-4">
            <button
              type="button"
              className="btn-primary btn-block btn-lg"
              onClick={handleContinue}
              disabled={selected.length === 0}
            >
              <span>Continue ({selected.length} selected)</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
