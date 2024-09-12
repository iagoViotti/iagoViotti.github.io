import { Sphere } from '@react-three/drei'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useEffect, useState } from 'react'

interface SphereType {
  position: [number, number, number];
  args: [number, number, number];
  color: string;
}

interface Camera {
  fov?: number;
  near?: number;
  far?: number;
  position: { x: number, y: number, z: number }
}

const CameraControls = () => {
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0, z: 5 });

  const onMouseMove = (event: MouseEvent) => {
    setMouse({
      x: (event.clientX - window.innerWidth) / (window.innerWidth / 2),
      y: (event.clientY - window.innerHeight) / (window.innerHeight / 2) + 2,
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


const Scene = () => {
  const [spheres, setSpheres] = useState<SphereType[]>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [_camera, setCamera] = useState<Camera>({
    fov: 10,
    near: 0.01,
    far: 100,
    position: { x: 0, y: 0, z: 0 }
  });


  const AnimatedSpheres = ({ spheres }: { spheres: SphereType[] }) => {
    useFrame(() => {
      const timer = 0.0001 * Date.now();

      setCamera((prev) => {
        return { ...prev };
      });

      spheres.forEach((sphere, i) => {
        sphere.position[0] = 5 * Math.cos(timer + i);
        sphere.position[1] = 5 * Math.sin(timer + i * 1.1);
      });
    });

    return (
      <>
        {spheres.map((sphere, index) => (
          <Sphere key={index} position={new Vector3(...sphere.position)} args={sphere.args}>
            <meshStandardMaterial
              color={sphere.color}
            />
          </Sphere>
        ))}
      </>
    );
  };

  const addSpheres = (qntt: number) => {
    const newSpheres: SphereType[] = [];
    for (let i = 0; i < qntt; i++) {
      newSpheres.push({
        position: [
          Math.random() * 5 - 0.5,
          Math.random() * 5 - 0.5,
          Math.random() * 5 - 0.5,
        ],
        args: [0.01, 32, 16],
        color: `white`,
      });
    }
    setSpheres((prev) => [...prev, ...newSpheres]);
  };

  useEffect(() => addSpheres(100), []);
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
        backgroundColor: 'black',
        color: 'crimson',
      }}
    >
      <Canvas>
        <CameraControls />
        {/* <gridHelper args={[10, 10]} />
        <axesHelper args={[10]} /> */}
        <ambientLight intensity={1} />
        <pointLight position={[0, 10, 10]} />
        <AnimatedSpheres spheres={spheres} />
      </Canvas>
    </div>

  )
}

export default Scene;

