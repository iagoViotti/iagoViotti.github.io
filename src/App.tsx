import Folder from "./components/Folder"
import File from "./components/File"
import OpenedFile from "./components/OpenedFile"
import OpenedFolder from "./components/OpenedFolder"
import OpenedFolderMobile from "./components/OpenedFolderMobile"
import OpenedFileMobile from "./components/OpenedFileMobile"
import { useSelect } from "./context/SelectContext"
import "./App.css"
import { portfolio, bio } from "./assets/mocks"
import { createRef, useEffect, useState } from "react"
import ThemeButton from "./components/ThemeButton"


const App = () => {
  const { setSelected } = useSelect()
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

  const handleClick = () => {
    setSelected('none')
  }

  const isMobile = window.innerWidth < 768

  return (
    <div>
      {/* <div className="app-background" onClick={() => handleClick()} /> */}
      <div className="App" id="app">
        <div className='header'>
          C:/ POTFOLIO
          <div className="config">
            <ThemeButton />
          </div>
        </div>
        <div className="grid">
          <h1 className="home-title">iago</h1>
          <div className='main-container'>
            <div className="home-subtitle-container">
              <h2 className="home-subtitle">web</h2>
              <div className="console-container">
                <span id="motion-text" ref={textRef}></span>
                <span id="console" className={`console-underscore ${visible ? '' : 'hidden'}`}>_</span>
              </div>
            </div>
            <div className='text' >
              <span>
                Desenvolvedor Full-stack ✦︎
                Artista multidisciplinar
              </span>
            </div>
          </div>
          <Folder {...portfolio} />
          <File {...bio} />
        </div>
        {isMobile ? <OpenedFileMobile /> : <OpenedFile />}
        {isMobile ? <OpenedFolderMobile /> : <OpenedFolder />}
      </div>
    </div>
  )
}

export default App
