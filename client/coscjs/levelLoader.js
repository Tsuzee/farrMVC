//levelLoader.js

"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.levelLoader = (function(){
	console.log("levelLoader.js module loaded");
	var levels;
	var levelArray;
	var background;
	var music;
	var exits = [];
	var boundingBoxes =[];
	var enemies = [];
	var crystals = [];
	
  //inventory stuff
  
  
	//areas that the character walks onto to move to a different area
	var ExitRect = function(x, y, w, h, n){
		this.posX = x;
		this.posY = y;
		this.width = w;
		this.height = h;
		this.exitNum = n;		
	};
	
	//box that is used for bounding the character inside the level
	var BoxRect = function(x, y, w, h){
		this.posX = x;
		this.posY = y;
		this.width = w;
		this.height = h;
	};
	
	var Crystal = function(x, y, h, w){
		this.img;
		this.posX = x;
		this.posY = y;
		this.width = w;
		this.height = h;
		this.pickedUp = false;
	}
	
	function init(){
		this.levelArray = this.levels.levelsArray;
		var myCrystals = [];
		for(var g = 0; g < this.levels.crystalPos.length; g+=2)
		{
			var crystal = new Crystal(this.levels.crystalPos[g], this.levels.crystalPos[g+1], 40, 40)
			myCrystals.push(crystal);
		}
		this.crystals = myCrystals;
	}
	
	//load a level from array data
	function loadLevel(levelNum, numOfCrystals){
		this.background = this.levelArray[levelNum - 1][0];
		this.music = this.levelArray[levelNum - 1][1];
		var numOfExits = this.levelArray[levelNum -1][2];
		var numOfBoxes = this.levelArray[levelNum-1] [ (5* numOfExits) + 3];
		var index = 3;
		var myExits = [];
		var myBoxes = [];
		var myEnemy = [];
		
		//loop through the array setting up exit points
		for(var i = 0; i < numOfExits; i++){
			var exit = new ExitRect( this.levels.levelsArray[levelNum -1][index], this.levels.levelsArray[levelNum -1][index+1],
				this.levels.levelsArray[levelNum -1][index+2], this.levels.levelsArray[levelNum -1][index+3],
				this.levels.levelsArray[levelNum -1][index+4]);
			index += 5;
			myExits[i] = exit;
		}
		this.exits = myExits;
		index = (5* numOfExits) + 4;
		
		//loop through the array setting up bounding boxes
		for(var k = 0; k < numOfBoxes; k++){
			var box = new BoxRect ( this.levels.levelsArray[levelNum -1][index], this.levels.levelsArray[levelNum -1][index+1],
				this.levels.levelsArray[levelNum -1][index+2], this.levels.levelsArray[levelNum -1][index+3]);
			index += 4;
			myBoxes[k] = box;
		}
		
		//loop through the array and setup enemies
		var numOfEnemies = this.levels.levelsArray[levelNum - 1][index];
		index++;
		for(var h = 0; h < numOfEnemies; h++){
				myEnemy.push(this.levels.levelsArray[levelNum - 1][index]);
				myEnemy.push(this.levels.levelsArray[levelNum - 1][index+1]);
				myEnemy.push(this.levels.levelsArray[levelNum - 1][index+2]);
				myEnemy.push(this.levels.levelsArray[levelNum - 1][index+3]);
				myEnemy.push(this.levels.levelsArray[levelNum - 1][index+4]);
				index += 5;
		}
		this.enemies = myEnemy;
		
		//add in additional potions if the level has any
		var numOfBottles = this.levels.levelsArray[levelNum - 1][index];
		console.log("Index: " + index + " = " + this.levels.levelsArray[levelNum - 1][index]);
		index++;
		for(var m = 0; m < numOfBottles; m++){
			app.main.makeBottle(this.levels.levelsArray[levelNum - 1][index], this.levels.levelsArray[levelNum - 1][index+1]);
			index+=2;
		}
			
		
		//if the level is the starting area, add the extra character bounds
		//for blocking off progression unless conditions are met
		if(levelNum == 1){
			this.levels.extraBounding(numOfCrystals);
			numOfBoxes = this.levels.bound[0];
			if(numOfBoxes > 0){
				index = 1;
				for(var j = 0; j < numOfBoxes; j++){
					var box = new BoxRect ( this.levels.bound[index], this.levels.bound[index+1],
						this.levels.bound[index+2], this.levels.bound[index+3]);
					index += 4;
					myBoxes.push(box);
				}
			}
		}
		this.boundingBoxes = myBoxes;
	}//end of load level
	
	//get functions
	function getBackground(){
		return this.background;
	}
	
	function getMusic(){
		return this.music;
	}
	
	function getExits(){
		return this.exits;
	}
	
	function getBoxes(){
		return this.boundingBoxes;
	}
	
	function getEnemies(){
		return this.enemies;
	}
	
	function getCrystals(){
		return this.crystals;
	}
  
  function getCharacterScreen(){
    return this.charScreen;
  }
	
	return{
		init:               init,
		loadLevel: 		    loadLevel,
		getBackground:   	getBackground,
		getMusic:		    getMusic,
		getExits: 	     	getExits,
		getBoxes: 	     	getBoxes,
		getEnemies: 	    getEnemies,
		getCrystals:	    getCrystals
        //getCharacterScreen: getCharScreen
	};
}());