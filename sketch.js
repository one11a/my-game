var runner;
var runnerImg;
var backgroundImg;
var obstacles;
var powerCoin1, star1, moneyBag;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacleGroup, powerBackupGroup;
var score = 0;
var restart,restartImg
function preload(){
    runnerImg = loadImage("runner.png");
    backgroundImg = loadImage("Forest3.jpg");
    obstacle1 = loadImage("branch.png");
    obstacle2 = loadImage("branches3.png");
    obstacle3 = loadImage("rocks2.png");
    obstacle4 = loadImage("log.png");
    obstacle5 = loadImage("stone.png");
    star1 = loadImage("star.png");
    powerCoin1 = loadImage("gold coin.png");
    moneyBag = loadImage("moneybag.png");
    restartImg = loadImage("restart.png")

    }

function setup(){
    createCanvas(1500,750);
runner = createSprite(400,600,20,40);
runner.addImage(runnerImg);
runner.scale = 0.5;

restart = createSprite(500,300)
restart.addImage(restartImg)
restart.scale = 0.5

obstacleGroup = createGroup();
powerBackupGroup = createGroup();
runner.setCollider("circle",0,0,70);
runner.debug = true

}
function powerUps(){
    if(frameCount%80 === 0 ){
        var powerBackup = createSprite(700,200,10,10);
   powerBackup.velocityY = 8;
   //powerBackup.x = Math.round(random(500,1200));
   powerBackup.y = Math.round(random(500,1200))
   
        var rand = Math.round(random(1,3));
        powerBackup.scale = 0.2;

        powerBackup.x = Math.round(random(30,500))
        switch(rand){
            case 1: powerBackup.addImage(star1);
            break;
            case 2: powerBackup.addImage(moneyBag);
            break;
            case 3: powerBackup.addImage(powerCoin1);
            break;
            default:break;
        } 
        powerBackupGroup.add(powerBackup);
       }

}

function movingObstacles(){
    if(frameCount%80 === 0 ){
       var obstacles = createSprite(1000,600,10,10);
    obstacles.velocityX = -5;
        var rand = Math.round(random(1,5));
        obstacles.scale = 0.5;
        obstacles.y = Math.round(random(50,1000))
        switch(rand){
            case 1: obstacles.addImage(obstacle1);
            break;
            case 2: obstacles.addImage(obstacle2);
            break;
            case 3: obstacles.addImage(obstacle3);
            break;
            case 4: obstacles.addImage(obstacle4);
            break;
            case 5: obstacles.addImage(obstacle5);
            break;
            default:break;
        }
        obstacleGroup.add(obstacles);
    }
    
    
}


function draw(){
background(backgroundImg);
textSize(25)
fill("yellow");
text("Score: " + score,500,200);
if(gameState === PLAY){
    if(keyIsDown(RIGHT_ARROW)){
        runner.x +=8;
    }
    restart.visible = false;
    powerUps();
    movingObstacles();
    if(obstacleGroup.isTouching(runner)){
        gameState = END;
    }
    if(powerBackupGroup.isTouching(runner)){
        score = score+5
    }
}
else if(gameState === END){
    obstacleGroup.setVelocityXEach(0);
    powerBackupGroup.setVelocityYEach(0);
    restart.visible = true;
    if(mousePressedOver(restart)||keyDown("space")){
        gameState = PLAY;
    }
    obstacleGroup.setVelocityYEach(0);
    powerBackupGroup.setVelocityXEach(0);
}
if(keyIsDown(RIGHT_ARROW)){
    runner.x +=8;
}
powerUps();
movingObstacles();
//console.log(frameCount);
drawSprites();
}
