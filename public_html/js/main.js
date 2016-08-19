/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global THREE */

var scene, camera, renderer, player;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// renderer settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;



document.body.appendChild(renderer.domElement);

player = new Player(camera);
player.limit = { x: [-100, 100], y: [-100, 100], z: [-100, 100] };

graphics = new Graphics(scene, camera);

var lastTime = Date.now();
(function render() {
	var delta = Date.now() - lastTime;
	lastTime = Date.now();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	graphics.update(delta);
	player.update(delta);
})();
