import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import * as THREE from 'three';
import CameraControls from './CameraControls'
import { SphereType } from '../types/Index'


const Scene = () => {
  const [spheres, setSpheres] = useState<SphereType[]>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const AnimatedSpheres = ({ spheres }: { spheres: SphereType[] }) => {
    const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);
    const data = useScroll();

    useFrame(() => {
      const timer = 0.0001 * Date.now();

      spheres.forEach((_sphere, i) => {
        const sphereRef = sphereRefs.current[i];

        if (sphereRef) {
          sphereRef.position.x = 5 * Math.cos(timer + i + data.offset);
          sphereRef.position.y = 5 * Math.sin(timer + i * 1.1 + data.offset);
          sphereRef.position.z = 5 * Math.sin(timer + i * 1.2 + data.offset);
        }
      });
    });

    return (
      <>
        {spheres.map((sphere, index) => (
          <mesh
            key={index}
            ref={(el) => (sphereRefs.current[index] = el)}
            position={sphere.position}
          >
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color={sphere.color} emissive={'crimson'} emissiveIntensity={8} />
          </mesh>
        ))}
      </>
    );
  };

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
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
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
    window.removeEventListener('resize', onWindowResize), [width, height]
    return () => {
      window.addEventListener('resize', onWindowResize);
    }
  }, [width, height]);

  return (
    <div
      style={{
        height: '100dvh',
        width: '100dvw',
        color: 'white',
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <Canvas>
        <ScrollControls
          pages={3}
          damping={0.3}
        >
          <PerspectiveCamera
            makeDefault
            fov={60}
            aspect={width / height}
            near={0.01}
            far={100}
            position={[0, 0, 5]}
          />
          <CameraControls />
          {/* <gridHelper args={[10, 10]} />
          <axesHelper args={[10]} /> */}
          <ambientLight intensity={1} />
          <pointLight position={[0, 10, 10]} />
          <AnimatedSpheres spheres={spheres} />
          <Scroll style={{ width: '100%', height: '100%' }}
            html
          >
            <div
              style={{
                padding: 10,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <h1>React Three Fiber</h1>
              <p>Scroll move div</p>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>

  )
}

export default Scene;

