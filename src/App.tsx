import './App.css'
import Home from './components/Home'
import About from './components/About'
import Portfolio from './components/Portfolio'
import { Element } from 'react-scroll'

function App() {
  return (
    <div className='app'>
      <Element name='home'>
        <div id='home' className="page-section" >
          <Home />
        </div>
      </Element>
      <Element name='about'>
        <div className="page-section" >
          <About />
        </div>
      </Element>
      <Element name='portfolio'>
        <div className="page-section" >
          <Portfolio />
        </div>
      </Element>
      <Element name='contact'>
        <div className="page-section" >
          <h1 className="title">
            Contact
          </h1>
        </div>
      </Element>
    </div >
  )
}

export default App
