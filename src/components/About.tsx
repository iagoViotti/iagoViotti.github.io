import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <div className="text-container">
        <h1>Iago Viotti</h1>
        <span>
          I am a full stack developer with experience in React, Node.js, and Express. I am passionate about creating clean, user-friendly applications that solve real-world problems.
        </span>
      </div>
      <div className="photo-container">
        <img
          src="https://avatars.githubusercontent.com/u/62115638?v=4"
          alt="profile"
          className="photo"
        />
      </div>
    </div>
  )
}

export default About
