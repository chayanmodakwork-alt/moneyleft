// Financial Co-Pilot Engine for MoneyLeft
// Performs deterministic mathematical calculations for student budgets

const CATEGORY_COLORS = {
  Food: '#0D9488',
  Transport: '#3B82F6',
  Shopping: '#F59E0B',
  Education: '#10B981',
  Entertainment: '#8B5CF6',
  Subscriptions: '#EC4899',
  Bills: '#6366F1',
  Hostel: '#F97316',
  Health: '#14B8A6',
  Other: '#64748B',
};

const CATEGORY_ICONS = {
  Food: '🍔',
  Transport: '🚕',
  Shopping: '🛍️',
  Education: '🎓',
  Entertainment: '🎮',
  Subscriptions: '📺',
  Bills: '⚡',
  Hostel: '🏠',
  Health: '💊',
  Other: '📦',
};

export const financialEngine = {
  // Calculate remaining days in current calendar month
  getDaysRemainingInMonth() {
    const now = new Date();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return Math.max(1, lastDayOfMonth - now.getDate() + 1);
  },

  // Calculate master dashboard statistics from raw user data
  calculateDashboardStats(user, transactions, budgets, goals, plannedExpenses) {
    const daysRemaining = this.getDaysRemainingInMonth();
    const emergencyReserve = Number(user?.emergencyReserve) || 2000;

    // Filter transactions for current month / cycle
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((tx) => {
      const amt = Number(tx.amount) || 0;
      if (tx.type === 'income') {
        totalIncome += amt;
      } else {
        totalExpenses += amt;
      }
    });

    // If no income transaction exists yet but user set an allowance in profile, use that
    const baseAllowance = Number(user?.income) || 0;
    const effectiveIncome = Math.max(totalIncome, baseAllowance);

    // Current balance
    const currentBalance = effectiveIncome - totalExpenses;

    // Sum of upcoming/planned unpaid expenses
    const upcomingExpensesTotal = plannedExpenses
      .filter((e) => !e.isPaid)
      .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    // Sum of savings contributions across active goals
    const savingsTotal = goals.reduce((sum, g) => sum + (Number(g.saved) || 0), 0);

    // Money Left (Available this month after savings reserve)
    const moneyLeft = Math.max(0, currentBalance - savingsTotal);

    // Discretionary pool available for remaining days
    const discretionaryAmount = Math.max(
      0,
      currentBalance - upcomingExpensesTotal - savingsTotal - emergencyReserve
    );

    // Safe to spend today
    const safeToSpendToday = Math.max(0, Math.floor(discretionaryAmount / daysRemaining));

    // Determine status badge
    let status = 'On Track';
    let statusNote = 'Your current spending pace is within your planned budget.';
    let statusClass = 'green';

    if (currentBalance < 0 || safeToSpendToday < 60) {
      status = 'Budget Stretched';
      statusNote = 'Spending is outpacing your remaining funds. Minimize non-essential purchases.';
      statusClass = 'danger';
    } else if (safeToSpendToday < 180) {
      status = 'Proceed with Caution';
      statusNote = 'Daily allowance is tight. Watch out for discretionary food delivery.';
      statusClass = 'warning';
    }

    return {
      monthlyIncome: effectiveIncome,
      spent: totalExpenses,
      planned: upcomingExpensesTotal,
      savings: savingsTotal,
      currentBalance,
      moneyLeft,
      safeToSpendToday,
      daysRemaining,
      status,
      statusNote,
      statusClass,
      emergencyReserve,
    };
  },

  // Compute category budget utilization
  calculateBudgetsWithSpending(budgets, transactions) {
    return budgets.map((b) => {
      const spent = transactions
        .filter(
          (t) =>
            t.type === 'expense' &&
            t.category?.toLowerCase() === b.category?.toLowerCase()
        )
        .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

      const limit = Number(b.limit) || 1;
      const pct = Math.min(100, Math.round((spent / limit) * 100));
      const isOver = spent > limit;
      const diff = Math.abs(spent - limit);

      return {
        ...b,
        spent,
        limit,
        percentage: pct,
        isOver,
        diff,
        color: b.color || CATEGORY_COLORS[b.category] || '#0D9488',
        icon: b.icon || CATEGORY_ICONS[b.category] || '📁',
        warning: isOver ? `⚠️ ${b.category} budget exceeded by ₹${diff.toLocaleString('en-IN')}` : null,
      };
    });
  },

  // Calculate "Can I Afford It?" consequences
  evaluateCanIAfford(itemTitle, itemPrice, stats, daysRemaining = 21) {
    const price = Number(itemPrice) || 0;
    const availableMoney = stats.moneyLeft || 0;
    const upcoming = stats.planned || 0;
    const savings = stats.savings || 0;

    const projectedRemaining = availableMoney - price - upcoming - savings;
    const safeDailyBefore = stats.safeToSpendToday || 0;
    const afterSafeDaily = Math.max(0, Math.floor(projectedRemaining / daysRemaining));

    let status = {
      type: 'caution',
      label: 'YOU CAN AFFORD IT — WITH CAUTION',
      emoji: '🟡',
      colorClass: 'warning',
      message:
        'This purchase is possible based on your current plan, but it would significantly reduce your remaining daily spending allowance.',
    };

    if (projectedRemaining < 0 || afterSafeDaily < 60) {
      status = {
        type: 'danger',
        label: 'WILL OVERSTRETCH YOUR BUDGET',
        emoji: '🔴',
        colorClass: 'danger',
        message:
          'This purchase exceeds your safe financial buffer and will leave you with inadequate daily funds for the remainder of the month.',
      };
    } else if (afterSafeDaily >= 280) {
      status = {
        type: 'safe',
        label: 'YOU CAN SAFELY AFFORD IT',
        emoji: '🟢',
        colorClass: 'success',
        message:
          'You have ample surplus this month! Your daily spending allowance remains comfortably healthy after this purchase.',
      };
    }

    return {
      itemTitle,
      price,
      availableMoney,
      upcoming,
      savings,
      projectedRemaining,
      safeDailyBefore,
      safeDailyAfter: afterSafeDaily,
      status,
    };
  },

  // Generate dynamic real data insights
  generateInsights(transactions, budgets) {
    const insights = [];
    const expenses = transactions.filter((t) => t.type === 'expense');

    if (expenses.length === 0) {
      return [
        {
          id: 'ins_welcome',
          title: 'Start tracking your spending',
          icon: '✨',
          category: 'Getting Started',
          description: 'Add your first expense or pocket allowance to unlock personalized co-pilot insights.',
          badge: 'New Account',
          impact: 'info',
        },
      ];
    }

    // 1. Group by category to find highest spending
    const catMap = {};
    expenses.forEach((t) => {
      const cat = t.category || 'Other';
      catMap[cat] = (catMap[cat] || 0) + Number(t.amount);
    });

    const totalExp = expenses.reduce((s, t) => s + Number(t.amount), 0);
    const sortedCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);

    if (sortedCats.length > 0 && totalExp > 0) {
      const [topCat, topAmt] = sortedCats[0];
      const topPct = Math.round((topAmt / totalExp) * 100);
      insights.push({
        id: 'ins_top_cat',
        title: `${topCat} is your biggest expense`,
        icon: CATEGORY_ICONS[topCat] || '🍔',
        category: topCat,
        description: `You spent ₹${topAmt.toLocaleString('en-IN')} on ${topCat} this month, around ${topPct}% of your total spending.`,
        badge: `${topPct}% of total`,
        impact: 'high',
      });
    }

    // 2. Micro-purchases audit (< ₹100)
    const microPurchases = expenses.filter((t) => Number(t.amount) < 100);
    if (microPurchases.length > 0) {
      const microSum = microPurchases.reduce((s, t) => s + Number(t.amount), 0);
      insights.push({
        id: 'ins_micro',
        title: 'Small purchases add up',
        icon: '🧾',
        category: 'Micro Habits',
        description: `You made ${microPurchases.length} purchases under ₹100 this month. Together they cost ₹${microSum.toLocaleString('en-IN')}.`,
        badge: 'Micro-Habit',
        impact: 'medium',
      });
    }

    // 3. Check for any overbudget envelopes
    const evaluatedBudgets = this.calculateBudgetsWithSpending(budgets, transactions);
    const overspentBudgets = evaluatedBudgets.filter((b) => b.isOver);
    if (overspentBudgets.length > 0) {
      const ob = overspentBudgets[0];
      insights.push({
        id: 'ins_overbudget',
        title: `${ob.category} budget exceeded`,
        icon: ob.icon,
        category: 'Budget Alert',
        description: `You have spent ₹${ob.spent.toLocaleString('en-IN')} against your ₹${ob.limit.toLocaleString('en-IN')} planned limit (exceeded by ₹${ob.diff.toLocaleString('en-IN')}).`,
        badge: 'Over Limit',
        impact: 'high',
      });
    } else {
      insights.push({
        id: 'ins_ontrack',
        title: 'Envelopes well controlled',
        icon: '🎯',
        category: 'Discipline',
        description: 'All your category budgets are currently under their planned monthly limits.',
        badge: 'Saving Win',
        impact: 'positive',
      });
    }

    return insights;
  },

  // Generate dynamic spending analytics
  generateAnalytics(transactions) {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const totalSpending = expenses.reduce((s, t) => s + Number(t.amount), 0);

    // Category breakdown
    const catMap = {};
    expenses.forEach((t) => {
      const cat = t.category || 'Other';
      catMap[cat] = (catMap[cat] || 0) + Number(t.amount);
    });

    const categories = Object.entries(catMap).map(([name, amount]) => {
      const percentage = totalSpending > 0 ? Math.round((amount / totalSpending) * 100) : 0;
      return {
        name,
        amount,
        percentage,
        icon: CATEGORY_ICONS[name] || '📦',
        color: CATEGORY_COLORS[name] || '#64748B',
      };
    }).sort((a, b) => b.amount - a.amount);

    return {
      totalSpending,
      categories: categories.length > 0 ? categories : [
        { name: 'Food', amount: 0, percentage: 0, icon: '🍔', color: '#0D9488' }
      ],
      dailyAverage: Math.round(totalSpending / Math.max(1, new Date().getDate())),
    };
  },
};
