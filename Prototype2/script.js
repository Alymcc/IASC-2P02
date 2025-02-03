import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "orbitControls"


/*******************
 ***  SETUP ***
 ******************/

 // Sizes
const sizes = {
   width: window.innerWidth,
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
 scene.background = new THREE.Color('orange')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
   sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(-2, 2, 5)

 //Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth,window.innerHeight)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/****************
 *** MESHES   ***
****************/

// cylinder
const cylinderGeometry = new THREE.CylinderGeometry( .25, .25, .5); 
const cylinderMaterial = new THREE.MeshNormalMaterial(1); 
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial )

scene.add(cylinder);


// Plane 

const planeGeometry = new THREE.PlaneGeometry( 10, 10, 50, 50 );
const planeMaterial = new THREE.MeshBasicMaterial( {
   color: new THREE.Color ("white"),
   side: THREE.DoubleSide,
   wireframe: true
} );
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5

scene.add( plane );

/****************
 *** UI   ***
****************/

// UI
const ui = new dat.GUI()


// UI Object 
const uiObject = {
   speed: 1,
   distance: 1,
   rotation: 1
}


//  plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
   .add(planeMaterial, "wireframe")
   .name("Toggle Wireframe")


//  cylinder UI
const cylinderFolder = ui.addFolder('Cylinder')

cylinderFolder
   .add(uiObject, "speed")
   .min(0.1)
   .max(10)
   .step(0.1)
   .name("Speed")

 cylinderFolder
   .add(uiObject, "distance")
   .min(0.1)
   .max(10)
   .step(0.1)
   .name("Distance")

   cylinderFolder
   .add(uiObject, "rotation")
   .min(0.1)
   .max(10)
   .step(0.1)
   .name("Rotation")

/***********************
 ***  ANIMATION LOOP ***
 **********************/
 const clock = new THREE.Clock()

 const animation = () =>
 {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Animate Cylinder
    cylinder.position.y = Math.sin(elapsedTime *uiObject.speed) * uiObject.distance
    cylinder.rotation.x = elapsedTime * uiObject.rotation;

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene,camera)

    // Request next frame

    window.requestAnimationFrame(animation)

 }

 animation()