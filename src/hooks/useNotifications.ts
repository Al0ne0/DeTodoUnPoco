import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'share';
  message: string;
  from: {
    name: string;
    username: string;
    avatar?: string;
  };
  postId?: string;
  read: boolean;
  timestamp: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotifications = create<NotificationState>((set) => ({
  notifications: [
    {
      id: '1',
      type: 'like',
      message: 'le dio me gusta a tu publicación',
      from: {
        name: 'Ana Developer',
        username: '@ana_dev',
      },
      postId: '1',
      read: false,
      timestamp: 'Hace 5 minutos',
    },
    {
      id: '2',
      type: 'comment',
      message: 'comentó en tu publicación',
      from: {
        name: 'Tech News',
        username: '@technews',
      },
      postId: '2',
      read: false,
      timestamp: 'Hace 15 minutos',
    },
  ],
  unreadCount: 2,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Date.now().toString(),
          read: false,
          timestamp: 'Ahora',
        },
        ...state.notifications,
      ],
      unreadCount: state.unreadCount + 1,
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
      unreadCount: state.unreadCount - 1,
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  clearNotifications: () =>
    set({
      notifications: [],
      unreadCount: 0,
    }),
}));