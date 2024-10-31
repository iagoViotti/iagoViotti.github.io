import { createContext, useContext, useRef, useState } from 'react';

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
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionContext.Provider
      value={{
        selectedSection, setSelectedSection,
        homeRef, aboutRef, portfolioRef, contactRef, scrollToSection
      }}
    >
      {children}
    </SectionContext.Provider>
  );
}