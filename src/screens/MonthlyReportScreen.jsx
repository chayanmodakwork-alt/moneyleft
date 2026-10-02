import React from 'react';
import { Award, TrendingUp, TrendingDown, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

export default function MonthlyReportScreen({
  reportData,
  onOpenFullReport,
}) {
  return (
    <div className="report-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-block">
        <span className="screen-pretitle">Monthly Summary</span>
        <h1 className="screen-title">October Money Report</h1>
        <p className="screen-subtitle">Comprehensive financial audit of your student expenditures.</p>
      </div>

      {/* Hero Metric Cards */}
      <div className="report-primary-metrics-grid">
        <div className="report-metric-card">
          <span className="report-metric-label">Money received</span>
          <strong className="report-metric-val text-teal">₹12,000</strong>
          <span className="report-metric-sub">Monthly allowance</span>
        </div>

        <div className="report-metric-card">
          <span className="report-metric-label">Total spent</span>
          <strong className="report-metric-val">₹8,420</strong>
          <span className="report-metric-sub">Across 38 orders</span>
        </div>

        <div className="report-metric-card">
          <span className="report-metric-label">Saved</span>
          <strong className="report-metric-val text-success">₹2,000</strong>
          <span className="report-metric-sub">Goal allocations</span>
        </div>

        <div className="report-metric-card">
          <span className="report-metric-label">Remaining</span>
          <strong className="report-metric-val">₹1,580</strong>
          <span className="report-metric-sub">Net surplus</span>
        </div>
      </div>

      {/* Top Highlights Box */}
      <div className="report-card-section">
        <h3 className="section-title">KEY HIGHLIGHTS</h3>
        <div className="report-highlights-list">
          <div className="report-highlight-row">
            <span className="highlight-tag">Top category</span>
            <strong className="highlight-value">Food — ₹3,180</strong>
          </div>

          <div className="report-highlight-row">
            <span className="highlight-tag">Largest purchase</span>
            <strong className="highlight-value">₹1,200 — Shopping</strong>
          </div>
        </div>
      </div>

      {/* Month-over-Month Comparison */}
      <div className="report-card-section">
        <h3 className="section-title">COMPARED WITH SEPTEMBER</h3>
        <div className="report-mom-grid">
          <div className="mom-card">
            <div className="mom-top">
              <span className="mom-name">Food</span>
              <strong className="mom-stat text-amber">+18%</strong>
            </div>
            <div className="mom-badge up">
              <TrendingUp size={14} /> Increased deliveries
            </div>
          </div>

          <div className="mom-card">
            <div className="mom-top">
              <span className="mom-name">Transport</span>
              <strong className="mom-stat text-success">−12%</strong>
            </div>
            <div className="mom-badge down">
              <TrendingDown size={14} /> Reduced auto rides
            </div>
          </div>

          <div className="mom-card">
            <div className="mom-top">
              <span className="mom-name">Savings</span>
              <strong className="mom-stat text-teal">+₹500</strong>
            </div>
            <div className="mom-badge positive">
              <CheckCircle2 size={14} /> Reached milestone
            </div>
          </div>
        </div>
      </div>

      {/* One-Sentence Synthesis */}
      <div className="report-sentence-card">
        <div className="sentence-icon">
          <Award size={24} className="text-teal" />
        </div>
        <div className="sentence-content">
          <span className="sentence-eyebrow">YOUR MONTH IN ONE SENTENCE</span>
          <p className="sentence-text">
            “You stayed within your overall plan, but food and shopping spending increased.”
          </p>
        </div>
      </div>

      {/* Full Report Action Button */}
      <div className="report-cta-container">
        <button
          type="button"
          className="btn-primary btn-block btn-lg"
          onClick={onOpenFullReport}
        >
          <FileText size={18} />
          <span>View Full Report</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
