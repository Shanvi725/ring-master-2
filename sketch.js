var canvas;
var PLAY = 1;
var END = 0;
var gameState = 1;
var bird,birdImg;
var bird2,birdImg2;
var ring,ringImg;
var bg,bgImg;
var bird,birdImg;
var count = 0;
var score = 0;
var line;
var line2;

function preload(){
  bgImg = loadImage("bg.png");
  birdImg = loadAnimation("bird1.png", "bird2.png", "bird3.png");
  birdImg2 = loadAnimation("bird10.png", "bird20.png", "bird30.png");
  ringImg = loadImage("ring.png");

}

function setup(){
    
  canvas = createCanvas(windowWidth,windowHeight);

  bg = createSprite(900,542);
  bg.addImage(bgImg);
  bg.scale = 2.7;
  bg.depth = 0;

  ring = createSprite(400,200);
  ring.addImage(ringImg);
  ring.scale = 0.3;

  line = createSprite(1910,300,1,600);
  line.shapeColor = (rgb(246,246,246));
  line2 = createSprite(10,300,1,600);
  line2.shapeColor = (rgb(246,246,246));
  
  birdG = new Group();
  birdG2 = new Group();

}

function draw() {

  background(rgb(246,246,246));

  if (gameState === PLAY){

    edges=createEdgeSprites();
    ring.bounceOff(edges);

    ring.x = mouseX;
    ring.y = mouseY;

    if(ring.isTouching(birdG) && (keyDown("space"))){
      birdG.destroyEach();
      score = score + 10;
    }

    if(ring.isTouching(birdG2) && (keyDown("space"))){
      birdG2.destroyEach();
      score = score + 10;
    }

    birdfly();
    
    drawSprites();

    fill("black");
    textSize(30);
    text("SCORE: " +score,1600,60);

    if (line.isTouching(birdG)){
    birdG.setLifetimeEach(-1);
    birdG.setVelocityXEach(0);
    birdG.destroyEach();
    count = count + 1;
    }

    if (line2.isTouching(birdG2)){
    birdG2.setLifetimeEach(-1);
    birdG2.setVelocityXEach(0);
    birdG2.destroyEach();
    count = count + 1;
    }
  
    fill("black");
    textSize(18);
    text("Out of (10) Lifes : "+count, 40, 40);

  }
  

  if (count === 5) {
    gameState = END;
    
  }

  if(gameState === END){
    textSize(50);
    text("Game Over :(", 700, 700);
  }

}

function birdfly(){

  if(frameCount%100 === 0){
   
    bird = createSprite(5, 100, 150, 300);
    bird.scale = random(0.3,0.7);
    bird.velocityX = random(5,20);;
    bird.addAnimation("bird", birdImg);
    bird.y = random(50,450);
    bird.lifetime = 600;
    birdG.add(bird);

    bird2 = createSprite(1900, 100, 150, 300);
    bird2.scale = random(0.3,0.7);
    bird2.velocityX = random(-5,-20);
    bird2.addAnimation("bird", birdImg2);
    bird2.y = random(50,450);
    bird2.lifetime = 600;
    birdG2.add(bird2);
        
  }


}
