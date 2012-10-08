function Game(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.currentPlayer = null;
  this.diceRoller = new DiceRoller();
  this.createPoints();
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

Game.prototype.canMove = function(sourcePointNr, targetPointNr) {
  var sourcePoint = this.getPoint(sourcePointNr);
  var targetPoint = this.getPoint(targetPointNr);

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
  // TODO
  return;
}

Game.prototype.getPoint = function(id) {
  return this.points[id - 1];
}

Game.prototype.markStarted = function() {
  this.isStarted = true;
}

Game.prototype.setCurrenyPlayer = function(player) {
  this.currentPlayer = player;
}

Game.prototype.putCheckers = function(count, player, position) {
  var checker;
  var point = this.getPoint(position)

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
