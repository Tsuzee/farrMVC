/*
loader.js
variable 'app' is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new empty object literal
var app = app || {};

window.onload = function(){
  console.log("window.onload called");
  
  /*
  let socket;
  socket = io.connect();
  
  socket.on('connect', () => {
    socket.emit('join',{name: new Date().getTime()});
    console.log("Connecting to server");
  }); */
  
  //app.main.SOCKET = socket;
  app.sound.init();
  app.levelLoader.levels = app.levels;
  app.levelLoader.init();
  app.main.sound = app.sound;
  app.main.images = app.images;
  app.main.levelLoader = app.levelLoader;
  app.enemy.levelLoad = app.levelLoader;
  app.main.enemy = app.enemy;
  app.main.Emitter = app.Emitter;
  app.main.drawer = app.drawer;
  app.main.preload();
  app.main.init();
}

window.onblur = function(){
	console.log("blur at " + Date());
	//app.main.pauseGame();
};

window.onfocus = function(){
	console.log("focus at " + Date());
	//app.main.resumeGame();
};