import * as THREE from 'three'


/*
 * Canvas
 */
const canvas = document.querySelector('canvas.webgl')


/*
 * Scene
 */
const scene = new THREE.Scene()


/*
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Position
// mesh.position.x = 0.7 // Horizontal position
// mesh.position.y = - 0.6 // Vertical position
// mesh.position.z = 1 // Forward/backward position
mesh.position.set(0.5, -0.8, 1) // Updates object position x, y, and z values in one method


// Scale
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
mesh.scale.set(2, 0.5, 0.5) // Updates object's local scale


// Rotation: rotates along specified axis through object midpoint
// Imagine putting a stick through the middle of the object
// Half of a rotation is PI, full rotation is PI * 2

// The order of rotations matter, this can be changed
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI / 2
mesh.rotation.y = Math.PI / 4

// Quarternion is another way to express rotation in a more mathematical way


// Group: creates group of objects so that they can be moved together
const group = new THREE.Group()
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)

cube1.position.x = -3
cube2.position.x = 0
cube3.position.x = 3

group.add(cube1, cube2, cube3)

// Moves all cubes up together
group.position.y = 1


/*
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}


/*
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 5
scene.add(camera)

// Orients camera to look at specific object
camera.lookAt(mesh.position)


/*
 * Axes Helper: shows lines that represent axes, param represents length of lines
 */
const axesHelper = new THREE.AxesHelper(6)
scene.add(axesHelper)


/*
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

