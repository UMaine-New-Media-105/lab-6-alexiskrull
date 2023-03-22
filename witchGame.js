function setup() {
  createCanvas(400, 400);
  //starting point of witch
  witchY = 150;
  witchX = 150;
  size = 1.5; //size scale for both sprites
  changeDist = 40
  collisionDist = 30; //min dist between to "collide"
  //book starting point, randomized anywhere on screen, minus collision distance for buffer
  bookX = random(width - collisionDist);
  bookY = random(height - collisionDist);
  collected = false; //starts not being collected
  speed = 9; //speed of witch
  num = 0; //tally of pages collected
}

function draw() {
  background(220);

  //if no page is collected & total is already < or = to 4
  if (collected == false && num <= 4) {
    addSpellbook(bookX, bookY, size); //spawn another page
  } else if (collected == true && num == 5) { //if a page is collected & total is at 5 pages
    //do nothing
  }
  
  addWitch(witchX, witchY, size); //origianl add of witch

  if (dist(witchX, witchY, bookX, bookY) < changeDist) {
    //if within distance
    collected = true; //consider it collected
  } else {
    collected = false; //not collected
  }
  
  if ((dist(witchX, witchY, bookX, bookY) < collisionDist) && num <= 4) { //if collide and < = to 4 pages have been collected, spawn more
      needMore();
      console.log("You've found " + num + " spellbook pages!");
    } else if (num == 5){
      console.log("You win! You found all 5 spellbook pages!");
      console.log("Press the play button to play again!")
      noLoop();
    }
}

function addWitch(x, y, size) {
  push();
  translate(x, y);
  scale(size);
  if (collected == true) {
    fill("olivedrab");
  } else {
    fill("black");
  }
  stroke("purple");
  strokeWeight(2);
  ellipse(0, 12, 30, 10);
  triangle(-10, 11, 10, 11, 0, -9);
  pop();
}

function addSpellbook(x, y, size) {
  push();
  translate(x, y);
  scale(size);
  //spell page background
  fill("moccasin");
  rect(0, 0, 10, 15);
  //spell page sigil
  fill("red");
  ellipse(5, 4, 4);
  //spell page writing
  line(2, 8, 8, 8);
  line(2, 10, 8, 10);
  line(2, 12, 8, 12);
  pop();
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    //move up
    witchY -= speed;
  }
  if (keyCode == DOWN_ARROW) {
    //move up
    witchY += speed;
  }
  if (keyCode == LEFT_ARROW) {
    //move up
    witchX -= speed;
  }
  if (keyCode == RIGHT_ARROW) {
    //move up
    witchX += speed;
  }
}

//spawn new spellbook page when called
function needMore() {
  num = num + 1;
  bookX = random(width - collisionDist);
  bookY = random(height - collisionDist);
}
