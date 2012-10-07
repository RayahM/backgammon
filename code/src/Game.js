function Game(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
}

Game.prototype.start = function() {
  this.points = [];

  this._createPoints();

  this._putCheckers(2, this.player1, 24);
  this._putCheckers(5, this.player1, 13);
  this._putCheckers(3, this.player1, 8);
  this._putCheckers(5, this.player1, 6);

  this._putCheckers(2, this.player2, 1);
  this._putCheckers(5, this.player2, 12);
  this._putCheckers(3, this.player2, 17);
  this._putCheckers(5, this.player2, 19);

  this.isStarted = true;
}

Game.prototype.getPoint = function(id) {
  return this.points[id - 1];
}

Game.prototype._createPoints = function() {
  for (var i = 0; i < 24; i++) {
    this.points.push(new Point());
  }
}

Game.prototype._putCheckers = function(count, player, position) {
  var checker;
  var point = this.getPoint(position)

  for (i = 0; i < count; i++) {
    checker = new Checker(player);
    point.addChecker(checker);
  }
}
