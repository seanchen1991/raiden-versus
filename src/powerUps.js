powerUps = [];

function PowerUp(K) {
  K = K || {};

  K.active = true;
  K.age = Math.floor(Math.random() * 128);

  K.color = "#A2B";

  K.x = 1000 / 4 + Math.random() * 1000 / 2;
  K.y = 0;
  K.xVelocity = 0;
  K.yVelocity = 3;

  K.width = 50;
  K.height = 50;

  K.inBounds = function() {
    return K.x >= 0 && K.x <= 1000 &&
    K.y >= 0 && K.y <= 600;
  };

  K.draw = function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };

  K.update = function() {
    K.x += K.xVelocity;
    K.y += K.yVelocity;

    K.xVelocity = 3 * Math.sin(K.age * Math.PI / 64);

    K.age++;

    K.active = K.active && K.inBounds();
  };

  return K;
}

PowerUp.update = function() {
  powerUps.forEach(function(powerUp) {
    powerUp.update();
  });

  powerUps = powerUps.filter(function(powerUp) {
    return powerUp.active;
  });
};
