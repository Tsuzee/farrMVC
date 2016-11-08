//drawer.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.drawer = (function(){
	console.log("drawer.js module loaded");
	var aniFirstRun = true;
	var textSpeed = 25;
	var textY = 840;
	
	//draw the canvas background
	function drawBackground(ctx, bgImg, width, height){
		ctx.drawImage(bgImg, 0, 0, width, height);
	}
	
	//draw the character
	function drawChar(ctx, frameNum, moveRight, moveLeft, moveUp, 
                       moveDown, player, imageArray, adj){
        var adjust = adj;
		if(moveRight || (moveRight && moveUp)){
			if(frameNum > 0 && frameNum < 21){
				player.charNum = 14;
			}
			else if(frameNum > 19 && frameNum < 41){
				player.charNum = 15;
			}
			else if(frameNum > 39 && frameNum < 61){
				player.charNum = 16;
			}
			player.facing = 0;
		}
		else if(moveLeft || (moveLeft && moveUp) || (moveLeft && moveDown)){
			if(frameNum > 0 && frameNum < 21){
				player.charNum = 17;
			}
			else if(frameNum > 19 && frameNum < 41){
				player.charNum = 18;
			}
			else if(frameNum > 39 && frameNum < 61){
				player.charNum = 19;
			}
			player.facing = 1;
		}
		else if(moveUp){
			if(frameNum > 0 && frameNum < 21){
				player.charNum = 20;
			}
			else if(frameNum > 19 && frameNum < 41){
				player.charNum = 21;
			}
			else if(frameNum > 39 && frameNum < 61){
				player.charNum = 22;
			}
			player.facing = 3;
		}
		else if(moveDown){
			if(frameNum > 0 && frameNum < 21){
				player.charNum = 23;
			}
			else if(frameNum > 19 && frameNum < 41){
				player.charNum = 24;
			}
			else if(frameNum > 39 && frameNum < 61){
				player.charNum = 25;
			}
			player.facing = 2;
		}
		else{
			if(player.charNum == 15 || player.charNum == 16){player.charNum = 14;}
			else if(player.charNum == 18 || player.charNum == 19){player.charNum = 17;}
			else if(player.charNum == 21 || player.charNum == 22){player.charNum = 20;}
			else if(player.charNum == 24 || player.charNum == 25){player.charNum = 23;}
		}
		
		ctx.fillStyle = '#5DFC0A'; //green LED
		switch(player.health){
			case 4: {ctx.fillRect(player.x+33, player.y-10, 10, 5);}
			case 3: {ctx.fillRect(player.x+21, player.y-10, 10, 5);}
			case 2: {ctx.fillRect(player.x+9, player.y-10, 10, 5);}
			case 1: {ctx.fillRect(player.x-3, player.y-10, 10, 5);}
		}
		ctx.drawImage(imageArray[adjust + player.charNum], player.x, player.y, 40, 40);
	}//end draw character
	
	//draw character attack
	function drawCharAttack(ctx, aniFrameNum, imageArray, player){
		
		//right attack
		if(player.facing == 0){
			if(aniFrameNum > 0 && aniFrameNum < 7){
				ctx.drawImage(imageArray[27], (0), (player.facing * 112)+1, 112, 112, player.x + 18, player.y + 15, 30, 30);
			}
			else if(aniFrameNum > 6 && aniFrameNum < 14){
				ctx.drawImage(imageArray[27], (113), (player.facing * 112)+1, 112, 112, player.x +18, player.y + 15, 30, 30);
			}
			else if(aniFrameNum > 13 && aniFrameNum < 21){
				ctx.drawImage(imageArray[27], (225), (player.facing * 112)+1, 112, 112, player.x +18, player.y + 15, 30, 30);
			}
		}
		//left attack
		else if(player.facing == 1){
			if(aniFrameNum > 0 && aniFrameNum < 7){
				ctx.drawImage(imageArray[27], (0), (player.facing * 112)+1, 112, 112, player.x - 8, player.y + 15, 30, 30);
			}
			else if(aniFrameNum > 6 && aniFrameNum < 14){
				ctx.drawImage(imageArray[27], (113), (player.facing * 112)+1, 112, 112, player.x - 8, player.y + 15, 30, 30);
			}
			else if(aniFrameNum > 13 && aniFrameNum < 21){
				ctx.drawImage(imageArray[27], (225), (player.facing * 112)+1, 112, 112, player.x - 8, player.y + 15, 30, 30);
			}
		}
		//attack down
		else if(player.facing == 2){
			if(aniFrameNum > 0 && aniFrameNum < 7){
				ctx.drawImage(imageArray[27], (0), (player.facing * 112)+1, 112, 112, player.x + 16, player.y + 30, 30, 30);
			}
			else if(aniFrameNum > 6 && aniFrameNum < 14){
				ctx.drawImage(imageArray[27], (113), (player.facing * 112)+1, 112, 112, player.x +16, player.y + 30, 30, 30);
			}
			else if(aniFrameNum > 13 && aniFrameNum < 21){
				ctx.drawImage(imageArray[27], (225), (player.facing * 112)+1, 112, 112, player.x +16, player.y + 30, 30, 30);
			}
		}
		//attack up
		else if(player.facing == 3){
			if(aniFrameNum > 0 && aniFrameNum < 5){
				ctx.drawImage(imageArray[27], (0), (player.facing * 112)+1, 112, 112, player.x + 16, player.y - 5, 30, 30);
			}
			else if(aniFrameNum > 4 && aniFrameNum < 10){
				ctx.drawImage(imageArray[27], (113), (player.facing * 112)+1, 112, 112, player.x +16, player.y - 5, 30, 30);
			}
			else if(aniFrameNum > 9 && aniFrameNum < 16){
				ctx.drawImage(imageArray[27], (225), (player.facing * 112)+1, 112, 112, player.x +16, player.y - 5, 30, 30);
			}
		}
	}//end draw Character attack
	
	//draw enemies
	function drawEnemy(ctx, frameNum, enemies, imageArray){
		for(var en in enemies){
			switch(enemies[en].facing){
				case 0:{ //move up
					if(frameNum > 0 && frameNum < 21){
						ctx.drawImage(imageArray[26], (enemies[en].picX * 24), (enemies[en].picY * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					else if(frameNum > 19 && frameNum < 41){
						ctx.drawImage(imageArray[26], ((enemies[en].picX + 1) * 24), (enemies[en].picY * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					else if(frameNum > 39 && frameNum < 61){
						ctx.drawImage(imageArray[26], ((enemies[en].picX + 2) * 24), (enemies[en].picY * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					break;
				}
				case 1:{ //move down
					if(frameNum > 0 && frameNum < 21){
						ctx.drawImage(imageArray[26], (enemies[en].picX * 24), ((enemies[en].picY +2) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					else if(frameNum > 19 && frameNum < 41){
						ctx.drawImage(imageArray[26], ((enemies[en].picX + 1) * 24), ((enemies[en].picY +2) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					else if(frameNum > 39 && frameNum < 61){
						ctx.drawImage(imageArray[26], ((enemies[en].picX + 2) * 24), ((enemies[en].picY +2) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					break;
				}
				case 2:{ //left
					if(frameNum > 0 && frameNum < 21){
						ctx.drawImage(imageArray[26], (enemies[en].picX * 24), ((enemies[en].picY +3) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					else if(frameNum > 19 && frameNum < 41){
						ctx.drawImage(imageArray[26], ((enemies[en].picX + 1) * 24), ((enemies[en].picY +3) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					else if(frameNum > 39 && frameNum < 61){
						ctx.drawImage(imageArray[26], ((enemies[en].picX + 2) * 24), ((enemies[en].picY +3) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					break;
				}
				case 3:{ //right
					if(frameNum > 0 && frameNum < 21){
						ctx.drawImage(imageArray[26], (enemies[en].picX * 24), ((enemies[en].picY +1) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					else if(frameNum > 19 && frameNum < 41){
						ctx.drawImage(imageArray[26], ((enemies[en].picX + 1) * 24), ((enemies[en].picY +1) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					else if(frameNum > 39 && frameNum < 61){
						ctx.drawImage(imageArray[26], ((enemies[en].picX + 2) * 24), ((enemies[en].picY +1) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					}
					break;
				}
				case 4:{
					ctx.drawImage(imageArray[26], ((enemies[en].picX) * 24), ((enemies[en].picY) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 40, 50);
					break;
				}
				case 5:{
					ctx.drawImage(imageArray[26], ((enemies[en].picX + 1) * 24), ((enemies[en].picY +2) * 32)+1, 23, 31, enemies[en].x, enemies[en].y, 70, 80);
				}
			}//end switch
		}//end for loop
	}
	
	//draw crystals
	function drawCrystals(ctx, lvl, crystals){
		if(lvl-2 > -1 && lvl-2 < 7){
			if(!crystals[lvl-2].pickedUp){
				ctx.drawImage(crystals[lvl-2].img, crystals[lvl-2].posX, crystals[lvl-2].posY, crystals[lvl-2].width, crystals[lvl-2].height);
			}
		}
	}//end draw crystals
	
	//draw potion bottle
	function drawBottle(ctx, bottle){
      ctx.drawImage(bottle.img, bottle.x, bottle.y, bottle.width, bottle.height);
	}
	
	//draw main menu text
	function drawMainMenu(ctx){
		ctx.save();
		ctx.fillStyle = '#00E5EE';
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = "15pt Gabriela";
		ctx.fillText("as told by Darren Farr", 1090, 780);
		ctx.restore();
	}//end draw menu
	
	//draw the game instructions
	function drawInstructions(ctx, width, height, img){
		ctx.save();
		ctx.fillStyle = "black";
		ctx.globalAlpha = 0.5;
		ctx.rect(width/4, height/5, 2*(width/4), 2*(height/4));
		ctx.fill();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "white";
		ctx.font = "40pt Gabriela";
		ctx.globalAlpha = 1;
		ctx.fillText("Instructions", width/2, height/4);
		ctx.font = "20pt Gabriela";
		ctx.textAlign = "left";
		ctx.fillText("W/Up Arrow     - Move Up",width/2 - 175, height/4 + 40);
		ctx.fillText("S/Down Arrow  - Move Down", width/2 - 175, height/4 + 70);
		ctx.fillText("A/Left Arrow    - Move Left", width/2 - 175, height/4 + 100);
		ctx.fillText("D/Right Arrow - Move Right", width/2 - 175, height/4 + 130);
		ctx.fillText("ESC                    - Menu/Info", width/2 - 175, height/4 + 160);
		ctx.fillText("SPACE/MOUSE - Attack", width/2 - 175, height/4 + 190);
		ctx.restore();
		
		ctx.save();
		ctx.fillStyle = '#5DFC0A'; //green LED
		ctx.fillRect(315, 490, 10, 5);
		ctx.fillRect(327, 490, 10, 5);
		ctx.fillRect(339, 490, 10, 5);
		ctx.fillRect(351, 490, 10, 5);
		ctx.stroke();
		ctx.drawImage(img, 315, 500, 40, 40);
		ctx.font = "18pt Gabriela";
		ctx.textAlign = "left";
		ctx.fillStyle = "white";
		ctx.fillText("Character Health is shown by the four", 378, 460); 
		ctx.fillText("green bars over the character's head.", 378, 490);
		ctx.fillText("When all are gone, the character is dead,", 378, 520);
		ctx.fillText("and the game is over. Potions restore one bar.", 378, 550);
		ctx.restore();
	}//end draw instructions
	
	//draw game opening
	function drawOpening(ctx, width, height, dt){
		ctx.save();
		ctx.fillStyle = "black";
		ctx.globalAlpha = 0.7;
		ctx.rect(width/12, 0, 10*(width/12), height);
		ctx.fill();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "white";
		ctx.globalAlpha = 1;
		ctx.font = "20pt Gabriela";
		ctx.textAlign = "left";
		ctx.fillText("Long ago, the Seven Crystals were brought from across the sea. They",(width/8)-20, textY);
		ctx.fillText("brought light and life to a land that had suffered too long. Now an evil",(width/8)-20, textY+40);
		ctx.fillText("knight has come to steal the crystals and plunge your home back into",(width/8)-20, textY+80);
		ctx.fillText("darkness. The high wizard scattered the crystals across the kingdom and",(width/8)-20, textY+120);
		ctx.fillText("sealed the knight inside the crystal room. Alas this is only temporary. You",(width/8)-20, textY+160);
		ctx.fillText("the young hero must collect the fragments, confront, and defeat the knight",(width/8)-20, textY+200);
		ctx.fillText("to save your homeland.", (width/8)-20, textY+240);
		ctx.restore();
		textY -= textSpeed * dt;
	}
	
	//draw the win screen
	function drawWin(ctx, width, height, enemiesDefeated, totalLifeLost){
		ctx.save();
		ctx.fillStyle = "black";
		ctx.globalAlpha = 0.3;
		ctx.rect(0, 0, width, height);
		ctx.fill();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "white";
		ctx.globalAlpha = 1;
		ctx.font = "40pt Gabriela";
		ctx.fillText("Congratulations!!", width/2, (height/4) + 40);
		ctx.font = "20pt Gabriela";
		ctx.fillText("You have saved your kingdom from the evil knight.", width/2, (height/4) + 100);
		ctx.fillText("Peace can now reign again for a time.", width/2, (height/4) + 140);
		ctx.fillText("You defeated " + enemiesDefeated + " monsters,", width/2, (height/4) +200);
		ctx.fillText("and lost " + totalLifeLost + " health", width/2, (height/4) +250);
		ctx.fillText("during your journey.", width/2, (height/4) +300);
		ctx.restore();
	}
	
	//draw credits screen
	function drawCredits(ctx, WIDTH, HEIGHT){
		ctx.save();
		ctx.globalAlpha = 1;
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,1200,800);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "white";
		ctx.font = "30pt Gabriela";
		ctx.fillText("Curse of the Seven Crystals", WIDTH/2, HEIGHT/3);
		ctx.fillText("by", WIDTH/2, HEIGHT/3 + 40);
		ctx.fillText("Darren Farr", WIDTH/2, HEIGHT/3 + 80);
		ctx.restore();
	}//end of draw credits
	
	//draw game over screnn
	function drawGameOver(ctx, WIDTH, HEIGHT, enemiesDefeated, totalLifeLost){
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "white";
		ctx.font = "40pt Gabriela";
		ctx.fillText("GAME OVER", WIDTH/2, HEIGHT/3);
		ctx.font = "20pt Gabriela";
		ctx.fillText("You defeated " + enemiesDefeated + " monsters,", WIDTH/2, HEIGHT/2 +100);
		ctx.fillText("and lost " + totalLifeLost + " health", WIDTH/2, HEIGHT/2 +150);
		ctx.fillText("during your journey.", WIDTH/2, HEIGHT/2 +200);
		ctx.restore();
	}//end draw game over
	
	//draw pause screen
	function drawPauseScreen(ctx, displayMenu, gameState, GAME_STATE, WIDTH, HEIGHT, enemiesDefeated, totalLifeLost, gemsCollected){
		ctx.save();
		ctx.globalAlpha = 1;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "black";
		ctx.font = "80pt Gabriela";
		if(!displayMenu && gameState != GAME_STATE.INSTRUCTIONS){
			ctx.fillText("... PAUSED ...", WIDTH/2, HEIGHT/2);
		}
		else if(!(gameState == GAME_STATE.INSTRUCTIONS)){
			//draw the in game menu here
			ctx.globalAlpha = 0.5;
			ctx.fillStyle = 'rgba(0,0,0,0.1)';
			ctx.rect(350, 350, 500, 200);
			ctx.fill();
			ctx.fillStyle = "white";
			ctx.font = "40pt Gabriela";
			ctx.fillText("... PAUSED ...", WIDTH/2, HEIGHT/2);
			ctx.font = "20pt Gabriela";
			ctx.fillText("Gems Collected: " + gemsCollected, WIDTH/2, HEIGHT/2 + 75);
			ctx.fillText("So far you have killed " + enemiesDefeated + " enemies,", WIDTH/2, HEIGHT/2+125);
			ctx.fillText("and lost " + totalLifeLost + " health on your journey.", WIDTH/2, HEIGHT/2+175);
		}
		ctx.restore();
		document.querySelector("#StartBut").style.display = "none";
		document.querySelector("#InstructBut").style.display = "none";
	}//end draw pause
  
  //draw Inventory Screen
  function drawCharacterScreen(ctx, width, height, inventoryNum, imgs, crystals){

    ctx.drawImage(imgs[40], (width/2) - 250, (height/2) - 134, 499, 268);
    
    ctx.drawImage(crystals[0].img, (width/2) - 200, (height/2) - 90, crystals[0].width, crystals[0].height);
    
    ctx.drawImage(crystals[1].img, (width/2) - 140, (height/2) - 90, crystals[0].width, crystals[0].height);
    
    ctx.drawImage(crystals[2].img, (width/2) - 80, (height/2) - 90, crystals[0].width, crystals[0].height);
    
    ctx.drawImage(crystals[3].img, (width/2) - 20, (height/2) - 90, crystals[0].width, crystals[0].height);
    
    ctx.drawImage(crystals[4].img, (width/2) + 40, (height/2) - 90, crystals[0].width, crystals[0].height);
    
    ctx.drawImage(crystals[5].img, (width/2) + 105, (height/2) - 95, crystals[0].width+5, crystals[0].height+5);
    
    ctx.drawImage(crystals[6].img, (width/2) + 165, (height/2) - 95, crystals[0].width+5, crystals[0].height+5);
  }
	
  /*draw crystals
	function drawCrystals(ctx, lvl, crystals){
		if(lvl-2 > -1 && lvl-2 < 7){
			if(!crystals[lvl-2].pickedUp){
				ctx.drawImage(crystals[lvl-2].img, crystals[lvl-2].posX, crystals[lvl-2].posY, crystals[lvl-2].width, crystals[lvl-2].height);
			}
		}
	}//end draw crystals */
	return{
		drawMainMenu: 		  drawMainMenu,
		drawInstructions: 	  drawInstructions,
		drawBackground:		  drawBackground,
		drawChar:			  drawChar,
		drawCharAttack:		  drawCharAttack,
		drawEnemy:			  drawEnemy,
		drawCredits:		  drawCredits,
		drawGameOver:		  drawGameOver,
		drawPauseScreen:	  drawPauseScreen,
		drawOpening:		  drawOpening,
		drawCrystals:		  drawCrystals,
		drawBottle:			  drawBottle,
		drawWin:			  drawWin,
        drawCharMenu:  drawCharacterScreen
		
	};
	
}());