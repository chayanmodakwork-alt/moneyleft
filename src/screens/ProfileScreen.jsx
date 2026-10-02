import React from 'react';
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Download, 
  Trash2, 
  LogOut, 
  ChevronRight, 
  GraduationCap, 
  DollarSign, 
  Clock, 
  Lock 
} from 'lucide-react';

export default function ProfileScreen({
  user,
  onNavigateSettings,
  onResetData,
  onLogout,
  onRestartOnboarding,
}) {
  return (
    <div className="profile-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-block">
        <span className="screen-pretitle">Account & Lifestyle</span>
        <h1 className="screen-title">Profile</h1>
      </div>

      {/* Student Profile Identity Card */}
      <div className="student-profile-hero">
        <div className="profile-avatar-large">
          <span>{user.avatar || 'C'}</span>
        </div>
        <div className="profile-identity-info">
          <h2 className="profile-name">{user.name || 'Chayan'}</h2>
          <div className="profile-role-badge">
            <GraduationCap size={14} />
            <span>Student (Engineering & Design)</span>
          </div>
          <span className="profile-email">{user.email || 'chayan@campus.edu.in'}</span>
        </div>
      </div>

      {/* Financial Parameters Card */}
      <div className="profile-card-group">
        <h3 className="section-title">FINANCIAL SETTINGS</h3>
        <div className="profile-settings-list">
          <div className="profile-setting-item">
            <div className="setting-item-left">
              <span className="setting-icon">💰</span>
              <div>
                <strong>Monthly income</strong>
                <span>Calculated budget baseline</span>
              </div>
            </div>
            <span className="setting-val-pill">₹{(user.income || 12000).toLocaleString('en-IN')}</span>
          </div>

          <div className="profile-setting-item">
            <div className="setting-item-left">
              <span className="setting-icon">📅</span>
              <div>
                <strong>Income frequency</strong>
                <span>Cadence of pocket allowance</span>
              </div>
            </div>
            <span className="setting-val-pill">{user.incomeFrequency || 'Monthly'}</span>
          </div>

          <div className="profile-setting-item">
            <div className="setting-item-left">
              <span className="setting-icon">🛟</span>
              <div>
                <strong>Emergency reserve</strong>
                <span>Protected buffer untouchable</span>
              </div>
            </div>
            <span className="setting-val-pill">₹{(user.emergencyReserve || 2000).toLocaleString('en-IN')}</span>
          </div>

          <div className="profile-setting-item">
            <div className="setting-item-left">
              <span className="setting-icon">🇮🇳</span>
              <div>
                <strong>Currency</strong>
                <span>Display formatting</span>
              </div>
            </div>
            <span className="setting-val-pill">INR (₹)</span>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="profile-card-group">
        <h3 className="section-title">PREFERENCES</h3>
        <div className="profile-nav-links">
          <button 
            type="button" 
            className="profile-link-row"
            onClick={onNavigateSettings}
          >
            <div className="link-left">
              <Bell size={18} className="link-icon" />
              <span>Notifications & Spending Alerts</span>
            </div>
            <ChevronRight size={18} className="link-arrow" />
          </button>

          <button 
            type="button" 
            className="profile-link-row"
            onClick={onNavigateSettings}
          >
            <div className="link-left">
              <Shield size={18} className="link-icon" />
              <span>Privacy & Anonymous Mode</span>
            </div>
            <ChevronRight size={18} className="link-arrow" />
          </button>

          <button 
            type="button" 
            className="profile-link-row"
            onClick={onNavigateSettings}
          >
            <div className="link-left">
              <Lock size={18} className="link-icon" />
              <span>Security & App Lock (Biometrics)</span>
            </div>
            <ChevronRight size={18} className="link-arrow" />
          </button>

          <button 
            type="button" 
            className="profile-link-row"
            onClick={() => alert('Exporting student financial ledger as CSV / JSON...')}
          >
            <div className="link-left">
              <Download size={18} className="link-icon" />
              <span>Data Export (CSV / JSON)</span>
            </div>
            <ChevronRight size={18} className="link-arrow" />
          </button>

          <button 
            type="button" 
            className="profile-link-row"
            onClick={onRestartOnboarding}
          >
            <div className="link-left">
              <Settings size={18} className="link-icon" />
              <span>Re-run Onboarding Setup</span>
            </div>
            <ChevronRight size={18} className="link-arrow" />
          </button>
        </div>
      </div>

      {/* Data Management & Logout */}
      <div className="profile-actions-bottom">
        <button
          type="button"
          className="btn-danger-outline btn-block"
          onClick={onResetData}
        >
          <Trash2 size={16} />
          <span>Delete Financial Data</span>
        </button>

        <button
          type="button"
          className="btn-secondary btn-block mt-2"
          onClick={onLogout}
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
