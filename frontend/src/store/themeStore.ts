import { create } from 'zustand';

export type ThemeType = 'dark' | 'light' | 'aurora' | 'cyber' | 'ocean';

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  // Read initial theme from localStorage if available, fallback to dark
  const initialTheme = (typeof localStorage !== 'undefined' && localStorage.getItem('codeflow_theme') as ThemeType) || 'dark';

  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    // Clear old themes
    root.classList.remove('light', 'dark', 'theme-dark', 'theme-light', 'theme-aurora', 'theme-cyber', 'theme-ocean');
    // Add current theme
    root.classList.add(`theme-${initialTheme}`);
    if (initialTheme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.add('dark');
    }
  }

  return {
    theme: initialTheme,
    setTheme: (theme: ThemeType) => {
      if (typeof window !== 'undefined') {
        const root = document.documentElement;
        root.classList.remove('light', 'dark', 'theme-dark', 'theme-light', 'theme-aurora', 'theme-cyber', 'theme-ocean');
        root.classList.add(`theme-${theme}`);
        if (theme === 'light') {
          root.classList.add('light');
        } else {
          root.classList.add('dark');
        }
        localStorage.setItem('codeflow_theme', theme);
      }
      set({ theme });
    }
  };
});
