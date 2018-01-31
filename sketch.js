var p1 = {
  score: 0,
  pos: 250,
}
var p2 = {
  score: 0,
  pos: 250,
};
var timer = 0;
var keys;
var ball = {
  dt: 5,
  x: 400,
  y: 300,
  dx: 0,
  dy: 0,
};
function reset() {
  randomize();
  ball.dt = constrain(5 + (p1.score + p2.score) / 2,5,8);
  p1.score = 0;
  p2.score = 0;
  p1.pos = 250;
  p2.pos = 250;
  ball.x = 400;
  ball.y = 300;
  timer = frameCount;
}
function randomize() {
  var randX = random();
  var randY = random();
  if (randX > 0.5) {
    ball.dx = random(ball.dt / 3,ball.dt);
  }
  else {
    ball.dx = -random(ball.dt / 3,ball.dt);
  }
  if (randY > 0.5) {
    ball.dy = sqrt(sq(ball.dt)-sq(ball.dx));
  }
  else {
    ball.dy = -sqrt(sq(ball.dt)-sq(ball.dx));
  }
}

function setup() {
  createCanvas(800,600);
  noStroke();
  randomize();
}

function draw() {
  background(0);
  fill(0,0,255,50);
  rect(400,0,400,200);
  rect(400,400,400,200);
  fill(255);
  for(var i = 0; i < 12; i ++) {
    if (i%2 === 0) {
      rect(390,30+50*i,20,40);
    }
  }
  fill(255);
  textSize(30);
  text(p1.score,175,50);
  text(p2.score,625,50);
  ellipse(ball.x,ball.y,20,20);
  rect(10,p1.pos,10,100);
  rect(780,p2.pos,10,100);
  if (frameCount - timer > 50) {
    if (keyIsPressed) {
      if (keyCode === 40) {
        p1.pos = constrain(p1.pos + 3 + (p1.score + p2.score) / 2, 10, 490);
      }
      if (keyCode === 38) {
        p1.pos = constrain(p1.pos - 3 - (p1.score + p2.score) / 2, 10, 490);
      }
    }
    if (mouseY > 400) {
      p2.pos = constrain(p2.pos + 3 + (p1.score + p2.score) / 2, 10, 490);
    }
    else if (mouseY < 200) {
      p2.pos = constrain(p2.pos - 3 - (p1.score + p2.score) / 2, 10, 490);
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.y <= 10 || ball.y >= 590) {
      ball.dy *= -1;
    }
    if ((ball.x <= 30 && p1.pos < ball.y && p1.pos + 100 > ball.y) || (ball.x
       >= 770 && p2.pos < ball.y && p2.pos + 100 > ball.y)) {
      ball.dx *= -1
    }
  }
  if (ball.x < 25) {
    var store1 = p1.score;
    var store2 = p2.score;
    reset();
    p1.score = store1;
    p2.score = store2;
    p2.score++;
  }
  if (ball.x > 775) {
    var store1 = p1.score;
    var store2 = p2.score;
    reset();
    p1.score = store1;
    p2.score = store2;
    p1.score++;
  }
}

function mousePressed() {
  reset();
}
