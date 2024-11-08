import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Feed } from './components/Feed';
import { TrendingTopics } from './components/TrendingTopics';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Settings } from './components/Settings';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = React.useState(true);
  const [showSettings, setShowSettings] = React.useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
        {showLogin ? (
          <Login onToggleForm={() => setShowLogin(false)} />
        ) : (
          <Register onToggleForm={() => setShowLogin(true)} />
        )}
      </div>
    );
  }

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onSettingsClick={() => setShowSettings(false)} />
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <Settings />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSettingsClick={() => setShowSettings(true)} />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-6">
            <Feed />
          </div>
          <div className="lg:col-span-3">
            <TrendingTopics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;