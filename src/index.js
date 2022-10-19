import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
);
camera.position.set(0, 0, 10);
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.x += 20
directionalLight.position.y += 20
directionalLight.position.z += 20
scene.add(directionalLight);

const textureLoader = new THREE.TextureLoader();

const basecolor = textureLoader.load("textures/Brick_Wall_017_basecolor.jpg");
const normal = textureLoader.load("textures/Brick_Wall_017_normal.jpg");
const height = textureLoader.load("textures/Brick_Wall_017_height.png");
const roughness = textureLoader.load("textures/Brick_Wall_017_roughness.jpg");
const ambientOcclusion = textureLoader.load("textures/Brick_Wall_017_ambientOcclusion.jpg");

const plane1 = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2), 
    new THREE.MeshStandardMaterial({ 
        map: basecolor 
    })
)
plane1.position.y = 0
plane1.position.x = -5
scene.add(plane1)

const plane2 = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2), 
    new THREE.MeshStandardMaterial({ 
        map: basecolor, 
        normalMap: normal 
    })
)
plane2.position.y = 0
plane2.position.x = -2.8
scene.add(plane2)

const plane3 = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 512, 512), 
    new THREE.MeshStandardMaterial({ 
        map: basecolor, 
        normalMap: normal, 
        displacementMap: height, 
        displacementScale: 0.05 
    })
    )
plane3.position.y = 0
plane3.position.x = -0.6
scene.add(plane3)

const plane4 = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 512, 512), 
    new THREE.MeshStandardMaterial({ 
        map: basecolor, 
        normalMap: normal, 
        displacementMap: height, 
        displacementScale: 0.05, 
        roughnessMap: roughness, 
        roughness: 0.25 
     }))
plane4.position.y = 0
plane4.position.x = 1.6
scene.add(plane4)

const plane5 = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 512, 512), 
    new THREE.MeshStandardMaterial({ 
        map: basecolor, 
        normalMap: normal, 
        displacementMap: height, 
        displacementScale: 0.05, 
        roughnessMap: roughness, 
        roughness: 0.25, 
        aoMap: ambientOcclusion 
    })
)
plane5.geometry.attributes.uv2 = plane5.geometry.attributes.uv;
plane5.position.y = 0
plane5.position.x = 3.8
scene.add(plane5)

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}

animate();