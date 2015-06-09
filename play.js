// Global variables
var pingCnvs; // getElementById canvas
var context; // getContext

var CANVAS_WIDTH = 720;
var CANVAS_HEIGHT = 480;

var widthRacket = 14;
var heightRacket = 100;


var flagX = true;//movement flag on an X
var xV = getRandomInt(10,17);//coordinate X

var yV = 0; //coordinate Y
var flagY = true;//movement flag on an Y

var countGameMan = 0;
var countGameCmp = 0;
var idSetinterval;
 
var distanceBetweenWallAndRracket =5;

function Player(color,x,y,wdth,hgth){

	this.color=color;
	this.x=x;
	this.y=y;
	this.wdth=wdth;
	this.hgth=hgth;

		this.draw=function(){
		context.fillStyle=this.color;
		context.fillRect(this.x,this.y,this.wdth,this.hgth);
		};
}




var racketMan = new Player("#CC9900",CANVAS_WIDTH-widthRacket-distanceBetweenWallAndRracket,CANVAS_HEIGHT/3,widthRacket,heightRacket);

var racketCmp = new Player("#CC9900",distanceBetweenWallAndRracket,CANVAS_HEIGHT/3,widthRacket,heightRacket);


var ball = { 

	color: "#FFFFFF",
	x: widthRacket+15,
	y: CANVAS_HEIGHT/2,
	radius: 10,
	
	draw: function(){
	
	context.beginPath();
	context.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
      
	context.fillStyle = this.color;
	context.fill();
	 
    //контур
	context.lineWidth = 1;
	context.strokeStyle = "red";
	context.stroke();
	  
	}

};

//control of a racket of keys
function whatKey(evt){

	switch (evt.keyCode) {
	 // Down arrow
			case 40:
			 racketMan.y+=60;
			  break;
          case 83://Ss
			 racketMan.y+=60;
			  break;
			  
	// Up arrow 
			case 38://^
			 racketMan.y-=60;
			  break;
			  
	     case 87://Ww
			 racketMan.y-=60;
		break;		  

	};


racketMan.y = racketInField(racketMan.y,pingCnvs.height,heightRacket);


};

//check of finding of a racket in the field
function racketInField(racketY,canvasHeigth,hRacket){
if(racketY<0)
racketY=0; 

if(racketY>canvasHeigth-hRacket)
racketY=canvasHeigth-hRacket;

return racketY;

};

//control of a racket of a mouse
function coordinateClick(evt){
var y = evt.pageY - this.offsetTop;
racketMan.y = y; 
racketMan.y = racketInField(racketMan.y,pingCnvs.height,heightRacket);
};

// Returns a random integer between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


//this is onload body
function canvasPingPong(){

  countGameMan = 0;
  countGameCmp = 0;

	pingCnvs=document.getElementById("pingCnvs");

	pingCnvs.height = CANVAS_HEIGHT;

	pingCnvs.width = CANVAS_WIDTH;


	if(pingCnvs.getContext){

		context=pingCnvs.getContext("2d");
		//for window.localStorage
	    saveGameCount();
		showGameCount();
		
		//restartPlay();
		idSetinterval = setInterval(play,100/3);
		
		showCount();
		
		
	    
	}

	
	
	// Add keyboard listener.
	window.addEventListener('keydown', whatKey, false);
	
	// Add mouse listener.
	pingCnvs.addEventListener('click',coordinateClick,false);
	
};


function restartPlay(){

if(idSetinterval)
clearInterval(idSetinterval);

idSetinterval = setInterval(play,100/3);

};


function pausePlay(timePause,flagStopGame){

if(timePause===undefined)
   timePause=1000;
   
 if(flagStopGame===undefined)
    flagStopGame = false;
	
clearInterval(idSetinterval);

if(!flagStopGame)
setTimeout(restartPlay,timePause);

};


function soundPlay(idAudio,flagSoundPlay,timeSoundPlay){

document.getElementById(idAudio).play();

//variables defoult
if(flagSoundPlay===undefined)
  flagSoundPlay=false;
if(timeSoundPlay===undefined)
  timeSoundPlay=1000;
  
	if(flagSoundPlay){
	  setTimeout(function (){document.getElementById(idAudio).pause();},timeSoundPlay);       
	}
};


//if ball faces a racket,we change a movement flag
//if ball is passed, we change ball coordinates
function collisionRacket(){ 

if(flagX){
	if(ball.x+ball.radius>=racketMan.x&&ball.y>=racketMan.y-ball.radius&&ball.y<=racketMan.y+racketMan.hgth+ball.radius){
	
	soundPlay("clunkRacket");
	
	
    ball.x=CANVAS_WIDTH-widthRacket-ball.radius-distanceBetweenWallAndRracket;
	
	if(yV==0){	
	yV = getRandomInt(0,14);
	}
	else
	   yV = getRandomInt(5,14);
	
	xV = getRandomInt(17,24);
	
	flagX = false;
	
	
	}else if(ball.x>racketMan.x+ball.radius/2&&(ball.y<racketMan.y-ball.radius||ball.y>racketMan.y+racketMan.hgth))
	  {ball.y = racketCmp.y+ball.radius;
	   ball.x=widthRacket+distanceBetweenWallAndRracket;
	  
	  countGameCmp++;
	  
	  soundPlay("applause",true);
	 	 
	  showCount();
	  
	  //for window.localStorage
	  saveGameCount("countGameCmp");
	  showGameCount();
	  
	  pausePlay();
 	 
	  }
}else{
	if(ball.x<=racketCmp.x+widthRacket+distanceBetweenWallAndRracket&&ball.y>=racketCmp.y-ball.radius&&ball.y<=racketCmp.y+racketCmp.hgth+ball.radius){
    soundPlay("clunkRacket");
	
	ball.x=widthRacket+ball.radius+distanceBetweenWallAndRracket;
	
   if(yV==0){	
	yV = getRandomInt(0,14);
	}
	else
	yV = getRandomInt(5,14);
	   
	xV = getRandomInt(17,24);
	
	flagX = true;
	
	}
	else if(ball.x+-ball.radius/2<racketCmp.x&&(ball.y<racketCmp.y-ball.radius||ball.y>racketCmp.y+racketCmp.hgth+ball.radius)){
    ball.y = racketMan.y+ball.radius;
	ball.x=CANVAS_WIDTH-widthRacket-distanceBetweenWallAndRracket;
	
	countGameMan++;
		
	soundPlay("applause",true);
	
	showCount();
	
	//for window.localStorage
	saveGameCount("countGameMan");
	showGameCount();
		
	pausePlay();
	
	
	}
}


};

//here coordinates change
function update(){
if(flagX)
ball.x+=xV;
else
ball.x-=xV;

if(flagY)
ball.y+=yV;
else
ball.y-=yV;

};

//collision ball and side walls
function collision(){

if(flagX){
	if(ball.x>=CANVAS_WIDTH-ball.radius){   	
	flagX = false;
	xV = getRandomInt(7,24);
	if(yV==0){
	
	yV = getRandomInt(0,14);
	}
	}
}else{
  if(ball.x<=ball.radius){
  if(yV==0){
	
	yV = getRandomInt(0,14);
	}
     flagX = true;
	 xV = getRandomInt(7,24);
	 
  }

}

if(flagY&&yV>0){
               
    if(ball.y>=CANVAS_HEIGHT-ball.radius){	
	
	soundPlay("blowBoard");
	
	flagY = false;
	yV = getRandomInt(0,15);
	
	
	}
}else{
  if(ball.y<=ball.radius){
    
    soundPlay("blowBoard");
	
     flagY = true;
	 yV = getRandomInt(0,15);

    
  }

}



};

//for control of a racket of the computer
function engineRacketCmp(){

if(flagX)
return;

if(ball.x>0.1*CANVAS_WIDTH)
return;


if(ball.x<=0.1*CANVAS_WIDTH)
  if(ball.y<=0.25*CANVAS_HEIGHT)
    racketCmp.y=getRandomInt(7,21);
  else if (ball.y>0.25*CANVAS_HEIGHT&&ball.y<=0.5*CANVAS_HEIGHT)
    racketCmp.y=CANVAS_HEIGHT/4+getRandomInt(4,14);  
  else if (ball.y>0.5*CANVAS_HEIGHT&&ball.y<=0.75*CANVAS_HEIGHT)
      racketCmp.y=CANVAS_HEIGHT/2+getRandomInt(-3,12);
  else   racketCmp.y=CANVAS_HEIGHT-getRandomInt(10,41);
  
racketCmp.y = racketInField(racketCmp.y,pingCnvs.height,heightRacket);

};

function play(){


	drawGameField();

	racketMan.draw();

	racketCmp.draw();
		
	update();
	
	collisionRacket();
	
	collision();
			
	engineRacketCmp();
	
	ball.draw();
	
};	

function drawGameField(){

context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//drawfield
context.fillStyle = "#00CC00";

context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);


//drawline
context.beginPath();

context.moveTo((CANVAS_WIDTH-1)/2,0);

context.lineTo((CANVAS_WIDTH-1)/2,CANVAS_HEIGHT);

context.lineWidth=2;

context.strokeStyle = "#FFFFFF";

context.stroke();
}

function showCount(){
document.getElementById("main").style.height=CANVAS_HEIGHT+"px";
document.getElementById("countGame").innerHTML=countGameCmp+" : "+countGameMan;
//document.getElementById("countGame").style.paddingLeft=CANVAS_WIDTH/2.5+"px";
};


function supportslocalStorage(){
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
} catch (e) {
    return false;
  }
};


function saveGameCount(flag){
if (!supportslocalStorage()){ return false; };
if(flag=="countGameCmp")
window.localStorage["countGameCmpInLocalStrg"]=parseInt(window.localStorage["countGameCmpInLocalStrg"],10)+1;
if(flag=="countGameMan")
window.localStorage["countGameManInLocalStrg"]=parseInt(window.localStorage["countGameManInLocalStrg"],10)+1;;
};

function showGameCount(){
if (!supportslocalStorage()) { return false; }

if(window.localStorage["countGameCmpInLocalStrg"]===undefined||window.localStorage["countGameCmpInLocalStrg"]==='NaN')
window.localStorage["countGameCmpInLocalStrg"]=0;

if(window.localStorage["countGameManInLocalStrg"]===undefined||window.localStorage["countGameManInLocalStrg"]==='NaN')
window.localStorage["countGameManInLocalStrg"]=0;

document.getElementById("countGeneralGame").innerHTML=window.localStorage["countGameCmpInLocalStrg"]+" : "+window.localStorage["countGameManInLocalStrg"];
//document.getElementById("countGeneralGame").style.paddingLeft=CANVAS_WIDTH/2.5+"px";
};
