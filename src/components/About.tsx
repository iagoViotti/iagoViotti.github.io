import './About.css'
import { ArrowRight } from 'lucide-react'
import AnimatedText from './AnimatedText'

const About = () => {
  return (
    <div className="about-container">
      <div className={`text-container`}>
        <AnimatedText />
      </div>
      <div className="photo-container">
        <div className="photo-border">
          <img
            src="pfp_portfolio.JPG"
            alt="profile"
            className="photo"
          />
        </div>
        <div className="links-container">
          <label
            className="link-container"
          >
            <ArrowRight size={30} className="arrow" />
            <h2>curriculo</h2>
          </label>
          <label
            className="link-container"
            onClick={() => window.open('https://github.com/iagoViotti')}>
            <ArrowRight size={30} className="arrow" />
            <h2>github</h2>
          </label>
        </div>
      </div>
    </div >
  )
}

export default About
