import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  isAdmin: boolean;
  notifications: boolean;
  darkMode: boolean;
  language: 'es' | 'en';
  privacy: {
    profileVisibility: 'public' | 'private';
    showOnline: boolean;
  };
}

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (userData: Omit<User, 'id' | 'isAdmin'>) => boolean;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  updatePrivacy: (privacy: Partial<User['privacy']>) => void;
  updatePreferences: (preferences: { notifications?: boolean; darkMode?: boolean; language?: 'es' | 'en' }) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isAuthenticated: false,
      login: (email, password) => {
        const user = get().users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: (userData) => {
        const users = get().users;
        const existingUser = users.find(
          (u) => u.email === userData.email || u.username === userData.username
        );
        
        if (existingUser) return false;

        // El primer usuario registrado será administrador
        const isFirstUser = users.length === 0;
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          isAdmin: isFirstUser, // Asigna isAdmin: true si es el primer usuario
        };

        set((state) => ({
          users: [...state.users, newUser],
          user: newUser,
          isAuthenticated: true,
        }));
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (data) =>
        set((state) => {
          if (!state.user) return state;
          const updatedUser = { ...state.user, ...data };
          return {
            user: updatedUser,
            users: state.users.map((u) =>
              u.id === updatedUser.id ? updatedUser : u
            ),
          };
        }),
      updatePrivacy: (privacy) =>
        set((state) => {
          if (!state.user) return state;
          const updatedUser = {
            ...state.user,
            privacy: { ...state.user.privacy, ...privacy },
          };
          return {
            user: updatedUser,
            users: state.users.map((u) =>
              u.id === updatedUser.id ? updatedUser : u
            ),
          };
        }),
      updatePreferences: (preferences) =>
        set((state) => {
          if (!state.user) return state;
          const updatedUser = { ...state.user, ...preferences };
          return {
            user: updatedUser,
            users: state.users.map((u) =>
              u.id === updatedUser.id ? updatedUser : u
            ),
          };
        }),
    }),
    {
      name: 'auth-storage', // Nombre para el almacenamiento local
    }
  )
);