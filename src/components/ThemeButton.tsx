import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';
import { useRef } from 'react';
import './ThemeButton.css';

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const themeRef = useRef<HTMLDivElement>(null);


  const handleClick = () => {
    const gAnimate = gsap.to('.theme-icon-container', {
      duration: 0.5,
      rotate: '-=180',
      ease: 'expo.out',
      onComplete: () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }
    });
    gAnimate.play();
  };


  return (
    <div className='theme-container'>
      <label
        className="theme-button"
      >
        <button
          className='theme-button'
          onClick={() => handleClick()}
          style={{ display: 'none' }}
        >
        </button>
        <Sun size={36} color={'transparent'} />
      </label>
      <div className="theme-icon-container" ref={themeRef}>
        <Sun size={36} color={'#414141'} strokeWidth={2.3} className="theme-icon sun" />
        <Moon size={36} color={'white'} strokeWidth={2.3} className="theme-icon moon" />
      </div>
    </div>
  );
}

export default ThemeButton;