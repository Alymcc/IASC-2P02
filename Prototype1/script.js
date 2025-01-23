import * as THREE from 'three';
/*******************
 ***  SECENE ***
 ******************/


 //Canvas
const canvas =document.querySelector('.webgl')


 //Scene
 const scene = new THREE.Scene()

 //Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/ window.innerHeight,
    0.1,
    100
 )
 scene.add(camera)

 //Renderer
