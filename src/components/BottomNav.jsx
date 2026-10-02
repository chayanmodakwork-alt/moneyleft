import React from 'react';
import { 
  Home, 
  Receipt, 
  PieChart, 
  Target, 
  HelpCircle, 
  Sparkles, 
  MoreHorizontal 
} from 'lucide-react';

export default function BottomNav({ activeScreen, onSelectScreen, onOpenMore }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Activity', icon: Receipt },
    { id: 'budgets', label: 'Budgets', icon: PieChart },
    { id: 'afford', label: 'Afford It?', icon: HelpCircle, highlight: true },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'insights', label: 'Insights', icon: Sparkles },
    { id: 'more', label: 'More', icon: MoreHorizontal, isAction: true },
  ];

  return (
    <nav className="mobile-bottom-nav">
      <div className="nav-items-wrapper">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`nav-tab-btn ${isActive ? 'active' : ''} ${item.highlight ? 'highlight-tab' : ''}`}
              onClick={() => {
                if (item.isAction) {
                  onOpenMore();
                } else {
                  onSelectScreen(item.id);
                }
              }}
            >
              <div className="nav-icon-wrap">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="nav-label">{item.label}</span>
              {isActive && <div className="active-dot-pill" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
