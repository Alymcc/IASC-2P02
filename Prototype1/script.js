import * as THREE from 'three';
/*******************
 ***  SECENE ***
 ******************/


 //Canvas
const canvas =document.querySelector('.webgl')


 //Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('blue')

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/ window.innerHeight,
    0.1,
    100
 )
 scene.add(camera)
 cancelAnimationFrame.position.set(0, 0, 5)

 //Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: camera
    antialias: true
})
renderer,setSize(window.innerWidth,window.innerHeight)



/****************
 *** MESHES   ***
****************/

// testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial(1)
const testSphere = new THREE(sphereGeometry, sphereMaterial)

scene.add(testSphere)


/***********************
 ***  ANIMATION LOOP ***
 **********************/
 const clock = new THREE.clock()

 const animation = () =>
 {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Animate testSphere
    console.log(Math.sin(elapsedTime))
    testSphere.position.y = Math.sin(elapsedTime)
    testSphere.position.x = Math.cos(elapsedTime)

    // Renderer
    renderer.render(scene,camera)

    // Request next frame

    window.requestAnimationFrame(animation)

 }

 animation()