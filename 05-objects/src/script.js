import './style.css'
import * as THREE from 'three'

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// Create the group
const group = new THREE.Group()
scene.add(group)
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
group.add(cube1)
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube2)
cube1.position.set(-2, 0, 0)
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
group.add(cube3)

group.position.set(0, 1, 0)
group.scale.y = 2
cube3.position.set(2, 0, 0)
// Axes helper

const axesHelper = new THREE.AxesHelper()

scene.add(axesHelper)
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// console.log(mesh.position.distanceTo(camera.position))

//  decide unit of measurement and stick to it

camera.position.z = 3
scene.add(camera)
// mesh.position.normalize()
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
