var happyDog, dogimg;
var dog;
var foodS,foodStock;
var count;
var database;
function preload()
{
  //load images here
  happyDog = loadImage("happydog.png");
  dogimg = loadImage("Dog.png");
  milkimg = loadImage("Milk.png");
}
function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
 
  dog = createSprite(250,250,30,30);
  dog.scale = 0.2;
 
  dog.addImage(dogimg);
 text("food left : " + foodStock,200,150);
  feed = createButton("feed dog");
  feed.position(400,200);
  feed.mousePressed(writeStock);
  addFoodB = createButton("add food");
  addFoodB.position(400,230);
  addFoodB.mousePressed(addFood);

}

function draw() {  
  background(46,139,87);
  
   // writeStock(foodS);
    dog.addImage(happyDog);
 displayBottles();
  
  textSize(15);
  fill("red");
  stroke(2);
  text("food left : " + foodS,200,180);
  
    drawSprites();
    //add styles here
  
  }
  
  
  function readStock (data) {
    foodS=data.val();
  }
  
  function writeStock() {
  x=foodS
  dog.addImage(happyDog);
    if(x<=0) {
      x=0;
    }else{
      x=x-1;
      database.ref('/').update({
        food:x
    })
    }
   
    }

    function displayBottles () {
      var x =80,y=20;
      imageMode(CENTER);
     // image(milkimg,400,400,70,70);
      if (foodS !== 0) {
        for(var i=0; i<foodS; i++) {
          if(i%10 === 0) {
            x = 80;
            y = y+50;

          }
          image (milkimg,x,y,50,50);
          x = x+30;

        }
      }
    }

    function addFood () {
      foodS++;
      database.ref('/').update({
        food:foodS
    })
    }