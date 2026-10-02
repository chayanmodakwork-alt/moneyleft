import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, PieChart } from 'lucide-react';

export default function AnalyticsScreen({ analyticsData }) {
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' | 'weekly' | 'daily'

  const categories = analyticsData?.categories || [
    { name: 'Food', amount: 3180, percentage: 38, icon: '🍔', color: '#0D9488' },
    { name: 'Shopping', amount: 1850, percentage: 22, icon: '🛍️', color: '#F59E0B' },
    { name: 'Transport', amount: 1420, percentage: 17, icon: '🚕', color: '#3B82F6' },
    { name: 'Education', amount: 750, percentage: 9, icon: '🎓', color: '#10B981' },
    { name: 'Entertainment', amount: 620, percentage: 7, icon: '🎮', color: '#8B5CF6' },
    { name: 'Subscriptions', amount: 490, percentage: 6, icon: '📺', color: '#EC4899' },
    { name: 'Other', amount: 110, percentage: 1, icon: '📦', color: '#64748B' },
  ];

  const total = analyticsData?.totalSpending || 8420;

  // Weekly breakdown
  const weekly = [
    { week: 'Week 1', days: 'Oct 1 - Oct 7', amount: 1840, pct: 68 },
    { week: 'Week 2', days: 'Oct 8 - Oct 14', amount: 2150, pct: 80 },
    { week: 'Week 3', days: 'Oct 15 - Oct 21', amount: 2680, pct: 100 },
    { week: 'Week 4', days: 'Oct 22 - Oct 31', amount: 1750, pct: 65, projected: true },
  ];

  // Daily points (last 7 days)
  const dailyPoints = [
    { day: 'Sat', amount: 240, height: 45 },
    { day: 'Sun', amount: 480, height: 85 },
    { day: 'Mon', amount: 180, height: 35 },
    { day: 'Tue', amount: 320, height: 60 },
    { day: 'Wed', amount: 150, height: 30 },
    { day: 'Thu', amount: 699, height: 95 },
    { day: 'Today', amount: 420, height: 75 },
  ];

  return (
    <div className="analytics-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-block">
        <span className="screen-pretitle">Deep Dive</span>
        <h1 className="screen-title">Where did my money go?</h1>
        <p className="screen-subtitle">Clean breakdown of every rupee spent this semester.</p>
      </div>

      {/* Hero Total Spending Card */}
      <div className="analytics-hero-card">
        <div className="analytics-hero-top">
          <div>
            <span className="hero-eyebrow">TOTAL SPENDING (OCTOBER)</span>
            <div className="analytics-hero-amount">
              <span className="currency-symbol">₹</span>
              <span>{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="comparison-pill positive">
            <TrendingUp size={15} />
            <span>+14% vs Sep</span>
          </div>
        </div>

        <p className="analytics-hero-sub">
          Daily spending averaged <strong>₹271 / day</strong> across all verified categories.
        </p>

        {/* Stacked Proportional Bar */}
        <div className="analytics-multi-bar">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="multi-bar-seg"
              style={{
                width: `${cat.percentage}%`,
                backgroundColor: cat.color,
              }}
              title={`${cat.name}: ₹${cat.amount} (${cat.percentage}%)`}
            />
          ))}
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="analytics-view-tabs">
        <button
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={`tab-btn ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly Pace
        </button>
        <button
          className={`tab-btn ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          Daily Graph
        </button>
      </div>

      {/* Tab 1: Category Breakdown List */}
      {activeTab === 'categories' && (
        <div className="category-breakdown-list">
          {categories.map((cat) => (
            <div key={cat.name} className="cat-breakdown-row">
              <div className="cat-row-left">
                <span className="cat-emoji">{cat.icon}</span>
                <div className="cat-info">
                  <strong className="cat-name">{cat.name}</strong>
                  <div className="cat-progress-line">
                    <div
                      className="cat-progress-fill"
                      style={{
                        width: `${cat.percentage}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="cat-row-right">
                <span className="cat-amount">₹{cat.amount.toLocaleString('en-IN')}</span>
                <span className="cat-pct">{cat.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Weekly Spending Graph */}
      {activeTab === 'weekly' && (
        <div className="weekly-chart-card">
          <div className="chart-header">
            <h4>Weekly Pace Distribution</h4>
            <span className="text-muted text-xs">Target cap: ₹2,200/wk</span>
          </div>

          <div className="weekly-bars-container">
            {weekly.map((wk) => (
              <div key={wk.week} className="weekly-bar-row">
                <div className="weekly-bar-info">
                  <strong>{wk.week}</strong>
                  <span>{wk.days}</span>
                </div>
                <div className="weekly-bar-track">
                  <div
                    className={`weekly-bar-fill ${wk.projected ? 'projected' : ''}`}
                    style={{ width: `${wk.pct}%` }}
                  />
                </div>
                <div className="weekly-bar-val">
                  ₹{wk.amount.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Daily Spending Graph */}
      {activeTab === 'daily' && (
        <div className="daily-chart-card">
          <div className="chart-header">
            <h4>Recent 7-Day Spending Curve</h4>
            <span className="text-teal font-semibold text-xs">Safe avg: ₹353</span>
          </div>

          <div className="daily-bars-grid">
            {dailyPoints.map((pt) => (
              <div key={pt.day} className="daily-col">
                <div className="daily-bar-container">
                  <div
                    className={`daily-bar ${pt.amount > 353 ? 'spike' : 'normal'}`}
                    style={{ height: `${pt.height}%` }}
                    title={`₹${pt.amount}`}
                  />
                </div>
                <span className="daily-day-label">{pt.day}</span>
                <span className="daily-amount-label">₹{pt.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Previous Month Comparison Card */}
      <div className="prev-month-comp-card mt-4">
        <h4 className="card-subheading">PREVIOUS-MONTH COMPARISON (SEP VS OCT)</h4>
        <div className="comp-stats-row">
          <div className="comp-item">
            <span>September Spent</span>
            <strong>₹7,385</strong>
          </div>
          <div className="comp-item">
            <span>October Spent</span>
            <strong>₹8,420</strong>
          </div>
          <div className="comp-item">
            <span>Net Change</span>
            <strong className="text-amber">+₹1,035 (+14%)</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
