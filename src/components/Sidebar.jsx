import React from 'react';
import Logo from './Logo';
import { 
  Home, 
  Receipt, 
  PieChart, 
  Target, 
  HelpCircle, 
  Sparkles, 
  Calendar, 
  RefreshCw, 
  Bot, 
  FileText, 
  User, 
  Settings,
  Plus
} from 'lucide-react';

export default function Sidebar({
  activeScreen,
  onSelectScreen,
  onOpenAddExpense,
  stats,
  user,
}) {
  const primaryLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'budgets', label: 'Budgets & Limits', icon: PieChart },
    { id: 'goals', label: 'Savings Goals', icon: Target },
    { id: 'afford', label: 'Can I Afford It?', icon: HelpCircle, highlight: true },
    { id: 'insights', label: 'Smart Insights', icon: Sparkles },
    { id: 'analytics', label: 'Where Did My Money Go?', icon: PieChart },
  ];

  const secondaryLinks = [
    { id: 'upcoming', label: 'Upcoming Expenses', icon: Calendar },
    { id: 'recurring', label: 'Recurring Subscriptions', icon: RefreshCw },
    { id: 'ai', label: 'MoneyLeft Assistant', icon: Bot },
    { id: 'report', label: 'October Report', icon: FileText },
    { id: 'profile', label: 'Student Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="desktop-sidebar">
      {/* Brand header */}
      <div className="sidebar-brand-container">
        <Logo size="medium" />
      </div>

      {/* Quick Add Expense button in sidebar */}
      <div className="sidebar-action-wrap">
        <button
          type="button"
          className="btn-primary btn-block sidebar-add-btn"
          onClick={onOpenAddExpense}
        >
          <Plus size={16} />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Primary navigation */}
      <nav className="sidebar-nav-section">
        <span className="nav-group-header">CORE SECTIONS</span>
        {primaryLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeScreen === link.id;
          return (
            <button
              key={link.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''} ${link.highlight ? 'highlight-pill' : ''}`}
              onClick={() => onSelectScreen(link.id)}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Secondary navigation */}
      <nav className="sidebar-nav-section mt-4">
        <span className="nav-group-header">FINANCIAL TOOLS</span>
        {secondaryLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeScreen === link.id;
          return (
            <button
              key={link.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectScreen(link.id)}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Student Profile snippet at bottom */}
      <div className="sidebar-footer">
        <div 
          className="sidebar-user-card"
          onClick={() => onSelectScreen('profile')}
        >
          <div className="sidebar-avatar">{user.avatar || 'C'}</div>
          <div className="sidebar-user-info">
            <strong>{user.name || 'Chayan'}</strong>
            <span>Student Plan • ₹12k/mo</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
