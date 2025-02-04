import './Contact.css'
import { Mail, Github, Linkedin } from 'lucide-react'
import { useState } from 'react'

const Contact = () => {
  const [mailHover, setMailHover] = useState(false)

  const handleMail = () => {
    window.open('mailto: iago.viotti@gmail.com')
    navigator.clipboard.writeText('iago.viotti@gmail.com')
  }

  return (
    <div className="contact-container">
      <div className="main">
        <div className="contact-title">
          <h2>Social</h2>
          <h1>Contato</h1>
        </div>
      </div>
      <div className="bottom-main">
        <div className="contact-svgs">
          <div className="social-labels">
            <label
              className='svg-label'
              data-label='github'
              onClick={() => window.open('https://github.com/iagoViotti')}
            >
              <Github size={35} />
            </label>
            <label
              className='svg-label'
              data-label='linkedin'
              onClick={() => window.open('https://www.linkedin.com/in/iagoviotti')}
            >
              <Linkedin size={35} />
            </label>
          </div>
          <div
            className="mail-label-div"
          >
            <label
              className={`svg-label mail-svg ${mailHover ? 'mail-svg-hover' : ''}`}
              // onMouseOver={() => setMailHover(true)}
              // onMouseLeave={() => setMailHover(false)}
            >
              <Mail size={35} color={'transparent'} />
            </label>
            <label
              className='svg-label mail-label'
              onClick={() => handleMail()}
              // onMouseEnter={() => setMailHover(true)}
              // onMouseLeave={() => setMailHover(false)}
            >
              <Mail size={35} />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
