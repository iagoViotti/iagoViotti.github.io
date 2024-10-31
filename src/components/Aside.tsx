import { Home, User, Briefcase, Mail } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSection } from '../context/Context'
import './Aside.css'

const sectionData = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'portfolio', icon: Briefcase, label: 'portfolio' },
  { id: 'contact', icon: Mail, label: 'Contact' }
]

interface SectionProps {
  id: string
  icon: React.ElementType
  label: string
  isSelected: boolean
  onClick: () => void
}

const Section: React.FC<SectionProps> = ({ id, icon: Icon, label, isSelected, onClick }) => {
  return (
    <div
      className={`section ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {isSelected ? (
        <div className="writing-vertical text-lg font-semibold">
          {label.split('').map((letter, index) => (
            <span key={index}>
              {letter}
            </span>
          ))}
        </div>
      ) : (
        <Icon />
      )}
    </div>
  )
}

const Aside = () => {
  const { scrollToSection, homeRef, aboutRef, portfolioRef, contactRef, setSelectedSection, selectedSection } = useSection()

  const handleClick = (id: string) => {
    setSelectedSection(id)
    if (id === 'home') scrollToSection(homeRef)
    if (id === 'about') scrollToSection(aboutRef)
    if (id === 'portfolio') scrollToSection(portfolioRef)
    if (id === 'contact') scrollToSection(contactRef)
  }

  useEffect(() => {
    console.log(homeRef.current);
    
  }, [selectedSection]);


  return (
    <div id="aside" >
      {sectionData.map((section) => (
        <Section
          key={section.id}
          {...section}
          isSelected={selectedSection === section.id}
          onClick={() => handleClick(section.id)}
        />
      ))}
    </div>
  );
}

export default Aside;
