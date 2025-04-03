import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth,
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

/***********
 ** SCENE ** 
 ***********/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('purple')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 12, -20)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** LIGHTS **
***********/
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/***********
** MESHES **
************/

    // Shape Geometry 
    const drawShape = (geometry, height, params) => {

    // Create material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color)
    });

    // Create mesh
    const shape = new THREE.Mesh(geometry, material);
    
    // Position mesh
    shape.position.x = (Math.random() - 0.5) * params.diameter;
    shape.position.z = (Math.random() - 0.5) * params.diameter;
    shape.position.y = height - 10;

    // Scale mesh
    shape.scale.x = params.scale;
    shape.scale.y = params.scale;
    shape.scale.z = params.scale;

    // Randomize rotation
    if (params.randomized) {
        shape.rotation.x = Math.random() * 2 * Math.PI;
        shape.rotation.z = Math.random() * 2 * Math.PI;
        shape.rotation.y = Math.random() * 2 * Math.PI;
    }


    // Add to group
    params.group.add(shape)
}

 // Geometries
    const coneGeometry = new THREE.ConeGeometry(0.2, 0.5, 32);
    const torusKnotGeometry = new THREE.TorusKnotGeometry(0.2, 0.05);
    const sphereGeometry = new THREE.SphereGeometry( .5, 32, 16 ); 
    


/*******
** UI **
********/
// UI
const ui = new dat.GUI()

let preset = {}

// Groups
const group1 = new THREE.Group()
scene.add(group1)
group1.position.set(0, 0, 0);
const group2 = new THREE.Group()
scene.add(group2)
group2.position.set(0, 1, 0);
const group3 = new THREE.Group()
scene.add(group3)
group3.position.set(-1, 0, 0); 

const uiObj = {
    sourceText: " ",
    saveSourceText() {
        saveSourceText()
    },
    term1: {
        term: 'divergent',
        color: '#e8ff3d',
        diameter: 4,
        geometry: torusKnotGeometry,
        group: group1,
        nCubes: 20,
        randomized: true,
        scale: .75
    },
    term2: {
        term: 'faction',
        color: '#ffffff',
        diameter: 10,
        geometry: sphereGeometry,
        group: group2,
        nCubes: 25,
        randomized: true,
        scale: .5
    },
    term3: {
        term: 'serum',
        color: '#e00b0b',
        diameter: 8,
        geometry: coneGeometry,
        group: group3,
        nCubes: 50,
        randomized: false,
        scale: .75
    },
    saveTerms() {
        saveTerms()
    },
    rotateCamera: false
}

// UI Functions
const saveSourceText = () =>
{
    // UI
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()

    // Text Analysis
    tokenizeSourceText(uiObj.sourceText)
    //console.log(uiObj.sourceText)
}

const saveTerms = () =>
{
    // UI
    preset = ui.save
    visualizeFolder.hide()
    cameraFolder.show()


    // Text Analysis
    findSearchTermInTokenizedText(uiObj.term1)
    findSearchTermInTokenizedText(uiObj.term2)
    findSearchTermInTokenizedText(uiObj.term3)
}

// Text Folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text")

textFolder
    .add(uiObj, 'saveSourceText')
    .name("Save")

// Terms, Visualize, and Camera Folders
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("Visualize")
const cameraFolder = ui.addFolder("Camera")

termsFolder
    .add(uiObj.term1, 'term')
    .name("Term 1")

termsFolder
    .add(group1, 'visible')
    .name("Term 1 Visibility")

termsFolder
    .addColor(uiObj.term1, 'color')
    .name("Term 1 Color")

termsFolder
    .add(uiObj.term2, 'term')
    .name("Term 2")

termsFolder
    .add(group2, 'visible')
    .name("Term 2 Visibility")

termsFolder
    .addColor(uiObj.term2, 'color')
    .name("Term 2 Color")

termsFolder
    .add(uiObj.term3, 'term')
    .name("Term 3")

termsFolder
    .add(group3, 'visible')
    .name("Term 3 Visibility")    

termsFolder
    .addColor(uiObj.term3, 'color')
    .name("Term 3 Color")  

visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

cameraFolder
    .add(uiObj, 'rotateCamera')
    .name("Turntable")

// Terms, Visualize, and Camera folders are hidden by default
termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()

/******************
** TEXT ANALYSIS **
******************/
// Variables
let parsedText, tokenizedText

// Parse and Tokenize sourceText
const tokenizeSourceText = (sourceText) =>
{
    // Strip periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    // Tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
}

// Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (params) =>
{
    // Use a for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        // If tokenizedText[i] matches our searchTerm, then we draw mesh
        if(tokenizedText[i] === params.term){
            // convert i into height, which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2

            // call drawCube function nCubes times using converted height value
            for(let a = 0; a < params.nCubes; a++)
            {
                drawShape(params.geometry, height, params)
            }
        }
    }
}


/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Update OrbitControls
    controls.update()

   //Group 1 Rotate 
group1.children.forEach((torus) => {
    torus.rotation.x += 0.01; 
    torus.rotation.y += 0.02; 
    torus.rotation.z += 0.015; 
});
   
    // Group 2 Pulsing Effect 
    const scaleFactor = Math.max(0.1, Math.abs(Math.sin(elapsedTime * 0.6))); 
    group2.scale.x = scaleFactor;
    group2.scale.y = scaleFactor;
    group2.scale.z = scaleFactor; 

    //Group 3 Wobble
    group3.position.y += Math.sin(elapsedTime) * 0.02; 
    group3.rotation.y += Math.sin(elapsedTime) * 0.005;

    // Rotate Camera
    if(uiObj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 20
        camera.position.y = 5
        camera.lookAt(0, 0, 0)
    }
    
    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()