import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Model from './model'

/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


/*------------------------------
Scene & Camera
------------------------------*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 
  50, 
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;
camera.position.y = 1;


/*------------------------------
Mesh
------------------------------*/
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial( { 
  color: 0x00fff0,
} );
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


/*------------------------------
OrbitControls
------------------------------*/
const controls = new OrbitControls( camera, renderer.domElement );
controls.enabled = false


/*------------------------------
Helpers
------------------------------*/
// const gridHelper = new THREE.GridHelper( 10, 10 );
// scene.add( gridHelper );
// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

/*------------------------------
Models
------------------------------*/
const skull = new Model({
  name: 'skull',
  file: './models/skull.glb',
  color1: 'blue',
  color2: 'yellow',
  background: '#47001b',
  scene: scene,
  placeOnLoad: true,
})

const horse = new Model({
  name: 'horse',
  file: './models/horse.glb',
  color1: 'blue',
  color2: 'pink',
  background: '#110047',
  scene: scene
})

const dragons = new Model({
  name: 'dragons',
  file: './models/dragons.glb',
  color1: 'yellow',
  color2: 'magenta',
  background: 'blue',
  scene: scene,
})

const skulptur = new Model({
  name: 'skulptur',
  file: './models/skulptur.glb',
  color1: '#110047',
  color2: 'blue',
  background: 'pink',
  scene: scene,
})

const tombstone = new Model({
  name: 'tombstone',
  file: './models/tombstone.glb',
  color1: 'blue',
  color2: 'magenta',
  background: '#c1fc47',
  scene: scene,
})




/*------------------------------
Controllers
------------------------------*/
const buttons = document.querySelectorAll('.button')
// buttons[0].addEventListener('click', ()=>{
//   skull.add()
//   horse.remove()
// })
// buttons[1].addEventListener('click', ()=>{
//   skull.remove()
//   horse.add()
// })

buttons[0].addEventListener("mouseover",()=>{
  skull.add()
  horse.remove()
  dragons.remove()
  skulptur.remove()
  tombstone.remove()
})

buttons[1].addEventListener("mouseover",()=>{
  horse.add()
  skull.remove()
  dragons.remove()
  skulptur.remove()
  tombstone.remove()

})

buttons[2].addEventListener("mouseover",()=>{
  dragons.add()
  horse.remove()
  skull.remove()
  skulptur.remove()
  tombstone.remove()
})

buttons[3].addEventListener("mouseover",()=>{
  skulptur.add()
  horse.remove()
  skull.remove()
  dragons.remove()
  tombstone.remove()
})

buttons[4].addEventListener("mouseover",()=>{
  tombstone.add()
  horse.remove()
  horse.remove()
  skull.remove()
  dragons.remove()
  skulptur.remove()
})




/*------------------------------
Loop
------------------------------*/
const clock = new THREE.Clock()


/*------------------------------
Loop
------------------------------*/
const animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

  if (skull.isActive) {
    skull.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
  }
  if (horse.isActive) {
    horse.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
  }
  if (dragons.isActive) {
    dragons.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
  }
  if (skulptur.isActive) {
    skulptur.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
  }
  if (tombstone.isActive) {
    tombstone.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
  }
};
animate();


/*------------------------------
Resize
------------------------------*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );

/*------------------------------
MouseMove
------------------------------*/
function onMouseMove(e) {
  // console.log(e)
 
  const x = e.clientX
  const y = e.clientY  

  gsap.to(scene.rotation, {
    y: gsap.utils.mapRange(0, window.innerWidth, .2, -.2, x),
    x: gsap.utils.mapRange(0, window.innerHeight, .2, -.2, y)
  })
}
window.addEventListener('mousemove', onMouseMove)