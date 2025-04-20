// src/components/ThreeBackground.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const ThreeBackground = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    // ThreeJS setup
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    
    // Handle resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Create retro grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x00ff00, 0x00ff00);
    gridHelper.position.y = -3;
    scene.add(gridHelper);
    
    // Add particles effect (green dots)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00ff00,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add a few glowing lines
    // Create a matrix of lines for a more dramatic effect
    for (let i = 0; i < 10; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePoints = [];
      
      // Create a random wavy line
      for (let j = 0; j < 100; j++) {
        const x = (j / 10) - 5;
        const y = Math.sin(j * 0.2 + i) * 0.5;
        const z = Math.cos(j * 0.1 + i) * 0.5 - 5;
        linePoints.push(new THREE.Vector3(x, y, z));
      }
      
      lineGeometry.setFromPoints(linePoints);
      
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.5,
      });
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
    }
    
    // Add random floating cubes for a more retro/digital feel
    for (let i = 0; i < 20; i++) {
      const cubeSize = Math.random() * 0.3 + 0.1;
      const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true
      });
      
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      
      // Position cubes randomly
      cube.position.x = (Math.random() - 0.5) * 20;
      cube.position.y = (Math.random() - 0.5) * 20;
      cube.position.z = (Math.random() - 0.5) * 20 - 5;
      
      // Store original position for animation
      cube.userData.originalPos = {
        x: cube.position.x,
        y: cube.position.y,
        z: cube.position.z
      };
      
      // Random rotation speed
      cube.userData.rotationSpeed = {
        x: Math.random() * 0.01,
        y: Math.random() * 0.01,
        z: Math.random() * 0.01
      };
      
      scene.add(cube);
    }
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      requestAnimationFrame(animate);
      
      // Rotate particles
      particlesMesh.rotation.x = elapsedTime * 0.05;
      particlesMesh.rotation.y = elapsedTime * 0.03;
      
      // Animate grid
      gridHelper.position.z = (elapsedTime * 0.5) % 2;
      
      // Animate all cubes
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry) {
          // Rotate cube
          child.rotation.x += child.userData.rotationSpeed.x;
          child.rotation.y += child.userData.rotationSpeed.y;
          child.rotation.z += child.userData.rotationSpeed.z;
          
          // Add some floating movement
          const origPos = child.userData.originalPos;
          child.position.y = origPos.y + Math.sin(elapsedTime + origPos.x) * 0.5;
          child.position.x = origPos.x + Math.cos(elapsedTime + origPos.y) * 0.3;
        }
      });
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    
      // Dispose geometries and materials
      scene.children.forEach(child => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    
      renderer.dispose();
    
      // Safely remove the renderer DOM element
      if (mountRef.current && renderer.domElement?.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div className="three-background" ref={mountRef}></div>;
};