var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(150,400);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;

  spookySound.loop();
}

function draw() {
  background(200);

  if(gameState === "play") {

    if(keyDown("SPACE")) {
      ghost.velocityY = -8;
    }
  
    if(keyDown("LEFT_ARROW")) {
      ghost.velocityX = -5;
    }
  
    if(keyDown("RIGHT_ARROW")) {
      ghost.velocityX = 5;
    }
  
    ghost.velocityY = ghost.velocityY + 1;
  
   if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    
    gameState = "end"
   }

   if(tower.y > 400){
    tower.y = 300
   
   

  }

  spawnDoors();

  }



  drawSprites();  

  if(gameState === "end") {
    textSize(30);
    fill("yellow");
    stroke("black");
    text("Game Over", 200, 300);
    
  }  
}


function spawnDoors() {
  if(frameCount % 150 === 0) {
    door = createSprite(300,300);
    door.addImage(doorImg);

    climber = createSprite(300,350);
    climber.addImage(climberImg);

    invisibleBlock = createSprite(300,350);
    //   invisibleBlock.visibile = false;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(100,400))
    door.velocityY = 1;

    climber.x = door.x;
    climber.velocityY = 1;

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
  
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth += 1; 
  
    door.lifetime = 700;
    climber.lifetime = 700;
    invisibleBlock.lifetime = 700;
  }
}
