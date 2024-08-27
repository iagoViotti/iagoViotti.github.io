import { useDivMode } from './context/DivContext'
import { useEffect } from 'react'
import Profile from './components/Profile'
import BottomDiv from './components/BottomDiv'
import SideDiv from './components/SideDiv'
import './App.css'


function App() {
  const { divMode } = useDivMode()
  
  useEffect(() => {
    // a useeffect to track the divmode state and rerender in case the divmode changes
    console.log('DIVMODE (from app):', divMode)
  }, [divMode])

  
  return (
    <div
      id={`app-grid`}
      className={`app-grid-${divMode}`}
    >
      <Profile />
      <SideDiv />
      <BottomDiv />
    </div>
  )
}

export default App
