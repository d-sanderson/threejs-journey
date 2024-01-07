import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const cursor = {
  x: 0,
  y: 0,
}
// Cursor
window.addEventListener('mousemove', (event) => {
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
  height: 600,
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
// Decide field of view early in the project
// anything btwn 1 (near plane) and 1000 (far plane) will show up
// if these values arent set correct, there will be 'zed fighting'
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
)
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 1
// Animate
const clock = new THREE.Clock()

const tick = () => {
  // Update objects
  // mesh.rotation.y = elapsedTime;

  // Update camera
  //   camera.position.x = Math.sin(cursor.x * Math.PI) * 3
  //   camera.position.z = Math.cos(cursor.x * Math.PI) * 3
  //   camera.position.y = cursor.y * 5
  // must be called after setting camera.position
  //   camera.lookAt(mesh.position)

  // Built-in controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
