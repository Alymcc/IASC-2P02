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

// Resizing
window.addEventListener('resize', () =>
   {
       // Update sizes
       sizes.width = window.innerWidth
       sizes.height = window.innerHeight
       sizes.aspectRatio = window.innerWidth / window.innerHeight
   
       // Update camera
       camera.aspect = sizes.aspectRatio
       camera.updateProjectionMatrix()
   
       // Update renderer
       renderer.setSize(sizes.width, sizes.height)
       renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
   })


/*******************
 ***  SECENE ***
 ******************/

 //Canvas
const canvas = document.querySelector('.webgl')


 //Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('gray')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
   sizes.aspectRatio,
    0.1,
    100
 )
 scene.add(camera)
 camera.position.set(0, 0, 5)

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

// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial(1)
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

testSphere.castShadow = true 

scene.add(testSphere)
testSphere.position.set(0,0,-5)

// Smile
const smileGeometry = new THREE.TorusGeometry(1.25, 0.2, 12, 48, Math.PI)
const smileMaterial = new THREE.MeshNormalMaterial(1)
const smile = new THREE.Mesh(smileGeometry, smileMaterial)
scene.add(smile)
smile.position.set(6, 0, 0)
smile.rotation.y = Math.PI * 0.5
smile.rotation.x = Math.PI
smile.castShadow = true 


/****************
 ***  LIGHTS  ***
****************/
// Ambient Light


/****************
 *** UI   ***
****************/

// UI
const ui = new dat.GUI()

/***********************
 ***  ANIMATION LOOP ***
 **********************/
 const clock = new THREE.Clock()

 const animation = () =>
 {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update OrbitControls
    controls.update()

    // Renderer
    renderer.render(scene,camera)

    // Request next frame

    window.requestAnimationFrame(animation)

 }

 animation()