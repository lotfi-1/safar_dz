import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  preferences: {
    language: 'ar' | 'en';
    notifications: boolean;
  };
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  updateUser: async () => {},
});

const USER_KEY = '@app_user';
const AUTH_TOKEN_KEY = '@app_auth_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const savedUser = await AsyncStorage.getItem(USER_KEY);
      const savedToken = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      
      if (email === 'test@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'أحمد محمد',
          email: email,
          phone: '+213 123 456 789',
          preferences: {
            language: 'ar',
            notifications: true,
          },
        };
        
        const mockToken = 'mock_auth_token_' + Date.now();
        
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(mockUser));
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, mockToken);
        
        setUser(mockUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
      
      if (userData.password === userData.confirmPassword) {
        const newUser: User = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          preferences: {
            language: 'ar',
            notifications: true,
          },
        };
        
        const mockToken = 'mock_auth_token_' + Date.now();
        
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, mockToken);
        
        setUser(newUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY);
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...userData };
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const value: AuthContextProps = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
