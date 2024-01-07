import './style.css'
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
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

// Animations
// call a function once on the next frame
// let time = Date.now()
// const tick = () => {
//     console.log('tick')
//     // Time
//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime
//     console.log(deltaTime)
//     requestAnimationFrame(tick)
//     // adding deltaTime ensures the animation run at the same speed regardless of the framerate
//     mesh.rotation.y += 0.001 * deltaTime
//     renderer.render(scene, camera)
// }

// const clock = new THREE.Clock()
// const tick = () => {
//     const elapsedTime = clock.getElapsedTime()
//     // one revolution per second
//     // mesh.position.z = elapsedTime * Math.PI * 2
//     // cube moves in a circle
//     camera.position.x = Math.sin(elapsedTime)
//     camera.position.y = Math.cos(elapsedTime)

//     camera.lookAt(mesh.position)
//     renderer.render(scene, camera)
//     requestAnimationFrame(tick)

// }

gsap.to(mesh.position, {
  x: 20,
  duration: 1,
  delay: 0,
})
gsap.to(mesh.position, {
  x: 0,
  duration: 1,
  delay: 0,
})

const tick = () => {
  // const elapsedTime = clock.getElapsedTime()
  // // one revolution per second
  // // mesh.position.z = elapsedTime * Math.PI * 2
  // // cube moves in a circle
  // camera.position.x = Math.sin(elapsedTime)
  // camera.position.y = Math.cos(elapsedTime)
  // camera.lookAt(mesh.position)
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()
