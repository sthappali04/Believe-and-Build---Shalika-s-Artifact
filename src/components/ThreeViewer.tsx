import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Stage, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeViewerProps {
  modelUrl: string;
  ambientIntensity?: number;
  directionalIntensity?: number;
  hemisphereLight?: boolean;
  cameraPosition?: [number, number, number];
  cameraFar?: number;
  scale?: number;
  metalness?: number;
  roughness?: number;
  autoRotateSpeed?: number;
  pointLight?: boolean;
}

function Model({ url, scale = 1, metalness, roughness }: { url: string; scale?: number; metalness?: number; roughness?: number }) {
  const { scene } = useGLTF(url);
  
  useEffect(() => {
    if (metalness !== undefined || roughness !== undefined) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            if (metalness !== undefined) mesh.material.metalness = metalness;
            if (roughness !== undefined) mesh.material.roughness = roughness;
          }
        }
      });
    }
  }, [scene, metalness, roughness]);

  return <primitive object={scene} scale={scale} />;
}

const Fallback = () => (
  <Center>
    <Text
      color="black"
      fontSize={0.5}
      maxWidth={2}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff"
    >
      LOGO
    </Text>
  </Center>
);

export const ThreeViewer: React.FC<ThreeViewerProps> = ({ 
  modelUrl, 
  ambientIntensity = 1.0, 
  directionalIntensity = 0.8,
  hemisphereLight = false,
  cameraPosition = [0, 0, 5],
  cameraFar = 2000,
  scale = 1,
  metalness,
  roughness,
  autoRotateSpeed = 2.0,
  pointLight = false
}) => {
  return (
    <div className="w-full h-full relative bg-transparent overflow-visible">
      <Canvas shadows camera={{ position: cameraPosition, fov: 50, far: cameraFar }}>
        <Suspense fallback={<Fallback />}>
          <Stage environment="city" intensity={0.5} shadows="contact">
            <Center>
              <Model url={modelUrl} scale={scale} metalness={metalness} roughness={roughness} />
            </Center>
          </Stage>
          <OrbitControls 
            makeDefault 
            autoRotate 
            autoRotateSpeed={autoRotateSpeed} 
            enableDamping 
          />
        </Suspense>
        <ambientLight intensity={ambientIntensity} />
        {pointLight && <pointLight position={[2, 2, 2]} intensity={1} />}
        {hemisphereLight ? (
          <hemisphereLight intensity={0.5} groundColor="black" />
        ) : (
          <directionalLight position={[10, 10, 10]} intensity={directionalIntensity} castShadow />
        )}
      </Canvas>
    </div>
  );
};
