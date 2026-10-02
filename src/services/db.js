// Production-grade persistent database service for MoneyLeft
// Supports user-isolated data structures:
// users/{userId}, transactions/{txId}, budgets/{budgetId}, goals/{goalId},
// plannedExpenses/{id}, recurringExpenses/{id}, settings/{userId}

const DB_PREFIX = 'moneyleft_db_v1_';

// Helper for local storage persistence with error handling
function getStore(collection, userId) {
  try {
    const key = `${DB_PREFIX}${collection}_${userId}`;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error(`Error reading ${collection} for user ${userId}:`, err);
    return [];
  }
}

function setStore(collection, userId, data) {
  try {
    const key = `${DB_PREFIX}${collection}_${userId}`;
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${collection} for user ${userId}:`, err);
  }
}

export const dbService = {
  // USER PROFILE & SETTINGS
  async getUser(userId) {
    try {
      const raw = localStorage.getItem(`${DB_PREFIX}user_${userId}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  async saveUser(userId, userData) {
    const existing = (await this.getUser(userId)) || {};
    const updated = { ...existing, ...userData, updatedAt: new Date().toISOString() };
    localStorage.setItem(`${DB_PREFIX}user_${userId}`, JSON.stringify(updated));
    return updated;
  },

  // TRANSACTIONS CRUD (users/{userId}/transactions)
  async getTransactions(userId) {
    const list = getStore('transactions', userId);
    // Sort newest first by date
    return list.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
  },

  async addTransaction(userId, txData) {
    const list = getStore('transactions', userId);
    const newTx = {
      ...txData,
      id: txData.id || `tx_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId,
      amount: Number(txData.amount) || 0,
      type: txData.type || 'expense', // 'income' | 'expense'
      createdAt: new Date().toISOString(),
    };
    list.unshift(newTx);
    setStore('transactions', userId, list);
    return newTx;
  },

  async updateTransaction(userId, txId, updates) {
    const list = getStore('transactions', userId);
    const idx = list.findIndex((t) => t.id === txId);
    if (idx === -1) return null;
    list[idx] = {
      ...list[idx],
      ...updates,
      amount: updates.amount !== undefined ? Number(updates.amount) : list[idx].amount,
      updatedAt: new Date().toISOString(),
    };
    setStore('transactions', userId, list);
    return list[idx];
  },

  async deleteTransaction(userId, txId) {
    const list = getStore('transactions', userId);
    const filtered = list.filter((t) => t.id !== txId);
    setStore('transactions', userId, filtered);
    return true;
  },

  // BUDGETS CRUD (users/{userId}/budgets)
  async getBudgets(userId) {
    return getStore('budgets', userId);
  },

  async addBudget(userId, budgetData) {
    const list = getStore('budgets', userId);
    const newBudget = {
      ...budgetData,
      id: budgetData.id || `b_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId,
      limit: Number(budgetData.limit) || 0,
      createdAt: new Date().toISOString(),
    };
    list.push(newBudget);
    setStore('budgets', userId, list);
    return newBudget;
  },

  async updateBudget(userId, budgetId, updates) {
    const list = getStore('budgets', userId);
    const idx = list.findIndex((b) => b.id === budgetId);
    if (idx === -1) return null;
    list[idx] = {
      ...list[idx],
      ...updates,
      limit: updates.limit !== undefined ? Number(updates.limit) : list[idx].limit,
      updatedAt: new Date().toISOString(),
    };
    setStore('budgets', userId, list);
    return list[idx];
  },

  async deleteBudget(userId, budgetId) {
    const list = getStore('budgets', userId);
    const filtered = list.filter((b) => b.id !== budgetId);
    setStore('budgets', userId, filtered);
    return true;
  },

  // SAVINGS GOALS CRUD (users/{userId}/goals)
  async getGoals(userId) {
    return getStore('goals', userId);
  },

  async addGoal(userId, goalData) {
    const list = getStore('goals', userId);
    const newGoal = {
      ...goalData,
      id: goalData.id || `g_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId,
      target: Number(goalData.target) || 0,
      saved: Number(goalData.saved) || 0,
      createdAt: new Date().toISOString(),
    };
    list.push(newGoal);
    setStore('goals', userId, list);
    return newGoal;
  },

  async updateGoal(userId, goalId, updates) {
    const list = getStore('goals', userId);
    const idx = list.findIndex((g) => g.id === goalId);
    if (idx === -1) return null;
    list[idx] = {
      ...list[idx],
      ...updates,
      target: updates.target !== undefined ? Number(updates.target) : list[idx].target,
      saved: updates.saved !== undefined ? Number(updates.saved) : list[idx].saved,
      updatedAt: new Date().toISOString(),
    };
    setStore('goals', userId, list);
    return list[idx];
  },

  async deleteGoal(userId, goalId) {
    const list = getStore('goals', userId);
    const filtered = list.filter((g) => g.id !== goalId);
    setStore('goals', userId, filtered);
    return true;
  },

  // UPCOMING / PLANNED EXPENSES CRUD (users/{userId}/plannedExpenses)
  async getPlannedExpenses(userId) {
    return getStore('plannedExpenses', userId);
  },

  async addPlannedExpense(userId, expenseData) {
    const list = getStore('plannedExpenses', userId);
    const newExpense = {
      ...expenseData,
      id: expenseData.id || `up_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId,
      amount: Number(expenseData.amount) || 0,
      isPaid: false,
      createdAt: new Date().toISOString(),
    };
    list.push(newExpense);
    setStore('plannedExpenses', userId, list);
    return newExpense;
  },

  async updatePlannedExpense(userId, expenseId, updates) {
    const list = getStore('plannedExpenses', userId);
    const idx = list.findIndex((e) => e.id === expenseId);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
    setStore('plannedExpenses', userId, list);
    return list[idx];
  },

  async deletePlannedExpense(userId, expenseId) {
    const list = getStore('plannedExpenses', userId);
    const filtered = list.filter((e) => e.id !== expenseId);
    setStore('plannedExpenses', userId, filtered);
    return true;
  },

  // RECURRING EXPENSES CRUD (users/{userId}/recurringExpenses)
  async getRecurringExpenses(userId) {
    return getStore('recurringExpenses', userId);
  },

  async addRecurringExpense(userId, recData) {
    const list = getStore('recurringExpenses', userId);
    const newRec = {
      ...recData,
      id: recData.id || `rec_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId,
      amount: Number(recData.amount) || 0,
      createdAt: new Date().toISOString(),
    };
    list.push(newRec);
    setStore('recurringExpenses', userId, list);
    return newRec;
  },

  async deleteRecurringExpense(userId, recId) {
    const list = getStore('recurringExpenses', userId);
    const filtered = list.filter((r) => r.id !== recId);
    setStore('recurringExpenses', userId, filtered);
    return true;
  },

  // USER SETTINGS (users/{userId}/settings)
  async getSettings(userId) {
    try {
      const raw = localStorage.getItem(`${DB_PREFIX}settings_${userId}`);
      return raw
        ? JSON.parse(raw)
        : {
            dailyDigest: true,
            overspendAlerts: true,
            aiSuggestions: true,
            privacyMode: false,
            biometrics: false,
          };
    } catch {
      return {};
    }
  },

  async updateSettings(userId, settings) {
    const existing = await this.getSettings(userId);
    const updated = { ...existing, ...settings };
    localStorage.setItem(`${DB_PREFIX}settings_${userId}`, JSON.stringify(updated));
    return updated;
  },

  // CLEAR ALL FINANCIAL DATA FOR A USER
  async clearUserData(userId) {
    setStore('transactions', userId, []);
    setStore('budgets', userId, []);
    setStore('goals', userId, []);
    setStore('plannedExpenses', userId, []);
    setStore('recurringExpenses', userId, []);
    return true;
  },

  // SEED SAMPLE DATA (Used for demo student or initial onboarding preview)
  async seedDemoData(userId) {
    const demoUser = {
      id: userId,
      name: 'Chayan',
      email: 'demo@moneyleft.app',
      role: 'Student (Engineering & Design)',
      college: 'Indian Institute of Technology',
      avatar: 'C',
      income: 12000,
      incomeFrequency: 'Monthly',
      emergencyReserve: 2000,
      currency: '₹',
      isDemo: true,
    };
    await this.saveUser(userId, demoUser);

    const demoTransactions = [
      {
        id: 'tx_demo_1',
        merchant: 'Zomato',
        category: 'Food',
        amount: 240,
        type: 'expense',
        date: 'Today, 2:15 PM',
        dateKey: 'Today',
        paymentMethod: 'UPI',
        notes: 'Dinner with hostel mates',
        icon: '🍔',
      },
      {
        id: 'tx_demo_2',
        merchant: 'Uber',
        category: 'Transport',
        amount: 180,
        type: 'expense',
        date: 'Today, 9:30 AM',
        dateKey: 'Today',
        paymentMethod: 'UPI',
        notes: 'Auto to lecture hall',
        icon: '🚕',
      },
      {
        id: 'tx_demo_3',
        merchant: 'Amazon',
        category: 'Shopping',
        amount: 699,
        type: 'expense',
        date: 'Yesterday, 6:45 PM',
        dateKey: 'Yesterday',
        paymentMethod: 'Card',
        notes: 'USB-C Cable & notebook',
        icon: '🛍️',
      },
      {
        id: 'tx_demo_4',
        merchant: 'Netflix',
        category: 'Subscriptions',
        amount: 199,
        type: 'expense',
        date: 'Yesterday, 12:01 AM',
        dateKey: 'Yesterday',
        paymentMethod: 'UPI Autopay',
        notes: 'Mobile monthly subscription',
        icon: '📺',
      },
      {
        id: 'tx_demo_5',
        merchant: 'Tapri Chai & Samosa',
        category: 'Food',
        amount: 45,
        type: 'expense',
        date: 'Oct 1, 5:10 PM',
        dateKey: 'Oct 1, 2026',
        paymentMethod: 'UPI',
        notes: 'Tea break between lectures',
        icon: '☕',
      },
      {
        id: 'tx_demo_6',
        merchant: 'Campus Canteen',
        category: 'Food',
        amount: 85,
        type: 'expense',
        date: 'Oct 1, 1:15 PM',
        dateKey: 'Oct 1, 2026',
        paymentMethod: 'UPI',
        notes: 'Quick lunch',
        icon: '🥪',
      },
      {
        id: 'tx_demo_7',
        merchant: 'Monthly Pocket Money',
        category: 'Income',
        amount: 12000,
        type: 'income',
        date: 'Oct 1, 8:00 AM',
        dateKey: 'Oct 1, 2026',
        paymentMethod: 'Bank Transfer',
        notes: 'Monthly allowance from home',
        icon: '💰',
      },
    ];
    setStore('transactions', userId, demoTransactions);

    const demoBudgets = [
      { id: 'b_demo_1', category: 'Food', icon: '🍔', limit: 3000, color: '#0D9488' },
      { id: 'b_demo_2', category: 'Transport', icon: '🚕', limit: 1500, color: '#3B82F6' },
      { id: 'b_demo_3', category: 'Shopping', icon: '🛍️', limit: 1500, color: '#EF4444' },
      { id: 'b_demo_4', category: 'Entertainment', icon: '🎮', limit: 1000, color: '#8B5CF6' },
    ];
    setStore('budgets', userId, demoBudgets);

    const demoGoals = [
      {
        id: 'g_demo_1',
        name: 'New Bike',
        icon: '🏍️',
        target: 80000,
        saved: 15000,
        targetDate: 'September 2027',
        monthlyRequired: 5417,
        featured: true,
      },
      {
        id: 'g_demo_2',
        name: 'MacBook / Laptop',
        icon: '💻',
        target: 45000,
        saved: 22500,
        targetDate: 'January 2027',
        monthlyRequired: 7500,
        featured: false,
      },
      {
        id: 'g_demo_3',
        name: 'Semester Break Goa Trip',
        icon: '✈️',
        target: 20000,
        saved: 8000,
        targetDate: 'December 2026',
        monthlyRequired: 6000,
        featured: false,
      },
    ];
    setStore('goals', userId, demoGoals);

    const demoPlanned = [
      { id: 'up_demo_1', title: 'Hostel Fee', amount: 4000, dueDate: 'Oct 5, 2026', dueInDays: 3, icon: '🏠', category: 'Hostel' },
      { id: 'up_demo_2', title: 'Mobile Recharge', amount: 299, dueDate: 'Oct 10, 2026', dueInDays: 8, icon: '📱', category: 'Bills' },
      { id: 'up_demo_3', title: 'College Examination Fee', amount: 2000, dueDate: 'Oct 15, 2026', dueInDays: 13, icon: '🎓', category: 'College' },
      { id: 'up_demo_4', title: 'Netflix Subscription', amount: 199, dueDate: 'Oct 20, 2026', dueInDays: 18, icon: '📺', category: 'Subscriptions' },
    ];
    setStore('plannedExpenses', userId, demoPlanned);

    const demoRecurring = [
      { id: 'rec_demo_1', name: 'Netflix', amount: 199, category: 'Subscriptions', icon: '📺' },
      { id: 'rec_demo_2', name: 'Spotify Student', amount: 119, category: 'Music', icon: '🎵' },
      { id: 'rec_demo_3', name: 'Mobile 5G Recharge', amount: 299, category: 'Bills', icon: '📱' },
      { id: 'rec_demo_4', name: 'Campus Gym Membership', amount: 800, category: 'Health', icon: '🏋️' },
    ];
    setStore('recurringExpenses', userId, demoRecurring);

    return true;
  },
};
