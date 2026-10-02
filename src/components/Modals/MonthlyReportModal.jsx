import React from 'react';
import { X, Award, TrendingUp, TrendingDown, ArrowUpRight, Share2, Download, CheckCircle2 } from 'lucide-react';

export default function MonthlyReportModal({ isOpen, onClose, reportData }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container report-modal-wide" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-pretitle">Monthly Financial Review</span>
            <h2 className="modal-title">October Money Report</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="report-modal-body">
          {/* Executive Score Card */}
          <div className="report-score-banner">
            <div className="report-badge-icon">
              <Award size={32} />
            </div>
            <div className="report-score-text">
              <h3>Financial Health Score: 84 / 100</h3>
              <p>“You stayed within your overall plan, but food and shopping spending increased.”</p>
            </div>
          </div>

          {/* 4 Core Financial Numbers */}
          <div className="report-stats-grid">
            <div className="report-stat-card">
              <span className="stat-label">Money Received</span>
              <strong className="stat-amount text-accent">₹12,000</strong>
              <small className="stat-note">Regular monthly allowance</small>
            </div>
            <div className="report-stat-card">
              <span className="stat-label">Total Spent</span>
              <strong className="stat-amount">₹8,420</strong>
              <small className="stat-note">Across 38 transactions</small>
            </div>
            <div className="report-stat-card">
              <span className="stat-label">Saved</span>
              <strong className="stat-amount text-success">₹2,000</strong>
              <small className="stat-note">Bike + Laptop goals</small>
            </div>
            <div className="report-stat-card">
              <span className="stat-label">Remaining</span>
              <strong className="stat-amount">₹1,580</strong>
              <small className="stat-note">Surplus carried forward</small>
            </div>
          </div>

          {/* Highlights & Comparisons */}
          <div className="report-highlights-section">
            <h4 className="section-subtitle">Key Highlights</h4>
            <div className="report-highlight-pills">
              <div className="highlight-pill">
                <span className="pill-title">Top Category</span>
                <span className="pill-val">🍔 Food — ₹3,180 (38%)</span>
              </div>
              <div className="highlight-pill">
                <span className="pill-title">Largest Purchase</span>
                <span className="pill-val">🛍️ ₹1,200 — Shopping (Electronics)</span>
              </div>
            </div>

            <h4 className="section-subtitle mt-4">Compared with September</h4>
            <div className="report-comparison-grid">
              <div className="comparison-card">
                <div className="comp-left">
                  <span>Food</span>
                  <strong>+18%</strong>
                </div>
                <div className="comp-badge up">
                  <TrendingUp size={16} /> Higher delivery orders
                </div>
              </div>

              <div className="comparison-card">
                <div className="comp-left">
                  <span>Transport</span>
                  <strong>−12%</strong>
                </div>
                <div className="comp-badge down">
                  <TrendingDown size={16} /> Saved ₹250 walking
                </div>
              </div>

              <div className="comparison-card">
                <div className="comp-left">
                  <span>Savings</span>
                  <strong>+₹500</strong>
                </div>
                <div className="comp-badge positive">
                  <CheckCircle2 size={16} /> Exceeded monthly target
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="modal-actions-row mt-4">
            <button
              type="button"
              className="btn-secondary flex-1"
              onClick={() => alert('Report link copied to clipboard!')}
            >
              <Share2 size={16} /> Share Report
            </button>
            <button
              type="button"
              className="btn-primary flex-1"
              onClick={() => alert('PDF export generated for student records.')}
            >
              <Download size={16} /> Download Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
