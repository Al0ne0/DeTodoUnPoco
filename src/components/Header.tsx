import React from 'react';
import { Search, Bell, MessageCircle, Menu, X, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';

interface HeaderProps {
  onSettingsClick: () => void;
}

export function Header({ onSettingsClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              De Todo Un Poco
            </h1>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute right-4 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-6 h-6 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MessageCircle className="w-6 h-6 text-gray-600" />
            </button>
            <button 
              onClick={onSettingsClick}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <SettingsIcon className="w-6 h-6 text-gray-600" />
            </button>
            <button 
              onClick={logout}
              className="p-2 hover:bg-gray-100 rounded-full text-red-500"
            >
              <LogOut className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold">
                  {user?.name[0].toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute right-4 top-2.5 text-gray-400 w-5 h-5" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6 text-gray-600" />
                <span>Notificaciones</span>
                {unreadCount > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-gray-600" />
                <span>Mensajes</span>
              </button>
              <button 
                onClick={onSettingsClick}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                <SettingsIcon className="w-6 h-6 text-gray-600" />
                <span>Configuración</span>
              </button>
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg text-red-500"
              >
                <LogOut className="w-6 h-6" />
                <span>Cerrar sesión</span>
              </button>
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold">
                      {user?.name[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="font-medium">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}