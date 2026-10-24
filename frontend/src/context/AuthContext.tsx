import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types/index.js';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  demoLogin: (role: UserRole) => void;
  logout: () => void;
}

const DEMO_USERS: Record<UserRole, User> = {
  USER: {
    id: 'usr_demo_customer_01',
    email: 'user@flowermarket.shop',
    name: 'Sarah Jenkins',
    role: 'USER',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    loyaltyPoints: 340,
  },
  ADMIN: {
    id: 'adm_demo_director_02',
    email: 'admin@flowermarket.shop',
    name: 'Elena Rostova',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    loyaltyPoints: 1200,
  },
  MANAGER: {
    id: 'mng_demo_inventory_03',
    email: 'manager@flowermarket.shop',
    name: 'Marcus Vance',
    role: 'MANAGER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    loyaltyPoints: 850,
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('flora_user');
    const savedToken = localStorage.getItem('flora_access_token');
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (e) {
        localStorage.removeItem('flora_user');
        localStorage.removeItem('flora_access_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    // Check if email belongs to a demo role
    const matched = Object.values(DEMO_USERS).find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    const targetUser = matched || {
      id: `usr_${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: 'USER' as UserRole,
    };

    const mockToken = `jwt_token_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    setUser(targetUser);
    setToken(mockToken);
    localStorage.setItem('flora_user', JSON.stringify(targetUser));
    localStorage.setItem('flora_access_token', mockToken);
  };

  const demoLogin = (role: UserRole) => {
    const demo = DEMO_USERS[role];
    const mockToken = `jwt_token_demo_${role}_${Date.now()}`;
    setUser(demo);
    setToken(mockToken);
    localStorage.setItem('flora_user', JSON.stringify(demo));
    localStorage.setItem('flora_access_token', mockToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('flora_user');
    localStorage.removeItem('flora_access_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        demoLogin,
        logout,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
