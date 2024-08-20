// src/components/ParticleSystem.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const ParticleSystem: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a torus geometry for particles to follow a topology-like pattern
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const particles = new THREE.BufferGeometry();
    const particleCount = 1000; // Increase particle count for better distribution
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      // Spherical coordinates distribution for a torus-like pattern
      const x = (Math.cos(theta) * (10 + 3 * Math.cos(phi))) + (Math.random() - 0.5) * 2;
      const y = (Math.sin(theta) * (10 + 3 * Math.cos(phi))) + (Math.random() - 0.5) * 2;
      const z = (Math.sin(phi) * 3) + (Math.random() - 0.5) * 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.3, // Smaller size for a finer appearance
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    camera.position.z = 50;

    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.y += 0.001; // Rotate to add dynamic movement
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};
