// src/components/ThreeBackground.jsx (enhanced)
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    
    // Create multiple stacked grids for depth effect
    const createGrid = (y, size, divisions, color) => {
      const gridHelper = new THREE.GridHelper(size, divisions, color, color);
      gridHelper.position.y = y;
      scene.add(gridHelper);
      return gridHelper;
    };
    
    const mainGrid = createGrid(-2, 40, 40, 0x00ff00);
    const secondaryGrid = createGrid(-4, 100, 100, 0x006600);
    
    // Add particles effect (green dots)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x00ff00,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add floating text elements
    const createTextMesh = (text, position) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 128;
      
      // Draw text on canvas
      context.fillStyle = 'black';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = '24px monospace';
      context.fillStyle = '#00ff00';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      
      // Create a plane with the texture
      const geometry = new THREE.PlaneGeometry(2, 1);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position.x, position.y, position.z);
      scene.add(mesh);
      
      return mesh;
    };
    
    // Create some floating text elements
    const codeText1 = createTextMesh('< GAMES />', { x: -8, y: 3, z: -10 });
    const codeText2 = createTextMesh('{ DEVELOPER }', { x: 7, y: 5, z: -15 });
    const codeText3 = createTextMesh('// RETRO STYLE', { x: -5, y: -3, z: -8 });
    
    // Add wire cubes with glowing edges
    const createWireCube = (size, position) => {
      const geometry = new THREE.BoxGeometry(size, size, size);
      const edges = new THREE.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({ 
        color: 0x00ff00,
        transparent: true,
        opacity: 0.8
      });
      
      const cube = new THREE.LineSegments(edges, material);
      cube.position.set(position.x, position.y, position.z);
      scene.add(cube);
      
      return cube;
    };
    
    const cubes = [
      createWireCube(2, { x: -5, y: 2, z: -10 }),
      createWireCube(3, { x: 6, y: -1, z: -15 }),
      createWireCube(4, { x: 0, y: 4, z: -20 }),
      createWireCube(1, { x: -8, y: -3, z: -5 })
    ];
    
    // Add a pulsing sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, -10);
    scene.add(sphere);
    
    // Animation
    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse movement for parallax effect
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      requestAnimationFrame(animate);
      
      // Subtle camera movement based on mouse position (parallax effect)
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Rotate particles
      particlesMesh.rotation.x = elapsedTime * 0.05;
      particlesMesh.rotation.y = elapsedTime * 0.03;
      
      // Animate grid movement
      mainGrid.position.z = (elapsedTime * 0.5) % 2;
      secondaryGrid.position.z = (elapsedTime * 0.2) % 4;
      
      // Animate text elements
      codeText1.rotation.y = Math.sin(elapsedTime * 0.2) * 0.2;
      codeText2.rotation.x = Math.cos(elapsedTime * 0.3) * 0.1;
      codeText3.position.y = -3 + Math.sin(elapsedTime * 0.5) * 0.5;
      
      // Animate cubes
      cubes.forEach((cube, index) => {
        cube.rotation.x = elapsedTime * 0.2;
        cube.rotation.y = elapsedTime * 0.3;
        cube.rotation.z = elapsedTime * 0.1;
        cube.position.y += Math.sin(elapsedTime + index) * 0.005;
      });
      
      // Animate pulsing sphere
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.2;
      sphere.scale.set(scale, scale, scale);
      sphere.rotation.y = elapsedTime * 0.5;
      sphere.rotation.z = elapsedTime * 0.3;
      sphere.material.opacity = 0.3 + Math.sin(elapsedTime * 2) * 0.2;
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Dispose of all resources
      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
        if (object.texture) object.texture.dispose();
      });
      
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return <div className="three-background" ref={mountRef}></div>;
};