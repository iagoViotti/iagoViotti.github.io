import { createContext, useState, useContext } from 'react';

const Context = createContext<any>('');

export const useContextSomething = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useContextSomething must be used within a SomethingProvider');
  }
  return context;
};

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState('none');

  return (
    <Context.Provider
      value={{
        state, setState
      }}
    >
      {children}
    </Context.Provider>
  );
}