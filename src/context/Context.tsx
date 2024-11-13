import { createContext, useContext, useState } from 'react';

const SectionContext = createContext<any>('');

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within a SomethingProvider');
  }
  return context;
};

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSection, setSelectedSection] = useState('home')

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionContext.Provider
      value={{
        selectedSection, setSelectedSection, scrollToSection
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}