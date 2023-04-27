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
var seaweed = new Image();  


let skinSize = 0

if(localStorage.getItem('secret') == "true"){
    bird.src = "images/CrabChan.png"; 
    skinSize = 70
}
else if(localStorage.getItem('skin') == "true"){
    bird.src = "images/Crab.png"; 
    skinSize = 50
}
else{
    skinSize  = 38
    bird.src = "images/Crab1.png";
}

bg.src = "images/bg.png";  
fg.src = "images/fg.png";  
fg1.src = "images/fg2.png";  
pipeNorth.src = "images/pipeNorth.png";  
pipeSouth.src = "images/pipeSouth.png";  
seaweed.src= "images/seaweed.gif"


var gap = 205;  
var constant;  
  
var bX = 10;  
var bY = 150;  
  
var gravity = 0.7;  
  
var score = 0;  
  
let max = 0;


function moveUp(){  
    bY -= 30;
    if(localStorage.getItem('audio') == "true"){
        fly.play();  
        s.play();  
    }
}  
  
var pipe = [];  
  
pipe[0] = {  
    x : cvs.width,  
    y : 0  
};  

$(document).ready(function(){
    document.addEventListener("click",moveUp);  
    let getMyDat = sendRequestNoCallback("https://sanino.altervista.org/FlappyCrab/getMyInfo.php?username="+localStorage.getItem("username"),"GET", "")
    getMyDat.done(function(serverdata){
        console.log(serverdata)
        max=serverdata.top

    })
    getMyDat.fail(function(serverdata){
        console.log(serverdata)
    })
    
    draw();
   
})



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
         
       if( bX + skinSize >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+skinSize >= pipe[i].y+constant) || bY + skinSize >=  cvs.height - fg.height){ 
           //location.reload();
           death = true;
           localStorage.setItem("punteggio",score);
           // morte
           navigator.vibrate(3000)

           window.location.href='gameover.html'


       }  
         
       if(pipe[i].x == 5){  
           score++;  
           if(localStorage.getItem('audio') == "true")
           scor.play();  
       }  
         
         
   }  
   //ctx.drawImage(fg,0,0) 
   //ctx.drawImage(fg1,0,cvs.height - fg.height + 20);  

   
   
   
     
   ctx.drawImage(bird,bX,bY, skinSize, skinSize);  
     
   bY += gravity;  
     
   ctx.fillStyle = "#fff";  
   ctx.font = "20px font bold";  
   ctx.fillText("Max : "+max,cvs.width - 110, 30);  
   
   ctx.fillText("Score : "+score,cvs.width - 110, 60);  
  
   ctx.fillText(localStorage.getItem("username"),10, 30);  
   
   
   if(!death)
       requestAnimationFrame(draw);  
     
}   
