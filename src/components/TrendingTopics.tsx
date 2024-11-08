import React from 'react';
import { TrendingUp, Users } from 'lucide-react';

export function TrendingTopics() {
  const trends = [
    { tag: '#Tecnología', posts: '12.5K posts' },
    { tag: '#Viajes', posts: '8.2K posts' },
    { tag: '#Desarrollo', posts: '6.7K posts' },
    { tag: '#WebDev', posts: '5.9K posts' },
  ];

  const suggestions = [
    { name: 'Ana Developer', username: '@ana_dev', avatar: 'A' },
    { name: 'Tech News', username: '@technews', avatar: 'T' },
    { name: 'Web Design', username: '@webdesign', avatar: 'W' },
  ];

  return (
    <div className="space-y-6 sticky top-20">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          <h2 className="font-semibold text-lg">Tendencias</h2>
        </div>
        <div className="space-y-4">
          {trends.map((trend) => (
            <div key={trend.tag} className="group cursor-pointer">
              <h3 className="font-medium group-hover:text-purple-500 transition-colors">
                {trend.tag}
              </h3>
              <p className="text-sm text-gray-500">{trend.posts}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-purple-500" />
          <h2 className="font-semibold text-lg">A quién seguir</h2>
        </div>
        <div className="space-y-4">
          {suggestions.map((user) => (
            <div key={user.username} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{user.avatar}</span>
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.username}</p>
                </div>
              </div>
              <button className="text-sm font-semibold text-purple-500 hover:text-purple-600 transition-colors">
                Seguir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}