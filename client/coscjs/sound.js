// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function(){
	console.log("sound.js module loaded");
	var bgAudio = undefined;
	var effectAudio = undefined;
	var effectToPlay = 0;
	var backgroundMusic = ["mainmenu.mp3","area1.mp3","area2.mp3","area3.mp3","area4.mp3","area5.mp3","area6.mp3",
						"area7.mp3","area8.mp3","area9.mp3", "gameover.ogg", "credits.mp3", "win.mp3"];
	var effectSounds = ["swing.wav", "bubble.wav", "death.wav"];

	function init(){
		bgAudio = document.querySelector("#bgAudio");
		bgAudio.volume=0.25;
		effectAudio = document.querySelector("#effectAudio");
		effectAudio.volume = 0.3;
	}
	
	function stopBGAudio(){
		bgAudio.pause();
	}
	
	function restartBGAudio(){
		bgAudio.play();
	}
	
	function playBGAudio(trackNum){
		bgAudio.src = "coscmedia/" + backgroundMusic[trackNum];
		bgAudio.currentTime = 0;
		bgAudio.play();
	}
	
	function playEffect(num){
		effectAudio.src = "coscmedia/" + effectSounds[num];
		effectAudio.play();
	}
		
	// export a public interface to this module
	return{
		init: init,
		stopBGAudio: stopBGAudio,
		playEffect: playEffect,
		playBGAudio: playBGAudio,
		restartBGAudio: restartBGAudio
	};
}());