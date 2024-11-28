import './About.css'
import { ArrowRight } from 'lucide-react'

const About = () => {
  return (
    <div className="about-container">
      <div className="photo-container">
        <div className="photo-border">
          <img
            src="pfp_portfolio.JPG"
            alt="profile"
            className="photo"
          />
        </div>
        <div className="links-container">
          <div className="link-container" >
            <ArrowRight size={30} className="arrow" />
            <h2>curriculo</h2>
          </div>
          <div className="link-container">
            <ArrowRight size={30} className="arrow" />
            <h2>github</h2>
          </div>
        </div>
      </div>
      <div className="text-container">
        <span>
          Oi, eu sou o Iago Viotti, nascido e criado no Brasil, sou artista multidisciplinar e desenvolvedor front-end.<br />
          Como um grande entusiasta da tecnologia e da arte acredito na combinação das duas e estou sempre procurando novas formas de fazê-las caminharem juntas para criar experiências digitais interativas.
        </span>
      </div>
    </div>
  )
}

export default About
