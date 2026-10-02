import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function TransactionsScreen({
  transactions,
  onOpenAddExpense,
  onSelectTransaction,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'income' | 'expense'
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Available categories extracted from transactions
  const categories = useMemo(() => {
    const set = new Set(transactions.map((tx) => tx.category));
    return ['all', ...Array.from(set)];
  }, [transactions]);

  // Filtered transactions
  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tx.notes && tx.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType =
        typeFilter === 'all' ? true : tx.type === typeFilter;

      const matchesCategory =
        categoryFilter === 'all' ? true : tx.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchQuery, typeFilter, categoryFilter]);

  // Group by date key (Today, Yesterday, Earlier...)
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((tx) => {
      const key = tx.dateKey || 'Earlier';
      if (!groups[key]) groups[key] = [];
      groups[key].push(tx);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="transactions-screen animate-fade-in">
      {/* Top Header */}
      <div className="screen-header-row">
        <div>
          <span className="screen-pretitle">Account Activity</span>
          <h1 className="screen-title">Transactions</h1>
        </div>
        <button
          type="button"
          className="btn-primary btn-sm"
          onClick={onOpenAddExpense}
        >
          <Plus size={16} />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="tx-search-container">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search transactions, merchants, notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => setSearchQuery('')}
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="tx-filters-bar">
        <div className="filter-pill-group">
          <button
            className={`filter-tab ${typeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setTypeFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-tab ${typeFilter === 'expense' ? 'active' : ''}`}
            onClick={() => setTypeFilter('expense')}
          >
            Expenses
          </button>
          <button
            className={`filter-tab ${typeFilter === 'income' ? 'active' : ''}`}
            onClick={() => setTypeFilter('income')}
          >
            Income
          </button>
        </div>

        {/* Category Dropdown */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="category-dropdown-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Grouped Transaction Lists */}
      <div className="tx-grouped-container">
        {Object.keys(grouped).length === 0 ? (
          <div className="tx-empty-state">
            <span className="empty-icon">🔍</span>
            <h3>No transactions found</h3>
            <p>Try clearing your search or filters to see past activity.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([dateLabel, items]) => (
            <div key={dateLabel} className="tx-date-group">
              <div className="tx-group-header">
                <span className="tx-group-title">{dateLabel.toUpperCase()}</span>
                <span className="tx-group-count">{items.length} items</span>
              </div>

              <div className="tx-card-list">
                {items.map((tx) => (
                  <div
                    key={tx.id}
                    className="tx-item-row clickable"
                    onClick={() => onSelectTransaction(tx)}
                  >
                    <div className={`tx-icon-bubble ${tx.type}`}>
                      {tx.icon || (tx.type === 'income' ? '💰' : '💸')}
                    </div>
                    <div className="tx-meta-col">
                      <span className="tx-merchant-name">{tx.merchant}</span>
                      <div className="tx-tags-row">
                        <span className="tx-category-badge">{tx.category}</span>
                        {tx.paymentMethod && (
                          <span className="tx-payment-tag">• {tx.paymentMethod}</span>
                        )}
                      </div>
                    </div>
                    <div className="tx-amount-col">
                      <span className={`tx-amt-val ${tx.type}`}>
                        {tx.type === 'income' ? '+' : '−'}₹
                        {tx.amount.toLocaleString('en-IN')}
                      </span>
                      <span className="tx-time-sub">{tx.date.split(',')[1] || tx.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
