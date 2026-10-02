import React, { useState } from 'react';
import { ArrowLeft, Bell, Lock, Shield, Sparkles, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';

export default function SettingsScreen({ onBack, onResetData, onDeleteAccount }) {
  const [notifications, setNotifications] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <div className="settings-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-row">
        <button className="back-nav-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
        <h1 className="screen-title text-center flex-1">Settings</h1>
        <div style={{ width: 40 }} />
      </div>

      <div className="settings-sections-wrap">
        {/* Account & Security */}
        <div className="settings-group">
          <h3 className="settings-group-title">ACCOUNT & SECURITY</h3>
          <div className="settings-items-card">
            <div className="setting-toggle-row">
              <div>
                <strong>App Lock (Face ID / Fingerprint)</strong>
                <span>Require biometrics to open MoneyLeft</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${biometrics ? 'active' : ''}`}
                onClick={() => setBiometrics(!biometrics)}
              >
                <div className="switch-thumb" />
              </button>
            </div>

            <div className="setting-toggle-row">
              <div>
                <strong>Privacy Mode (Hide balances in public)</strong>
                <span>Mask ₹ figures on dashboard when tapped</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${privacyMode ? 'active' : ''}`}
                onClick={() => setPrivacyMode(!privacyMode)}
              >
                <div className="switch-thumb" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications & Insights */}
        <div className="settings-group">
          <h3 className="settings-group-title">NOTIFICATIONS & CO-PILOT</h3>
          <div className="settings-items-card">
            <div className="setting-toggle-row">
              <div>
                <strong>Safe-to-Spend Daily Digest</strong>
                <span>Receive morning notification with today's allowance</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${dailyDigest ? 'active' : ''}`}
                onClick={() => setDailyDigest(!dailyDigest)}
              >
                <div className="switch-thumb" />
              </button>
            </div>

            <div className="setting-toggle-row">
              <div>
                <strong>Overspending Warning Alerts</strong>
                <span>Notify if an expense exceeds 50% of daily safe limit</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${notifications ? 'active' : ''}`}
                onClick={() => setNotifications(!notifications)}
              >
                <div className="switch-thumb" />
              </button>
            </div>

            <div className="setting-toggle-row">
              <div>
                <strong>AI Behavioral Suggestions</strong>
                <span>Analyze micro-spending patterns and college expenses</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${aiSuggestions ? 'active' : ''}`}
                onClick={() => setAiSuggestions(!aiSuggestions)}
              >
                <div className="switch-thumb" />
              </button>
            </div>
          </div>
        </div>

        {/* Currency & Envelopes */}
        <div className="settings-group">
          <h3 className="settings-group-title">CURRENCY & FORMATTING</h3>
          <div className="settings-items-card">
            <div className="setting-row-static">
              <div>
                <strong>Primary Currency</strong>
                <span>Indian Rupee (₹) • Lakh/Crore system</span>
              </div>
              <span className="setting-badge">INR (₹)</span>
            </div>

            <div className="setting-row-static">
              <div>
                <strong>Default Envelopes</strong>
                <span>Food, Transport, Hostel, Shopping, Bills</span>
              </div>
              <span className="setting-badge">10 active</span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-group danger-zone">
          <h3 className="settings-group-title text-danger">DANGER ZONE</h3>
          <div className="settings-items-card danger">
            <div className="danger-action-row">
              <div>
                <strong>Reset to Sample Student Data</strong>
                <span>Restore default ₹12,000 allowance, envelopes, and bike goal</span>
              </div>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={onResetData}
              >
                <RefreshCw size={14} />
                <span>Reset Demo</span>
              </button>
            </div>

            <div className="danger-action-row">
              <div>
                <strong>Delete All Financial Data</strong>
                <span>Permanently wipe transactions, budgets, and savings goals</span>
              </div>
              <button
                type="button"
                className="btn-danger-outline btn-sm"
                onClick={() => {
                  if (confirm('Are you sure you want to delete all stored financial records?')) {
                    onResetData();
                  }
                }}
              >
                <Trash2 size={14} />
                <span>Delete All Data</span>
              </button>
            </div>

            <div className="danger-action-row">
              <div>
                <strong>Delete Account</strong>
                <span>Permanently close student co-pilot account</span>
              </div>
              <button
                type="button"
                className="btn-danger btn-sm"
                onClick={onDeleteAccount}
              >
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
