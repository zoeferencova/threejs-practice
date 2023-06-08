import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)

// Float32 array 
// const positionsArray = new Float32Array(9)

// First vertex
// positionsArray[0] = 0 // x value
// positionsArray[1] = 0 // y value
// positionsArray[2] = 0 // z value

// // Second vertex
// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// // Third vertex
// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0

// Other way of writing same thing
// const positionsArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0,
//     1, 1, 0
// ])

// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

const geometry = new THREE.BufferGeometry()

// geometry.setAttribute('position', positionsAttribute)

// Creating multiple triangles
const count = 500
const positionsArray = new Float32Array(count * 3 * 3)

for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = Math.random()
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true // Shows triangles that make up geometry
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// NOTES

// Geometries are composed of vertices (point coordinates in 3D spaces) and faces (triangles that join those vertices to create a surface)
// Geometries are used to create meshes, but they can also be used to form particles. Each vertex (singular of vertices) will correspond to a particle
// Three.js has many built in geometries that inherit from the BufferGeometry class
    // BoxGeometry creates a box
    // PlaneGeometry creates a rectangle plane
    // CircleGeometry creates a disc or a portion of a disc (like a pie chart)
    // ConeGeometry creates a cone or a portion of a cone (you can open or close the base of the cone)
    // CylinderGeometry creates a cylinder (you can open or close the ends of the cylinder and you can change the radius of each end)
    // RingGeometry creates a flat ring or portion of a flat circle
    // TorusGeometry creates a ring that has a thickness (like a donut) or portion of a ring
    // TorusKnotGeometry creates some sort of knot geometry
    // DodecahedronGeometry creates a 12 faces sphere (you can add details for a rounder sphere)
    // OctahedronGeometry creates a 8 faces sphere  (you can add details for a rounder sphere)
    // TetrahedronGeometry creates a 4 faces sphere (it won't be much of a sphere if you don't increase details, you can add details for a rounder sphere)
    // IcosahedronGeometry creates a sphere composed of triangles that have roughly the same size
    // SphereGeometry creates the most popular type of sphere where faces looks like quads (quads are just a combination of two triangles)
    // ShapeGeometry creates a shape based on a path
    // TubeGeometry creates a tube following a path
    // ExtrudeGeometry creates an extrusion based on a path (you can add and control the bevel)
    // LatheGeometry creates a vase or portion of a vase (more like a revolution)
    // TextGeometry creates a 3D text (have to provide the font in typeface json format)