var DerpyBird = function() {
  this.timeout;
  this.altitude;
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
