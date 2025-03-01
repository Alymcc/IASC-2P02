import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "orbitControls"

/*******************
 ***  SETUP ***
 ******************/
 // Sizes
const sizes = {
   with: window.innerWidth,
   height: window.innerHeight,
   aspectRatio: window.innerWidth / window.innerHeight
}

/*******************
 ***  SECENE ***
 ******************/
 //Canvas
const canvas = document.querySelector('.webgl')

 //Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('black')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
   sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(25, 5, 10)

 //Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/****************
 *** MESHES   ***
****************/
// Cave
const caveGeometry = new THREE.PlaneGeometry( 15.5, 7.5);
const caveMaterial = new THREE.MeshStandardMaterial( {
   color: new THREE.Color ("white"),
   side: THREE.DoubleSide
} );
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add( cave );

//eyeOne
const eyeOneGeometry = new THREE.SphereGeometry(.25) 
const eyeOneMaterial = new THREE.MeshStandardMaterial(1)
const eyeOne = new THREE.Mesh(eyeOneGeometry,eyeOneMaterial)
eyeOne.castShadow = true
scene.add(eyeOne)
eyeOne.position.set(6, 2.25, 1)

// eyeTwo
const eyeTwoGeometry = new THREE.SphereGeometry(.25)
const eyeTwoMaterial = new THREE.MeshStandardMaterial(1)
const eyeTwo = new THREE.Mesh(eyeTwoGeometry, eyeTwoMaterial)
eyeTwo.castShadow = true 
scene.add(eyeTwo)
eyeTwo.position.set(6, 2.25, -1)

// Smile
const smileGeometry = new THREE.TorusGeometry(1.25, 0.2, 12, 48, Math.PI)
const smileMaterial = new THREE.MeshStandardMaterial(1)
const smile = new THREE.Mesh(smileGeometry, smileMaterial)
scene.add(smile)
smile.position.set(6, 1, 0)
smile.rotation.y = Math.PI * 0.5
smile.rotation.x = Math.PI
smile.castShadow = true 

// Sun 
const sunGeometry = new THREE.SphereGeometry()
const sunMaterial = new THREE.MeshLambertMaterial({
   emissive: new THREE.Color('orange'),
   emissiveIntensity: 20
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

/****************
 ***  LIGHTS  ***
****************/
// Directional Light
const directionalLight = new THREE.DirectionalLight(
   new THREE.Color ('white'),
   0.5)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true 
scene.add( directionalLight)
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/****************
 *** UI   ***
****************/
// UI
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
   .add(directionalLight.position, 'y')
   .min(-10)
   .max(10)
   .step(0.1)
   .name('Y')

lightPositionFolder
   .add(directionalLight.position, 'z')
   .min(-10)
   .max(10)
   .step(0.1)
   .name('Z')
   

/***********************
 ***  ANIMATION LOOP ***
 **********************/
 const clock = new THREE.Clock()

 const animation = () =>
 {
   // Return elapsedTime
   const elapsedTime = clock.getElapsedTime()

   // Animate eyeOne
   eyeOne.rotation.y = elapsedTime

    // Animate eyeTwo
   eyeTwo.rotation.x = elapsedTime

   // Update directionalLightHelper
   directionalLightHelper.update()

   // Update OrbitControls
   controls.update()

  //Update sun position to copy directionalLight position 
  sun.position.copy(directionalLight.position)
  
   // Move Light
   directionalLight.position.z = Math.sin(elapsedTime - 0.5) * 10 

   // Renderer
   renderer.render(scene,camera)

   // Request next frame
   window.requestAnimationFrame(animation)

 }

 animation()