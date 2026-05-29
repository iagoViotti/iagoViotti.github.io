import { createContext, useContext, useState, useEffect } from 'react';

type theme = 'light' | 'dark'

interface ThemeContextType {
  theme: theme;
  setTheme: (theme: theme) => void;
}

const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light' as theme);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme }}
    >
      <div className={theme}
        style={{
          height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
        }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}