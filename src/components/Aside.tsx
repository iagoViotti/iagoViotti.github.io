import { Home, User, Briefcase, Mail } from 'lucide-react';
import { Events, Link, scrollSpy } from 'react-scroll';
import React, { useEffect } from 'react';
import { useSection } from '../context/Context';
import { gsap } from 'gsap';
import './Aside.css';

interface SectionProps {
  id: string;
  icon: React.ElementType;
  label: string;
  isSelected: boolean;
}

const sectionData = [
  { id: 'home', icon: Home, label: 'hello' },
  { id: 'about', icon: User, label: 'sobre' },
  { id: 'portfolio', icon: Briefcase, label: 'portfolio' },
  { id: 'contact', icon: Mail, label: 'contato' },
];

const Section: React.FC<SectionProps> = ({ id, icon: Icon, label, isSelected }) => {
  return (
    <div className={`section ${isSelected ? 'selected' : ''}`} key={id}>
      {isSelected ? (
        <div className={`letter-container letter-container-${id}`}>
          {label.split('').map((letter, index) => (
            <span key={index} className={`letter-${id}`}>
              {letter}
            </span>
          ))}
        </div>
      ) : (
        <Icon size={30} className="icon" strokeWidth={2.5} />
      )}
    </div>
  );
};

const Aside: React.FC = () => {
  const { setSelectedSection, selectedSection } = useSection();

  useEffect(() => {
    scrollSpy.update();
    return () => Events.scrollEvent.remove('end');
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (selectedSection) {
        gsap.fromTo(
          `.letter-container-${selectedSection}`,
          { scale: 0 },
          { scale: 1, duration: 0.3, ease: 'expo.out' }
        );
      }
    });

    return () => ctx.revert(); // Clean up animations on component unmount
  }, [selectedSection]);

  return (
    <div id="aside">
      {sectionData.map((section) => (
        <Link
          to={section.id}
          key={`${section.id}link`}
          smooth={true}
          spy={true}
          onSetActive={(id) => setSelectedSection(id)}
        >
          <Section
            key={section.id}
            {...section}
            isSelected={selectedSection === section.id}
          />
        </Link>
      ))}
    </div>
  );
};

export default Aside;
