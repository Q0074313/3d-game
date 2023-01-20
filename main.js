import * as THREE from 'three';
import { Vector3 } from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth-22, window.innerHeight-22);
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 5;

//camera.position.y = 0.1;
//camera.rotation.z = Math.PI/4;

//const movement = new THREE.Vector3();

const keyPressed = false



const controls = new PointerLockControls( camera, renderer.domElement );
controls.enabled = true;
scene.add(controls.getObject());

document.body.onclick=()=>{
  controls.lock();
}

/*document.addEventListener('keydown', (event) => {
	switch (event.keyCode) {

		keyPressed = true
		

		if(keyPressed == true){
		
		}
	}
})*/

/*document.addEventListener('keydown', (event)=>{
	if(event.keyCode){
		keyPressed = true
		console.log(keyPressed)
		movement()
	}
})

document.addEventListener('keyup', (event)=>{
	if(event.keyCode){
		keyPressed = false
	}	
})*/

document.onkeydown=()=>{
	keyPressed = true
	console.log(keyPressed)
	movement()
}

document.onkeyup=()=>{
	keyPressed = false
}

function movement(){
	if(keyPressed == true){
		if(keyCode == 87){
			controls.moveForward(0.25);
		}
		if(keyCode == 83){
			controls.moveForward(-0.25);
		}
		if(keyCode == 65){
			controls.moveRight(-0.25);
		}
		if(keyCode == 68){
			controls.moveRight(0.25);
		}
	}	
}



/*document.addEventListener('mousemove', (event) => {
	controls.movementX += event.movementX;
	controls.movementY += event.movementY;
})*/

document.onmousemove=(event)=>{
	controls.movementX += event.movementX;
	controls.movementY += event.movementY;
}

function render() {
	requestAnimationFrame(render);

	// if (controls.isLocked === true) {
		
	// 	//controls.update();
	// 	let r=camera.rotation;
	// 	let m=movement.transformDirection(camera.projectionMatrix);
		
	// 	if(movement.x || movement.y || movement.z){
	// 		console.log(movement,r,m);
	// 	}
		
	// 	camera.position.add(m);

	// }

	

	renderer.render(scene, camera);
}

render();

