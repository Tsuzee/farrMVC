// main.js
// Dependencies: 
// Description: singleton object
// This object will be our main "controller" class and will contain references
// to most of the other objects in the game.

"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

/*
.main is an object literal that is a property of the app global
This object literal has its own properties and methods (functions)

*/
app.main = {
  //  properties
  SOCKET: undefined,
  USER: undefined,
  paused: false,
  animationID: 0,
  WIDTH : 1200, 
  HEIGHT: 800,
  canvas: undefined,
  ctx: undefined,
  imageArray: [],
  lastTime: 0, // used by calculateDeltaTime() 
  debug: false,
  gameState: undefined,
  drawer: undefined,
  collisions: undefined,
  sound: undefined,
  images: undefined,
  bottle: undefined,
  bottleList: [],
  playerHit: false,
  enemy: undefined,
  crystalsToCollect: undefined,
  levelLoader: undefined,
  Emitter: undefined,
  pulsar: undefined,
  pulsarFrameNum: -1,
  bgPlaying: false,
  dt: 0,
  displayMenu: false,
  attack: false,
  oneCombatCheck: false,
  aniFrameNum: 0,
  hitFrameNum: 0,
  winFrame: 0,
  aniFirstRun: true,
  currentLevel: 1,
  newLevel: true,
  bgNum: 0,
  musicNum: 0,
  lvlExits: undefined,
  boxes: undefined,
  crystals: 0,
  enemies: undefined,
  enemiesDefeated: 0,
  totalLifeLost: 0,
  newLvlData: undefined,
  levelDetails: undefined,
  
  //Player 1 properties
  player: undefined,
  frameNum: 0,
  moveLeft: false,
  moveRight: false,
  moveUp: false,
  moveDown: false,
  showCharScreen: false,
  
  //Player 2 properties (player 2 is the "other" player)
  player2: undefined,
  frameNumP2: undefined,
  moveRightP2: undefined,
  moveLeftP2: undefined,
  moveUpP2: undefined,
  moveDownP2: undefined,
  playerJoined: false,

PLAYER: Object.freeze({
    SPEED: 120,
    HEALTH: 4,
}),

GAME_STATE: Object.freeze({ // another fake enumeration 
    BEGIN : 0,
    MAIN_MENU: 1,
    INSTRUCTIONS: 2,
    OPENING: 3,
    DEFAULT: 4,
    CREDITS: 5,
    END : 6
}),
  

  ///////////////////////////////////////////////////////////////////////////////////////
  //-----------------------------------methods-------------------------------------------
  ///////////////////////////////////////////////////////////////////////////////////////

  //Preloading and setup
  ///////////////////////////////////////////////////////////////////////////////////////
  preload: function(){
      var imgArray = [];
      loadImagesWithCallback(app.images.images, function(gameImages){
          console.log("Images: " + gameImages);
          imgArray = gameImages;
          console.log("** images all pre-loaded **");
          console.log("imageArray=" + imgArray);
          app.main.imageArray = imgArray;
      });
  },

  init : function() {
      console.log("app.main.init() called");
      // initialize properties
      this.canvas = document.querySelector('canvas');
      this.canvas.width = this.WIDTH;
      this.canvas.height = this.HEIGHT;
      this.ctx = this.canvas.getContext('2d');

      this.setupPlayer();

      //initialize the game state
      this.gameState = this.GAME_STATE.BEGIN;
      document.querySelector("#BackBut").style.display = "none";
      document.querySelector("#TryBut").style.display = "none";

      //hook events
      this.canvas.onmousedown = this.doMousedown.bind(this);

      this.gameState = this.GAME_STATE.MAIN_MENU;
      this.sound.playBGAudio(0);
      this.bgPlaying = true;
      // start the game loop
      this.update();
  },

  //Server Functions
  ///////////////////////////////////////////////////////////////////////////////////////  
  updateServer: function(){
    var p2Data = {
    player2: this.player,
    frameNumP2: this.frameNum,
    moveRightP2: this.moveRight,
    moveLeftP2: this.moveLeft,
    moveUpP2: this.moveUp,
    moveDownP2: this.moveDown
    }
    
    this.SOCKET.emit('update', p2Data);
    
  },
  
  update: function(){
    //LOOP
    //schedule a call to update()
    //requestAnimationFrame(function(){app.main.update()});
    this.updateServer();

    this.SOCKET.on('setUser', (data) => {
      this.USER = data.name;
      console.log("USER Name is: " + this.USER);
    });
    
    this.SOCKET.on('secondPlayer', () => {
      if(!this.playerJoined){
        this.playerJoined = true;
        console.log("Second player joined, sending level data");
        this.SOCKET.emit('newLevel', this.levelDetails);
      }
    });
  
    this.SOCKET.on('updateP2', (data) =>{
      this.player2 = data.player2;
      this.frameNumP2 = data.frameNumP2;
      this.moveRightP2 = data.moveRightP2;
      this.moveLeftP2 = data.moveLeftP2 ;
      this.moveUpP2 = data.moveUpP2;
      this.moveDownP2 = data.moveDownP2;
      if(this.frameNum == 50){
        //console.log(this.player2.health);
      }
    });
    
    this.SOCKET.on('updateEnemyList', (data) => {
      this.enemies = data;
    });
    
    this.SOCKET.on('updateBottleList', (data) => {
      if(!(this.bottleList === data)){
        this.bottleList = data;
        for(var i = 0; i < this.bottleList.length; i++){
          this.bottleList[i].img = this.imageArray[28];
        }
      }
    });
    
    this.SOCKET.on('updateCrystalList', (data) => {
      this.crystalsToCollect = data;
    });
    
  this.SOCKET.on('p2Left', () => {
    console.log("Other Player has left");
    this.player2 = undefined;
  });
    
    this.SOCKET.on('newLevelData', (data) =>{
      this.newLvlData = data;
      console.log("Received new level data");
    });
    
    //Tell the server that the player is moving
  if(this.frameNum == 50){
    if(this.player != undefined && this.player2 != undefined){
      //console.log("Current Level: " + this.player.levelIn);
      //console.log(this.player.facing);
      //console.log(this.player2.facing);
    }
  }    
    
      this.animationID = requestAnimationFrame(this.update.bind(this));
      this.frameNum++;
      this.aniFrameNum++;
      this.hitFrameNum++;
      if(this.frameNum == 60){
          this.frameNum = 1;
      }
      if(this.aniFrameNum > 1000){
          this.aniFrameNum = 0;
      }
      if(this.HitFrameNum > 1000){
          this.HitFrameNum = 0;
      }
      if(this.playerHit && this.hitFrameNum > 30)
      {
          this.playerHit = false;
      }
      if(this.pulsarFrameNum > 0){
          this.pulsarFrameNum++;
      }

      //PAUSED?
      //if so, bail out of loop
      if(this.paused){
          this.drawer.drawPauseScreen(this.ctx, this.displayMenu, this.gameState, this.GAME_STATE, 
          this.WIDTH, this.HEIGHT, this.enemiesDefeated, this.totalLifeLost, this.crystals);
          return;
      }

      //HOW MUCH TIME HAS GONE BY?
      this.dt = this.calculateDeltaTime();

      ///////////////////////////////////////////////////////////////////////////////////////////////
      //----------------------------------------------Main Switch------------------------------------
      ///////////////////////////////////////////////////////////////////////////////////////////////
      switch(this.gameState){
          case this.GAME_STATE.BEGIN:{
              break;
          }
          ////////////////////////////////////////////////////////////////////////////////////////////
          case this.GAME_STATE.MAIN_MENU:{
              this.drawer.drawBackground(this.ctx, this.imageArray[0], this.WIDTH, this.HEIGHT);
              //start the game
              document.querySelector("#BeginBut").style.display = "none";
              document.querySelector("#StartBut").onclick = function(){
                  //app.main.gameState = app.main.GAME_STATE.DEFAULT;
                  app.main.gameState = app.main.GAME_STATE.OPENING;
                  document.querySelector("#StartBut").style.display = "none";
                  document.querySelector("#InstructBut").style.display = "none";
              }
              document.querySelector("#InstructBut").onclick = function(){
                  app.main.gameState = app.main.GAME_STATE.INSTRUCTIONS;
                  document.querySelector("#StartBut").style.display = "none";
                  document.querySelector("#InstructBut").style.display = "none";
              }
              this.drawer.drawMainMenu(this.ctx);
              break;
          }
          ////////////////////////////////////////////////////////////////////////////////////////////
          case this.GAME_STATE.INSTRUCTIONS:{
              this.drawer.drawBackground(this.ctx, this.imageArray[1], this.WIDTH, this.HEIGHT);
              this.drawer.drawInstructions(this.ctx, this.WIDTH, this.HEIGHT, this.imageArray[14]);

              document.querySelector("#BackBut").style.display = "inline";
              document.querySelector("#BackBut").onclick = function(){
                  app.main.gameState = app.main.GAME_STATE.MAIN_MENU;
                  document.querySelector("#StartBut").style.display = "inline";
                  document.querySelector("#InstructBut").style.display = "inline";
                  document.querySelector("#BackBut").style.display = "none";
              }
              break;
          }
          case this.GAME_STATE.OPENING:{
              document.querySelector("#BeginBut").style.display = "inline";
              this.drawer.drawBackground(this.ctx, this.imageArray[1], this.WIDTH, this.HEIGHT);
              this.drawer.drawOpening(this.ctx, this.WIDTH, this.HEIGHT, this.dt);
              document.querySelector("#BeginBut").onclick = function(){
                  app.main.gameState = app.main.GAME_STATE.DEFAULT;
                  app.main.bgPlaying = false;
                  document.querySelector("#StartBut").style.display = "none";
                  document.querySelector("#InstructBut").style.display = "none";
                  document.querySelector("#BeginBut").style.display = "none";
              }

              break;
          }
          ///////////////////////////////////////////////////////////////////////////////////////
          case this.GAME_STATE.DEFAULT:{
            //load level
            //check to see if a player has already made this level
              if(this.newLevel){
                this.player.levelIn = this.currentLevel;
                this.bottleList = [];
                
                //If there is a second player check if they are already in this level
                if(this.player2 == undefined || !(this.player2.levelIn === this.currentLevel) ){
                  console.log("creating the base level");
                  this.levelLoader.loadLevel(this.currentLevel, this.crystals);
                  this.boxes = this.levelLoader.getBoxes();
                  this.enemy.setupEnemies();
                  this.enemies = this.enemy.getEnemies();
                  this.bgNum = this.levelLoader.getBackground();
                  this.musicNum = this.levelLoader.getMusic();
                  this.lvlExits = this.levelLoader.getExits();
                  this.crystalsToCollect = this.levelLoader.getCrystals();
                  
                  //package level details
                  console.log("Storing new level data");
                  this.levelDetails = {};
                  this.levelDetails.boxes = this.boxes;
                  this.levelDetails.enemies = this.enemies;
                  this.levelDetails.bgNum = this.bgNum;
                  this.levelDetails.musicNum = this.musicNum;
                  this.levelDetails.lvlExits = this.lvlExits;
                  console.log(this.bottleList[0]);
                  this.levelDetails.bottleList = this.bottleList;
                  this.levelDetails.crystalsToCollect = this.crystalsToCollect;
                    
                  //send to server if there is a P2
                  if(this.player2 != undefined){
                    this.SOCKET.emit('newLevel', this.levelDetails);
                  }
                } else {  //end p2 check
                  if(this.newLvlData != undefined){
                    console.log("Using new level data");
                    this.boxes = this.newLvlData.boxes;
                    this.enemies = this.newLvlData.enemies;
                    this.bgNum = this.newLvlData.bgNum;
                    this.musicNum = this.newLvlData.musicNum;
                    this.lvlExits = this.newLvlData.lvlExits;
                    this.bottleList = this.newLvlData.bottleList;
                    for(var i = 0; i < this.bottleList.length; i++){
                      this.bottleList[i].img = this.imageArray[28];
                    }
                    this.crystalsToCollect = this.newLvlData.crystalsToCollect;
                  } else {
                    console.log("New level data not found!!");
                  }
                }
                
                this.newLevel = false;
                this.bgPlaying = false;

                this.crystalsToCollect[0].img = this.imageArray[29];
                this.crystalsToCollect[1].img = this.imageArray[30];
                this.crystalsToCollect[2].img = this.imageArray[31];
                this.crystalsToCollect[3].img = this.imageArray[32];
                this.crystalsToCollect[4].img = this.imageArray[33];
                this.crystalsToCollect[5].img = this.imageArray[34];
                this.crystalsToCollect[6].img = this.imageArray[35];
                
                if(this.currentLevel == 9){
                  this.player.x = 586;
                  this.player.y = 752;
                } else {
                  if(this.player.x < 10){ this.player.x = 1158;}
                  else if(this.player.x > 1100){ this.player.x = 2;}
                  if(this.player.y < 10){ this.player.y = 759;}
                  else if(this.player.y > 750){ this.player.y = 6;}
                }
              }//end is new level

              //draw background
              if(this.currentLevel == 1){
                  if(this.crystals == 0){
                      this.bgNum = 2;
                  }
                  else if(this.crystals == 3){
                      this.bgNum = 3;
                  }
                  else if(this.crystals == 5){
                      this.bgNum = 4;
                  }
                  else if (this.crystals == 7){
                      this.bgNum = 5;
                  }
              }
              this.drawer.drawBackground(this.ctx, this.imageArray[this.bgNum], this.WIDTH, this.HEIGHT);

              //draw crystals
              this.drawer.drawCrystals(this.ctx, this.currentLevel, this.crystalsToCollect);

              //draw potion bottle if any are present
              if(this.bottleList.length > 0){
                  for(var i = 0; i < this.bottleList.length; i++){
                      this.drawer.drawBottle(this.ctx, this.bottleList[i]);
                  }
                  this.bottleCollision();
              }

              if(!this.bgPlaying){
                  this.sound.playBGAudio(this.musicNum);
                  this.bgPlaying = true;
              }

              //draw attacking
              if(this.attack){
                  if(this.aniFirstRun){
                      //play attack sound
                      this.aniFrameNum = 0;
                      this.sound.playEffect(0);
                      this.oneCombatCheck = true;
                      this.aniFirstRun = false;
                  }
                  this.drawer.drawCharAttack(this.ctx, this.aniFrameNum, this.imageArray, this.player);
                  if(this.oneCombatCheck){
                      this.checkCombatHit(this.enemies);
                      this.oneCombatCheck = false;
                  }
                  if(this.aniFrameNum > 16){
                      this.attack = false;
                      this.aniFirstRun = true;
                  }
              }

              //draw character
              this.drawer.drawChar(this.ctx, this.frameNum, this.moveRight, 
                  this.moveLeft, this.moveUp, this.moveDown, this.player, this.imageArray, 0);
            
            //draw second player's character (adj is used to shift the player image array
            //                                 to the right picture for player two)
            if(this.player2 != undefined && this.player2.levelIn == this.player.levelIn){
              this.drawer.drawChar(this.ctx, this.frameNumP2, this.moveRightP2, 
                  this.moveLeftP2, this.moveUpP2, this.moveDownP2, 
                  this.player2, this.imageArray, 30);
            }
            
              //check collisions with world boundaries and eneimes
              this.checkBoundingCollisions(this.boxes);
              this.checkCollisions(this.enemies);

              if(this.currentLevel > 1 && this.currentLevel < 9){
                  this.crystalCollision(this.currentLevel);
              }

              //move character
              if(this.moveRight){
                  this.moveCharRight();
              }
              if(this.moveLeft){
                  this.moveCharLeft();
              }
              if(this.moveUp){
                  this.moveCharUp();
              }
              if(this.moveDown){
                  this.moveCharDown();
              }

              //move enemies
              for(var en in this.enemies){
                  this.enemy.moveEnemy(this.enemies[en], this.dt);
              }

              //draw enemy
              this.drawer.drawEnemy(this.ctx, this.frameNum, this.enemies, this.imageArray);
              if(this.pulsarFrameNum > 0){
                  this.pulsar.updateAndDraw(this.ctx, this.dt);
                  if(this.pulsarFrameNum > 30){
                      this.pulsarFrameNum = -1;
                  }
              }
            
              //draw character screen
              this.crystalsToCollect[5].img = this.imageArray[42];
              this.crystalsToCollect[6].img = this.imageArray[43];
            
              if(this.showCharScreen){
                this.drawer.drawCharMenu(this.ctx, this.WIDTH, this.HEIGHT, 0, this.imageArray, this.crystalsToCollect);
              }
            
              this.crystalsToCollect[5].img = this.imageArray[34];
              this.crystalsToCollect[6].img = this.imageArray[35];

              //check to see if the character is changing levels
              this.checkNextLevel(this.lvlExits);

              //check to see if player beat the game
              if(this.currentLevel == 9){
                  if(this.enemies.length == 0){
                      this.bgPlaying = false;
                      this.gameState = this.GAME_STATE.WIN;
                  }
              }
              break;
          }
          ////////////////////////////////////////////////////////////////////////////////////////////
          case this.GAME_STATE.CREDITS:{
              //draw credits
              this.drawer.drawCredits(this.ctx, this.WIDTH, this.HEIGHT);
              if(!this.bgPlaying){
                  this.sound.playBGAudio(11);
                  this.bgPlaying = true;
              }
              break;
          }
          ////////////////////////////////////////////////////////////////////////////////////////////
          case this.GAME_STATE.WIN:{
              if(!this.bgPlaying){
                  this.sound.playBGAudio(12);
                  this.bgPlaying = true;
              }
              this.drawer.drawBackground(this.ctx, this.imageArray[this.bgNum], this.WIDTH, this.HEIGHT);
              //draw character
              this.drawer.drawChar(this.ctx, this.frameNum, this.moveRight, 
                  this.moveLeft, this.moveUp, this.moveDown, this.player, this.imageArray, 0);
              this.drawer.drawWin(this.ctx, this.WIDTH, this.HEIGHT, this.enemiesDefeated, this.totalLifeLost);
              this.winFrame++;
              if(this.winFrame > 900){
                  this.gameState = this.GAME_STATE.CREDITS;
              }
              break;
          }
          ////////////////////////////////////////////////////////////////////////////////////////////
          case this.GAME_STATE.END:{
              this.ctx.fillStyle = "black";
              this.ctx.fillRect(0,0,1200,800);
              this.drawer.drawBackground(this.ctx, this.imageArray[this.bgNum], this.WIDTH, this.HEIGHT);
              if(!this.bgPlaying){
                  this.sound.playBGAudio(10);
                  this.bgPlaying = true;
              }
              if(this.aniFrameNum % 20 == 0 && this.aniFrameNum < 200){
                  this.ctx.globalAlpha -= 0.1;
              }

              this.ctx.save();
              this.ctx.globalAlpha = 1;
              if(this.aniFrameNum > 200){
                  this.ctx.fillRect(0,0,1200,800);
              }
              this.drawer.drawGameOver(this.ctx, this.WIDTH, this.HEIGHT, this.enemiesDefeated, this.totalLifeLost);
              if(this.aniFrameNum > 990){
                  this.gameState = this.GAME_STATE.CREDITS;
                  this.bgPlaying = false;
                  this.sound.stopBGAudio();
              }
              if(this.currentLevel == 9){
                  document.querySelector("#TryBut").style.display = "inline";
              }
              document.querySelector("#TryBut").onclick = function(){
                  document.querySelector("#TryBut").style.display = "none";
                  app.main.player.health = 4;
                  app.main.gameState = app.main.GAME_STATE.DEFAULT;
                  app.main.enemies[0].health = 2;
                  app.main.player.x = 586;
                  app.main.player.y = 752;
                  app.main.bgPlaying = false;
                  if(!app.main.bgPlaying){
                      app.main.sound.playBGAudio(9);
                      app.main.bgPlaying = true;
                      app.main.ctx.globalAlpha = 1;
                  }
              }
              break;
          }
      }//end game state switch
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      //draw debug info
      if(this.debug){
          if(this.frameNum % 50 == 0){
              console.log("Debug is on");
          }
      }
  }, //end of update

  ////////////////////////////////////////////////////////////////////////////////////////////
  //-------------------------------------Player Methods---------------------------------------
  ////////////////////////////////////////////////////////////////////////////////////////////

  //setup the player character
  setupPlayer: function(){
    this.player = {};

    //add properties to player
    this.player.x = this.WIDTH/2 + 140;
    this.player.y = this.HEIGHT/2 + 40;
    this.player.speed = this.PLAYER.SPEED;
    this.player.facing = 0;
    this.player.health =  this.PLAYER.HEALTH;
    this.player.charNum = 14;
    this.player.levelIn = 1;

    Object.seal(this.player);
  },

  //have the player take damage
  playerDmg: function(){
      this.player.health--;
      if(this.player.health == 0){
          this.aniFrameNum = 0;
          this.bgPlaying = false;
          this.gameState = this.GAME_STATE.END;
      }
      this.totalLifeLost++;
  },

  //move the character
  moveCharRight: function(){
    this.player.x += (this.player.speed * this.dt);
  },

  moveCharLeft: function(){
    this.player.x -= (this.player.speed * this.dt);
  },

  moveCharUp: function(){
    this.player.y -= (this.player.speed * this.dt);
  },

  moveCharDown: function(){
    this.player.y += (this.player.speed * this.dt);
  },


  ////////////////////////////////////////////////////////////////////////////////////////////
  //----------------------------------Collisions----------------------------------------------
  ////////////////////////////////////////////////////////////////////////////////////////////

  //check for collisions between players and enemies
  checkCollisions: function(boxes){
      if(!this.playerHit){
          for(var box in boxes){
              if( this.player.x+5 < boxes[box].x + 30 && this.player.x + 30 > boxes[box].x &&
                  this.player.y+5 < boxes[box].y + 50 && 40 + this.player.y > boxes[box].y){
                      this.playerHit = true;
                      this.hitFrameNum = 0;
                      this.playerDmg();
              }
          }//end for loop
      }
  },

  //check for combat collisions of player attacking an enemy
  checkCombatHit: function(boxes){
      var index = -1;
      for(var box in boxes){
      if(this.player.facing == 0){
          if( this.player.x+35 < boxes[box].x + 30 && this.player.x+50 > boxes[box].x &&
              this.player.y+23 < boxes[box].y + 50 && this.player.y+33 > boxes[box].y){
                  index = box;
          }
      }
      else if(this.player.facing == 1){
          if( this.player.x-15 < boxes[box].x + 40 && this.player.x+5 > boxes[box].x &&
              this.player.y+23 < boxes[box].y + 50 && this.player.y+33 > boxes[box].y){
                  index = box;
          }
      }
      else if(this.player.facing == 2){
          if( this.player.x+25 < boxes[box].x + 30 && this.player.x+35 > boxes[box].x &&
              this.player.y+35 < boxes[box].y + 50 && this.player.y+52 > boxes[box].y){
                  index = box;
          }
      }
      else if(this.player.facing == 3){
          if( this.player.x+25 < boxes[box].x + 30 && this.player.x+35 > boxes[box].x &&
              this.player.y-10 < boxes[box].y + 50 && this.player.y+5 > boxes[box].y){
                  index = box;
          }
      }
      }//end for loop
      if(index != -1){
          if(this.currentLevel == 9){
              boxes[index].health--;
              console.log("Hit: " + boxes[index].health);
          }
          if(boxes[index].health > 0 && this.currentLevel == 9){return;}

          //enemy death sound
          this.sound.playEffect(2);
          //animation of enemy exploding
          this.pulsar = new this.Emitter();
          this.pulsar.red = 128;
          this.pulsar.blue = 128;
          this.pulsar.minXspeed = this.pulsar.minYspeed = -0.25;
          this.pulsar.maxXspeed = this.pulsar.maxYspeed = 0.25;
          this.pulsar.lifetime = 50;
          this.pulsar.expansionRate = 0.05;
          this.pulsar.numParticles = 100;
          this.pulsar.xRange = 20;
          this.pulsar.yRange = 40;
          this.pulsar.useSquares = true;
          this.pulsar.useCircles = false;
          this.pulsar.createParticles({x:boxes[index].x + 15, y:boxes[index].y});
          this.pulsarFrameNum = 1;

          //does the enemy drop a potion??
          if( Math.floor(getRandom(1, 10)) < 3){
            this.makeBottle(boxes[index].x, boxes[index].y);
            if(this.player2 != undefined && (this.player2.levelIn === this.currentLevel) ){
              this.SOCKET.emit('bottle', this.bottleList);
            }
          }//end random for bottle

        //remove enemy from list
        boxes.splice(index, 1);
        this.enemiesDefeated++;
        
        if(this.player2 != undefined && (this.player2.levelIn === this.currentLevel) ){
          this.SOCKET.emit('enemyDefeated', this.enemies);
        }
        else {
          if(this.enemies != undefined && this.levelDetails != undefined){
            this.levelDetails.enemies = this.enemies;

            //send to server if there is a P2
            if(this.player2 != undefined){
              this.SOCKET.emit('newLevel', this.levelDetails);
            }//end if p2
          }//end if enemy list are defined
        }//end else
      }
  },

  //check to see if the character is colliding with a boundary and should stop moving
  checkBoundingCollisions: function(boxes){
      for(var box in boxes){
          //console.log(boxes[box].posX + " " + boxes[box].posY + " " + boxes[box].width + " " + boxes[box].height);

          //left side collision
          if(this.player.x + 20  > boxes[box].posX && this.player.x + 20 < (boxes[box].posX + 10) ){
              if(this.player.y + 40 > boxes[box].posY && this.player.y + 40 < (boxes[box].posY + boxes[box].height)){
                  this.moveRight = false;
              }
          }
          //right side collision
          else if(this.player.x + 20  > (boxes[box].posX + (boxes[box].width/2)) && this.player.x + 20 < (boxes[box].posX + boxes[box].width) ){
              if(this.player.y + 40 > boxes[box].posY && this.player.y + 40 < boxes[box].posY + boxes[box].height){
                  this.moveLeft = false;
              }
          }
          //bottom collision
          if(this.player.y + 40 < (boxes[box].posY + boxes[box].height) && this.player.y + 40 > (boxes[box].posY + (boxes[box].height/2)) ){
              if(this.player.x + 20 > boxes[box].posX && this.player.x + 20 < (boxes[box].posX + boxes[box].width) ){
                  this.moveUp = false;
              }
          }
          //top collision
          else if(this.player.y + 40 > (boxes[box].posY) && this.player.y + 40 < (boxes[box].posY + 4) ){
              if(this.player.x + 20 > boxes[box].posX && this.player.x + 20 < (boxes[box].posX + boxes[box].width) ){
                  this.moveDown = false;
              }
          }
          //draw debug boxes around bounding boxes and a dot at the player's position
          if(this.debug){
              this.ctx.save();
              this.ctx.strokeStyle = "black";
              this.ctx.rect(boxes[box].posX, boxes[box].posY, boxes[box].width, boxes[box].height);
              this.ctx.stroke();
              this.ctx.restore();

              this.ctx.save();
              this.ctx.fillStyle = "black";
              this.ctx.beginPath();
              this.ctx.arc(this.player.x, this.player.y, 3, 0, Math.PI*2, false);
              this.ctx.closePath();
              this.ctx.fill();
              this.ctx.restore();
              if(this.frameNum %50 == 0){
                  console.log(this.player.x + " " + this.player.y);
              }
          }
      }//end for loop
  },

  //check for collision with a crystal
  crystalCollision: function(lvl){
    if(!this.crystalsToCollect[lvl-2].pickedUp){
      if( this.player.x < this.crystalsToCollect[lvl-2].posX + 40 
         && this.player.x + 40 > this.crystalsToCollect[lvl-2].posX 
         && this.player.y < this.crystalsToCollect[lvl-2].posY + 40 
         && 40 + this.player.y > this.crystalsToCollect[lvl-2].posY){
          this.crystalsToCollect[lvl-2].pickedUp = true;
          this.crystals++;
        
          //update other player
          if(this.player2 != undefined && (this.player2.levelIn === this.currentLevel) ){
            this.SOCKET.emit('crystal', this.crystalsToCollect);
          }
      }
    }
  },

  //check for bottle collisions
  bottleCollision: function(){
    var index = -1;
    for(var box in this.bottleList){
      if( this.player.x < this.bottleList[box].x + 40 
         && this.player.x + 40 > this.bottleList[box].x 
         && this.player.y < this.bottleList[box].y + 40 
         && 40 + this.player.y > this.bottleList[box].y){
            if(this.player.health < 4){
              this.player.health +=1;
              index = box;
             }
          }
    }//end for loop
    
    if(index > -1){
      this.bottleList.splice(index, 1);
      this.sound.playEffect(1);
      
      if(this.player2 != undefined && (this.player2.levelIn === this.currentLevel) ){
        this.SOCKET.emit('bottle', this.bottleList);
      }
    }//end if
  },

  ////////////////////////////////////////////////////////////////////////////////////////////
  //----------------------------------General Methods-----------------------------------------
  ////////////////////////////////////////////////////////////////////////////////////////////

  //check to see if the player hit a next lvl boundary
  checkNextLevel: function(myExits){
      for (var exit in myExits) {
          if(this.player.x +20 > myExits[exit].posX && this.player.x+20 < (myExits[exit].posX + myExits[exit].width) && 
              this.player.y + 40 > myExits[exit].posY && this.player.y+40 < (myExits[exit].posY + myExits[exit].height)){
              this.currentLevel = myExits[exit].exitNum;
              this.newLevel = true;
          }
      }
  },

  //create a health potion
  makeBottle: function(x, y){
      //make a new bottle and add to the bottle list
      this.bottle = {};

      //add properties
      this.bottle.x = x;
      this.bottle.y = y;
      this.bottle.width = 40;
      this.bottle.height = 40;
      this.bottle.img = this.imageArray[28];

      //add to the bottle list
      this.bottleList.push(this.bottle);    
  },

  ////////////////////////////////////////////////////////////////
  //this may cause issues and have to be removed
  //pause the game
  pauseGame: function(){
    /*
      this.paused = true;

      //stop animation
      cancelAnimationFrame(this.animationID);
      this.sound.stopBGAudio();

      //update once
      this.update();
      */
  },
  ////////////////////////////////////////////////////////////////
  
  
  //resume the game
  resumeGame: function(){
    /*
      //stop animation
      cancelAnimationFrame(this.animationID);

      this.paused = false;
      this.sound.restartBGAudio();
      if(this.gameState == this.GAME_STATE.MAIN_MENU){
          document.querySelector("#StartBut").style.display = "inline";
          document.querySelector("#InstructBut").style.display = "inline";
      }
      if(this.displayMenu){
          this.displayMenu = false;
      }
      //restart
      this.update();
      */
  },
  
  charScreen: function(){
    this.showCharScreen = !this.showCharScreen;
    
    
  },

  //do something if the mouse is pressed on the screen
  doMousedown: function(e){
      //var main = app.main;
      //insure not paused
      if(this.paused){
          this.paused = false;
          this.update();
          return;
      }
      else{
          this.attack = true;
      }
  },

  //calc Delta Time for smooth animations and motion
  calculateDeltaTime: function(){
      // what's with (+ new Date) below?
      // + calls Date.valueOf(), which converts it from an object to a 	
      // primitive (number of milliseconds since January 1, 1970 local time)
      var now,fps;
      now = (+new Date); 
      fps = 1000 / (now - this.lastTime);
      fps = clamp(fps, 12, 60);
      this.lastTime = now; 
      return 1/fps;
  }

}; // end app.main