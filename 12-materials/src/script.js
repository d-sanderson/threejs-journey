import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
// Textures
const textureLoader = new THREE.TextureLoader()

const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclussionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
)
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false


const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/4/px.png',
  '/textures/environmentMaps/4/nx.png',
  '/textures/environmentMaps/4/py.png',
  '/textures/environmentMaps/4/ny.png',
  '/textures/environmentMaps/4/pz.png',
  '/textures/environmentMaps/4/nz.png',
 ])
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

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

//  Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(pointLight)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// const material = new THREE.MeshBasicMaterial()
// material.alphaMap = doorAlphaTexture
// material.map = doorRoughnessTexture
// material.transparent = true

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true
// const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
// const material = new THREE.MeshDepthMaterial()
// MeshLambertMaterial will react to light it is very performant
// const material = new THREE.MeshLambertMaterial()
// MeshPhongMaterial no artifacts like in MeshLambertMaterial
// drawback: it is less performant than MeshLambertMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// specular creates a reflection
// material.specular = new THREE.Color(0xff0000)
// const material = new THREE.MeshToonMaterial()
// Like lambert, but with more detail uses physically based rendering (PBR)

// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.side = THREE.DoubleSide
// material.aoMap = doorAmbientOcclussionTexture
// material.displacementMap = doorHeightTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.displacementScale = 0.05
// material.map = doorColorTexture
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)
plane.position.x = 0
plane.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const sphereGeom = new THREE.SphereGeometry(0.5, 64, 64)

const sphere = new THREE.Mesh(sphereGeom, material)
sphere.position.x = -1.5
console.log(sphere.geometry.attributes)
sphere.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.3, 64, 128),
  material
)
torus.position.x = 1.5
torus.geometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)
scene.add(plane, sphere, torus)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  sphere.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime
  plane.rotation.x = 0.15 * elapsedTime

  sphere.rotation.y = 0.15 * elapsedTime
  torus.rotation.y = 0.15 * elapsedTime
  plane.rotation.y = 0.15 * elapsedTime
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

// Debug
const gui = new dat.GUI()
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)

tick()
