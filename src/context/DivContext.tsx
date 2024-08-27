import { createContext, useState, useContext } from 'react';

const DivContext = createContext<any>('');

export const useDivMode = () => {
  const context = useContext(DivContext);
  if (!context) {
    throw new Error('useDivMode must be used within a ModalProvider');
  }
  return context;
};

export const DivProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [divMode, setDivMode] = useState('none');

  return (
    <DivContext.Provider value={{ divMode, setDivMode }}>
      {children}
    </DivContext.Provider>
  );
}