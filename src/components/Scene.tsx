import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { useEffect, useState } from 'react'
import CameraControls from './CameraControls'
import { SphereType } from '../types/Index'
import AnimatedSpheres from './AnimatedSpheres'


const Scene = () => {
  const [spheres, setSpheres] = useState<SphereType[]>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);


  const addSpheres = (qntt: number) => {
    const newSpheres: SphereType[] = [];
    for (let i = 0; i < qntt; i++) {
      newSpheres.push({
        position: [
          Math.random() * 5 - 10,
          Math.random() * 5 - 10,
          Math.random() * 5 - 10,
        ],
        args: [0.01, 32, 16],
        color: `hsl(${Math.random() * 20}, 100%, 60%)`,
      });
    }
    setSpheres(newSpheres);
  };

  useEffect(() => addSpheres(10), []);
  useEffect(() => {
    const onWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize)
    return () => {
      window.removeEventListener('resize', onWindowResize), [width, height]
    }
  }, [width, height]);

  return (
    <div className='canvas-container' >
      <Canvas>
        {/* <gridHelper args={[10, 10]} />
        <axesHelper args={[10]} /> */}
        <PerspectiveCamera
          makeDefault
          fov={60}
          aspect={width / height}
          near={0.01}
          far={100}
          position={[0, 0, 5]}
        />
        <CameraControls />
        <ambientLight intensity={1} />
        <pointLight position={[0, 10, 10]} />
        <AnimatedSpheres spheres={spheres} />
      </Canvas>
    </div>
  )
}

export default Scene;

