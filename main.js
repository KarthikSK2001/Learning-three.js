import * as three from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from "gsap";

// Add scene
const scene = new three.Scene();

// Add Geometry and Material
const geometry = new three.SphereGeometry(3,64,64);
const material = new three.MeshStandardMaterial({
  color:'#00ff83',
  roughness:0.2
})

// Adding Mesh
const mesh = new three.Mesh(geometry, material);
scene.add(mesh);

// Size
const sizes = {
  width:window.innerWidth,
  height:window.innerHeight,
}

// Light 
const light = new three.PointLight('white', 70,100,1.7);
light.position.set(1,10,10);
scene.add(light);

// Camera
const camera = new three.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 20;
scene.add(camera);

// Render
const canvas = document.querySelector('.webgl');
const renderer = new three.WebGL1Renderer({canvas})
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2)
renderer.render(scene, camera)

// Resize
window.addEventListener('resize', () => {
  // Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

// Usage of Timelines
const tl = gsap.timeline({default:{ duration:1}})
tl.fromTo(mesh.scale, {z:0,x:0,y:0}, {z:1,x:1,y:1})
tl.fromTo('nav', {y:"-100%"}, {y:"0%"})
tl.fromTo('.title', {opacity:0}, {opacity:1})

// Mouse Animation Color
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', () => {mouseDown = true})
window.addEventListener('mouseup', () => {mouseDown = false})

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*255), 150
    ]
    let newcolor = new three.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r:newcolor.r, 
      g:newcolor.g,
      b:newcolor.b,
    } )
  }
})

