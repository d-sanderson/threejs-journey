import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper
const axesHelper = new THREE.AxesHelper(20)
scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCapTexture = textureLoader.load('/textures/matcaps/8.png')
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const donut = new THREE.Mesh(donutGeometry, material)
const material = new THREE.MeshMatcapMaterial({ matcap: matCapTexture })
/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeometry = new TextGeometry('Hello Three.js!', {
    font,
    size: 0.5,
    height: 0.2,
    // lower curveSegments to optimize/draw fewer triangles
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    // lower curveSegments to optimize/draw fewer triangles
    bevelSegments: 4,
  })

  textGeometry.computeBoundingBox()
  //   const box = textGeometry.boundingBox
  //   textGeometry.translate(
  //     -(box.max.x - 0.02) * 0.5,
  //     -(box.max.y - 0.02) * 0.5,
  //     -(box.max.z - 0.03) * 0.5
  //   )
  textGeometry.center()
  textGeometry.computeBoundingBox()
  console.log(textGeometry.boundingBox)
  const text = new THREE.Mesh(textGeometry, material)
  scene.add(text)
})

console.time('donuts')

for (let i = 0; i < 100; i++) {

  // Surround the centered text with donuts
  donut.position.x = (Math.random() - 0.5) * 10
  donut.position.y = (Math.random() - 0.5) * 10
  donut.position.z = (Math.random() - 0.5) * 10

  donut.rotation.x = Math.random() * Math.PI * 2
  donut.rotation.y = Math.random() * Math.PI * 2
  const scale = Math.random()
  donut.scale.set(scale, scale, scale)
  scene.add(donut)
}
console.timeEnd('donuts')

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
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
