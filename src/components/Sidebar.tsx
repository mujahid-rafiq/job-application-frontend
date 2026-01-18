import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../app-routes/constants';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  const menuItems = [
    { path: ROUTES.HOME, label: 'Apply for Job', icon: '📝' },
    { path: ROUTES.JOBLISTING, label: 'Job Listings', icon: '📋' }
  ];

  return (
    <aside className="w-64 bg-slate-700 text-white p-6 min-h-screen">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-500 text-white border-l-4 border-white'
                : 'hover:bg-slate-600'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;