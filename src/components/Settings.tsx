import React from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  User,
  Bell,
  Moon,
  Globe,
  Lock,
  Mail,
  Camera,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export function Settings() {
  const { user, updateUser, updatePrivacy, updatePreferences } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Configuración</h2>

      <div className="space-y-6">
        {/* Perfil */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            Perfil
          </h3>
          <div className="space-y-4 pl-7">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => updateUser({ name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => updateUser({ username: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Biografía
              </label>
              <textarea
                value={user.bio || ''}
                onChange={(e) => updateUser({ bio: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Foto de perfil
              </label>
              <div className="mt-1 flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {user.name[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Camera className="w-5 h-5" />
                  Cambiar foto
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Notificaciones */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificaciones
          </h3>
          <div className="space-y-4 pl-7">
            <div className="flex items-center justify-between">
              <span>Activar notificaciones</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.notifications}
                  onChange={(e) =>
                    updatePreferences({ notifications: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Apariencia */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Apariencia
          </h3>
          <div className="space-y-4 pl-7">
            <div className="flex items-center justify-between">
              <span>Modo oscuro</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.darkMode}
                  onChange={(e) =>
                    updatePreferences({ darkMode: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Idioma */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Idioma
          </h3>
          <div className="space-y-4 pl-7">
            <select
              value={user.language}
              onChange={(e) =>
                updatePreferences({ language: e.target.value as 'es' | 'en' })
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>
        </section>

        {/* Privacidad */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Privacidad
          </h3>
          <div className="space-y-4 pl-7">
            <div className="flex items-center justify-between">
              <span>Perfil privado</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.privacy.profileVisibility === 'private'}
                  onChange={(e) =>
                    updatePrivacy({
                      profileVisibility: e.target.checked ? 'private' : 'public',
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Mostrar cuando estoy en línea</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.privacy.showOnline}
                  onChange={(e) =>
                    updatePrivacy({ showOnline: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Cuenta */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Cuenta
          </h3>
          <div className="space-y-4 pl-7">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => updateUser({ email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}