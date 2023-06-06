import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Clock (do not use getDelta method)
const clock = new THREE.Clock()

// Using GSAP (green sock)
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

// Animation
const tick = () => {
    // Time (animate at the same speed regardless or frame rate)
    // const elapsedTime = clock.getElapsedTime()

    // Update objects (one revolution per second)
    // mesh.rotation.y = elapsedTime * Math.PI * 2

    // Trigonometry functions can be used to create an up and down effect
    // Setting both sin and cos to the same value creates a circle
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)

    // You can also animate the camera
    // camera.lookAt(mesh.position)

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()


// NOTES

// Animations are run using the requestAnimationFrame function
// This function is used to call the function provided on the next frame
// In order to continuously run the function, you can use a recursive function

// Libraries like GSAP can be used to handle more complex animations
// To install GSAP: npm i --save gsap@3.5.1
