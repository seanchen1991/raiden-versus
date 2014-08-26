var playerOne = {
  x: 100,
  y: CANVAS_HEIGHT / 2,
  width: 60,
  height: 91,
  active: true,
  magazine: 20,
  playable: false,
  hasBullets: true,
  draw: function() {
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
};

var playerOneBullets = [];

function OneBullet(I) {
  I.active = true;

  I.xVelocity = -I.speed;
  I.yVelocity = 0;
  I.width = 5;
  I.height = 5;

  I.inBounds = function() {
    return I.y >= 0 && I.y <= CANVAS_WIDTH && 
      I.x >= 0 && I.x <= CANVAS_WIDTH; 
  };

  I.sprite = Sprite("bullet1");

  I.draw = function() {
    this.sprite.draw(context, this.x, this.y);
  };

  I.update = function() {
    I.x -= I.xVelocity;
    I.y -= I.yVelocity;

    I.active = I.active && I.inBounds();
  };

  I.explode = function() {
    this.active = false;
  };

  return I;
}

setInterval(function() {
  update();
  draw();
}, 1000/FPS);

setInterval(function() {
  if (playerOne.magazine < 20 && playerOne.magazine >= 0) {
    playerOne.magazine++;
  }
  if (playerOne.magazine >= 0) { playerOne.hasBullets = true; }
}, 1500);

function update() {
  if (keydown.space && playerOne.hasBullets) {
    playerOne.shoot();
  }
  if (keydown.left) {
    playerOne.x -= 5;
  }
  if (keydown.right) {
    playerOne.x += 5; 
  }
  if (keydown.up) {
    playerOne.y -= 5;
  }
  if (keydown.down) {
    playerOne.y += 5;
  }

  playerOne.x = playerOne.x.clamp(0, CANVAS_WIDTH / 2 - playerOne.width);
  playerOne.y = playerOne.y.clamp(0, CANVAS_HEIGHT - playerOne.height);

  playerOneBullets.forEach(function(bullet) {
    bullet.update();
  });

  playerOneBullets = playerOneBullets.filter(function(bullet) {
    return bullet.active;
  });


/*    powerUps.forEach(function(powerUp) {
    powerUp.update();
  });

  powerUps = powerUps.filter(function(powerUp) {
    return powerUp.active;
  });*/

  // handleCollisions();

}

playerOne.shoot = function() {
  // Sound.play("shoot");
  var bulletPosition = this.midPoint();

  playerOneBullets.push(OneBullet ({
    speed: 10,
    x: bulletPosition.x,
    y: bulletPosition.y
  }));
  if (this.magazine === 0) { this.hasBullets = false; }
  else { this.hasBullets = true; }
  if (this.hasBullets) { this.magazine--; }
};


playerOne.midPoint = function () {
  return {
    x: this.x + this.width/2,
    y: this.y + this.height/2
  };
};

function draw() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  playerOne.draw();
  // playerTwo.draw();

  playerOneBullets.forEach(function(bullet) {
    bullet.draw();
  });

/*    playerTwoBullets.forEach(function(bullet) {
    bullet.draw();
  });*/

/*    powerUps.forEach(function(powerUp) {
    powerUp.draw();
  });*/
}

function collides(a, b) {
  return a.x < b.x + b.width &&
  a.x + a.width > b.x &&
  a.y < b.y + b.height &&
  a.y + a.height > b.y;
}

/*  function handleCollisions() {
  playerOneBullets.forEach(function(bullet) {
    if (collides(bullet, playerTwo) {
      playerTwo.explode();
      bullet.active = false;
    })
  });
  playerTwoBullets.forEach(function(bullet) {
    if (collides(bullet, playerOne) {
      playerOne.explode();
      bullet.active = false;
    })
  });
}*/

playerOne.explode = function() {
  this.active = false;
};

playerOne.sprite = Sprite("ship1");

playerOne.draw = function() {
  this.playable = true;
  this.sprite.draw(context, this.x, this.y);
};

//TODO: Add game over functionality

