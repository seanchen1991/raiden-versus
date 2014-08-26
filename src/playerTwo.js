var playerTwo = {
  x: 900,
  y: CANVAS_HEIGHT / 2,
  width: 60, 
  heigh: 66,
  active: true,
  magazine: 20,
  playable: false,
  hasBullets: true,
  draw: function() {
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
};

var playerTwoBullets = [];

function TwoBullet(J) {
  J.active = true;

  J.xVelocity = -J.speed;
  J.yVelocity = 0;
  J.width = 5;
  J.height = 5;

  J.inBounds = function() {
    return J.y >= 0 && J.y <= CANVAS_WIDTH && 
    J.x >= 0 && J.x <= CANVAS_WIDTH;
  };

  J.sprite = Sprite("bullet2");

  J.draw = function() {
    this.sprite.draw(context, this.x, this.y);
  };

  J.update = function() {
    J.x += J.xVelocity;
    J.y += J.yVelocity;

    J.active = J.active && J.inBounds();
  };

  J.explode = function() {
    this.active = false;
  };

  return J;
}

setInterval(function() {
  update();
  draw();
}, 1000/FPS);

setInterval(function() {
  if (playerTwo.magazine < 20 && playerTwo.magazine >= 0) {
    playerTwo.magazine++;
  }
  if (playerTwo.magazine >= 0) { playerTwo.hasBullets = true; }
}, 1500);

function update() {
  if (keydown.space && playerTwo.hasBullets) {
    playerTwo.shoot();
  }
  if (keydown.left) {
    playerTwo.x -= 5;
  }
  if (keydown.right) {
    playerTwo.x += 5;
  }
  if (keydown.up) {
    playerTwo.y -= 5;
  }
  if (keydown.down) {
    playerTwo.y += 5;
  }

  playerTwo.x = playerTwo.x.clamp(CANVAS_WIDTH / 2, 1000);
  playerTwo.y = playerTwo.y.clamp(0, CANVAS_HEIGHT - playerTwo.height);

  playerTwoBullets.forEach(function(bullet) {
    bullet.update();
  });

  playerTwoBullets = playerTwoBullets.filter(function(bullet) {
    return bullet.active;
  });

  // handleCollisions();
}

playerTwo.shoot = function() {
  var bulletPosition = this.midPoint();

  playerTwoBullets.push(TwoBullet ({
    speed: 10,
    x: bulletPosition.x,
    y: bulletPosition.y
  }));
  if (this.magazine === 0) { this.hasBullets = false; }
  else { this.hasBullets = true; }
  if (this.hasBullets) { this.magazine--; }
};

playerTwo.midPoint = function() {
  return {
    x: this.x + this.width/2,
    y: this.y + this.height/2
  };
};

playerTwo.explode = function() {
  this.active = false;
};

playerTwo.sprite = Sprite("ship2");

playerTwo.draw = function() {
  this.playable = true;
  this.sprite.draw(context, this.x, this.y);
};
