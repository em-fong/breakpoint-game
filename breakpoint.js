//sets aside variable for player direction, the player object, and the player image file
var playerX
var playerY;
var playerObj;
var playerImg;

//opening squence
var openingNum = 0;
var opening = [];
var sceneSounds = [];

//store footprints
var footprints = [];
var footstep;
var footImg;

//store memory objects
var memoryObj;
var mems = [];
var memoryImages = [];

//store obstacles
var obs = [];
var obstacleImages = [];
var obstacleSwap = [];
var memoryImages50 = [];
var memoryImages10 = [];

var cloudImg = [];
var grassImg = [];
var flowImg = [];
var waterImg = [];

//store sounds
var bgsong;
var itemSound = [];

var memCounter;
var started = false;

var endTimer;

function preload(){

	//load images before running game
	playerImg = loadImage("assets/player.png");
	bgsong = createAudio("assets/soundtrack.mp3");
	footstep = loadSound("assets/footstep.wav");
	footImg = loadImage("assets/footprint.png");

	opening[0] = loadImage("assets/opening0.png");
	opening[1] = loadImage("assets/opening1.png");
	opening[2] = loadImage("assets/opening2.png");
	opening[3] = loadImage("assets/opening3.png");
	opening[4] = loadImage("assets/opening4.png");

	sceneSounds[0] = loadSound("assets/cafe.wav");
	sceneSounds[1] = loadSound("assets/beach.wav");
	sceneSounds[3] = loadSound("assets/fight.mp3");
	sceneSounds[4] = loadSound("assets/rain.mp3");

	grassImg[0] = loadImage("assets/grass1.png");
	grassImg[1] = loadImage("assets/grass2.png");
	grassImg[2] = loadImage("assets/grass3.png");

	flowImg[0] = loadImage("assets/flow1.png");
	flowImg[1] = loadImage("assets/flow2.png");
	flowImg[2] = loadImage("assets/flow3.png");

	//store obstacles
	obstacleImages[0] = loadImage("assets/trees.png");
	obstacleImages[1] = loadImage("assets/rocks_new.png");
	obstacleImages[2] = loadImage("assets/tree2.png");
	obstacleImages[3] = grassImg[0];
	obstacleImages[4] = flowImg[0];
	obstacleImages[5] = loadImage("assets/cloudPuff.png");

	//store memory images to swap with obstacles
	obstacleSwap[0] = loadImage("assets/mugtree.png");
  	obstacleSwap[1] = loadImage("assets/heartRock.png");
  	obstacleSwap[2] = loadImage("assets/treePic.png");
  	obstacleSwap[3] = loadImage("assets/grassKey.png");
  	obstacleSwap[4] = loadImage("assets/shirtGrass.png");
  	obstacleSwap[5] = loadImage("assets/cloudText.png");

	//store memories
 	memoryImages[0] = loadImage("assets/mug.png");
 	memoryImages[1] = loadImage("assets/candy.png");
 	memoryImages[2] = loadImage("assets/polaroid.png");
 	memoryImages[3] = loadImage("assets/keys.png");
 	memoryImages[4] = loadImage("assets/shirt.png");
 	memoryImages[5] = loadImage("assets/texts.png");

 	//
 	memoryImages50[0] = loadImage("assets/mug5.png");
 	memoryImages50[1] = loadImage("assets/candy5.png");
 	memoryImages50[2] = loadImage("assets/polaroid5.png");
 	memoryImages50[3] = loadImage("assets/keys5.png");
 	memoryImages50[4] = loadImage("assets/shirt5.png");
 	memoryImages50[5] = loadImage("assets/texts5.png");

 	//
 	memoryImages10[0] = loadImage("assets/mug1.png");
 	memoryImages10[1] = loadImage("assets/candy1.png");
 	memoryImages10[2] = loadImage("assets/polaroid1.png");
 	memoryImages10[3] = loadImage("assets/keys1.png");
 	memoryImages10[4] = loadImage("assets/shirt1.png");
 	memoryImages10[5] = loadImage("assets/texts1.png");

	//store sounds
 	itemSound[0] = loadSound("assets/coffee.mp3");
 	itemSound[1] = loadSound("assets/candy.wav");
 	itemSound[2] = loadSound("assets/camera.mp3");
 	itemSound[3] = loadSound("assets/keys.mp3");
 	itemSound[4] = loadSound("assets/shirt.mp3");
 	itemSound[5] = loadSound("assets/imessage_send.mp3");

	karma = loadFont("assets/karma.ttf");

 	textCounter = 6;
 	memCounter = 0;
}

//helper function to move environment around the x axis
function movement(axis, num, str) {
	if (axis === "X") {
		playerX = num;
	} else {
		playerY = num;
	}

	//move obstacles
	for (var w = 0; w < obs.length; w++) {
			obs[w].move(str);
		}

	//create and move footprints
	footprints.push(new Footprint(250, 265));

	for(var j = 0; j < footprints.length; j++){
		footprints[j].move(str);
	}

	//play footstep sound
	if(!footstep.isPlaying()){
		footstep.play();
	}
}

function setup(){

	//create basic canvas and position it
	var canv = createCanvas(500, 500);
	canv.parent("#game");
	imageMode(CENTER);

	//load the font
	textFont(karma);

	//instantiate player, memories, and obstacles
	playerObj = new Player();

	for(var i = 0; i < 6; i++){
		mems[i] = new Memory(random(-500, 1000), random(-500, 1000), i);
	}
	for(var i = 0; i < 40; i++){
		obs.push(new Obstacle(3));
		obs.push(new Obstacle(4));
	}
	for(var i = 0; i < 20; i++){
		obs.push(new Obstacle(int(random(3))));
	}
	
	for(var i = 0; i < 10; i++){
		obs.push(new Obstacle(5));
	}
	endTimer = 0;
}

function mousePressed() {

	//cycle through opening sequence 
	if(openingNum <= 3){
		if(openingNum != 2){
			sceneSounds[openingNum].stop();
		}
		openingNum++;
	}
	
}

function keyPressed(){
	started = true;
}

function draw(){

	//start up opening sequence
	background(0);
	image(opening[openingNum], 250, 250);
	fill(255);
	textSize(20);
	text("Click >", 220, 420);

	if (openingNum > 3) {
		background(29, 80, 163);
		textSize(50);
		textAlign(CENTER);
		text("Breakpoint;", 250, 200);
		textSize(20);
		text("WASD to move", 250, 375);
		text("Press any key to Start", 250, 400);
	} else {
		if(openingNum != 2){
			if(!sceneSounds[openingNum].isPlaying()){
				sceneSounds[openingNum].play();
			}
		}
	}

	if (started === true) {
		//load in background assets, adjust sound of background song
		if (endTimer <= 600){
			background(130 + (21 * memCounter), 100 + (26 * memCounter), 130 + (21 * memCounter));
			bgsong.volume(0.0025 * (memCounter));
		
			//move everything horizontally
			if(keyIsDown(65)){
				movement("X", 1, "L");

			} else if(keyIsDown(68)){
				movement("X", -1, "R");

			} else {
				playerX = 0;
			}

			//move everything vertically
			if(keyIsDown(87)){
				movement("Y", 1, "U");

			} else if(keyIsDown(83)){
				movement("Y", -1, "D");

			} else {
				playerY = 0;
			}
		}
		//display footprints, player, and objects
		for(var j = 0; j < footprints.length; j++){
			if(random(1) < .05)
				footprints[j].display();
		}

		playerObj.display();

		for (var w = 0; w < obs.length; w++) {
	    	obs[w].display();
	    	if(obs[w].num == 5){
	    		obs[w].x += noise(millis()/1000)/10;
	    		obs[w].y += noise(millis()/1000)/10;
    		}
   	 	}


		//move memories
		for(var i = 0; i < 6; i++){
	  		mems[i].move(playerX, playerY);

			//if memories are found...
			if(mems[i].found){

				//create glitching effect

					mems[i].glitchDisplay();

				//play sounds
				if(!mems[i].oneShot){
					mems[i].specificOneShot();

					//swap images
					for (var w = 0; w < obs.length; w++) {
	    			if(obs[w].num == i){
	    				obs[w].swap();
	    			}
	  			}
				}
			} else {
				mems[i].display();
			}
		}

		//end game scenario
		text(textCounter, 250, 20);
		if(textCounter == 0){
			endTimer += 1;
			
		}

		if(endTimer >= 2000){
			background(0);
			sceneSounds[4].stop()
		}else if(endTimer >= 840){
			background(255);
			image(opening[4], 250, 250);
			bgsong.volume(0);
			if(!sceneSounds[4].isPlaying()){
				sceneSounds[4].play()
			}
		} else if (endTimer >= 600){
			background(255);
			bgsong.volume(0);
		} else if (endTimer >= 60){
			bgsong.volume(0);
		}
	}
	
}

class Player{
	//setup & display
	constructor(){
		this.x = width/2;
		this.y = height/2;
	}

	display(){
		//tint(255, 255);
		image(playerImg, this.x, this.y, 10, 40);
	}
}

class Footprint{

	//setup & display
	constructor(xPos, yPos){
		this.x = xPos;
		this.y = yPos;
	}

	display(){
		noStroke();
		rect(this.x, this.y, 1, 1);
	}

	//move corresponding to keyboard direction
	move(dir){
		if(dir == "L") {
      this.x += 1;
    } else if (dir == "R") {
      this.x -= 1;
    }

    if (dir == "U") {
      this.y += 1;
    } else if (dir == "D") {
      this.y -= 1;
    }

		//wraparound logic
    if(this.x > 1000){
			this.x = -500;
		}
		if(this.x < -500){
			this.x = 1000;
		}
		if(this.y > 1000){
			this.y = -500;
		}
		if(this.y < -500){
			this.y = 1000;
		}
	}
}

class Memory{

	//setup & display
	constructor(xPos, yPos, num){
		this.x = xPos;
		this.y = yPos;
		this.num = num;
		this.alpha = 0;
		this.found = false;
		this.oneShot = false;
		this.timer = 0;
	}

	display(){
		//tint(255, 255);
		image(memoryImages[this.num], this.x, this.y, 30, 30);
	}

	//glitch effect
	glitchDisplay(){
		image(memoryImages[this.num], this.x, this.y, random(-100, 100), random(-100, 100));
		this.timer += 1;
		if(this.timer <= 120){
			image(memoryImages[this.num], width/2, height/2, width, height);
		} else if (this.timer <= 600){
			image(memoryImages50[this.num], width/2, height/2, width, height);
		} else if (this.timer <= 3600){
			image(memoryImages10[this.num], width/2, height/2, width, height);
		}
	}

	//move corresponding to keyboard input
	move(xMove, yMove){
		this.x += xMove;
		this.y += yMove;
		if(this.x > 1000){
			this.x = -500;
		}
		if(this.x < -500){
			this.x = 1000;
		}
		if(this.y > 1000){
			this.y = -500;
		}
		if(this.y < -500){
			this.y = 1000;
		}


		if(this.x > 240 && this.x < 260 && this.y > 230 && this.y < 270){
			this.alpha = 255;
			this.found = true;
		}
	}

	//checking sound effects
	specificOneShot(){
		if(!itemSound[this.num].isPlaying()){
			itemSound[this.num].play();
			bgsong.play();
		}
		textCounter -= 1;
		memCounter += 1;
		this.oneShot = true;
	}

}

class Obstacle {

	//setup & display
  constructor(num) {
  	this.num = num;
    this.x = random(-500, 1000);
    this.y = random(-500, 1000);
    this.img = obstacleImages[this.num];
    this.found = false;
  }

  display() {
  	//tint(255, 255);


    if(this.num == 3){
    	image(this.img, this.x, this.y, 40, 40);
    	if(random(10) < .5){

    		if(!this.found){
    			this.img = grassImg[int(random(3))];
    		}

    	}
    } else if(this.num == 5) {
    	image(this.img, this.x, this.y, 200, 200);
    } else if(this.num == 4){
    	image(this.img, this.x, this.y, 30, 30);
    	if(random(10) < 1){

    		if(!this.found){
    			this.img = flowImg[int(random(3))];
    			this.x += random(-.5, .5);
    			this.y += random(-.5, .5);
    		}

    	}
    } else {
    	image(this.img, this.x, this.y, 80, 80);
    }
  }

	//image swapping
  swap(){
  	this.img = obstacleSwap[this.num];
  	if(this.num == 3){
  		footstep = itemSound[3];
  	}
  	this.found = true;
  }

	//move corresponding to keyboard input
  move(dir) {

	if(dir == "L") {
      this.x += 1;
    } else if (dir == "R") {
      this.x -= 1;
    }

    if (dir == "U") {
      this.y += 1;
    } else if (dir == "D") {
      this.y -= 1;
    }

		//wraparound logic
    if(this.x > 1000){
			this.x = -500;
		}
		if(this.x < -500){
			this.x = 1000;
		}
		if(this.y > 1000){
			this.y = -500;
		}
		if(this.y < -500){
			this.y = 1000;
		}
  }
}
