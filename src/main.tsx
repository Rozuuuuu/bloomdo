import React, { useEffect } from 'react'; // Add useEffect import
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import { useThemeStore } from './store/themeStore';
import './styles/globals.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Theme Initializer Component
function ThemeInitializer() {
  const { setTheme } = useThemeStore();
  
  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme-storage');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      const parsed = JSON.parse(savedTheme);
      setTheme(parsed.state.isDarkMode);
    } else if (prefersDark) {
      setTheme(true);
    }
  }, [setTheme]);
  
  return null;
}

function MainApp() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeInitializer />
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<MainApp />);