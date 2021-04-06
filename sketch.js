    var road,roadImg;
    var car,carImg;
    var building1,building2,building1Img,building2Img,buildingsGroup;
    var obstacle1,obstacle2,obstacle1Img,obstacle2Img;
    var button,buttonImg;
    var gameOver,gameOverImg;
    var hammer,hammerImg,hammerGroup;
    var silverImg,goldImg,bronzeImg,bronze,gold,silver;
    var snake,snakeImg,snakeGroup;
    var award1Img,award2Img,award1,award2,awardsGroup;
    var gsound,pops,e,c,horn;
    var score;
    var health;

    var gameState=2;
    var END=0;
    var PLAY=1;
    var SERVE=2;

  function preload(){
      roadImg=loadImage("ro0.png");
      carImg=loadImage("car0.png");
      building1Img=loadImage("building0.png");
      building2Img=loadImage("building20.png");
      buttonImg=loadImage("button0.png");
      hammerImg=loadImage("hammer0.png");
      silverImg=loadImage("silver0.png");
      bronzeImg=loadAnimation("bronze0.png","bronze1.png","bronze2.png","bronze3.png","bronze4.png","bronze5.png");
      goldImg=loadImage("gold0.png");
      snakeImg=loadImage("snake0.png");
      award1Img=loadImage("award10.png");
      award2Img=loadImage("diamond0.png");
      obstacle1Img=loadImage("obstacle0.png");
      obstacle2Img=loadImage("obstacle20.png");
      gameOverImg=loadImage("gameOver.png")
      gsound=loadSound("audio.mp3");
      pops=loadSound("pop.mp3");
      e=loadSound("end sound.mp3");
      c=loadSound("collision.mp3");
      horn=loadSound("JeepS.mp3");

    }

    function setup() {
      createCanvas(windowWidth,windowHeight);

      edges=createEdgeSprites();

      road=createSprite(width/2,height/2);
      road.addImage("road",roadImg);
      road.scale=4;
      road.velocityY=8;

      car=createSprite(width/2,height/1);
      car.addImage("car",carImg);
      car.scale=0.15;

      button=createSprite(width/2,height/2);
      button.addImage(buttonImg);
      button.scale=0.3;
      
      gameOver=createSprite(680,100);
      gameOver.addImage(gameOverImg);
      gameOver.scale=0.7;

      bronze=createSprite(680,240);
      bronze.addAnimation("bronze",bronzeImg);
      bronze.scale=0.2;

      gold=createSprite(680,240);
      gold.addImage(goldImg);
      gold.scale=0.2;

      silver=createSprite(680,240);
      silver.addImage(silverImg);
      silver.scale=0.2;

      buildingsGroup= new Group();
      awardsGroup= new Group();
      snakeGroup=new Group();
      hammerGroup=new Group();

      score=0;
      health=100;

      gsound.loop();
    }

    function draw() {
      background("white");

       if(keyDown("i") && gameState===1){
        gameState=2;
      }  

      if(gameState===1){

      gsound.pause();
      C2();
      HAMMER();
      AWARDS();
      OBSTACLES();
      buildings();
      BUILDINGS();  

        car.collide(edges);
        button.visible=false;
        bronze.visible=false;
        gold.visible=false;
        silver.visible=false;
        road.visible=true;
        car.visible=true;
        gameOver.visible=false;


     if(keyDown("h") && gameState===1){
          horn.play();
     }

     if(road.y>height){
         road.y=height/2;
      }

      road.velocityY=8;

      if(keyDown(LEFT_ARROW)){
        car.x=car.x-6;
      }

      if(keyDown(RIGHT_ARROW)){
        car.x=car.x+6;
      }

      if(keyDown(DOWN_ARROW)){
         car.y=car.y+6;
      }

      if(keyDown(UP_ARROW)){
         car.y=car.y-6;  
     }  

        if(buildingsGroup.isTouching(car)){
          gameState=1;
          c.play();
          health=health-2;
        }

       if(snakeGroup.isTouching(car)){
         health=health-10;
         snakeGroup.destroyEach();
       }

        if(car.isTouching(hammerGroup)){
          health=health+10;
          hammerGroup.destroyEach();
      }

       if(car.isTouching(awardsGroup)){
         score=score+10;
         awardsGroup.destroyEach();

       } 

        if(health<1){
          e.play();
          gameState=0;
          buildingsGroup.destroyEach();
          awardsGroup.destroyEach();
          snakeGroup.destroyEach();
          hammerGroup.destroyEach();
        }

      }

      drawSprites();

    if(gameState===0){

      button.visible=true;
      road.visible=true;
      car.visible=true;
      gameOver.visible=false;
      
      road.velocityY=0.5;
      
     if(health< 1 && gameState===0){
       gameOver.visible=true; 
     }
      
    if(road.y>height){
        road.y=height/2;
      }

     if(mousePressedOver(button)){
        gameState=1;
        pops.play();
        score=0;
        health=100;
      }
      
      stroke("red"); 
      fill("yellow");
      textSize("15");
      text("CLICK PLAY BUTTON TO START>",1120,35);

      if(score<=20 ){
        bronze.visible=false;
        gold.visible=false;
        silver.visible=false;
        fill("white");
        textSize(16);
        text("HAVE SOME CHALLENGING RACE AND TRY TO GET SOME MEDALS🤞",450,270);
      }

      if(score>20 && score<90){
        bronze.visible=true;
        silver.visible=false;
        gold.visible=false;
        fill("white");
        textSize(18);
        text("YOU GOT BRONZE MEDAL,KEEP DRIVING!🥉",500,190);
      }

      if(score>=90 && score<200){
        silver.visible=true;
        bronze.visible=false;
        gold.visible=false;
        fill("white");
        textSize(18);
        text("CONGRATS,YOU GOT SILVER MEDAL,GO FOR GOLD NOW🥈",430,190);
      }

      if(score>=200){
        gold.visible=true;
        bronze.visible=false;
        silver.visible=false;
        fill("white");
        textSize(17);
        text("HOORAH,YOU TRULY DESERVE GOLD,YOU ARE THE ONLY ONE🥇🏆!",420,190);
       }
   }

      stroke("blue")
      fill("green"); 
      textSize(15);
      text("MONEY($) = "+ score,5,20);
      fill("red");  
      text("HEALTH❤ = "+ health,5,40);
      fill("black");
      text("DRIVER",1300,75);
      stroke("blue");
      fill("white")
      textSize(50);
      text("👷‍♂️",1300,50); 

     if(keyDown("s") && gameState===2){
         gameState=0;
      }

    if(gameState===2){

      score=0;
      health=100;

      buildingsGroup.destroyEach();
      awardsGroup.destroyEach();
      snakeGroup.destroyEach();
      hammerGroup.destroyEach();
      button.visible=false;
      car.visible=false;
      silver.visible=false;
      gold.visible=false;
      bronze.visible=false;
      road.visible=false;
      gameOver.visible=false;

      stroke("blue");
      fill("black");
      textSize(20);
      text("NOTE,HI GAMERS THIS IS A CHALLENGING RACING GAME.BEFORE DIVING IN READ THE FOLLOWING THINGS: ",100,200);
      text("CONTROL CAR BY UP,DOWN,RIGHT,LEFT ARROWS.",100,220);
      text("(1) YOU HAVE TO COLLLECT GOLD BARS AND DIAMONDS TO GET BRONZE,SILVER OR GOLD MEDAL.",100,240)
      text("(2) YOU WILL HAVE HEALTH BAR,IF HEALTH REACHES 0 YOUR GAME ENDS.",100,260);
      text("(3) THERE ARE MANY OBSTACLES LIKE BUILDINGS,CARS,SNAKES ETC,ALL OF THEM DECREASE YOUR HEALTH AS LONG- ",100,280);
      text("-AS YOU ARE IN CONTACT,TRY TO KEEP DISTANCE.ALSO PRESS 'H' FOR HORN.",100,300);
      text("(4) THERE WILL BE A TOOL WHICH INCREASES YOUR HEALTH BY 10% AND IT IS HAMMER,COLLECT THEM AS MUCH AS YOU CAN.",100,320);
      text("SO THEN TIGHTEN YOUR SEAT BELT AND PRESS 'S' TO GET TO MAIN SCREEN,AND PRESS 'i' DURING PLAY STATE TO READ THIS AGAIN.",50,340);
      

      stroke("blue");
      fill("yellow");
      textSize(26);
      text("PRESS S TO JUMP IN🎈🎈",580,420);

    }

  }

    function OBSTACLES(){
      if(World.frameCount % 70===0){
        rand=Math.round(random(1,3));
           if(rand==1){
            O2();
          }else if(rand==2){
            O1();
        }
      }
    }


    function O1(){
      obstacle1=createSprite(Math.round(random(600,750),1500,10,10));
      obstacle1.addImage(obstacle1Img);
      obstacle1.velocityY=6;
      obstacle1.scale=0.8;
      obstacle1.setLifetime=1000;
      buildingsGroup.add(obstacle1);
    }

    function O2(){
      obstacle2=createSprite(Math.round(random(600,750),1500,10,10));
      obstacle2.addImage(obstacle2Img);
      obstacle2.velocityY=6;
      obstacle2.scale=0.8;
      obstacle2.setLifetime=1000;
      buildingsGroup.add(obstacle2);

    }


    function HAMMER(){
      if(World.frameCount % 200===0){
       hammer=createSprite(Math.round(random(600,750),1500,10,10));
       hammer.addImage(hammerImg);
       hammer.velocityY=6;
       hammer.scale=0.2;
       hammer.setLifetime=1000;
       hammerGroup.add(hammer);
     }
    }


    function buildings(){
    if(World.frameCount % 80===0){
      RAND=Math.round(random(1,2));
      if(RAND==1){
        B1();
      }else if(RAND==2){
        b2();
       }
     }
   }


    function b2(){
      building2=createSprite(Math.round(random(400,500),1600,10,10));
      building2.addImage(building2Img);
      building2.velocityY=road.velocityY;
      building2.scale=0.4;
      building2.setLifetime=1000;
      buildingsGroup.add(building2);
    }

    function B1(){
      building1=createSprite(Math.round(random(100,300),1500,10,10));
      building1.addImage(building1Img);
      building1.velocityY=road.velocityY;
      building1.scale=0.6;
      building1.setLifetime=1000;
      buildingsGroup.add(building1);

    }
   function BUILDINGS(){
    if(World.frameCount % 70===0){
      RAND=Math.round(random(1,2));
       if(RAND==1){
        b1();
      }else if(RAND==2){
        B2();
      }
     }
    }

  function b1(){
      building1=createSprite(Math.round(random(1000,1250),1500,10,10));
      building1.addImage(building1Img);
      building1.velocityY=road.velocityY;
      building1.scale=0.6;
      building1.setLifetime=1000;
      buildingsGroup.add(building1);
    }

    function B2(){
      building2=createSprite(Math.round(random(850,1050),1500,10,10));
      building2.addImage(building2Img);
      building2.velocityY=road.velocityY;
      building2.scale=0.4;
      building2.setLifetime=1000;
      buildingsGroup.add(building2);

    }


    function AWARDS(){
    if(World.frameCount % 90===0){
      r=Math.round(random(1,2));
       if(r==1){
        A1();
      }else if(r==2){
        A2();
      }
     } 
    }

    function A1(){
      award1=createSprite(Math.round(random(10,1250),1500,10,10));
      award1.addImage(award1Img);
      award1.velocityY=road.velocityY;
      award1.scale=0.15;
      award1.setLifetime=1000;
      awardsGroup.add(award1);

    }


    function A2(){
      award2=createSprite(Math.round(random(10,1250),1500,10,10));
      award2.addImage(award2Img);
      award2.velocityY=road.velocityY;
      award2.scale=0.1;
      award2.setLifetime=1500;
      awardsGroup.add(award2);
    }




     function C2(){
       if(World.frameCount % 700===0){
       snake=createSprite(Math.round(random(100,500),1500,10,10));
       snake.addImage(snakeImg);
       snake.velocityX=3;
       snake.velocityY=7;
       snake.scale=0.2;
       snake.setLifetime=1000;  
       snakeGroup.add(snake);
       }
     }





