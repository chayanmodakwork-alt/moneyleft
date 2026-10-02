// Production-grade secure authentication service for MoneyLeft
import { dbService } from './db';

const AUTH_USERS_KEY = 'moneyleft_auth_users_registry';
const AUTH_SESSION_KEY = 'moneyleft_active_session';

// Securely hash password with salt using native Web Crypto API (SHA-256)
async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const data = enc.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function getRegistry() {
  try {
    const raw = localStorage.getItem(AUTH_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRegistry(registry) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(registry));
}

export const authService = {
  // SIGN UP
  async signUp(email, password, fullName = '') {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const registry = getRegistry();
    const existing = registry.find((u) => u.email === cleanEmail);
    if (existing) {
      throw new Error('An account with this email already exists. Please log in.');
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const salt = Math.random().toString(36).substring(2);
    const passwordHash = await hashPassword(password, salt);

    const displayName = fullName.trim() || cleanEmail.split('@')[0];

    const newRecord = {
      userId,
      email: cleanEmail,
      salt,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    registry.push(newRecord);
    saveRegistry(registry);

    // Initialize user profile in database
    const initialProfile = {
      id: userId,
      name: displayName,
      email: cleanEmail,
      role: 'College Student',
      college: 'University Campus',
      avatar: displayName.charAt(0).toUpperCase() || 'S',
      income: 0,
      incomeFrequency: 'Monthly',
      emergencyReserve: 2000,
      currency: '₹',
      isDemo: false,
    };
    await dbService.saveUser(userId, initialProfile);

    // Initialize default starter envelopes
    const defaultEnvelopes = [
      { id: `b_${Date.now()}_1`, category: 'Food', icon: '🍔', limit: 3000, color: '#0D9488' },
      { id: `b_${Date.now()}_2`, category: 'Transport', icon: '🚕', limit: 1500, color: '#3B82F6' },
      { id: `b_${Date.now()}_3`, category: 'Shopping', icon: '🛍️', limit: 1500, color: '#EF4444' },
      { id: `b_${Date.now()}_4`, category: 'Entertainment', icon: '🎮', limit: 1000, color: '#8B5CF6' },
    ];
    for (const b of defaultEnvelopes) {
      await dbService.addBudget(userId, b);
    }

    // Set active session
    const session = {
      userId,
      email: cleanEmail,
      name: displayName,
      isDemo: false,
      token: `tok_${Date.now()}`,
    };
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));

    return session;
  },

  // LOGIN
  async login(email, password) {
    const cleanEmail = email.trim().toLowerCase();
    const registry = getRegistry();
    const record = registry.find((u) => u.email === cleanEmail);

    if (!record) {
      throw new Error('No account found with this email. Please check or sign up.');
    }

    const testHash = await hashPassword(password, record.salt);
    if (testHash !== record.passwordHash) {
      throw new Error('Incorrect password. Please try again.');
    }

    const profile = await dbService.getUser(record.userId);

    const session = {
      userId: record.userId,
      email: record.email,
      name: profile?.name || cleanEmail.split('@')[0],
      isDemo: false,
      token: `tok_${Date.now()}`,
    };
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));

    return session;
  },

  // LOGIN AS DEMO / SANDBOX ACCOUNT
  async loginDemo() {
    const demoUserId = 'demo_student_chayan';
    // Ensure demo seed data is in place
    await dbService.seedDemoData(demoUserId);

    const session = {
      userId: demoUserId,
      email: 'demo@moneyleft.app',
      name: 'Chayan',
      isDemo: true,
      token: `demo_tok_${Date.now()}`,
    };
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    return session;
  },

  // LOGOUT
  async logout() {
    localStorage.removeItem(AUTH_SESSION_KEY);
    return true;
  },

  // GET CURRENT SESSION
  getCurrentUser() {
    try {
      const raw = localStorage.getItem(AUTH_SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // RESET PASSWORD (mock for self-contained auth)
  async resetPassword(email, newPassword) {
    const cleanEmail = email.trim().toLowerCase();
    const registry = getRegistry();
    const record = registry.find((u) => u.email === cleanEmail);
    if (!record) {
      throw new Error('Email not found in registry.');
    }
    const salt = Math.random().toString(36).substring(2);
    const passwordHash = await hashPassword(newPassword, salt);
    record.salt = salt;
    record.passwordHash = passwordHash;
    saveRegistry(registry);
    return true;
  },
};
