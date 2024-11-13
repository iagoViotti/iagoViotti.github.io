
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SphereType } from '../types/Index'


const AnimatedSpheres = ({ spheres }: { spheres: SphereType[] }) => {
  const sphereRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Move the useFrame callback outside of the component to avoid recreating it on every render
  const animateSpheres = () => {
    const timer = 0.0001 * Date.now();
    spheres.forEach((_sphere, i) => {
      const sphereRef = sphereRefs.current[i];
      if (sphereRef) {
        sphereRef.position.x = 5 * Math.cos(timer + i);
        sphereRef.position.y = 5 * Math.sin(timer + i * 1.1);
        sphereRef.position.z = 5 * Math.sin(timer + i * 1.2);
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
          <meshStandardMaterial color={sphere.color} emissive='crimson' emissiveIntensity={5} />
        </mesh>
      ))}
    </>
  );
};

export default AnimatedSpheres;
