describe("Game", function() {
  var player1,
      player2,
      game;

  var point = function(nr) {
    return game.getPoint(nr);
  }

  beforeEach(function() {
    player1 = new Player();
    player2 = new Player();
    game = new Game(player1, player2);
  });

  describe("#start", function() {
    describe("in general", function() {
      beforeEach(function() {
        game.start();
      });

      it("marks game as started", function() {
        expect(game.isStarted).toBeTruthy();
      });

      it("sets 2 checkers on player1 24-point", function() {
        var point = game.getPoint(24);
        expect(point.checkersCount()).toBe(2);
      });

      it("sets 5 checkers on player1 13-point", function() {
        var point = game.getPoint(13);
        expect(point.checkersCount()).toBe(5);
      });

      it("sets 3 checkers on player1 8-point", function() {
        var point = game.getPoint(8);
        expect(point.checkersCount()).toBe(3);
      });

      it("sets 5 checkers on player1 6-point", function() {
        var point = game.getPoint(6);
        expect(point.checkersCount()).toBe(5);
      });

      it("sets 2 checkers on player2 1-point", function() {
        var point = game.getPoint(1);
        expect(point.checkersCount()).toBe(2);
      });

      it("sets 5 checkers on player2 12-point", function() {
        var point = game.getPoint(12);
        expect(point.checkersCount()).toBe(5);
      });

      it("sets 3 checkers on player2 17-point", function() {
        var point = game.getPoint(17);
        expect(point.checkersCount()).toBe(3);
      });

      it("sets 5 checkers on player2 19-point", function() {
        var point = game.getPoint(19);
        expect(point.checkersCount()).toBe(5);
      });

      it("rolls dice", function() {
        var result = game.diceRoller;
        expect(result.firstValue).not.toBeNull();
      });
    });

    describe("when first player wins dice roll", function() {
      var diceRoller;

      beforeEach(function() {
        diceRoller = new DiceRoller();
        diceRoller.rollUntilNotPair = function() {};
        diceRoller.firstValue = 5;
        diceRoller.secondValue = 3;

        game.diceRoller = diceRoller;
        game.start();
      });

      it("marks first player as current", function() {
        expect(game.currentPlayer).toBe(player1);
      });
    });

    describe("when second player wins dice roll", function() {
      var diceRoller;

      beforeEach(function() {
        diceRoller = new DiceRoller();
        diceRoller.rollUntilNotPair = function() {};
        diceRoller.firstValue = 3;
        diceRoller.secondValue = 5;

        game.diceRoller = diceRoller;
        game.start();
      });

      it("marks second player as current", function() {
        expect(game.currentPlayer).toBe(player2);
      });
    });
  });

  describe("#canMove", function() {
    var diceRoller;

    beforeEach(function() {
      diceRoller = new DiceRoller();
      diceRoller.hasValue = function(value) { return true };

      game.markStarted();
      game.setCurrentPlayer(player1);
      game.diceRoller = diceRoller;
    });

    describe("in general", function() {
      beforeEach(function() {
        game.putCheckers(2, player1, 8);
        game.putCheckers(2, player1, 6);
      });

      it("returns true when move is possible", function() {
        expect(game.canMove(point(8), point(6))).toBe(true);
      });

      it("return false when source position does not have a checker", function() {
        expect(game.canMove(point(9), point(7))).toBe(false);
      });

      it("returns false when dice values are different", function() {
        diceRoller.hasValue = function(value) { return false };
        expect(game.canMove(point(8), point(5))).toBe(false);
      });

      it("returns true when target position has only one opponent checker", function() {
        game.putCheckers(1, player2, 5);
        expect(game.canMove(point(8), point(5))).toBe(true);
      });

      it("returns false when target position has more than one opponent checkers", function() {
        game.putCheckers(2, player2, 5);
        expect(game.canMove(point(8), point(5))).toBe(false);
      });

      it("returns false when trying to move other player checker", function() {
        game.putCheckers(2, player2, 5);
        expect(game.canMove(point(5), point(3))).toBe(false);
      });

      it("returns false when trying to move checker to opposite direction", function() {
        expect(game.canMove(point(6), point(8))).toBe(false);
      });
    });

    describe("when there is a checker in no man's land", function() {
      it("returns true when trying it to move to a free point", function() {
        var graveyard = game.player1Graveyard;
        graveyard.addChecker(new Checker(game.player1));
        expect(game.canMove(graveyard, point(23))).toBe(true);
      });

      it("returns false when trying to move other checkers", function() {
        var graveyard = game.player1Graveyard;
        graveyard.addChecker(new Checker(game.player1));
        expect(game.canMove(point(8), point(6))).toBe(false);
      });
    });

    describe("when trying to move to home", function() {
      var home;
      beforeEach(function() {
        home = game.player1Home;
      });

      it("returns true", function() {
        game.putCheckers(2, player1, 4);
        expect(game.canMove(point(4), home)).toBe(true);
      });

      it("returns true when dice value is larger than highest checker", function() {
        diceRoller.hasValue = function(value) { return (value == 5) };
        game.putCheckers(2, player1, 4);
        expect(game.canMove(point(4), home)).toBe(true);
      });

      it("returns false when some checkers are out", function() {
        game.putCheckers(2, player1, 10);
        game.putCheckers(2, player1, 4);
        expect(game.canMove(point(4), home)).toBe(false);
      });
    });
  });

  describe("#moveChecker", function() {
    var numberGenerator;
    var diceRoller;

    beforeEach(function() {
      numberGenerator = new MockDiceNumberGenerator();
      diceRoller = new DiceRoller();
      diceRoller.numberGenerator = numberGenerator;

      game.markStarted();
      game.setCurrentPlayer(player1);
      game.diceRoller = diceRoller;
    });

    describe("moving checker to already owned point", function() {
      beforeEach(function() {
        numberGenerator.addNextPair(2, 5);
        diceRoller.roll();

        game.putCheckers(2, player1, 8);
        game.putCheckers(2, player1, 6);
        game.moveChecker(point(8), point(6));
      });

      it("removes a checker from source point", function() {
        expect(point(8).checkersCount()).toBe(1);
      });

      it("adds a checker to the target point", function() {
        expect(point(6).checkersCount()).toBe(3);
      });
    });

    describe("hitting opponent checker", function() {
      beforeEach(function() {
        numberGenerator.addNextPair(2, 5);
        diceRoller.roll();

        game.putCheckers(2, player1, 8);
        game.putCheckers(1, player2, 6);

        game.moveChecker(point(8), point(6));
      });

      it("removes a checker from source point", function() {
        expect(point(8).checkersCount()).toBe(1);
      });

      it("removes opponent checker from the target point", function() {
        var point = game.getPoint(6);
        var checker = point.firstChecker();
        expect(checker.getPlayer()).toBe(player1);
      });

      it("adds a checker to the target point", function() {
        expect(game.getPoint(6).checkersCount()).toBe(1);
      });
    });
  });

  describe("#availableMoves", function() {
    var numberGenerator;
    var diceRoller;

    beforeEach(function() {
      numberGenerator = new MockDiceNumberGenerator();
      numberGenerator.addNextPair(2, 5);

      diceRoller = new DiceRoller();
      diceRoller.numberGenerator = numberGenerator;
      diceRoller.roll();

      game.markStarted();
      game.setCurrentPlayer(player1);
      game.diceRoller = diceRoller;
      game.putCheckers(2, player1, 8);
    });

    it("shows possible moves", function() {
      var moves = game.availableMoves();
      expect(moves).toEqual([
        {from: point(8), to: point(3)},
        {from: point(8), to: point(6)}
      ]);
    });

    it("shows only graveyard moves when a checker in a graveyard", function() {
      var graveyard = game.player1Graveyard;
      graveyard.addChecker(new Checker(game.player1));

      var moves = game.availableMoves();
      expect(moves).toEqual([
        {from: graveyard, to: point(20)},
        {from: graveyard, to: point(23)}
      ]);
    });
  });

  describe("#finishTurn", function() {
    var diceRoller;

    beforeEach(function() {
      diceRoller = game.diceRoller;

      game.setCurrentPlayer(player1);
    });

    it("changes player when no moves left", function() {
      diceRoller.valuesLeft = function() { return false; }
      game.finishTurn();

      expect(game.currentPlayer).toBe(player2);
    });

    it("does not change player when any moves left", function() {
      diceRoller.valuesLeft = function() { return true; }
      game.finishTurn();

      expect(game.currentPlayer).toBe(player1);
    });
  });

  describe("#undo", function() {
    var diceRoller;

    beforeEach(function() {
      diceRoller = new DiceRoller();
      diceRoller.hasValue = function(value) { return true };
      diceRoller.roll();

      game.markStarted();
      game.setCurrentPlayer(player1);
      game.diceRoller = diceRoller;

      game.putCheckers(2, player1, 8);
      game.putCheckers(2, player1, 6);
    });

    describe("when pressed once", function() {
      beforeEach(function() {
        game.moveChecker(point(8), point(5));
        game.undo();
      });

      it("add checker to original point", function() {
        expect(point(8).checkersCount()).toBe(2);
      });

      it("removes checker from target point", function() {
        expect(point(5).checkersCount()).toBe(0);
      });

      it("adds dice value back to the diceRoller", function() {
        expect(diceRoller.values[1]).toBe(3);
      });
    });

    describe("when pressed twice", function() {
      beforeEach(function() {
        game.moveChecker(point(8), point(5));
        game.moveChecker(point(8), point(4));
        game.undo();
        game.undo();
      });

      it("add checkers to original point", function() {
        expect(point(8).checkersCount()).toBe(2);
      });
    });

    describe("when trying to undo other player move", function() {
      beforeEach(function() {
        game.moveChecker(point(8), point(5));
        game.setCurrentPlayer(player2);
        game.undo();
      });

      it("does not change anything", function() {
        expect(point(8).checkersCount()).toBe(1);
      });
    });
  });
});
