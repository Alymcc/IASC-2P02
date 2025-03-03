import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}

/***********
 ** SCENE ** 
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('pink')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(25, 5, 10)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
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

// Cactuar Group
const cactuar = new THREE.Group()
scene.add(cactuar)


// Cactuar Body
const bodyGeometry = new THREE.CapsuleGeometry(.75, 3, 4, 32);
const bodyMaterial = new THREE.MeshStandardMaterial ( {
   color: new THREE.Color ("green")} );
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.set(8, 2, 0);
body.castShadow = true
cactuar.add(body);

// Cactuar Arms
const armGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.75, 32);
const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
leftArm.position.set(7.25, 3.6, -.7);
leftArm.rotation.z = Math.PI / 4;
leftArm.castShadow = true
cactuar.add(leftArm);

const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
rightArm.position.set(8.75, 3.6, .7);
rightArm.rotation.z = -Math.PI / 4;
rightArm.castShadow = true
cactuar.add(rightArm);

// Cactuar Legs
const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32);
const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
leftLeg.position.set(7.25, .25, -.7);
leftLeg.rotation.z = -Math.PI / 6;
leftLeg.castShadow = true
cactuar.add(leftLeg);

const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
rightLeg.position.set(8.75, .25, .7);
rightLeg.rotation.z = Math.PI / 6;
rightLeg.castShadow = true
cactuar.add(rightLeg);

// Cactuar Eyes
const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const eyeMaterial = new THREE.MeshStandardMaterial ( {
   color: new THREE.Color ("black")} );
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(8.75, 3, -.2);
leftEye.castShadow = true
cactuar.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.position.set(8.75, 3, .2);
rightEye.castShadow = true
cactuar.add(rightEye);

// Cactuar Mouth
const mouthGeometry = new THREE.CircleGeometry( .3, 32 );
const mouth = new THREE.Mesh(mouthGeometry, eyeMaterial);
mouth.rotation.y = Math.PI /2
mouth.castShadow = true
mouth.position.set(8.75, 2, 0);
cactuar.add(mouth);

// ball
const ballGeometry = new THREE.SphereGeometry(.5,)
const ballMaterial = new THREE.MeshNormalMaterial(1)
const ball = new THREE.Mesh(ballGeometry, ballMaterial)
ball.position.set(12, 2, 0);
ball.castShadow = true
scene.add(ball)

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

/*********************
** DOM INTERACTIONS **
**********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false
}

// part-one
document.querySelector('#part-one').onclick = function() {
   domObject.part = 1}

// part-two
document.querySelector('#part-two').onclick = function() {
   domObject.part = 2}

// first-change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}

// second-change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}

// third-change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}

// fourth-change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}

/****************
 *** UI   ***
****************/
// UI
/*
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
   
*/

/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

     // part-one
   if(domObject.part === 1)
    {
        camera.position.set(5, 0, 0)
        camera.lookAt(0, 0, 0)
    }

    // part-two
    if(domObject.part === 2)
    {
        camera.position.set(25, 1, 0)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange)
    {
      ball.position.y =Math.cos(elapsedTime)
      
    }

    // second-change
    if(domObject.secondChange)
    {
      cactuar.position.x = Math.sin(elapsedTime) * 2 
    }

    // third-change
    if(domObject.thirdChange)
      {
      const radius = 10; 
      const speed = 0.1;
      directionalLight.position.x = Math.cos(elapsedTime * speed) * radius;
      directionalLight.position.y = Math.sin(elapsedTime * speed) * radius;
   }


    // fourth-change
    if(domObject.fourthChange)
    { 

      const direction = new THREE.Vector3();
      direction.subVectors(sun.position, ball.position).normalize();
      ball.position.add(direction.multiplyScalar(0.1));

      direction.subVectors(sun.position, cactuar.position).normalize();
      cactuar.position.add(direction.multiplyScalar(0.1));

   
    }

    // Update directionalLightHelper
    directionalLightHelper.update()

    // Update OrbitControls
    controls.update()

    //Update sun position to copy directionalLight position 
    sun.position.copy(directionalLight.position)
    
    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)}
   animation()