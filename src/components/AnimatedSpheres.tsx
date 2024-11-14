import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SphereType } from '../types/Index'
import { useTheme } from '../context/ThemeContext';


const AnimatedSpheres = ({ spheres }: { spheres: SphereType[] }) => {
  const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { theme } = useTheme();
  const offset = useRef(0);

  const animateSpheres = () => {
    const timer = 0.0001 * Date.now();
    spheres.forEach((_sphere, i) => {
      const sphereRef = sphereRefs.current[i];
      if (sphereRef) {
        const { color } = (sphereRef.material as THREE.MeshStandardMaterial);
        sphereRef.position.x = 5 * Math.cos(timer + i);
        sphereRef.position.y = 5 * Math.sin(timer + i * 1.1);
        sphereRef.position.z = 5 * Math.sin(timer + i * 1.2);
        if (theme === 'dark' && offset.current < 350) {
          offset.current += 1;
          color.offsetHSL(-0.01, 0, 0);
        } else if (theme === 'light' && offset.current > 0) {
          offset.current -= 1;
          color.offsetHSL(0.01, 0, 0);
        }
      }
    });
  };

  useFrame(animateSpheres);

  const setSphereRef = (index: number) => (el: THREE.Mesh | null) => {
    sphereRefs.current[index] = el;
  };

  return (
    <>
      {spheres.map((sphere, index) => (
        <mesh
          key={index}
          ref={setSphereRef(index)}
          position={sphere.position}
        >
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial
            color={sphere.color}
            emissive='white'
            emissiveIntensity={0.1}
            // emissive='crimson'
            // emissiveIntensity={5}
          />
        </mesh>
      ))}
    </>
  );
};

export default AnimatedSpheres;
