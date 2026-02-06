import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';
import { useTodoStore } from '../../store/todoStore';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { searchQuery, setSearchQuery } = useTodoStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery('');
    } else {
      setIsSearchOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-off-white/90 dark:bg-near-black/80 backdrop-blur-xl border-b border-border-warm dark:border-border-dark transition-colors duration-200">
      <div className="flex items-center px-5 py-4 justify-between max-w-lg mx-auto w-full h-[73px]">
        {isSearchOpen ? (
          <div className="flex items-center w-full gap-3 animate-fade-in-right">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 dark:text-ivory/50">
                search
              </span>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-white/10 border border-border-warm dark:border-white/10 rounded-xl text-chocolate-brown dark:text-ivory placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
              />
            </div>
            <button
              onClick={handleSearchToggle}
              className="p-2 text-gray-500 dark:text-ivory/60 hover:text-chocolate-brown dark:hover:text-ivory bg-transparent hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2.5 animate-fade-in-left">
              <div className="bg-golden-yellow dark:bg-dark-golden text-chocolate-brown dark:text-near-black rounded-lg flex size-8 items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-xl font-bold">
                  check_circle
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-chocolate-brown dark:text-ivory">
                BloomDo
              </h2>
            </div>
            <div className="flex items-center gap-3 animate-fade-in">
              <button
                onClick={handleSearchToggle}
                className="flex size-9 items-center justify-center rounded-full bg-border-warm/30 dark:bg-border-dark text-chocolate-brown dark:text-ivory hover:bg-border-warm/50 dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">search</span>
              </button>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex size-9 items-center justify-center rounded-full bg-border-warm/30 dark:bg-border-dark text-chocolate-brown dark:text-ivory hover:bg-border-warm/50 dark:hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isDarkMode ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="size-9 rounded-full overflow-hidden border border-border-warm dark:border-border-dark hover:opacity-80 transition-opacity"
              >
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyGvW92bGUaXAr1M-uVGOxV9gz6gvPmYWhMTOQCwDFdZG0_n-1n4SXkr-5zo0wM6bZ0mKJu-NjwtOyFz3O_D8YWq4TqRtQzc19Un9cxtDPQr-aOs4zlGprBtWR3Go04J1GMcS9z4tTbWAH-r6dsngCxbUgcPhem8Nsc8YKuEJFlkenW61yr-O0ypFQz-Wwu8E3asWWFHgwk9CSJ4_a7_y5Jks8g2MLz4ph1VhYD7L4VFAExS7Gyt4HNz3NtEzHl7zDFZQ7SXOPNWv-"
                />
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
