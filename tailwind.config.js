/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Focus Mode Colors (New)
        "primary": "#f4c025",
        "ivory": "#f8f8f5",
        "background-light": "#f8f8f5",
        "background-dark": "#0d0c09",
        "surface": "#1a1812",

        // Profile Page Colors
        "profile-bg-dark": "#121212",
        "profile-card-dark": "#1c1c1c",
        "profile-muted-gold": "#393528",

        // Settings Page Colors
        "settings-bg-dark": "#181611",
        "settings-card-dark": "#221e10",

        // Team Page Colors
        "team-bg-dark": "#0d0c09",

        // Light Theme Colors
        "golden-yellow": "#FFC300",
        "chocolate-brown": "#3E2723",
        // 'dark-golden': '#FFC300', // duplicate removed
        "leaf-green": "#4CAF50",
        "off-white": "#FDFBF7",
        "border-warm": "#E8E2D9",
        "priority-high": "#FFC300",
        "priority-medium": "#8D6E63",
        "priority-low": "#4CAF50",
        // 'golden-yellow': '#FFC300', // duplicate removed
        "dark-golden": "#FFC300",
        // 'leaf-green': '#4CAF50', // duplicate removed
        "dark-leaf-green": "#81B622",
        // 'chocolate-brown': '#3E2723', // duplicate removed
        // 'ivory': '#FDFBF7', // duplicate overridden by Focus Mode
        // 'border-warm': '#E8E2D9', // duplicate removed
        "border-dark": "#2A2A2A",
        "dark-charcoal": "#121212",
        "near-black": "#0A0A0A",

        // Task Details colors
        // "primary": "#f4c025", // duplicate overridden by Focus Mode
        // "background-light": "#f8f8f5", // duplicate overridden by Focus Mode
        // "background-dark": "#121212", // duplicate overridden by Focus Mode
        "surface-dark": "#1e1e1e",
        // "ivory": "#f9f9f7", // duplicate overridden by Focus Mode

        // Calendar Theme Colors
        "calendar-yellow": "#FFBF00",
        "calendar-amber": "#F59E0B",
        "calendar-green": "#16A34A",
        "calendar-cocoa": "#44403C",
        "calendar-sepia": "#78716C",
        "grid-brown": "#EFEBE9",
        "sepia-brown": "#78716C",
        "calendar-grid": "#EFEBE9",
        "amber-accent": "#F59E0B",
        "calendar-warm": "#FAFAF9",

        // Task Form Colors
        "form-yellow": "#FDB813",
        "form-dark-yellow": "#E5A100",
        "form-deep-chocolate": "#3E2723",
        "form-stem-green": "#4C7031",
        "form-light-green": "#769B56",
        "form-pale-green": "#F1F5E9",
        "form-amber-light": "#FFF8E1",
        "form-amber": "#FFC107",
        "form-cream": "#FAF9F6",
        "form-border": "#D7CCC8",
        "text-secondary": "#6D4C41",
        "border-sepia": "#D7CCC8",
        "sun-amber-light": "#FFF8E1",

        // Dependency Map Colors
        "dep-yellow": "#FDB813",
        "dep-deep-brown": "#3E2723",
        "dep-leaf-green": "#2E7D32",
        "dep-cream-bg": "#FFFDF5",
        "dep-node-border": "#5D4037",

        // Dark Theme Colors
        // "dark-charcoal": "#121212", // duplicate
        // "near-black": "#0A0A0A", // duplicate
        // "ivory": "#FDFBF7", // duplicate
        "cream": "#F5F5DC",
        // "dark-golden": "#FFC300", // duplicate
        "dark-deep-brown": "#2D1B10",
        // "dark-leaf-green": "#81B622", // duplicate
        "dark-amber": "#FFBF00",
        // "border-dark": "#2A2A2A", // duplicate

        // Dark Calendar Colors
        "dark-calendar-yellow": "#FFBF00",
        "dark-amber-vibrant": "#F59E0B",
        "dark-calendar-green": "#22C55E",
        "dark-calendar-charcoal": "#121212",
        "dark-calendar-grid": "#2D2A28",
        "dark-light-cream": "#F5F5F0",
        "dark-muted-cream": "#A8A29E",
        "dark-brown-grid": "#2D2A28",
        "light-cream": "#F5F5F0",
        "muted-cream": "#A8A29E",
        "dark-surface": "#1C1C1A",
        "dark-surface": "#1C1C1A",

        // Stats page colors
        // "primary": "#f4c025", // duplicate
        // "background-light": "#f8f8f5", // duplicate
        // "background-dark": "#121212", // duplicate
        // "surface-dark": "#1e1e1a", // duplicate
        "accent-amber": "#d97706",
        "accent-green": "#4ade80",
        "slate": {
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },

        // Dark Form Colors
        "dark-form-yellow": "#FDB813",
        "dark-form-dark-yellow": "#D49A0F",
        "dark-form-deep-chocolate": "#211614",
        "dark-form-surface": "#2A1D1A",
        "dark-form-border": "#4E342E",
        "dark-form-stem-green": "#769B56",
        "dark-form-leaf-green": "#4C7031",
        "dark-form-dim-green": "rgba(76, 112, 49, 0.2)",
        "dark-form-amber": "#FFC107",
        "dark-form-dim-amber": "rgba(255, 193, 7, 0.15)",
        "border-brown": "#4E342E",
        "sun-amber-dim": "rgba(255, 193, 7, 0.15)",
        "text-light": "#EFEBE9",
        "text-muted": "#A1887F",

        // Dark Dependency Colors
        "dark-dep-yellow": "#FDB813",
        "dark-dep-deep-brown": "#211A18",
        "dark-dep-node-cream": "#F5F5DC",
        "dark-dep-locked-amber": "#5E4D36",
        "dark-dep-leaf-green": "#43A047",
        "dark-dep-bg": "#12100E",
      },
      fontFamily: {
        "sans": ["Inter", "system-ui", "sans-serif"],
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem"
      },
      boxShadow: {
        'glow': '0 0 20px rgba(253, 184, 19, 0.3)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}