import React, { useState } from 'react';
import { Smartphone, Monitor, ChevronDown, Layers, Sparkles } from 'lucide-react';

const SCREEN_DIRECTORY = [
  { id: 'welcome', num: '1', title: 'Screen 1 — Welcome / Landing' },
  { id: 'auth', num: '2', title: 'Screen 2 — Sign Up / Login' },
  { id: 'onboarding-money', num: '3', title: 'Screen 3 — Onboarding: Money' },
  { id: 'onboarding-expenses', num: '4', title: 'Screen 4 — Onboarding: Expenses' },
  { id: 'onboarding-goal', num: '5', title: 'Screen 5 — Onboarding: Savings Goal' },
  { id: 'dashboard', num: '6', title: 'Screen 6 — Main Dashboard' },
  { id: 'add-expense-preview', num: '7', title: 'Screen 7 — Add Expense' },
  { id: 'transactions', num: '8', title: 'Screen 8 — Transactions' },
  { id: 'tx-details-preview', num: '9', title: 'Screen 9 — Transaction Details' },
  { id: 'budgets', num: '10', title: 'Screen 10 — Budgets' },
  { id: 'budget-detail-preview', num: '11', title: 'Screen 11 — Budget Detail' },
  { id: 'goals', num: '12', title: 'Screen 12 — Savings Goals' },
  { id: 'create-goal-preview', num: '13', title: 'Screen 13 — Create Goal' },
  { id: 'insights', num: '14', title: 'Screen 14 — Insights' },
  { id: 'analytics', num: '15', title: 'Screen 15 — Spending Analytics' },
  { id: 'afford', num: '16', title: 'Screen 16 — Can I Afford It?' },
  { id: 'upcoming', num: '17', title: 'Screen 17 — Upcoming Expenses' },
  { id: 'recurring', num: '18', title: 'Screen 18 — Recurring Expenses' },
  { id: 'ai', num: '19', title: 'Screen 19 — AI Financial Assistant' },
  { id: 'report', num: '20', title: 'Screen 20 — Monthly Report' },
  { id: 'profile', num: '21', title: 'Screen 21 — Profile' },
  { id: 'settings', num: '22', title: 'Screen 22 — Settings' },
];

export default function DeviceFrame({
  children,
  currentScreen,
  onScreenChange,
  isMobileFrame,
  setIsMobileFrame,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentMeta =
    SCREEN_DIRECTORY.find((s) => s.id === currentScreen) ||
    SCREEN_DIRECTORY[5]; // Default to Dashboard

  return (
    <div className={`prototype-environment ${isMobileFrame ? 'frame-mode' : 'fluid-mode'}`}>
      {/* Top Demo Bar */}
      <header className="demo-top-bar">
        <div className="demo-brand-left">
          <div className="demo-badge">MoneyLeft Prototype</div>
          <span className="demo-tagline hidden-mobile">
            Know your money. Before it’s gone.
          </span>
        </div>

        {/* Screen Navigator Jump Dropdown */}
        <div className="screen-navigator-container">
          <div
            className="navigator-pill"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Layers size={14} className="text-teal" />
            <span className="navigator-label">{currentMeta.title}</span>
            <ChevronDown size={14} className={`nav-arrow ${dropdownOpen ? 'rotated' : ''}`} />
          </div>

          {dropdownOpen && (
            <div className="navigator-menu-dropdown animate-scale-up">
              <div className="dropdown-header">
                <span>Jump to any screen (1 to 22)</span>
                <span className="text-xs text-muted">All flows connected</span>
              </div>
              <div className="dropdown-scroll-list">
                {SCREEN_DIRECTORY.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`dropdown-item ${s.id === currentScreen ? 'active' : ''}`}
                    onClick={() => {
                      onScreenChange(s.id);
                      setDropdownOpen(false);
                    }}
                  >
                    <span className="item-num">{s.num}</span>
                    <span className="item-title">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Viewport Mode Switcher */}
        <div className="view-mode-toggle">
          <button
            type="button"
            className={`mode-btn ${isMobileFrame ? 'active' : ''}`}
            onClick={() => setIsMobileFrame(true)}
            title="Mobile View (iPhone 16 Pro mockup)"
          >
            <Smartphone size={16} />
            <span className="hidden-mobile">Mobile View</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${!isMobileFrame ? 'active' : ''}`}
            onClick={() => setIsMobileFrame(false)}
            title="Desktop / Fullscreen View"
          >
            <Monitor size={16} />
            <span className="hidden-mobile">Desktop / Full</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="prototype-stage">
        {isMobileFrame ? (
          <div className="mobile-device-shell">
            {/* Realistic iPhone Bezel & Titanium Trim */}
            <div className="device-outer-rim">
              <div className="device-screen-bezel">
                {/* Status Bar */}
                <div className="device-status-bar">
                  <span className="device-clock">11:34</span>
                  <div className="device-dynamic-island">
                    <div className="island-camera" />
                  </div>
                  <div className="device-status-icons">
                    <svg width="15" height="11" viewBox="0 0 17 12" fill="currentColor">
                      <path d="M1 9.5C1 8.67 1.67 8 2.5 8H3.5C4.33 8 5 8.67 5 9.5V11H1V9.5ZM6.5 6.5C6.5 5.67 7.17 5 8 5H9C9.83 5 10.5 5.67 10.5 6.5V11H6.5V6.5ZM12 3.5C12 2.67 12.67 2 13.5 2H14.5C15.33 2 16 2.67 16 3.5V11H12V3.5Z" />
                    </svg>
                    <span className="device-5g">5G</span>
                    <div className="device-battery">
                      <div className="battery-level" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>

                {/* Mobile Viewport Body */}
                <div className="device-viewport-content">
                  {children}
                </div>

                {/* Home Gesture Bar */}
                <div className="device-home-indicator">
                  <div className="home-bar" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="fluid-desktop-canvas">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
