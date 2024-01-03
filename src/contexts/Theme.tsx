import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextProps {
  theme: string | null;
  toggleTheme: () => void;
  removeDarkTheme: () => void;
  handleChangeColorMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('@uollet:theme')
      ? localStorage.getItem('@uollet:theme')
      : 'auto',
  );

  function handleChangeColorMode(mode: string) {
    setTheme(mode);
    localStorage.setItem('@uollet:theme', mode);
  }

  const colorScheme = document.documentElement;

  useEffect(() => {
    const cachedTheme = localStorage.getItem('@uollet:theme') || 'auto';
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    function onWindowMatchMediaChange(e: MediaQueryListEvent) {
      if (e.matches) {
        colorScheme.classList.add('dark');
        setTheme('auto');
      } else {
        colorScheme.classList.remove('dark');
        setTheme('auto');
      }
    }

    switch (cachedTheme) {
      case 'dark':
        colorScheme.classList.add('dark');
        setTheme('dark');
        break;
      case 'light':
        colorScheme.classList.remove('dark');
        setTheme('light');
        break;
      case 'auto':
        if (preferredTheme === 'dark') {
          colorScheme.classList.add('dark');
          setTheme('auto');
        } else {
          colorScheme.classList.remove('dark');
          setTheme('auto');
        }
        break;
      default:
        break;
    }

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', onWindowMatchMediaChange);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', onWindowMatchMediaChange);
    };
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('@uollet:theme', newTheme);
  }

  function removeDarkTheme() {
    setTheme('light');
    localStorage.setItem('@uollet:theme', 'light');
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        removeDarkTheme,
        handleChangeColorMode,
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
