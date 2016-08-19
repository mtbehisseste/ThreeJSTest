/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global THREE */

function Graphics(scene, camera) {
	this.bodies = [];


	var gfm = new THREE.Mesh(new THREE.BoxGeometry(1000, 1, 1000), new THREE.MeshPhongMaterial({color: 0xffffff}));
	scene.add(gfm);
	var ambient = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambient);
	var light = new THREE.SpotLight();
	light.position.set(100, 1000, 100);
	light.castShadow = true;

	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

	light.shadow.camera.near = 500;
	light.shadow.camera.far = 4000;
	light.shadow.camera.fov = 30;
	scene.add(light);
	
	var ls = new THREE.SpotLightShadow(camera);
	ls.update(light);
	scene.add(ls);
	
	for (var i = 0; i < 100; i++) {
		var gm = new THREE.BoxGeometry(Math.random() * 30, Math.random() * 30, Math.random() * 30);
		var mt = new THREE.MeshPhongMaterial({color: 0xffffff});
		var mh = new THREE.Mesh(gm, mt);
		mh.position.x = Math.random() * 100 - 50;
		mh.position.y = Math.random() * 100 - 50;
		mh.position.z = Math.random() * 100 - 50;
		scene.add(mh);
		this.bodies.push(mh);
	}



	/*
	 var buildings = [], ms = [];
	 
	 
	 $.getJSON("./js/building.json", function (data) {
	 console.log(data);
	 buildings = data;
	 placeBuilding();
	 });
	 
	 
	 function placeBuilding() {
	 for (var a = 0; a < buildings.length; a++) {
	 console.log(buildings);
	 //var geometry = new THREE.BoxGeometry(1,1,1);
	 var geometry = new THREE.BoxGeometry(buildings[a].length, buildings[a].height, buildings[a].width);
	 
	 var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
	 var mesh = new THREE.Mesh(geometry, material);
	 //mesh.matrix.setPosition(start_position);
	 mesh.matrix.setPosition({x: buildings[a].location.x, y: buildings[a].height / 2, z: buildings[a].location.z});
	 mesh.matrixAutoUpdate = false;
	 //mesh.position.copy(buildings[a].location.x , buildings[a].height , buildings[a].location.z);
	 
	 mesh.position.copy(1, 0, 0);
	 //mesh.updateMatrix();
	 ms.push(mesh);
	 scene.add(mesh);
	 }
	 }
	 */

	scene.add(new THREE.GridHelper(50, 50));

	this.update = function (delta) {

	}
}