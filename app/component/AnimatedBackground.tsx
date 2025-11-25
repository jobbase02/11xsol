// components/AnimatedBackground.tsx
"use client";

import React, { JSX, Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export function AnimatedBackgroundWrapper(): JSX.Element {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: false }}>
      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>
    </Canvas>
  );
}

function AnimatedBackground(): JSX.Element {
  const meshRef = useRef<THREE.Group | null>(null);
  const starsRef = useRef<THREE.Group | null>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 7;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
      // animate Y position gently
      meshRef.current.position.y = (isMobile ? -2 : -1) + Math.sin(time * 0.5) * 0.2;
    }
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <group>
      <group ref={starsRef}>
        <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </group>

      <Sparkles count={300} scale={[20, 20, 10]} size={2} speed={0.4} opacity={0.4} color="#06b6d4" />

      <group ref={meshRef} position={[isMobile ? 1.5 : 6, isMobile ? 3 : 1, -5]} scale={isMobile ? 0.6 : 1}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh scale={[2.5, 2.5, 2.5]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial color="#3b0764" emissive="#1e1b4b" roughness={0.6} metalness={0.4} />
          </mesh>

          <mesh rotation={[1.8, 0, 0]} scale={[4, 4, 0.1]}>
            <torusGeometry args={[1, 0.03, 16, 100]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
          </mesh>

          <mesh rotation={[1.7, 0, 0]} scale={[4.2, 4.2, 0.1]}>
            <torusGeometry args={[1, 0.01, 16, 100]} />
            <meshBasicMaterial color="#c084fc" transparent opacity={0.3} />
          </mesh>
        </Float>
      </group>

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -5, -5]} intensity={2} color="#06b6d4" />
    </group>
  );
}
