console.log('blkShark7');

import  * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

//renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//camara
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

//scene
const scene = new THREE.Scene();

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.damplingFactor = 0.03;

//sphere
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial ({
    color: 0xffffff,
    flatShading: true

});
const mesh = new THREE.Mesh(geo, mat);
scene.add (mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true

});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar (1.001);
mesh.add (wireMesh);

const hemiLight = new THREE.HemisphereLight (0x0099, 0xaa55)
scene.add (hemiLight);

function animate(t = 0) {
    // console.log(t);
    requestAnimationFrame(animate);
    // mesh.rotation.y = t * 0.0001;
    // mesh.scale.setScalar (Math.cos(t * 0.001) * 1.0);
    renderer.render(scene, camera);
    controls.update();
}
animate ();