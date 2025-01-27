// src/App.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Import OrbitControls

const App = () => {
  const mount = useRef(null);
  const cameraSpeed = 0.1;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    const screenWidth = window.innerWidth; // Adjust to window width
    const screenHeight = window.innerHeight; // Adjust to window height
    renderer.setSize(screenWidth, screenHeight);
    mount.current.appendChild(renderer.domElement);

    const cubeSize = 3;
    const cube = new THREE.Object3D();
    // Colors for the cube faces
    const colors = [0xffffff, 0x0000ff, 0xffa500, 0x00ff00, 0xff0000, 0xffff00];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geometry = new THREE.BoxGeometry(1, 1, 1);
          const materialIndex = Math.floor(Math.random() * colors.length);
          const material = new THREE.MeshBasicMaterial({ color: colors[materialIndex] });
          const face = new THREE.Mesh(geometry, material);

          face.position.set(x * 1.1, y * 1.1, z * 1.1);  // Position adjustment
          cube.add(face);
        }
      }
    }

    scene.add(cube);

    const light = new THREE.PointLight(0xffffff);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Adjust aspect ratio of the camera based on window size
    camera.aspect = screenWidth / screenHeight;
    camera.updateProjectionMatrix();

    // Adjust camera position to give a better view of the scene
    camera.position.y = 0;
    camera.position.x = 0;
    camera.position.z = 10;

    // Create orbit controls to allow camera movement
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable smooth dragging
    controls.dampingFactor = 0.25; // Set damping factor
    controls.screenSpacePanning = false; // Disable panning in screen space

    const animate = () => {
      requestAnimationFrame(animate);

      // No rotation anymore
      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;

      controls.update(); // Update controls every frame
      renderer.render(scene, camera);
    };

    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'w':
          camera.position.z -= cameraSpeed;
          break;
        case 's':
          camera.position.z += cameraSpeed;
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    animate();

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      renderer.dispose();
    };
  }, []);

  return <div ref={mount} />;
};

export default App;
