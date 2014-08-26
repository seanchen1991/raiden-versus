var startGame = false;

$(document).ready(function() {
  var birdOne = new DerpyBird.BirdOne();
  var birdTwo = new DerpyBird.BirdTwo();

  start();
});

function start() {
  new DerpyBird.Controller();
}

DerpyBird.Controller = function() {
  
};
