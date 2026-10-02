import React, { useState } from 'react';
import { Send, Bot, Sparkles, User, ArrowRight } from 'lucide-react';

export default function AiAssistantScreen({ stats, budgets, transactions }) {
  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'user',
      text: 'Why did I spend more this month?',
      time: '10:42 AM',
    },
    {
      id: 'm-2',
      sender: 'assistant',
      text: 'You spent ₹1,240 more than last month. The largest increase came from food delivery and shopping.',
      time: '10:42 AM',
      metrics: [
        { label: 'Net Increase', val: '+₹1,240', tag: 'warning' },
        { label: 'Food Surge', val: '+₹680', tag: 'warning' },
        { label: 'Shopping Surplus', val: '+₹560', tag: 'warning' },
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState('');

  const suggestedPrompts = [
    'How much did I spend on food?',
    'Why am I spending more this month?',
    'Can I afford ₹2,000 shoes?',
    'How much can I spend today?',
    'How much did I save last month?',
  ];

  const handleSend = (textToSend) => {
    const q = (textToSend || inputVal).trim();
    if (!q) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      time: 'Just now',
    };

    // Calculate smart responses based on actual data
    let botReply = '';
    let metrics = null;

    const qLower = q.toLowerCase();

    if (qLower.includes('food')) {
      const foodBudget = budgets.find((b) => b.category === 'Food');
      const spent = foodBudget ? foodBudget.spent : 2450;
      const limit = foodBudget ? foodBudget.limit : 3000;
      botReply = `You have spent ₹${spent.toLocaleString('en-IN')} on Food out of your ₹${limit.toLocaleString('en-IN')} envelope this month. You have ₹${(limit - spent).toLocaleString('en-IN')} remaining.`;
      metrics = [
        { label: 'Food Spent', val: `₹${spent}`, tag: 'info' },
        { label: 'Envelope Limit', val: `₹${limit}`, tag: 'info' },
        { label: 'Pace', val: '₹82/day', tag: 'neutral' },
      ];
    } else if (qLower.includes('spend today') || qLower.includes('safe to spend')) {
      const safe = stats.safeToSpendToday || 353;
      botReply = `Based on your ₹7,420 remaining balance, upcoming ₹1,800 commitments, and savings goal, you can safely spend ₹${safe} today.`;
      metrics = [
        { label: 'Safe Daily', val: `₹${safe}`, tag: 'success' },
        { label: 'Days Left', val: '21 days', tag: 'neutral' },
      ];
    } else if (qLower.includes('shoes') || qLower.includes('afford') || qLower.includes('2,000') || qLower.includes('2000')) {
      botReply = `Buying ₹2,000 shoes would reduce your safe daily allowance from ₹353 to ₹115 for the rest of October. You can afford it with caution, but it will leave little room for unexpected canteen expenses.`;
      metrics = [
        { label: 'Daily Before', val: '₹353', tag: 'success' },
        { label: 'Daily After', val: '₹115', tag: 'warning' },
      ];
    } else if (qLower.includes('save') || qLower.includes('saved')) {
      botReply = `You saved ₹2,000 last month, which was distributed into your New Bike (₹1,500) and Laptop Fund (₹500). That puts you at +₹500 ahead of your August pace.`;
      metrics = [
        { label: 'Last Month Saved', val: '₹2,000', tag: 'success' },
        { label: 'Progress', val: '18.75%', tag: 'info' },
      ];
    } else if (qLower.includes('why') || qLower.includes('more this month')) {
      botReply = `You spent ₹1,240 more than last month. The largest increase came from food delivery (Zomato) and tech shopping on Amazon.`;
      metrics = [
        { label: 'Total Surge', val: '+₹1,240', tag: 'warning' },
        { label: 'Largest Category', val: 'Food (38%)', tag: 'warning' },
      ];
    } else {
      botReply = `Based on your records: You have ₹7,420 Money Left, 21 days remaining, and ₹353/day safe spending pace. Your overall status is 🟢 On Track.`;
      metrics = [
        { label: 'Money Left', val: '₹7,420', tag: 'success' },
        { label: 'Status', val: 'On Track', tag: 'success' },
      ];
    }

    const botMsg = {
      id: `b-${Date.now() + 1}`,
      sender: 'assistant',
      text: botReply,
      time: 'Just now',
      metrics,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputVal('');
  };

  return (
    <div className="ai-screen animate-fade-in">
      {/* Header */}
      <div className="screen-header-block">
        <div className="ai-header-badge">
          <Bot size={16} className="text-teal" />
          <span>Real-time Financial Intelligence</span>
        </div>
        <h1 className="screen-title">MoneyLeft Assistant</h1>
        <p className="screen-subtitle">Ask me about your money. Grounded strictly in your data.</p>
      </div>

      {/* Suggested Query Chips */}
      <div className="ai-prompts-tray">
        <span className="prompts-label">Tap to ask:</span>
        <div className="prompts-scroll-row">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="prompt-chip"
              onClick={() => handleSend(prompt)}
            >
              <span>{prompt}</span>
              <ArrowRight size={13} className="text-accent" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="chat-messages-container">
        {messages.map((m) => (
          <div key={m.id} className={`chat-message-row ${m.sender}`}>
            {m.sender === 'assistant' && (
              <div className="bot-avatar">
                <Bot size={18} />
              </div>
            )}

            <div className="message-bubble">
              <p className="message-text">{m.text}</p>

              {/* Verified Metrics Cards inside Assistant Bubble */}
              {m.metrics && (
                <div className="chat-metrics-grid">
                  {m.metrics.map((met, i) => (
                    <div key={i} className={`chat-metric-pill ${met.tag}`}>
                      <span className="metric-tag-label">{met.label}</span>
                      <strong className="metric-tag-val">{met.val}</strong>
                    </div>
                  ))}
                </div>
              )}

              <span className="message-time">{m.time}</span>
            </div>

            {m.sender === 'user' && (
              <div className="user-chat-avatar">
                <span>C</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="chat-input-bar"
      >
        <input
          type="text"
          placeholder="Ask e.g. How much did I spend on food?..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="chat-input"
        />
        <button
          type="submit"
          className="chat-send-btn"
          disabled={!inputVal.trim()}
          aria-label="Send"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
