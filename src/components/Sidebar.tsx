import React from 'react';
import { Home, Bookmark } from 'lucide-react';
import { usePost } from '../hooks/usePost';
import { useAuth } from '../hooks/useAuth';

export function Sidebar() {
  const { user } = useAuth();
  const { getSavedPosts } = usePost();
  const savedCount = user ? getSavedPosts(user.id).length : 0;

  const menuItems = [
    { icon: Home, label: 'Inicio', active: true },
    { icon: Bookmark, label: 'Guardados', count: savedCount },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sticky top-20">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
            {typeof item.count === 'number' && (
              <span className={`ml-auto ${item.active ? 'bg-white text-purple-500' : 'bg-gray-100'} text-xs px-2 py-1 rounded-full`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}