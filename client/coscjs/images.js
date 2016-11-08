//images.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .images module and immediately invoke it in an IIFE
app.images = (function(){
	console.log("images.js module loaded");
	
	var imagePaths = [
		"coscpictures/TitleScreen.png",				//Title and insturction images starting at [0]
		"coscpictures/Instruction.png",
		"coscpictures/BackgroundArea1a.png",		//background images starting at [2]
		"coscpictures/BackgroundArea1b.png",		//3 crystals
		"coscpictures/BackgroundArea1c.png",		//5 crystals
		"coscpictures/BackgroundArea1d.png",		//7 crystals
		"coscpictures/BackgroundArea2.png",
		"coscpictures/BackgroundArea3.png",
		"coscpictures/BackgroundArea4.png",
		"coscpictures/BackgroundArea5.png",
		"coscpictures/BackgroundArea6.png",
		"coscpictures/BackgroundArea7.png",
		"coscpictures/BackgroundArea8.png",
		"coscpictures/BackgroundArea9.png",
		"coscpictures/Right1.png",					//character player images starting at [14]
		"coscpictures/Right2.png",
		"coscpictures/Right3.png",
		"coscpictures/Left1.png",
		"coscpictures/Left2.png",
		"coscpictures/Left3.png",
		"coscpictures/Up1.png",
		"coscpictures/Up2.png",
		"coscpictures/Up3.png",
		"coscpictures/Down1.png",
		"coscpictures/Down2.png",
		"coscpictures/Down3.png",
		"coscpictures/monstersSheet.png",			//26
		"coscpictures/swordsheet.png",				//27
		"coscpictures/hpbottle.png",
		"coscpictures/AquamarineGem.png",			//29 starts crystals
		"coscpictures/TopazGem.png",
		"coscpictures/SaphireGem.png",
		"coscpictures/RubyGem.png",
		"coscpictures/EmeraldGem.png",
		"coscpictures/JadeGem.png",
		"coscpictures/MorganiteGem.png",
        "coscpictures/armor.png",   //36 Armor
        "coscpictures/helmet.png",   //Helmet
        "coscpictures/shield.png",   //Shield
        "coscpictures/backpack.png",   //Backpack
        "coscpictures/InventorySm.png",   //40 Inventory 1
        "coscpictures/InventoryLrg.png",  //Inventory 2
        "coscpictures/TopazGem2.png",     //42 IvenCrystal
        "coscpictures/RubyGem2.png",
        "coscpictures/Right4.png",	      //character player 2 images starting at [44]
		"coscpictures/Right5.png",
		"coscpictures/Right6.png",
		"coscpictures/Left4.png",
		"coscpictures/Left5.png",
		"coscpictures/Left6.png",
		"coscpictures/Up4.png",
		"coscpictures/Up5.png",
		"coscpictures/Up6.png",
		"coscpictures/Down4.png",
		"coscpictures/Down5.png",
		"coscpictures/Down6.png"
		]; //end of the imagePaths array
		
	// export a public interface to this module
	return{
		images: imagePaths
	};
}());