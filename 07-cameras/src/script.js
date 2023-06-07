import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * Cursor
 */

const cursor = {
    x: 0,
    y: 0
}

// Getting -0.5 to 0.5 range in all directions based on cursor position
window.addEventListener('mousemove', event => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})


/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
// const camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, -1, 1, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 2 // Move camera perspective up
// controls.update()

controls.enableDamping = true // Creates smooth effect

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)

    // Update controls: allows damping to be applied continuously
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// NOTES

// The Camera class is an abstract class that shouldn't be used directly
// The ArrayCamera class can be used to render the scene from multiple cameras on specific areas of the render (e.g. multiplayer split screen)
// The StereoCamera class creates two renders from two cameras that mimic the eyes (can be used for VR headset)
// The CubeCamera creates 6 renders on all sides, creating a render of the surroundings (used mainly for reflection, refraction, shadow, etc.)
// The OrthographicCamera is used to create a render of the scene without perspective (an object size stays the same regardless of distance from camera)
// The PerspectiveCamera mimics the way that the human eye sees. This is the most common camera for a 3D scene.

// PerspectiveCamera params: 
    // Field of view (vertical degrees, ideally 45-75)
    // Aspect ratio
    // Near value
    // Far value
        // * Anything outside of near and far doesn't show up
        // * Do not put extreme values (e.g. 0.0001 and 99999), this will create z-fighting, where GPU has trouble deciding what object is in front of another one
        // * Good values are something like 0.1 and 100
        // * Useful for not rendering objects that are uselessly far (e.g. something beyond mountains)

// OrthographicCamera params:
    // Left boundary
    // Right boundary
    // Top boundary
    // Bottom boundary
        // * Since camera focuses on object in forefront, params define frame
        // * Use aspect ratio for left/right values to avoid distorting object
    // Near value
    // Far value

// Built-in camera controls: 
    // DeviceOrientationControls are used for an immersive VR experience
    // FlyControls create a moving camera effect, can rotate and move forward and backward
    // FirstPersonControls are like FlyControls but with a fixed y-axis, like a birdseye view without the ability to do a barrel roll
    // PointerLockControls uses the pointer lock JavaScript API. This API hides the cursor, keeps it centered, and keeps sending the movements in the mousemove event callback.
    // OrbitControls allows you to rotate around a point with the left mouse, translate laterally using the right mouse, and zoom in or out using the wheel.
    // TrackballControls is just like OrbitControls but there are no limits in terms of vertical angle. You can keep rotating and do spins with the camera even if the scene gets upside down.
    // TransformControls has nothing to do with the camera. You can use it to add a gizmo to an object to move that object.
    // Just like the TransformControls, DragControls has nothing to do with the camera. You can use it to move objects on a plane facing the camera by drag and dropping them.

