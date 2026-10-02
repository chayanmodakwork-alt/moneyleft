import React, { useState } from 'react';
import { initialData } from './data/mockData';
import DeviceFrame from './components/DeviceFrame';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';

// Screens
import WelcomeLanding from './screens/WelcomeLanding';
import AuthScreen from './screens/AuthScreen';
import OnboardingMoney from './screens/OnboardingMoney';
import OnboardingExpenses from './screens/OnboardingExpenses';
import OnboardingGoal from './screens/OnboardingGoal';
import Dashboard from './screens/Dashboard';
import TransactionsScreen from './screens/TransactionsScreen';
import BudgetsScreen from './screens/BudgetsScreen';
import GoalsScreen from './screens/GoalsScreen';
import InsightsScreen from './screens/InsightsScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import CanIAffordItScreen from './screens/CanIAffordItScreen';
import UpcomingExpensesScreen from './screens/UpcomingExpensesScreen';
import RecurringExpensesScreen from './screens/RecurringExpensesScreen';
import AiAssistantScreen from './screens/AiAssistantScreen';
import MonthlyReportScreen from './screens/MonthlyReportScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

// Modals
import AddExpenseModal from './components/Modals/AddExpenseModal';
import TransactionDetailModal from './components/Modals/TransactionDetailModal';
import BudgetDetailModal from './components/Modals/BudgetDetailModal';
import CreateGoalModal from './components/Modals/CreateGoalModal';
import AddGoalMoneyModal from './components/Modals/AddGoalMoneyModal';
import AddUpcomingModal from './components/Modals/AddUpcomingModal';
import MonthlyReportModal from './components/Modals/MonthlyReportModal';

import { X, Calendar, RefreshCw, Bot, FileText, User, Settings as SettingsIcon, LogOut, ArrowRight } from 'lucide-react';
import './App.css';

export default function App() {
  // Master app state
  const [user, setUser] = useState(initialData.user);
  const [stats, setStats] = useState(initialData.stats);
  const [transactions, setTransactions] = useState(initialData.transactions);
  const [budgets, setBudgets] = useState(initialData.budgets);
  const [goals, setGoals] = useState(initialData.goals);
  const [upcomingExpenses, setUpcomingExpenses] = useState(initialData.upcomingExpenses);
  const [recurringExpenses, setRecurringExpenses] = useState(initialData.recurringExpenses);
  const [insights, setInsights] = useState(initialData.insights);
  const [analyticsData, setAnalyticsData] = useState(initialData.analytics);
  const [monthlyReport, setMonthlyReport] = useState(initialData.monthlyReport);

  // Active navigation screen
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Modal open states
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [createGoalOpen, setCreateGoalOpen] = useState(false);
  const [depositGoal, setDepositGoal] = useState(null);
  const [addUpcomingOpen, setAddUpcomingOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // State update handlers
  const handleAddExpense = (newExpense) => {
    setTransactions((prev) => [newExpense, ...prev]);

    // Update stats
    setStats((prev) => {
      const newSpent = prev.spent + newExpense.amount;
      return {
        ...prev,
        spent: newSpent,
      };
    });

    // Update budget category spent
    setBudgets((prev) =>
      prev.map((b) =>
        b.category.toLowerCase() === newExpense.category.toLowerCase()
          ? { ...b, spent: b.spent + newExpense.amount }
          : b
      )
    );

    // Update analytics
    setAnalyticsData((prev) => {
      const updatedCats = prev.categories.map((c) =>
        c.name.toLowerCase() === newExpense.category.toLowerCase()
          ? { ...c, amount: c.amount + newExpense.amount }
          : c
      );
      return {
        ...prev,
        totalSpending: prev.totalSpending + newExpense.amount,
        categories: updatedCats,
      };
    });

    showToast(`₹${newExpense.amount} logged • Money Left updated`);
  };

  const handleDeleteTransaction = (txId) => {
    const target = transactions.find((t) => t.id === txId);
    if (!target) return;

    setTransactions((prev) => prev.filter((t) => t.id !== txId));

    if (target.type === 'expense') {
      setStats((prev) => ({
        ...prev,
        spent: Math.max(0, prev.spent - target.amount),
      }));

      setBudgets((prev) =>
        prev.map((b) =>
          b.category.toLowerCase() === target.category.toLowerCase()
            ? { ...b, spent: Math.max(0, b.spent - target.amount) }
            : b
        )
      );
    }

    showToast('Transaction removed & balance restored');
  };

  const handleUpdateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTx.id ? updatedTx : t))
    );
    showToast('Transaction updated');
  };

  const handleDepositToGoal = (goalId, depositAmount) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, saved: g.saved + depositAmount } : g
      )
    );

    setStats((prev) => ({
      ...prev,
      savings: prev.savings + depositAmount,
    }));

    showToast(`₹${depositAmount} deposited into savings 🎉`);
  };

  const handleCreateGoal = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
    showToast(`Goal "${newGoal.name}" created!`);
  };

  const handleAddUpcoming = (newUpcoming) => {
    setUpcomingExpenses((prev) => [...prev, newUpcoming]);
    setStats((prev) => ({
      ...prev,
      planned: prev.planned + newUpcoming.amount,
    }));
    showToast(`Added ${newUpcoming.title} to upcoming commitments`);
  };

  const handleAddRecurring = (newRec) => {
    setRecurringExpenses((prev) => [...prev, newRec]);
    showToast(`Subscription "${newRec.name}" added`);
  };

  const handleDeleteRecurring = (recId) => {
    setRecurringExpenses((prev) => prev.filter((r) => r.id !== recId));
    showToast('Subscription removed');
  };

  const handleResetData = () => {
    setUser(initialData.user);
    setStats(initialData.stats);
    setTransactions(initialData.transactions);
    setBudgets(initialData.budgets);
    setGoals(initialData.goals);
    setUpcomingExpenses(initialData.upcomingExpenses);
    setRecurringExpenses(initialData.recurringExpenses);
    setAnalyticsData(initialData.analytics);
    showToast('Reset to original sample student data');
  };

  // Jump screen handler for the 22 screens selector
  const handleScreenChange = (screenId) => {
    if (screenId === 'add-expense-preview') {
      setCurrentScreen('dashboard');
      setAddExpenseOpen(true);
    } else if (screenId === 'tx-details-preview') {
      setCurrentScreen('transactions');
      setSelectedTx(transactions[0]);
    } else if (screenId === 'budget-detail-preview') {
      setCurrentScreen('budgets');
      setSelectedBudget(budgets[0]);
    } else if (screenId === 'create-goal-preview') {
      setCurrentScreen('goals');
      setCreateGoalOpen(true);
    } else {
      setCurrentScreen(screenId);
    }
  };

  // Active view renderer
  const renderCurrentView = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeLanding
            onGetStarted={() => setCurrentScreen('onboarding-money')}
            onLogin={() => setCurrentScreen('auth')}
          />
        );

      case 'auth':
        return (
          <AuthScreen
            onComplete={() => setCurrentScreen('dashboard')}
            onBack={() => setCurrentScreen('welcome')}
          />
        );

      case 'onboarding-money':
        return (
          <OnboardingMoney
            initialIncome={user.income}
            onNext={(data) => {
              setUser((prev) => ({ ...prev, ...data }));
              setCurrentScreen('onboarding-expenses');
            }}
            onBack={() => setCurrentScreen('welcome')}
          />
        );

      case 'onboarding-expenses':
        return (
          <OnboardingExpenses
            onNext={() => setCurrentScreen('onboarding-goal')}
            onBack={() => setCurrentScreen('onboarding-money')}
          />
        );

      case 'onboarding-goal':
        return (
          <OnboardingGoal
            onComplete={(goalData) => {
              setGoals((prev) => [
                {
                  id: `g-custom`,
                  name: goalData.goalName,
                  icon: goalData.goalIcon,
                  target: goalData.target,
                  saved: 0,
                  targetDate: 'October 2027',
                  monthlyRequired: Math.round(goalData.target / 12),
                  featured: true,
                },
                ...prev.filter((g) => !g.featured),
              ]);
              setCurrentScreen('dashboard');
              showToast('Student plan created! Welcome to MoneyLeft.');
            }}
            onBack={() => setCurrentScreen('onboarding-expenses')}
          />
        );

      case 'dashboard':
        return (
          <Dashboard
            user={user}
            stats={stats}
            transactions={transactions}
            onOpenAddExpense={() => setAddExpenseOpen(true)}
            onOpenAddIncome={() => {
              const amount = prompt('Enter Pocket Money / Income received (₹):', '2000');
              const val = parseFloat(amount);
              if (!isNaN(val) && val > 0) {
                const newIncome = {
                  id: `tx-${Date.now()}`,
                  merchant: 'Stipend / Allowance',
                  category: 'Income',
                  amount: val,
                  type: 'income',
                  date: 'Today, Just now',
                  dateKey: 'Today',
                  paymentMethod: 'Bank Transfer',
                  notes: 'Direct addition',
                  icon: '💰',
                  badge: 'Income',
                };
                setTransactions((prev) => [newIncome, ...prev]);
                setStats((prev) => ({ ...prev, monthlyIncome: prev.monthlyIncome + val }));
                showToast(`+₹${val} income added to Money Left!`);
              }
            }}
            onOpenCanIAfford={() => setCurrentScreen('afford')}
            onOpenAddGoal={() => setCreateGoalOpen(true)}
            onNavigateScreen={setCurrentScreen}
            onSelectTransaction={setSelectedTx}
          />
        );

      case 'transactions':
        return (
          <TransactionsScreen
            transactions={transactions}
            onOpenAddExpense={() => setAddExpenseOpen(true)}
            onSelectTransaction={setSelectedTx}
          />
        );

      case 'budgets':
        return (
          <BudgetsScreen
            budgets={budgets}
            onSelectBudget={setSelectedBudget}
            onOpenCreateBudget={() => {
              const catName = prompt('Enter category name for new budget envelope:', 'Snacks & Cafes');
              const limitStr = prompt('Enter monthly spending limit (₹):', '1000');
              const lim = parseFloat(limitStr);
              if (catName && !isNaN(lim) && lim > 0) {
                setBudgets((prev) => [
                  ...prev,
                  {
                    id: `b-${Date.now()}`,
                    category: catName,
                    icon: '🥪',
                    spent: 0,
                    limit: lim,
                    color: '#0D9488',
                    avgDaily: Math.round(lim / 30),
                    insight: 'New budget envelope active.',
                    history: [0, 0, 0, 0, 0, 0, 0],
                  },
                ]);
                showToast(`Envelope "${catName}" created!`);
              }
            }}
          />
        );

      case 'goals':
        return (
          <GoalsScreen
            goals={goals}
            onOpenCreateGoal={() => setCreateGoalOpen(true)}
            onOpenAddMoney={setDepositGoal}
          />
        );

      case 'insights':
        return (
          <InsightsScreen
            insights={insights}
            onNavigateScreen={setCurrentScreen}
          />
        );

      case 'analytics':
        return <AnalyticsScreen analyticsData={analyticsData} />;

      case 'afford':
        return (
          <CanIAffordItScreen
            stats={stats}
            onBuyAnyway={(newExpense) => {
              handleAddExpense(newExpense);
              setCurrentScreen('dashboard');
            }}
            onMaybeLater={() => {
              showToast('Purchase saved to wishlist. Kept daily allowance safe!');
              setCurrentScreen('dashboard');
            }}
          />
        );

      case 'upcoming':
        return (
          <UpcomingExpensesScreen
            upcomingExpenses={upcomingExpenses}
            onOpenAddUpcoming={() => setAddUpcomingOpen(true)}
            onMarkPaid={(item) => {
              setUpcomingExpenses((prev) => prev.filter((u) => u.id !== item.id));
              handleAddExpense({
                id: `tx-${Date.now()}`,
                merchant: item.title,
                category: item.category || 'Bills',
                amount: item.amount,
                type: 'expense',
                date: 'Today, Just now',
                dateKey: 'Today',
                paymentMethod: 'UPI',
                notes: 'Paid scheduled commitment',
                icon: item.icon || '🧾',
                badge: item.category || 'Bills',
              });
              showToast(`Marked ${item.title} as paid!`);
            }}
          />
        );

      case 'recurring':
        return (
          <RecurringExpensesScreen
            recurringExpenses={recurringExpenses}
            onAddRecurring={handleAddRecurring}
            onDeleteRecurring={handleDeleteRecurring}
          />
        );

      case 'ai':
        return (
          <AiAssistantScreen
            stats={stats}
            budgets={budgets}
            transactions={transactions}
          />
        );

      case 'report':
        return (
          <MonthlyReportScreen
            reportData={monthlyReport}
            onOpenFullReport={() => setReportModalOpen(true)}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            user={user}
            onNavigateSettings={() => setCurrentScreen('settings')}
            onResetData={handleResetData}
            onLogout={() => setCurrentScreen('welcome')}
            onRestartOnboarding={() => setCurrentScreen('onboarding-money')}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            onBack={() => setCurrentScreen('profile')}
            onResetData={handleResetData}
            onDeleteAccount={() => {
              if (confirm('Delete your student account? All local data will reset.')) {
                handleResetData();
                setCurrentScreen('welcome');
              }
            }}
          />
        );

      default:
        return <Dashboard user={user} stats={stats} transactions={transactions} />;
    }
  };

  const isNavVisible = ![
    'welcome',
    'auth',
    'onboarding-money',
    'onboarding-expenses',
    'onboarding-goal',
  ].includes(currentScreen);

  return (
    <DeviceFrame
      currentScreen={currentScreen}
      onScreenChange={handleScreenChange}
      isMobileFrame={isMobileFrame}
      setIsMobileFrame={setIsMobileFrame}
    >
      <div className="app-root-shell">
        {/* Desktop Sidebar (hidden in mobile frame) */}
        {!isMobileFrame && isNavVisible && (
          <Sidebar
            activeScreen={currentScreen}
            onSelectScreen={setCurrentScreen}
            onOpenAddExpense={() => setAddExpenseOpen(true)}
            stats={stats}
            user={user}
          />
        )}

        {/* Main Viewport */}
        <main className="app-main-viewport">
          <div className="app-scroll-body">
            {renderCurrentView()}
          </div>

          {/* Mobile Bottom Navigation Bar */}
          {isNavVisible && (
            <BottomNav
              activeScreen={currentScreen}
              onSelectScreen={setCurrentScreen}
              onOpenMore={() => setMoreDrawerOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="floating-toast animate-scale-up">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* "More" Drawer for Mobile Bottom Nav */}
      {moreDrawerOpen && (
        <div
          className="more-sheet-backdrop"
          onClick={() => setMoreDrawerOpen(false)}
        >
          <div
            className="more-sheet-container animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="more-sheet-header">
              <span className="font-bold text-sm">More Financial Co-Pilot Tools</span>
              <button
                className="close-drawer-btn"
                onClick={() => setMoreDrawerOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="more-sheet-grid">
              <button
                className="more-grid-tile"
                onClick={() => {
                  setCurrentScreen('upcoming');
                  setMoreDrawerOpen(false);
                }}
              >
                <Calendar size={22} className="text-teal" />
                <strong>Upcoming Expenses</strong>
                <span>Hostel, college, bills</span>
              </button>

              <button
                className="more-grid-tile"
                onClick={() => {
                  setCurrentScreen('recurring');
                  setMoreDrawerOpen(false);
                }}
              >
                <RefreshCw size={22} className="text-teal" />
                <strong>Recurring Plans</strong>
                <span>Netflix, Spotify, Gym</span>
              </button>

              <button
                className="more-grid-tile"
                onClick={() => {
                  setCurrentScreen('ai');
                  setMoreDrawerOpen(false);
                }}
              >
                <Bot size={22} className="text-teal" />
                <strong>AI Assistant</strong>
                <span>Ask about your money</span>
              </button>

              <button
                className="more-grid-tile"
                onClick={() => {
                  setCurrentScreen('report');
                  setMoreDrawerOpen(false);
                }}
              >
                <FileText size={22} className="text-teal" />
                <strong>October Report</strong>
                <span>Monthly spending audit</span>
              </button>

              <button
                className="more-grid-tile"
                onClick={() => {
                  setCurrentScreen('profile');
                  setMoreDrawerOpen(false);
                }}
              >
                <User size={22} className="text-teal" />
                <strong>Student Profile</strong>
                <span>Settings & allowance</span>
              </button>

              <button
                className="more-grid-tile"
                onClick={() => {
                  setCurrentScreen('welcome');
                  setMoreDrawerOpen(false);
                }}
              >
                <LogOut size={22} className="text-secondary" />
                <strong>Restart Onboarding</strong>
                <span>View welcome screen</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <AddExpenseModal
        isOpen={addExpenseOpen}
        onClose={() => setAddExpenseOpen(false)}
        onSave={handleAddExpense}
      />

      <TransactionDetailModal
        isOpen={!!selectedTx}
        onClose={() => setSelectedTx(null)}
        transaction={selectedTx}
        onDelete={handleDeleteTransaction}
        onUpdate={handleUpdateTransaction}
      />

      <BudgetDetailModal
        isOpen={!!selectedBudget}
        onClose={() => setSelectedBudget(null)}
        budget={selectedBudget}
        onUpdateBudget={(updatedBudget) => {
          setBudgets((prev) =>
            prev.map((b) => (b.id === updatedBudget.id ? updatedBudget : b))
          );
          showToast(`Budget for ${updatedBudget.category} updated`);
        }}
      />

      <CreateGoalModal
        isOpen={createGoalOpen}
        onClose={() => setCreateGoalOpen(false)}
        onSave={handleCreateGoal}
      />

      <AddGoalMoneyModal
        isOpen={!!depositGoal}
        onClose={() => setDepositGoal(null)}
        goal={depositGoal}
        onDeposit={handleDepositToGoal}
      />

      <AddUpcomingModal
        isOpen={addUpcomingOpen}
        onClose={() => setAddUpcomingOpen(false)}
        onSave={handleAddUpcoming}
      />

      <MonthlyReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reportData={monthlyReport}
      />
    </DeviceFrame>
  );
}
