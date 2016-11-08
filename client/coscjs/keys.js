// The myKeys object will be in the global scope - it makes this script 
"use strict";

var myKeys = {};

myKeys.KEYBOARD = Object.freeze({
	"KEY_LEFT": 37, 
	"KEY_UP": 38, 
	"KEY_RIGHT": 39, 
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"KEY_SHIFT": 16
});

// myKeys.keydown array to keep track of which keys are down
// this is called a "key daemon"
// main.js will "poll" this array every frame
// this works because JS has "sparse arrays" - not every language does
myKeys.keydown = [];

// event listeners
window.addEventListener("keydown",function(e){
	//console.log("keydown=" + e.keyCode);
	myKeys.keydown[e.keyCode] = true;
	
	var char = String.fromCharCode(e.keyCode);
	
	//console.log("Key output:" + e.keyCode + ":");
	
	//use flags for multi key input
	
	///////////////////////////////////////////////////////////////
	//------------------------movement-----------------------------
	///////////////////////////////////////////////////////////////
	//up
	if(char == "w" || char == "W" || char == "&"){
		app.main.moveUp = true;
	}
	//down
	if(char == "s" || char == "S" || char == "("){
		app.main.moveDown = true;
	}
	//left
	if(char == "a" || char == "A" || char == "%"){
		app.main.moveLeft = true;
	}
	//right
	if(char == "d" || char == "D" || char == "'"){
		app.main.moveRight = true;
	}
	//attack
	if(char == " " || char == " "){
		app.main.attack = true;
	}
    //inventory
    if(char == "c" || char == "C"){
      app.main.charScreen();
    }
	//escape key
	if(e.keyCode == 27){
		//menu toggle
		app.main.displayMenu = !app.main.displayMenu;
		if (app.main.paused){
			app.main.resumeGame();
		} else {
			app.main.pauseGame();
		}
	}
});
	
window.addEventListener("keyup",function(e){
	//console.log("keyup=" + e.keyCode);
	myKeys.keydown[e.keyCode] = false;
	
	////////////////////////////////////////////////////////////////
	// pausing and resuming
	var char = String.fromCharCode(e.keyCode);
	if (char == "p" || char == "P"){
		if (app.main.paused){
			app.main.resumeGame();
		} else {
			app.main.pauseGame();
		}
	}
	
	//stop character from moving
	if(char == "w" || char == "W" || char == "&"){
		app.main.moveUp = false;
	}
	//down
	if(char == "s" || char == "S" || char == "("){
		app.main.moveDown = false;
	}
	//left
	if(char == "a" || char == "A" || char == "%"){
		app.main.moveLeft = false;
	}
	//right
	if(char == "d" || char == "D" || char == "'"){
		app.main.moveRight = false;
	}	
});