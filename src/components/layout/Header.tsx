import React from 'react';
import { toast } from 'react-hot-toast';
import { useThemeStore } from '../../store/themeStore';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  const handleFeatureClick = (feature: string) => {
    toast(`The ${feature} feature is coming soon!`, {
      icon: '🚧',
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-off-white/90 dark:bg-near-black/80 backdrop-blur-xl border-b border-border-warm dark:border-border-dark">
      <div className="flex items-center px-5 py-4 justify-between max-w-lg mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="bg-golden-yellow dark:bg-dark-golden text-chocolate-brown dark:text-near-black rounded-lg flex size-8 items-center justify-center">
            <span className="material-symbols-outlined text-xl font-bold">
              check_circle
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-chocolate-brown dark:text-ivory">
            BloomDo
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleFeatureClick('Global Search')}
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
            onClick={() => handleFeatureClick('User Profile')}
            className="size-9 rounded-full overflow-hidden border border-border-warm dark:border-border-dark hover:opacity-80 transition-opacity"
          >
            <img
              alt="Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyGvW92bGUaXAr1M-uVGOxV9gz6gvPmYWhMTOQCwDFdZG0_n-1n4SXkr-5zo0wM6bZ0mKJu-NjwtOyFz3O_D8YWq4TqRtQzc19Un9cxtDPQr-aOs4zlGprBtWR3Go04J1GMcS9z4tTbWAH-r6dsngCxbUgcPhem8Nsc8YKuEJFlkenW61yr-O0ypFQz-Wwu8E3asWWFHgwk9CSJ4_a7_y5Jks8g2MLz4ph1VhYD7L4VFAExS7Gyt4HNz3NtEzHl7zDFZQ7SXOPNWv-"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;