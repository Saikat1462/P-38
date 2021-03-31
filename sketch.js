var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("images/dogImg.png");
happyDog=loadImage("images/dogImg1.png");
garden=loadImage("images/Garden.png");
washroom=loadImage("images/Wash Room.png");
bedroom=loadImage("images/Bed Room.png");
livingroom=loadImage("images/Living Room.png")
}

function setup() {
  database=firebase.database();
  createCanvas(315,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(200,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(360,65);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(460,65);
  addFood.mousePressed(addFoods);
}

function draw() {
  currentTime=hour();
  foodObj.display();

  if(gameState===1){
    dog.addImage(happyDog)
    dog.scale=0.175
    dog.y=300
  }

  if(gameState===2){
    dog.addImage(sadDog)
    dog.scale=0.175

  }

  var Bath=createButton("I want to take bath")
  Bath.position(370,95)
  if(Bath.mousePressed(function(){
    gameState=3
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState===3){
    dog.addImage(washroom)
    dog.x=158
    dog.y=250
    dog.scale=0.64 
  }

  var Sleep=createButton("I am very sleepy")
  Sleep.position(500,95)
  if(Sleep.mousePressed(function(){
    gameState=4
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState===4){
    dog.addImage(bedroom)
    dog.x=158
    dog.y=250
    dog.scale=0.64
  }

  var Play=createButton("Lets Play !")
  Play.position(540,65)
  if(Play.mousePressed(function(){
    gameState=5
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState===5){
    dog.addImage(livingroom)
    dog.x=158
    dog.y=250
    dog.scale=0.64
  }

  var PlayInGarden=createButton("Lets play in park")
  PlayInGarden.position(440,125)
  if(PlayInGarden.mousePressed(function(){
    gameState=6
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState===6){
    dog.addImage(garden)
    dog.x=158
    dog.y=250
    dog.scale=0.64
  }

  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  gameState=1

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  gameState=2
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}