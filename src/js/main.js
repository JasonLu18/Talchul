canvas = document.getElementById("Talchul");
context = canvas.getContext('2d');

var UP_KEY_CODE = 38; //KeyCode for 'Up arrow'
var DOWN_KEY_CODE = 40; //KeyCode for 'down arrow'
var RIGHT_KEY_CODE = 39; //KeyCode for 'right arrow'
var LEFT_KEY_CODE = 37; //KeyCode for 'left arrow'
var ENTER_KEY_CODE = 13;
var SPACEBAR_KEY_CODE = 32;
var ESC_KEY_CODE = 27;
var E_KEY_CODE = 69;

var move = false;
var forceX = 0;
var forceY = 0;
var slowdownFraction = 0;
var deathNum = 0;

var score = 0;
var highScore = 0;
var highScorePrisoners=0;
var origPrisoners = 30;
var numPrisoners = origPrisoners;
var origEnemies = 8;
var numEnemies = origEnemies;
var prisonerMultiplier=0;
var prisonerDisplay = 0;
var defaultVision = 100;
var incrementPrisoner = false;

var prisonerTaken = false;
var gamePaused = true;
var gameOver = false;
var instructScreen = false;
var giveupscreen = false;
var loading = false;

var Exile = -9999;

var menupos = 0;
var pausepos = 0;
var gameOverpos = 0;
var gamestate = 0;
var menumode = 0;
var giveupselect = false;
var loop = -1;

var prisonerssaved = 0;
var prisonersabandon = 0;
var tries = 0;


var Mainmenu_xposition = 0;
var Mainmenu_yposition = 0;

var Mainmenubutton_xposition = canvas.width / 2 - 100;
var Mainmenubutton_yposition = canvas.height / 2;
var Mainmenubutton2_xposition = canvas.width / 2 - 110;
var Mainmenubutton2_yposition = canvas.height / 2 + 100;
var Mainmenucursor_xposition = canvas.width / 2 - 240;
var Mainmenucursor_yposition = Mainmenubutton_yposition - 65;
var Mainmenucursor2_xposition = Exile;
var Mainmenucursor2_yposition = Exile;
var Pausebutton_xpos = Exile;
var Pausebutton_ypos = Exile;
var Pausebutton2_xpos = Exile;
var Pausebutton2_ypos = Exile;
var Gameoverbutton_xpos = Exile;
var Gameoverbutton_ypos = Exile;
var Gameovermessage_xpos = Exile;
var Gameovermessage_ypos = Exile;
var Backpaper_xpos = Exile;
var Backpaper_ypos = Exile;
var Giveup_xpos = Exile;
var Giveup_ypos = Exile;
var Sample_xpos = Exile;
var Sample_ypos = Exile;
var Instructions_xpos = Exile;
var Instructions_ypos = Exile;
var Rules_xpos = Exile;
var Rules_ypos = Exile;

var og = 0;
var ogstate = -1;
var Mainmenu_og_xpos = 1;
var Mainmenubutton_og_xpos = canvas.width / 2 - 100;
var Mainmenubutton_og_ypos = canvas.height / 2;
var Mainmenubutton2_og_xpos = canvas.width / 2 - 110;
var Mainmenubutton2_og_ypos = canvas.height / 2 + 100;
var Mainmenucursor_og_xpos = Mainmenubutton_og_xpos - 140;
var Mainmenucursor_og_ypos = Mainmenubutton_og_ypos - 65;
var Gameovermessage_og_xpos = canvas.width / 2 - 200;
var Gameovermessage_og_ypos = canvas.height / 2 - 350;
var Backpaper_og_xpos = canvas.width / 2 - 135;
var Backpaper_og_ypos = canvas.height / 2 - 100;
var Giveup_og_xpos = canvas.width / 2 + 100;
var Giveup_og_ypos = canvas.height / 2;
var Instruct_og_xpos = canvas.width / 2 - 250;
var Instruct_og_ypos = canvas.height / 2 -250;
var Rules_og_xpos = canvas.width / 2 - 200;
var Rules_og_ypos = canvas.height / 2 -200;
var Instructback_og_ypos = canvas.height / 2 + 150;
var Instructcursor_og_ypos = canvas.height / 2 + 75;

//sounds-----------------------------------------
var song = new Audio("https://db.tt/gjBXbwhl");
song.loop=true;
song.volume=.5;
song.play();

var whistle = new Audio("https://db.tt/0qp9NgPN");
whistle.loop=false;

var siren = new Audio("https://db.tt/pgvlbJy6");
siren.loop=false;

var whispers= new Audio("https://db.tt/gPeODYN0");
whispers.loop=true;
whispers.volume=0;
whispers.play();

function Whisper(v){
  v=v/10;
  if (v>1){v=1;}
  whispers.volume=v;
}//controlls the whisper volume based on input v.


//-------------------------------------------------------------
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
Mainmenubutton2.src = 'http://i.imgur.com/wNomt82.png';

var Pausebutton = new Image();
Pausebutton.width = 175;
Pausebutton.height = 75;
Pausebutton.src = 'http://i.imgur.com/qcfGWzX.png';

var Pausebutton2 = new Image();
Pausebutton2.width = 175;
Pausebutton2.height = 75;
Pausebutton2.src = 'http://i.imgur.com/3gw2VUR.png';

var Gameoverbutton = new Image();
Gameoverbutton.width = 175;
Gameoverbutton.height = 75;
Gameoverbutton.src = 'http://i.imgur.com/4MFuc7S.png';

var Gameovermessage = new Image();
Gameovermessage.width = 400;
Gameovermessage.height = 200;
Gameovermessage.src = 'http://i.imgur.com/vVzAAgw.png';

var Backpaper = new Image();
Backpaper.width = 500;
Backpaper.height = 1000;
Backpaper.src = 'http://i.imgur.com/gJp8U52.png';

var Giveup = new Image();
Giveup.width = 175;
Giveup.height = 75;
Giveup.src = 'http://i.imgur.com/hx2SYoZ.png';

var Instructions = new Image();
Instructions.width = 1000;
Instructions.height = 500;
Instructions.src = 'http://i.imgur.com/arbbzsc.png';

var Rules = new Image();
Rules.width = 1000;
Rules.height = 500;
Rules.src = 'http://i.imgur.com/PlwdMPp.png';

var SampleGame = new Image();
SampleGame.width = canvas.width;
SampleGame.height = canvas.height;
SampleGame.src = 'http://i.imgur.com/TA1lh0z.jpg';



if (localStorage.getItem("highScore") === null) {
  localStorage.setItem("highScore", "0");
  highScore = 0;
} else {
  highScore = parseInt(localStorage.getItem("highScore"));
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function keyDown(evt) {
	evt.preventDefault()
  if (evt.keyCode === E_KEY_CODE) {
    dropPrisoner();
  }

  if (gamestate < 0) {
    if (evt.keyCode === ESC_KEY_CODE) {
      Backpaper_xpos = Backpaper_og_xpos - 1;
      Backpaper_ypos = Backpaper_og_ypos - 1;
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
  	  	//console.log(gameOverpos);
    if (gamestate >= 0) {
      Mainmenucursor_yposition = Mainmenubutton_yposition - 65;
      menupos = og - 1;
    }
    forceY = 4.5 - slowdownFraction;
    move = true;

    if (gamestate < 0 && menumode < 0) {
      Mainmenucursor2_yposition = Mainmenubutton_og_ypos - 65;
      pausepos = og - 1;
    }

    if (gameOver && giveupselect == false && giveupscreen == false) {
      Mainmenucursor2_yposition = Mainmenubutton_og_ypos - 65;
      gameOverpos = og - 1;
      if (deathNum > 2) {
        Giveup_xpos = Giveup_og_xpos - 50;
        Giveup_ypos = Giveup_og_ypos - 1;
      }
    }
  }
  if (evt.keyCode === DOWN_KEY_CODE) {
  	//console.log(gameOverpos);
    if (gamestate >= 0) {
      Mainmenucursor_yposition = Mainmenubutton2_yposition - 65;
      menupos = og + 1;
    }
    forceY = -4.5 + slowdownFraction;
    move = true;

    if (gamestate < 0 && menumode < 0) {
      Mainmenucursor2_yposition = Mainmenubutton2_og_ypos - 65;
      pausepos = og + 1;
    }

    if (gameOver && giveupselect == false && giveupscreen == false) {
      Mainmenucursor2_yposition = Mainmenubutton2_og_ypos - 65;
      gameOverpos = og + 1;
      if (deathNum > 2) {
        Giveup_xpos = Giveup_og_xpos - 50;
        Giveup_ypos = Giveup_og_ypos - 1;
      }
    }
  }
  if (evt.keyCode === LEFT_KEY_CODE) {
    forceX = 4.5 - slowdownFraction;
    move = true;

    if (gameOver && giveupscreen == false) {
      if (deathNum > 2) {
        Mainmenucursor2_xposition = Mainmenucursor_og_xpos - 1;
        Mainmenucursor2_yposition = Mainmenucursor_og_ypos - 1;
        giveupselect = false;
        gameOverpos = og + 1 - 1;
      }
    }
  }
  if (evt.keyCode === RIGHT_KEY_CODE) {
    forceX = -4.5 + slowdownFraction;
    move = true;

    if (gameOver && giveupscreen == false) {
      if (deathNum > 2) {
        Giveup_xpos = Giveup_og_xpos - 50;
        Giveup_ypos = Giveup_og_ypos - 1;
        Mainmenucursor2_xposition = Giveup_og_xpos - 95;
        Mainmenucursor2_yposition = Giveup_og_ypos - 40;
        giveupselect = true;
      }
    }
  }
  if (menupos <= 0 && gamestate >= 0 && instructScreen == false) {

    if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
      Mainmenu_xposition = Exile - 1;
      Mainmenucursor_xposition = Exile - 1;
      Mainmenubutton_xposition = Exile - 1;
      Mainmenubutton2_xposition = Exile - 1;
      gamestate = gamestate - 1;
      gamePaused = false;
    }
  }
  if (menupos > 0 && gamestate >= 0 && instructScreen == false) {

    if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
      Instructions_xpos = Instruct_og_xpos - 1;
      Instructions_ypos = Instruct_og_ypos - 1;
      Rules_xpos = Rules_og_xpos;
      Rules_ypos = Rules_og_ypos;
      Pausebutton2_xpos = Mainmenubutton2_og_xpos - 1;
      Pausebutton2_ypos = Instructback_og_ypos - 1;
      Mainmenucursor2_xposition = Mainmenucursor_og_xpos - 1;
      Mainmenucursor2_yposition = Instructcursor_og_ypos - 1;
      setTimeout(function(){ instructScreen = true }, 10);
    }
  }
  if (gamestate >= 0 && instructScreen) {
    if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
      Instructions_xpos = Exile - 1;
      Instructions_ypos = Exile - 1;
      Rules_xpos = Exile - 1;
      Rules_ypos = Exile - 1;
      Pausebutton2_xpos = Exile - 1;
      Pausebutton2_ypos = Exile - 1;
      Mainmenucursor2_xposition = Exile - 1;
      Mainmenucursor2_yposition = Exile - 1;
      instructScreen = false;
    }
  }
  if (gamestate < 0) {
    if (pausepos <= 0) {
      if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
        Backpaper_xpos = Exile - 1;
        Backpaper_ypos = Exile - 1;
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

        Mainmenu_xposition = Mainmenu_og_xpos - 1;
        Mainmenucursor_xposition = Mainmenucursor_og_xpos - 1;
        Mainmenucursor_yposition = Mainmenucursor_og_ypos - 1;
        Mainmenubutton_xposition = Mainmenubutton_og_xpos - 1;
        Mainmenubutton2_xposition = Mainmenubutton2_og_xpos - 1;
        gamestate = ogstate + 1;
        menupos = Mainmenu_og_xpos - 1;
        menumode = ogstate + 1;
        pausepos = ogstate + 1;

        location.reload();
      }
    }

    if (gameOver && gameOverpos > 0 && giveupselect == false) {
      if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
        Backpaper_xpos = Exile - 1;
        Backpaper_ypos = Exile - 1;
        Gameovermessage_xpos = Exile - 1;
        Gameovermessage_ypos = Exile - 1;
        Gameoverbutton_xpos = Exile - 1;
        Gameoverbutton_ypos = Exile - 1;
        Pausebutton2_xpos = Exile - 1;
        Pausebutton2_ypos = Exile - 1;
        Mainmenucursor2_xposition = Exile - 1;
        Mainmenucursor2_yposition = Exile - 1;

        Mainmenu_xposition = Mainmenu_og_xpos - 1;
        Mainmenucursor_xposition = Mainmenucursor_og_xpos - 1;
        Mainmenucursor_yposition = Mainmenucursor_og_ypos - 1;
        Mainmenubutton_xposition = Mainmenubutton_og_xpos - 1;
        Mainmenubutton2_xposition = Mainmenubutton2_og_xpos - 1;
        gamestate = ogstate + 1;
        menupos = Mainmenu_og_xpos - 1;
        menumode = ogstate + 1;

        location.reload();
      }
    }
    if (gameOver && gameOverpos <= 0 && giveupselect == false) {
      if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
        Backpaper_xpos = Exile - 1;
        Backpaper_ypos = Exile - 1;
        Gameovermessage_xpos = Exile - 1;
        Gameovermessage_ypos = Exile - 1;
        Gameoverbutton_xpos = Exile - 1;
        Gameoverbutton_ypos = Exile - 1;
        Pausebutton2_xpos = Exile - 1;
        Pausebutton2_ypos = Exile - 1;
        Mainmenucursor2_xposition = Exile - 1;
        Mainmenucursor2_yposition = Exile - 1;
        Giveup_xpos = Exile - 1;
        Giveup_ypos = Exile - 1;

        loop = og - 1;
        gameOver = false;

        tries ++;
        deathNum++;
        siren.muted=true;
        restartGame();
      }
    }

    if (gameOver && gameOverpos <= 0 && giveupselect) {
      if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
          
          
          Backpaper_xpos = Exile - 1;
          Backpaper_ypos = Exile - 1;
          Gameovermessage_xpos = Exile - 1;
          Gameovermessage_ypos = Exile - 1;
          Gameoverbutton_xpos = Exile - 1;
          Gameoverbutton_ypos = Exile - 1;
          Pausebutton2_xpos = Exile - 1;
          Pausebutton2_ypos = Exile - 1;
          Mainmenucursor2_xposition = Exile - 1;
          Mainmenucursor2_yposition = Exile - 1;
          Giveup_xpos = Exile - 1;
          Giveup_ypos = Exile - 1;

          Sample_xpos = og + 1;
          Sample_ypos = og + 1;
          Pausebutton2_xpos = Mainmenubutton2_og_xpos - 1;
          Pausebutton2_ypos = Instructback_og_ypos - 1;
          Mainmenucursor2_xposition = Mainmenucursor_og_xpos - 1;
          Mainmenucursor2_yposition = Instructcursor_og_ypos - 1;  
     
          setTimeout(function(){ giveupscreen = true }, 10);               
        
          loading = true;
      }
    }
    
    if (gameOver && gameOverpos <= 0 && giveupselect && giveupscreen) {
      if (evt.keyCode === SPACEBAR_KEY_CODE || evt.keyCode === ENTER_KEY_CODE) {
         location.reload();                     
      }
    }    
  }
}

var timeSiren = new Date();
var secondsSiren = timeSiren.getTime();
var sirenAppear = false;
var sirenEnabled = false;

function restartGame() {
	score = 0;
	slowdownFraction = 0;
	prisonerDisplay = 0;
	numEnemies = origEnemies;
  whispers.volume=0;
	mainPlayer.vision = mainPlayer.radius + 100;
	mainPlayer.detection = mainPlayer.radius + 7;
	mainPlayer.detectionOriginal = mainPlayer.detection;
	var newDate = new Date();
	secondsSiren = newDate.getTime();
	while(enemies.length != origEnemies){
		enemies.pop();
	}
	initializeObjects();
	reIntializeSirens();
	sirenAppear = false;
	sirenEnabled = false;
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

var countDown = 0

function sirenTime() {
  var newTimeSiren = new Date();
  var newSecondsSiren = newTimeSiren.getTime();
  var diffTime = (newSecondsSiren - secondsSiren) /1000;
  countDown = diffTime;
  if(diffTime >= 15 && sirenEnabled === false && gamePaused === false){
	  sirenAppear = true;
	  secondsSiren = newSecondsSiren;
	  reIntializeSirens();
  }else if(sirenEnabled === true || gamePaused === true){
	  secondsSiren = newSecondsSiren;
  }

}

function sirenCircle(x, y, radius, sAngle, eAngle, collision) {
  //seperate for clarity;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.sAngle = sAngle;
  this.eAngle = eAngle;
  this.collision = collision;

  this.draw = function() {
    sirenTime();
    if (sirenAppear === true) {
      context.beginPath();
      context.lineWidth = 2;
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = "#000000";
      context.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle);
      context.stroke();
      context.fillStyle = "#3366ff";
      context.fill();
    }
  }

  this.update = function() {
	if(!gameOver){
		this.x += forceX;
		this.y += forceY;
		sirenTime();
		if (sirenAppear === true) {
			this.x -= 4;
			this.collision = true;
			sirenEnabled = true;
			if(this.x<=-200){
				sirenEnabled = false;
				sirenAppear = false;
				reIntializeSirens();
			}
		}
	}
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
	checkPrisoners(this);
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

function checkPrisoners(prisoner){

	if((prisoner.x >= mainPlayer.x+600)||(prisoner.x <= mainPlayer.x-600) ||(prisoner.y>=mainPlayer.y+600)||(prisoner.y <=mainPlayer.y-600)){
		incrementPrisoner = false;
		randomizePrisoner(prisoner);
	}
}

var prisoners = [] //new Array(numPrisoners);
var enemies = []; //new Array(numEnemies);
var sirens = [];
var numSirens = 50;
var mainPlayer = new playerCircle(canvas.width / 2, canvas.height / 2, 15, 0, 2 * Math.PI);

function initializeObjects() {
  for (var i = 0; i < numEnemies; i++) {
    var enemySpeed = Math.random() < 0.5 ? -2 : 2; // is the random less than 0.5? Then the speed is -2. Else, it is 2.
    var xPos = Math.random() * canvas.width;
    var yPos = Math.random() * canvas.height;
    while ((xPos > (mainPlayer.x - mainPlayer.vision)) && (xPos < (mainPlayer.x + mainPlayer.vision)) && (yPos > (mainPlayer.y - mainPlayer.vision)) && (yPos < (mainPlayer.y + mainPlayer.vision))) {
      xPos = Math.random() * canvas.width;
      yPos = Math.random() * canvas.width;
    }
    enemies[i] = new circle(xPos, yPos, 10, 0, 2 * Math.PI, false, true, enemySpeed);
  }

  for (var i = 0; i < numPrisoners; i++) {
    var xPos = Math.random() * canvas.width;
    var yPos = Math.random() * canvas.height;
    while ((xPos > (mainPlayer.x - mainPlayer.vision)) && (xPos < (mainPlayer.x + mainPlayer.vision)) && (yPos > (mainPlayer.y - mainPlayer.vision)) && (yPos < (mainPlayer.y + mainPlayer.vision))) {
      xPos = Math.random() * canvas.width;
      yPos = Math.random() * canvas.width;
    }
    prisoners[i] = new circle(xPos, yPos, 10, 0, 2 * Math.PI, false, false, 0);
  }
}

function reIntializeSirens() {
  var sirensY = -1000;

  for (var x = 0; x < numSirens; x++) {
    sirens[x] = new sirenCircle(canvas.width+900 , mainPlayer.y + sirensY, 20, 0, 2 * Math.PI, false);//canvas.width+400
    sirensY += 50;
  }
}

initializeObjects();
reIntializeSirens();

function addEnemies() {

  numEnemies += 1;
  var enemySpeed = Math.random() < 0.5 ? -2 : 2; // is the random less than 0.5? Then the speed is -2. Else, it is 2.
  var xPos = Math.random() * canvas.width;
  var yPos = Math.random() * canvas.height;
  while ((xPos > (mainPlayer.x - mainPlayer.vision)) && (xPos < (mainPlayer.x + mainPlayer.vision)) && (yPos > (mainPlayer.y - mainPlayer.vision)) && (yPos < (mainPlayer.y + mainPlayer.vision))) {
    xPos = Math.random() * canvas.width;
    yPos = Math.random() * canvas.width;
  }
  enemies[numEnemies - 1] = new circle(xPos, yPos, 10, 0, 2 * Math.PI, false, true, enemySpeed);

}

function randomizePrisoner(prisoner) {
	if(incrementPrisoner){
		prisonerDisplay+=1;
	}
	var xPos = Math.random() * canvas.width;
	var yPos = Math.random() * canvas.height;
	while ((xPos > (mainPlayer.x - mainPlayer.vision)) && (xPos < (mainPlayer.x + mainPlayer.vision)) && (yPos > (mainPlayer.y - mainPlayer.vision)) && (yPos < (mainPlayer.y + mainPlayer.vision))) {
		xPos = Math.random() * canvas.width;
		yPos = Math.random() * canvas.width;
	}
	prisoner.x = xPos;
	prisoner.y = yPos;
	prisoner.taken = false;
}

function displayScore() {
  //score display
  context.font = "20px Verdana";
  context.fillStyle = "#ff0000";
  localStorage.setItem("highScore", highScore);
  context.fillText("SCORE: "+score,10,canvas.height-10);
  context.fillText("HIGHSCORE: "+localStorage.getItem("highScore"),canvas.width/2+75,canvas.height-10);
  context.fillText("Prisoners Recruited: "+prisonerDisplay,canvas.width/300,canvas.height/28);
  //context.fillText("Patrol incoming in: "+(15-countDown).toFixed(1),canvas.width/300,canvas.height/10)
}

function displayStats(){
	context.font = "16px Verdana";
	context.fillStyle = "#333333";
	context.fillText("Number of Prisoners you tried to save: "+prisonerssaved,canvas.width/4,canvas.height/2-30);
	context.fillText("Number of Prisoners you abandoned...: "+prisonersabandon,canvas.width/4,canvas.height/2+20);
	context.fillText("Number of attempts to escape: "+tries,canvas.width/4,canvas.height/2+70);
}

function extendVision(player) {
  if (player.vision > player.radius + 150) {
    player.vision += 0;
  } else {
    player.vision += 20;
  }
  //increase detection radius

  if (player.detection >= player.radius + 40) {} else {
    var percentage = 1 / 5;
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
        prisonerssaved++;
        extendVision(this);
        slowdownPlayer();
        prisonerMultiplier+=1;
        addEnemies();
		incrementPrisoner = true;
        randomizePrisoner(prisoners[x]);

        if (prisonerDisplay>highScorePrisoners){
        	highScorePrisoners+=1;
        }


      }
    }

   if (this.detectable) {
      for (var x = 0; x < enemies.length; x++) {
        var dx = (this.x) - (enemies[x].x);
        var dy = (this.y) - (enemies[x].y);
        var distance = Math.sqrt(dx * dx + dy * dy);
        var check = parseInt(this.detection + enemies[x].radius);
        if ((distance < check)) {
          siren.muted=false;
          siren.currentTime=0;
          siren.play();
          gameOver = true;
        }
      }
      if (sirenAppear) {
        //this.collision
        for (var x = 0; x < sirens.length; x++) {
          if (sirens[x].collision === true) {
            var dx = (this.x) - (sirens[x].x);
            var dy = (this.y) - (sirens[x].y);
            var distance = Math.sqrt(dx * dx + dy * dy);
            var check = parseInt(this.detection + sirens[x].radius);
            if ((distance < check)) {
              siren.muted=false;
              siren.currentTime=0;
              siren.play();
              gameOver = true;
            }
          }
        }
      }
    }


  };
}
var shrinkDate = new Date();
var shrinkTimeSeconds = shrinkDate.getTime();

function shrinkDetection(player) {
  var shrinkNewDate = new Date();
  var shrinkNewTimeSeconds = shrinkNewDate.getTime();
  if (forceX === 0 & forceY === 0) {
    //the player is not moving
    if ((shrinkNewTimeSeconds - shrinkTimeSeconds) >= 400) { // half a second
      if (player.detection > player.radius) {
        player.detection -= 5;
      } else if (player.detection <= player.radius) {
        player.detection -= 0;
      }

      shrinkTimeSeconds = shrinkNewTimeSeconds;
    }


  } else {
    player.detection = player.detectionOriginal; //go back to the original size the moment you start moving again.
  }
}

function checkDetectable(player) {
  if (player.detection <= player.radius) {
    player.detectable = false;
  } else {
    player.detectable = true;
  }
}

function slowdownPlayer() {
  if (slowdownFraction < 3.0)
    slowdownFraction += 0.15;
}


var gridlinesX = [];
var gridlinesY = [];
var numTileTypes = 4;
var tileColors = ["#666633", "#6f582a", "#4d6f2a", "#4d4d33"];
var tileGrid = [];

for (var i = 0; i < canvas.width / 30; i++) {
  gridlinesY[i] = i * 30;
}
for (var i = 0; i < canvas.height / 30; i++) {
  gridlinesX[i] = i * 30;
}

for (var i = 0; i < gridlinesX.length; i++) {
  var column = new Array();
  for (var j = 0; j < gridlinesY.length; j++) {
    column[j] = Math.floor(Math.random() * numTileTypes);
  }
  tileGrid[i] = column;
}


function dropPrisoner() {

	if (prisonerMultiplier<=1){
		prisonerMultiplier-=1;
	}

	var collide = false;
	if(mainPlayer.detection <= mainPlayer.radius){
		collide = false;
	}else{
		collide = true;
	}
  console.log(mainPlayer.detectable);
  if (prisonerDisplay > 1) {
  	prisonersabandon ++;
    slowdownFraction -= 0.4;
    prisonerDisplay -= 1;

    if (mainPlayer.vision > mainPlayer.radius + 100) {
      mainPlayer.vision -= 20;
    }
	var check = mainPlayer.detectionOriginal;
	var check2 = mainPlayer.radius + 7;
	console.log("The original detection is: "+check2);
    if (mainPlayer.detectionOriginal > check2) {

	  mainPlayer.detectionOriginal -= 5;
	  if(move === true || collide === true){
		mainPlayer.detection = mainPlayer.detectionOriginal;
	  }
    }
  }else if(prisonerDisplay === 1){
  	  prisonersabandon++;
	  slowdownFraction -= 0.4;
      prisonerDisplay -= 1;
	  if (mainPlayer.vision > mainPlayer.radius + 100) {
		mainPlayer.vision -= 20;
      }
	  mainPlayer.detectionOriginal = mainPlayer.radius+7;
	  if(move === true || collide === true){
		mainPlayer.detection = mainPlayer.detectionOriginal;
	  }

  }


}

function gridhandler() {
  for (var j = 0; j < gridlinesX.length; j++) {
    gridlinesX[j] += forceX;
    if (gridlinesX[j] > canvas.height) {
      gridlinesX[j] -= canvas.height;
    }
    if (gridlinesX[j] < 0) {
      gridlinesX[j] += canvas.height;
    }
  }
  for (var k = 0; k < gridlinesY.length; k++) {
    gridlinesY[k] += forceY;
    if (gridlinesY[k] > canvas.width) {
      gridlinesY[k] -= canvas.width;
    }
    if (gridlinesY[k] < 0) {
      gridlinesY[k] += canvas.width;
    }
  }
}

function drawGrid() {
  context.strokeStyle = "black";
  for (var i = 0; i < gridlinesX.length; i++) {
    for (var j = 0; j < gridlinesY.length; j++) {
      var tileColor = tileGrid[i][j];
      context.fillStyle = tileColors[tileColor];
      context.fillRect(gridlinesX[i], gridlinesY[j], 30, 30);
    }
  }
  context.fillStyle = "white";

}

function mainmenu() {
  context.drawImage(Mainmenuscreen, Mainmenu_xposition, Mainmenu_yposition, canvas.width, canvas.height);
  context.drawImage(Mainmenucursor, Mainmenucursor_xposition, Mainmenucursor_yposition, 400, 200);
  context.drawImage(Mainmenubutton, Mainmenubutton_xposition, Mainmenubutton_yposition, 175, 75);
  context.drawImage(Backpaper, Backpaper_xpos, Backpaper_ypos, 250, 350);
  context.drawImage(Mainmenubutton2, Mainmenubutton2_xposition, Mainmenubutton2_yposition, 175, 75);
  context.drawImage(Instructions, Instructions_xpos, Instructions_ypos, 500, 500);
  context.drawImage(Rules, Rules_xpos, Rules_ypos, 400, 400);
  context.drawImage(SampleGame, Sample_xpos, Sample_ypos, canvas.width, canvas.height);  
  context.drawImage(Mainmenucursor2, Mainmenucursor2_xposition, Mainmenucursor2_yposition, 400, 200);
  context.drawImage(Pausebutton, Pausebutton_xpos, Pausebutton_ypos, 175, 75);
  context.drawImage(Pausebutton2, Pausebutton2_xpos, Pausebutton2_ypos, 175, 75);
  context.drawImage(Gameoverbutton, Gameoverbutton_xpos, Gameoverbutton_ypos, 175, 75);
  context.drawImage(Gameovermessage, Gameovermessage_xpos, Gameovermessage_ypos, 400, 200);
  context.drawImage(Giveup, Giveup_xpos, Giveup_ypos, 250, 125);
}


function update() {
  if (!gameOver) {
    if (!gamePaused) {
      //as Long as game is not over keep updating new things.
      highScore = parseInt(localStorage.getItem("highScore"));
      if (move === true) {
        score += 1+ Math.round(.3*prisonerMultiplier);

        gridhandler();
        Whisper(prisonerDisplay);

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

      for (var x = 0; x < sirens.length; x++) {
        sirens[x].update();
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
  mainPlayer.draw();
  for (var x = 0; x < numPrisoners; x++) {
    prisoners[x].draw();
  }
  for (var x = 0; x < enemies.length; x++) {
    enemies[x].draw();
  }
  for (var x = 0; x < sirens.length; x++) {
    sirens[x].draw();
  }


  createViewDistance();
  displayScore();
  displaySirenWarning();
  mainmenu();
  if (gameOver && loop < 0) {


    Gameovermessage_xpos = Gameovermessage_og_xpos - 1;
    Gameovermessage_ypos = Gameovermessage_og_ypos + 125;
    Gameoverbutton_xpos = Mainmenubutton_og_xpos - 1;
    Gameoverbutton_ypos = Mainmenubutton_og_ypos - 1;
    Pausebutton2_xpos = Mainmenubutton2_og_xpos - 1;
    Pausebutton2_ypos = Mainmenubutton2_og_ypos - 1;
    Mainmenucursor2_xposition = Mainmenucursor_og_xpos - 1;
    Mainmenucursor2_yposition = Mainmenucursor_og_ypos - 1;
    
    loop++;
  }
  
  if(giveupscreen  && loading){
  	 displayStats();
  }


}

function displaySirenWarning(){

	if(sirenAppear === true && gameOver === false){ //check if collisison enables
		context.font = "30px Verdana";
		context.fillStyle = "#ffd700";
		context.fillText("INCOMING ENEMY PATROL!",canvas.width/7-10,canvas.height/5-20);
    if(gameOver!=true){whistle.play();}

	}
}

function createViewDistance() {
  context.fillStyle = "#29293d";
  context.beginPath();
  context.globalAlpha = 0.55;
  context.arc(mainPlayer.x, mainPlayer.y, mainPlayer.detection, 0, 2 * Math.PI); //drawing the detection circle
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
