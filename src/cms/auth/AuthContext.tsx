import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Default Local Credentials for offline/local prototyping.
 * Can be overridden in .env via VITE_CMS_ADMIN_USER and VITE_CMS_ADMIN_PASS
 */
export const DEFAULT_ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'operations2026',
  displayName: 'Russell Taga-an (Admin)',
};

export interface AuthUser {
  username: string;
  displayName: string;
  role: 'superadmin' | 'editor';
  token?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'wpbakery_cms_auth_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * =========================================================================
 * FIREBASE AUTH STUB (Ready to drop in when Firebase Auth is provisioned)
 * =========================================================================
 * 
 * import { getAuth, signInWithEmailAndPassword, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';
 * import { app } from '../services/firebaseConfig';
 * const auth = getAuth(app);
 * 
 * // Replace local validation below with:
 * // const userCredential = await signInWithEmailAndPassword(auth, email, password);
 * // onAuthStateChanged(auth, (user) => { ... })
 */

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check existing session in sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed: AuthUser = JSON.parse(stored);
        setUser(parsed);
        setIsAuthenticated(true);
      }
    } catch {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (
    usernameInput: string,
    passwordInput: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Emulate a brief network delay (150ms) for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 150));

    const expectedUser =
      (typeof process !== 'undefined' && process.env?.VITE_CMS_ADMIN_USER) ||
      DEFAULT_ADMIN_CREDENTIALS.username;
    const expectedPass =
      (typeof process !== 'undefined' && process.env?.VITE_CMS_ADMIN_PASS) ||
      DEFAULT_ADMIN_CREDENTIALS.password;

    const trimmedUser = usernameInput.trim().toLowerCase();

    // Check credentials (accepting 'admin' or 'russell')
    if (
      (trimmedUser === expectedUser.toLowerCase() || trimmedUser === 'russell') &&
      passwordInput === expectedPass
    ) {
      const sessionUser: AuthUser = {
        username: trimmedUser,
        displayName: DEFAULT_ADMIN_CREDENTIALS.displayName,
        role: 'superadmin',
        token: `cms_token_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      };

      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
      } catch (err) {
        console.warn('Failed to write to sessionStorage', err);
      }

      setUser(sessionUser);
      setIsAuthenticated(true);
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      error: 'Invalid administrator credentials. Please check your username and password.',
    };
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to clear sessionStorage', err);
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
