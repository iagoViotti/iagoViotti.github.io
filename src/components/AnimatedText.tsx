import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const placeholderText = `
          Oi, eu sou o Iago Viotti, brasileiro, artista multidisciplinar e desenvolvedor front-end.
          Como um grande entusiasta da tecnologia e da arte acredito na combinação das duas.
          Estou sempre procurando novas formas de fazê-las caminharem juntas para criar experiências digitais imersivas, agradáveis e com personalidade.`

const AnimatedText: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<string[]>([])

  useEffect(() => {
    setLines(placeholderText.split('\n'))
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      const lineElements = containerRef.current.querySelectorAll('.animated-line')

      lineElements.forEach((line) => {
        gsap.fromTo(
          line,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.5,
            scrollTrigger: {
              trigger: line,
              start: 'bottom bottom-=20',
              toggleActions: 'play none none reverse',
            }
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [lines])

  return (
    <div ref={containerRef}>
      {lines.map((line, index) => (
        <div key={index} className='line-wrapper'>
          <div className="animated-line">
            {line}
          </div>
          <div />
        </div>
      ))}
    </div>
  )
}

export default AnimatedText

