// src/components/TopologyAnimation.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const TopologyAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 50, 50);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Shape creation function with interactivity
    const createInteractiveShape = (
      geometry: THREE.BufferGeometry,
      color: number,
      position: THREE.Vector3
    ) => {
      const material = new THREE.MeshStandardMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Add interactivity
      mesh.userData.isHovered = false;
      mesh.userData.isClicked = false;

      const onHover = () => {
        mesh.scale.set(1.2, 1.2, 1.2);
        mesh.material.color.set(0xff0000);
      };

      const onLeave = () => {
        mesh.scale.set(1, 1, 1);
        mesh.material.color.set(color);
      };

      const onClick = () => {
        mesh.userData.isClicked = !mesh.userData.isClicked;
      };

      // Listen to events
      mountRef.current?.addEventListener('mousemove', (event) => {
        const mouse = new THREE.Vector2(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(mesh);

        if (intersects.length > 0) {
          if (!mesh.userData.isHovered) {
            mesh.userData.isHovered = true;
            onHover();
          }
        } else {
          if (mesh.userData.isHovered) {
            mesh.userData.isHovered = false;
            onLeave();
          }
        }
      });

      mountRef.current?.addEventListener('click', (event) => {
        const mouse = new THREE.Vector2(
          (event.clientX / window.innerWidth) * 2 - 1,
          -(event.clientY / window.innerHeight) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(mesh);

        if (intersects.length > 0) {
          onClick();
        }
      });

      return mesh;
    };

    // Initial torus knot
    const torusKnot = createInteractiveShape(
      new THREE.TorusKnotGeometry(10, 3, 100, 16),
      0x00ff00,
      new THREE.Vector3(0, 0, 0)
    );
    scene.add(torusKnot);

    // Dynamic camera movement
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      camera.position.x = x * 10;
      camera.position.y = -y * 10;
      camera.lookAt(scene.position);
    };

    window.addEventListener('mousemove', handleMouseMove);

    camera.position.z = 50;

    // Animate
    const animate = () => {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      if (torusKnot.userData.isClicked) {
        torusKnot.rotation.x += 0.02;
        torusKnot.rotation.y += 0.02;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ height: '100vh' }} />;
};
