import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const StarField = () => {
  const points = useRef(null);
  const positions = useMemo(() => {
    const vertices = [];
    for (let i = 0; i < 1200; i += 1) {
      vertices.push(
        THREE.MathUtils.randFloatSpread(120),
        THREE.MathUtils.randFloatSpread(80),
        THREE.MathUtils.randFloatSpread(90)
      );
    }
    return new Float32Array(vertices);
  }, []);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color='#8eeaff' transparent opacity={0.55} sizeAttenuation />
    </points>
  );
};

const FloatingSphere = ({ color, position, scale = 1, speed = 0.35 }) => {
  const mesh = useRef(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += 0.003;
    mesh.current.rotation.y += 0.005;
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.18;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.75} roughness={0.24} emissive={color} emissiveIntensity={0.18} />
    </mesh>
  );
};

const HeroScene = () => {
  return (
    <div className='absolute inset-0 z-0 pointer-events-none' aria-hidden='true'>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color='#00d4ff' />
        <StarField />
        <FloatingSphere color='#7c3aed' position={[2, 0, -2]} scale={1.5} />
        <FloatingSphere color='#00d4ff' position={[-3, 1, -1]} scale={0.5} speed={0.5} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
