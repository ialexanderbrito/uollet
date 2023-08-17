import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
  removeDarkTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {
  const themeStorage = localStorage.getItem('@finance:theme');
  const [theme, setTheme] = useState(themeStorage || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    localStorage.setItem('@finance:theme', theme === 'dark' ? 'light' : 'dark');
  }

  function removeDarkTheme() {
    setTheme('light');
    localStorage.setItem('@finance:theme', 'light');
    document.documentElement.classList.remove('dark');
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        removeDarkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);

  return context;
}
