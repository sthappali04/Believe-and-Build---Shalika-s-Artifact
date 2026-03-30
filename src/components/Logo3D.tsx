import React, { Suspense, useRef, useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface Logo3DProps {
  className?: string;
}

const MODEL_URL = "https://raw.githubusercontent.com/sthappali04/Believe-And-Build/main/logo.glb";

class LogoErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Logo3D error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial;
            // Vibrant materials: increase metalness and roughness for premium look
            material.metalness = 0.8;
            material.roughness = 0.2;
            material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle 'Auto-Rotate' y-axis animation (0.01 speed)
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={meshRef}>
      <primitive object={scene} scale={0.2} />
    </group>
  );
}

const LogoFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-transparent">
    <span className="text-[12px] font-bold text-black">LOGO</span>
  </div>
);

export const Logo3D: React.FC<Logo3DProps> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <LogoErrorBoundary fallback={<LogoFallback />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
          <Suspense fallback={null}>
            <Center>
              <Model url={MODEL_URL} />
            </Center>
            {/* PointLight positioned slightly in front of the logo to create a highlight 'glint' */}
            <pointLight position={[2, 2, 5]} intensity={1.5} />
            <ambientLight intensity={0.5} />
          </Suspense>
        </Canvas>
      </LogoErrorBoundary>
    </div>
  );
};
