import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Custom shader: soft circular glow per particle ── */
const vertexShader = `
  attribute float aSize;
  varying vec3  vColor;
  void main() {
    vColor = color;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (350.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float s = pow(1.0 - d * 2.0, 3.0);
    gl_FragColor = vec4(vColor, s);
  }
`;

/* ── Galaxy geometry + shader ─────────────────────── */
const Galaxy = () => {
    const ref   = useRef();
    const { mouse } = useThree();

    const COUNT    = 9000;
    const BRANCHES = 3;
    const SPREAD   = 0.35;
    const SPIN     = 5.0;
    const RADIUS   = 4.5;

    const [geo, mat] = useMemo(() => {
        const positions = new Float32Array(COUNT * 3);
        const colors    = new Float32Array(COUNT * 3);
        const sizes     = new Float32Array(COUNT);

        const cInner = new THREE.Color('#00ffcc');   // bright cyan core
        const cMid   = new THREE.Color('#00ff41');   // site green
        const cOuter = new THREE.Color('#1a44ff');   // deep blue arms

        for (let i = 0; i < COUNT; i++) {
            const i3     = i * 3;
            const r      = Math.random() * RADIUS;
            const spin   = r * SPIN;
            const branch = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;

            // Randomness falls off toward center (tighter core)
            const rx = Math.pow(Math.random(), 3) * SPREAD * (Math.random() < 0.5 ? 1 : -1);
            const ry = Math.pow(Math.random(), 3) * SPREAD * 0.3 * (Math.random() < 0.5 ? 1 : -1);
            const rz = Math.pow(Math.random(), 3) * SPREAD * (Math.random() < 0.5 ? 1 : -1);

            positions[i3]     = Math.cos(branch + spin) * r + rx;
            positions[i3 + 1] = ry;
            positions[i3 + 2] = Math.sin(branch + spin) * r + rz;

            // Color: white-hot core → green → blue outer rim
            const t = r / RADIUS;
            const c = t < 0.4
                ? cInner.clone().lerp(cMid,   t / 0.4)
                : cMid.clone().lerp(cOuter, (t - 0.4) / 0.6);

            colors[i3]     = c.r;
            colors[i3 + 1] = c.g;
            colors[i3 + 2] = c.b;

            // Core particles brighter/larger for the hot nucleus look
            sizes[i] = r < 0.6 ? 0.18 + Math.random() * 0.12
                                : 0.05 + Math.random() * 0.08;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
        geometry.setAttribute('aSize',    new THREE.BufferAttribute(sizes,     1));

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            vertexColors:  true,
            transparent:   true,
            depthWrite:    false,
            blending:      THREE.AdditiveBlending,
        });

        return [geometry, material];
    }, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        ref.current.rotation.y  = clock.elapsedTime * 0.06;
        // Gentle mouse tilt
        ref.current.rotation.x  = THREE.MathUtils.lerp(ref.current.rotation.x,  mouse.y * 0.25, 0.04);
        ref.current.rotation.z  = THREE.MathUtils.lerp(ref.current.rotation.z, -mouse.x * 0.12, 0.04);
    });

    return <points ref={ref} geometry={geo} material={mat} />;
};

/* ── Floating label overlay ───────────────────────── */
const Label = () => (
    <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', zIndex: 2,
    }}>
        <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.6rem', letterSpacing: '6px',
            color: 'rgba(0,255,65,0.55)', marginBottom: 16,
            textShadow: '0 0 12px #00ff41',
        }}>
            PARTICLE.GALAXY — DEMO
        </p>
        <h1 style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            fontWeight: 800, letterSpacing: '8px',
            color: '#fff', margin: 0,
            textShadow: '0 0 30px rgba(0,255,204,0.4), 0 0 80px rgba(0,255,65,0.15)',
        }}>
            MUHAMMED SALIH
        </h1>
        <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.7rem', letterSpacing: '4px',
            color: 'rgba(255,255,255,0.35)', marginTop: 14,
        }}>
            move your cursor · 9,000 particles
        </p>
    </div>
);

/* ── Demo page ────────────────────────────────────── */
const GalaxyDemo = () => (
    <div style={{ width: '100vw', height: '100vh', background: '#020408', position: 'relative', overflow: 'hidden' }}>
        <Canvas
            camera={{ position: [0, 3.5, 9], fov: 65 }}
            style={{ position: 'absolute', inset: 0 }}
            gl={{ antialias: true, alpha: false }}
        >
            <Galaxy />
        </Canvas>
        <Label />
    </div>
);

export default GalaxyDemo;
