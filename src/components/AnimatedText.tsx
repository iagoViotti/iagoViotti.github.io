import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const placeholderText = `Oi! Eu sou o Iago Viotti, brasileiro, artista multidisciplinar e desenvolvedor front-end.
Apaixonado por tecnologia e arte, acredito no poder da combinação entre os dois universos para criar experiências digitais que vão além do funcional — experiências que encantam, comunicam e tem alma.
Exploro constantemente novas formas de integrar estética e interatividade, buscando projetos que unam design, criatividade e inovação.
Meu foco é desenvolver interfaces que não só funcionem bem, mas que também despertem emoções e reflitam personalidade.`

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

