var CANVAS_HEIGHT = 600;
var CANVAS_WIDTH = 1000;

var playerOne = {
  x: 100,
  y: 300,
  lives: 4,
  width: 60,
  height: 91,
  magazine: 20,
  playable: true,
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
  if (playerOne.magazine < 20 && playerOne.magazine >= 0) {
    playerOne.magazine++;
  }
  if (playerOne.magazine >= 0) { playerOne.hasBullets = true; }
}, 1500);

playerOne.update = function() {
  if (this.playable) {
    if (keydown.c && this.hasBullets) {
      this.shoot();
    }
    if (keydown.a) {
      this.x -= 5;
    }
    if (keydown.d) {
      this.x += 5; 
    }
    if (keydown.w) {
      this.y -= 5;
    }
    if (keydown.s) {
      this.y += 5;
    }

    this.x = this.x.clamp(0, CANVAS_WIDTH / 2 - this.width);
    this.y = this.y.clamp(0, CANVAS_HEIGHT - this.height);

    playerOneBullets.forEach(function(bullet) {
      bullet.update();
    });

    playerOneBullets = playerOneBullets.filter(function(bullet) {
      return bullet.active;
    });
  }
};

playerOne.shoot = function() {
  Sound.play("shoot");
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


playerOne.explode = function() {
  Sound.play("explosion");
  if (this.lives > 0) { this.lives--; }
  else { 
    this.playable = false;
    // gameOver();
  }
};

playerOne.sprite = Sprite("ship1");

playerOne.draw = function() {
  if (this.playable) {
    this.sprite.draw(context, this.x, this.y);
  }
};

/*playerOne.drawScore = function() {
  context.clearRect(0, 0, 150, 150);
  context.font = "40px sans-serif";
  context.fillStyle = 'red';
  context.fillText(this.lives, 100, 100);
};*/

//TODO: Add game over functionality

