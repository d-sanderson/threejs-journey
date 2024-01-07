// 4 elements to create a scene - a camera, a render and a scene

const sizes = {
    width: 800,
    height: 600,
}

const scene = new THREE.Scene()
//  add things inside the scene

// a mesh is a visible object or a shape
// provide a geometry and a material
// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Camera
// 1st arg - field of view (fov), 2nd - aspect ratio, 3rd - near clipping plane, 4th - far clipping plane
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// position the camera in x, y, z axis
camera.position.z = 3
camera.position.x = 1
camera.position.y = 1

scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas,
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)