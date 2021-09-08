
var monkey , monkey_running, monkeyStop
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground, invisibleGround
var obstaclesGroup, bananaGroup
var PLAY = 1;
var END = 0;
var gameState = PLAY;
 var score, SurvivalTime
function preload(){
  
  
  monkeyStop_collided = loadAnimation("sprite_5.png");
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameOver.png")
  backgroundImage = loadImage("jungle.jpg")
 
}



function setup() {
  createCanvas(600, 300);
monkey = createSprite(50,200,20,50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collided",monkeyStop_collided);
  monkey.scale = 0.1
  
 bananaGroup = createGroup();
   obstaclesGroup = createGroup();
  
  ground = createSprite(275,300,650,10);
  ground.x = ground.width /2;
  ground.visible = false

  invisibleGround = createSprite(275,260,650,10);
invisibleGround.visible = false;
  
  gameOver = createSprite(300,150)
  gameOver.addImage(gameOverImage)  
  gameOver.visible = false   

 SurvivalTime = 0;
  score = 0;
}


function draw() {
  background(backgroundImage);
  fill("red")
  textSize(25)
  text("Score: "+ score, 380,50);

 if(gameState === PLAY){
   


   
   if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach()
    score = score + 1;
    monkey.scale += + 0.05
  }
  
     }
  
  if(keyDown("space")&& monkey.y >= 120){
        monkey.velocityY = -15; 
    
    }
    monkey.velocityY = monkey.velocityY + 8;
   
     
   
   
   monkey.collide(invisibleGround);
   

  
    if(gameState === END){
  
   obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     bananaGroup.destroyEach()
     obstaclesGroup.destroyEach()
      monkey.changeAnimation("collided",monkeyStop_collided)
     gameOver.visible = true
     ground.velocityX = 0;
    }
  
 
 spawnObsacles();
  spwanBanana();
  
  drawSprites();
  
}
function spawnObsacles(){
  if(frameCount % 90 === 0){
    var obstacle = createSprite(600,250,10,40);
   var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      case 2: obstacle.addImage(obstacleImage);
              break;
              default: break;
    }
    obstacle.velocityX = -2     
    obstacle.scale = 0.1;
     obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
  
}
function spwanBanana(){
     if (frameCount % 70 === 0) {
    var banana = createSprite(600,300,40,10);
    banana.y = Math.round(random(50,200));
       banana.addImage(bananaImage)
       banana.scale = 0.1;
        banana.velocityX = -3;
        bananaGroup.add(banana)
     }
}





