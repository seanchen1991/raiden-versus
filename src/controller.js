DerpyBird.PlayingState = { Watching: 0, Joining: 1, Playing: 2 };
DerpyBird.Controller = function(birdRef) {
  this.birdRef = birdRef;
  this.playingState = DerpyBird.PlayingState.Watching;
  this.waitToJoin();
};

DerpyBird.Controller.prototype.createBirds = function() {
  this.birds = [];
  for (var i = 0, x = 1; i < x; i++) {
    var playerRef = this.birdRef.child('player' + i);
    this.birds.push(new DerpyBird.Bird());
  }
};

DerpyBird.Controller.prototype.waitToJoin = function() {
  var self = this;

  this.birdRef.child('player0/online').on('value', function(onlineSnap) {
    if (onlineSnap.val() === null && self.playingState === DerpyBird.PlayingState.Watching) {
      self.tryToJoin(0);
    }
  });

  this.birdRef.child('player1/online').on('value', function(onlineSnap) {
    if (onlineSnap.val() === null && self.playingState === DerpyBird.PlayingState.Watching) {
      self.tryToJoin(1);
    }
  });
};

// Try to join the game as the specified playerNum
DerpyBird.Controller.prototype.tryToJoin = function(playerNum) {
  this.playingState = DerpyBird.PlayingState.Joining;
  var self = this;
  this.birdRef.child('player' + playerNum + '/online').transaction(function(onlineVal) {
    if (onlineVal === null) {
      return true;
    } else {
      return;
    }
  }, function(error, committed) {
    if (committed) {
      self.playingState = DerpyBird.PlayingState.Playing;
      self.startPlaying(playerNum);
    } else {
      self.playingState = DerpyBird.PlayingState.Watching;
    }
  });
};

DerpyBird.Controller.prototype.startPlaying = function(playerNum) {
  this.myPlayerRef = this.birdRef.child('player', playerNum);
  this.opponentPlayerRef = this.birdRef.child('player' + (1 - playerNum));
  this.myBird = this.birds[playerNum];  //TODO: Need to implement this
  this.myBird.isMyBird = true;

  this.myPlayerRef.child('online').onDisconnect().remove();

  this.initializeBird();
  this.enableKeyboard();
  this.resetGravity();
};
