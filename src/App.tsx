// import { useState } from 'react'
import Profile from './components/Profile'
import './App.css'

function App() {
  return (
    <div
      id='app-grid'
    >
      <div
        id='profile-grid-cell'
      >
        <Profile />
      </div>
      <div
        id='side-div'
      >
        sidediv
      </div>
    </div>
  )
}

export default App
