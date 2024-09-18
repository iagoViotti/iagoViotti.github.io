import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useEffect, useState } from 'react'
// import { useScroll } from '@react-three/drei'


const CameraControls = () => {
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0, z: 3 });
  // const ref = useRef();
  // const data = useScroll();

  const onMouseMove = (event: MouseEvent) => {
    setMouse({
      x: (event.clientX - (window.innerWidth / 2)) / 100,
      y: (event.clientY - (window.innerHeight / 2)) / 100,
      z: 5
    });
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);


  useFrame(() => {    
    camera.position.x += (mouse.x - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y - camera.position.y) * 0.05;
    camera.lookAt(new Vector3(0, 0, 0));
    
  });

  return null;
}

export default CameraControls;
