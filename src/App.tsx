import { useDivMode } from './context/DivContext'
import { useEffect } from 'react'
import Profile from './components/Profile'
import BottomDiv from './components/BottomDiv'
import './App.css'


function App() {
  const { divMode } = useDivMode()
  
  // a useeffect to track the divmode state and rerender in case the divmode changes
  useEffect(() => {
    console.log('DIVMODE (from app):', divMode)
  }, [divMode])

  
  return (
    <div
      id={`app-grid`}
      className={`app-grid-${divMode}`}
    >
      <Profile />
      <div
        id='side-div'
        className={`side-div-${divMode}`}
      >
        Side-div
      </div>
      <BottomDiv />
    </div>
  )
}

export default App
