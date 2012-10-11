function Game(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.currentPlayer = null;
  this.diceRoller = new DiceRoller();
  this.createPoints();
  this.deadCheckers = [];

  this.player1Graveyard = new Point();
  this.player2Graveyard = new Point();
}

Game.prototype.start = function() {
  this.putCheckers(2, this.player1, 24);
  this.putCheckers(5, this.player1, 13);
  this.putCheckers(3, this.player1, 8);
  this.putCheckers(5, this.player1, 6);

  this.putCheckers(2, this.player2, 1);
  this.putCheckers(5, this.player2, 12);
  this.putCheckers(3, this.player2, 17);
  this.putCheckers(5, this.player2, 19);

  this.diceRoller.rollUntilNotPair();
  if (this.diceRoller.firstValue > this.diceRoller.secondValue) {
    this.setCurrenyPlayer(this.player1);
  } else {
    this.setCurrenyPlayer(this.player2);
  }

  this.markStarted();
}

Game.prototype.availableMoves = function() {
  var moves = [];

  for (var i = 0; i < 26; i++) {
    for (var j = 1; j < 25; j++) {
      if (this.canMove(i, j)) {
        moves.push({from: i, to: j});
      }
    }
  }

  return moves;
}

// sourcePointNr: 1-24 for default points. Use 0 and 25 for
// dead checkers.
Game.prototype.canMove = function(sourcePointNr, targetPointNr) {
  var sourcePoint = this.getPoint(sourcePointNr);
  var targetPoint = this.getPoint(targetPointNr);

  if (!this.isCorrectDirection(sourcePointNr, targetPointNr, this.currentPlayer)) {
    return false;
  }

  var graveyard = this.currentPlayerGraveyard();
  if (graveyard.checkersCount() > 0 && sourcePoint != graveyard) {
    return false;
  }

  if (sourcePoint.playerCheckersCount(this.currentPlayer) == 0) {
    return false;
  }

  if (targetPoint.otherPlayerCheckersCount(this.currentPlayer) >= 2) {
    return false;
  }

  var distance = Math.abs(targetPointNr - sourcePointNr);
  return this.diceRoller.hasValue(distance);
}

Game.prototype.moveChecker = function(sourcePointNr, targetPointNr) {
  if (this.diceRoller.valuesLeft() == 0) {
    throw "No moves left";
  }

  if (!this.canMove(sourcePointNr, targetPointNr)) {
    throw "Invalid move";
  }

  var sourcePoint = this.getPoint(sourcePointNr);
  var checker = sourcePoint.popChecker();

  var targetPoint = this.getPoint(targetPointNr);
  targetPoint.addChecker(checker);

  var checker = targetPoint.firstChecker();
  if (checker.getPlayer() != this.currentPlayer) {
    targetPoint.removeChecker(checker);
    this.deadCheckers.push(checker);
  }

  var distance = Math.abs(targetPointNr - sourcePointNr);

  this.diceRoller.useValue(distance);
  if (this.diceRoller.valuesLeft() == 0) {
    this.switchPlayer();
  }
}

Game.prototype.currentPlayerGraveyard = function() {
  if (this.currentPlayer == this.player1) {
    return this.getPoint(25);
  } else {
    return this.getPoint(0);
  }
}

Game.prototype.getPoint = function(id) {
  if (id == 25) {
    return this.player1Graveyard;
  } else if (id == 0) {
    return this.player2Graveyard;
  } else {
    return this.points[id - 1];
  }
}

Game.prototype.switchPlayer = function() {
  if (this.currentPlayer == this.player1) {
    this.currentPlayer = this.player2;
  } else {
    this.currentPlayer = this.player1;
  }
}

Game.prototype.markStarted = function() {
  this.isStarted = true;
}

Game.prototype.setCurrenyPlayer = function(player) {
  this.currentPlayer = player;
}

Game.prototype.putCheckers = function(count, player, position) {
  var checker;
  var point = this.getPoint(position);

  for (i = 0; i < count; i++) {
    checker = new Checker(player);
    point.addChecker(checker);
  }
}

Game.prototype.createPoints = function() {
  this.points = [];
  for (var i = 0; i < 24; i++) {
    this.points.push(new Point());
  }
}

Game.prototype.isCorrectDirection = function(sourceNr, targetNr, player) {
  if (player == this.player1) {
    return sourceNr > targetNr;
  } else {
    return targetNr > sourceNr;
  }
}
