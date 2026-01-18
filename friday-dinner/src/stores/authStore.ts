import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  completeOnboarding: (profileData: Partial<User>) => void;
}

// Mock user for testing
const createMockUser = (email: string, name: string): User => ({
  id: crypto.randomUUID(),
  email,
  name,
  phone: '',
  neighborhood: '',
  gender: 'other',
  ageGroup: '',
  jobCategory: '',
  interests: [],
  drinkingPref: 'moderate',
  talkStyle: 3,
  moodPref: 3,
  bio: '',
  isSubscribed: false,
  createdAt: new Date().toISOString(),
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        // Mock login - simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // For MVP, accept any email/password combination
        // In production, this would validate against Supabase
        if (email && password.length >= 6) {
          const existingUsers = JSON.parse(
            localStorage.getItem('mockUsers') || '[]'
          );

          const existingUser = existingUsers.find(
            (u: { email: string }) => u.email === email
          );

          if (existingUser) {
            set({ isLoggedIn: true, user: existingUser, isLoading: false });
            return true;
          } else {
            // For demo purposes, create user on login if not exists
            const newUser = createMockUser(email, email.split('@')[0]);
            existingUsers.push(newUser);
            localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
            set({ isLoggedIn: true, user: newUser, isLoading: false });
            return true;
          }
        }

        set({ isLoading: false });
        return false;
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true });

        // Mock signup - simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (email && password.length >= 6 && name) {
          const existingUsers = JSON.parse(
            localStorage.getItem('mockUsers') || '[]'
          );

          // Check if user already exists
          const userExists = existingUsers.some(
            (u: { email: string }) => u.email === email
          );

          if (userExists) {
            set({ isLoading: false });
            return false;
          }

          const newUser = createMockUser(email, name);
          existingUsers.push(newUser);
          localStorage.setItem('mockUsers', JSON.stringify(existingUsers));

          set({ isLoggedIn: true, user: newUser, isLoading: false });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({ isLoggedIn: false, user: null });
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          set({ user: updatedUser });

          // Update in mockUsers storage
          const existingUsers = JSON.parse(
            localStorage.getItem('mockUsers') || '[]'
          );
          const userIndex = existingUsers.findIndex(
            (u: { id: string }) => u.id === currentUser.id
          );
          if (userIndex !== -1) {
            existingUsers[userIndex] = updatedUser;
            localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
          }
        }
      },

      completeOnboarding: (profileData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...profileData };
          set({ user: updatedUser });

          // Update in mockUsers storage
          const existingUsers = JSON.parse(
            localStorage.getItem('mockUsers') || '[]'
          );
          const userIndex = existingUsers.findIndex(
            (u: { id: string }) => u.id === currentUser.id
          );
          if (userIndex !== -1) {
            existingUsers[userIndex] = updatedUser;
            localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user
      }),
    }
  )
);
