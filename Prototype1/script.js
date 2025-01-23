import * as THREE from 'three';
/*******************
 ***  SECENE ***
 ******************/

 //Canvas
const canvas = document.querySelector('.webgl')


 //Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('saddlebrown')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/ window.innerHeight,
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



/****************
 *** MESHES   ***
****************/

// testSphere
const sphereGeometry = new THREE.SphereGeometry(.8,)
const sphereMaterial = new THREE.MeshNormalMaterial(1)
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)



//torusKnot

const geometry = new THREE.TorusKnotGeometry(.8, .2) 
const material = new THREE.MeshNormalMaterial(1)
const torusKnot = new THREE.Mesh(geometry,material)

scene.add(torusKnot)
torusKnot.position.set(4, 2, 0)


// cylinder
const cylinderGeometry = new THREE.CylinderGeometry( .25, .25, .5); 
const cylinderMaterial = new THREE.MeshNormalMaterial(1); 
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial )

scene.add(cylinder);
cylinder.position.set(-4, 0, 0)



/***********************
 ***  ANIMATION LOOP ***
 **********************/
 const clock = new THREE.Clock()

 const radius = 3

 const animation = () =>
 {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate testSphere
    console.log(Math.sin(elapsedTime))
    testSphere.position.y = Math.sin(elapsedTime)
    testSphere.position.x = Math.cos(elapsedTime)

    //Animate torusKnot
    console.log(Math.sin(elapsedTime))
    torusKnot.position.y = Math.tan(elapsedTime)
    torusKnot.position.z = Math.cos(elapsedTime)
    torusKnot.rotation.x = (elapsedTime)
    torusKnot.rotation.y = (elapsedTime)

    //Animate cylinder
    console.log(Math.sin(elapsedTime))
    cylinder.rotation.x =(elapsedTime)
    cylinder.rotation.y =(elapsedTime)

    // Horizontal rotation
    const theta = elapsedTime * 0.5; 
    // Vertical rotation
    const phi = elapsedTime * 0.3; 

    cylinder.position.x = radius * Math.sin(phi) * Math.cos(theta);
    cylinder.position.y = radius * Math.sin(phi) * Math.sin(theta);
    cylinder.position.z = radius * Math.cos(phi);

    // Renderer
    renderer.render(scene,camera)

    // Request next frame

    window.requestAnimationFrame(animation)

 }

 animation()