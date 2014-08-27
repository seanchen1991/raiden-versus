powerUps = [];

function PowerUpOne(K) {
  K = K || {};

  K.active = true;
  K.age = Math.floor(Math.random() * 128);

  K.x = Math.random() * 1000;
  K.y = 0;
  K.xVelocity = 0;
  K.yVelocity = 3;

  K.width = 50;
  K.height = 50;

  K.inBounds = function() {
    return K.x >= 0 && K.x <= 1000 &&
    K.y >= 0 && K.y <= 600;
  };

  K.sprite = Sprite("powerUp1");

  K.draw = function() {
    this.sprite.draw(context, this.x, this.y);
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


function PowerUpTwo(M) {
  M = M || {};

  M.active = true;
  M.age = Math.floor(Math.random() * 128);

  M.x = Math.random() * 1000;
  M.y = 0;
  M.xVelocity = 0;
  M.yVelocity = 3;

  M.width = 50;
  M.height = 50;

  M.inBounds = function() {
    return M.x >= 0 && M.x <= 1000 &&
    M.y >= 0 && M.y <= 600;
  };

  M.sprite = Sprite("powerUp2");

  M.draw = function() {
    this.sprite.draw(context, this.x, this.y);
  };

  M.update = function() {
    M.x += M.xVelocity;
    M.y += M.yVelocity;

    M.xVelocity = 3 * Math.sin(M.age * Math.PI / 64);

    M.age++;

    M.active = M.active && M.inBounds();
  };

  return M;
}

PowerUp.update = function() {
  powerUps.forEach(function(powerUp) {
    powerUp.update();
  });

  powerUps = powerUps.filter(function(powerUp) {
    return powerUp.active;
  });
};

function PowerUpThree(N) {
  N = N || {};

  N.active = true;
  N.age = Math.floor(Math.random() * 128);

  N.x = Math.random() * 1000;
  N.y = 0;
  N.xVelocity = 0;
  N.yVelocity = 3;

  N.width = 50;
  N.height = 50;

  N.inBounds = function() {
    return N.x >= 0 && N.x <= 1000 &&
    N.y >= 0 && N.y <= 600;
  };

  N.sprite = Sprite("powerUp3");

  N.draw = function() {
    this.sprite.draw(context, this.x, this.y);
  };

  N.update = function() {
    N.x += N.xVelocity;
    N.y += N.yVelocity;

    N.xVelocity = 3 * Math.sin(N.age * Math.PI / 64);

    N.age++;

    N.active = N.active && N.inBounds();
  };

  return N;
}

setInterval(function() {
  if (Math.random() > 0.8) {
    if (Math.round(Math.random()) < 33) {
      powerUps.push(PowerUpOne());
    } else if (Math.round(Math.random()) > 66) {
      powerUp.push(PowerUpTwo());
    } else {
      powerUps.push(PowerUpThree());
    }
  }
}, 3000);
