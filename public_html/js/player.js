/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global THREE */

function Player(object) {
	
	this.enabled = true;
	this.restrictPosition = true;
	
	this.object = object;
	this.imag = this.focus / 2;
	
	this.fSpeed = 0.01;
	this.vSpeed = 0.01;
	this.rSpeed = 0.0005;
	
	
	this.limit = {
		x: [-10, 10],
		y: [-10, 10],
		z: [-10, 10]
	};
	
	this.onKeyDown = function(e) {
		switch (e.keyCode) {
			case 87: /*W*/ this.moveForward = true; break;
			case 65: /*A*/ this.moveLeft = true; break;
			case 83: /*S*/ this.moveBackward = true; break;
			case 68: /*D*/ this.moveRight = true; break;
			case 32: /*space*/ this.moveUp = true; break;
			case 16: /*shift*/ this.moveDown = true; break;
			case 81: /*Q*/ this.turnRight = true; break;
			case 69: /*E*/ this.turnLeft = true; break;
		}
	};

	this.onKeyUp = function(e) {
		switch (e.keyCode) {
			case 87: /*W*/ this.moveForward = false; break;
			case 65: /*A*/ this.moveLeft = false; break;
			case 83: /*S*/ this.moveBackward = false; break;
			case 68: /*D*/ this.moveRight = false; break;
			case 32: /*space*/ this.moveUp = false; break;
			case 16: /*shift*/ this.moveDown = false; break;
			case 81: /*Q*/ this.turnRight = false; break;
			case 69: /*E*/ this.turnLeft = false; break;
		}
	};
	
	this.update = function(delta) {
		if(!this.enabled) return;
		
		// Convert to actual speed
		var actualF = delta * this.fSpeed;
		var actualV = delta * this.vSpeed;
		var actualR = delta * this.rSpeed;
		
		
		// Update position and rotation
		if(this.moveForward) this.object.translateZ(-actualF);
		if(this.moveBackward) this.object.translateZ(actualF);
		if(this.moveLeft) this.object.translateX(-actualF);
		if(this.moveRight) this.object.translateX(actualF);
		if(this.moveUp) this.object.translateY(actualV);
		if(this.moveDown) this.object.translateY(-actualV);
		if(this.turnLeft) this.object.rotateY(-actualR);
		if(this.turnRight) this.object.rotateY(actualR);
		
		// Restrict position
		if(!this.restrictPosition) return;
		if(this.object.position.x > this.limit.x[1]) this.object.position.x = this.limit.x[1];
		if(this.object.position.x < this.limit.x[0]) this.object.position.x = this.limit.x[0];
		if(this.object.position.y > this.limit.y[1]) this.object.position.y = this.limit.y[1];
		if(this.object.position.y < this.limit.y[0]) this.object.position.y = this.limit.y[0];
		if(this.object.position.z > this.limit.z[1]) this.object.position.z = this.limit.z[1];
		if(this.object.position.z < this.limit.z[0]) this.object.position.z = this.limit.z[0];
	};
	
	function contextmenu(event) {
		event.preventDefault();
	}

	this.dispose = function() {
		ocument.removeEventListener('contextmenu', contextmenu, false);
		window.removeEventListener('keydown', _onKeyDown, false);
		window.removeEventListener('keyup', _onKeyUp, false);
	};

	var _onKeyDown = bind(this, this.onKeyDown);
	var _onKeyUp = bind(this, this.onKeyUp);

	document.addEventListener('contextmenu', contextmenu, false);
	window.addEventListener('keydown', _onKeyDown, false);
	window.addEventListener('keyup', _onKeyUp, false);

	function bind(scope, fn) {
		return function () {
			fn.apply(scope, arguments);
		};
	}
}