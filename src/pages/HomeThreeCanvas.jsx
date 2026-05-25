import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

const DigitalCore = ({ scale = 2.4, color = '#00ff41' }) => (
  <Float speed={0.8} rotationIntensity={0.5} floatIntensity={1}>
    <Sphere args={[1, 100, 200]} scale={scale}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0}
        emissive={color}
        emissiveIntensity={1.2}
        wireframe
      />
    </Sphere>
  </Float>
);

const HomeThreeCanvas = ({ scale, color }) => (
  <Canvas
    camera={{ position: [0, 0, 5], fov: 75 }}
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
  >
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} color={color} />
    <Suspense fallback={null}>
      <DigitalCore scale={scale} color={color} />
    </Suspense>
    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
  </Canvas>
);

export default HomeThreeCanvas;
