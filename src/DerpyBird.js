var DerpyBird = function() {
  this.timeout;
  this.altitude;
  this.lives = 3;
  this.speed = 0;
  this.gravity = 1;
  this.flap = -15;
  this.flappable = true;
  this.flapping = false;
  this.rotation = 0;
  this.dead = false;
};

DerpyBird.prototype.move = function() {
  this.speed += this.gravity;
  if (this.speed > 5) {
    this.speed = 5;
  }
  this.altitude += this.speed;
  this.rotation();
  this.timeout = setTimeout(this.move.bind(this), 10);
};

DerpyBird.prototype.flap = function() {
  if (this.flappable) {
    this.speed = this.flap;
  }
};

DerpyBird.prototype.dead = function() {
  this.dead = true;
  //TODO: add 90-degree rotation once you figure out how
};

DerpyBird.prototype.rotation = function() {};

DerpyBird.BirdOne = function() {
  new DerpyBird();
  this.drawBirdOne();
};

DerpyBird.BirdTwo = function() {
  new DerpyBird();
  this.drawBirdTwo();
};

DerpyBird.BirdOne.prototype.drawBirdOne = function() {
  var context = $('#canvas')[0].getContext('2d');
  var birdOne = new Image();
  birdOne.src = "images/DerpyBird.png";
  birdOne.onload = function() {
    context.drawImage(birdOne, 75, 170);
  }; 
};

DerpyBird.BirdTwo.prototype.drawBirdTwo = function() {
  var context = $('#canvas')[0].getContext('2d');
  var birdTwo = new Image();
  birdTwo.src = "images/DerpyBird2.png";
  birdTwo.onload = function() {
    context.drawImage(birdTwo, 875, 170);
  };
};
