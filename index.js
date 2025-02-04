console.log('blkShark7');

import  * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';


// Escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear material marrón, blanco y negro
const brown = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Marrón
const white = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Blanco
const black = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Negro

// Crear cuerpo del perro
const body = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 1), brown);
body.position.set(0, 0.5, 0);
scene.add(body);

// Cabeza
const head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), brown);
head.position.set(1.2, 1, 0);
scene.add(head);

// Hocico
const snout = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.6), white);
snout.position.set(1.6, 1, 0);
scene.add(snout);

// Nariz
const nose = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), black);
nose.position.set(1.9, 1, 0);
scene.add(nose);

// Orejas
const ear1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.3), brown);
ear1.position.set(1.2, 1.5, -0.5);
scene.add(ear1);

const ear2 = ear1.clone();
ear2.position.set(1.2, 1.5, 0.5);
scene.add(ear2);

// Ojos
const eye1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.1), black);
eye1.position.set(1.5, 1.3, -0.3);
scene.add(eye1);

const eye2 = eye1.clone();
eye2.position.set(1.5, 1.3, 0.3);
scene.add(eye2);

// Patas
const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.4), white);
leg1.position.set(-0.5, 0.0, 0.5);
scene.add(leg1);

const leg2 = leg1.clone();
leg2.position.set(0.5, 0.0, 0.5);
scene.add(leg2);

const leg3 = leg1.clone();
leg3.position.set(-0.5, 0.0, -0.5);
scene.add(leg3);

const leg4 = leg1.clone();
leg4.position.set(0.5, 0.0, -0.5);
scene.add(leg4);

// Cola
const tail = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.8, 0.2), brown);
tail.position.set(-1, 1, 0);
tail.rotation.z = Math.PI / 4;
scene.add(tail);

// Posicionar cámara y renderizar escena
camera.position.x = 14;
camera.position.y = 4;
camera.position.z = 7;
const animate = function () {
requestAnimationFrame(animate);
renderer.render(scene, camera);
};

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.damplingFactor = 0.03;

// Responsividad
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
animate();