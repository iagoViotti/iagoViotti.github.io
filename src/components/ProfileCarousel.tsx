import React, { useEffect, useRef } from 'react';
import './ProfileCarousel.css';

const ProfileCarousel: React.FC = () => {
  const words = [
    'Perfil','Perfil','Perfil','Perfil','Perfil',
    'Perfil','Perfil','Perfil','Perfil','Perfil',
    'Perfil','Perfil','Perfil','Perfil','Perfil',
  ];

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let start = Date.now();
    let animationFrameId: number;
    const duration = 60 * 1000; 

    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;

      if (elapsed >= duration) {
        start = now;
      }

      const percentage = (elapsed % duration) / duration;
      track.style.transform = `translateX(${-percentage * 1000}%)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-track" ref={trackRef}>
        {words.concat(words).map((image, index) => (
          <div className="carousel-slide" key={index}>
            <h1>
              {image}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCarousel;
