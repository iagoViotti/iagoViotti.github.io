import { Home, User, Briefcase, Mail } from 'lucide-react'
import { Events, Link, scrollSpy } from 'react-scroll'
import React, { useEffect } from 'react'
import { useSection } from '../context/Context'
import { gsap } from 'gsap'
import './Aside.css'


interface SectionProps {
  id: string
  icon: React.ElementType
  label: string
  isSelected: boolean
}

const sectionData = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
  { id: 'contact', icon: Mail, label: 'Contact' }
]

const Section: React.FC<SectionProps> = ({ id, icon: Icon, label, isSelected }) => {
  return (
    <div
      className={`section ${isSelected ? 'selected' : ''}`}
      key={id}
    >
      {isSelected ? (
        <div className={`letter-container letter-container-${id}`} >
          {label.split('').map((letter, index) => (
            <span key={index} className={`letter-${id}`}>
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
  const { setSelectedSection, selectedSection } = useSection()

  useEffect(() => {
    scrollSpy.update()
    return () => Events.scrollEvent.remove('end')
  }, [])

  useEffect(() => {
    if (selectedSection) {
      gsap.fromTo(
        `.letter-container-${selectedSection}`,
        { scale: 0 },
        { scale: 1, duration: 0.3, ease: "expo.out" }
      );
    }
  }, [selectedSection]);

  return (
    <div id="aside" >
      {sectionData.map((section) => (
        <Link to={section.id} key={`${section.id}link`} smooth='true' spy={true} onSetActive={(id) => setSelectedSection(id)}>
          <Section
            key={section.id}
            {...section}
            isSelected={selectedSection === section.id}
          />
        </Link>
      ))}
    </div>
  );
}

export default Aside;
