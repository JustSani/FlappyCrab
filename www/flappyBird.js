"use strict";var cvs = document.getElementById("canvas");  
//fixes
//end

var fly = new Audio();  
var scor = new Audio();  
var s = new Audio(); 
s.src = "sounds/sound.mp3";  
fly.src = "sounds/fly.mp3";  
scor.src = "sounds/score.mp3"; 

let death = false;

var ctx = cvs.getContext("2d");  
 
var bird = new Image();  
var bg = new Image();  
var fg = new Image();  
var fg1 = new Image();  
var pipeNorth = new Image();  
var pipeSouth = new Image();  
  
bird.src = "images/crab.png"; 
bg.src = "images/bg.png";  
fg.src = "images/fg.png";  
fg1.src = "images/fg2.png";  
pipeNorth.src = "images/pipeNorth.png";  
pipeSouth.src = "images/pipeSouth.png";  
  
var gap = 205;  
var constant;  
  
var bX = 10;  
var bY = 150;  
  
var gravity = 0.7;  
  
var score = 0;  
  


document.addEventListener("click",moveUp);  
  
function moveUp(){  
    bY -= 30;
    fly.play();  
    s.play();  
}  
  
var pipe = [];  
  
pipe[0] = {  
    x : cvs.width,  
    y : 0  
};  

function draw(){  

     //cvs.height - fg.height);  

    ctx.drawImage(bg,0,0);  
    for(var i = 0; i < pipe.length; i++){  
          
        constant = pipeNorth.height+gap;  
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);  
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);  
               
        pipe[i].x--;  
          
        if( pipe[i].x == 125 ){  
            pipe.push({  
                x : cvs.width,  
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height  
            });   
        }  
          
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){ 
            //location.reload();
            death = true;
            // morte

        }  
          
        if(pipe[i].x == 5){  
            score++;  
            scor.play();  
        }  
          
          
    }  
    ctx.drawImage(fg,0,0) 
    //ctx.drawImage(fg1,0,cvs.height - fg.height + 20);  

    
    
    
      
    ctx.drawImage(bird,bX,bY);  
      
    bY += gravity;  
      
    ctx.fillStyle = "#000";  
    ctx.font = "20px Verdana";  
    ctx.fillText("Score : "+score,10, 0);  
    
    if(!death)
        requestAnimationFrame(draw);  
      
}  
  
draw();  