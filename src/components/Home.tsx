import { ArrowBigDownDash } from 'lucide-react';
import './Home.css';
import { createRef, useEffect, useState } from 'react';
import { Link } from 'react-scroll';

const Home = () => {
  const [words] = useState(['Developer', 'Designer', 'Artist']);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(1);
  const [x, setX] = useState(1);
  const [waiting, setWaiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const textRef = createRef<HTMLSpanElement>();

  useEffect(() => {
    const target = textRef.current;

    if (!target) return;

    const interval = setInterval(() => {
      if (letterCount === 0 && !waiting) {
        setWaiting(true);
        target.innerHTML = words[currentWordIndex].substring(0, letterCount);
        setTimeout(() => {
          const newWords = [...words];
          const usedWord = newWords.shift();
          newWords.push(usedWord!);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          setLetterCount(1);
          setX(1);
          setWaiting(false);
        }, 1000);
      } else if (letterCount === words[currentWordIndex].length + 1 && !waiting) {
        setWaiting(true);
        setTimeout(() => {
          setX(-1);
          setLetterCount((prevCount) => prevCount + x);
          setWaiting(false);
        }, 1000);
      } else if (!waiting) {
        target.innerHTML = words[currentWordIndex].substring(0, letterCount);
        setLetterCount((prevCount) => prevCount + x);
      }
    }, 120);

    const underscoreInterval = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(underscoreInterval);
    };
  }, [letterCount, waiting, x, words, currentWordIndex]);

  return (
    <div className="home-container">
      <div className='config'>
        config
      </div>
      <div className="main">
        <h1 className="home-title">iago</h1>
        <div className='main-container'>
          <div className="home-subtitle-container">
            <h2 className="home-subtitle">web</h2>
            <div className="console-container">
              <span id="text" ref={textRef}></span>
              <span id="console" className={`console-underscore ${visible ? '' : 'hidden'}`}>_</span>
            </div>
          </div>
          <div className='text' >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem et maiores quam non, architecto magni quas quae ullam minima totam optio, fugiat doloribus tempore ea eligendi qui inventore nostrum nihil?
            </span>
          </div>
        </div>
      </div>
      <div className='footer'>
        <Link
          to='about'
          smooth='true'
          className='arrow-button'
        >
          <ArrowBigDownDash size={80} id='arrowBigDownDash' />
        </Link>
      </div>
    </div>
  )
}

export default Home;
