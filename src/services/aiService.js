// Natural Language AI Financial Assistant Service for MoneyLeft
// Grounded strictly in the user's actual stored financial records

export const aiService = {
  // Query processor using deterministic financial facts
  async answerQuestion(query, { user, stats, transactions, budgets, goals, plannedExpenses }) {
    const q = query.toLowerCase().trim();
    const expenses = transactions.filter((t) => t.type === 'expense');

    // 1. Food or Category spending questions
    if (q.includes('food') || q.includes('canteen') || q.includes('zomato')) {
      const foodExp = expenses.filter(
        (t) => t.category?.toLowerCase() === 'food'
      );
      const sum = foodExp.reduce((s, t) => s + Number(t.amount), 0);
      const foodBudget = budgets.find((b) => b.category?.toLowerCase() === 'food');
      const limit = foodBudget ? Number(foodBudget.limit) : null;

      let answer = `You have spent ₹${sum.toLocaleString('en-IN')} on Food across ${foodExp.length} transactions this month.`;
      if (limit) {
        const remaining = limit - sum;
        answer += ` Your planned envelope is ₹${limit.toLocaleString('en-IN')}, leaving you with ₹${Math.max(0, remaining).toLocaleString('en-IN')} remaining.`;
      }
      return {
        text: answer,
        metrics: [
          { label: 'Food Total', val: `₹${sum.toLocaleString('en-IN')}`, tag: 'info' },
          { label: 'Orders Count', val: `${foodExp.length}`, tag: 'neutral' },
        ],
      };
    }

    // 2. Money left / available balance
    if (q.includes('money left') || q.includes('balance') || q.includes('available') || q.includes('how much money do i have')) {
      return {
        text: `You currently have ₹${stats.moneyLeft.toLocaleString('en-IN')} available this month after accounting for your savings commitments.`,
        metrics: [
          { label: 'Money Left', val: `₹${stats.moneyLeft.toLocaleString('en-IN')}`, tag: 'success' },
          { label: 'Savings Reserve', val: `₹${stats.savings.toLocaleString('en-IN')}`, tag: 'info' },
        ],
      };
    }

    // 3. Safe to spend today
    if (q.includes('spend today') || q.includes('safe to spend') || q.includes('daily allowance')) {
      return {
        text: `Your safe spending allowance for today is ₹${stats.safeToSpendToday.toLocaleString('en-IN')}. This calculation divides your remaining discretionary funds over the remaining ${stats.daysRemaining} days of the month.`,
        metrics: [
          { label: 'Safe Daily', val: `₹${stats.safeToSpendToday.toLocaleString('en-IN')}`, tag: 'success' },
          { label: 'Days Remaining', val: `${stats.daysRemaining} days`, tag: 'neutral' },
        ],
      };
    }

    // 4. "Can I afford ₹X item?"
    const affordMatch = q.match(/afford\s*(?:₹|rs\.?|inr)?\s*(\d+(?:,\d+)*)/i);
    if (affordMatch || q.includes('afford')) {
      const price = affordMatch ? Number(affordMatch[1].replace(/,/g, '')) : 2000;
      const safeDaily = stats.safeToSpendToday || 0;
      const projectedBal = stats.moneyLeft - price - stats.planned;
      const afterDaily = Math.max(0, Math.floor(projectedBal / stats.daysRemaining));

      let text = '';
      let tag = 'warning';

      if (afterDaily < 60 || projectedBal < 0) {
        text = `Spending ₹${price.toLocaleString('en-IN')} would stretch your student budget dangerously thin, leaving you with less than ₹${afterDaily}/day for the remaining ${stats.daysRemaining} days.`;
        tag = 'warning';
      } else if (afterDaily < safeDaily * 0.6) {
        text = `You can afford this purchase with caution. It will reduce your daily allowance from ₹${safeDaily} down to ₹${afterDaily}/day for the rest of the month.`;
        tag = 'warning';
      } else {
        text = `Yes, you can safely afford this purchase! Your daily allowance will remain comfortably healthy at ₹${afterDaily}/day.`;
        tag = 'success';
      }

      return {
        text,
        metrics: [
          { label: 'Daily Before', val: `₹${safeDaily}`, tag: 'info' },
          { label: 'Daily After', val: `₹${afterDaily}`, tag },
        ],
      };
    }

    // 5. Biggest expense
    if (q.includes('biggest expense') || q.includes('largest purchase') || q.includes('most expensive')) {
      if (expenses.length === 0) {
        return { text: 'You have not logged any expenses yet.', metrics: [] };
      }
      const sorted = [...expenses].sort((a, b) => Number(b.amount) - Number(a.amount));
      const biggest = sorted[0];
      return {
        text: `Your largest single expense was ₹${Number(biggest.amount).toLocaleString('en-IN')} for "${biggest.merchant || biggest.category}" on ${biggest.date}.`,
        metrics: [
          { label: 'Largest Item', val: biggest.merchant || biggest.category, tag: 'info' },
          { label: 'Amount', val: `₹${Number(biggest.amount).toLocaleString('en-IN')}`, tag: 'warning' },
        ],
      };
    }

    // 6. Savings questions
    if (q.includes('save') || q.includes('savings') || q.includes('goal')) {
      return {
        text: `You have saved a total of ₹${stats.savings.toLocaleString('en-IN')} across your active goals.`,
        metrics: [
          { label: 'Total Saved', val: `₹${stats.savings.toLocaleString('en-IN')}`, tag: 'success' },
          { label: 'Active Goals', val: `${goals.length}`, tag: 'info' },
        ],
      };
    }

    // 7. General financial summary fallback
    return {
      text: `Based on your live records: You have ₹${stats.moneyLeft.toLocaleString('en-IN')} Money Left, ₹${stats.spent.toLocaleString('en-IN')} spent so far, and ₹${stats.safeToSpendToday.toLocaleString('en-IN')}/day safe allowance for the next ${stats.daysRemaining} days.`,
      metrics: [
        { label: 'Money Left', val: `₹${stats.moneyLeft.toLocaleString('en-IN')}`, tag: 'success' },
        { label: 'Status', val: stats.status, tag: stats.statusClass === 'green' ? 'success' : 'warning' },
      ],
    };
  },
};
