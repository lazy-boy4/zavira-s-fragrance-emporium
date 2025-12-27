import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

/**
 * Auth Context - Secure authentication state management
 * 
 * SECURITY NOTES:
 * - This is a frontend-only mock for UI development
 * - Real auth MUST be validated server-side
 * - Never trust client-side role checks for sensitive operations
 * - All admin actions should be re-verified by the backend
 * 
 * Backend Integration:
 * - Replace mock functions with actual API calls
 * - Store JWT in httpOnly cookies (not localStorage)
 * - Implement token refresh mechanism
 * - Validate roles server-side for all protected endpoints
 */

export type UserRole = "owner" | "manager" | "staff" | "customer";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasRole: (roles: UserRole[]) => boolean;
  isAdmin: () => boolean;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session storage key (more secure than localStorage for auth)
const AUTH_SESSION_KEY = "zavira_auth_session";

// MOCK: Demo admin accounts for development
// IMPORTANT: Remove this in production - roles should come from backend
const DEMO_ACCOUNTS: Record<string, { password: string; user: User }> = {
  "admin@zavira.com": {
    password: "Admin123!",
    user: {
      id: "usr_admin_001",
      email: "admin@zavira.com",
      firstName: "Admin",
      lastName: "User",
      role: "owner",
      createdAt: new Date().toISOString(),
    },
  },
  "manager@zavira.com": {
    password: "Manager123!",
    user: {
      id: "usr_manager_001",
      email: "manager@zavira.com",
      firstName: "Manager",
      lastName: "User",
      role: "manager",
      createdAt: new Date().toISOString(),
    },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        // Using sessionStorage for better security (clears on tab close)
        const stored = sessionStorage.getItem(AUTH_SESSION_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Validate user structure
          if (parsed && typeof parsed.id === "string" && typeof parsed.email === "string") {
            setState({
              user: parsed,
              isAuthenticated: true,
              isLoading: false,
            });
            return;
          }
        }
      } catch {
        sessionStorage.removeItem(AUTH_SESSION_KEY);
      }
      setState((prev) => ({ ...prev, isLoading: false }));
    };

    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // MOCK: Check demo accounts
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      //   credentials: 'include', // Important for httpOnly cookies
      // });

      const normalizedEmail = email.toLowerCase().trim();
      const demoAccount = DEMO_ACCOUNTS[normalizedEmail];

      if (demoAccount && demoAccount.password === password) {
        const user = demoAccount.user;
        
        // Store session
        sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user));
        
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      }

      // For non-demo accounts, simulate customer login
      // In production, this would be validated by the backend
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, error: "Invalid email or password" };
      
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, error: "An error occurred. Please try again." };
    }
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      //   credentials: 'include',
      // });

      // Check if email already exists (mock)
      const normalizedEmail = data.email.toLowerCase().trim();
      if (DEMO_ACCOUNTS[normalizedEmail]) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return { success: false, error: "An account with this email already exists" };
      }

      // Create new customer user
      const newUser: User = {
        id: `usr_${Date.now()}`,
        email: normalizedEmail,
        firstName: data.firstName,
        lastName: data.lastName,
        role: "customer",
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(newUser));
      
      setState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
      
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, error: "An error occurred. Please try again." };
    }
  }, []);

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // TODO: Call logout API to invalidate server-side session
      // await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   credentials: 'include',
      // });

      sessionStorage.removeItem(AUTH_SESSION_KEY);
      
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      // Still clear local state even if API fails
      sessionStorage.removeItem(AUTH_SESSION_KEY);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  /**
   * Check if user has one of the specified roles
   * IMPORTANT: This is for UI purposes only - always verify roles server-side
   */
  const hasRole = useCallback((roles: UserRole[]): boolean => {
    if (!state.user) return false;
    return roles.includes(state.user.role);
  }, [state.user]);

  /**
   * Check if user has admin access (owner, manager, or staff)
   * IMPORTANT: This is for UI purposes only - always verify roles server-side
   */
  const isAdmin = useCallback((): boolean => {
    return hasRole(["owner", "manager", "staff"]);
  }, [hasRole]);

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    hasRole,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
