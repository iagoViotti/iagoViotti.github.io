import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<any>('');

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme }}
    >
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}