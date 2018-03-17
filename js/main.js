canvas = document.getElementById("Talchul");
context = canvas.getContext('2d');

var UP_KEY_CODE = 38; //KeyCode for 'Up arrow'
var DOWN_KEY_CODE = 40; //KeyCode for 'down arrow'
var RIGHT_KEY_CODE = 39; //KeyCode for 'right arrow'
var LEFT_KEY_CODE = 37; //KeyCode for 'left arrow'
var ENTER_KEY_CODE = 13;
var SPACEBAR_KEY_CODE = 32;
var ESC_KEY_CODE = 27;
var E_KEY_CODE= 69;

var move = false;
var forceX = 0;
var forceY = 0;
var slowdownFraction=0; 

var score = 0;
var highScore = 0;
var numPrisoners = 30;
var numEnemies = 8;
var prisonerDisplay = 0;
var defaultVision = 100;
var gameOver = false;
var prisonerTaken = false;
var gamePaused = true;

var Exile = -9999;

var menupos = 0;
var pausepos = 0;
var gamestate = 0;
var menumode = 0;

var Mainmenu_xposition = 0;
var Mainmenu_yposition = 0;

var Mainmenubutton_xposition = canvas.width / 2 - 100;
var Mainmenubutton_yposition = canvas.height / 2;
var Mainmenubutton2_xposition = canvas.width / 2 - 110;
var Mainmenubutton2_yposition = canvas.height / 2 + 100;
var Mainmenucursor_xposition = canvas.width/2 - 240;
var Mainmenucursor_yposition = Mainmenubutton_yposition - 65;
var Mainmenucursor2_xposition = Exile;
var Mainmenucursor2_yposition = Exile;
var Pausebutton_xpos = Exile;
var Pausebutton_ypos = Exile;
var Pausebutton2_xpos = Exile;
var Pausebutton2_ypos = Exile;

var og = 0;
var ogstate = -1;
var Mainmenu_og_xpos = 1;
var Mainmenubutton_og_xpos = canvas.width / 2 - 100;
var Mainmenubutton_og_ypos = canvas.height / 2;
var Mainmenubutton2_og_xpos = canvas.width / 2 - 110;
var Mainmenubutton2_og_ypos = canvas.height / 2 + 100;
var Mainmenucursor_og_xpos = Mainmenubutton_og_xpos - 140;
var Mainmenucursor_og_ypos = Mainmenubutton_og_ypos - 65;

var Mainmenuscreen = new Image();
Mainmenuscreen.width = canvas.width;
Mainmenuscreen.height = canvas.height;
Mainmenuscreen.src = 'http://i.imgur.com/8JRlCqn.jpg';

var Mainmenucursor = new Image();
Mainmenucursor.width = 175;
Mainmenucursor.height = 75;
Mainmenucursor.src = 'http://i.imgur.com/rIFNWEb.png';

var Mainmenucursor2 = new Image();
Mainmenucursor2.width = 175;
Mainmenucursor2.height = 75;
Mainmenucursor2.src = 'http://i.imgur.com/rIFNWEb.png';

var Mainmenubutton = new Image();
Mainmenubutton.width = 175;
Mainmenubutton.height = 75;
Mainmenubutton.src = 'http://i.imgur.com/Cf5HA3O.png';

var Mainmenubutton2 = new Image();
Mainmenubutton2.width = 175;
Mainmenubutton2.height = 75;
Mainmenubutton2.src = 'http://i.imgur.com/NzQ51r5.png';

var Pausebutton = new Image();
Pausebutton.width = 175;
Pausebutton.height = 75;
Pausebutton.src = 'http://i.imgur.com/qcfGWzX.png';

var Pausebutton2 = new Image();
Pausebutton2.width = 175;
Pausebutton2.height = 75;
Pausebutton2.src = 'http://i.imgur.com/3gw2VUR.png';

var SampleGame = new Image();
SampleGame.width = canvas.width;
SampleGame.height = canvas.height;
SampleGame.src = 'http://i.imgur.com/9XIRPaL.png';

if (localStorage.getItem("highScore") === null) {
  localStorage.setItem("highScore", "0");
  highScore = 0;
} else {
  highScore = parseInt(localStorage.getItem("highScore"));
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(evt) {
	if (evt.keyCode === E_KEY_CODE) {
		dropPrisoner();
	}

  if (gamestate < 0) {
    if (evt.keyCode === ESC_KEY_CODE) {
      Pausebutton_xpos = Mainmenubutton_og_xpos - 1;
      Pausebutton_ypos = Mainmenubutton_og_ypos - 1;
      Pausebutton2_xpos = Mainmenubutton2_og_xpos - 1;
      Pausebutton2_ypos = Mainmenubutton2_og_ypos - 1;
      Mainmenucursor2_xposition = Mainmenucursor_og_xpos - 1;
      Mainmenucursor2_yposition = Mainmenucursor_og_ypos - 1;
      menumode = menumode - 1;
      gamePaused = true;
    }
  }
  if (evt.keyCode === UP_KEY_CODE) {
    if(gamestate >= 0){
    Mainmenucursor_yposition = Mainmenubutton_yposition - 65;
    menupos = og - 1;
    }
    forceY = 4.5-slowdownFraction;
    move = true;

    if (gamestate < 0 && menumode < 0) {
      Mainmenucursor2_yposition = Mainmenubutton_og_ypos - 65;
      pausepos = og - 1;
    }
  }
  if (evt.keyCode === DOWN_KEY_CODE) {
    if(gamestate >= 0){
    Mainmenucursor_yposition = Mainmenubutton2_yposition - 65;
    menupos = og + 1;
    }
    forceY = -4.5+slowdownFraction;
    move = true;

    if (gamestate < 0 && menumode < 0) {
      Mainmenucursor2_yposition = Mainmenubutton2_og_ypos - 65;
      pausepos = og + 1;
    }
  }
  if (evt.keyCode === LEFT_KEY_CODE) {
  console.log(pausepos);
    forceX = 4.5-slowdownFraction;
    move = true;
  }
  if (evt.keyCode === RIGHT_KEY_CODE) {
    forceX = -4.5+slowdownFraction;
    move = true;
  }
  if (menupos <= 0 && gamestate >= 0) {

    if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
      Mainmenu_xposition = Exile - 1;
      Mainmenucursor_xposition = Exile - 1;
      Mainmenubutton_xposition = Exile - 1;
      Mainmenubutton2_xposition = Exile - 1;
      gamestate = gamestate - 1;
      gamePaused = false;
    }
  }
  if(gamestate < 0){
  if (pausepos <= 0) {
    if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
      Pausebutton_xpos = Exile - 1;
      Pausebutton_ypos = Exile - 1;
      Pausebutton2_xpos = Exile - 1;
      Pausebutton2_ypos = Exile - 1;
      Mainmenucursor2_xposition = Exile - 1;
      Mainmenucursor2_yposition = Exile - 1;
      gamePaused = false;
    }
  }
  if (pausepos > 0) {
    if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
      Pausebutton_xpos = Exile - 1;
      Pausebutton_ypos = Exile - 1;
      Pausebutton2_xpos = Exile - 1;
      Pausebutton2_ypos = Exile - 1;
      Mainmenucursor2_xposition = Exile - 1;
      Mainmenucursor2_yposition = Exile - 1;

      Mainmenu_xposition = Mainmenu_og_xpos -1;
      Mainmenucursor_xposition = Mainmenucursor_og_xpos - 1;
      Mainmenucursor_yposition = Mainmenucursor_og_ypos - 1;
      Mainmenubutton_xposition = Mainmenubutton_og_xpos - 1;
      Mainmenubutton2_xposition = Mainmenubutton2_og_xpos - 1;
      gamestate = ogstate + 1;
      menupos = Mainmenu_og_xpos -1;
      menumode = ogstate + 1;
      pausepos = ogstate + 1;

      location.reload();
    }
  }
  }
}

function keyUp(evt) {
  if (evt.keyCode === UP_KEY_CODE) {
    forceY = 0;
    move = false;
  }

  if (evt.keyCode === DOWN_KEY_CODE) {
    forceY = 0;
    move = false;
  }

  if (evt.keyCode === LEFT_KEY_CODE) {
    forceX = 0;
    move = false;
  }

  if (evt.keyCode === RIGHT_KEY_CODE) {
    forceX = 0;
    move = false;
  }
}

function circle(x, y, radius, sAngle, eAngle, taken, enemy, enemySpeed) {
  //"taken" means if a prisoner is taken or not. Decided through collision
  //"enemy" is a boolean, which determines if the object being made is an enemy or not
  //"enemySpeed" is the general direction the enemy is patrolling horizontally. Some start going left first, some start going right first.

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.sAngle = sAngle;
  this.eAngle = eAngle;
  this.taken = taken; //has the player already collided with this?
  this.enemySpeed = enemySpeed;

  this.draw = function() {
    if (!this.taken) {
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = "#000000";
      context.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
      context.stroke();
      if (!enemy) {
        context.fillStyle = "#FF0000";
      } else {
        //give enemies different color
        context.fillStyle = "#3366ff";
      }

      context.fill();
    } else {
      //don't draw if collision.
    }

  };

  this.update = function() {
    //make everything move closer or further from the player instead of moving the player.
    this.x += forceX;
    this.y += forceY;
    if (enemy) {
      //Make enemies patrol a certain area horizontally.
      if ((this.x + this.radius) >= canvas.width) {
        //hitting the right edge
        this.enemySpeed = -2;
      } else if (this.x <= 0) {
        this.enemySpeed = 2;
      }
      this.x += this.enemySpeed;
    }
  };
}

var prisoners = []//new Array(numPrisoners);
var enemies = [];//new Array(numEnemies);
var mainPlayer = new playerCircle(canvas.width/2, canvas.height/2, 15, 0, 2 * Math.PI);

function initializeObjects(){
	for (var i = 0; i < numEnemies; i++) {
 		var enemySpeed = Math.random() < 0.5 ? -2 : 2; // is the random less than 0.5? Then the speed is -2. Else, it is 2.
 		var xPos = Math.random() * canvas.width;
		var yPos = Math.random() * canvas.height;
 		while((xPos > (mainPlayer.x - mainPlayer.vision)) && (xPos < (mainPlayer.x + mainPlayer.vision))
 		&& (yPos > (mainPlayer.y - mainPlayer.vision)) && (yPos < (mainPlayer.y + mainPlayer.vision))){
 			xPos = Math.random() * canvas.width;
 			yPos = Math.random() * canvas.width;
 		}
  		enemies[i] = new circle(xPos, yPos, 10, 0, 2 * Math.PI, false, true, enemySpeed);
	}

	for (var i = 0; i < numPrisoners; i++) {
		var xPos = Math.random() * canvas.width;
		var yPos = Math.random() * canvas.height;
 		while((xPos > (mainPlayer.x - mainPlayer.vision)) && (xPos < (mainPlayer.x + mainPlayer.vision))
 		&& (yPos > (mainPlayer.y - mainPlayer.vision)) && (yPos < (mainPlayer.y + mainPlayer.vision))){
 			xPos = Math.random() * canvas.width;
 			yPos = Math.random() * canvas.width;
 		}
  		prisoners[i] = new circle(xPos, yPos, 10, 0, 2 * Math.PI, false, false, 0);
	}
}

initializeObjects();

function addEnemies(){

	numEnemies+=1;
	var enemySpeed = Math.random() < 0.5 ? -2 : 2; // is the random less than 0.5? Then the speed is -2. Else, it is 2.
	var xPos = Math.random() * canvas.width;
	var yPos = Math.random() * canvas.height;
 	while((xPos > (mainPlayer.x - mainPlayer.vision)) && (xPos < (mainPlayer.x + mainPlayer.vision))
 		&& (yPos > (mainPlayer.y - mainPlayer.vision)) && (yPos < (mainPlayer.y + mainPlayer.vision))){
 		xPos = Math.random() * canvas.width;
 		yPos = Math.random() * canvas.width;
 	}
  	enemies[numEnemies-1] = new circle(xPos, yPos, 10, 0, 2 * Math.PI, false, true, enemySpeed);

}




function randomizePrisoner(prisoner){
	prisonerDisplay +=1;
	var xPos = Math.random() * canvas.width;
	var yPos = Math.random() * canvas.height;
 	while((xPos > (mainPlayer.x - mainPlayer.vision)) && (xPos < (mainPlayer.x + mainPlayer.vision))
 		&& (yPos > (mainPlayer.y - mainPlayer.vision)) && (yPos < (mainPlayer.y + mainPlayer.vision))){
 			xPos = Math.random() * canvas.width;
 			yPos = Math.random() * canvas.width;
 	}
 	prisoner.x = xPos;
 	prisoner.y = yPos;

	prisoner.taken = false;
}

function displayScore() {
  //score display
  localStorage.setItem("highScore", highScore);
  document.getElementById("scoreDisplay").innerHTML = "Score: " + score;
  document.getElementById("highScoreDisplay").innerHTML = "HighScore:  " + localStorage.getItem("highScore");
  document.getElementById("prisonerDisplay").innerHTML = "Red Dots Collected: "+prisonerDisplay;
}

function extendVision(player){
	if(player.vision > player.radius + 150){
		player.vision+= 0;
	}else{
		player.vision += 20;
	}
	//increase detection radius

	if(player.detection >= player.radius + 40 ){
	}else{
		var percentage = 1/5;
		var final = player.detection * percentage; //7 is the original detection radius
		player.detection += final;
		player.detectionOriginal = player.detection;
	}

}


function playerCircle(x, y, radius, sAngle, eAngle) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.sAngle = sAngle;
  this.eAngle = eAngle;
  this.vision = radius + defaultVision; //should be +100
  this.detection = radius + 7;
  this.detectionOriginal = this.detection;
  this.detectable = true;

  this.draw = function() {
    context.beginPath();
    context.strokeStyle = "#FF0000";
    context.lineWidth = 3;
    context.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
    context.stroke();
    context.fillStyle = "#000000";
    context.fill();

    context.beginPath();
    context.arc(this.x, this.y, this.vision, this.sAngle, this.eAngle); //vision circle of the player
    context.stroke();
  };

  this.update = function() {
	  
    //check for collision with other prisoners.
    for (var x = 0; x < numPrisoners; x++) {
      var dx = (this.x + this.radius) - (prisoners[x].x + prisoners[x].radius);
      var dy = (this.y + this.radius) - (prisoners[x].y + prisoners[x].radius);
      var distance = Math.sqrt(dx * dx + dy * dy);
	  
	  shrinkDetection(this);
	  checkDetectable(this);

      if ((distance < this.radius + prisoners[x].radius) && prisoners[x].taken === false) { //don't check for collision if it is already taken
        prisoners[x].taken = true;
        prisonerTaken = true;
        extendVision(this);
        slowdownPlayer();
        score+=100;
        addEnemies();
        randomizePrisoner(prisoners[x]);
      }
    }

	if(this.detectable){
		for (var x = 0; x < enemies.length; x++) {
			var dx = (this.x) - (enemies[x].x);
			var dy = (this.y) - (enemies[x].y);
			var distance = Math.sqrt(dx * dx + dy * dy);
			var check = parseInt(this.detection + enemies[x].radius);
			if ((distance < check)) {
				gameOver = true;
			}
		}
	}


  };
}
var shrinkDate = new Date();
var shrinkTimeSeconds = shrinkDate.getTime();

function shrinkDetection(player){
	var shrinkNewDate = new Date();
	var shrinkNewTimeSeconds = shrinkNewDate.getTime();
	console
	
	if(forceX === 0 & forceY === 0){
		//the player is not moving
		if((shrinkNewTimeSeconds - shrinkTimeSeconds) >= 400){// half a second
			if(player.detection > player.radius){
				player.detection -= 5;
			}else if(player.detection <= player.radius){
				player.detection -= 0;
			}
			
			shrinkTimeSeconds = shrinkNewTimeSeconds;
		} 
		
		
	}else{
		player.detection = player.detectionOriginal; //go back to the original size the moment you start moving again.
	}
}

function checkDetectable(player){
	if(player.detection <= player.radius){
		player.detectable = false;
	}else{
		player.detectable = true;
	}
}

function slowdownPlayer(){
  if (slowdownFraction<3.4)
    slowdownFraction+=0.4;
}


var gridlinesX=[];
var gridlinesY=[];
var numTileTypes=4;
var tileColors=["#666633","#6f582a","#4d6f2a","#4d4d33"];
var tileGrid=[];

for(var i=0;i<canvas.width/30;i++){
  gridlinesY[i]=i*30;
}
for(var i=0;i<canvas.height/30;i++){
  gridlinesX[i]=i*30;
}

for(var i=0;i<gridlinesX.length;i++){
  var column = new Array();
  for (var j=0;j<gridlinesY.length;j++){
    column[j]=Math.floor(Math.random()*numTileTypes);
  }
  tileGrid[i]=column;
}


function dropPrisoner(){
	if (prisonerDisplay>0){
		slowdownFraction-=0.4;
		prisonerDisplay-=1;

		if (mainPlayer.vision>mainPlayer.radius + 100){
			mainPlayer.vision-=20;
		}
		if (mainPlayer.detection>mainPlayer.radius + 7){
			mainPlayer.detection-=5;
			mainPlayer.detectionOriginal=mainPlayer.detection;
		}
	}
}

function gridhandler(){
  for(var j=0;j<gridlinesX.length;j++){
    gridlinesX[j]+=forceX;
    if(gridlinesX[j]>canvas.height){ gridlinesX[j]-=canvas.height;}
    if(gridlinesX[j]<0){gridlinesX[j]+=canvas.height;}
  }
  for(var k=0;k<gridlinesY.length;k++){
    gridlinesY[k]+=forceY;
    if(gridlinesY[k]>canvas.width){ gridlinesY[k]-=canvas.width;}
    if(gridlinesY[k]<0){gridlinesY[k]+=canvas.width;}
  }
}

function drawGrid(){
  context.strokeStyle="black";
  for (var i=0;i<gridlinesX.length;i++){
   for(var j=0;j<gridlinesY.length;j++){
     var tileColor=tileGrid[i][j];
     context.fillStyle=tileColors[tileColor];
     context.fillRect(gridlinesX[i],gridlinesY[j],30,30);
   }
  }
  context.fillStyle="white";

}

function mainmenu() {
  context.drawImage(Mainmenuscreen, Mainmenu_xposition, Mainmenu_yposition, canvas.width, canvas.height);
  context.drawImage(Mainmenucursor, Mainmenucursor_xposition, Mainmenucursor_yposition, 400, 200);
  context.drawImage(Mainmenubutton, Mainmenubutton_xposition, Mainmenubutton_yposition, 175, 75);
  context.drawImage(Mainmenubutton2, Mainmenubutton2_xposition, Mainmenubutton2_yposition, 175, 75);
  context.drawImage(Mainmenucursor2, Mainmenucursor2_xposition, Mainmenucursor2_yposition, 400, 200);
  context.drawImage(Pausebutton, Pausebutton_xpos, Pausebutton_ypos, 175, 75);
  context.drawImage(Pausebutton2, Pausebutton2_xpos, Pausebutton2_ypos, 175, 75);
}

function game() {
  context.drawImage(SampleGame, 0, 0, canvas.width, canvas.height);
}

function update() {
  if (!gameOver) {
    if (!gamePaused) {
      //as Long as game is not over keep updating new things.
      highScore = parseInt(localStorage.getItem("highScore"));
      if (move === true) {
        score += 1;

        gridhandler();

        if (highScore <= score) {
          highScore = score;
        }

      } else {
        force = 0;
      }
      for (var x = 0; x < numPrisoners; x++) {
        prisoners[x].update();
      }
      for (var x = 0; x < enemies.length; x++) {
        enemies[x].update();
      }

      mainPlayer.update();
      localStorage.setItem("highScore", highScore);
    }
  }
}


function draw() {
  canvas.width = canvas.width;
  drawGrid();
  context.strokeRect(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < numPrisoners; x++) {
    prisoners[x].draw();
  }
  for (var x = 0; x < enemies.length; x++) {
    enemies[x].draw();
  }
  mainPlayer.draw();
  createViewDistance();
  displayScore();
  if(gameOver){
  	context.font = "37px Verdana";
  	context.strokeStyle = "#000000";
  	context.lineWidth = 3;
  	context.strokeText("DETECTED! Press RESTART below to reload.",0,mainPlayer.y);
  	context.lineWidth = 1;
  	context.fillStyle = "#FF0000";
  	context.fillText("DETECTED! Press RESTART below to reload.",0,mainPlayer.y);
  	context.fillStyle = "#000000";
  }

//  game();
  mainmenu();
}

function createViewDistance(){
  context.fillStyle = "#29293d";
  context.beginPath();
  context.globalAlpha = 0.55;
  context.arc(mainPlayer.x,mainPlayer.y,mainPlayer.detection,0,2*Math.PI); //drawing the detection circle
  context.rect(canvas.width, 0, -canvas.width, canvas.height);
  context.fill();
  context.fillStyle = "#000000";
  context.beginPath();
  context.globalAlpha = 1.0;
  context.arc(mainPlayer.x, mainPlayer.y, mainPlayer.vision, 0, 2 * Math.PI);
  context.rect(canvas.width, 0, -canvas.width, canvas.height);
  context.fill();
}

function resetHighScore() {
  highScore = 0;
  localStorage.setItem("highScore", 0);
  location.reload();
}

function game_loop() {
  update();
  draw();
}

setInterval(game_loop, 30);
