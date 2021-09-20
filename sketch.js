  var PLAY = 1;
  var END = 0;
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = 1;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");

  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;
 
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

  
}


function draw() {
  background("black");

console.log(door);

  if(tower.y>400){
    tower.y=200;
  }
  
  
  if (gameState === PLAY) {
    
    if(keyDown(LEFT_ARROW)){
  ghost.x=ghost.x-4
     
    }

    if(keyDown(RIGHT_ARROW)){
  ghost.x=ghost.x+4;
       
    }

    if(keyDown("space")){
  ghost.velocityY=-7;
   
     
      
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
 
     
    
      spawnDoors();

  
      //write a code to make climbersGroup collide with ghost change the ghost velocity 
      if(climbersGroup.isTouching(ghost)){
       tower.velocityY=0;
       gameState = END;
      }
     
      
//write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
if(invisibleBlockGroup.isTouching(ghost))
{
  ghost.destroy();
  gameState = END;
}
  
  drawSprites();
}
  if (gameState === END){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
    
  }
}

function spawnDoors()
 {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
  
door.x = Math.round(random(100,500));

  
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    climbersGroup.add(climber);
invisibleBlockGroup.add(invisibleBlock);
doorsGroup.add(door);

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //change the depth of the ghost and door
    ghost.depth=door.depth
    ghost.depth=ghost.depth+1
     

    
    //assign lifetime to the obstacle.lifetime = 300; here  obstacle are door, climber and invisible block
doorsGroup.lifetime = 500;
climbersGroup.lifetime = 500;
invisibleBlockGroup.lifetime = 500;
    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block
  }
}

