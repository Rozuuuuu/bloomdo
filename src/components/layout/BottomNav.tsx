import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Remove the prop if not used, or fix it
const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'tasks', icon: 'task_alt', label: 'Tasks', path: '/' },
    { id: 'calendar', icon: 'calendar_month', label: 'Calendar', path: '/calendar' },
    { id: 'stats', icon: 'analytics', label: 'Stats', path: '/stats' },
    { id: 'profile', icon: 'person', label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-off-white/95 dark:bg-near-black/90 backdrop-blur-2xl border-t border-border-warm dark:border-border-dark px-8 pb-8 pt-3 z-50">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map(item => {
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1"
              style={{ 
                color: active 
                  ? 'var(--color-golden-yellow, #FFC300)' 
                  : 'var(--color-chocolate-brown, #3E2723)' 
              }}
            >
              <span className={`material-symbols-outlined text-[26px] ${active ? 'font-bold' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;