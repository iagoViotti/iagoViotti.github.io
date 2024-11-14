import './About.css'

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
      </div>
      <div className="text-container">
        <span>
          {/* placeholder text */}
          I am a full stack developer with experience in React, Node.js, and Express. I am passionate about creating clean, user-friendly applications that solve real-world problems.
          {/* placeholder text */}
        </span>
      </div>
    </div>
  )
}

export default About
