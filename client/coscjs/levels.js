//levels.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.levels = (function(){
	console.log("levels.js module loaded");
	
	//background img, music, number of exits, exit rect properties, boxes for collisions to keep the from wandering off
	//exit rects, and collision rects have a starting position, width, height, area to load next, 
	//num of bounding boxes (last item on first row)
	
	//bgImg, music, num of exits, exit pos.x, exit pos.y, width, height, area num, num of bounding  boxes,
	//bounding box x, y, width, height, new row after last box: num of enemies, x, y of each, facinng up/down(0/1) or left/right(2/3) or
	//no movement(4)/cubic(5), enemy img numX(0/3/6/9), enemy img numY(0/4)
	//number of potions in a level out in the open, potion.x, potion.y
    //Extra items (36 armor, 37 helmet, 38 shield, 39 backpack) item number, .x, .y
	var level1 = [2, 1, 4, 1198, 415, 10, 73, 2, 567, 800, 80, 10, 5, -8, 346, 10, 50, 7, 585, 20, 40, 10, 9, 20,
					1117, 80, 83, 334, 1117, 493, 83, 240, 890, 726, 237, 74, 0, 0, 476, 104, 466, 0, 117, 70,
					625, 0, 125, 70, 740, 0, 460, 104, 545, 103, 123, 31, 0, 74, 18, 274, 0, 401, 18, 800, 
					10, 777, 555, 24, 650, 777, 223, 24, 529, 708, 20, 40, 598, 663, 20, 40, 664, 708, 20, 40,
					59, 270, 20, 40, 124, 302, 20, 40, 173, 353, 20, 40, 125, 407, 20, 40, 59, 429, 20, 40,
					4, 250, 615, 0, 0, 0, 760, 250, 2, 0, 0, 900, 600, 2, 0, 0, 250, 250, 1, 0, 0,
					2, 30, 120, 30, 720
	];
	
	var level2 = [6, 2, 3, -9, 414, 10, 70, 1, 772, -8, 90, 10, 3, 525, 800, 175, 10, 4 , 61,
					0, 0, 116, 417, 0, 488, 116, 312, 86, 0, 684, 32, 881,0,200,32,1071,0,50,800,96,698,436,105,
					696, 730, 400, 105, 278, 0, 30, 95, 288, 65, 114, 30,485,0,30,128, 678,0,30,128,785,77,124,30,
					878,0,30,108,579,105,30,522,93,278,117,30,187,105,30,130,204,141,188,30,204,204,112,30,
					189,348,127,30,189,348,30,97,285,285,127,30,285,285,30,100,381,150,30,163,397,204,116,30,
					485,206,30,160,387,346,126,30,500,272,95,30,90,485,210,30,290,422,30,224,193,554,30,110,
					207,616,113,30,290,420,127,30,384,420,30,96,300,552,114,30,393,636,30,100,484,435,30,300,
					508,433,80,30,597,270,100,30,673,204,30,110,673,204,120,30,685,338,87,30,772,148,30,165,
					772,148,210,30,968,82,30,160,873,213,110,30,594,414,112,30,767,640,30,100,878,285,30,96,
					878,285,220,30,894,351,111,30,977,351,30,96,688,490,30,160,688,490,127,30,785,425,30,90,
					785,425,126,30,881,427,30,223,785,561,110,30,884,617,124,30,977,556,30,94,896,490,200,30,
					721, 698, 400, 40,
					7, 135, 130, 0, 3, 4, 425, 470, 1, 3, 4, 250, 635, 2, 3, 4, 530, 110, 1, 3, 4, 800, 88, 3, 3, 4,
					818, 244, 0, 3, 4, 620, 632, 2, 3, 4, 0
	];
	
	var level3 = [7, 3, 1, 772, 799, 100, 10, 2, 10,
					878, 776, 322, 30, 1147, 0 , 50, 800, 747, 627, 215, 45, 0, 776, 772, 30, 0, 0, 58, 800,
					0, 297, 176, 163, 0, 0, 1200, 58, 141, 118, 71, 78, 293, 32, 326, 253, 632, 678, 120, 101,
					5, 596, 692, 4, 7, 1, 675, 635, 4, 7, 2, 860, 345, 1, 6, 0, 260, 350, 2, 6, 0, 280, 600, 1, 6, 0, 0,
                    0, 38, 610, 50
	];
	
	var level4 = [8, 4, 1, 526, -8, 160,10, 2, 12,
					0, 0, 531, 74, 683, 0, 520, 74, 0, 0, 70, 800, 1125, 0, 75, 800, 375, 147, 825, 130,
					359, 268, 841, 97, 359, 268, 97, 203, 359, 534, 97, 250, 0, 567, 455, 200,
					400, 679, 800, 100, 916, 425, 203, 145, 1063, 623, 26, 35,
					5, 265, 80, 2, 6, 4, 180, 335, 0, 6, 4, 385, 464, 3, 6, 4, 840, 550, 0, 6, 4, 590, 620, 3, 6, 4,
					1, 1074, 377,
                    1, 36, 1000, 650
	];
	
	var level5 = [9, 5, 2, 539, -8, 140, 10, 1, -9, 700, 10, 90, 6, 22,
					0, 0, 534, 34, 530, 0, 8, 64, 0, 0, 15, 697, 0, 158, 30, 68, 60, 158, 656, 68,
					709, 175, 58, 66, 764, 190, 330, 66, 1070, 190, 90, 31, 1193, 0, 10, 800,
					1155, 254, 45, 35, 1099, 282, 101, 7, 195, 322, 459, 76, 0, 505, 1003, 160,
					1000, 505, 23, 149, 1015, 505, 33, 149, 1079, 522, 20, 117, 1099, 505, 101, 160,
					0, 783, 1200, 20, 686, 0, 514, 34, 677, 0, 15, 64, 534, 66, 61, 60, 623, 66, 61, 60,
					7, 1160, 110, 0, 0, 4, 800, 110, 3, 0, 4, 960, 234, 2, 0, 4, 280, 65, 3, 0, 4, 155, 300, 0, 0, 4,
					670, 360, 1, 0, 4, 1040, 663, 2, 0, 4, 0,
                    1, 37, 6, 475
	];
	
	var level6 = [10, 6, 1, 1198, 700, 10, 80, 5, 22,
					1174, 788, 27, 13, 1190, 0, 10, 697, 974, 570, 226, 107, 974, 558, 134, 147,
					974, 570, 86, 135, 915, 753, 145, 47, 915, 130, 195, 382, 900, 500, 25, 300,
					635, 130, 473, 15, 635, 130, 15, 640, 90, 130, 497, 15, 573, 130, 15, 330,
					120, 445, 468, 15, 115, 435, 15, 215, 28, 635, 102, 15, 28, 750, 253, 15,
					271, 732, 400, 20, 0, 645, 38, 130, 178, 506, 409, 144, 275, 640, 310, 40,
					85, 0, 15, 145, 85, 0, 1115, 45,
					8, 1133, 420, 0, 3, 0, 590, 32, 3, 3, 0, 590, 60, 2, 3, 0, 200, 60, 2, 3, 0, 593, 500, 0, 3, 0,
					500, 682, 3, 3, 0, 434, 440, 2, 3, 0, 137, 535, 1, 3, 0,
					1, 110, 57
	];
	
	var level7 = [11, 7, 2, 1198, 350, 10, 50, 1, 69, -9, 40, 10, 8, 6,
					0, 0, 75, 26, 0, 0, 27, 800, 107, 0, 1100, 26, 0, 778, 1200, 22, 1178, 0, 22, 351, 1178, 400, 22, 400,
					13, 138, 36, 2, 0, 4, 70, 150, 1, 0, 4, 300, 200, 1, 0, 4, 234, 438, 3, 0, 4, 444, 637, 1, 0, 4,
					1033, 606, 2, 0, 4, 1075, 250, 0, 0, 4, 736, 320, 1, 0, 4, 540, 150, 0, 0, 4, 956, 50, 3, 0, 4,
					670, 595, 0, 0, 4, 420, 300, 3, 0, 4, 83, 630, 0, 0, 4, 0
	];
	
	var level8 = [12, 8, 1, 66, 800, 40,10, 7, 17,
					0, 77, 450, 503, -5, -5, 1205, 10, 0, 580, 334, 20, 0, 595, 310, 33, 0, 620, 212, 30,
					472, 80, 586, 500, 1081, 80, 120, 475, 1198, 0, 5, 800, 98, 772, 1105, 30,
					0, 772, 70, 30, -5, -5, 15, 810, 1081, 540, 41, 115, 613, 560, 443, 97,
					539, 570, 90, 30, 557, 590, 70, 24, 575, 612, 55, 25, 600, 630, 30, 28,
					7, 440, 625, 1, 9, 0, 440, 380, 0, 9, 0, 440, 144, 0, 9, 0, 440, 680, 2, 9, 0, 1048, 657, 2, 9, 0,
					1048, 557, 0, 9, 0, 1048, 100, 1, 9, 0,
					1, 1155, 20
	];
	
	var level9 = [13, 9, 1, 585, 800, 40, 10, 1, 12,
					0, 0, 1200, 105, 0, 0, 13, 800, 0, 788, 583, 15, 624, 788, 576, 15,	 1189, 0, 20, 800,
					357, 95, 63, 53, 465, 95, 63, 53, 573, 95, 63, 53, 680, 95, 63, 53, 790, 95, 63, 53,
					511, 190, 63, 103, 637, 190, 63, 103, 1, 600, 400, 5, 9, 4, 2, 20, 745, 1140, 745
	];
	
	//x, y positions of each crystal 
	//            lvl 2,        3,      4,         5,         6,       7,       8
	var crystalPos = [930, 573, 88, 89, 1074, 578, 1150, 736, 44, 685, 40, 727, 20, 22];
	
	var levelsArray = [level1, level2, level3, level4, level5, level6, level7, level8, level9];
	var bound = [0];
	
	//extra level 1 stuff for removable boundaries
	function extraBounding(numOfCrystals){
		
		if(numOfCrystals == 0){
			this.bound = [3, 560, 779, 100, 20,
						0, 345, 28, 60,
						584, 28, 42, 43];
		}
		else if(numOfCrystals == 3){
			this.bound = [2, 0, 345, 28, 60,
						584, 28, 42, 43];
		}
		else if(numOfCrystals == 5){
			this.bound = [1, 584, 28, 42, 43];
		}
		else if (numOfCrystals == 7){
			this.bound = [0];
		}
	};
	
	
	//export levels array
	return{
		levelsArray: levelsArray,
		bound: bound,
		extraBounding: extraBounding,
		crystalPos: crystalPos
	};
	
}());