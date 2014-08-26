var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 1000;

var playerTwo = {
  x: 900,
  y: 300,
  lives: 4,
  width: 60, 
  height: 66,
  magazine: 20,
  playable: true,
  hasBullets: true,
  draw: function() {
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
};

var playerTwoBullets = [];

function TwoBullet(J) {
  J.active = true;

  J.source = playerTwo;
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
  if (playerTwo.magazine < 20 && playerTwo.magazine >= 0) {
    playerTwo.magazine++;
  }
  if (playerTwo.magazine >= 0) { playerTwo.hasBullets = true; }
}, 1500);

playerTwo.update = function() {
  if (this.playable) {
    if (keydown.space && this.hasBullets) {
      this.shoot();
    }
    if (keydown.left) {
      console.log('moving left');
      this.x -= 5;
    }
    if (keydown.right) {
      console.log('moving right');
      this.x += 5;
    }
    if (keydown.up) {
      console.log('moving up');
      this.y -= 5;
    }
    if (keydown.down) {
      console.log('moving down');
      this.y += 5;
    }

    this.x = this.x.clamp(CANVAS_WIDTH / 2, 1000 - this.width);
    this.y = this.y.clamp(0, CANVAS_HEIGHT - this.height);

    playerTwoBullets.forEach(function(bullet) {
      bullet.update();
    });

    playerTwoBullets = playerTwoBullets.filter(function(bullet) {
      return bullet.active;
    });
  }
};

playerTwo.shoot = function() {
  Sound.play("shoot");
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
  Sound.play("explosion");
  if (this.lives > 0) { this.lives--; }
  else { 
    this.playable = false; 
    // gameOver();
  }
};

playerTwo.sprite = Sprite("ship2");

playerTwo.draw = function() {
  if (this.playable) {
    this.sprite.draw(context, this.x, this.y);
  }
};
