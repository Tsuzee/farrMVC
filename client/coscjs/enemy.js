//enemy.js

"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.enemy = (function(){
	console.log("enemy.js module loaded");
	var enemy;
	var levelLoad;
	var enemies;
	var moveRand = 0;
	
	//setup the enemies
	function setupEnemies(){
		var enemyList = this.levelLoad.getEnemies();
		var myEnemy = [];
		for(var i = 0; i < enemyList.length; i+=5){
			this.enemy = {};
		
			//add properties to player
			this.enemy.x = enemyList[i];
			this.enemy.y = enemyList[i+1];
			this.enemy.facing = enemyList[i+2];
			this.enemy.picX = enemyList[i+3];
			this.enemy.picY = enemyList[i+4];
			this.enemy.speed = 80;
			this.enemy.hp = 10;
			this.enemy.startX = this.enemy.x;
			this.enemy.startY = this.enemy.y;
			this.enemy.health = 2;
		
			Object.seal(this.enemy);

			myEnemy.push(this.enemy);
		}
		this.enemies = myEnemy;
	}
	
	function moveEnemy(curEnemy, dt){
		
		switch(curEnemy.facing){
			case 0:{
				//move up
				curEnemy.y -= (curEnemy.speed * dt);
				if(curEnemy.y < (curEnemy.startY - 100)){ curEnemy.facing = 1;}
				break;
			}
			case 1:{
				//move down
				curEnemy.y += (curEnemy.speed * dt);
				if(curEnemy.y > (curEnemy.startY + 100)){ curEnemy.facing = 0;}
				break;
			}
			case 2:{
				//move left
				curEnemy.x -= (curEnemy.speed * dt);
				if(curEnemy.x < (curEnemy.startX - 100)){ curEnemy.facing = 3;}
				break;
			}
			case 3:{
				//move right
				curEnemy.x += (curEnemy.speed * dt);
				if(curEnemy.x > (curEnemy.startX + 100)){ curEnemy.facing = 2;}
				break;
			}
			case 4:{
				//don't move
				break;
			}
			case 5:{
				if(moveRand == 0){
					curEnemy.y += (curEnemy.speed * dt);
					if(curEnemy.y > (curEnemy.startY + 100)){ moveRand = 1;}
				}
				else if(moveRand == 1){
					curEnemy.x -= (curEnemy.speed * dt);
					if(curEnemy.x < (curEnemy.startX - 100)){ moveRand = 2;}
				}
				else if(moveRand == 2){
					curEnemy.y -= (curEnemy.speed * dt);
					if(curEnemy.y < (curEnemy.startY - 100)){ moveRand = 3;}
				}
				else if(moveRand == 3){
					curEnemy.x += (curEnemy.speed * dt);
					if(curEnemy.x > (curEnemy.startX + 100)){ moveRand = 0;}
				}
				break;
			}
		
		}//end switch
	}
	
	
	function getEnemies(){
		
		return this.enemies;
	}
	
	return{
		setupEnemies: setupEnemies,
		getEnemies: getEnemies,
		moveEnemy: moveEnemy
	};
	
}());