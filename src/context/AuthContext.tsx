
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'vendor';
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  socialLogin: (provider: 'google' | 'facebook') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user data in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login for demo purposes
      if (email && password) {
        const newUser: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          role: email.includes('admin') ? 'admin' : email.includes('vendor') ? 'vendor' : 'customer',
          createdAt: new Date(),
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success('Login successful');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration for demo purposes
      if (email && password && name) {
        const newUser: User = {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          name,
          role: 'customer',
          createdAt: new Date(),
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success('Registration successful');
      } else {
        throw new Error('Invalid registration details');
      }
    } catch (error) {
      toast.error('Registration failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  const socialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful social login for demo purposes
      const newUser: User = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        email: `user_${Math.random().toString(36).substr(2, 5)}@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        role: 'customer',
        createdAt: new Date(),
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login successful`);
    } catch (error) {
      toast.error(`${provider} login failed: ` + (error instanceof Error ? error.message : 'Unknown error'));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      socialLogin,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
