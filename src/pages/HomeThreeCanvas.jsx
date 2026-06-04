import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Globe = ({ color }) => {
  const globeRef = useRef();

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      globeRef.current.rotation.x = state.clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1.25, 20, 20]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.45}
      />
    </mesh>
  );
};

const SatelliteSystem = ({ color }) => {
  const satRefs = [useRef(), useRef(), useRef()];
  const arcRefs = [useRef(), useRef(), useRef()];

  // Pre-define orbit paths (inclination tilt, speed factor, radius, and phase delay)
  const orbits = useMemo(() => [
    { speed: 0.8, radius: 1.85, inclination: 0.5, phase: 0 },
    { speed: 1.1, radius: 1.65, inclination: -0.6, phase: 2 },
    { speed: 0.6, radius: 2.0, inclination: 1.2, phase: 4 }
  ], []);

  // Shared Float32Array to avoid garbage collection and memory reallocation
  const arcPositions = useMemo(() => [
    new Float32Array(6),
    new Float32Array(6),
    new Float32Array(6)
  ], []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    orbits.forEach((orbit, idx) => {
      const t = elapsed * orbit.speed + orbit.phase;
      const sat = satRefs[idx].current;
      const arc = arcRefs[idx].current;

      if (sat) {
        // Calculate orbital coordinate in tilted plane
        const x = Math.cos(t) * orbit.radius;
        const y = Math.sin(t) * orbit.radius * Math.cos(orbit.inclination);
        const z = Math.sin(t) * orbit.radius * Math.sin(orbit.inclination);

        sat.position.set(x, y, z);
        sat.rotation.y = elapsed * 1.5;

        if (arc) {
          const pos = arcPositions[idx];
          pos[0] = x; pos[1] = y; pos[2] = z; // Satellite position
          pos[3] = 0; pos[4] = 0; pos[5] = 0; // Globe center position

          arc.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(pos, 3)
          );
          arc.geometry.attributes.position.needsUpdate = true;
        }
      }
    });
  });

  return (
    <group>
      {orbits.map((_, idx) => (
        <group key={idx}>
          {/* Orbital Satellite Node */}
          <mesh ref={satRefs[idx]}>
            <icosahedronGeometry args={[0.07, 0]} />
            <meshBasicMaterial color={color} />
          </mesh>

          {/* Connection Arc (Laser Ray) */}
          <line ref={arcRefs[idx]}>
            <bufferGeometry />
            <lineBasicMaterial color={color} transparent opacity={0.25} />
          </line>
        </group>
      ))}
    </group>
  );
};

const CyberAtmosphere = ({ count = 30, color }) => {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * Math.random() - 1.0);
      const r = 1.35; // Positioned just outside the globe's grid surface

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
};

const HomeThreeCanvas = ({ scale, color }) => (
  <Canvas
    camera={{ position: [0, 0, 5], fov: 75 }}
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
  >
    <ambientLight intensity={0.7} />
    <pointLight position={[10, 10, 10]} color={color} />
    <Suspense fallback={null}>
      <group scale={scale * 0.75}>
        {/* Central revolving grid globe */}
        <Globe color={color} />
        {/* Orbital satellite nodes with tracing laser beams */}
        <SatelliteSystem color={color} />
        {/* Revolving atmospheric nodes */}
        <CyberAtmosphere color={color} />
      </group>
    </Suspense>
    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
  </Canvas>
);

export default HomeThreeCanvas;
