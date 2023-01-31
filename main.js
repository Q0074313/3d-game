import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth-22, window.innerHeight-22);
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// const light = new THREE.AmbientLight(0x404040);
// scene.add(light);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(2,2,5);
scene.add(light2);

const loader = new GLTFLoader();

loader.load( 'assets/Asphalt.glb', function ( object1 ) {

	scene.add( object1.scene );

}, undefined, function ( error ) {

	console.error( error );

} );



camera.position.x = 0;
camera.position.y = 0.5;
camera.position.z = 5;

let keys={
	W: false,
	S: false,
	A: false,
	D: false,
	Space: false,
	Shift: false
}
var MoveSpeed=0.04;
var JumpSpeed=0;

const controls = new PointerLockControls( camera, renderer.domElement );
controls.enabled = true;
scene.add(controls.getObject());

document.body.onclick=()=>{
  controls.lock();
}

setInterval(movement, 5);

document.onkeydown = function(e) {
	let keyCode=e.keyCode;
	if(keyCode == 87){
		keys.W=true;
	}
	if(keyCode == 83){
		keys.S=true;
	}
	if(keyCode == 65){
		keys.A=true;
	}
	if(keyCode == 68){
		keys.D=true;
	}
	if(keyCode == 16){
		if(camera.position.y>=0.5){
			camera.position.y -= 0.25;
			MoveSpeed = 0.015;
		}
	}
	if(keyCode == 32){
		keys.Space = true;
		if(camera.position.y == 0.5){
			 JumpSpeed=0.2;
		}
	}
}

document.onkeyup = function(e) {
	let keyCode=e.keyCode;
	if(keyCode == 87){
		keys.W=false;
	}
	if(keyCode == 83){
		keys.S=false;
	}
	if(keyCode == 65){
		keys.A=false;
	}
	if(keyCode == 68){
		keys.D=false;
	}
	if(keyCode == 16){
		if(camera.position.y<=0.25){
			camera.position.y += 0.25;
		}
		MoveSpeed=0.04;
	}
	if(keyCode == 32){
		if(camera.position.y == 0.5){
			keys.Space = false;
			JumpSpeed=0;
		}
	}
}

function movement(){
	console.log(keys)
	if(keys.W){
		controls.moveForward(MoveSpeed);
	}
	if(keys.S){
		controls.moveForward(-MoveSpeed);
	}
	if(keys.A){
		controls.moveRight(-MoveSpeed);
	}
	if(keys.D){
		controls.moveRight(MoveSpeed);
	}
	if(keys.Space){
		camera.position.y += JumpSpeed;
		JumpSpeed -= 0.005;
		if(camera.position.y<=0.5){
			keys.Space = false;
			JumpSpeed = 0;
			if(keys.Shift==false){
				camera.position.y = 0.5
			}
			if(keys.Shift==true){
				camera.position.y = 0.25
			}
		}
	}	
}


document.onmousemove=(event)=>{
	controls.movementX += event.movementX;
	controls.movementY += event.movementY;
}

function render() {
	requestAnimationFrame(render);

	renderer.render(scene, camera);
}

render();
