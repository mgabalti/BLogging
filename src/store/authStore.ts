import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import api from '@/lib/api';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  hasRole: (role: string) => boolean;
  isReader: () => boolean;
  isWriter: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginRequest) => {
        try {
          set({ isLoading: true });
          const response = await api.post<AuthResponse>('/auth/login', credentials);
          const { token, refreshToken, user } = response.data;

          // Store tokens in cookies
          Cookies.set('auth-token', token, { expires: 1 }); // 1 day
          Cookies.set('refresh-token', refreshToken, { expires: 7 }); // 7 days

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData: RegisterRequest) => {
        try {
          set({ isLoading: true });
          const response = await api.post<AuthResponse>('/auth/register', userData);
          const { token, refreshToken, user } = response.data;

          // Store tokens in cookies
          Cookies.set('auth-token', token, { expires: 1 }); // 1 day
          Cookies.set('refresh-token', refreshToken, { expires: 7 }); // 7 days

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        // Remove tokens from cookies
        Cookies.remove('auth-token');
        Cookies.remove('refresh-token');

        set({
          user: null,
          isAuthenticated: false,
        });
      },

      checkAuth: () => {
        const token = Cookies.get('auth-token');
        if (!token) {
          set({
            user: null,
            isAuthenticated: false,
          });
          return;
        }

        // If we have a token but no user, we should validate it
        // For now, we'll assume the token is valid if it exists
        // In a production app, you might want to validate the token with the server
      },

      hasRole: (role: string) => {
        const { user } = get();
        return user?.roles.includes(role) || false;
      },

      isReader: () => {
        const { hasRole } = get();
        return hasRole('Reader');
      },

      isWriter: () => {
        const { hasRole } = get();
        return hasRole('Writer');
      },

      isAdmin: () => {
        const { hasRole } = get();
        return hasRole('SuperAdmin');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 